"use client";

import Link from "next/link";
import { Pill } from "@/components/admin/atoms/Pill";
import { ActionRow } from "@/components/admin/atoms/ActionRow";

interface NewsRow {
  id: string;
  title: string;
  category: string;
  author: string;
  views: number;
  status: "published" | "draft";
  date: string;
}

const ITEMS: NewsRow[] = [
  { id: "n1", title: "5 lưu ý chọn defoamer cho sơn nước hệ acrylic", category: "Kiến thức KT", author: "Tech Team",  views: 1240, status: "published", date: "25/04/2026" },
  { id: "n2", title: "Case study: tối ưu công thức mực in flexo",     category: "Ứng dụng",     author: "Tech Team",  views: 892,  status: "published", date: "18/04/2026" },
  { id: "n3", title: "MÜNZING ra mắt dòng AGITAN® thế hệ mới",       category: "Sản phẩm",     author: "Marketing",  views: 1450, status: "published", date: "10/04/2026" },
  { id: "n4", title: "Stromann tham gia VietnamCoatings Expo 2026",   category: "Sự kiện",      author: "Marketing",  views: 320,  status: "published", date: "02/04/2026" },
  { id: "n5", title: "Wetting agent: cách chọn đúng cho từng loại pigment", category: "Kiến thức KT", author: "Tech Team", views: 0, status: "draft", date: "—" },
];

export default function NewsAdminPage() {
  return (
    <>
      <div className="page-h">
        <div>
          <div className="crumb">Nội dung / <span>Tin tức</span></div>
          <h1>Quản lý tin tức</h1>
          <p>4 chuyên mục: Kiến thức kỹ thuật · Ứng dụng thực tế · Sản phẩm · Tin công ty.</p>
        </div>
        <Link href="/admin/news/new" className="btn btn--primary">+ Viết bài mới</Link>
      </div>

      <div className="card">
        <table className="tbl">
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th>Chuyên mục</th>
              <th>Tác giả</th>
              <th>Lượt xem</th>
              <th>Trạng thái</th>
              <th>Ngày đăng</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ITEMS.map((n) => (
              <tr key={n.id} className="cursor-pointer">
                <td className="tbl__name">
                  <Link href={`/admin/news/${n.id}`}>{n.title}</Link>
                </td>
                <td>
                  <span className="text-[11px] px-2 py-0.5 bg-n-100 rounded">
                    {n.category}
                  </span>
                </td>
                <td>{n.author}</td>
                <td>{n.views.toLocaleString()}</td>
                <td><Pill status={n.status} /></td>
                <td><span className="text-xs text-n-600">{n.date}</span></td>
                <td onClick={(e) => e.stopPropagation()}><ActionRow /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
