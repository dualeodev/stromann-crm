"use client";

import Link from "next/link";
import { Pill } from "@/components/admin/atoms/Pill";
import { ActionRow } from "@/components/admin/atoms/ActionRow";

interface JobRow {
  id: number;
  title: string;
  dept: string;
  location: string;
  type: string;
  applicants: number;
  deadline: string;
  status: "published" | "draft";
}

const ITEMS: JobRow[] = [
  { id: 1, title: "Lab Engineer",            dept: "Kỹ thuật",   location: "TP.HCM", type: "Full-time", applicants: 12, deadline: "31/05/2026", status: "published" },
  { id: 2, title: "Tech Sales (Sơn nước)",   dept: "Kinh doanh", location: "TP.HCM", type: "Full-time", applicants: 8,  deadline: "30/05/2026", status: "published" },
  { id: 3, title: "Tech Sales miền Bắc",     dept: "Kinh doanh", location: "Hà Nội",  type: "Full-time", applicants: 5,  deadline: "15/05/2026", status: "published" },
  { id: 4, title: "Logistics Coordinator",   dept: "Kho vận",    location: "TP.HCM", type: "Full-time", applicants: 3,  deadline: "20/05/2026", status: "published" },
  { id: 5, title: "Marketing Specialist",    dept: "Marketing",  location: "TP.HCM", type: "Full-time", applicants: 7,  deadline: "25/05/2026", status: "published" },
  { id: 6, title: "Warehouse Staff",         dept: "Kho vận",    location: "Hà Nội",  type: "Full-time", applicants: 0,  deadline: "—",          status: "draft"     },
];

export default function RecruitmentAdminPage() {
  return (
    <>
      <div className="page-h">
        <div>
          <div className="crumb">Nội dung / <span>Tuyển dụng</span></div>
          <h1>Quản lý tuyển dụng</h1>
          <p>Vị trí đang mở và hồ sơ ứng viên.</p>
        </div>
        <Link href="/admin/recruitment/new" className="btn btn--primary">+ Thêm vị trí</Link>
      </div>

      <div className="card">
        <table className="tbl">
          <thead>
            <tr>
              <th>Vị trí</th>
              <th>Phòng ban</th>
              <th>Địa điểm</th>
              <th>Hình thức</th>
              <th>Ứng viên</th>
              <th>Hạn nộp</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ITEMS.map((j) => (
              <tr key={j.id} className="cursor-pointer">
                <td className="tbl__name">
                  <Link href={`/admin/recruitment/${j.id}`}>{j.title}</Link>
                </td>
                <td>{j.dept}</td>
                <td>{j.location}</td>
                <td><span className="pill pill--neutral">{j.type}</span></td>
                <td><b className="text-brand-500">{j.applicants}</b> CV</td>
                <td><span className="text-xs">{j.deadline}</span></td>
                <td><Pill status={j.status} /></td>
                <td onClick={(e) => e.stopPropagation()}><ActionRow /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
