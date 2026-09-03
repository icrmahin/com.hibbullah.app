import { wait } from "../lib/result";
import { store } from "./mockData";
import type { Category } from "../types/category";

export async function getCategories(): Promise<Category[]> {
  await wait(40);
  return store.categories;
}

export async function getCategoryById(categoryId: string): Promise<Category | undefined> {
  await wait(40);
  return store.categories.find((category) => category.id === categoryId);
}
