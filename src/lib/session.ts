import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import type { AuthSession } from "../types/auth";

const SESSION_KEY = "hibbullah.session";

function getWebStorage(): Storage | null {
  if (Platform.OS !== "web" || typeof localStorage === "undefined") return null;
  return localStorage;
}

export async function saveSession(session: AuthSession): Promise<void> {
  const webStorage = getWebStorage();
  if (webStorage) {
    webStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return;
  }
  await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session));
}

export async function loadSession(): Promise<AuthSession | null> {
  const webStorage = getWebStorage();
  const raw = webStorage
    ? webStorage.getItem(SESSION_KEY)
    : await SecureStore.getItemAsync(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export async function clearSession(): Promise<void> {
  const webStorage = getWebStorage();
  if (webStorage) {
    webStorage.removeItem(SESSION_KEY);
    return;
  }
  await SecureStore.deleteItemAsync(SESSION_KEY);
}
