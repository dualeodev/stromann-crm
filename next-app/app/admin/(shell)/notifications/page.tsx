"use client";

import Link from "next/link";
import { useState } from "react";
import { NOTIFICATIONS } from "@/lib/admin/data";
import { showToast } from "@/lib/admin/showToast";
import { Toggle } from "@/components/admin/atoms/Toggle";
import type { AdminNotification } from "@/lib/admin/types";

type Filter = "all" | "unread" | "quote" | "tech" | "cv" | "contact";

const CHANNELS: Array<{ name: string; desc: string; on: boolean }> = [
  { name: "📧 Email",          desc: "vana@stromann.vn",       on: true },
  { name: "💬 Zalo OA",        desc: "Bot Zalo Stromann",       on: true },
  { name: "📱 Push (browser)", desc: "Khi đang mở admin",       on: true },
  { name: "🔔 Telegram",       desc: "Group Sales & Tech",      on: false },
  { name: "📩 SMS",            desc: "Chỉ cho yêu cầu khẩn",    on: false },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [items, setItems] = useState<AdminNotification[]>(NOTIFICATIONS);
  const [channels, setChannels] = useState(CHANNELS);

  const filtered = items.filter(
    (n) =>
      filter === "all" ||
      (filter === "unread" && n.unread) ||
      filter === n.type,
  );
  const markAll = () => {
    setItems(items.map((n) => ({ ...n, unread: false })));
    showToast("Đã đánh dấu tất cả là đã đọc");
  };

  return (
    <>
      <div className="page-h">
        <div>
          <div className="crumb">Tổng quan / <span>Thông báo</span></div>
          <h1>Trung tâm thông báo</h1>
          <p>Tất cả thông báo từ form, hệ thống và hoạt động đội nhóm.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="btn btn--secondary" onClick={markAll}>
            ✓ Đánh dấu tất cả đã đọc
          </button>
          <button type="button" className="btn btn--secondary">⚙ Cài đặt thông báo</button>
        </div>
      </div>

      <div className="row-2">
        <div className="card">
          <div className="card__head">
            <div className="filt flex gap-1.5">
              {(
                [
                  ["all",      "Tất cả"],
                  ["unread",   "Chưa đọc"],
                  ["quote",    "Báo giá"],
                  ["tech",     "Tư vấn KT"],
                  ["cv",       "Ứng tuyển"],
                  ["contact",  "Liên hệ"],
                ] as Array<[Filter, string]>
              ).map(([k, l]) => (
                <button
                  key={k}
                  type="button"
                  className={`chip ${filter === k ? "active" : ""}`}
                  onClick={() => setFilter(k)}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="card__body p-0">
            {filtered.map((n) => {
              const href = n.target ? `/admin/${n.target.page}/${n.target.id}` : "#";
              return (
                <Link
                  key={n.id}
                  href={href}
                  className={`notif ${n.unread ? "unread" : ""} cursor-pointer`}
                >
                  <div className={`notif__icon ${n.type}`}>{n.icon}</div>
                  <div className="notif__body">
                    <div className="notif__title">{n.title}</div>
                    <div className="notif__sub">{n.sub}</div>
                    <div className="notif__time">{n.time}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="card">
          <div className="card__head"><h3>Cài đặt kênh nhận thông báo</h3></div>
          <div className="card__body">
            {channels.map((c, i) => (
              <div
                key={i}
                className={
                  "flex items-center py-3 " +
                  (i ? "border-t border-n-100" : "")
                }
              >
                <div className="flex-1">
                  <div className="font-semibold text-[13px]">{c.name}</div>
                  <div className="text-xs text-n-500 mt-0.5">{c.desc}</div>
                </div>
                <Toggle
                  on={c.on}
                  onChange={(v) => {
                    setChannels(channels.map((x, j) => (j === i ? { ...x, on: v } : x)));
                    showToast("Đã cập nhật cài đặt");
                  }}
                />
              </div>
            ))}
            <div className="mt-4 p-3 bg-[#FFF8F8] border border-[#FFE4E6] rounded-lg text-xs text-n-700">
              💡 Yêu cầu báo giá và tư vấn kỹ thuật khẩn sẽ <b>luôn</b> được gửi qua Email + Push, không thể tắt.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
