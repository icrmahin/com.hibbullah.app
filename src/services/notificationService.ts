import { wait } from "../lib/result";
import { store } from "./mockData";
import type { NotificationItem } from "../types/notification";

export async function getNotifications(): Promise<NotificationItem[]> {
  await wait(40);
  return [...store.notifications];
}

export async function markNotificationRead(id: string): Promise<void> {
  const item = store.notifications.find((entry) => entry.id === id);
  if (item) item.read = true;
}
