import { useAuth } from "./useAuth";

export function useUser() {
  const { user, refreshUser } = useAuth();
  return { user, refreshUser };
}
