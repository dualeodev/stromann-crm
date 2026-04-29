import { Tag, Btn } from "@/components/ui";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = { title: "Liên hệ — Stromann Việt Nam" };

export default function ContactPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Liên hệ" }]} />
      <div className="page-head">
        <Tag variant="brand-soft" style={{ alignSelf: "flex-start" }}>LIÊN HỆ</Tag>
        <h1>Tư vấn kỹ thuật & Báo giá</h1>
        <p>Đội ngũ kỹ sư Stromann sẵn sàng tư vấn về công thức, sản phẩm phù hợp và báo giá cạnh tranh. Phản hồi trong 4h làm việc.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <h3 style={{ fontSize: 22, margin: 0 }}>Liên hệ trực tiếp</h3>
          <div className="contact-row">
            <div className="contact-row__icon">📍</div>
            <div>
              <h4 style={{ margin: 0, fontSize: 15 }}>Trụ sở chính — TP.HCM</h4>
              <p style={{ margin: "4px 0 0", color: "var(--n-600)", fontSize: 14 }}>19 Nguyễn Văn Trỗi, P.11, Q.Phú Nhuận, TP.HCM</p>
            </div>
          </div>
          <div className="contact-row">
            <div className="contact-row__icon">📍</div>
            <div>
              <h4 style={{ margin: 0, fontSize: 15 }}>Văn phòng Hà Nội</h4>
              <p style={{ margin: "4px 0 0", color: "var(--n-600)", fontSize: 14 }}>Tầng 8, Toà CMC Tower, 11 Duy Tân, Cầu Giấy, Hà Nội</p>
            </div>
          </div>
          <div className="contact-row">
            <div className="contact-row__icon">📞</div>
            <div>
              <h4 style={{ margin: 0, fontSize: 15 }}>Hotline</h4>
              <p style={{ margin: "4px 0 0", color: "var(--n-600)", fontSize: 14 }}>+84 28 36200703 — info@stromann.vn</p>
            </div>
          </div>
          <div className="contact-row">
            <div className="contact-row__icon">⏰</div>
            <div>
              <h4 style={{ margin: 0, fontSize: 15 }}>Giờ làm việc</h4>
              <p style={{ margin: "4px 0 0", color: "var(--n-600)", fontSize: 14 }}>T2–T6: 8:00 – 17:30 · T7: 8:00 – 12:00</p>
            </div>
          </div>
          <div className="map-wrap" style={{ marginTop: 16 }}>
            <div className="map-pin">
              <div className="map-pin__lbl">Stromann VN</div>
              <div className="map-pin__dot"></div>
            </div>
          </div>
        </div>

        <form style={{ background: "#fff", border: "1px solid var(--n-200)", borderRadius: 16, padding: 32 }}>
          <h3 style={{ marginTop: 0, fontSize: 22 }}>Gửi yêu cầu</h3>
          <p style={{ color: "var(--n-600)", marginBottom: 24 }}>Điền thông tin bên dưới — đội kỹ thuật sẽ phản hồi trong 4h làm việc.</p>
          <div className="form-grid-2">
            <div className="form-row"><label>Họ tên <span className="req">*</span></label><input className="input" placeholder="Nguyễn Văn A" /></div>
            <div className="form-row"><label>Công ty <span className="req">*</span></label><input className="input" placeholder="Tên công ty" /></div>
          </div>
          <div className="form-grid-2">
            <div className="form-row"><label>Email <span className="req">*</span></label><input className="input" type="email" placeholder="email@congty.com" /></div>
            <div className="form-row"><label>Điện thoại</label><input className="input" placeholder="+84 ..." /></div>
          </div>
          <div className="form-row">
            <label>Loại yêu cầu</label>
            <select className="input">
              <option>Tư vấn kỹ thuật</option>
              <option>Yêu cầu báo giá</option>
              <option>Yêu cầu mẫu thử</option>
              <option>Khác</option>
            </select>
          </div>
          <div className="form-row">
            <label>Sản phẩm quan tâm</label>
            <input className="input" placeholder="VD: AGITAN® 120, Defoamer cho sơn nước..." />
          </div>
          <div className="form-row">
            <label>Mô tả chi tiết <span className="req">*</span></label>
            <textarea className="input" placeholder="Vui lòng mô tả nhu cầu, hệ sản xuất, vấn đề đang gặp..."></textarea>
          </div>
          <label style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16, fontSize: 13, color: "var(--n-600)" }}>
            <input type="checkbox" defaultChecked /> Tôi đồng ý nhận thông tin sản phẩm và kỹ thuật từ Stromann
          </label>
          <Btn variant="primary" size="lg" style={{ width: "100%" }}>Gửi yêu cầu →</Btn>
        </form>
      </div>
    </>
  );
}
