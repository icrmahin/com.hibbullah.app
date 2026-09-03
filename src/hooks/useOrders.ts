import { useCallback, useEffect, useState } from "react";
import { getOrders } from "../services/orderService";
import type { Order } from "../types/order";
import { normalizeError } from "../utils/errorHandling";
import { useAuth } from "./useAuth";

export function useOrders() {
  const { session } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setOrders(await getOrders(session?.userId));
    } catch (err) {
      setError(normalizeError(err).message);
    } finally {
      setLoading(false);
    }
  }, [session?.userId]);

  useEffect(() => {
    load();
  }, [load]);

  return { orders, loading, error, reload: load };
}
