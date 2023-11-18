import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';
import * as fs from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

async function main() {
  // Clear remaining datas
  await prisma.orderMedicine.deleteMany();
  await prisma.order.deleteMany();
  await prisma.medicineFromProvider.deleteMany();
  await prisma.medicine.deleteMany();
  await prisma.provider.deleteMany();
  await prisma.user.deleteMany();

  await createMockUser();
  await fillStock();
  await createProviders();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

function randInt() {
  return Math.round(1 + 19 * Math.random());
}

type Medicine = {
  type: string;
  reference: string;
  real?: string;
  name: string;
  sellingPrice: string;
  quantity?: string;
  family: string;
  dci?: string;
  nomenclature?: string;
};

type Location = {
  reference: string;
  costPrice: string;
  location: string;
  manufacturationDate?: string;
  expirationDate?: string;
};

async function fillStock() {
  const {
    medicines,
    locations,
  }: {
    medicines: Medicine[];
    locations: Location[];
  } = JSON.parse(fs.readFileSync(join(__dirname, 'datas.json'), 'utf-8'));

  await Promise.all(
    medicines.map(async (record) => {
      const medicine = {
        ...record,
        quantity: record.quantity ? parseInt(record.quantity) : 0,
        real: record.real ? parseInt(record.real) : 0,
        sellingPrice: parseInt(record.sellingPrice),
      };

      const location = locations.find(
        (location) => location.reference === medicine.reference,
      );
      if (location) {
        let min = randInt(),
          max = randInt();

        if (min == 20) {
          min = 10;
          max = 20;
        } else {
          while (max <= min) {
            max = randInt();
          }
        }

        let alert = Math.round(min + (max - min) / 4);
        if (alert < min) {
          alert = min;
        }

        const record = await prisma.medicine.create({
          data: {
            ...medicine,
            costPrice: parseInt(location.costPrice),
            location: location.location,
            manufacturationDate: location.manufacturationDate
              ? new Date(location.manufacturationDate).toISOString()
              : undefined,
            expirationDate: location.expirationDate
              ? new Date(location.expirationDate).toISOString()
              : undefined,
            alert,
            min,
            max,
          },
        });
      }
    }),
  );
}

async function createMockUser() {
  const hashed = await argon.hash('admin');

  const user = await prisma.user.create({
    data: {
      username: 'admin',
      password: hashed,
      role: 'ADMIN',
    },
  });
  return user;
}

async function createProviders() {
  const providerNames = [
    'MediHealth',
    'PharmaCare',
    'HealMart',
    'CurePharm',
    'VitaPlus',
    'MediCo',
    'HealLife',
    'LifePharm',
    'GlobalMeds',
    'WellnessRx',
  ];

  const medicineNames = (
    await prisma.medicine.findMany({
      select: {
        name: true,
      },
    })
  ).map(({ name }) => name);

  await Promise.all(
    providerNames.map(async (providerName) => {
      const provider = await prisma.provider.create({
        data: {
          name: providerName,
          min: Math.floor(Math.random() * 30) + 10, // Random min value between 10 and 39
        },
      });

      const uniqueMedicineNames = new Set();

      for (let j = 0; j < 20; j++) {
        let randomMedicineName;

        do {
          randomMedicineName =
            medicineNames[Math.floor(Math.random() * medicineNames.length)];
        } while (uniqueMedicineNames.has(randomMedicineName));

        uniqueMedicineNames.add(randomMedicineName);

        const records = await prisma.medicine.findMany({
          where: {
            name: randomMedicineName,
          },
        });

        const priceWithoutTax = 100 * Math.round(Math.random() * 1000);

        let priceWithTax;
        do {
          priceWithTax = 100 * Math.round(Math.random() * 1000);
        } while (priceWithTax < priceWithoutTax);

        if (records.length > 0) {
          const { id } = records[0];

          await prisma.medicineFromProvider.create({
            data: {
              name: randomMedicineName,
              priceWithoutTax,
              priceWithTax,
              quantity: Math.floor(Math.random() * 100) + 1,
              dci: '',
              providerId: provider.id,
              expirationDate: new Date(
                Date.now() + Math.random() * (365 * 24 * 60 * 60 * 1000),
              ),
              medicineId: id,
            },
          });
        } else {
          await prisma.medicineFromProvider.create({
            data: {
              name: randomMedicineName,
              priceWithTax,
              priceWithoutTax,
              quantity: Math.floor(Math.random() * 100) + 1,
              dci: '',
              providerId: provider.id,
              expirationDate: new Date(
                Date.now() + Math.random() * (365 * 24 * 60 * 60 * 1000),
              ),
            },
          });
        }
      }
    }),
  );
}
