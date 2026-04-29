"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Camera, Eye, Trash2 } from "lucide-react";
import { DetailHeader } from "@/components/admin/layout/DetailHeader";
import { FormSection } from "@/components/admin/forms/FormSection";
import { LangTabs, type Lang } from "@/components/admin/forms/LangTabs";
import { Pill } from "@/components/admin/atoms/Pill";
import { showToast } from "@/lib/admin/showToast";

const INITIAL_PRODUCTS = ["AGITAN® 120", "EDAPLAN® 470", "METOLAT® 358"];

const RELATED_ARTICLES = [
  "5 lưu ý chọn defoamer cho sơn nước hệ acrylic",
  "Case study: tối ưu công thức sơn xây dựng",
  "Wetting agent: cách chọn đúng cho từng loại pigment",
];

const COLOR_PALETTE = ["#E11D2C", "#1E40AF", "#16A34A", "#A855F7", "#F59E0B", "#0EA5E9"];

const INDUSTRY_STATS = [
  { lbl: "Sản phẩm",          val: "28" },
  { lbl: "Bài viết",          val: "7" },
  { lbl: "Lượt xem 30 ngày", val: "2,431" },
  { lbl: "Báo giá phát sinh", val: "12" },
];

export default function IndustryDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const isNew = params.id === "new";

  const [lang, setLang] = useState<Lang>("vn");
  const [linkedProducts, setLinkedProducts] = useState<string[]>(INITIAL_PRODUCTS);

  const back = () => router.push("/admin/industries");

  return (
    <>
      <DetailHeader
        breadcrumb="Ngành ứng dụng"
        backHref="/admin/industries"
        title={isNew ? "Thêm ngành ứng dụng mới" : "Sơn (Coatings)"}
        sub={
          isNew
            ? "Thêm ngành mới — có thể bật/tắt hiển thị bất cứ lúc nào."
            : "28 sản phẩm · 7 bài viết · Mặc định"
        }
        badge={!isNew ? <Pill status="active" /> : undefined}
        actions={
          <>
            {!isNew && (
              <button type="button" className="btn btn--secondary inline-flex items-center gap-1.5">
                <Eye size={14} /> Xem trên website
              </button>
            )}
            <button type="button" className="btn btn--ghost">Lưu nháp</button>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => {
                showToast("Đã lưu ngành ứng dụng");
                back();
              }}
            >
              {isNew ? "Tạo ngành" : "Lưu thay đổi"}
            </button>
          </>
        }
      />

      <div className="grid grid-cols-[1fr_320px] gap-5">
        <div>
          <FormSection title="Thông tin chung">
            <LangTabs lang={lang} setLang={setLang} />
            <div className="field-row">
              <div className="field">
                <label>Tên ngành <span className="req">*</span></label>
                <input
                  className="input"
                  defaultValue={
                    lang === "vn" ? "Sơn (Coatings)" : lang === "en" ? "Coatings" : "涂料"
                  }
                />
              </div>
              <div className="field">
                <label>Slug URL</label>
                <input className="input" defaultValue="son-coatings" />
                <div className="text-[11px] text-n-500">
                  stromann.vn/nganh-ung-dung/<b>son-coatings</b>
                </div>
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label>Mã viết tắt</label>
                <input className="input w-20" defaultValue="S" maxLength={2} />
              </div>
              <div className="field">
                <label>Mã màu (hex)</label>
                <input className="input w-32" defaultValue="#E11D2C" />
              </div>
            </div>
            <div className="field">
              <label>Mô tả ngắn (hiển thị trên card homepage)</label>
              <textarea
                className="input"
                rows={2}
                defaultValue="Cải thiện độ phân tán, độ trải và độ bền màng sơn"
              />
            </div>
            <div className="field">
              <label>Mô tả tổng quan (trang chi tiết ngành)</label>
              <textarea
                className="input"
                rows={5}
                defaultValue="Stromann cung cấp đầy đủ các phụ gia chuyên dụng cho ngành sơn — từ sơn nước nội ngoại thất, sơn công nghiệp đến sơn gỗ — giúp các nhà sản xuất tối ưu công thức, cải thiện hiệu suất và giảm chi phí sản xuất..."
              />
            </div>
          </FormSection>

          <FormSection title="Ảnh đại diện & banner">
            <div className="field">
              <label>Ảnh thumbnail (card homepage, 600×400)</label>
              <div
                className="rounded-lg flex items-center justify-center text-brand-700 font-bold relative"
                style={{
                  aspectRatio: "3/2",
                  background: "linear-gradient(135deg, #FFE4E6, #FECACA)",
                }}
              >
                <span>Sơn</span>
                <button
                  type="button"
                  className="absolute top-2 right-2 px-2.5 py-1 bg-white rounded-md text-[11px] font-semibold inline-flex items-center gap-1"
                >
                  <Camera size={12} /> Đổi ảnh
                </button>
              </div>
            </div>
            <div className="field">
              <label>Banner trang chi tiết (1920×600)</label>
              <div
                className="border border-dashed border-n-300 rounded-lg flex items-center justify-center gap-1.5 text-n-500 text-[13px]"
                style={{
                  aspectRatio: "1920/600",
                  background:
                    "repeating-linear-gradient(45deg, var(--n-100) 0 8px, #fff 8px 16px)",
                }}
              >
                <Camera size={14} /> Chọn banner ngành
              </div>
            </div>
          </FormSection>

          <FormSection
            title="Sản phẩm liên kết"
            desc="Sản phẩm hiển thị khi khách click vào ngành này."
          >
            <div className="mb-3">
              {linkedProducts.map((p) => (
                <div
                  key={p}
                  className="flex items-center gap-3 p-2.5 border border-n-200 rounded-lg mb-1.5"
                >
                  <div className="thumb thumb--brand w-10 h-10"></div>
                  <div className="flex-1">
                    <div className="font-semibold text-[13px]">{p}</div>
                    <div className="text-[11px] text-n-500">MÜNZING · Defoamer</div>
                  </div>
                  <button type="button" className="tbl__act" aria-label="Lên">↑</button>
                  <button type="button" className="tbl__act" aria-label="Xuống">↓</button>
                  <button
                    type="button"
                    className="tbl__act danger"
                    aria-label="Xóa"
                    onClick={() =>
                      setLinkedProducts(linkedProducts.filter((x) => x !== p))
                    }
                  >
                    <Trash2 size={14} strokeWidth={1.75} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn btn--secondary w-full justify-center"
              style={{ border: "1px dashed var(--n-300)" }}
            >
              + Thêm sản phẩm vào ngành
            </button>
            <div className="mt-3 p-3 bg-[#F0F9FF] border border-[#BAE6FD] rounded-lg text-xs text-n-700">
              Sản phẩm cũng có thể tự động liên kết bằng cách gắn ngành này khi sửa từng sản phẩm.
            </div>
          </FormSection>

          <FormSection title="Bài viết liên quan">
            <div className="flex flex-col gap-1.5">
              {RELATED_ARTICLES.map((t) => (
                <label
                  key={t}
                  className="flex items-center gap-2.5 p-2.5 border border-n-200 rounded-lg cursor-pointer"
                >
                  <input type="checkbox" defaultChecked />
                  <div className="flex-1 text-[13px] font-medium">{t}</div>
                  <span className="pill pill--neutral">Kiến thức KT</span>
                </label>
              ))}
            </div>
          </FormSection>

          <FormSection title="SEO">
            <div className="field">
              <label>Meta title</label>
              <input
                className="input"
                defaultValue="Phụ gia ngành Sơn (Coatings) — MÜNZING | Stromann VN"
              />
            </div>
            <div className="field">
              <label>Meta description</label>
              <textarea
                className="input"
                rows={2}
                defaultValue="Đầy đủ defoamer, dispersant, wetting agent, rheology modifier MÜNZING cho sơn nước, sơn dầu, sơn công nghiệp tại Việt Nam."
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
                <select className="input" defaultValue="active">
                  <option value="active">Đang hiển thị</option>
                  <option value="hidden">Ẩn (chỉ admin thấy)</option>
                  <option value="draft">Nháp</option>
                </select>
              </div>
              <div className="field">
                <label>Thứ tự</label>
                <input className="input" type="number" defaultValue="1" />
                <div className="text-[11px] text-n-500">Số nhỏ hơn = hiển thị trước</div>
              </div>
              <div className="field">
                <label>Đánh dấu</label>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] flex gap-1.5 items-center">
                    <input type="checkbox" defaultChecked /> Ngành mặc định (1 trong 3 ngành chính)
                  </label>
                  <label className="text-[13px] flex gap-1.5 items-center">
                    <input type="checkbox" defaultChecked /> Hiển thị trên homepage
                  </label>
                  <label className="text-[13px] flex gap-1.5 items-center">
                    <input type="checkbox" defaultChecked /> Hiển thị trong mega menu
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card__head"><h3>Màu thương hiệu</h3></div>
            <div className="card__body">
              <div className="field">
                <label>Màu chủ đạo</label>
                <div className="flex gap-1.5 flex-wrap">
                  {COLOR_PALETTE.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className="w-8 h-8 rounded-md"
                      style={{
                        background: c,
                        border:
                          c === "#E11D2C"
                            ? "3px solid var(--n-900)"
                            : "2px solid #fff",
                        outline: "1px solid var(--n-200)",
                      }}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {!isNew && (
            <div className="card">
              <div className="card__head"><h3>Thống kê</h3></div>
              <div className="card__body p-0">
                {INDUSTRY_STATS.map((s, i) => (
                  <div
                    key={i}
                    className={
                      "flex justify-between px-4 py-2.5 " +
                      (i ? "border-t border-n-100" : "")
                    }
                  >
                    <span className="text-xs text-n-600">{s.lbl}</span>
                    <b>{s.val}</b>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isNew && (
            <button
              type="button"
              className="btn btn--danger w-full mt-4 justify-center inline-flex items-center gap-1.5"
              style={{ border: "1px solid #FCA5A5", background: "#FEF2F2" }}
            >
              <Trash2 size={14} /> Xóa ngành này
            </button>
          )}
        </div>
      </div>
    </>
  );
}
