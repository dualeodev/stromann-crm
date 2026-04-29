"use client";

import Link from "next/link";
import { Pill } from "@/components/admin/atoms/Pill";
import { Toggle } from "@/components/admin/atoms/Toggle";
import { ActionRow } from "@/components/admin/atoms/ActionRow";
import { showToast } from "@/lib/admin/showToast";

interface Item {
  id: number;
  code: string;
  name: string;
  products: number;
  articles: number;
  visible: boolean;
  default: boolean;
}

const ITEMS: Item[] = [
  { id: 1, code: "S", name: "Sơn (Coatings)",          products: 28, articles: 7, visible: true,  default: true  },
  { id: 2, code: "M", name: "Mực in (Printing Inks)",  products: 18, articles: 4, visible: true,  default: true  },
  { id: 3, code: "N", name: "Nhựa & Masterbatch",      products: 12, articles: 3, visible: true,  default: true  },
  { id: 4, code: "K", name: "Keo dán (Adhesives)",     products: 5,  articles: 0, visible: false, default: false },
  { id: 5, code: "G", name: "Giấy (Paper Coatings)",   products: 0,  articles: 0, visible: false, default: false },
];

export default function IndustriesAdminPage() {
  return (
    <>
      <div className="page-h">
        <div>
          <div className="crumb">Nội dung / <span>Ngành ứng dụng</span></div>
          <h1>Ngành ứng dụng</h1>
          <p>Mặc định 3 ngành chính. Có thể thêm ngành mới và bật hiển thị bất cứ lúc nào.</p>
        </div>
        <Link href="/admin/industries/new" className="btn btn--primary">+ Thêm ngành mới</Link>
      </div>

      <div className="card">
        <table className="tbl">
          <thead>
            <tr>
              <th>Mã</th>
              <th>Tên ngành</th>
              <th>Sản phẩm</th>
              <th>Bài viết</th>
              <th>Mặc định</th>
              <th>Hiển thị</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ITEMS.map((i) => (
              <tr key={i.id} className="cursor-pointer">
                <td>
                  <span className="inline-flex w-7 h-7 rounded-md bg-[#FFE4E6] text-brand-700 items-center justify-center font-bold">
                    {i.code}
                  </span>
                </td>
                <td className="tbl__name">
                  <Link href={`/admin/industries/${i.id}`}>{i.name}</Link>
                </td>
                <td>{i.products}</td>
                <td>{i.articles}</td>
                <td>
                  {i.default ? (
                    <Pill status="published" />
                  ) : (
                    <span className="text-n-400 text-xs">—</span>
                  )}
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                  <Toggle
                    on={i.visible}
                    onChange={() => showToast("Đã đổi trạng thái ngành")}
                  />
                </td>
                <td onClick={(e) => e.stopPropagation()}><ActionRow /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
