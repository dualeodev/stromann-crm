import Link from "next/link";
import React from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="bg-n-50 px-20 py-4 flex gap-2 items-center text-[13px] text-n-500">
      <Link href="/" className="text-n-500 transition-colors duration-150 hover:text-accent">
        Trang chủ
      </Link>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          <span className="text-n-300">/</span>
          {i === items.length - 1 ? (
            <span className="text-n-900 font-semibold">{it.label}</span>
          ) : (
            <Link
              href={it.href || "#"}
              className="text-n-500 transition-colors duration-150 hover:text-accent"
            >
              {it.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
