"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Btn } from "@/components/ui";
import BasicInfoFields from "@/components/forms/BasicInfoFields";
import { submitQuoteForm, type SubmitResult } from "@/lib/submissions";

interface ProductRow {
  id: number;
  defaultName?: string;
}

function SectionHeading({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-r-8 bg-accent text-white text-[13px] font-bold">
        {n}
      </span>
      <h3 className="m-0 text-[18px] font-bold text-n-900">{children}</h3>
    </div>
  );
}

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <Btn variant="primary" size="lg" className="w-full" as="button" type="submit" disabled={pending}>
      {pending ? "Đang gửi..." : "Gửi yêu cầu báo giá"}
    </Btn>
  );
}

export default function QuoteForm({ initialProduct }: { initialProduct?: string }) {
  const [rows, setRows] = useState<ProductRow[]>(() =>
    initialProduct
      ? [{ id: 1, defaultName: initialProduct }]
      : [{ id: 1 }, { id: 2 }],
  );
  const [state, formAction] = useFormState<SubmitResult | null, FormData>(submitQuoteForm, null);

  const nextId = () => (rows.length === 0 ? 1 : Math.max(...rows.map((r) => r.id)) + 1);
  const addRow = () => setRows((r) => [...r, { id: nextId() }]);
  const removeRow = (id: number) =>
    setRows((r) => (r.length > 1 ? r.filter((x) => x.id !== id) : r));

  if (state?.ok) {
    return (
      <div className="bg-white border border-n-200 rounded-r-16 p-8">
        <h3 className="mt-0 text-[22px] text-success">✓ Đã gửi yêu cầu báo giá</h3>
        <p className="text-n-600">Đội ngũ Sales của Stromann sẽ liên hệ với bạn trong vòng 4h làm việc.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="bg-white border border-n-200 rounded-r-16 p-8">
      <section className="mb-10">
        <SectionHeading n={1}>Thông tin liên hệ</SectionHeading>
        <BasicInfoFields />
      </section>

      <section className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <SectionHeading n={2}>Sản phẩm cần báo giá</SectionHeading>
          <button
            type="button"
            onClick={addRow}
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-r-8 bg-accent text-white text-[13px] font-bold hover:bg-brand-600 transition-colors"
          >
            + Thêm sản phẩm
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {rows.map((r, idx) => (
            <div key={r.id} className="border border-n-200 rounded-r-12 p-5 bg-n-50/40">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[13px] font-bold text-n-700">Sản phẩm #{idx + 1}</div>
                <button
                  type="button"
                  onClick={() => removeRow(r.id)}
                  disabled={rows.length <= 1}
                  className="text-[12px] font-semibold text-n-500 hover:text-accent disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Xóa
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_120px_120px] gap-4">
                <div className="form-row !mb-0">
                  <label>Mã / tên sản phẩm <span className="req">*</span></label>
                  <input
                    className="input"
                    name="product_name"
                    placeholder="VD: AGITAN® 120"
                    defaultValue={r.defaultName ?? ""}
                    required
                  />
                </div>
                <div className="form-row !mb-0">
                  <label>Số lượng <span className="req">*</span></label>
                  <input className="input" name="product_qty" type="number" min="1" placeholder="100" required />
                </div>
                <div className="form-row !mb-0">
                  <label>Đơn vị <span className="req">*</span></label>
                  <select className="input" name="product_unit" defaultValue="Kg" required>
                    <option>Kg</option>
                    <option>Lít</option>
                    <option>Thùng</option>
                    <option>Tấn</option>
                  </select>
                </div>
              </div>
              <div className="form-row !mb-0 mt-4">
                <label>Ghi chú (tùy chọn)</label>
                <input className="input" name="product_note" placeholder="VD: Cần tài liệu MSDS, mẫu thử..." />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <SectionHeading n={3}>Ghi chú chung</SectionHeading>
        <div className="form-row">
          <label>Ghi chú yêu cầu chung</label>
          <textarea
            className="input"
            name="general_note"
            placeholder="VD: Cần báo giá hệ acrylic-based, dùng cho sơn ngoài trời, môi trường ven biển có muối..."
          />
        </div>
      </section>

      {state?.error && (
        <div className="mb-4 p-3 rounded-r-8 bg-danger/10 text-danger text-sm">{state.error}</div>
      )}

      <SubmitBtn />
    </form>
  );
}
