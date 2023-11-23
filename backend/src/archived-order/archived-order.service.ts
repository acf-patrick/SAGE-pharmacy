import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewArchivedOrderDto } from './dto/NewArchivedOrder.dto';

@Injectable()
export class ArchivedOrderService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllArchivedOrders() {
    try {
      const res = await this.prisma.archivedOrder.findMany();
      return res;
    } catch (err) {
      console.log(err);
      throw new NotFoundException('Error getting archived orders.');
    }
  }

  async getOneArchivedOrder(id: string) {
    try {
      return await this.prisma.archivedOrder.findUnique({
        where: {
          id,
        },
      });
    } catch (err) {
      console.log(err);
      throw new Error('Error getting archived order with id: ' + id);
    }
  }

  async createArchivedOrder(newArhivedOrderDto: NewArchivedOrderDto) {
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          id: newArhivedOrderDto.providerId
        }
      })

      return await this.prisma.archivedOrder.create({
        data: {
          orderCreationDate: order.createdAt,
          providerName: order.providerName,
          createdAt: new Date(),
          evidences: newArhivedOrderDto.evidences
        }
      }
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Error creating new archived order.');
    }
  }

  async updateArchivedOrder(
    id: string,
    updatedArchiveData: NewArchivedOrderDto,
  ) {
    try {
      return await this.prisma.archivedOrder.update({
        where: {
          id,
        },
        data: updatedArchiveData,
      });
    } catch (err) {
      console.log(err);
      throw new BadRequestException(
        'Error updating archived order with id :' +
          id +
          ' . Bad body object sent.',
      );
    }
  }

  async deleteArchivedData(id: string) {
    try {
      return await this.prisma.archivedOrder.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new NotFoundException(
        "Can't find archived order with id: " + id + '.',
      );
    }
  }
}
