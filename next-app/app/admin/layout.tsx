import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Sidebar } from "@/components/admin/layout/Sidebar";
import { AdminShell } from "@/components/admin/layout/AdminShell";

export const metadata: Metadata = {
  title: "Stromann Admin — CMS",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-root app" style={{ background: "#F5F6F8" }}>
      <Sidebar />
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
