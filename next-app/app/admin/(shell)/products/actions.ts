"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";
import { createClient } from "@/lib/supabase/server";
import {
  PRODUCT_BUCKET,
  setProductCategories,
  setProductIndustries,
  setProductTechnicalIssues,
  type ProductStatus,
} from "@/lib/catalog";

type SbClient = Awaited<ReturnType<typeof createClient>>;

async function uploadProductImage(supabase: SbClient, file: File): Promise<string> {
  const ext = (file.name.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = `${randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from(PRODUCT_BUCKET)
    .upload(path, file, { contentType: file.type || undefined, upsert: false });
  if (error) throw new Error(`upload failed: ${error.message}`);
  return path;
}

async function uploadIfFile(supabase: SbClient, fileOrNull: FormDataEntryValue | null): Promise<string | null> {
  if (!fileOrNull || typeof fileOrNull === "string") return null;
  const file = fileOrNull as File;
  if (file.size === 0) return null;
  return uploadProductImage(supabase, file);
}

async function uploadAllFiles(supabase: SbClient, formData: FormData, name: string): Promise<string[]> {
  const entries = formData.getAll(name);
  const out: string[] = [];
  for (const entry of entries) {
    if (typeof entry === "string") continue;
    const file = entry as File;
    if (file.size === 0) continue;
    out.push(await uploadProductImage(supabase, file));
  }
  return out;
}

const STATUSES: ReadonlyArray<ProductStatus> = ["published", "draft", "scheduled"];

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

function parseStatus(v: FormDataEntryValue | null): ProductStatus {
  const s = String(v ?? "");
  return (STATUSES as readonly string[]).includes(s) ? (s as ProductStatus) : "draft";
}

function multi(formData: FormData, name: string): string[] {
  return formData.getAll(name).map((v) => String(v)).filter(Boolean);
}

function rowFromForm(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    brand: nullable(formData.get("brand")),
    region: nullable(formData.get("region")),
    short_description: nullable(formData.get("short_description")),
    detailed_description: nullable(formData.get("detailed_description")),
    status: parseStatus(formData.get("status")),
    is_enabled: bool(formData.get("is_enabled")),
    is_featured: bool(formData.get("is_featured")),
    sort_order: num(formData.get("sort_order"), 0),
    meta_title: nullable(formData.get("meta_title")),
    meta_description: nullable(formData.get("meta_description")),
    lang_vn: bool(formData.get("lang_vn")),
    lang_en: bool(formData.get("lang_en")),
    lang_cn: bool(formData.get("lang_cn")),
  };
}

export async function saveProductAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const isNew = id === "new" || !id;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const row = rowFromForm(formData);
  if (!row.name || !row.slug) {
    redirect(`/admin/products/${id || "new"}?error=missing_required`);
  }

  const categories = multi(formData, "categories");
  const industries = multi(formData, "industries");
  const techs = multi(formData, "techs");

  // Build the gallery patch from existing - removed + uploaded.
  const removed = new Set(multi(formData, "gallery_remove"));
  let existingGallery: string[] = [];
  let existingMain: string | null = null;
  if (!isNew) {
    const { data: prev } = await supabase
      .from("products")
      .select("main_image_path, gallery_paths")
      .eq("id", id)
      .maybeSingle();
    existingGallery = (prev?.gallery_paths as string[] | null) ?? [];
    existingMain = (prev?.main_image_path as string | null) ?? null;
  }

  const newMainPath = await uploadIfFile(supabase, formData.get("image"));
  const newGalleryPaths = await uploadAllFiles(supabase, formData, "gallery_new");
  const finalGallery = [
    ...existingGallery.filter((p) => !removed.has(p)),
    ...newGalleryPaths,
  ];

  const imagePatch: Record<string, unknown> = { gallery_paths: finalGallery };
  if (newMainPath) imagePatch.main_image_path = newMainPath;

  let productId: string;
  if (isNew) {
    const { data, error } = await supabase
      .from("products")
      .insert({ ...row, ...imagePatch, created_by: user.id, updated_by: user.id })
      .select("id")
      .single();
    if (error) throw error;
    productId = data.id as string;
  } else {
    const { error } = await supabase
      .from("products")
      .update({ ...row, ...imagePatch, updated_by: user.id })
      .eq("id", id);
    if (error) throw error;
    productId = id;
  }

  // Best-effort cleanup of removed/replaced storage objects.
  const orphans = [
    ...(removed.size ? Array.from(removed) : []),
    ...(newMainPath && existingMain ? [existingMain] : []),
  ];
  if (orphans.length) {
    await supabase.storage.from(PRODUCT_BUCKET).remove(orphans);
  }

  await Promise.all([
    setProductCategories(productId, categories),
    setProductIndustries(productId, industries),
    setProductTechnicalIssues(productId, techs),
  ]);

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${productId}`);
  revalidatePath("/products");
  revalidatePath(`/products/${row.slug}`);
  redirect(`/admin/products/${productId}?saved=1`);
}

export async function deleteProductAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  if (!id || id === "new") return;
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}
