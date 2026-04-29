"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!username || !password) {
    redirect("/admin/login?error=missing");
  }

  const supabase = await createClient();

  const { data: email, error: rpcError } = await supabase.rpc(
    "admin_email_for_username",
    { p_username: username },
  );

  if (rpcError || !email) {
    redirect("/admin/login?error=invalid");
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: email as string,
    password,
  });

  if (error) {
    redirect("/admin/login?error=invalid");
  }

  const safeNext = next.startsWith("/admin") ? next : "/admin";
  redirect(safeNext);
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
