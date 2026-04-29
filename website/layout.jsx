// layout.jsx — Header, Footer, FloatingSidebar, Page wrapper

const NAV = [
  { id: "home", label: "Trang chủ", path: "#/" },
  { id: "products", label: "Sản phẩm", path: "#/products", mega: true },
  { id: "industries", label: "Ngành ứng dụng", path: "#/industries" },
  { id: "about", label: "Giới thiệu", path: "#/about" },
  { id: "news", label: "Tin tức", path: "#/news" },
  { id: "recruitment", label: "Tuyển dụng", path: "#/recruitment" },
  { id: "contact", label: "Liên hệ", path: "#/contact" },
];

function Header({ route, navigate }) {
  const [megaOpen, setMegaOpen] = React.useState(false);
  const [lang, setLang] = React.useState("VN");
  const closeTimer = React.useRef(null);

  const onEnterMega = () => { clearTimeout(closeTimer.current); setMegaOpen(true); };
  const onLeaveMega = () => { closeTimer.current = setTimeout(() => setMegaOpen(false), 120); };

  return (
    <div className="hdr-wrap" onMouseLeave={onLeaveMega}>
      <div className="hdr-utility">
        <nav className="hdr-utility__nav">
          <a href="#/news">Tin tức</a>
          <a href="#/recruitment">Tuyển dụng</a>
          <a href="#/contact">Liên hệ</a>
          <a href="#/quote">Báo giá</a>
        </nav>
        <div className="hdr-utility__right">
          <span style={{ color: "#fff", fontWeight: 700 }}>Hotline: +84 28 36200703</span>
          <span style={{ color: "var(--n-400)" }}>info@stromann.vn</span>
          <span className="hdr-lang">
            {["VN", "EN", "CN"].map(l => (
              <button key={l} className={lang === l ? "active" : ""} onClick={() => setLang(l)}>{l}</button>
            ))}
          </span>
        </div>
      </div>
      <div className="hdr-main" style={{ position: "relative" }}>
        <a href="#/" className="hdr-logo">
          <span className="hdr-logo__mark">S</span>
          <div>
            <div className="hdr-logo__name">STROMANN</div>
            <div className="hdr-logo__sub">Việt Nam</div>
          </div>
        </a>
        <nav className="hdr-nav">
          {NAV.map(item => (
            <a key={item.id} href={item.path}
               className={route?.page === item.id ? "active" : ""}
               onMouseEnter={() => item.mega ? onEnterMega() : setMegaOpen(false)}
            >
              {item.label}{item.mega ? " ▾" : ""}
            </a>
          ))}
        </nav>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="btn btn--secondary btn--sm" aria-label="search">🔍 Tìm kiếm</button>
          <a href="#/contact" className="btn btn--primary">Tư vấn kỹ thuật</a>
        </div>

        {megaOpen && <ProductMega onClose={() => setMegaOpen(false)} />}
      </div>
    </div>
  );
}

function ProductMega({ onClose }) {
  return (
    <div className="megamenu" onMouseLeave={onClose}>
      <div className="megamenu__inner">
        <div className="megamenu__col">
          <h5>Theo nhóm</h5>
          <ul>
            <li><a href="#/products?g=defoamer">Defoamer <span style={{ color: "var(--n-400)", fontSize: 12 }}>· 22</span></a></li>
            <li><a href="#/products?g=dispersant">Dispersant <span style={{ color: "var(--n-400)", fontSize: 12 }}>· 18</span></a></li>
            <li><a href="#/products?g=wetting">Wetting Agent <span style={{ color: "var(--n-400)", fontSize: 12 }}>· 12</span></a></li>
            <li><a href="#/products?g=rheology">Rheology Modifier <span style={{ color: "var(--n-400)", fontSize: 12 }}>· 9</span></a></li>
            <li><a href="#/products?g=wax">Wax Additives <span style={{ color: "var(--n-400)", fontSize: 12 }}>· 7</span></a></li>
          </ul>
        </div>
        <div className="megamenu__col">
          <h5>Theo ngành</h5>
          <ul>
            <li><a href="#/industries">Sơn (Coatings)</a></li>
            <li><a href="#/industries">Mực in (Printing Inks)</a></li>
            <li><a href="#/industries">Nhựa & Masterbatch</a></li>
          </ul>
        </div>
        <div className="megamenu__col">
          <h5>Theo vấn đề</h5>
          <ul>
            <li><a href="#/products?p=foam">Bọt khí</a></li>
            <li><a href="#/products?p=viscosity">Độ nhớt</a></li>
            <li><a href="#/products?p=surface">Bề mặt</a></li>
            <li><a href="#/products?p=color">Lên màu</a></li>
          </ul>
        </div>
        <div className="megamenu__feature">
          <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: 12 }}>
            <span className="tag tag--brand" style={{ alignSelf: "flex-start" }}>SẢN PHẨM MỚI</span>
            <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.3 }}>AGITAN® thế hệ mới — đã có hàng tại Việt Nam</div>
            <div style={{ fontSize: 13, color: "var(--n-400)" }}>Hiệu quả khử bọt cao hơn 30%, không silicon.</div>
            <a href="#/products/agitan-120" className="link-arrow" style={{ color: "#fff" }}>Khám phá ngay →</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div>
          <a href="#/" className="hdr-logo" style={{ marginBottom: 16 }}>
            <span className="hdr-logo__mark">S</span>
            <div>
              <div className="hdr-logo__name" style={{ color: "#fff" }}>STROMANN</div>
              <div className="hdr-logo__sub" style={{ color: "var(--n-500)" }}>Việt Nam</div>
            </div>
          </a>
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
            <li><a href="#/products?g=defoamer">Defoamer</a></li>
            <li><a href="#/products?g=dispersant">Dispersant</a></li>
            <li><a href="#/products?g=wetting">Wetting Agent</a></li>
            <li><a href="#/products?g=rheology">Rheology Modifier</a></li>
            <li><a href="#/products?g=wax">Wax Additives</a></li>
          </ul>
        </div>
        <div>
          <h5>Ngành ứng dụng</h5>
          <ul>
            <li><a href="#/industries">Sơn (Coatings)</a></li>
            <li><a href="#/industries">Mực in</a></li>
            <li><a href="#/industries">Nhựa & Masterbatch</a></li>
          </ul>
        </div>
        <div>
          <h5>Hỗ trợ</h5>
          <ul>
            <li><a href="#/quote">Yêu cầu báo giá</a></li>
            <li><a href="#/support">MSDS / Brochure</a></li>
            <li><a href="#/support">FAQ</a></li>
            <li><a href="#/contact">Liên hệ</a></li>
          </ul>
        </div>
        <div>
          <h5>Công ty</h5>
          <ul>
            <li><a href="#/about">Đối tác MÜNZING</a></li>
            <li><a href="#/news">Tin tức</a></li>
            <li><a href="#/recruitment">Tuyển dụng</a></li>
            <li><a href="#/about">Chính sách bảo mật</a></li>
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

