import { MedicineFromProvider, Provider } from "../../models";

// export type OrderMedicine = {
//   id: string;
//   medicine: MedicineFromProvider;
//   quantity: number;
//   medicineFromProviderId: string;
//   order: Order;
//   orderId: string;
// };

export type Order = {
  id: string;
  provider: Provider;
  providerName: string;
  createdAt: string;
  status: KanbanItemStatus;
  minPurchase: number;
  totalPriceWithTax: number;
  totalPriceWithoutTax: number;
  orderMedicines: (MedicineFromProvider & {
    quantityToOrder: number;
  })[];
};

export const KanbanItemStatusObject = {
  ORDERED: "ORDERED",
  PENDING: "PENDING",
  RECEIVED: "RECEIVED",
  FINISHED: "FINISHED",
  AVOIR: "AVOIR",
} as const;

export type KanbanItemStatus =
  | "ORDERED"
  | "PENDING"
  | "RECEIVED"
  | "FINISHED"
  | "AVOIR";
