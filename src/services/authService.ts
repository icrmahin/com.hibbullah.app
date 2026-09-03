import type { AuthSession, LoginForm, RegisterForm } from "../types/auth";
import type { User } from "../types/user";
import { wait } from "../lib/result";
import { store } from "./mockData";

const DEMO_PASSWORD = "password123";

export async function login(form: LoginForm): Promise<AuthSession> {
  await wait();
  const user = store.users.find(
    (item) => item.email?.toLowerCase() === form.email.trim().toLowerCase(),
  );

  if (!user || form.password !== DEMO_PASSWORD) {
    throw new Error("Invalid email or password.");
  }

  return {
    id: `session-${user.id}`,
    userId: user.id,
    role: user.role,
    email: user.email,
    phone: user.phone,
  };
}

export async function register(form: RegisterForm): Promise<AuthSession> {
  await wait();
  if (store.users.some((item) => item.email === form.email)) {
    throw new Error("An account with this email already exists.");
  }

  const user: User = {
    id: `user-${Date.now()}`,
    name: form.name,
    email: form.email,
    phone: form.phone,
    role: "customer",
    createdAt: new Date().toISOString(),
  };
  store.users.push(user);

  return {
    id: `session-${user.id}`,
    userId: user.id,
    role: "customer",
    email: user.email,
    phone: user.phone,
  };
}

export async function requestPasswordReset(email: string): Promise<void> {
  await wait();
  const exists = store.users.some((item) => item.email === email);
  if (!exists) {
    throw new Error("No account found for that email.");
  }
}

export async function resetPassword(_token: string, _password: string): Promise<void> {
  await wait();
}

export async function getUserById(userId: string): Promise<User | undefined> {
  await wait(40);
  return store.users.find((item) => item.id === userId);
}

export async function updateProfile(
  userId: string,
  patch: Partial<Pick<User, "name" | "email" | "phone">>,
): Promise<User> {
  await wait();
  const user = store.users.find((item) => item.id === userId);
  if (!user) throw new Error("User not found.");
  Object.assign(user, patch);
  return user;
}
