import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MedicineFromProvider } from '@prisma/client';
import { StockService } from 'src/stock/stock.service';
import { cpSync } from 'fs';

// Utility type used for stock medicine and provider's medicine matching
type MedicineMapRecord = {
  medicine: MedicineFromProvider;
  provider: {
    name: string;
  };
  quantityToOrder: number;
};

@Injectable()
export class ProviderService {
  constructor(
    readonly prisma: PrismaService,
    private stockService: StockService,
  ) {}

  updateMatches(
    matches: {
      id: string;
      name: string;
    }[],
  ) {
    return Promise.allSettled(
      matches.map(async ({ id, name }) =>
        this.prisma.medicineFromProvider.update({
          where: { id },
          data: {
            matchingMedicine: {
              connect: {
                name,
              },
            },
          },
        }),
      ),
    );
  }

  // Returns all providers with their medicines
  getAll() {
    return this.prisma.provider.findMany({
      include: {
        medicines: true,
      },
    });
  }

  async hasMedicineFromProviderBeenOrdered(id: string) {
    const record = await this.prisma.orderMedicine.findUnique({
      where: {
        medicineFromProviderId: id,
      },
    });

    return record ? true : false;
  }

  async getOwner(medicineId: string) {
    const providers = await this.prisma.provider.findMany({
      where: {
        medicines: {
          some: {
            id: medicineId,
          },
        },
      },
    });

    if (providers.length === 0) {
      return null;
    }

    return providers[0];
  }

  getOne(id: string) {
    return this.prisma.provider.findUnique({
      where: {
        id,
      },
      include: {
        medicines: {
          include: {
            matchingMedicine: true,
          },
        },
      },
    });
  }

  getMedicineNames() {
    return this.prisma.medicineFromProvider.findMany({
      select: {
        name: true,
      },
    });
  }

  async getMatchingMedicinesByName(name: string) {
    const medicineNames = (await this.getMedicineNames()).map(
      ({ name }) => name,
    );

    const names = medicineNames.filter(
      (medicine) =>
        medicine.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(medicine.toLowerCase()),
    );

    const medicines = await this.prisma.medicineFromProvider.findMany({
      where: {
        name: {
          in: names,
        },
      },
    });

    const records: typeof medicines = [];
    for (let medicine of medicines) {
      const ordered = await this.hasMedicineFromProviderBeenOrdered(
        medicine.id,
      );
      if (!ordered) {
        records.push(medicine);
      }
    }
    return records;
  }

  async getMatchingMedicines(name: string) {
    const medicine = await this.prisma.medicine.findUnique({
      where: { name },
    });

    const medicinesFromProvider =
      await this.prisma.medicineFromProvider.findMany({
        where: {
          matchingMedicine: {
            name,
          },
        },
      });

    const orders = await this.prisma.orderMedicine.count({
      where: {
        medicine: {
          id: {
            in: medicinesFromProvider.map((medicine) => medicine.id),
          },
        },
      },
    });

    return orders === 0 ? medicinesFromProvider : [];
  }

  // return matching medicines for given medicine names
  async getMatchingMedicinesForList(
    names: string[],
  ): Promise<Record<string, MedicineMapRecord[]>> {
    const map = new Map<string, MedicineMapRecord[]>();

    const matchName = async (name: string) => {
      let medicines = await this.getMatchingMedicines(name);
      if (medicines.length > 0) {
        const record: MedicineMapRecord[] = [];
        for (let medicine of medicines) {
          const provider = await this.getOne(medicine.providerId);
          const medicineInStock = await this.stockService.getMedicineByName(
            name,
          );

          const numberOfMedicinesToOrder =
            medicineInStock.max - medicineInStock.quantity;

          record.push({
            medicine,
            provider: {
              name: provider.name,
            },
            quantityToOrder:
              medicine.quantity > numberOfMedicinesToOrder
                ? numberOfMedicinesToOrder
                : medicine.quantity,
          });
        }
        map.set(name, record);
      }
    };

    await Promise.allSettled(names.map((name) => matchName(name)));

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
