"use client";

import { Bell, ExternalLink, HelpCircle, LogOut, Search } from "lucide-react";
import { logoutAction } from "@/app/admin/login/actions";
import type { AdminUser } from "@/lib/admin/types";

const ROLE_LABEL: Record<AdminUser["role"], string> = {
  super_admin: "Super Admin",
  editor: "Editor",
  viewer: "Viewer",
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase() || "?";
}

export function TopBar({
  user,
  onOpenDrawer,
}: {
  user: AdminUser;
  onOpenDrawer: () => void;
}) {
  return (
    <div className="topbar">
      <div className="searchbar">
        <Search size={16} className="text-n-500" strokeWidth={2} />
        <input placeholder="Tìm sản phẩm, bài viết, yêu cầu, người dùng..." />
        <span className="text-[11px] text-n-400 px-1.5 py-0.5 border border-n-300 rounded">
          ⌘K
        </span>
      </div>
      <div className="tb__right">
        <button type="button" className="tb__btn" title="Trợ giúp" aria-label="Trợ giúp">
          <HelpCircle size={18} strokeWidth={1.75} />
        </button>
        <button
          type="button"
          className="tb__btn relative"
          title="Thông báo"
          aria-label="Thông báo"
          onClick={onOpenDrawer}
        >
          <Bell size={18} strokeWidth={1.75} />
          <span className="dot"></span>
        </button>
        <a
          className="tb__btn"
          href="/"
          title="Xem website"
          aria-label="Xem website"
          target="_blank"
          rel="noreferrer"
        >
          <ExternalLink size={18} strokeWidth={1.75} />
        </a>
        <div className="tb__user">
          <div className="tb__avatar">{initials(user.full_name)}</div>
          <div>
            <div className="text-xs font-bold">{user.full_name}</div>
            <div className="tb__role">{ROLE_LABEL[user.role]}</div>
          </div>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="tb__btn"
            title="Đăng xuất"
            aria-label="Đăng xuất"
          >
            <LogOut size={18} strokeWidth={1.75} />
          </button>
        </form>
      </div>
    </div>
  );
}
