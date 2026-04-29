import type { Metadata } from "next";
import { Tag, Btn } from "@/components/ui";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = { title: "Liên hệ — Stromann Việt Nam" };

interface ContactRow {
  icon: string;
  title: string;
  body: string;
}

const ROWS: ContactRow[] = [
  { icon: "📍", title: "Trụ sở chính — TP.HCM",  body: "19 Nguyễn Văn Trỗi, P.11, Q.Phú Nhuận, TP.HCM" },
  { icon: "📍", title: "Văn phòng Hà Nội",       body: "Tầng 8, Toà CMC Tower, 11 Duy Tân, Cầu Giấy, Hà Nội" },
  { icon: "📞", title: "Hotline",                body: "+84 28 36200703 — info@stromann.vn" },
  { icon: "⏰", title: "Giờ làm việc",            body: "T2–T6: 8:00 – 17:30 · T7: 8:00 – 12:00" },
];

export default function ContactPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Liên hệ" }]} />
      <div className="page-head">
        <Tag variant="brand-soft" className="self-start">LIÊN HỆ</Tag>
        <h1>Tư vấn kỹ thuật &amp; Báo giá</h1>
        <p>
          Đội ngũ kỹ sư Stromann sẵn sàng tư vấn về công thức, sản phẩm phù hợp và báo giá cạnh tranh. Phản hồi trong 4h làm việc.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <h3 className="text-[22px] m-0">Liên hệ trực tiếp</h3>
          {ROWS.map((r) => (
            <div key={r.title} className="contact-row">
              <div className="contact-row__icon">{r.icon}</div>
              <div>
                <h4 className="m-0 text-[15px]">{r.title}</h4>
                <p className="mt-1 text-n-600 text-sm">{r.body}</p>
              </div>
            </div>
          ))}
          <div className="map-wrap mt-4">
            <div className="map-pin">
              <div className="map-pin__lbl">Stromann VN</div>
              <div className="map-pin__dot"></div>
            </div>
          </div>
        </div>

        <form className="bg-white border border-n-200 rounded-r-16 p-8">
          <h3 className="mt-0 text-[22px]">Gửi yêu cầu</h3>
          <p className="text-n-600 mb-6">
            Điền thông tin bên dưới — đội kỹ thuật sẽ phản hồi trong 4h làm việc.
          </p>
          <div className="form-grid-2">
            <div className="form-row">
              <label>Họ tên <span className="req">*</span></label>
              <input className="input" placeholder="Nguyễn Văn A" />
            </div>
            <div className="form-row">
              <label>Công ty <span className="req">*</span></label>
              <input className="input" placeholder="Tên công ty" />
            </div>
          </div>
          <div className="form-grid-2">
            <div className="form-row">
              <label>Email <span className="req">*</span></label>
              <input className="input" type="email" placeholder="email@congty.com" />
            </div>
            <div className="form-row">
              <label>Điện thoại</label>
              <input className="input" placeholder="+84 ..." />
            </div>
          </div>
          <div className="form-row">
            <label>Loại yêu cầu</label>
            <select className="input">
              <option>Tối ưu phân tán pigment</option>
              <option>Chọn hệ thống bọt phù hợp</option>
              <option>Điều chỉnh độ nhớt</option>
              <option>Xử lý lỗi sản xuất</option>
            </select>
          </div>
          <div className="form-row">
            <label>Sản phẩm quan tâm</label>
            <input className="input" placeholder="VD: AGITAN® 120, Defoamer cho sơn nước..." />
          </div>
          <div className="form-row">
            <label>Mô tả chi tiết <span className="req">*</span></label>
            <textarea className="input" placeholder="Vui lòng mô tả nhu cầu, hệ sản xuất, vấn đề đang gặp..." />
          </div>
          <label className="flex gap-2 items-center mb-4 text-[13px] text-n-600">
            <input type="checkbox" defaultChecked /> Tôi đồng ý nhận thông tin sản phẩm và kỹ thuật từ Stromann
          </label>
          <Btn variant="primary" size="lg" className="w-full">Gửi yêu cầu →</Btn>
        </form>
      </div>
    </>
  );
}
