import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateMedicineDto } from './dto/UpdateMedicine.dto';
import { CreateMedicineDto } from './dto/CreateMedicine.dto';
import { Medicine } from '@prisma/client';

type MedicineQuery =
  | {
      type: 'name';
      name: string;
    }
  | {
      type: 'sellingPrice';
      sellingPrice: number;
    }
  | {
      type: 'costPrice';
      costPrice: number;
    }
  | {
      type: 'quantity';
      quantity: number;
    }
  | {
      type: 'location';
      location: string;
    }
  | {
      type: 'dci';
      dci: string;
    }
  | {
      type: 'min';
      min: number;
    }
  | {
      type: 'max';
      max: number;
    }
  | {
      type: 'expirationDate';
      expirationDate: Date;
    };

@Injectable()
export class StockService {
  private pageLength = 20;

  constructor(private prisma: PrismaService) {}

  async createMedicine(createMedicineDto: CreateMedicineDto) {
    try {
      const { id } = await this.prisma.medicine.create({
        data: createMedicineDto,
        select: {
          id: true,
        },
      });
      return id;
    } catch (e) {
      console.error(e);
      throw new BadRequestException('Invalid DTO format');
    }
  }

  // Returns number of pages for medicines in stock matching given query
  async getPageCount(query?: MedicineQuery) {
    let count: number;

    if (query) {
      switch (query.type) {
        case 'costPrice':
          count = await this.prisma.medicine.count({
            where: {
              costPrice: query.costPrice,
            },
          });
          break;
        case 'dci':
          count = await this.prisma.medicine.count({
            where: {
              dci: {
                contains: query.dci,
                mode: 'insensitive',
              },
            },
          });
          break;
        case 'location':
          count = await this.prisma.medicine.count({
            where: {
              location: {
                contains: query.location,
                mode: 'insensitive',
              },
            },
          });
          break;
        case 'max':
          count = await this.prisma.medicine.count({
            where: {
              max: query.max,
            },
          });
          break;
        case 'min':
          count = await this.prisma.medicine.count({
            where: {
              min: query.min,
            },
          });
          break;
        case 'name':
          count = await this.prisma.medicine.count({
            where: {
              name: {
                contains: query.name,
                mode: 'insensitive',
              },
            },
          });
          break;
        case 'quantity':
          count = await this.prisma.medicine.count({
            where: {
              quantity: query.quantity,
            },
          });
          break;
        case 'sellingPrice':
          count = await this.prisma.medicine.count({
            where: {
              sellingPrice: query.sellingPrice,
            },
          });
          break;
          defaut: count = 0;
      }
    } else {
      count = await this.prisma.medicine.count();
    }

    return Math.ceil(count / this.pageLength);
  }

  // Returns medicine items from one page
  async getPage(page: number, query?: MedicineQuery) {
    const index = page ? page : 0;
    let medicines;

    if (query) {
      switch (query.type) {
        case 'costPrice':
          medicines = await this.prisma.medicine.findMany({
            skip: index * this.pageLength,
            take: this.pageLength,
            where: {
              costPrice: query.costPrice,
            },
          });
          break;
        case 'dci':
          medicines = await this.prisma.medicine.findMany({
            skip: index * this.pageLength,
            take: this.pageLength,
            where: {
              dci: {
                contains: query.dci,
                mode: 'insensitive',
              },
            },
          });
          break;
        case 'location':
          medicines = await this.prisma.medicine.findMany({
            skip: index * this.pageLength,
            take: this.pageLength,
            where: {
              location: {
                contains: query.location,
                mode: 'insensitive',
              },
            },
          });
          break;
        case 'max':
          medicines = await this.prisma.medicine.findMany({
            skip: index * this.pageLength,
            take: this.pageLength,
            where: {
              max: query.max,
            },
          });
          break;
        case 'min':
          medicines = await this.prisma.medicine.findMany({
            skip: index * this.pageLength,
            take: this.pageLength,
            where: {
              min: query.min,
            },
          });
          break;
        case 'name':
          medicines = await this.prisma.medicine.findMany({
            skip: index * this.pageLength,
            take: this.pageLength,
            where: {
              name: {
                contains: query.name,
                mode: 'insensitive',
              },
            },
          });
          break;
        case 'quantity':
          medicines = await this.prisma.medicine.findMany({
            skip: index * this.pageLength,
            take: this.pageLength,
            where: {
              quantity: query.quantity,
            },
          });
          break;
        case 'sellingPrice':
          medicines = await this.prisma.medicine.findMany({
            skip: index * this.pageLength,
            take: this.pageLength,
            where: {
              sellingPrice: query.sellingPrice,
            },
          });
          break;
          defaut: medicines = [];
      }
    } else {
      medicines = await this.prisma.medicine.findMany({
        skip: index * this.pageLength,
        take: this.pageLength,
      });
    }

    return medicines;
  }

  // Returns one medicine
  getMedicine(id: string) {
    return this.prisma.medicine.findUnique({
      where: { id },
    });
  }

  // Delete one medicine
  deleteMedicine(id: string) {
    return this.prisma.medicine.delete({
      where: { id },
    });
  }

  // Delete multiple medicines
  async deleteMedicines(ids: string[]) {
    const { count } = await this.prisma.medicine.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }

  async updateMedicine(id: string, updateMedicineDto: UpdateMedicineDto) {
    try {
      await this.prisma.medicine.update({
        where: {
          id,
        },
        data: updateMedicineDto,
      });
    } catch (e) {
      if (e.code === 'P2002') {
        throw e;
      } else {
        throw new NotFoundException(`No medicine with given ID ${id} found`);
      }
    }
  }

  async getNearLowMedicines() {
    const medicines: Medicine[] = await this.prisma
      .$queryRaw`SELECT * FROM "Medicine" WHERE "quantity" <= "min";`;
    return medicines;
  }
}
