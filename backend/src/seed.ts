import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

function createMedicines() {
  const medicines = [
    {
      id: '1',
      name: 'Panadol',
      sellingPrice: 30,
      costPrice: 10,
      quantity: 150,
      location: 'Location 3',
      dci: 'Painkiller',
      isTaxed: true,
      min: 3,
      max: 70,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '2',
      name: 'Aspirin',
      sellingPrice: 20,
      costPrice: 5,
      quantity: 300,
      location: 'Location 2',
      dci: 'Painkiller',
      isTaxed: false,
      min: 2,
      max: 40,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '3',
      name: 'Ibuprofen',
      sellingPrice: 15,
      costPrice: 8,
      quantity: 200,
      location: 'Location 4',
      dci: 'Painkiller',
      isTaxed: true,
      min: 3,
      max: 60,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '4',
      name: 'Tylenol',
      sellingPrice: 25,
      costPrice: 12,
      quantity: 100,
      location: 'Location 1',
      dci: 'Painkiller',
      isTaxed: true,
      min: 2,
      max: 50,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '5',
      name: 'Amoxicillin',
      sellingPrice: 40,
      costPrice: 20,
      quantity: 250,
      location: 'Location 2',
      dci: 'Antibiotic',
      isTaxed: true,
      min: 5,
      max: 100,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '6',
      name: 'Lipitor',
      sellingPrice: 50,
      costPrice: 30,
      quantity: 300,
      location: 'Location 3',
      dci: 'Cholesterol',
      isTaxed: false,
      min: 4,
      max: 80,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '7',
      name: 'Nexium',
      sellingPrice: 60,
      costPrice: 35,
      quantity: 150,
      location: 'Location 4',
      dci: 'Antacid',
      isTaxed: true,
      min: 3,
      max: 70,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '8',
      name: 'Prozac',
      sellingPrice: 35,
      costPrice: 18,
      quantity: 180,
      location: 'Location 1',
      dci: 'Antidepressant',
      isTaxed: false,
      min: 4,
      max: 60,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '9',
      name: 'Advil',
      sellingPrice: 22,
      costPrice: 7,
      quantity: 120,
      location: 'Location 2',
      dci: 'Painkiller',
      isTaxed: true,
      min: 2,
      max: 40,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '10',
      name: 'Zantac',
      sellingPrice: 18,
      costPrice: 9,
      quantity: 250,
      location: 'Location 3',
      dci: 'Antacid',
      isTaxed: false,
      min: 3,
      max: 70,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '11',
      name: 'Allegra',
      sellingPrice: 28,
      costPrice: 15,
      quantity: 180,
      location: 'Location 4',
      dci: 'Antihistamine',
      isTaxed: true,
      min: 3,
      max: 60,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '12',
      name: 'Cephalexin',
      sellingPrice: 38,
      costPrice: 25,
      quantity: 200,
      location: 'Location 1',
      dci: 'Antibiotic',
      isTaxed: true,
      min: 4,
      max: 80,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '13',
      name: 'Lisinopril',
      sellingPrice: 45,
      costPrice: 30,
      quantity: 150,
      location: 'Location 2',
      dci: 'Blood Pressure',
      isTaxed: false,
      min: 3,
      max: 70,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '14',
      name: 'Metformin',
      sellingPrice: 50,
      costPrice: 35,
      quantity: 100,
      location: 'Location 3',
      dci: 'Diabetes',
      isTaxed: true,
      min: 2,
      max: 50,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '15',
      name: 'Naproxen',
      sellingPrice: 20,
      costPrice: 10,
      quantity: 120,
      location: 'Location 4',
      dci: 'Painkiller',
      isTaxed: false,
      min: 2,
      max: 40,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '16',
      name: 'Celebrex',
      sellingPrice: 35,
      costPrice: 18,
      quantity: 180,
      location: 'Location 1',
      dci: 'Painkiller',
      isTaxed: true,
      min: 4,
      max: 60,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '17',
      name: 'Omeprazole',
      sellingPrice: 40,
      costPrice: 22,
      quantity: 200,
      location: 'Location 2',
      dci: 'Antacid',
      isTaxed: false,
      min: 4,
      max: 80,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '18',
      name: 'Prednisone',
      sellingPrice: 30,
      costPrice: 15,
      quantity: 150,
      location: 'Location 3',
      dci: 'Anti-inflammatory',
      isTaxed: true,
      min: 3,
      max: 70,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '19',
      name: 'Metoprolol',
      sellingPrice: 25,
      costPrice: 12,
      quantity: 120,
      location: 'Location 4',
      dci: 'Beta Blocker',
      isTaxed: true,
      min: 3,
      max: 60,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '20',
      name: 'Atorvastatin',
      sellingPrice: 50,
      costPrice: 28,
      quantity: 200,
      location: 'Location 1',
      dci: 'Cholesterol',
      isTaxed: false,
      min: 4,
      max: 80,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '21',
      name: 'Ranitidine',
      sellingPrice: 18,
      costPrice: 8,
      quantity: 180,
      location: 'Location 2',
      dci: 'Antacid',
      isTaxed: true,
      min: 3,
      max: 70,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '22',
      name: 'Furosemide',
      sellingPrice: 22,
      costPrice: 10,
      quantity: 150,
      location: 'Location 3',
      dci: 'Diuretic',
      isTaxed: false,
      min: 2,
      max: 50,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '23',
      name: 'Citalopram',
      sellingPrice: 35,
      costPrice: 20,
      quantity: 250,
      location: 'Location 4',
      dci: 'Antidepressant',
      isTaxed: true,
      min: 5,
      max: 100,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '24',
      name: 'Metronidazole',
      sellingPrice: 40,
      costPrice: 22,
      quantity: 300,
      location: 'Location 1',
      dci: 'Antibiotic',
      isTaxed: true,
      min: 4,
      max: 80,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '25',
      name: 'Clonazepam',
      sellingPrice: 30,
      costPrice: 18,
      quantity: 200,
      location: 'Location 2',
      dci: 'Antianxiety',
      isTaxed: false,
      min: 4,
      max: 80,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '26',
      name: 'Amlodipine',
      sellingPrice: 35,
      costPrice: 20,
      quantity: 150,
      location: 'Location 3',
      dci: 'Blood Pressure',
      isTaxed: true,
      min: 3,
      max: 70,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '27',
      name: 'Gabapentin',
      sellingPrice: 25,
      costPrice: 12,
      quantity: 250,
      location: 'Location 4',
      dci: 'Anticonvulsant',
      isTaxed: true,
      min: 4,
      max: 80,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: '28',
      name: 'Warfarin',
      sellingPrice: 50,
      costPrice: 30,
      quantity: 100,
      location: 'Location 1',
      dci: 'Blood Thinner',
      isTaxed: false,
      min: 2,
      max: 50,
      expirationDate: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
  ];

  medicines.forEach((medicine) => {
    medicine.quantity =
      Math.random() - 0.5 > 0
        ? medicine.min
        : Math.round(
            medicine.min + (medicine.max - medicine.min) * Math.random(),
          );
  });

  return prisma.medicine.createMany({
    data: medicines.map((medicine) => {
      const { id, ...med } = medicine;
      return med;
    }),
  });
}

const medicineNames = [
  'Panadol',
  'Aspirin',
  'Ibuprofen',
  'Tylenol',
  'Amoxicillin',
  'Lipitor',
  'Nexium',
  'Prozac',
  'Advil',
  'Zantac',
  'Allegra',
  'Cephalexin',
  'Lisinopril',
  'Metformin',
  'Naproxen',
  'Celebrex',
  'Omeprazole',
  'Prednisone',
  'Metoprolol',
  'Atorvastatin',
  'Ranitidine',
  'Furosemide',
  'Citalopram',
  'Metronidazole',
  'Clonazepam',
  'Amlodipine',
  'Gabapentin',
  'Warfarin',
];

const meaningfulINN = [
  'Paracetamol',
  'Acetylsalicylic Acid',
  'Ibuprofen',
  'Acetaminophen',
  'Amoxicillin',
  'Atorvastatin',
  'Esomeprazole',
  'Fluoxetine',
  'Ibuprofen',
  'Ranitidine',
  'Fexofenadine',
  'Cephalexin',
  'Lisinopril',
  'Metformin',
  'Naproxen',
  'Celecoxib',
  'Omeprazole',
  'Prednisone',
  'Metoprolol',
  'Atorvastatin',
  'Ranitidine',
  'Furosemide',
  'Citalopram',
  'Metronidazole',
  'Clonazepam',
  'Amlodipine',
  'Gabapentin',
  'Warfarin',
];

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

  for (let i = 0; i < providerNames.length; i++) {
    const provider = await prisma.provider.create({
      data: {
        name: providerNames[i],
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

      await prisma.medicineFromProvider.create({
        data: {
          name: randomMedicineName,
          priceWithTax: Math.floor(Math.random() * 100) + 1,
          priceWithoutTax: Math.floor(Math.random() * 100) + 1,
          quantity: Math.floor(Math.random() * 100) + 1,
          dci: meaningfulINN[j],
          providerId: provider.id,
          expirationDate: new Date(
            new Date().getTime() + Math.random() * (365 * 24 * 60 * 60 * 1000),
          ),
        },
      });
    }
  }
}

async function main() {
  await prisma.medicine.deleteMany();
  await prisma.medicineFromProvider.deleteMany();
  await prisma.provider.deleteMany();
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