function FsbIcon({ name }) {
  // Brand-colored SVGs
  const ic = {
    phone: <svg viewBox="0 0 24 24" width="22" height="22"><path fill="#16A34A" d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2a15.15 15.15 0 01-6.59-6.58l2.2-2.21c.27-.27.36-.66.24-1.01A11.36 11.36 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/></svg>,
    fb: <svg viewBox="0 0 24 24" width="22" height="22"><path fill="#1877F2" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>,
    zalo: <svg viewBox="0 0 24 24" width="24" height="24"><rect x="2" y="3" width="20" height="18" rx="4" fill="#0068FF"/><text x="12" y="15" textAnchor="middle" fontFamily="Inter" fontSize="9" fontWeight="800" fill="#fff">Zalo</text></svg>,
    wa: <svg viewBox="0 0 24 24" width="22" height="22"><path fill="#25D366" d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5s.05-.37-.02-.52c-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1s2.1 3.21 5.09 4.5c.71.31 1.27.5 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35zM12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l5.07-1.32A9.96 9.96 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>,
    wc: <svg viewBox="0 0 24 24" width="22" height="22"><ellipse cx="9" cy="9.5" rx="7" ry="6" fill="#07C160"/><circle cx="6.5" cy="8.5" r="1" fill="#fff"/><circle cx="11" cy="8.5" r="1" fill="#fff"/><ellipse cx="16" cy="14.5" rx="6" ry="5" fill="#07C160"/><circle cx="14" cy="13.5" r=".8" fill="#fff"/><circle cx="18" cy="13.5" r=".8" fill="#fff"/></svg>,
    mail: <svg viewBox="0 0 24 24" width="22" height="22"><path fill="#E11D2C" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>,
  };
  return ic[name] || null;
}

function FloatingSidebar() {
  const items = [
    { name: "phone", tip: "Hotline: +84 28 36200703", href: "tel:+842836200703" },
    { name: "fb", tip: "Facebook" },
    { name: "zalo", tip: "Zalo: 0901 234 567" },
    { name: "wa", tip: "WhatsApp" },
    { name: "wc", tip: "WeChat" },
    { name: "mail", tip: "info@stromann.vn", href: "mailto:info@stromann.vn" },
  ];
  return (
    <div className="fsb">
      {items.map((it, i) => (
        <a key={i} href={it.href || "#"} className="fsb__item" data-tip={it.tip} aria-label={it.tip}>
          <FsbIcon name={it.name} />
        </a>
      ))}
    </div>
  );
}

function Breadcrumb({ items }) {
  return (
    <div className="breadcrumb">
      <a href="#/">Trang chủ</a>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          <span className="breadcrumb__sep">/</span>
          {i === items.length - 1 ? <span className="breadcrumb__current">{it.label}</span> : <a href={it.href}>{it.label}</a>}
        </React.Fragment>
      ))}
    </div>
  );
}

window.SLAYOUT = { Header, Footer, FloatingSidebar, Breadcrumb, NAV };
