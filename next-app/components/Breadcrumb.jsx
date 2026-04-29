import Link from "next/link";
import React from "react";

export default function Breadcrumb({ items }) {
  return (
    <div className="breadcrumb">
      <Link href="/">Trang chủ</Link>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          <span className="breadcrumb__sep">/</span>
          {i === items.length - 1
            ? <span className="breadcrumb__current">{it.label}</span>
            : <Link href={it.href || "#"}>{it.label}</Link>}
        </React.Fragment>
      ))}
    </div>
  );
}
