import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/admin/layout/Sidebar";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { createClient } from "@/lib/supabase/server";

export default async function ShellLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("admin_users")
    .select("username, full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    // Authed in Supabase but missing admin profile — sign out and bounce.
    await supabase.auth.signOut();
    redirect("/admin/login?error=no_profile");
  }

  return (
    <div className="admin-root app" style={{ background: "#F5F6F8" }}>
      <Sidebar />
      <AdminShell user={profile}>{children}</AdminShell>
    </div>
  );
}
