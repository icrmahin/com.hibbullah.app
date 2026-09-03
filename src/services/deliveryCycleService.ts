import { wait } from "../lib/result";
import { store } from "./mockData";
import type { DeliveryCycle } from "../types/deliveryCycle";

export async function getActiveDeliveryCycle(
  customerId = "user-001",
): Promise<DeliveryCycle | null> {
  await wait();
  if (store.deliveryCycle.customerId !== customerId) return null;
  return store.deliveryCycle;
}
