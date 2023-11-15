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
  OrderMedicine,
  OrderStatus,
} from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(
    private providerService: ProviderService,
    private prisma: PrismaService,
  ) {}

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
}
