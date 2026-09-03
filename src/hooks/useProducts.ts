import { useCallback, useEffect, useState } from "react";
import { getProducts, type ProductFilters } from "../services/productService";
import type { Product } from "../types/product";
import { normalizeError } from "../utils/errorHandling";

export function useProducts(filters: ProductFilters = {}) {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getProducts(filters);
      setData(result.data);
      setHasMore(result.hasMore);
    } catch (err) {
      setError(normalizeError(err).message);
    } finally {
      setLoading(false);
    }
  }, [filters.query, filters.categoryId, filters.manufacturerId, filters.brand, filters.page]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, hasMore, reload: load };
}
