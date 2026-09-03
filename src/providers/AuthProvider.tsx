import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AuthSession, LoginForm, RegisterForm } from "../types/auth";
import type { User } from "../types/user";
import * as authService from "../services/authService";
import { clearSession, loadSession, saveSession } from "../lib/session";

type AuthContextValue = {
  session: AuthSession | null;
  user: User | null;
  loading: boolean;
  login: (form: LoginForm) => Promise<AuthSession>;
  register: (form: RegisterForm) => Promise<AuthSession>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const hydrate = useCallback(async (next: AuthSession | null) => {
    setSession(next);
    if (!next) {
      setUser(null);
      return;
    }
    const profile = await authService.getUserById(next.userId);
    setUser(profile ?? null);
  }, []);

  useEffect(() => {
    loadSession()
      .then(hydrate)
      .finally(() => setLoading(false));
  }, [hydrate]);

  const login = useCallback(async (form: LoginForm) => {
    const next = await authService.login(form);
    await saveSession(next);
    await hydrate(next);
    return next;
  }, [hydrate]);

  const register = useCallback(async (form: RegisterForm) => {
    const next = await authService.register(form);
    await saveSession(next);
    await hydrate(next);
    return next;
  }, [hydrate]);

  const logout = useCallback(async () => {
    await clearSession();
    setSession(null);
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    if (!session) return;
    const profile = await authService.getUserById(session.userId);
    setUser(profile ?? null);
  }, [session]);

  const value = useMemo(
    () => ({ session, user, loading, login, register, logout, refreshUser }),
    [session, user, loading, login, register, logout, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used within AuthProvider");
  return value;
}
