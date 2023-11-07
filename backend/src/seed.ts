import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

function createMedicines() {
  const medicines = [
    {
      name: 'Paracetamol',
      quantity: 2,
      costPrice: 900,
      sellingPrice: 1000,
      dci: 'Antidouleur',
      location: 'Tirroir-6',
      min: 1,
      max: 10,
      expirationDate: new Date(),
    },
    {
      name: 'Vitamine C',
      quantity: 20,
      costPrice: 1450,
      sellingPrice: 1500,
      dci: 'Effervescent',
      location: 'Tirroir-1',
      min: 10,
      max: 30,
      expirationDate: new Date(),
    },
    {
      name: 'Meth',
      quantity: 10,
      costPrice: 10_000,
      sellingPrice: 20_000,
      dci: 'Psychostimulants',
      location: 'Tirroir-9',
      min: 5,
      max: 15,
      expirationDate: new Date(),
    },
    {
      name: 'Nivaquine',
      quantity: 25,
      costPrice: 1000,
      sellingPrice: 1100,
      dci: 'Antidouleur',
      location: 'Tirroir-2',
      min: 15,
      max: 30,
      expirationDate: new Date(),
    },
  ];

  const repeat = 10;
  const records = [];
  for (let medicine of medicines) {
    for (let i = 0; i < repeat; ++i) {
      records.push({
        ...medicine,
        name: medicine.name + '-' + uuidv4(),
      });
    }
  }

  return prisma.medicine.createMany({
    data: records,
  });
}

async function createProviders() {
  const providers = [
    {
      name: 'F1',
      min: 100_000,
      medicines: [
        {
          name: 'Paracetamol',
          quantity: 2,
          priceWithoutTax: 900,
          priceWithTax: 1000,
          dci: 'Antidouleur',
          expirationDate: new Date(),
        },
        {
          name: 'Vitamine C',
          quantity: 20,
          priceWithoutTax: 1450,
          priceWithTax: 1500,
          dci: 'Effervescent',
          expirationDate: new Date(),
        },
      ],
    },
    {
      name: 'F2',
      min: 100_000,
      medicines: [
        {
          name: 'Metronidazol',
          quantity: 2,
          priceWithoutTax: 900,
          priceWithTax: 1000,
          dci: 'Antidouleur',
          expirationDate: new Date(),
        },
        {
          name: 'Vitamine C',
          quantity: 20,
          priceWithoutTax: 1450,
          priceWithTax: 1500,
          dci: 'Effervescent',
          expirationDate: new Date(),
        },
      ],
    },
  ];

  for (let provider of providers) {
    await prisma.provider.create({
      data: {
        name: provider.name,
        min: provider.min,
        medicines: {
          createMany: {
            data: provider.medicines,
          },
        },
      },
    });
  }
}

async function main() {
  await createMedicines();
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
