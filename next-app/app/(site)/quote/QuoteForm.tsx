"use client";

import { useState } from "react";
import { Btn } from "@/components/ui";

interface ProductRow {
  id: number;
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

export default function QuoteForm() {
  const [rows, setRows] = useState<ProductRow[]>([{ id: 1 }, { id: 2 }]);
  const nextId = () => (rows.length === 0 ? 1 : Math.max(...rows.map((r) => r.id)) + 1);

  const addRow = () => setRows((r) => [...r, { id: nextId() }]);
  const removeRow = (id: number) =>
    setRows((r) => (r.length > 1 ? r.filter((x) => x.id !== id) : r));

  return (
    <form className="bg-white border border-n-200 rounded-r-16 p-8">
      <section className="mb-10">
        <SectionHeading n={1}>Thông tin liên hệ</SectionHeading>
        <div className="form-grid-2">
          <div className="form-row">
            <label>Họ tên <span className="req">*</span></label>
            <input className="input" placeholder="Nguyễn Văn A" required />
          </div>
          <div className="form-row">
            <label>Công ty <span className="req">*</span></label>
            <input className="input" placeholder="Công ty TNHH ABC" required />
          </div>
        </div>
        <div className="form-grid-2">
          <div className="form-row">
            <label>Email <span className="req">*</span></label>
            <input className="input" type="email" placeholder="email@domain.com" required />
          </div>
          <div className="form-row">
            <label>SĐT <span className="req">*</span></label>
            <input className="input" placeholder="09xx xxx xxx" required />
          </div>
        </div>
        <div className="form-row">
          <label>Địa chỉ giao hàng</label>
          <input className="input" placeholder="Số nhà / đường / quận / TP" />
        </div>
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
                  <input className="input" placeholder="VD: AGITAN® 120" required />
                </div>
                <div className="form-row !mb-0">
                  <label>Số lượng <span className="req">*</span></label>
                  <input className="input" type="number" min="1" placeholder="100" required />
                </div>
                <div className="form-row !mb-0">
                  <label>Đơn vị <span className="req">*</span></label>
                  <select className="input" defaultValue="Kg" required>
                    <option>Kg</option>
                    <option>Lít</option>
                    <option>Thùng</option>
                    <option>Tấn</option>
                  </select>
                </div>
              </div>
              <div className="form-row !mb-0 mt-4">
                <label>Ghi chú (tùy chọn)</label>
                <input className="input" placeholder="VD: Cần tài liệu MSDS, mẫu thử..." />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <SectionHeading n={3}>Ghi chú &amp; file đính kèm</SectionHeading>
        <div className="form-row">
          <label>Ghi chú yêu cầu chung &amp; tệp đính kèm</label>
          <textarea
            className="input"
            placeholder="VD: Cần báo giá hệ acrylic-based, dùng cho sơn ngoài trời, môi trường ven biển có muối..."
          />
        </div>
      </section>

      <Btn variant="primary" size="lg" className="w-full" as="button" type="submit">
        Gửi yêu cầu báo giá
      </Btn>
    </form>
  );
}
