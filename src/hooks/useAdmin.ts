import { useCallback, useEffect, useState } from "react";
import { getAdminDashboard } from "../services/admin/dashboardService";

export function useAdmin() {
  const [dashboard, setDashboard] = useState<Awaited<ReturnType<typeof getAdminDashboard>> | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setDashboard(await getAdminDashboard());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { dashboard, loading, reload: load };
}
