import { useCallback, useEffect, useState } from "react";
import { getNotifications } from "../services/notificationService";
import type { NotificationItem } from "../types/notification";

export function useNotifications() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setItems(await getNotifications());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { items, loading, reload: load };
}
