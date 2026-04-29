"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { DetailHeader } from "@/components/admin/layout/DetailHeader";
import { FormSection } from "@/components/admin/forms/FormSection";
import { LangTabs, type Lang } from "@/components/admin/forms/LangTabs";
import { Pill } from "@/components/admin/atoms/Pill";
import { showToast } from "@/lib/admin/showToast";

export default function NewsDetailAdminPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const isNew = params.id === "new";
  const [lang, setLang] = useState<Lang>("vn");

  const back = () => router.push("/admin/news");

  return (
    <>
      <DetailHeader
        breadcrumb="Tin tức"
        backHref="/admin/news"
        title={isNew ? "Viết bài mới" : "5 lưu ý chọn defoamer cho sơn nước hệ acrylic"}
        sub={
          isNew
            ? "Bài viết hỗ trợ rich text, ảnh, video, embed."
            : "Kiến thức KT · Tech Team · Đăng 25/04/2026 · 1,240 lượt xem"
        }
        badge={!isNew ? <Pill status="published" /> : undefined}
        actions={
          <>
            <button type="button" className="btn btn--secondary">👁 Xem trước</button>
            <button type="button" className="btn btn--ghost">Lưu nháp</button>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => {
                showToast("Đã xuất bản bài viết");
                back();
              }}
            >
              📰 Xuất bản
            </button>
          </>
        }
      />

      <div className="grid grid-cols-[1fr_320px] gap-5">
        <div>
          <FormSection title="Nội dung bài viết">
            <LangTabs lang={lang} setLang={setLang} />
            <div className="field">
              <label>Tiêu đề <span className="req">*</span></label>
              <input
                className="input"
                style={{ fontSize: 18, fontWeight: 600 }}
                defaultValue="5 lưu ý chọn defoamer cho sơn nước hệ acrylic"
              />
            </div>
            <div className="field">
              <label>Slug URL</label>
              <input className="input" defaultValue="5-luu-y-chon-defoamer-cho-son-nuoc" />
            </div>
            <div className="field">
              <label>Ảnh đại diện (1200×630)</label>
              <div
                className="border border-n-200 rounded-lg flex items-center justify-center text-n-500 text-[13px]"
                style={{
                  aspectRatio: "1200/630",
                  background:
                    "repeating-linear-gradient(45deg, #FFE4E6 0 8px, #fff 8px 16px)",
                }}
              >
                📷 Chọn ảnh đại diện
              </div>
            </div>
            <div className="field">
              <label>Mô tả ngắn (excerpt)</label>
              <textarea
                className="input"
                rows={2}
                defaultValue="Hướng dẫn nhanh cho R&D: 5 yếu tố quyết định hiệu quả của defoamer trong hệ sơn nước, kèm ví dụ thực tế."
              />
            </div>
            <div className="field">
              <label>Nội dung bài viết</label>
              <div className="border border-n-300 rounded-lg overflow-hidden">
                <div className="p-2 bg-n-50 border-b border-n-200 flex gap-1 flex-wrap">
                  {["¶ Đoạn", "H2", "H3"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      className="px-2.5 py-1 text-xs font-semibold text-n-700 rounded bg-white border border-n-200"
                    >
                      {t}
                    </button>
                  ))}
                  <span className="w-px bg-n-200 mx-1"></span>
                  {["B", "I", "U", "S"].map((t) => (
                    <button key={t} type="button" className="px-2.5 py-1 text-xs font-semibold text-n-700 rounded">
                      {t}
                    </button>
                  ))}
                  <span className="w-px bg-n-200 mx-1"></span>
                  {["• Bullet", "1. Số", "❝ Trích", "</> Code"].map((t) => (
                    <button key={t} type="button" className="px-2.5 py-1 text-xs font-semibold text-n-700 rounded">
                      {t}
                    </button>
                  ))}
                  <span className="w-px bg-n-200 mx-1"></span>
                  {["🔗 Link", "📷 Ảnh", "🎬 Video", "📊 Bảng", "📎 File"].map((t) => (
                    <button key={t} type="button" className="px-2.5 py-1 text-xs font-semibold text-n-700 rounded">
                      {t}
                    </button>
                  ))}
                </div>
                <div
                  className="p-5 min-h-[320px] text-sm leading-[1.7] text-n-800"
                  contentEditable
                  suppressContentEditableWarning
                >
                  <h2 className="mt-0">1. Hệ sơn của bạn là gì?</h2>
                  <p>
                    Trước khi chọn defoamer, cần xác định hệ nhựa (acrylic, vinyl, alkyd...) và hàm lượng pigment. AGITAN® 120 phù hợp cho hệ acrylic PVC trung-cao.
                  </p>
                  <h2>2. Bọt đại thể hay bọt vi mô?</h2>
                  <p>
                    Bọt đại thể (macro) dễ xử lý hơn bọt vi mô (micro). Đối với bọt vi mô gây pinhole, cần defoamer có hoạt tính mạnh hơn.
                  </p>
                  <p
                    className="rounded"
                    style={{
                      padding: 12,
                      background: "#FFF8F8",
                      borderLeft: "3px solid var(--brand-500)",
                    }}
                  >
                    💡 <b>Mẹo từ chuyên gia:</b> Luôn test ở cả 2 mức liều — khuyến nghị và 1.5× để xác định "vùng an toàn".
                  </p>
                  <h2>3. Tương thích với các phụ gia khác</h2>
                  <p>
                    Defoamer mạnh có thể gây co màng (cratering) khi kết hợp với một số wetting agent. Cần kiểm tra DOI...
                  </p>
                </div>
              </div>
              <div className="flex justify-between mt-1.5 text-[11px] text-n-500">
                <span>Đã lưu tự động lúc 14:32</span>
                <span>1,247 từ · ~5 phút đọc</span>
              </div>
            </div>
          </FormSection>

          <FormSection title="SEO & Open Graph">
            <div className="field">
              <label>Meta title</label>
              <input
                className="input"
                defaultValue="5 lưu ý chọn defoamer cho sơn nước hệ acrylic | Stromann VN"
              />
            </div>
            <div className="field">
              <label>Meta description</label>
              <textarea className="input" rows={2} />
            </div>
            <div className="p-3 bg-n-50 rounded-lg">
              <div className="text-[11px] text-n-500 mb-2">👁 Xem trước Google</div>
              <div className="text-lg" style={{ color: "#1a0dab" }}>
                5 lưu ý chọn defoamer cho sơn nước hệ acrylic
              </div>
              <div className="text-xs" style={{ color: "#006621" }}>
                stromann.vn › tin-tuc › 5-luu-y-chon-defoamer
              </div>
              <div className="text-[13px] mt-1" style={{ color: "#4d5156" }}>
                Hướng dẫn nhanh cho R&amp;D: 5 yếu tố quyết định hiệu quả của defoamer trong hệ sơn nước...
              </div>
            </div>
          </FormSection>
        </div>

        <div>
          <div className="card mb-4">
            <div className="card__head"><h3>Phân loại</h3></div>
            <div className="card__body">
              <div className="field">
                <label>Chuyên mục <span className="req">*</span></label>
                <select className="input">
                  <option>Kiến thức kỹ thuật</option>
                  <option>Ứng dụng thực tế</option>
                  <option>Sản phẩm</option>
                  <option>Tin công ty</option>
                </select>
              </div>
              <div className="field">
                <label>Tags</label>
                <div className="flex gap-1 flex-wrap p-1 border border-n-300 rounded-lg">
                  {["#defoamer", "#sơn-nước", "#acrylic"].map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-n-100 rounded text-xs"
                    >
                      {t} <span className="text-n-500 cursor-pointer">×</span>
                    </span>
                  ))}
                  <input
                    className="flex-1 min-w-[80px] border-none outline-none text-xs"
                    placeholder="Thêm tag..."
                  />
                </div>
              </div>
              <div className="field">
                <label>Sản phẩm liên kết</label>
                <select className="input" multiple style={{ height: 80 }}>
                  <option>AGITAN® 120</option>
                  <option>AGITAN® 282</option>
                  <option>EDAPLAN® 470</option>
                </select>
                <div className="text-[11px] text-n-500">Hiển thị ở cuối bài viết</div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card__head"><h3>Xuất bản</h3></div>
            <div className="card__body">
              <div className="field">
                <label>Trạng thái</label>
                <select className="input">
                  <option>Đã xuất bản</option>
                  <option>Nháp</option>
                  <option>Lên lịch</option>
                </select>
              </div>
              <div className="field">
                <label>Ngày đăng</label>
                <input className="input" type="datetime-local" defaultValue="2026-04-25T09:00" />
              </div>
              <div className="field">
                <label>Tác giả</label>
                <select className="input">
                  <option>Tech Team</option>
                  <option>Marketing</option>
                  <option>Văn A</option>
                </select>
              </div>
              <label className="flex gap-2 items-center text-[13px]">
                <input type="checkbox" defaultChecked /> Cho phép comment
              </label>
              <label className="flex gap-2 items-center text-[13px] mt-1.5">
                <input type="checkbox" defaultChecked /> Bài nổi bật
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
