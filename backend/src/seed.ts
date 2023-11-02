import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const items = await prisma.medicine.createMany({
    data: [
      {
        name: 'Paracetamol',
        quantity: 2,
        priceWithoutTax: 450,
        priceWithTax: 500,
        dci: 'Antidouleur',
        isTaxed: true,
        location: 'Tirroir-6',
        min: 1,
        max: 10,
        expirationDate: new Date(),
      },
      {
        name: 'Vitamine C',
        quantity: 20,
        priceWithoutTax: 1000,
        priceWithTax: 1500,
        dci: 'Effervescent',
        isTaxed: true,
        location: 'Tirroir-1',
        min: 10,
        max: 30,
        expirationDate: new Date(),
      },
      {
        name: 'Meth',
        quantity: 10,
        priceWithoutTax: 10000,
        priceWithTax: 12000,
        dci: 'Weed',
        isTaxed: true,
        location: 'Tirroir-9',
        min: 5,
        max: 15,
        expirationDate: new Date(),
      },
      {
        name: 'Nivaquine',
        quantity: 25,
        priceWithoutTax: 250,
        priceWithTax: 300,
        dci: 'Antidouleur',
        isTaxed: true,
        location: 'Tirroir-2',
        min: 15,
        max: 30,
        expirationDate: new Date(),
      },
    ],
  });

  console.log(items);
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
