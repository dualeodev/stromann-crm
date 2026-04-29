import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div>
          <Link href="/" className="hdr-logo" style={{ marginBottom: 16 }}>
            <span className="hdr-logo__mark">S</span>
            <div>
              <div className="hdr-logo__name" style={{ color: "#fff" }}>STROMANN</div>
              <div className="hdr-logo__sub" style={{ color: "var(--n-500)" }}>Việt Nam</div>
            </div>
          </Link>
          <p style={{ color: "var(--n-400)", fontSize: 13, lineHeight: 1.6, marginTop: 16 }}>
            Công ty Cổ phần Stromann Việt Nam — phân phối phụ gia hiệu suất cao cho ngành sơn, mực in và nhựa. Đối tác chiến lược của MÜNZING (Đức).
          </p>
          <div style={{ marginTop: 20, fontSize: 12, color: "var(--n-500)", display: "flex", flexDirection: "column", gap: 6 }}>
            <div>📍 19 Nguyễn Văn Trỗi, Q. Phú Nhuận, TP.HCM</div>
            <div>📞 +84 28 36200703</div>
            <div>✉ info@stromann.vn</div>
          </div>
        </div>
        <div>
          <h5>Sản phẩm</h5>
          <ul>
            <li><Link href="/products?g=defoamer">Defoamer</Link></li>
            <li><Link href="/products?g=dispersant">Dispersant</Link></li>
            <li><Link href="/products?g=wetting">Wetting Agent</Link></li>
            <li><Link href="/products?g=rheology">Rheology Modifier</Link></li>
            <li><Link href="/products?g=wax">Wax Additives</Link></li>
          </ul>
        </div>
        <div>
          <h5>Ngành ứng dụng</h5>
          <ul>
            <li><Link href="/industries">Sơn (Coatings)</Link></li>
            <li><Link href="/industries">Mực in</Link></li>
            <li><Link href="/industries">Nhựa & Masterbatch</Link></li>
          </ul>
        </div>
        <div>
          <h5>Hỗ trợ</h5>
          <ul>
            <li><Link href="/quote">Yêu cầu báo giá</Link></li>
            <li><Link href="/support">MSDS / Brochure</Link></li>
            <li><Link href="/support">FAQ</Link></li>
            <li><Link href="/contact">Liên hệ</Link></li>
          </ul>
        </div>
        <div>
          <h5>Công ty</h5>
          <ul>
            <li><Link href="/about">Đối tác MÜNZING</Link></li>
            <li><Link href="/news">Tin tức</Link></li>
            <li><Link href="/recruitment">Tuyển dụng</Link></li>
            <li><Link href="/about">Chính sách bảo mật</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer__bot">
        <span>© 2026 Stromann Việt Nam. All rights reserved.</span>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <div className="footer__social">
            <a href="#" title="LinkedIn" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.34 18.34V10.5H5.67v7.84h2.67zM7 9.34a1.55 1.55 0 100-3.1 1.55 1.55 0 000 3.1zm11.34 9V14c0-2.4-1.27-3.5-2.97-3.5-1.37 0-1.99.75-2.34 1.28V10.5H10.5v7.84h2.84v-4.4c0-.4.03-.8.15-1.08.32-.8 1.05-1.62 2.27-1.62 1.6 0 2.24 1.22 2.24 3v4.1h2.84z"/></svg>
            </a>
            <a href="#" title="Facebook" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
            </a>
            <a href="#" title="Zalo" aria-label="Zalo">
              <svg viewBox="0 0 24 24" width="22" height="14"><text x="12" y="11" textAnchor="middle" fontFamily="Inter" fontSize="9" fontWeight="800" fill="currentColor">Zalo</text></svg>
            </a>
            <a href="#" title="YouTube" aria-label="YouTube">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M21.58 7.19a2.51 2.51 0 00-1.77-1.78C18.25 5 12 5 12 5s-6.25 0-7.81.41A2.51 2.51 0 002.42 7.2C2 8.76 2 12 2 12s0 3.24.42 4.81c.23.86.91 1.55 1.77 1.78C5.75 19 12 19 12 19s6.25 0 7.81-.41a2.51 2.51 0 001.77-1.78C22 15.24 22 12 22 12s0-3.24-.42-4.81zM10 15V9l5.2 3-5.2 3z"/></svg>
            </a>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 12 }}>
            <span style={{ color: "#fff", fontWeight: 700 }}>VN</span>
            <span style={{ color: "var(--n-700)" }}>•</span>
            <a href="#">EN</a>
            <span style={{ color: "var(--n-700)" }}>•</span>
            <a href="#">CN</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
