import config from "../../constants/config";
import { wait } from "../../lib/result";
import type { InventoryItem, StockAdjustment } from "../../types/inventory";
import { store } from "../mockData";

export async function getInventory(): Promise<InventoryItem[]> {
  await wait();
  return [...store.inventory];
}

export async function getAdjustments(): Promise<StockAdjustment[]> {
  await wait();
  return [...store.adjustments];
}

export async function adjustStock(input: {
  productId: string;
  batchNumber: string;
  type: "increase" | "decrease";
  quantity: number;
  reason: string;
  adminName: string;
}): Promise<StockAdjustment> {
  await wait();
  const item = store.inventory.find(
    (entry) => entry.productId === input.productId && entry.batchNumber === input.batchNumber,
  );
  if (!item) throw new Error("Batch not found.");

  const next =
    input.type === "increase"
      ? item.quantity + input.quantity
      : Math.max(0, item.quantity - input.quantity);
  item.quantity = next;
  item.status =
    next === 0 ? "out_of_stock" : next <= config.lowStockThreshold ? "low" : "healthy";
  item.lastUpdated = new Date().toISOString();

  const product = store.products.find((entry) => entry.id === input.productId);
  if (product) product.stock = next;

  const adjustment: StockAdjustment = {
    id: `sa-${Date.now()}`,
    productId: input.productId,
    productName: item.productName,
    batchNumber: input.batchNumber,
    type: input.type,
    quantity: input.quantity,
    reason: input.reason,
    timestamp: new Date().toISOString(),
    adminName: input.adminName,
  };
  store.adjustments.unshift(adjustment);
  store.audit.unshift({
    id: `audit-${Date.now()}`,
    actor: input.adminName,
    action: "Adjusted inventory",
    timestamp: adjustment.timestamp,
    recordType: "Inventory",
    oldValue: String(input.type === "increase" ? next - input.quantity : next + input.quantity),
    newValue: String(next),
  });
  return adjustment;
}
