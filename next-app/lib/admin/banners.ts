import { createClient } from "@/lib/supabase/server";
import type { BannerRow, BannerStatus, LangFlags } from "./types";

export const BANNER_BUCKET = "banner-images";

export function bannerStatus(b: Pick<BannerRow, "is_enabled" | "starts_at" | "ends_at">): BannerStatus {
  if (!b.is_enabled) return "disabled";
  const now = Date.now();
  if (b.starts_at && new Date(b.starts_at).getTime() > now) return "scheduled";
  if (b.ends_at && new Date(b.ends_at).getTime() < now) return "expired";
  return "active";
}

export function bannerLangFlags(b: BannerRow): LangFlags {
  return { vn: b.lang_vn, en: b.lang_en, cn: b.lang_cn };
}

export function bannerImageUrl(image_path: string | null | undefined): string | null {
  if (!image_path) return null;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  return `${base}/storage/v1/object/public/${BANNER_BUCKET}/${image_path}`;
}

export async function listBanners(): Promise<BannerRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .order("position", { ascending: true })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as BannerRow[];
}

export async function getBanner(id: string): Promise<BannerRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data as BannerRow | null) ?? null;
}

export async function listActiveBanners(position: BannerRow["position"]): Promise<BannerRow[]> {
  const supabase = await createClient();
  const nowIso = new Date().toISOString();
  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .eq("position", position)
    .eq("is_enabled", true)
    .or(`starts_at.is.null,starts_at.lte.${nowIso}`)
    .or(`ends_at.is.null,ends_at.gte.${nowIso}`)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data as BannerRow[];
}
