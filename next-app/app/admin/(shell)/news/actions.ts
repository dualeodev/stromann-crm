"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";
import sanitizeHtml from "sanitize-html";
import { createClient } from "@/lib/supabase/server";
import { NEWS_BUCKET, NEWS_CATEGORIES, isSlugTaken, slugify } from "@/lib/admin/news";
import type { NewsCategory } from "@/lib/admin/types";

function parseCategory(v: FormDataEntryValue | null): NewsCategory {
  const s = String(v ?? "");
  return (NEWS_CATEGORIES as readonly string[]).includes(s)
    ? (s as NewsCategory)
    : "tech_knowledge";
}

function parseDate(v: FormDataEntryValue | null): string | null {
  const s = String(v ?? "").trim();
  if (!s) return null;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

function parseBool(v: FormDataEntryValue | null): boolean {
  const s = String(v ?? "");
  return s === "on" || s === "true";
}

const SANITIZE_OPTS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p", "br",
    "strong", "em", "u", "s", "mark", "sub", "sup",
    "h2", "h3", "h4",
    "ul", "ol", "li",
    "blockquote", "code", "pre",
    "a", "img",
    "hr",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel"],
    img: ["src", "alt", "title"],
    p: ["style"],
    h2: ["style"],
    h3: ["style"],
    h4: ["style"],
    pre: ["class"],
    code: ["class"],
  },
  allowedStyles: {
    "*": {
      "text-align": [/^(left|center|right|justify)$/],
    },
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }, true),
  },
};

function sanitize(html: string): string {
  return sanitizeHtml(html, SANITIZE_OPTS);
}

async function uploadCoverIfPresent(
  supabase: Awaited<ReturnType<typeof createClient>>,
  formData: FormData,
): Promise<string | null> {
  const file = formData.get("cover") as File | null;
  if (!file || typeof file === "string" || file.size === 0) return null;
  const ext = (file.name.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = `${randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from(NEWS_BUCKET)
    .upload(path, file, { contentType: file.type || undefined, upsert: false });
  if (error) throw new Error(`upload failed: ${error.message}`);
  return path;
}

async function ensureUniqueSlug(base: string, exceptId?: string): Promise<string> {
  let slug = base || `bai-viet-${Date.now()}`;
  let i = 2;
  while (await isSlugTaken(slug, exceptId)) {
    slug = `${base}-${i++}`;
    if (i > 50) {
      slug = `${base}-${Date.now()}`;
      break;
    }
  }
  return slug;
}

function rowFromForm(formData: FormData) {
  const isPublished = parseBool(formData.get("is_published"));
  return {
    title: String(formData.get("title") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim() || null,
    body_html: sanitize(String(formData.get("body_html") ?? "")),
    category: parseCategory(formData.get("category")),
    read_minutes: Math.max(1, Number(formData.get("read_minutes") ?? 5) || 5),
    is_published: isPublished,
    published_at: parseDate(formData.get("published_at")),
    lang_vn: parseBool(formData.get("lang_vn")),
    lang_en: parseBool(formData.get("lang_en")),
    lang_cn: parseBool(formData.get("lang_cn")),
    meta_title: String(formData.get("meta_title") ?? "").trim() || null,
    meta_description: String(formData.get("meta_description") ?? "").trim() || null,
  };
}

export async function saveNewsAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const isNew = id === "new" || !id;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const row = rowFromForm(formData);
  if (!row.title) {
    redirect(`/admin/news/${id || "new"}?error=missing_title`);
  }

  const slugInput = String(formData.get("slug") ?? "").trim();
  const baseSlug = slugify(slugInput || row.title);
  const slug = await ensureUniqueSlug(baseSlug, isNew ? undefined : id);

  if (row.is_published && !row.published_at) {
    row.published_at = new Date().toISOString();
  }

  const newCoverPath = await uploadCoverIfPresent(supabase, formData);
  const coverRemove = parseBool(formData.get("cover_remove"));

  if (isNew) {
    const { data, error } = await supabase
      .from("news")
      .insert({
        ...row,
        slug,
        cover_path: newCoverPath,
        created_by: user.id,
        updated_by: user.id,
      })
      .select("id")
      .single();
    if (error) throw error;
    revalidatePath("/admin/news");
    revalidatePath("/news");
    revalidatePath(`/news/${slug}`);
    redirect(`/admin/news/${data.id}?saved=1`);
  } else {
    const patch: Record<string, unknown> = { ...row, slug, updated_by: user.id };

    let oldCoverToDelete: string | null = null;
    if (newCoverPath) {
      const { data: prev } = await supabase
        .from("news").select("cover_path").eq("id", id).maybeSingle();
      oldCoverToDelete = prev?.cover_path ?? null;
      patch.cover_path = newCoverPath;
    } else if (coverRemove) {
      const { data: prev } = await supabase
        .from("news").select("cover_path").eq("id", id).maybeSingle();
      oldCoverToDelete = prev?.cover_path ?? null;
      patch.cover_path = null;
    }

    const { error } = await supabase.from("news").update(patch).eq("id", id);
    if (error) throw error;

    if (oldCoverToDelete) {
      await supabase.storage.from(NEWS_BUCKET).remove([oldCoverToDelete]);
    }

    revalidatePath("/admin/news");
    revalidatePath(`/admin/news/${id}`);
    revalidatePath("/news");
    revalidatePath(`/news/${slug}`);
    redirect(`/admin/news/${id}?saved=1`);
  }
}

export async function deleteNewsAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;

  const supabase = await createClient();
  const { data: row } = await supabase
    .from("news")
    .select("cover_path, slug")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("news").delete().eq("id", id);
  if (error) throw error;

  if (row?.cover_path) {
    await supabase.storage.from(NEWS_BUCKET).remove([row.cover_path]);
  }

  revalidatePath("/admin/news");
  revalidatePath("/news");
  if (row?.slug) revalidatePath(`/news/${row.slug}`);
  redirect("/admin/news");
}

export async function uploadNewsInlineImage(formData: FormData): Promise<{ url: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const file = formData.get("file") as File | null;
  if (!file || typeof file === "string" || file.size === 0) {
    throw new Error("No file");
  }
  const ext = (file.name.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = `inline/${randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from(NEWS_BUCKET)
    .upload(path, file, { contentType: file.type || undefined });
  if (error) throw new Error(`upload failed: ${error.message}`);
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  return { url: `${base}/storage/v1/object/public/${NEWS_BUCKET}/${path}` };
}
