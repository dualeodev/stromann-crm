"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/admin/data";
import type { AdminPageId } from "@/lib/admin/types";

function hrefFor(id: AdminPageId): string {
  return id === "dashboard" ? "/admin" : `/admin/${id}`;
}

function isActive(pathname: string, id: AdminPageId): boolean {
  const href = hrefFor(id);
  if (id === "dashboard") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname() ?? "/admin";

  return (
    <aside className="sb">
      <Link href="/admin" className="sb__brand">
        <div className="sb__mark">S</div>
        <div>
          <div className="sb__name">STROMANN</div>
          <div className="sb__tag">Admin · CMS</div>
        </div>
      </Link>
      {NAV.map((item, i) =>
        "group" in item ? (
          <div key={"g" + i} className="sb__group">
            {item.group}
          </div>
        ) : (
          <Link
            key={item.id}
            href={hrefFor(item.id)}
            className={`sb__item ${isActive(pathname, item.id) ? "active" : ""}`}
          >
            <span className="sb__icon"><item.icon size={18} strokeWidth={1.75} /></span>
            <span>{item.label}</span>
            {item.count != null && (
              <span className={`sb__count ${item.hot ? "sb__count--hot" : ""}`}>
                {item.count}
              </span>
            )}
          </Link>
        ),
      )}
    </aside>
  );
}
