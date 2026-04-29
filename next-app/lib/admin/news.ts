import { createClient } from "@/lib/supabase/server";
import type { NewsAdminStatus, NewsCategory, NewsRow } from "./types";

export const NEWS_BUCKET = "news-images";

export const NEWS_CATEGORIES: ReadonlyArray<NewsCategory> = [
  "tech_knowledge",
  "real_application",
  "product",
  "company",
];

export const NEWS_CATEGORY_LABEL: Record<NewsCategory, string> = {
  tech_knowledge: "Kiến thức kỹ thuật",
  real_application: "Ứng dụng thực tế",
  product: "Sản phẩm",
  company: "Tin công ty",
};

export function newsStatus(
  n: Pick<NewsRow, "is_published" | "published_at">,
): NewsAdminStatus {
  if (!n.is_published) return "draft";
  if (n.published_at && new Date(n.published_at).getTime() > Date.now()) {
    return "scheduled";
  }
  return "published";
}

export function newsImageUrl(cover_path: string | null | undefined): string | null {
  if (!cover_path) return null;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  return `${base}/storage/v1/object/public/${NEWS_BUCKET}/${cover_path}`;
}

export async function listNewsPaged(opts: {
  page: number;
  pageSize: number;
  category?: NewsCategory | null;
  q?: string | null;
}): Promise<{ rows: NewsRow[]; total: number }> {
  const supabase = await createClient();
  const from = (opts.page - 1) * opts.pageSize;
  let query = supabase
    .from("news")
    .select("*", { count: "exact" })
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .range(from, from + opts.pageSize - 1);

  if (opts.category) query = query.eq("category", opts.category);
  if (opts.q && opts.q.trim()) {
    const term = `%${opts.q.trim()}%`;
    query = query.or(`title.ilike.${term},excerpt.ilike.${term}`);
  }

  const { data, error, count } = await query;
  if (error) throw error;
  return { rows: (data ?? []) as NewsRow[], total: count ?? 0 };
}

export async function getNews(id: string): Promise<NewsRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data as NewsRow | null) ?? null;
}

export async function getPublishedNewsBySlug(slug: string): Promise<NewsRow | null> {
  const supabase = await createClient();
  const nowIso = new Date().toISOString();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .or(`published_at.is.null,published_at.lte.${nowIso}`)
    .maybeSingle();
  if (error) throw error;
  return (data as NewsRow | null) ?? null;
}

export async function listPublishedNews(opts: {
  category?: NewsCategory | null;
  limit?: number;
  excludeId?: string;
} = {}): Promise<NewsRow[]> {
  const supabase = await createClient();
  const nowIso = new Date().toISOString();
  let query = supabase
    .from("news")
    .select("*")
    .eq("is_published", true)
    .or(`published_at.is.null,published_at.lte.${nowIso}`)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (opts.category) query = query.eq("category", opts.category);
  if (opts.excludeId) query = query.neq("id", opts.excludeId);
  if (opts.limit) query = query.limit(opts.limit);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as NewsRow[];
}

export async function isSlugTaken(slug: string, exceptId?: string): Promise<boolean> {
  const supabase = await createClient();
  let query = supabase.from("news").select("id").eq("slug", slug).limit(1);
  if (exceptId) query = query.neq("id", exceptId);
  const { data, error } = await query;
  if (error) throw error;
  return (data?.length ?? 0) > 0;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 80);
}
