"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { DetailHeader } from "@/components/admin/layout/DetailHeader";
import { FormSection } from "@/components/admin/forms/FormSection";
import { LangTabs, type Lang } from "@/components/admin/forms/LangTabs";
import { Toggle } from "@/components/admin/atoms/Toggle";
import { Pill } from "@/components/admin/atoms/Pill";
import { showToast } from "@/lib/admin/showToast";

const PERF: Array<{ lbl: string; val: string; up?: boolean }> = [
  { lbl: "Lượt hiển thị",     val: "12,432" },
  { lbl: "Lượt click",        val: "847" },
  { lbl: "CTR",               val: "6.8%", up: true },
  { lbl: "Báo giá phát sinh", val: "23" },
];

export default function BannerDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const isNew = params.id === "new";
  const [lang, setLang] = useState<Lang>("vn");
  const [bannerOn, setBannerOn] = useState(true);

  const back = () => router.push("/admin/banners");

  return (
    <>
      <DetailHeader
        breadcrumb="Banner trang chủ"
        backHref="/admin/banners"
        title={isNew ? "Tạo banner mới" : "AGITAN® thế hệ mới — đã có hàng tại VN"}
        sub={
          isNew
            ? "Banner sẽ tự động bật/tắt theo thời gian hiệu lực."
            : "Đang chạy · Hiệu lực 01/04 → 30/06/2026"
        }
        badge={!isNew ? <Pill status="active" /> : undefined}
        actions={
          <>
            <button type="button" className="btn btn--ghost">Lưu nháp</button>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => {
                showToast("Đã lưu banner");
                back();
              }}
            >
              {isNew ? "Tạo banner" : "Lưu thay đổi"}
            </button>
          </>
        }
      />

      <div className="grid grid-cols-[1fr_320px] gap-5">
        <div>
          <FormSection title="Hình ảnh & nội dung">
            <LangTabs lang={lang} setLang={setLang} />
            <div className="field">
              <label>Ảnh banner (1920×800)</label>
              <div
                className="rounded-lg relative overflow-hidden"
                style={{
                  aspectRatio: "1920/800",
                  background: "linear-gradient(135deg, #E11D2C, #931017)",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 20px, transparent 20px 40px)",
                  }}
                ></div>
                <button
                  type="button"
                  className="absolute top-3 right-3 px-3 py-1.5 bg-white/95 rounded-md text-xs font-semibold"
                >
                  📷 Đổi ảnh
                </button>
                <div className="absolute bottom-6 left-8 text-white">
                  <div className="text-[10px] opacity-80 font-bold tracking-[0.1em]">
                    NEW PRODUCT LINE
                  </div>
                  <div className="text-[28px] font-extrabold mt-2">
                    AGITAN® thế hệ mới
                  </div>
                </div>
              </div>
            </div>
            <div className="field">
              <label>Tiêu đề chính</label>
              <input
                className="input"
                defaultValue="AGITAN® thế hệ mới — đã có hàng tại VN"
              />
            </div>
            <div className="field">
              <label>Mô tả</label>
              <textarea
                className="input"
                rows={2}
                defaultValue="Defoamer hiệu suất cao, không silicone, phù hợp cho mọi hệ sơn nước"
              />
            </div>
            <div className="field-row">
              <div className="field">
                <label>Text nút CTA</label>
                <input className="input" defaultValue="Khám phá sản phẩm" />
              </div>
              <div className="field">
                <label>Link đích</label>
                <input className="input" defaultValue="/san-pham/agitan-120" />
              </div>
            </div>
          </FormSection>

          <FormSection
            title="Thời gian hiệu lực"
            desc="Banner sẽ tự động hiển thị/ẩn theo thời gian này."
          >
            <div className="field-row">
              <div className="field">
                <label>Bắt đầu <span className="req">*</span></label>
                <input
                  className="input"
                  type="datetime-local"
                  defaultValue="2026-04-01T00:00"
                />
              </div>
              <div className="field">
                <label>Kết thúc</label>
                <input
                  className="input"
                  type="datetime-local"
                  defaultValue="2026-06-30T23:59"
                />
              </div>
            </div>
            <label className="flex gap-2 items-center text-[13px] mt-2">
              <input type="checkbox" /> Không có thời hạn (luôn hiển thị)
            </label>
          </FormSection>
        </div>

        <div>
          <div className="card mb-4">
            <div className="card__head"><h3>Vị trí & thứ tự</h3></div>
            <div className="card__body">
              <div className="field">
                <label>Vị trí trang</label>
                <select className="input">
                  <option>Hero homepage</option>
                  <option>Hero trang sản phẩm</option>
                  <option>Banner giữa trang chủ</option>
                </select>
              </div>
              <div className="field">
                <label>Thứ tự hiển thị</label>
                <input className="input" type="number" defaultValue="1" />
              </div>
              <div className="field">
                <label>Bật/tắt</label>
                <Toggle on={bannerOn} onChange={setBannerOn} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card__head"><h3>Hiệu suất banner</h3></div>
            <div className="card__body p-0">
              {PERF.map((s, i) => (
                <div
                  key={i}
                  className={
                    "flex justify-between px-4 py-2.5 " +
                    (i ? "border-t border-n-100" : "")
                  }
                >
                  <span className="text-xs text-n-600">{s.lbl}</span>
                  <b style={{ color: s.up ? "#16A34A" : "var(--n-900)" }}>{s.val}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
