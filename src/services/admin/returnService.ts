import { wait } from "../../lib/result";
import type { ReturnRequest, ReturnStatus } from "../../types/return";
import { store } from "../mockData";

export async function getReturns(): Promise<ReturnRequest[]> {
  await wait();
  return [...store.returns];
}

export async function getReturnById(returnId: string): Promise<ReturnRequest | undefined> {
  await wait(40);
  return store.returns.find((item) => item.id === returnId);
}

export async function updateReturnStatus(
  returnId: string,
  status: ReturnStatus,
): Promise<ReturnRequest> {
  await wait();
  const item = store.returns.find((entry) => entry.id === returnId);
  if (!item) throw new Error("Return not found.");
  item.status = status;
  store.audit.unshift({
    id: `audit-${Date.now()}`,
    actor: "Dr. Yusuf Ali",
    action: "Processed return",
    timestamp: new Date().toISOString(),
    recordType: "Return",
    oldValue: "PENDING",
    newValue: status,
  });
  return item;
}
