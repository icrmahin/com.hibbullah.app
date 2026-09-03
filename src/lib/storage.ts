import { getSupabase } from "./supabase";

const PRODUCT_BUCKET = "products";

export async function getProductImageUrl(path?: string | null): Promise<string | null> {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  const supabase = getSupabase();
  if (!supabase) return null;

  const { data } = supabase.storage.from(PRODUCT_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadProductImage(
  productId: string,
  file: ArrayBuffer,
  contentType = "image/webp",
): Promise<string> {
  const supabase = getSupabase();
  if (!supabase) {
    throw new Error("Storage is not configured. Set EXPO_PUBLIC_SUPABASE_URL and ANON key.");
  }

  const path = `${productId}.webp`;
  const { error } = await supabase.storage.from(PRODUCT_BUCKET).upload(path, file, {
    contentType,
    upsert: true,
  });

  if (error) throw error;
  return path;
}
