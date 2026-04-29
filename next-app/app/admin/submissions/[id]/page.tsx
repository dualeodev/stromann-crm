"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DetailHeader } from "@/components/admin/layout/DetailHeader";
import { FormSection } from "@/components/admin/forms/FormSection";
import { Pill } from "@/components/admin/atoms/Pill";
import { showToast } from "@/lib/admin/showToast";
import type { SubmissionStatus } from "@/lib/admin/types";

interface CustomerField {
  lbl: string;
  val: string;
  link?: string;
}

const CUSTOMER_FIELDS: CustomerField[] = [
  { lbl: "Họ tên",         val: "Phạm Thị Lan" },
  { lbl: "Công ty",        val: "Cty CP Sơn Nippon Việt Nam" },
  { lbl: "Email",          val: "lan.pt@nippon.vn", link: "mailto:lan.pt@nippon.vn" },
  { lbl: "Số điện thoại",  val: "+84 909 123 456",  link: "tel:+84909123456" },
  { lbl: "Địa chỉ",        val: "Khu CN Amata, Biên Hòa, Đồng Nai" },
  { lbl: "Vai trò",        val: "R&D Manager" },
];

interface TimelineMsg {
  who: string;
  color: string;
  bg: string;
  msg: string;
  time: string;
}

const TIMELINE: TimelineMsg[] = [
  { who: "Khách",          color: "#1E40AF",         bg: "#DBEAFE",           msg: "Gửi yêu cầu báo giá lần đầu",                                  time: "29/04/2026 14:32" },
  { who: "Hệ thống",       color: "#52525B",         bg: "var(--n-100)",      msg: "Tự động gửi email xác nhận đến khách",                          time: "29/04/2026 14:32" },
  { who: "Văn A (Admin)",  color: "var(--brand-700)", bg: "#FFE4E6",           msg: "Gán cho Sales 1",                                               time: "29/04/2026 14:35" },
  { who: "Sales 1",        color: "#166534",         bg: "#DCFCE7",            msg: "Đã liên hệ khách qua điện thoại — xác nhận thông số",          time: "29/04/2026 15:12" },
];

const HISTORY: Array<{ date: string; text: string; current?: boolean }> = [
  { date: "29/04/2026", text: "Yêu cầu báo giá hiện tại",          current: true },
  { date: "15/03/2026", text: "Đã đặt 100kg AGITAN® 282" },
  { date: "10/01/2026", text: "Tư vấn kỹ thuật về dispersant" },
  { date: "20/11/2025", text: "Liên hệ lần đầu qua website" },
];

