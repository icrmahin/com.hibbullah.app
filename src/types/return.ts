export type ReturnStatus = "PENDING" | "APPROVED" | "REJECTED" | "PROCESSED";

export type ReturnRequest = {
  id: string;
  orderId: string;
  customerId: string;
  customerName: string;
  productName: string;
  quantity: number;
  reason: string;
  status: ReturnStatus;
  createdAt: string;
};
