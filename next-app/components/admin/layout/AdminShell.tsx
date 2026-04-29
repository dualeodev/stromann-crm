"use client";

import { useState, type ReactNode } from "react";
import { TopBar } from "./TopBar";
import { NotifDrawer } from "../drawers/NotifDrawer";
import type { AdminUser } from "@/lib/admin/types";

export function AdminShell({
  children,
  user,
}: {
  children: ReactNode;
  user: AdminUser;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="main">
      <TopBar user={user} onOpenDrawer={() => setDrawerOpen(true)} />
      <div className="content">{children}</div>
      <NotifDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
