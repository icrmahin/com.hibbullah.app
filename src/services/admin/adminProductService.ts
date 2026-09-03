import { wait } from "../../lib/result";
import type { Product } from "../../types/product";
import { store } from "../mockData";

export async function getAdminProducts(): Promise<Product[]> {
  await wait();
  return [...store.products];
}

export async function createProduct(
  input: Omit<Product, "id" | "createdAt">,
): Promise<Product> {
  await wait();
  const product: Product = {
    ...input,
    id: `prod-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  store.products.unshift(product);
  store.audit.unshift({
    id: `audit-${Date.now()}`,
    actor: "Dr. Yusuf Ali",
    action: "Created product",
    timestamp: new Date().toISOString(),
    recordType: "Product",
    newValue: product.name,
  });
  return product;
}

export async function updateProduct(
  productId: string,
  patch: Partial<Product>,
): Promise<Product> {
  await wait();
  const product = store.products.find((item) => item.id === productId);
  if (!product) throw new Error("Product not found.");
  const oldPrice = String(product.price);
  Object.assign(product, patch);
  store.audit.unshift({
    id: `audit-${Date.now()}`,
    actor: "Dr. Yusuf Ali",
    action: "Edited product",
    timestamp: new Date().toISOString(),
    recordType: "Product",
    oldValue: oldPrice,
    newValue: String(product.price),
  });
  return product;
}

export async function setProductActive(productId: string, isActive: boolean): Promise<Product> {
  return updateProduct(productId, { isActive });
}
