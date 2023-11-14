import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrdersDto } from './dto/CreateOrders.dto';
import { ProviderService } from 'src/provider/provider.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(
    private providerService: ProviderService,
    private prisma: PrismaService,
  ) {}

  getOrderCount() {
    return this.prisma.order.count();
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
      }
    }
  }

  async setOrderStatus(orderId: string, status: OrderStatus) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException(`No matching order with ID ${orderId}`);
    }

    const statusList = [
      OrderStatus.ORDERED,
      OrderStatus.PENDING,
      OrderStatus.RECEIVED,
      OrderStatus.FINISHED,
    ];

    const index = statusList.indexOf(order.status);
    const incomingIndex = statusList.indexOf(status);
    if (
      (index === 0 && status !== 'PENDING') ||
      (incomingIndex !== index - 1 && incomingIndex !== index + 1)
    ) {
      throw new BadRequestException(
        `Invalid status provided. Order has status ${order.status}`,
      );
    }

    return this.prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
    });
  }

  async getAllOrders() {
    const records = await this.prisma.order.findMany({
      include: {
        provider: true,
        medicineOrders: true,
      },
    });

    const orders: {
      providerName: string;
      minPurchase: number;
      isValid: boolean;
      status: OrderStatus;
      totalPriceWithTax: number;
      totalPriceWithoutTax: number;
      createdAt: Date;
      id: string;
    }[] = [];

    for (let record of records) {
      const order = {
        providerName: record.provider.name,
        minPurchase: record.provider.min,
        status: record.status,
        totalPriceWithoutTax: 0,
        totalPriceWithTax: 0,
        isValid: record.isValid,
        createdAt: record.createdAt,
        id: record.id,
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
