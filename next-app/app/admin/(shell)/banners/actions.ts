"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";
import { createClient } from "@/lib/supabase/server";
import { BANNER_BUCKET } from "@/lib/admin/banners";
import type { BannerPosition } from "@/lib/admin/types";

const POSITIONS: ReadonlyArray<BannerPosition> = ["hero_home", "product_hero", "home_mid"];

function parsePosition(v: FormDataEntryValue | null): BannerPosition {
  const s = String(v ?? "");
  return (POSITIONS as readonly string[]).includes(s) ? (s as BannerPosition) : "hero_home";
}

function parseDate(v: FormDataEntryValue | null): string | null {
  const s = String(v ?? "").trim();
  if (!s) return null;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

function parseBool(v: FormDataEntryValue | null): boolean {
  return String(v ?? "") === "on" || String(v ?? "") === "true";
}

async function uploadImageIfPresent(
  supabase: Awaited<ReturnType<typeof createClient>>,
  formData: FormData,
): Promise<string | null> {
  const file = formData.get("image") as File | null;
  if (!file || typeof file === "string" || file.size === 0) return null;

  const ext = (file.name.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = `${randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from(BANNER_BUCKET)
    .upload(path, file, { contentType: file.type || undefined, upsert: false });

  if (error) throw new Error(`upload failed: ${error.message}`);
  return path;
}

function rowFromForm(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    cta_label: String(formData.get("cta_label") ?? "").trim() || null,
    cta_href: String(formData.get("cta_href") ?? "").trim() || null,
    position: parsePosition(formData.get("position")),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
    starts_at: parseBool(formData.get("no_window")) ? null : parseDate(formData.get("starts_at")),
    ends_at: parseBool(formData.get("no_window")) ? null : parseDate(formData.get("ends_at")),
    is_enabled: parseBool(formData.get("is_enabled")),
    lang_vn: parseBool(formData.get("lang_vn")),
    lang_en: parseBool(formData.get("lang_en")),
    lang_cn: parseBool(formData.get("lang_cn")),
  };
}

export async function saveBannerAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const isNew = id === "new" || !id;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const row = rowFromForm(formData);
  if (!row.title) redirect(`/admin/banners/${id || "new"}?error=missing_title`);

  const newImagePath = await uploadImageIfPresent(supabase, formData);

  if (isNew) {
    const { data, error } = await supabase
      .from("banners")
      .insert({
        ...row,
        image_path: newImagePath,
        created_by: user.id,
        updated_by: user.id,
      })
      .select("id")
      .single();
    if (error) throw error;
    revalidatePath("/admin/banners");
    revalidatePath("/");
    redirect(`/admin/banners/${data.id}?saved=1`);
  } else {
    const patch: Record<string, unknown> = { ...row, updated_by: user.id };
    if (newImagePath) patch.image_path = newImagePath;
    const { error } = await supabase.from("banners").update(patch).eq("id", id);
    if (error) throw error;
    revalidatePath("/admin/banners");
    revalidatePath(`/admin/banners/${id}`);
    revalidatePath("/");
    redirect(`/admin/banners/${id}?saved=1`);
  }
}

export async function deleteBannerAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;

  const supabase = await createClient();

  const { data: row } = await supabase
    .from("banners")
    .select("image_path")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("banners").delete().eq("id", id);
  if (error) throw error;

  if (row?.image_path) {
    await supabase.storage.from(BANNER_BUCKET).remove([row.image_path]);
  }

  revalidatePath("/admin/banners");
  revalidatePath("/");
  redirect("/admin/banners");
}

export async function toggleBannerAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;
  const next = parseBool(formData.get("next"));
  const supabase = await createClient();
  const { error } = await supabase
    .from("banners")
    .update({ is_enabled: next })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/banners");
  revalidatePath("/");
}
