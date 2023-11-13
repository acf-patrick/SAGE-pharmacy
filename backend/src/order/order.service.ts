import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrdersDto } from './dto/CreateOrders.dto';
import { ProviderService } from 'src/provider/provider.service';

@Injectable()
export class OrderService {
  constructor(
    private providerService: ProviderService,
    private prisma: PrismaService,
  ) {}

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
