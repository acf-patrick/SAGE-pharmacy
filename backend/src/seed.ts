import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';

const prisma = new PrismaClient();

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

function createMedicines() {
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

const providers = [
  {
    accountNumber: '401PA22020004',
    abridgment: 'FR2083',
    commonAccountNumber: 4010000,
    address: 'LOT 69 X ANTOHOMADINIKA',
    postalCode: 101,
    city: 'ANTANANARIVO',
    country: 'MADAGASCAR',
    telephone: ['0341424524'],
    contactName: 'MME TINA',
    stat: '6419711201803631',
    nif: '3003047412',
    collector: '401PA22020004',
    name: 'SALAMA SOA',
  },
  {
    accountNumber: '401PA22020005',
    abridgment: 'FR2084',
    commonAccountNumber: 4010000,
    address: 'LOT VR 10 ANKAZOTOKANA',
    postalCode: 101,
    city: 'ANTANANARIVO',
    country: 'MADAGASCAR',
    telephone: ['261332823423'],
    stat: '94951112016007326',
    nif: '3002563604',
    collector: '401PA22020005',
    name: 'JEUDI DES FEMMES',
  },
  {
    accountNumber: '401PA22020006',
    abridgment: 'FR2085',
    commonAccountNumber: 4010000,
    address: 'LOT II AB 48 ANDRONONOBE',
    postalCode: 101,
    city: 'ANTANANARIVO',
    country: 'MADAGASCAR',
    telephone: ['0341424524'],
    contactName: 'MME MALALATIANA',
    stat: '16900112022003909',
    nif: '5011773292',
    collector: '401PA22020006',
    name: 'SOAFIARY',
  },
  {
    accountNumber: '401PA22020007',
    abridgment: 'FR2086',
    commonAccountNumber: 4010000,
    address: '113 Rue Dr RASETA BP 139 ANDRAHARO',
    postalCode: 101,
    city: 'ANTANANARIVO',
    country: 'MADAGASCAR',
    telephone: ['0202325610'],
    contactName: 'DR ROVA RAZAFIARISOA',
    stat: '46101112022010724',
    nif: '4011845457',
    collector: '401PA22020007',
    name: 'EMDIS',
  },
  {
    accountNumber: '401PA22020008',
    abridgment: 'FR2087',
    commonAccountNumber: 4010000,
    address: 'BP 11 LOT IVF 4 FITROAFANA TALATAMATY',
    postalCode: 101,
    city: 'ANTANANARIVO',
    country: 'MADAGASCAR',
    telephone: ['0321134750', '0320581935'],
    rc: '2000B00290',
    stat: '46101112000010132',
    nif: '2000114602',
    collector: '401PA22020008',
    name: 'FLORIBIS',
  },
  {
    accountNumber: '401PA22020009',
    abridgment: 'FR2088',
    commonAccountNumber: 4010000,
    address: 'LOT II M 92 ANTSAKAVIRO TANA',
    postalCode: 101,
    city: 'ANTANANARIVO',
    country: 'MADAGASCAR',
    email: 'contact@mmm.mg',
    telephone: ['0320339013'],
    stat: '46101112022010253',
    nif: '5011703997',
    collector: '401PA22020009',
    name: 'MMM',
  },
  {
    accountNumber: '401PA22020010',
    abridgment: 'FR2089',
    commonAccountNumber: 4010000,
    address: 'LOT IVA 28 Arivonimamo Nord',
    postalCode: 101,
    city: 'ANTANANARIVO',
    country: 'MADAGASCAR',
    telephone: ['0342200557'],
    contactName: 'DR KOLOINA',
    stat: '55555555555555555',
    nif: '6003939956',
    collector: '401PA22020010',
    name: 'SOS VETERINAIRE',
  },
  {
    accountNumber: '401PA22020011',
    abridgment: 'FR2090',
    commonAccountNumber: 4010000,
    address: '75001 PARIS FRANCE',
    city: 'PARIS',
    country: 'FRANCE',
    telephone: ['0140419080'],
    email: 'pharmacieduforumdeshalles@gmail.com',
    collector: '401PA22020011',
    name: 'PHARMACIE DU FORUM DES HALLES',
  },
  {
    accountNumber: '401PA22020012',
    abridgment: 'FR2091',
    commonAccountNumber: 4010000,
    address: "RESIDENCE FRANCHET D'ESPEREY, RUE MUGEFCI",
    complementAdress: 'PLATEAU, RUE MUGEFCI',
    city: 'ABIDJAN',
    country: "COTE D'IVOIRE",
    telephone: ['20224141'],
    collector: '401PA22020012',
    name: 'PHARMACIE CENTRAL DR EL AMINE',
  },
  {
    accountNumber: '401PA23020001',
    abridgment: 'FR2092',
    commonAccountNumber: 4010000,
    address: 'Explorer Business Park Ankorondrano',
    postalCode: 101,
    city: 'ANTANANARIVO',
    country: 'MADAGASCAR',
    email: 'frederika.be@visionmadagascar.com',
    telephone: ['0321173738'],
    stat: '46900112021011033',
    nif: '5005689806',
    collector: '401PA23020001',
    name: 'VIMADIS',
  },
  {
    accountNumber: '401PA23020002',
    abridgment: 'FR2093',
    commonAccountNumber: 4010000,
    address: 'Tsaralalana',
    postalCode: 101,
    city: 'ANTANANARIVO',
    country: 'MADAGASCAR',
    email: 'tanatrade.t@gmail.com',
    telephone: ['0385861102'],
    stat: '47110112023002826',
    nif: '0000040005',
    collector: '401PA23020002',
    name: 'TANA TRADE',
  },
  {
    accountNumber: '401PA23020003',
    abridgment: 'FR2094',
    commonAccountNumber: 4010000,
    address: '75001 PARIS 1',
    city: 'PARIS',
    country: 'FRANCE',
    telephone: ['0385861102'],
    rc: '918610072',
    collector: '401PA23020003',
    name: 'YD INNOVATION PARIS',
  },
  {
    accountNumber: '401PA23020004',
    abridgment: 'FR2095',
    commonAccountNumber: 4010000,
    address: 'MERCERIE ANALAKELY AMBODIFILAO',
    postalCode: 101,
    city: 'ANTANANARIVO',
    country: 'MADAGASCAR',
    telephone: ['0338492402'],
    collector: '401PA23020004',
    name: 'EMI-SHOP',
  },
];

async function createProviders() {
  for (let i = 0; i < providers.length; i++) {
    const currentProvider = providers[i];
    const provider = await prisma.provider.create({
      data: {
        ...currentProvider,
        min: Math.floor(Math.random() * 80001) + 20000, // Random min value between [20.000 - 100.000],
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

      const record = await prisma.medicine.findUnique({
        where: {
          name: randomMedicineName,
        },
      });

      if (record) {
        await prisma.medicineFromProvider.create({
          data: {
            name: randomMedicineName,
            priceWithTax: Math.floor(Math.random() * 100) + 1,
            priceWithoutTax: Math.floor(Math.random() * 100) + 1,
            quantity: Math.floor(Math.random() * 100) + 1,
            dci: meaningfulINN[j],
            providerId: provider.id,
            expirationDate: new Date(
              new Date().getTime() +
                Math.random() * (365 * 24 * 60 * 60 * 1000),
            ),
            medicineId: record.id,
          },
        });
      } else {
        await prisma.medicineFromProvider.create({
          data: {
            name: randomMedicineName,
            priceWithTax: Math.floor(Math.random() * 100) + 1,
            priceWithoutTax: Math.floor(Math.random() * 100) + 1,
            quantity: Math.floor(Math.random() * 100) + 1,
            dci: meaningfulINN[j],
            providerId: provider.id,
            expirationDate: new Date(
              new Date().getTime() +
                Math.random() * (365 * 24 * 60 * 60 * 1000),
            ),
          },
        });
      }
    }
  }
}

async function main() {
  // Clear remaining datas
  await prisma.orderMedicine.deleteMany();
  await prisma.order.deleteMany();
  await prisma.medicineFromProvider.deleteMany();
  await prisma.medicine.deleteMany();
  await prisma.provider.deleteMany();
  await prisma.user.deleteMany();

  // Generate new ones
  await createMedicines();
  await createProviders();
  await createMockUser();
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
