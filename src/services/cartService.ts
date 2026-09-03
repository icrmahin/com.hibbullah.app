import config from "../constants/config";
import { wait } from "../lib/result";
import type { CartItem, CartSummary } from "../types/cart";
import { store } from "./mockData";

function refreshCartProducts(): void {
  store.cartItems.forEach((item) => {
    const product = store.products.find((entry) => entry.id === item.productId);
    if (product) item.product = product;
  });
}

export function summarizeCart(
  items: CartItem[] = store.cartItems,
): CartSummary {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const discount = items.reduce((sum, item) => {
    const original = item.product.originalPrice ?? item.product.price;
    return sum + Math.max(0, original - item.product.price) * item.quantity;
  }, 0);
  const deliveryFee = items.length ? config.deliveryFee : 0;
  return {
    subtotal,
    discount,
    deliveryFee,
    total: subtotal + deliveryFee,
  };
}

export async function getCartItems(): Promise<CartItem[]> {
  await wait(40);
  refreshCartProducts();
  return [...store.cartItems];
}

export async function getCartSummary(): Promise<CartSummary> {
  await wait(20);
  refreshCartProducts();
  return summarizeCart();
}

export async function addToCart(
  productId: string,
  quantity: number,
): Promise<CartItem[]> {
  await wait();
  const product = store.products.find((item) => item.id === productId);
  if (!product || !product.isActive)
    throw new Error("This product is unavailable.");
  if (
    product.expiryDate &&
    new Date(product.expiryDate).getTime() <= Date.now()
  ) {
    throw new Error("This product has expired and cannot be added.");
  }
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error("Choose a valid quantity.");
  }
  if (product.stock < quantity)
    throw new Error("Not enough stock for that quantity.");

  const existing = store.cartItems.find((item) => item.productId === productId);
  if (existing) {
    if (existing.quantity + quantity > product.stock) {
      throw new Error("The requested quantity exceeds available stock.");
    }
    existing.quantity += quantity;
  } else {
    store.cartItems.push({
      id: `cart-${Date.now()}`,
      productId,
      quantity,
      product,
    });
  }
  return [...store.cartItems];
}

export async function updateCartQuantity(
  itemId: string,
  quantity: number,
): Promise<CartItem[]> {
  await wait(40);
  const item = store.cartItems.find((entry) => entry.id === itemId);
  if (!item) throw new Error("Cart item not found.");
  if (!Number.isInteger(quantity)) throw new Error("Choose a valid quantity.");
  if (quantity > item.product.stock)
    throw new Error("The requested quantity exceeds available stock.");
  if (quantity <= 0) {
    store.cartItems = store.cartItems.filter((entry) => entry.id !== itemId);
  } else {
    item.quantity = quantity;
  }
  return [...store.cartItems];
}

export async function removeCartItem(itemId: string): Promise<CartItem[]> {
  await wait(40);
  store.cartItems = store.cartItems.filter((entry) => entry.id !== itemId);
  return [...store.cartItems];
}

export async function clearCart(): Promise<void> {
  store.cartItems = [];
}
