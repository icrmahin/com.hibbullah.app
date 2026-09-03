import { wait } from "../../lib/result";
import { store } from "../mockData";

export async function getSalesReport() {
  await wait();
  const delivered = store.orders.filter((order) => order.status === "DELIVERED");
  const revenue = delivered.reduce((sum, order) => sum + order.total, 0);
  const discounts = store.orders.reduce((sum, order) => sum + order.discount, 0);
  return {
    daily: revenue,
    weekly: revenue,
    monthly: revenue,
    productSales: store.orders.flatMap((order) => order.items),
    totalRevenue: revenue,
    discounts,
    deliveredCount: delivered.length,
  };
}

export async function getInventoryReport() {
  await wait();
  const value = store.products.reduce((sum, product) => sum + product.price * product.stock, 0);
  return {
    currentStock: store.inventory.reduce((sum, item) => sum + item.quantity, 0),
    lowStock: store.inventory.filter((item) => item.status === "low").length,
    outOfStock: store.inventory.filter((item) => item.status === "out_of_stock").length,
    expiring: store.inventory.filter((item) => item.expiryDate && new Date(item.expiryDate) < new Date("2027-01-01")).length,
    expired: store.inventory.filter((item) => item.expiryDate && new Date(item.expiryDate) < new Date()).length,
    inventoryValue: value,
  };
}
