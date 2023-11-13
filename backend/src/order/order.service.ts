import { Injectable } from '@nestjs/common';
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

  setOrderStatus(orderId: string, status: OrderStatus) {
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
      select: {
        provider: true,
        medicineOrders: true,
      },
    });

    const orders: {
      providerName: string;
      minPurchase: number;
      totalPriceWithTax: number;
      totalPriceWithoutTax: number;
    }[] = [];

    for (let record of records) {
      const order = {
        providerName: record.provider.name,
        minPurchase: record.provider.min,
        totalPriceWithoutTax: 0,
        totalPriceWithTax: 0,
      };

      for (let medicineOrder of record.medicineOrders) {
        const medicineFromProvider =
          await this.prisma.medicineFromProvider.findUnique({
            where: {
              id: medicineOrder.medicineFromProviderId,
            },
          });
        order.totalPriceWithTax =
          medicineOrder.quantity * medicineFromProvider.priceWithTax;
        order.totalPriceWithoutTax =
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
        await this.prisma.orderMedicine.createMany({
          data: medicines.map((medicine) => ({
            medicineFromProviderId: medicine.medicineId,
            quantity: medicine.quantity,
            orderId: record.id,
          })),
        });
      } else {
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
    }
  }
}
