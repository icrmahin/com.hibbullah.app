import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, CartSummary } from "../types/cart";
import * as cartService from "../services/cartService";

type CartContextValue = {
  items: CartItem[];
  summary: CartSummary;
  loading: boolean;
  itemCount: number;
  refresh: () => Promise<void>;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  setQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

const emptySummary: CartSummary = { subtotal: 0, discount: 0, deliveryFee: 0, total: 0 };

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [summary, setSummary] = useState<CartSummary>(emptySummary);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const [nextItems, nextSummary] = await Promise.all([
      cartService.getCartItems(),
      cartService.getCartSummary(),
    ]);
    setItems(nextItems);
    setSummary(nextSummary);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addItem = useCallback(async (productId: string, quantity = 1) => {
    const next = await cartService.addToCart(productId, quantity);
    setItems(next);
    setSummary(cartService.summarizeCart(next));
  }, []);

  const setQuantity = useCallback(async (itemId: string, quantity: number) => {
    const next = await cartService.updateCartQuantity(itemId, quantity);
    setItems(next);
    setSummary(cartService.summarizeCart(next));
  }, []);

  const removeItem = useCallback(async (itemId: string) => {
    const next = await cartService.removeCartItem(itemId);
    setItems(next);
    setSummary(cartService.summarizeCart(next));
  }, []);

  const value = useMemo(
    () => ({
      items,
      summary,
      loading,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      refresh,
      addItem,
      setQuantity,
      removeItem,
    }),
    [items, summary, loading, refresh, addItem, setQuantity, removeItem],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used within CartProvider");
  return value;
}
