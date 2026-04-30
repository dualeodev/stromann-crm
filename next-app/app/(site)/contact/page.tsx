import type { Metadata } from "next";
import { Tag } from "@/components/ui";
import Breadcrumb from "@/components/Breadcrumb";
import ContactForm from "./ContactForm";

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
        <h1>Liên hệ Stromann</h1>
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

        <ContactForm />
      </div>
    </>
  );
}
