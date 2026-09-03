export type { Address } from "./address";

export type User = {
  id: string;
  name: string;
  email?: string;
  phone: string;
  role: "customer" | "admin";
  avatar?: string;
  createdAt: string;
};
