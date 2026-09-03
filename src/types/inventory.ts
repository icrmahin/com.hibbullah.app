export type InventoryStatus = "healthy" | "low" | "out_of_stock";

export type InventoryItem = {
  id: string;
  productId: string;
  productName: string;
  batchNumber: string;
  quantity: number;
  expiryDate?: string;
  status: InventoryStatus;
  lastUpdated: string;
};

export type StockAdjustment = {
  id: string;
  productId: string;
  productName: string;
  batchNumber: string;
  type: "increase" | "decrease";
  quantity: number;
  reason: string;
  timestamp: string;
  adminName: string;
};
