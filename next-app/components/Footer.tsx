import Link from "next/link";

const linkCls = "text-n-400 text-[13px] transition-colors duration-150 hover:text-white";

const productLinks: Array<[string, string]> = [
  ["Defoamer",          "/products?g=defoamer"],
  ["Dispersant",        "/products?g=dispersant"],
  ["Wetting Agent",     "/products?g=wetting"],
  ["Rheology Modifier", "/products?g=rheology"],
  ["Wax Additives",     "/products?g=wax"],
];

const industryLinks: Array<[string, string]> = [
  ["Sơn (Coatings)",    "/industries"],
  ["Mực in",            "/industries"],
  ["Nhựa & Masterbatch", "/industries"],
];

const supportLinks: Array<[string, string]> = [
  ["Yêu cầu báo giá",   "/quote"],
  ["MSDS / Brochure",   "/support"],
  ["FAQ",               "/support"],
  ["Liên hệ",           "/contact"],
];

const companyLinks: Array<[string, string]> = [
  ["Đối tác MÜNZING",   "/about"],
  ["Tin tức",           "/news"],
  ["Tuyển dụng",        "/recruitment"],
  ["Chính sách bảo mật", "/about"],
];

function FooterCol({ title, links }: { title: string; links: Array<[string, string]> }) {
  return (
    <div>
      <h5 className="text-white text-sm font-bold m-0 mb-4 tracking-[0.01em]">{title}</h5>
      <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className={linkCls}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-n-900 text-n-300">
      <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr_1fr] gap-12 px-20 py-16">
        <div>
          <Link href="/" className="flex items-center gap-2.5 mb-4">
            <span className="w-9 h-9 rounded-md bg-accent text-white font-bold text-xl flex items-center justify-center shadow-[0_2px_8px_rgba(225,29,44,0.25)]">
              S
            </span>
            <div>
              <div className="font-bold text-xl tracking-[-0.01em] text-white">STROMANN</div>
              <div className="text-[10px] text-n-500 tracking-[0.1em] uppercase mt-0.5">
                Việt Nam
              </div>
            </div>
          </Link>
          <p className="text-n-400 text-[13px] leading-[1.6] mt-4">
            Công ty Cổ phần Stromann Việt Nam — phân phối phụ gia hiệu suất cao cho ngành sơn, mực in và nhựa. Đối tác chiến lược của MÜNZING (Đức).
          </p>
          <div className="mt-5 text-xs text-n-500 flex flex-col gap-1.5">
            <div>📍 19 Nguyễn Văn Trỗi, Q. Phú Nhuận, TP.HCM</div>
            <div>📞 +84 28 36200703</div>
            <div>✉ info@stromann.vn</div>
          </div>
        </div>
        <FooterCol title="Sản phẩm"        links={productLinks} />
        <FooterCol title="Ngành ứng dụng"  links={industryLinks} />
        <FooterCol title="Hỗ trợ"          links={supportLinks} />
        <FooterCol title="Công ty"         links={companyLinks} />
      </div>

      <div className="border-t border-n-800 px-20 py-5 flex justify-between items-center text-xs text-n-500">
        <span>© 2026 Stromann Việt Nam. All rights reserved.</span>
        <div className="flex gap-6 items-center">
          <div className="flex gap-2">
            {SOCIAL.map((s) => (
              <a
                key={s.title}
                href="#"
                title={s.title}
                aria-label={s.title}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-n-800 text-n-300 text-[13px] font-semibold transition-colors duration-150 hover:bg-accent hover:text-white"
              >
                {s.icon}
              </a>
            ))}
          </div>
          <div className="flex gap-3 items-center text-xs">
            <span className="text-white font-bold">VN</span>
            <span className="text-n-700">•</span>
            <a href="#" className={linkCls}>EN</a>
            <span className="text-n-700">•</span>
            <a href="#" className={linkCls}>CN</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const SOCIAL = [
  {
    title: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
        <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.34 18.34V10.5H5.67v7.84h2.67zM7 9.34a1.55 1.55 0 100-3.1 1.55 1.55 0 000 3.1zm11.34 9V14c0-2.4-1.27-3.5-2.97-3.5-1.37 0-1.99.75-2.34 1.28V10.5H10.5v7.84h2.84v-4.4c0-.4.03-.8.15-1.08.32-.8 1.05-1.62 2.27-1.62 1.6 0 2.24 1.22 2.24 3v4.1h2.84z" />
      </svg>
    ),
  },
  {
    title: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
      </svg>
    ),
  },
  {
    title: "Zalo",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="14">
        <text x="12" y="11" textAnchor="middle" fontFamily="Inter" fontSize="9" fontWeight="800" fill="currentColor">
          Zalo
        </text>
      </svg>
    ),
  },
  {
    title: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
        <path d="M21.58 7.19a2.51 2.51 0 00-1.77-1.78C18.25 5 12 5 12 5s-6.25 0-7.81.41A2.51 2.51 0 002.42 7.2C2 8.76 2 12 2 12s0 3.24.42 4.81c.23.86.91 1.55 1.77 1.78C5.75 19 12 19 12 19s6.25 0 7.81-.41a2.51 2.51 0 001.77-1.78C22 15.24 22 12 22 12s0-3.24-.42-4.81zM10 15V9l5.2 3-5.2 3z" />
      </svg>
    ),
  },
];
