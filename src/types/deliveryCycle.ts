import type { Product } from "./product";

export type DeliveryCycleStatus =
  | "PENDING"
  | "APPROVED"
  | "CONFIRMED"
  | "DELIVERED"
  | "CANCELLED";

export type DeliveryCycle = {
  id: string;
  customerId: string;
  status: DeliveryCycleStatus;
  startedAt: string;
  closesAt: string;
  estimatedTotal: number;
  products: Product[];
};
