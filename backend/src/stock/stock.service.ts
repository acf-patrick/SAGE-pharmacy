import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
}
