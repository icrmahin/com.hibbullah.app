import { wait } from "../../lib/result";
import type { AuditEntry } from "../../types/audit";
import { store } from "../mockData";

export async function getAuditLog(): Promise<AuditEntry[]> {
  await wait();
  return [...store.audit];
}
