"use server";

import { createClient } from "@/lib/supabase/server";

export interface QuoteProduct {
  name: string;
  qty: number;
  unit: string;
  note?: string;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

interface BasicInfo {
  full_name: string;
  company: string;
  email: string;
  phone: string;
  address?: string | null;
}

export interface SubmitResult {
  ok: boolean;
  error?: string;
}

function readBasic(fd: FormData): BasicInfo {
  return {
    full_name: String(fd.get("full_name") ?? "").trim(),
    company:   String(fd.get("company")   ?? "").trim(),
    email:     String(fd.get("email")     ?? "").trim(),
    phone:     String(fd.get("phone")     ?? "").trim(),
    address:   (String(fd.get("address")  ?? "").trim() || null),
  };
}

function validateBasic(b: BasicInfo): string | null {
  if (!b.full_name) return "Vui lòng nhập họ tên.";
  if (!b.company)   return "Vui lòng nhập tên công ty.";
  if (!b.email)     return "Vui lòng nhập email.";
  if (!/^\S+@\S+\.\S+$/.test(b.email)) return "Email không hợp lệ.";
  if (!b.phone)     return "Vui lòng nhập số điện thoại.";
  return null;
}

export async function submitContactForm(_prev: SubmitResult | null, fd: FormData): Promise<SubmitResult> {
  const basic = readBasic(fd);
  const message = String(fd.get("message") ?? "").trim();
  const err = validateBasic(basic);
  if (err) return { ok: false, error: err };
  if (!message) return { ok: false, error: "Vui lòng nhập nội dung lời nhắn." };

  const supabase = await createClient();
  const { error } = await supabase.from("submissions").insert({
    type: "contact",
    ...basic,
    message,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function submitTechnicalForm(_prev: SubmitResult | null, fd: FormData): Promise<SubmitResult> {
  const basic = readBasic(fd);
  const technical_issue_id = String(fd.get("technical_issue_id") ?? "").trim();
  const message = String(fd.get("message") ?? "").trim();

  const err = validateBasic(basic);
  if (err) return { ok: false, error: err };
  if (!UUID_RE.test(technical_issue_id)) return { ok: false, error: "Vui lòng chọn loại vấn đề kỹ thuật." };
  if (!message) return { ok: false, error: "Vui lòng mô tả chi tiết vấn đề." };

  const supabase = await createClient();
  const { error } = await supabase.from("submissions").insert({
    type: "technical",
    ...basic,
    technical_issue_id,
    message,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function submitQuoteForm(_prev: SubmitResult | null, fd: FormData): Promise<SubmitResult> {
  const basic = readBasic(fd);
  const general_note = (String(fd.get("general_note") ?? "").trim() || null);

  // Products are submitted as parallel arrays: product_name[], product_qty[], product_unit[], product_note[]
  const names = fd.getAll("product_name").map((v) => String(v).trim());
  const qtys  = fd.getAll("product_qty").map((v) => Number(v));
  const units = fd.getAll("product_unit").map((v) => String(v).trim());
  const notes = fd.getAll("product_note").map((v) => String(v).trim());

  const products: QuoteProduct[] = [];
  for (let i = 0; i < names.length; i++) {
    if (!names[i]) continue;
    products.push({
      name: names[i],
      qty: Number.isFinite(qtys[i]) && qtys[i] > 0 ? qtys[i] : 1,
      unit: units[i] || "Kg",
      note: notes[i] || undefined,
    });
  }

  const err = validateBasic(basic);
  if (err) return { ok: false, error: err };
  if (products.length === 0) return { ok: false, error: "Vui lòng nhập ít nhất một sản phẩm." };

  const supabase = await createClient();
  const { error } = await supabase.from("submissions").insert({
    type: "quote",
    ...basic,
    products,
    general_note,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
