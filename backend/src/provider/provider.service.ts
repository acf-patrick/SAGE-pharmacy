import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MedicineFromProvider } from '@prisma/client';

// Utility type used for stock medicine and provider's medicine matching
type MedicineMapRecord = {
  medicine: MedicineFromProvider;
  provider: {
    name: string;
  };
};

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

  // return matching medicines for name list
  async getMatchingMedicinesForNameList(
    names: string[],
  ): Promise<Record<string, MedicineMapRecord[]>> {
    const map = new Map<string, MedicineMapRecord[]>();

    for (let name of names) {
      let medicines = await this.getMatchingMedicines(name);
      if (medicines.length > 0) {
        const record: MedicineMapRecord[] = [];
        for (let medicine of medicines) {
          const provider = await this.getOne(medicine.providerId);
          record.push({
            medicine: medicine,
            provider: {
              name: provider.name,
            },
          });
        }
        map.set(name, record);
      }
    }

    if (map.size === 0) {
      throw new NotFoundException(
        'No available medicine from provider for given medicine names',
      );
    }

    let ret: any = {};
    for (let key of map.keys()) {
      ret[key] = map.get(key);
    }

    return ret;
  }
}
