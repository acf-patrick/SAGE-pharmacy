import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateMedicineDto } from './dto/UpdateMedicine.dto';

@Injectable()
export class StockService {
  private pageLength = 20;

  constructor(private prisma: PrismaService) {}

  // Returns number of pages for medicines in stock
  async getPageCount() {
    const count = await this.prisma.medicine.count();
    return Math.ceil(count / this.pageLength);
  }

  // Returns medicine items from one page
  async getPage(page: number) {
    const medicines = await this.prisma.medicine.findMany({
      skip: page * this.pageLength,
      take: this.pageLength,
    });

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
        id: {in: ids}
      }
    })
  }

  async updateMedicine(id: string, updateMedicineDto: UpdateMedicineDto) {
    try {
      await this.prisma.medicine.update({
        where: {
          id,
        },
        data: updateMedicineDto,
      });
    } catch {
      throw new NotFoundException(`No medicine with given ID ${id} found`);
    }
  }
}
