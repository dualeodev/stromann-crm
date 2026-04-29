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
    description: nullable(formData.get("description")),
    sort_order: num(formData.get("sort_order"), 0),
    is_enabled: bool(formData.get("is_enabled")),
    show_in_mega_menu: bool(formData.get("show_in_mega_menu")),
    lang_vn: bool(formData.get("lang_vn")),
    lang_en: bool(formData.get("lang_en")),
    lang_cn: bool(formData.get("lang_cn")),
  };
}

export async function saveTechAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const isNew = id === "new" || !id;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const row = rowFromForm(formData);
  if (!row.name || !row.slug) {
    redirect(`/admin/tech/${id || "new"}?error=missing_required`);
  }

  if (isNew) {
    const { data, error } = await supabase
      .from("technical_issues")
      .insert({ ...row, created_by: user.id, updated_by: user.id })
      .select("id")
      .single();
    if (error) throw error;
    revalidatePath("/admin/tech");
    revalidatePath("/products");
    redirect(`/admin/tech/${data.id}?saved=1`);
  } else {
    const { error } = await supabase
      .from("technical_issues")
      .update({ ...row, updated_by: user.id })
      .eq("id", id);
    if (error) throw error;
    revalidatePath("/admin/tech");
    revalidatePath(`/admin/tech/${id}`);
    revalidatePath("/products");
    redirect(`/admin/tech/${id}?saved=1`);
  }
}

export async function deleteTechAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  if (!id || id === "new") return;
  const supabase = await createClient();
  const { error } = await supabase.from("technical_issues").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/tech");
  revalidatePath("/products");
  redirect("/admin/tech");
}
