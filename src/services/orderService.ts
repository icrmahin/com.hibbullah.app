import config from "../constants/config";
import { wait } from "../lib/result";
import type { Order, OrderStatus } from "../types/order";
import { store } from "./mockData";
import { clearCart, summarizeCart } from "./cartService";

export async function getOrders(customerId = "user-001"): Promise<Order[]> {
  await wait();
  return store.orders.filter((order) => order.customerId === customerId);
}

export async function getOrderById(orderId: string): Promise<Order | undefined> {
  await wait(40);
  return store.orders.find((order) => order.id === orderId);
}

export async function submitOrder(input: {
  customerId: string;
  customerName: string;
  address: string;
}): Promise<Order> {
  await wait(120);
  if (!store.cartItems.length) throw new Error("Your cart is empty.");

  const summary = summarizeCart();
  const items = store.cartItems.map((item, index) => ({
    id: `oitem-${Date.now()}-${index}`,
    productId: item.productId,
    productName: item.product.name,
    quantity: item.quantity,
    unitPrice: item.product.price,
    discountPercent: item.product.discountPercent ?? 0,
    total: item.product.price * item.quantity,
  }));

  const existingPending = store.orders.find(
    (order) => order.customerId === input.customerId && order.status === "PENDING",
  );

  if (existingPending) {
    existingPending.items.push(...items);
    existingPending.subtotal += summary.subtotal;
    existingPending.discount += summary.discount;
    existingPending.total = existingPending.subtotal + existingPending.deliveryFee;
    existingPending.timeline.push({
      label: "Items added",
      time: new Date().toISOString(),
      note: "Added to the active 24-hour delivery cycle",
    });
    store.deliveryCycle.products.push(...store.cartItems.map((item) => item.product));
    store.deliveryCycle.estimatedTotal = existingPending.total;
    await clearCart();
    return existingPending;
  }

  const order: Order = {
    id: `order-${Date.now()}`,
    orderNumber: `HB-${1000 + store.orders.length + 1}`,
    customerId: input.customerId,
    customerName: input.customerName,
    createdAt: new Date().toISOString(),
    status: "PENDING",
    subtotal: summary.subtotal,
    discount: summary.discount,
    deliveryFee: summary.deliveryFee,
    total: summary.total,
    paymentMethod: "CASH_ON_DELIVERY",
    address: input.address,
    items,
    timeline: [
      { label: "Placed", time: new Date().toISOString(), note: "Customer submitted order" },
      { label: "Pending", time: new Date().toISOString(), note: "Waiting for admin review" },
    ],
  };

  store.orders.unshift(order);
  store.deliveryCycle = {
    id: `cycle-${Date.now()}`,
    customerId: input.customerId,
    status: "PENDING",
    startedAt: new Date().toISOString(),
    closesAt: new Date(Date.now() + config.orderCycleHours * 60 * 60 * 1000).toISOString(),
    estimatedTotal: order.total,
    products: store.cartItems.map((item) => item.product),
  };
  await clearCart();
  return order;
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
  await wait();
  const order = store.orders.find((item) => item.id === orderId);
  if (!order) throw new Error("Order not found.");
  const previous = order.status;
  order.status = status;
  order.timeline.push({
    label: status,
    time: new Date().toISOString(),
    note: `Status changed from ${previous}`,
  });
  return order;
}
