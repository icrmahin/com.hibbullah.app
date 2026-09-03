export const env = {
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "",
  useMock:
    process.env.EXPO_PUBLIC_USE_MOCK !== "false" ||
    !process.env.EXPO_PUBLIC_SUPABASE_URL ||
    !process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
};

export const isBackendReady = (): boolean =>
  Boolean(env.supabaseUrl && env.supabaseAnonKey && !env.useMock);
