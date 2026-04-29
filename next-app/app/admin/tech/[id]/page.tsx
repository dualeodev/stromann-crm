"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { DetailHeader } from "@/components/admin/layout/DetailHeader";
import { FormSection } from "@/components/admin/forms/FormSection";
import { showToast } from "@/lib/admin/showToast";

interface Solution {
  problem: string;
  solutions: string[];
  products: string[];
}

const INITIAL: Solution[] = [
  {
    problem: "Pigment kết tụ",
    solutions: ["Sử dụng dispersant phù hợp", "Điều chỉnh tốc độ khuấy", "Kiểm soát pH hệ"],
    products: ["EDAPLAN® 470", "DISPERBYK-190"],
  },
  {
    problem: "Độ phủ kém",
    solutions: ["Tăng hàm lượng dispersant", "Tối ưu wetting agent"],
    products: ["EDAPLAN® 470", "METOLAT® 358"],
  },
];

export default function TechDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const isNew = params.id === "new";
  const [solutions, setSolutions] = useState<Solution[]>(INITIAL);

  const back = () => router.push("/admin/tech");

  return (
    <>
      <DetailHeader
        breadcrumb="Vấn đề kỹ thuật"
        backHref="/admin/tech"
        title={isNew ? "Thêm vấn đề mới" : "Phân tán (Dispersion)"}
        sub="Vấn đề kỹ thuật và các cặp giải pháp ↔ sản phẩm đề xuất"
        actions={
          <>
            <button type="button" className="btn btn--ghost">Lưu nháp</button>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => {
                showToast("Đã lưu vấn đề KT");
                back();
              }}
            >
              Lưu
            </button>
          </>
        }
      />

      <FormSection title="Thông tin vấn đề chính">
        <div className="field-row">
          <div className="field">
            <label>Tên vấn đề <span className="req">*</span></label>
            <input className="input" defaultValue="Phân tán (Dispersion)" />
          </div>
          <div className="field">
            <label>Icon</label>
            <div className="flex gap-1.5">
              {["⚗️", "💧", "🌀", "✨", "🎨"].map((e) => (
                <button
                  key={e}
                  type="button"
                  className="w-9 h-9 text-xl border border-n-300 rounded-lg"
                  style={
                    e === "⚗️"
                      ? { background: "#FFE4E6", borderColor: "var(--brand-500)" }
                      : { background: "#fff" }
                  }
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="field">
          <label>Mô tả tổng quan</label>
          <textarea
            className="input"
            rows={2}
            defaultValue="Vấn đề liên quan đến độ phân tán của pigment trong hệ sơn, ảnh hưởng đến độ lên màu và tính ổn định công thức."
          />
        </div>
      </FormSection>

      <FormSection
        title="Vấn đề con ↔ Giải pháp ↔ Sản phẩm"
        desc="Mỗi cặp 3 yếu tố hiển thị thành 1 block giải pháp trên trang Hỗ trợ kỹ thuật."
      >
        {solutions.map((s, i) => (
          <div
            key={i}
            className="border border-n-200 rounded-r-12 p-4 mb-3 relative"
          >
            <div className="absolute top-3 right-3 flex gap-1">
              <button type="button" className="tbl__act">↑</button>
              <button type="button" className="tbl__act">↓</button>
              <button
                type="button"
                className="tbl__act danger"
                onClick={() => setSolutions(solutions.filter((_, x) => x !== i))}
              >
                🗑
              </button>
            </div>
            <div
              className="inline-block px-2 py-0.5 bg-brand-500 text-white rounded text-[11px] font-bold mb-2"
            >
              VẤN ĐỀ #{i + 1}
            </div>
            <div className="field">
              <label>Vấn đề con</label>
              <input className="input" defaultValue={s.problem} />
            </div>
            <div className="field">
              <label>Giải pháp đề xuất (mỗi dòng = 1 giải pháp)</label>
              <textarea className="input" rows={3} defaultValue={s.solutions.join("\n")} />
            </div>
            <div className="field">
              <label>Sản phẩm đề xuất</label>
              <div className="flex gap-1.5 flex-wrap">
                {s.products.map((p) => (
                  <span
                    key={p}
                    className="px-2.5 py-1 bg-[#FFE4E6] text-brand-700 rounded-full text-xs font-semibold"
                  >
                    {p} <span className="ml-1 cursor-pointer">×</span>
                  </span>
                ))}
                <button type="button" className="chip text-xs">+ Thêm sản phẩm</button>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn--secondary w-full justify-center"
          style={{ border: "1px dashed var(--n-300)" }}
          onClick={() =>
            setSolutions([
              ...solutions,
              { problem: "Vấn đề mới", solutions: [""], products: [] },
            ])
          }
        >
          + Thêm vấn đề con
        </button>
      </FormSection>
    </>
  );
}
