import { wait } from "../../lib/result";
import { store, type CustomerRecord } from "../mockData";

export async function getCustomers(): Promise<CustomerRecord[]> {
  await wait();
  return [...store.customers];
}

export async function getCustomerById(customerId: string): Promise<CustomerRecord | undefined> {
  await wait(40);
  return store.customers.find((customer) => customer.id === customerId);
}