export default function SubmissionDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState<SubmissionStatus>("in-progress");
  const [assignee, setAssignee] = useState("Sales 1");

  const back = () => router.push("/admin/submissions");

  return (
    <>
      <DetailHeader
        breadcrumb="Form gửi đến"
        backHref="/admin/submissions"
        title={`Yêu cầu báo giá #${params.id}`}
        sub="Cty Sơn Nippon VN · Phạm Thị Lan · 29/04/2026 14:32"
        badge={<Pill status={status} />}
        actions={
          <>
            <button type="button" className="btn btn--secondary">📞 Gọi ngay</button>
            <button type="button" className="btn btn--secondary">⤓ Xuất PDF</button>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => {
                showToast("Đã gửi phản hồi đến khách");
                back();
              }}
            >
              📤 Gửi phản hồi
            </button>
          </>
        }
      />

      <div className="grid grid-cols-[1fr_340px] gap-5">
        <div>
          <FormSection title="Thông tin khách">
            <div className="grid grid-cols-2 gap-4">
              {CUSTOMER_FIELDS.map((f) => (
                <div key={f.lbl}>
                  <div className="text-[11px] text-n-500 uppercase font-bold tracking-[0.06em]">
                    {f.lbl}
                  </div>
                  <div className="mt-1 text-[13px] font-medium">
                    {f.link ? (
                      <a href={f.link} className="text-brand-500">{f.val}</a>
                    ) : (
                      f.val
                    )}
                  </div>
                </div>
              ))}
            </div>
          </FormSection>

          <FormSection title="Sản phẩm yêu cầu báo giá">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Mã sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Đơn vị</th>
                  <th>Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="tbl__name">AGITAN® 120</div>
                    <div className="tbl__sub">Defoamer · MÜNZING</div>
                  </td>
                  <td><b>200</b></td>
                  <td>kg</td>
                  <td className="text-xs text-n-600">Cần MSDS bản tiếng Anh</td>
                </tr>
                <tr>
                  <td>
                    <div className="tbl__name">EDAPLAN® 470</div>
                    <div className="tbl__sub">Dispersant · MÜNZING</div>
                  </td>
                  <td><b>50</b></td>
                  <td>kg</td>
                  <td className="text-xs text-n-600">—</td>
                </tr>
              </tbody>
            </table>
          </FormSection>

          <FormSection title="Ghi chú kỹ thuật từ khách">
            <div className="p-4 bg-n-50 rounded-lg text-[13px] leading-[1.6] text-n-700">
              "Chúng tôi đang phát triển dòng sơn nước nội thất mới với hàm lượng pigment cao (PVC ~75%). Đang gặp vấn đề bọt khí trong quá trình khuấy ở tốc độ 1500 rpm. Đã thử AGITAN® 282 nhưng hiệu quả không đủ. Mong được tư vấn và gửi mẫu thử AGITAN® 120 và EDAPLAN® 470 trước khi đặt lô lớn. Cần báo giá CIF Cát Lái, thanh toán LC 60 ngày."
            </div>
            <div className="mt-3 flex gap-2 items-center text-xs text-n-600">
              📎 <b>company-spec.pdf</b> · 432 KB · <a className="text-brand-500">Tải xuống</a>
            </div>
          </FormSection>

          <FormSection title="Lịch sử trao đổi">
            <div className="relative pl-6">
              <div className="absolute left-[7px] top-1 bottom-1 w-0.5 bg-n-200"></div>
              {TIMELINE.map((m, i) => (
                <div key={i} className="relative mb-4">
                  <div
                    className="absolute -left-5 top-1 w-3 h-3 rounded-full border-2 border-white"
                    style={{ background: m.color }}
                  ></div>
                  <div className="flex gap-2 items-center mb-1">
                    <span className="font-bold text-[13px]">{m.who}</span>
                    <span className="text-[11px] text-n-500">{m.time}</span>
                  </div>
                  <div
                    className="p-2.5 rounded-lg text-[13px] text-n-800"
                    style={{ background: m.bg }}
                  >
                    {m.msg}
                  </div>
                </div>
              ))}
            </div>
          </FormSection>

          <FormSection title="Phản hồi khách">
            <div className="flex gap-1.5 mb-2 flex-wrap">
              {["📧 Email báo giá", "📞 Đã gọi xác nhận", "📋 Yêu cầu thêm thông tin", "✅ Hoàn tất giao dịch"].map((t) => (
                <button key={t} type="button" className="chip text-[11px]">{t}</button>
              ))}
            </div>
            <div className="border border-n-300 rounded-lg overflow-hidden">
              <div className="p-1.5 bg-n-50 border-b border-n-200 flex gap-0.5">
                {["B", "I", "U", "🔗", "📷", "📎", "💰 Bảng giá"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    className="px-2 py-1 text-[11px] font-semibold text-n-700 rounded"
                  >
                    {t}
                  </button>
                ))}
              </div>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                className="w-full border-none p-3 min-h-[100px] text-[13px] outline-none resize-y"
                placeholder="Soạn nội dung phản hồi cho khách... (sẽ gửi qua email + lưu vào lịch sử)"
              />
            </div>
            <div className="flex justify-between items-center mt-3">
              <label className="text-xs text-n-600 flex gap-1.5 items-center">
                <input type="checkbox" defaultChecked /> CC bộ phận kỹ thuật
              </label>
              <div className="flex gap-2">
                <button type="button" className="btn btn--secondary">Lưu nháp</button>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => showToast("Đã gửi phản hồi đến khách")}
                >
                  📤 Gửi phản hồi
                </button>
              </div>
            </div>
          </FormSection>
        </div>

        <div>
          <div className="card mb-4">
            <div className="card__head"><h3>Trạng thái xử lý</h3></div>
            <div className="card__body">
              <div className="field">
                <label>Trạng thái</label>
                <select
                  className="input"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as SubmissionStatus)}
                >
                  <option value="new">Mới</option>
                  <option value="in-progress">Đang xử lý</option>
                  <option value="done">Đã xử lý</option>
                </select>
              </div>
              <div className="field">
                <label>Người phụ trách</label>
                <select
                  className="input"
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                >
                  <option>Chưa gán</option>
                  <option>Sales 1 — Trần Văn B</option>
                  <option>Sales 2 — Lê Thị C</option>
                  <option>Tech 1 — Nguyễn D</option>
                </select>
              </div>
              <div className="field">
                <label>Mức độ ưu tiên</label>
                <div className="flex gap-1">
                  {["Thấp", "Bình thường", "Cao", "Khẩn"].map((p) => (
                    <button
                      key={p}
                      type="button"
                      className="chip flex-1 py-1.5 text-[11px]"
                      style={
                        p === "Cao"
                          ? { background: "var(--brand-500)", color: "#fff", borderColor: "var(--brand-500)" }
                          : undefined
                      }
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div className="field">
                <label>Tags</label>
                <div className="flex gap-1 flex-wrap">
                  <span className="pill pill--brand">Khách lớn</span>
                  <span className="pill pill--info">Sơn nước</span>
                  <span className="pill pill--neutral">+ Thêm tag</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card__head"><h3>Lịch sử khách</h3></div>
            <div className="card__body p-0">
              {HISTORY.map((h, i) => (
                <div
                  key={i}
                  className={
                    "px-4 py-2.5 " +
                    (i ? "border-t border-n-100 " : "") +
                    (h.current ? "bg-[#FFF8F8]" : "")
                  }
                >
                  <div className="text-xs text-n-500">{h.date}</div>
                  <div className={"text-[13px] mt-0.5 " + (h.current ? "font-semibold" : "")}>
                    {h.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card__head"><h3>Hành động nhanh</h3></div>
            <div className="card__body flex flex-col gap-1.5">
              <button type="button" className="btn btn--secondary justify-start">📋 Tạo báo giá chính thức</button>
              <button type="button" className="btn btn--secondary justify-start">🧪 Tạo phiếu gửi mẫu thử</button>
              <button type="button" className="btn btn--secondary justify-start">👥 Chuyển sang Tech</button>
              <button type="button" className="btn btn--secondary justify-start">🚫 Đánh dấu spam</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
