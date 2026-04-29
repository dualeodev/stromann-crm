"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Tag } from "./ui";

const NAV = [
  { id: "home", label: "Trang chủ", path: "/" },
  { id: "products", label: "Sản phẩm", path: "/products", mega: true },
  { id: "industries", label: "Ngành ứng dụng", path: "/industries" },
  { id: "about", label: "Giới thiệu", path: "/about" },
  { id: "news", label: "Tin tức", path: "/news" },
  { id: "recruitment", label: "Tuyển dụng", path: "/recruitment" },
  { id: "contact", label: "Liên hệ", path: "/contact" },
];

function isActive(pathname, path) {
  if (path === "/") return pathname === "/";
  return pathname.startsWith(path);
}

function ProductMega({ onClose }) {
  return (
    <div className="megamenu" onMouseLeave={onClose}>
      <div className="megamenu__inner">
        <div className="megamenu__col">
          <h5>Theo nhóm</h5>
          <ul>
            <li><Link href="/products?g=defoamer">Defoamer <span style={{ color: "var(--n-400)", fontSize: 12 }}>· 22</span></Link></li>
            <li><Link href="/products?g=dispersant">Dispersant <span style={{ color: "var(--n-400)", fontSize: 12 }}>· 18</span></Link></li>
            <li><Link href="/products?g=wetting">Wetting Agent <span style={{ color: "var(--n-400)", fontSize: 12 }}>· 12</span></Link></li>
            <li><Link href="/products?g=rheology">Rheology Modifier <span style={{ color: "var(--n-400)", fontSize: 12 }}>· 9</span></Link></li>
            <li><Link href="/products?g=wax">Wax Additives <span style={{ color: "var(--n-400)", fontSize: 12 }}>· 7</span></Link></li>
          </ul>
        </div>
        <div className="megamenu__col">
          <h5>Theo ngành</h5>
          <ul>
            <li><Link href="/industries">Sơn (Coatings)</Link></li>
            <li><Link href="/industries">Mực in (Printing Inks)</Link></li>
            <li><Link href="/industries">Nhựa & Masterbatch</Link></li>
          </ul>
        </div>
        <div className="megamenu__col">
          <h5>Theo vấn đề</h5>
          <ul>
            <li><Link href="/products?p=foam">Bọt khí</Link></li>
            <li><Link href="/products?p=viscosity">Độ nhớt</Link></li>
            <li><Link href="/products?p=surface">Bề mặt</Link></li>
            <li><Link href="/products?p=color">Lên màu</Link></li>
          </ul>
        </div>
        <div className="megamenu__feature">
          <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: 12 }}>
            <Tag variant="brand" style={{ alignSelf: "flex-start" }}>SẢN PHẨM MỚI</Tag>
            <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.3 }}>AGITAN® thế hệ mới — đã có hàng tại Việt Nam</div>
            <div style={{ fontSize: 13, color: "var(--n-400)" }}>Hiệu quả khử bọt cao hơn 30%, không silicon.</div>
            <Link href="/products/agitan-120" className="link-arrow" style={{ color: "#fff" }}>Khám phá ngay →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [lang, setLang] = useState("VN");
  const closeTimer = useRef(null);

  const onEnterMega = () => { clearTimeout(closeTimer.current); setMegaOpen(true); };
  const onLeaveMega = () => { closeTimer.current = setTimeout(() => setMegaOpen(false), 120); };

  return (
    <div className="hdr-wrap" onMouseLeave={onLeaveMega}>
      <div className="hdr-utility">
        <nav className="hdr-utility__nav">
          <Link href="/news">Tin tức</Link>
          <Link href="/recruitment">Tuyển dụng</Link>
          <Link href="/contact">Liên hệ</Link>
          <Link href="/quote">Báo giá</Link>
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
        <Link href="/" className="hdr-logo">
          <span className="hdr-logo__mark">S</span>
          <div>
            <div className="hdr-logo__name">STROMANN</div>
            <div className="hdr-logo__sub">Việt Nam</div>
          </div>
        </Link>
        <nav className="hdr-nav">
          {NAV.map(item => (
            <Link key={item.id} href={item.path}
                  className={isActive(pathname, item.path) ? "active" : ""}
                  onMouseEnter={() => item.mega ? onEnterMega() : setMegaOpen(false)}
            >
              {item.label}{item.mega ? " ▾" : ""}
            </Link>
          ))}
        </nav>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="btn btn--secondary btn--sm" aria-label="search">🔍 Tìm kiếm</button>
          <Link href="/contact" className="btn btn--primary">Tư vấn kỹ thuật</Link>
        </div>

        {megaOpen && <ProductMega onClose={() => setMegaOpen(false)} />}
      </div>
    </div>
  );
}
