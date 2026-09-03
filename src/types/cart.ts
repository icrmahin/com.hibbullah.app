import type { Product } from "./product";

export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
};

export type CartSummary = {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
};
