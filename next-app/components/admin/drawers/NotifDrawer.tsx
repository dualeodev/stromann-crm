"use client";

import Link from "next/link";
import { useState } from "react";
import { showToast } from "@/lib/admin/showToast";
import { NOTIFICATIONS } from "@/lib/admin/data";
import type { AdminNotification, NotifTarget } from "@/lib/admin/types";

function targetHref(t: NotifTarget): string {
  return `/admin/${t.page}/${t.id}`;
}

function NotifRow({
  n,
  onNavigate,
}: {
  n: AdminNotification;
  onNavigate: () => void;
}) {
  const body = (
    <>
      <div className={`notif__icon ${n.type}`}>{n.icon}</div>
      <div className="notif__body">
        <div className="notif__title">{n.title}</div>
        <div className="notif__sub">{n.sub}</div>
        <div className="notif__time">{n.time}</div>
      </div>
      <div className="flex items-center text-n-400 text-base">›</div>
    </>
  );

  if (n.target) {
    return (
      <Link
        href={targetHref(n.target)}
        onClick={onNavigate}
        className={`notif ${n.unread ? "unread" : ""} cursor-pointer`}
      >
        {body}
      </Link>
    );
  }
  return <div className={`notif ${n.unread ? "unread" : ""}`}>{body}</div>;
}

export function NotifDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const filtered = NOTIFICATIONS.filter(
    (n) => filter === "all" || (filter === "unread" && n.unread),
  );
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <>
      <div className={`drawer__overlay ${open ? "open" : ""}`} onClick={onClose}></div>
      <div className={`drawer ${open ? "open" : ""}`}>
        <div className="drawer__head">
          <h3>Thông báo</h3>
          <button type="button" className="btn btn--ghost btn--sm" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="drawer__filter">
          <button
            type="button"
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            Tất cả ({NOTIFICATIONS.length})
          </button>
          <button
            type="button"
            className={filter === "unread" ? "active" : ""}
            onClick={() => setFilter("unread")}
          >
            Chưa đọc ({unreadCount})
          </button>
          <span className="flex-1"></span>
          <button type="button" onClick={() => showToast("Đã đánh dấu đã đọc")}>
            ✓ Tất cả
          </button>
        </div>
        <div className="drawer__list">
          {filtered.map((n) => (
            <NotifRow key={n.id} n={n} onNavigate={onClose} />
          ))}
        </div>
      </div>
    </>
  );
}
