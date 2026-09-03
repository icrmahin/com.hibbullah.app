import type { Product } from "../types/product";
import { wait } from "../lib/result";
import { store } from "./mockData";

export type ProductFilters = {
  query?: string;
  categoryId?: string;
  manufacturerId?: string;
  brand?: string;
  genericName?: string;
  page?: number;
  pageSize?: number;
};

export async function getProducts(filters: ProductFilters = {}): Promise<{
  data: Product[];
  hasMore: boolean;
}> {
  await wait();
  const page = filters.page ?? 0;
  const pageSize = filters.pageSize ?? 20;
  const query = filters.query?.trim().toLowerCase() ?? "";

  const filtered = store.products.filter((product) => {
    if (!product.isActive) return false;
    if (filters.categoryId && product.categoryId !== filters.categoryId) return false;
    if (filters.manufacturerId && product.manufacturerId !== filters.manufacturerId) {
      return false;
    }
    if (filters.brand && product.brand !== filters.brand) return false;
    if (filters.genericName && product.genericName !== filters.genericName) return false;
    if (!query) return true;
    return [product.name, product.brand, product.genericName]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  const start = page * pageSize;
  return {
    data: filtered.slice(start, start + pageSize),
    hasMore: start + pageSize < filtered.length,
  };
}

export async function getProductById(productId: string): Promise<Product | undefined> {
  await wait(40);
  return store.products.find((product) => product.id === productId);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const { data } = await getProducts({ query, pageSize: 40 });
  return data;
}

export async function getHomeCatalog(): Promise<{
  productOfTheDay?: Product;
  trending: Product[];
  newest: Product[];
  discounted: Product[];
}> {
  await wait();
  const active = store.products.filter((product) => product.isActive);
  return {
    productOfTheDay: active[0],
    trending: active.filter((product) => product.isFeatured),
    newest: [...active].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 4),
    discounted: active.filter((product) => (product.discountPercent ?? 0) > 0).slice(0, 4),
  };
}
