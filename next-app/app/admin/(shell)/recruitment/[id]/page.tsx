"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FileText } from "lucide-react";
import { DetailHeader } from "@/components/admin/layout/DetailHeader";
import { FormSection } from "@/components/admin/forms/FormSection";
import { Pill } from "@/components/admin/atoms/Pill";
import { ActionRow } from "@/components/admin/atoms/ActionRow";
import { showToast } from "@/lib/admin/showToast";

interface Applicant {
  name: string;
  email: string;
  phone: string;
  exp: string;
  status: "new" | "in-progress" | "done";
  date: string;
}

const APPLICANTS: Applicant[] = [
  { name: "Nguyễn Thanh Hà", email: "hanguyen@gmail.com", phone: "0909 111 222", exp: "3 năm — MÜNZING TW",     status: "new",         date: "29/04/2026" },
  { name: "Trần Minh Tú",    email: "tutm@gmail.com",     phone: "0911 333 444", exp: "2 năm — Sơn 4 Oranges",    status: "in-progress", date: "27/04/2026" },
  { name: "Lê Hoàng An",     email: "an.lh@yahoo.com",    phone: "0933 555 666", exp: "5 năm — AkzoNobel",         status: "in-progress", date: "25/04/2026" },
  { name: "Phạm Thị Nga",    email: "nga.pt@gmail.com",   phone: "0977 777 888", exp: "Fresh",                     status: "done",        date: "20/04/2026" },
];

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const isNew = params.id === "new";
  const [tab, setTab] = useState<"info" | "applicants">("info");

  const back = () => router.push("/admin/recruitment");

  return (
    <>
      <DetailHeader
        breadcrumb="Tuyển dụng"
        backHref="/admin/recruitment"
        title={isNew ? "Thêm vị trí tuyển dụng" : "Lab Engineer"}
        sub={isNew ? undefined : "Kỹ thuật · TP.HCM · Full-time · Hạn 31/05/2026"}
        badge={!isNew ? <Pill status="published" /> : undefined}
        actions={
          <>
            <button type="button" className="btn btn--ghost">Lưu nháp</button>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => {
                showToast("Đã lưu vị trí");
                back();
              }}
            >
              {isNew ? "Đăng tuyển" : "Lưu thay đổi"}
            </button>
          </>
        }
      />

      {!isNew && (
        <div className="tabs">
          <div
            className={`tab ${tab === "info" ? "active" : ""}`}
            onClick={() => setTab("info")}
          >
            Thông tin vị trí
          </div>
          <div
            className={`tab ${tab === "applicants" ? "active" : ""}`}
            onClick={() => setTab("applicants")}
          >
            Ứng viên (12)
          </div>
        </div>
      )}

      {(isNew || tab === "info") && (
        <div className="grid grid-cols-[1fr_320px] gap-5">
          <div>
            <FormSection title="Thông tin chung">
              <div className="field-row">
                <div className="field">
                  <label>Tên vị trí <span className="req">*</span></label>
                  <input className="input" defaultValue="Lab Engineer" />
                </div>
                <div className="field">
                  <label>Slug URL</label>
                  <input className="input" defaultValue="lab-engineer" />
                </div>
              </div>
              <div className="field-row-3">
                <div className="field">
                  <label>Phòng ban <span className="req">*</span></label>
                  <select className="input">
                    <option>Kỹ thuật</option>
                    <option>Kinh doanh</option>
                    <option>Marketing</option>
                    <option>Kho vận</option>
                    <option>HR</option>
                  </select>
                </div>
                <div className="field">
                  <label>Địa điểm</label>
                  <select className="input">
                    <option>TP.HCM</option>
                    <option>Hà Nội</option>
                    <option>Remote</option>
                  </select>
                </div>
                <div className="field">
                  <label>Hình thức</label>
                  <select className="input">
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Intern</option>
                  </select>
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Mức lương</label>
                  <input className="input" defaultValue="15-25 triệu (thỏa thuận)" />
                </div>
                <div className="field">
                  <label>Hạn nộp</label>
                  <input className="input" type="date" defaultValue="2026-05-31" />
                </div>
              </div>
            </FormSection>

            <FormSection title="Mô tả công việc">
              <div className="field">
                <label>Mô tả ngắn</label>
                <textarea
                  className="input"
                  rows={2}
                  defaultValue="Tham gia phát triển, test và đánh giá các sản phẩm phụ gia trong lab; hỗ trợ kỹ thuật cho khách hàng B2B."
                />
              </div>
              <div className="field">
                <label>Trách nhiệm chính</label>
                <textarea
                  className="input"
                  rows={6}
                  defaultValue={
                    "• Pha chế và test mẫu sản phẩm sơn/mực in/nhựa với phụ gia MÜNZING\n" +
                    "• Đo các chỉ tiêu: độ nhớt, độ phủ, độ bóng, đo bọt khí\n" +
                    "• Viết báo cáo test cho khách hàng và nội bộ\n" +
                    "• Hỗ trợ trực tiếp khách hàng tại nhà máy khi cần\n" +
                    "• Cập nhật tài liệu kỹ thuật, COA, MSDS"
                  }
                />
              </div>
              <div className="field">
                <label>Yêu cầu</label>
                <textarea
                  className="input"
                  rows={5}
                  defaultValue={
                    "• Tốt nghiệp ĐH chuyên ngành Hóa, Polyme, Vật liệu\n" +
                    "• 1-3 năm kinh nghiệm trong lab sơn/mực in/nhựa\n" +
                    "• Tiếng Anh đọc hiểu tài liệu kỹ thuật\n" +
                    "• Thái độ học hỏi, làm việc nhóm tốt"
                  }
                />
              </div>
              <div className="field">
                <label>Quyền lợi</label>
                <textarea
                  className="input"
                  rows={4}
                  defaultValue={
                    "• Lương + thưởng cạnh tranh, review 6 tháng/lần\n" +
                    "• BHXH, BHYT, BHTN đầy đủ\n" +
                    "• Đào tạo chuyên sâu tại MÜNZING (Đức) cho vị trí trọng điểm\n" +
                    "• Du lịch nước ngoài 1 năm/lần"
                  }
                />
              </div>
            </FormSection>
          </div>

          <div>
            <div className="card mb-4">
              <div className="card__head"><h3>Hiển thị</h3></div>
              <div className="card__body">
                <div className="field">
                  <label>Trạng thái</label>
                  <select className="input">
                    <option>Đang tuyển</option>
                    <option>Tạm dừng</option>
                    <option>Đã đóng</option>
                    <option>Nháp</option>
                  </select>
                </div>
                <div className="field">
                  <label>Đánh dấu</label>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] flex gap-1.5">
                      <input type="checkbox" /> 🔥 HOT — Vị trí ưu tiên
                    </label>
                    <label className="text-[13px] flex gap-1.5">
                      <input type="checkbox" /> Hiển thị ở trang chủ
                    </label>
                    <label className="text-[13px] flex gap-1.5">
                      <input type="checkbox" defaultChecked /> Cho phép nộp CV online
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card__head"><h3>Người tiếp nhận CV</h3></div>
              <div className="card__body">
                <div className="field">
                  <label>HR phụ trách</label>
                  <select className="input">
                    <option>HR — Lê Thị Mai</option>
                  </select>
                </div>
                <div className="field">
                  <label>CC tới</label>
                  <input
                    className="input"
                    defaultValue="hr@stromann.vn, lab-manager@stromann.vn"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isNew && tab === "applicants" && (
        <div className="card">
          <table className="tbl">
            <thead>
              <tr>
                <th>Ứng viên</th>
                <th>Email / SĐT</th>
                <th>Kinh nghiệm</th>
                <th>CV</th>
                <th>Trạng thái</th>
                <th>Ngày nộp</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {APPLICANTS.map((a, i) => (
                <tr key={i}>
                  <td>
                    <div className="flex gap-2.5 items-center">
                      <div className="w-8 h-8 rounded-full bg-[#FFE4E6] text-brand-700 flex items-center justify-center font-bold text-xs">
                        {a.name.split(" ").pop()?.[0]}
                      </div>
                      <div className="tbl__name">{a.name}</div>
                    </div>
                  </td>
                  <td>
                    <div className="text-xs">{a.email}</div>
                    <div className="text-[11px] text-n-500">{a.phone}</div>
                  </td>
                  <td><span className="text-xs">{a.exp}</span></td>
                  <td>
                    <a className="text-brand-500 text-xs font-semibold inline-flex items-center gap-1">
                      <FileText size={12} /> CV.pdf
                    </a>
                  </td>
                  <td><Pill status={a.status} /></td>
                  <td><span className="text-xs">{a.date}</span></td>
                  <td><ActionRow /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
