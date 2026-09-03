import { useCallback, useEffect, useState } from "react";
import { getActiveDeliveryCycle } from "../services/deliveryCycleService";
import type { DeliveryCycle } from "../types/deliveryCycle";
import { useAuth } from "./useAuth";

export function useDeliveryCycle() {
  const { session } = useAuth();
  const [cycle, setCycle] = useState<DeliveryCycle | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setCycle(await getActiveDeliveryCycle(session?.userId));
    setLoading(false);
  }, [session?.userId]);

  useEffect(() => {
    load();
  }, [load]);

  return { cycle, loading, reload: load };
}
