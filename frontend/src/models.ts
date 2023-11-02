export type Medicine = {
  name: string;
  priceWithTax: number;
  priceWithoutTax: number;
  quantity: number;
  location: string;
  dci: string;
  isTaxed: boolean;
  min: number;
  max: number;
  expirationDate: Date;
};
