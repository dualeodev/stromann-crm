"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  Download,
  DollarSign,
  FileText,
  Mail,
  Settings,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { SUBMISSIONS } from "@/lib/admin/data";
import { Pill } from "@/components/admin/atoms/Pill";
import { ActionRow } from "@/components/admin/atoms/ActionRow";

type FilterKey =
  | "all"
  | "new"
  | "in-progress"
  | "done"
  | "type-quote"
  | "type-tech"
  | "type-cv"
  | "type-contact";

export default function SubmissionsPage() {
  const [filter, setFilter] = useState<FilterKey>("all");

  const filtered = SUBMISSIONS.filter(
    (s) =>
      filter === "all" ||
      s.status === filter ||
      (filter === "type-quote"   && s.type === "Báo giá") ||
      (filter === "type-tech"    && s.type === "Tư vấn KT") ||
      (filter === "type-cv"      && s.type === "Ứng tuyển") ||
      (filter === "type-contact" && s.type === "Liên hệ"),
  );

  return (
    <>
      <div className="page-h">
        <div>
          <div className="crumb">Tổng quan / <span>Form gửi đến</span></div>
          <h1>Form gửi đến</h1>
          <p>Tất cả yêu cầu báo giá, tư vấn kỹ thuật, liên hệ và ứng tuyển từ website.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="btn btn--secondary inline-flex items-center gap-1.5">
            <Download size={14} /> Xuất CSV
          </button>
          <button type="button" className="btn btn--secondary inline-flex items-center gap-1.5">
            <Settings size={14} /> Cấu hình thông báo
          </button>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="stat__lbl">Mới chưa xử lý</div>
          <div className="stat__num text-brand-500">5</div>
          <div className="stat__delta up">cần phản hồi trong 4h</div>
        </div>
        <div className="stat"><div className="stat__lbl">Đang xử lý</div><div className="stat__num">11</div></div>
        <div className="stat">
          <div className="stat__lbl">Đã xử lý (7 ngày)</div>
          <div className="stat__num">93</div>
          <div className="stat__delta up inline-flex items-center gap-1"><TrendingUp size={12} /> +18%</div>
        </div>
        <div className="stat">
          <div className="stat__lbl">Thời gian phản hồi TB</div>
          <div className="stat__num">2.4h</div>
          <div className="stat__delta up">trong SLA</div>
        </div>
      </div>

      <div className="card">
        <div className="card__head">
          <div className="toolbar2 m-0">
            <div className="filt">
              {(
                [
                  ["all",          "Tất cả"],
                  ["new",          "Mới"],
                  ["in-progress",  "Đang xử lý"],
                  ["done",         "Đã xử lý"],
                ] as Array<[FilterKey, string]>
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
              <span className="w-px bg-n-200 mx-1"></span>
              {(
                [
                  ["type-quote",   <><DollarSign size={12} /> Báo giá</>],
                  ["type-tech",    <><Wrench size={12} /> Tư vấn KT</>],
                  ["type-cv",      <><FileText size={12} /> CV</>],
                  ["type-contact", <><Mail size={12} /> Liên hệ</>],
                ] as Array<[FilterKey, ReactNode]>
              ).map(([k, l]) => (
                <button
                  key={k}
                  type="button"
                  className={`chip inline-flex items-center gap-1 ${filter === k ? "active" : ""}`}
                  onClick={() => setFilter(k)}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
        <table className="tbl">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Mã</th>
              <th>Loại</th>
              <th>Khách</th>
              <th>Thời gian</th>
              <th>Trạng thái</th>
              <th>Người phụ trách</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="cursor-pointer">
                <td onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" />
                </td>
                <td className="tbl__id">
                  <Link href={`/admin/submissions/${s.id}`} className="block">{s.id}</Link>
                </td>
                <td>
                  <Link href={`/admin/submissions/${s.id}`} className="block">{s.type}</Link>
                </td>
                <td>
                  <Link href={`/admin/submissions/${s.id}`} className="block">
                    <div className="tbl__name">{s.contact}</div>
                    <div className="tbl__sub">{s.company} · {s.email}</div>
                  </Link>
                </td>
                <td>
                  <span className="text-xs text-n-600">{s.date}</span>
                </td>
                <td><Pill status={s.status} /></td>
                <td>
                  {s.assignee || <span className="text-n-400">Chưa gán</span>}
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
