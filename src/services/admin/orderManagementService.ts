import { wait } from "../../lib/result";
import type { Order, OrderStatus } from "../../types/order";
import { store } from "../mockData";
import { updateOrderStatus } from "../orderService";

export async function getAdminOrders(status?: OrderStatus): Promise<Order[]> {
  await wait();
  if (!status) return [...store.orders];
  return store.orders.filter((order) => order.status === status);
}

export async function confirmOrder(orderId: string): Promise<Order> {
  const order = await updateOrderStatus(orderId, "CONFIRMED");
  store.deliveryCycle.status = "APPROVED";
  return order;
}

export async function cancelOrder(orderId: string): Promise<Order> {
  return updateOrderStatus(orderId, "CANCELLED");
}
