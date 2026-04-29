"use client";

import { useState, type ReactNode } from "react";
import { TopBar } from "./TopBar";
import { NotifDrawer } from "../drawers/NotifDrawer";

export function AdminShell({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="main">
      <TopBar onOpenDrawer={() => setDrawerOpen(true)} />
      <div className="content">{children}</div>
      <NotifDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
