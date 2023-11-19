export type Medicine = {
  id: string;
  name: string;
  sellingPrice: number;
  costPrice: number;
  quantity: number;
  location: string;
  dci?: string;
  isTaxed: boolean;
  min: number;
  max: number;
  expirationDate: string;
};

export type MedicineDto = {
  name: string;
  sellingPrice: number;
  costPrice: number;
  quantity: number;
  location: string;
  dci?: string;
  isTaxed: boolean;
  min: number;
  max: number;
  expirationDate?: string;
};

export type MedicineFromProvider = {
  id: string;
  name: string;
  priceWithoutTax: number;
  priceWithTax: number;
  quantity: number;
  dci?: string;
  providerId: string;
  expirationDate: string;
  matchingMedicine: Medicine;
};

export type Provider = {
  id: string;
  name: string;
  medicines: MedicineFromProvider[];
  min: number;
};

export type ProviderDto = {
  accountNumber: string;
  abridgment: string;
  commonAccountNumber: number;
  address: string;
  complementAdress?: string;
  postalCode?: number;
  city: string;
  country: string;
  telephone: string[];
  telecopie?: string;
  email?: string;
  contactName?: string;
  rc?: string;
  stat?: string;
  nif?: string;
  cif?: string;
  collector: string;
  name: string;
  min: number;
};
