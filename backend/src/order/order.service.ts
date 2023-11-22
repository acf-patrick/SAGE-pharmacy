import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrdersDto } from './dto/CreateOrders.dto';
import { ProviderService } from 'src/provider/provider.service';
import {
  MedicineFromProvider,
  Order,
  OrderMedicine,
  OrderStatus,
} from '@prisma/client';
import { OrderDto } from './dto/Order.dto';
import { filter } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(
    private providerService: ProviderService,
    private prisma: PrismaService,
  ) {}

  async createMedicineOrder(
    orderId: string,
    medicineFromProviderId: string,
    quantity: number,
  ) {
    const record = await this.prisma.orderMedicine.create({
      data: {
        quantity,
        medicineFromProviderId,
        orderId,
      },
      include: {
        medicine: true,
        Order: true,
      },
    });

    return {
      medicineName: record.medicine.name,
      providerName: record.Order.providerName,
    };
  }

  deleteOrderMedicine(orderId: string, medicineName: string) {
    return this.prisma.orderMedicine.deleteMany({
      where: {
        orderId,
        medicine: {
          name: medicineName,
        },
      },
    });
  }

  async delete(id: string) {
    try {
      await this.prisma.orderMedicine.deleteMany({
        where: {
          orderId: id,
        },
      });
      await this.prisma.order.delete({
        where: { id },
      });
    } catch (e) {
      throw new NotFoundException(`No matching order with ID : ${id}`);
    }
  }

  getOrderCount() {
    return this.prisma.order.count();
  }

  async getOrder(id: string) {
    const record = await this.prisma.order.findUnique({
      where: { id },
      include: {
        provider: true,
        medicineOrders: true,
      },
    });

    const order = {
      providerName: record.provider.name,
      minPurchase: record.provider.min,
      status: record.status,
      totalPriceWithoutTax: 0,
      totalPriceWithTax: 0,
      isValid: record.isValid,
      createdAt: record.createdAt,
      id: record.id,
      orderMedicines: [],
    };

    // Compute prices
    for (let medicineOrder of record.medicineOrders) {
      const medicineFromProvider =
        await this.prisma.medicineFromProvider.findUnique({
          where: {
            id: medicineOrder.medicineFromProviderId,
          },
        });
      order.totalPriceWithTax +=
        medicineOrder.quantity * medicineFromProvider.priceWithTax;
      order.totalPriceWithoutTax +=
        medicineOrder.quantity * medicineFromProvider.priceWithoutTax;
    }

    const medicinesFromProviderInOrder: (MedicineFromProvider & {
      quantityToOrder: number;
    })[] = [];
    for (let orderMedicine of record.medicineOrders) {
      const medicine = await this.prisma.medicineFromProvider.findUnique({
        where: {
          id: orderMedicine.medicineFromProviderId,
        },
      });
      medicinesFromProviderInOrder.push({
        ...medicine,
        quantityToOrder: orderMedicine.quantity,
      });
    }
    order.orderMedicines = medicinesFromProviderInOrder;

    return order;
  }

  async verifyOrdersValidity() {
    const orders = await this.getAllOrders();
    for (let order of orders) {
      if (
        order.status === 'ORDERED' &&
        order.totalPriceWithTax < order.minPurchase
      ) {
        await this.prisma.order.update({
          where: {
            providerName: order.providerName,
          },
          data: {
            isValid: false,
          },
        });
      } else if (order.status !== 'ORDERED') {
        await this.prisma.order.update({
          where: {
            providerName: order.providerName,
          },
          data: {
            isValid: true,
          },
        });
      }
    }
  }

  async setOrderQuantity(orderId: string, quantity: number) {
    this.prisma.order.update({
      where: {
        id: orderId,
      },
      data: {},
    });
  }

  setMedicinesQuantities(
    orderId: string,
    medicines: {
      name: string;
      quantity: number;
    }[],
  ) {
    return Promise.allSettled(
      medicines.map(({ name, quantity }) =>
        this.prisma.orderMedicine.updateMany({
          where: {
            orderId,
            medicine: {
              name,
            },
          },
          data: {
            quantity,
          },
        }),
      ),
    );
  }

  async setOrderStatus(orderId: string, status: OrderStatus) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException(`No matching order with ID ${orderId}`);
    }

    const map = new Map<OrderStatus, OrderStatus[]>();
    map.set(OrderStatus.ORDERED, [OrderStatus.PENDING]);
    map.set(OrderStatus.PENDING, [OrderStatus.ORDERED, OrderStatus.RECEIVED]);
    map.set(OrderStatus.RECEIVED, [OrderStatus.FINISHED, OrderStatus.AVOIR]);
    map.set(OrderStatus.FINISHED, [OrderStatus.RECEIVED]);
    map.set(OrderStatus.AVOIR, [OrderStatus.RECEIVED, OrderStatus.FINISHED]);

    const value = map.get(order.status);
    if (!value.includes(status)) {
      throw new BadRequestException(
        `Invalid status provided: ${status} . Order has status: ${order.status}`,
      );
    }

    await this.prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
    });

    return await this.verifyOrdersValidity();
  }

  async getAllOrders() {
    const orders: {
      providerName: string;
      minPurchase: number;
      isValid: boolean;
      status: OrderStatus;
      totalPriceWithTax: number;
      totalPriceWithoutTax: number;
      createdAt: Date;
      id: string;
      orderMedicines: MedicineFromProvider[];
    }[] = [];

    const records = await this.prisma.order.findMany({
      select: {
        id: true,
      },
    });
    for (let { id } of records) {
      const order = await this.getOrder(id);
      orders.push(order);
    }

    return orders;
  }

  async clearOrders() {
    await this.prisma.order.deleteMany();
    await this.prisma.orderMedicine.deleteMany();
  }

  async createOrders(createOrdersDto: CreateOrdersDto) {
    // provider's name -> medicine IDs
    const orders = new Map<
      string,
      {
        medicineId: string;
        quantity: number;
      }[]
    >();

    for (let order of createOrdersDto.orders) {
      if (order.medicineId) {
        const provider = await this.providerService.getOwner(order.medicineId);

        const medicines = orders.get(provider.name);
        const record = {
          medicineId: order.medicineId,
          quantity: order.quantityToOrder,
        };

        if (medicines) {
          medicines.push(record);
        } else {
          orders.set(provider.name, [record]);
        }
      } else if (order.medicine) {
        const provider = await this.providerService.getOne(
          order.medicine.owner,
        );

        const records = await this.prisma.medicineFromProvider.findMany({
          where: {
            providerId: provider.id,
            name: order.medicine.name,
          },
          select: { id: true },
        });
        const medicineId = records[0].id;

        const medicines = orders.get(provider.name);
        const record = {
          medicineId: medicineId,
          quantity: order.quantityToOrder,
        };

        if (medicines) {
          medicines.push(record);
        } else {
          orders.set(provider.name, [record]);
        }
      }
    }

    for (let [providerName, medicines] of orders) {
      const record = await this.prisma.order.findUnique({
        where: {
          providerName,
        },
      });

      if (record) {
        // existing order, push new medicine to order
        await this.prisma.orderMedicine.createMany({
          data: medicines.map((medicine) => ({
            medicineFromProviderId: medicine.medicineId,
            quantity: medicine.quantity,
            orderId: record.id,
          })),
        });
      } else {
        // create new order
        await this.prisma.order.create({
          data: {
            providerName,
            medicineOrders: {
              create: medicines.map((medicine) => ({
                quantity: medicine.quantity,
                medicine: {
                  connect: {
                    id: medicine.medicineId,
                  },
                },
              })),
            },
          },
        });
      }

      await this.verifyOrdersValidity();
    }
  }

  async updateAllOrders(id: string) {
    const orderMedicines = await this.prisma.orderMedicine.findMany({
      where: {
        Order: {
          provider: {
            id,
          },
        },
      },
    });

    const provider = await this.prisma.provider.findUnique({
      where: {
        id,
      },
      include: {
        medicines: true,
      },
    });
  }
}

// await this.prisma.medicineFromProvider.deleteMany({
//   where: {
//     id: '2f57b55f-c8df-4ac8-b7d6-4a01c89dabb2',
//   },
// });
