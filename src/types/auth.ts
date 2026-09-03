export type Role = "customer" | "admin";

export type AuthSession = {
  id: string;
  userId: string;
  role: Role;
  email?: string;
  phone?: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type RegisterForm = {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};
