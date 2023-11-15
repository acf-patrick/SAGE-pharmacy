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
  isValid: boolean;
  status: KanbanItemStatus;
  minPurchase: number;
  totalPriceWithTax: number;
  totalPriceWithoutTax: number;
  orderMedicines: MedicineFromProvider[];
};

export const KanbanItemStatusObject = {
  ORDERED: "ORDERED",
  PENDING: "PENDING",
  RECEIVED: "RECEIVED",
  FINISHED: "FINISHED",
} as const;

export type KanbanItemStatus = "ORDERED" | "PENDING" | "RECEIVED" | "FINISHED";
