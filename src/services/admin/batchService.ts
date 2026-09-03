import { wait } from "../../lib/result";
import type { InventoryItem } from "../../types/inventory";
import { store } from "../mockData";

export async function getBatches(): Promise<InventoryItem[]> {
  await wait();
  return [...store.inventory];
}

export async function getExpiringBatches(withinDays = 90): Promise<InventoryItem[]> {
  await wait();
  const limit = Date.now() + withinDays * 24 * 60 * 60 * 1000;
  return store.inventory.filter((item) => {
    if (!item.expiryDate) return false;
    return new Date(item.expiryDate).getTime() <= limit;
  });
}
