import { useCallback, useEffect, useState } from "react";
import { getProductById } from "../services/productService";
import type { Product } from "../types/product";
import { normalizeError } from "../utils/errorHandling";

export function useProduct(productId?: string) {
  const [product, setProduct] = useState<Product | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!productId) return;
    setLoading(true);
    setError(null);
    try {
      const result = await getProductById(productId);
      if (!result) setError("Product not found.");
      setProduct(result);
    } catch (err) {
      setError(normalizeError(err).message);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    load();
  }, [load]);

  return { product, loading, error, reload: load };
}
