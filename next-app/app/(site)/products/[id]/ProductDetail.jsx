"use client";

import Link from "next/link";
import { useState } from "react";
import { Tag, Btn, ProductImage } from "@/components/ui";
import Breadcrumb from "@/components/Breadcrumb";
import { PRODUCTS } from "@/lib/data";

export default function ProductDetail({ product: p }) {
  const [thumb, setThumb] = useState(0);
  const [tab, setTab] = useState("desc");

  return (
    <>
      <Breadcrumb items={[
        { label: "Sản phẩm", href: "/products" },
        { label: p.group, href: `/products?g=${p.group.toLowerCase()}` },
        { label: p.name }
      ]} />

      <section className="pd-hero">
        <div className="pd-gallery">
          <div className="pd-gallery__main"><ProductImage name={p.name} /></div>
          <div className="pd-gallery__thumbs">
            {[0,1,2,3].map(i => (
              <div key={i} className={`pd-gallery__thumb${thumb === i ? " active" : ""}`} onClick={() => setThumb(i)}>
                <ProductImage name={`view ${i+1}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="pd-info">
          <div className="pd-info__top">
            <Tag variant="brand">{p.group}</Tag>
            <Tag variant="success">CÒN HÀNG</Tag>
            <Tag variant="neutral">MÜNZING</Tag>
          </div>
          <h1 className="pd-info__title" style={{ margin: 0 }}>{p.name}</h1>
          <p className="pd-info__sub" style={{ margin: 0 }}>
            Defoamer hiệu quả cao dành cho sơn nước hệ acrylic, sơn xây dựng và mực in flexo gốc nước. Kiểm soát bọt khí ổn định, không gây rạn màng, dễ phối trộn ở giai đoạn let-down.
          </p>
          <div className="pd-info__ctas">
            <Btn variant="primary" size="lg" href="/quote">Yêu cầu báo giá</Btn>
            <Btn variant="secondary" size="lg">Yêu cầu mẫu thử</Btn>
            <Btn variant="ghost" size="lg">↓ Tải MSDS</Btn>
          </div>
          <dl className="pd-info__meta">
            {[
              ["Loại", "Defoamer không silicon"],
              ["Liều dùng khuyến nghị", "0.1 – 0.5% trên tổng công thức"],
              ["Đóng gói", "Can 25 kg / Phuy 200 kg / IBC 1000 kg"],
              ["Bảo quản", "Nơi khô ráo, 5°C – 35°C"],
              ["Hạn sử dụng", "12 tháng kể từ ngày sản xuất"],
              ["Mã hàng", "AGI-120-25"],
            ].map(([k, v]) => (
              <div className="pd-info__meta-row" key={k}>
                <dt>{k}</dt><dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section--alt" style={{ paddingTop: 32 }}>
        <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--n-200)", marginBottom: 32 }}>
          {[
            ["desc", "Mô tả & Lợi ích"],
            ["app", "Ứng dụng"],
            ["spec", "Thông số kỹ thuật"],
            ["doc", "Tài liệu kỹ thuật"],
          ].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)}
              style={{
                padding: "14px 24px", fontSize: 14, fontWeight: 700,
                color: tab === k ? "var(--accent)" : "var(--n-600)",
                borderBottom: tab === k ? "3px solid var(--accent)" : "3px solid transparent",
                marginBottom: -1
              }}>{l}</button>
          ))}
        </div>

        {tab === "desc" && (
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 48 }}>
            <div>
              <h3 style={{ fontSize: 22, marginTop: 0 }}>Mô tả sản phẩm</h3>
              <p style={{ color: "var(--n-700)", lineHeight: 1.7 }}>
                AGITAN® 120 là defoamer không silicon dạng nhũ tương dầu khoáng, được phát triển cho các hệ sơn nước có hàm lượng pigment cao. Sản phẩm cho hiệu quả khử bọt cao và khả năng kiểm soát bọt vi mô tốt trong cả khâu sản xuất lẫn thi công.
              </p>
              <h3 style={{ fontSize: 22, marginTop: 32 }}>Lợi ích chính</h3>
              <ul style={{ paddingLeft: 20, lineHeight: 1.9, color: "var(--n-700)" }}>
                <li>Hiệu quả khử bọt cao ngay ở liều thấp (0.1 – 0.3%)</li>
                <li>Tương thích tốt với hầu hết hệ acrylic, styrene-acrylic, vinyl-acrylic</li>
                <li>Không gây rạn màng (cratering), không ảnh hưởng đến độ bóng</li>
                <li>Dễ phân tán, có thể thêm trực tiếp vào let-down</li>
                <li>Đạt VOC thấp, phù hợp xu hướng sản phẩm xanh</li>
              </ul>
            </div>
            <aside style={{ background: "#fff", padding: 24, borderRadius: 12, border: "1px solid var(--n-200)", height: "fit-content" }}>
              <h4 style={{ marginTop: 0 }}>Cần hỗ trợ chọn sản phẩm?</h4>
              <p style={{ fontSize: 13, color: "var(--n-600)" }}>Đội kỹ sư của chúng tôi sẽ phản hồi trong 4h làm việc.</p>
              <Btn variant="primary" style={{ width: "100%" }} href="/contact">Liên hệ kỹ sư</Btn>
              <div className="note-bar" style={{ marginTop: 16 }}>
                <span>📞</span><span>Hotline: +84 28 36200703</span>
              </div>
            </aside>
          </div>
        )}

        {tab === "app" && (
          <table className="app-table">
            <thead>
              <tr><th>Hệ ứng dụng</th><th>Sơn nước</th><th>Sơn dầu</th><th>Mực in nước</th><th>Mực in dầu</th><th>Liều dùng</th></tr>
            </thead>
            <tbody>
              <tr><td>Sơn xây dựng (acrylic)</td><td><span className="check">✓</span></td><td><span className="dash">—</span></td><td><span className="dash">—</span></td><td><span className="dash">—</span></td><td>0.1 – 0.3%</td></tr>
              <tr><td>Sơn công nghiệp 1K</td><td><span className="check">✓</span></td><td><span className="dash">—</span></td><td><span className="dash">—</span></td><td><span className="dash">—</span></td><td>0.2 – 0.5%</td></tr>
              <tr><td>Mực in flexo gốc nước</td><td><span className="dash">—</span></td><td><span className="dash">—</span></td><td><span className="check">✓</span></td><td><span className="dash">—</span></td><td>0.1 – 0.4%</td></tr>
              <tr><td>Mực in gravure</td><td><span className="dash">—</span></td><td><span className="dash">—</span></td><td><span className="check">✓</span></td><td><span className="dash">—</span></td><td>0.2 – 0.5%</td></tr>
              <tr><td>Keo dán gốc nước</td><td><span className="check">✓</span></td><td><span className="dash">—</span></td><td><span className="dash">—</span></td><td><span className="dash">—</span></td><td>0.1 – 0.3%</td></tr>
            </tbody>
          </table>
        )}

        {tab === "spec" && (
          <table className="app-table">
            <tbody>
              {[
                ["Trạng thái", "Lỏng, đục"],
                ["Màu sắc", "Trắng ngà"],
                ["Tỷ trọng (20°C)", "0.95 – 0.98 g/ml"],
                ["Hàm lượng rắn", "100%"],
                ["pH (10% trong nước)", "6 – 8"],
                ["Hoạt chất", "Polyether-modified mineral oil"],
                ["Điểm chớp cháy", "> 100°C"],
              ].map(([k, v]) => (
                <tr key={k}><td style={{ background: "var(--n-50)", fontWeight: 700 }}>{k}</td><td colSpan="5">{v}</td></tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === "doc" && (
          <div className="resource-grid">
            {[
              { name: "TDS — AGITAN® 120", meta: "PDF · 412 KB · Cập nhật 03/2026" },
              { name: "MSDS — AGITAN® 120 (VN)", meta: "PDF · 580 KB · Cập nhật 03/2026" },
              { name: "MSDS — AGITAN® 120 (EN)", meta: "PDF · 565 KB · Cập nhật 03/2026" },
              { name: "Brochure — Defoamer cho sơn nước", meta: "PDF · 2.4 MB" },
              { name: "Hướng dẫn phối trộn", meta: "PDF · 880 KB" },
              { name: "Chứng nhận chất lượng", meta: "PDF · 320 KB" },
            ].map(r => (
              <a key={r.name} href="#" className="resource">
                <div className="resource__icon">PDF</div>
                <div className="resource__body">
                  <div className="resource__title">{r.name}</div>
                  <div className="resource__meta">{r.meta}</div>
                </div>
                <span className="resource__cta">Tải ↓</span>
              </a>
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <h3 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 24px" }}>Sản phẩm liên quan</h3>
        <div className="product-grid">
          {PRODUCTS.filter(x => x.group === p.group && x.id !== p.id).slice(0, 4).map(rp => (
            <Link key={rp.id} href={`/products/${rp.id}`} className="prod-card">
              <div className="prod-card__media"><ProductImage name={rp.name} /></div>
              <div className="prod-card__body">
                <Tag variant="brand">{rp.group}</Tag>
                <h3 className="prod-card__name">{rp.name}</h3>
                <p className="prod-card__desc">{rp.desc}</p>
                <div className="prod-card__foot">
                  <span className="prod-card__cta">Xem chi tiết →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
