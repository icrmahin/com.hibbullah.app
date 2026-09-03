import { wait } from "../lib/result";
import { store } from "./mockData";
import type { Manufacturer } from "../types/manufacturer";

export async function getManufacturers(): Promise<Manufacturer[]> {
  await wait(40);
  return store.manufacturers;
}

export async function getManufacturerById(
  manufacturerId: string,
): Promise<Manufacturer | undefined> {
  await wait(40);
  return store.manufacturers.find((manufacturer) => manufacturer.id === manufacturerId);
}
