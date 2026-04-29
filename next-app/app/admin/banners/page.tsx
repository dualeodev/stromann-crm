"use client";

import Link from "next/link";
import { BANNERS } from "@/lib/admin/data";
import { Pill } from "@/components/admin/atoms/Pill";
import { LangChip } from "@/components/admin/atoms/LangChip";
import { Toggle } from "@/components/admin/atoms/Toggle";
import { ActionRow } from "@/components/admin/atoms/ActionRow";
import { showToast } from "@/lib/admin/showToast";

export default function BannersPage() {
  return (
    <>
      <div className="page-h">
        <div>
          <div className="crumb">Nội dung / <span>Banner trang chủ</span></div>
          <h1>Banner &amp; Slideshow</h1>
          <p>Quản lý banner hero homepage. Hỗ trợ thời gian hiệu lực để tự bật/tắt theo lịch.</p>
        </div>
        <Link href="/admin/banners/new" className="btn btn--primary">+ Thêm banner</Link>
      </div>

      <div className="card">
        <table className="tbl">
          <thead>
            <tr>
              <th></th>
              <th>Banner</th>
              <th>Hiệu lực từ</th>
              <th>Đến</th>
              <th>Trạng thái</th>
              <th>Ngôn ngữ</th>
              <th>Bật/Tắt</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {BANNERS.map((b) => (
              <tr key={b.id} className="cursor-pointer">
                <td><div className="thumb thumb--brand"></div></td>
                <td>
                  <Link href={`/admin/banners/${b.id}`}>
                    <div className="tbl__name">{b.title}</div>
                    <div className="tbl__sub">Banner #{b.id}</div>
                  </Link>
                </td>
                <td><span className="text-xs">{b.from}</span></td>
                <td><span className="text-xs">{b.to}</span></td>
                <td><Pill status={b.status} /></td>
                <td><LangChip lang={b.lang} /></td>
                <td onClick={(e) => e.stopPropagation()}>
                  <Toggle
                    on={b.status === "active"}
                    onChange={() => showToast("Đã đổi trạng thái banner")}
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
