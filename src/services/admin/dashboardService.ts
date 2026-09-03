import { wait } from "../../lib/result";
import { store } from "../mockData";

export async function getAdminDashboard() {
  await wait();
  const pendingOrders = store.orders.filter(
    (order) => order.status === "PENDING",
  ).length;
  const todaySales = store.orders.reduce((sum, order) => sum + order.total, 0);
  const lowStock = store.inventory.filter(
    (item) => item.status !== "healthy",
  ).length;
  return {
    pendingOrders,
    todaySales,
    activeCycles: store.deliveryCycle.status === "PENDING" ? 1 : 0,
    lowStock,
    customerCount: store.customers.length,
    recentOrders: store.orders.slice(0, 5),
  };
}
