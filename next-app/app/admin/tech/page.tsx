"use client";

import Link from "next/link";
import { ActionRow } from "@/components/admin/atoms/ActionRow";

interface TechItem {
  id: number;
  name: string;
  subs: number;
  products: number;
  articles: number;
}

const ITEMS: TechItem[] = [
  { id: 1, name: "Phân tán (Dispersion)", subs: 2, products: 8,  articles: 3 },
  { id: 2, name: "Bọt (Foam)",             subs: 2, products: 22, articles: 5 },
  { id: 3, name: "Độ nhớt (Rheology)",     subs: 2, products: 9,  articles: 2 },
  { id: 4, name: "Bề mặt (Surface)",       subs: 3, products: 12, articles: 4 },
];

export default function TechAdminPage() {
  return (
    <>
      <div className="page-h">
        <div>
          <div className="crumb">Nội dung / <span>Vấn đề kỹ thuật</span></div>
          <h1>Vấn đề kỹ thuật ↔ Giải pháp ↔ Sản phẩm</h1>
          <p>Liên kết vấn đề kỹ thuật với giải pháp đề xuất và sản phẩm phù hợp.</p>
        </div>
        <Link href="/admin/tech/new" className="btn btn--primary">+ Thêm vấn đề mới</Link>
      </div>

      <div className="card">
        <table className="tbl">
          <thead>
            <tr>
              <th>Vấn đề</th>
              <th>Vấn đề con</th>
              <th>Sản phẩm liên kết</th>
              <th>Bài viết</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ITEMS.map((i) => (
              <tr key={i.id} className="cursor-pointer">
                <td className="tbl__name">
                  <Link href={`/admin/tech/${i.id}`}>{i.name}</Link>
                </td>
                <td>{i.subs}</td>
                <td><b className="text-brand-500">{i.products}</b> sản phẩm</td>
                <td>{i.articles}</td>
                <td onClick={(e) => e.stopPropagation()}><ActionRow /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
