import { wait } from "../lib/result";
import { store } from "./mockData";
import type { Address } from "../types/address";

export async function getAddresses(): Promise<Address[]> {
  await wait(40);
  return [...store.addresses];
}

export async function saveAddress(address: Address): Promise<Address[]> {
  await wait();
  const existing = store.addresses.findIndex((item) => item.id === address.id);
  if (address.isDefault) {
    store.addresses.forEach((item) => {
      item.isDefault = false;
    });
  }
  if (existing >= 0) {
    store.addresses[existing] = address;
  } else {
    store.addresses.push({ ...address, id: address.id || `addr-${Date.now()}` });
  }
  return [...store.addresses];
}
