import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProviderService {
  constructor(readonly prisma: PrismaService) {}

  // Returns all providers with their medicines
  getAll() {
    return this.prisma.provider.findMany({
      include: {
        medicines: true,
      },
    });
  }

  getOne(id: string) {
    return this.prisma.provider.findUnique({
      where: {
        id,
      },
      include: {
        medicines: true,
      },
    });
  }

  // temporary matching technique
  getMatchingMedicines(name: string) {
    return this.prisma.medicineFromProvider.findMany({
      where: {
        name: {
          mode: 'insensitive',
          contains: name,
        },
      },
    });
  }
}
