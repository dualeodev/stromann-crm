"use client";

import Link from "next/link";
import { useState } from "react";
import { ADMIN_PRODUCTS } from "@/lib/admin/data";
import { Pill } from "@/components/admin/atoms/Pill";
import { LangChip } from "@/components/admin/atoms/LangChip";
import { ActionRow } from "@/components/admin/atoms/ActionRow";

export default function ProductsAdminPage() {
  const [search, setSearch] = useState("");
  const filtered = ADMIN_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div className="page-h">
        <div>
          <div className="crumb">Nội dung / <span>Sản phẩm</span></div>
          <h1>Quản lý sản phẩm</h1>
          <p>72 sản phẩm — phân theo nhóm chức năng, ngành ứng dụng, vấn đề kỹ thuật và thương hiệu.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="btn btn--secondary">⤴ Import CSV</button>
          <Link href="/admin/products/new" className="btn btn--primary">
            + Thêm sản phẩm
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card__head">
          <div className="searchbar bg-[#F4F4F5] max-w-[300px]">
            <span>🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm sản phẩm..."
            />
          </div>
          <div className="flex gap-2">
            <button type="button" className="btn btn--ghost btn--sm">Tất cả nhóm ▾</button>
            <button type="button" className="btn btn--ghost btn--sm">Tất cả ngành ▾</button>
            <button type="button" className="btn btn--ghost btn--sm">Trạng thái ▾</button>
          </div>
        </div>
        <table className="tbl">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Sản phẩm</th>
              <th>Nhóm</th>
              <th>Ngành ứng dụng</th>
              <th>Trạng thái</th>
              <th>Ngôn ngữ</th>
              <th>Cập nhật</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="cursor-pointer">
                <td onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" />
                </td>
                <td>
                  <Link href={`/admin/products/${p.id}`} className="flex gap-2.5 items-center">
                    <div className="thumb thumb--brand"></div>
                    <div>
                      <div className="tbl__name">{p.name}</div>
                      <div className="tbl__sub">{p.brand} · {p.id}</div>
                    </div>
                  </Link>
                </td>
                <td><Link href={`/admin/products/${p.id}`}>{p.group}</Link></td>
                <td>
                  <div className="flex gap-1 flex-wrap">
                    {p.industries.map((i) => (
                      <span
                        key={i}
                        className="text-[11px] px-1.5 py-0.5 bg-n-100 rounded"
                      >
                        {i}
                      </span>
                    ))}
                  </div>
                </td>
                <td><Pill status={p.status} /></td>
                <td><LangChip lang={p.lang} /></td>
                <td><span className="text-xs text-n-600">{p.updated}</span></td>
                <td onClick={(e) => e.stopPropagation()}><ActionRow /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
