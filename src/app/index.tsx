import { Redirect } from "expo-router";
import LoadingState from "../components/common/LoadingState";
import { useAuth } from "../hooks/useAuth";

export default function AppIndex() {
  const { session, loading } = useAuth();
  if (loading) return <LoadingState label="Loading Hibbullah" />;
  if (!session) return <Redirect href="/(auth)/welcome" />;
  return (
    <Redirect
      href={session.role === "admin" ? "/(admin)" : "/(customer)/(tabs)"}
    />
  );
}
