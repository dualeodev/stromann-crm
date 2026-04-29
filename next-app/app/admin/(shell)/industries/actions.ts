"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function bool(v: FormDataEntryValue | null): boolean {
  const s = String(v ?? "");
  return s === "on" || s === "true";
}

function nullable(v: FormDataEntryValue | null): string | null {
  const s = String(v ?? "").trim();
  return s ? s : null;
}

function num(v: FormDataEntryValue | null, fallback: number): number {
  const n = Number(v ?? fallback);
  return Number.isFinite(n) ? n : fallback;
}

function rowFromForm(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    code: nullable(formData.get("code")),
    hex_color: nullable(formData.get("hex_color")),
    short_description: nullable(formData.get("short_description")),
    overview_description: nullable(formData.get("overview_description")),
    sort_order: num(formData.get("sort_order"), 0),
    is_enabled: bool(formData.get("is_enabled")),
    show_on_homepage: bool(formData.get("show_on_homepage")),
    show_in_mega_menu: bool(formData.get("show_in_mega_menu")),
    lang_vn: bool(formData.get("lang_vn")),
    lang_en: bool(formData.get("lang_en")),
    lang_cn: bool(formData.get("lang_cn")),
    meta_title: nullable(formData.get("meta_title")),
    meta_description: nullable(formData.get("meta_description")),
  };
}

export async function saveIndustryAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const isNew = id === "new" || !id;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const row = rowFromForm(formData);
  if (!row.name || !row.slug) {
    redirect(`/admin/industries/${id || "new"}?error=missing_required`);
  }

  if (isNew) {
    const { data, error } = await supabase
      .from("product_industries")
      .insert({ ...row, created_by: user.id, updated_by: user.id })
      .select("id")
      .single();
    if (error) throw error;
    revalidatePath("/admin/industries");
    revalidatePath("/products");
    redirect(`/admin/industries/${data.id}?saved=1`);
  } else {
    const { error } = await supabase
      .from("product_industries")
      .update({ ...row, updated_by: user.id })
      .eq("id", id);
    if (error) throw error;
    revalidatePath("/admin/industries");
    revalidatePath(`/admin/industries/${id}`);
    revalidatePath("/products");
    redirect(`/admin/industries/${id}?saved=1`);
  }
}

export async function deleteIndustryAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  if (!id || id === "new") return;
  const supabase = await createClient();
  const { error } = await supabase.from("product_industries").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/industries");
  revalidatePath("/products");
  redirect("/admin/industries");
}

export async function toggleIndustryAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;
  const next = bool(formData.get("next"));
  const supabase = await createClient();
  const { error } = await supabase
    .from("product_industries")
    .update({ is_enabled: next })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/industries");
  revalidatePath("/products");
}
