"use client";

import { useState, useEffect } from "react";

// ============================================================================
// DATA
// ============================================================================

const NAV = [
  { group: "Tổng quan" },
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "notifications", label: "Thông báo", icon: "🔔", count: 12, hot: true },
  { id: "submissions", label: "Form gửi đến", icon: "📥", count: 28, hot: true },

  { group: "Nội dung" },
  { id: "banners", label: "Banner trang chủ", icon: "🖼" },
  { id: "products", label: "Sản phẩm", icon: "📦", count: 72 },
  { id: "industries", label: "Ngành ứng dụng", icon: "🏭", count: 3 },
  { id: "tech", label: "Vấn đề kỹ thuật", icon: "🛠", count: 4 },
  { id: "news", label: "Tin tức", icon: "📰", count: 24 },
  { id: "recruitment", label: "Tuyển dụng", icon: "💼", count: 6 },

  { group: "Hệ thống" },
  { id: "users", label: "Người dùng & quyền", icon: "👥" },
  { id: "languages", label: "Đa ngôn ngữ", icon: "🌐" },
  { id: "seo", label: "SEO", icon: "🔍" },
  { id: "logs", label: "Log hoạt động", icon: "📜" },
  { id: "settings", label: "Cấu hình", icon: "⚙" },
];

const NOTIFICATIONS = [
  { id: 1, type: "quote", icon: "💰", title: "Yêu cầu báo giá mới — Cty Sơn Nippon VN", sub: "AGITAN® 120 (200kg) + EDAPLAN® 470 (50kg)", time: "2 phút trước", unread: true, target: { page: "submissions", id: "SUB-2026-0429-001" } },
  { id: 2, type: "tech", icon: "🛠", title: "Tư vấn kỹ thuật — Anh Tuấn (Đại Bàng Paint)", sub: "Vấn đề bọt khí trên mực in flexo gốc nước", time: "12 phút trước", unread: true, target: { page: "submissions", id: "SUB-2026-0429-002" } },
  { id: 3, type: "cv", icon: "📄", title: "CV ứng tuyển — Lab Engineer", sub: "Nguyễn Thanh Hà — 3 năm KN MÜNZING", time: "28 phút trước", unread: true, target: { page: "recruitment", id: 1 } },
  { id: 4, type: "contact", icon: "✉", title: "Liên hệ chung — JR Industrial", sub: "Yêu cầu mẫu thử HYDROPALAT® WE 3475", time: "1 giờ trước", unread: true, target: { page: "submissions", id: "SUB-2026-0429-004" } },
  { id: 5, type: "quote", icon: "💰", title: "Yêu cầu báo giá — Vinaplast", sub: "5 mã wax additive cho masterbatch PE", time: "2 giờ trước", unread: false, target: { page: "submissions", id: "SUB-2026-0429-005" } },
  { id: 6, type: "tech", icon: "🛠", title: "Tư vấn kỹ thuật — Cty Sơn 4 Oranges", sub: "Tối ưu công thức sơn xây dựng", time: "3 giờ trước", unread: false, target: { page: "submissions", id: "SUB-2026-0428-021" } },
  { id: 7, type: "cv", icon: "📄", title: "CV ứng tuyển — Tech Sales miền Bắc", sub: "Trần Minh Quân", time: "5 giờ trước", unread: false, target: { page: "recruitment", id: 3 } },
  { id: 8, type: "quote", icon: "💰", title: "Báo giá đã được Sales tiếp nhận", sub: "ĐH#2026-0428-12 chuyển sang trạng thái 'Đang xử lý'", time: "Hôm qua", unread: false, target: { page: "submissions", id: "SUB-2026-0428-019" } },
];

const SUBMISSIONS = [
  { id: "SUB-2026-0429-001", type: "Báo giá", company: "Sơn Nippon VN", contact: "Phạm Thị Lan", email: "lan.pt@nippon.vn", date: "29/04/2026 14:32", status: "new", assignee: null },
  { id: "SUB-2026-0429-002", type: "Tư vấn KT", company: "Đại Bàng Paint", contact: "Lê Văn Tuấn", email: "tuan.lv@daibang.com", date: "29/04/2026 14:18", status: "new", assignee: null },
  { id: "SUB-2026-0429-003", type: "Ứng tuyển", company: "—", contact: "Nguyễn Thanh Hà", email: "hanguyen@gmail.com", date: "29/04/2026 14:02", status: "new", assignee: "HR" },
  { id: "SUB-2026-0429-004", type: "Liên hệ", company: "JR Industrial", contact: "Mark Chen", email: "mark@jr-industrial.cn", date: "29/04/2026 13:30", status: "in-progress", assignee: "Sales 1" },
  { id: "SUB-2026-0429-005", type: "Báo giá", company: "Vinaplast", contact: "Trần Quốc Bảo", email: "bao.tq@vinaplast.vn", date: "29/04/2026 12:45", status: "in-progress", assignee: "Sales 2" },
  { id: "SUB-2026-0428-021", type: "Tư vấn KT", company: "4 Oranges", contact: "Nguyễn Văn Hùng", email: "hung.nv@4oranges.vn", date: "28/04/2026 17:15", status: "in-progress", assignee: "Tech 1" },
  { id: "SUB-2026-0428-019", type: "Báo giá", company: "Akzo Nobel VN", contact: "Sarah Lim", email: "sarah.lim@akzo.com", date: "28/04/2026 11:00", status: "done", assignee: "Sales 1" },
  { id: "SUB-2026-0428-015", type: "Liên hệ", company: "Mực in Việt Đức", contact: "Lý Hoàng An", email: "an.lh@vietduc.vn", date: "28/04/2026 09:22", status: "done", assignee: "Sales 2" },
];

const ADMIN_PRODUCTS = [
  { id: "agitan-120", name: "AGITAN® 120", group: "Defoamer", brand: "MÜNZING", industries: ["Sơn nước", "Mực in nước"], status: "published", lang: { vn: true, en: true, cn: false }, updated: "29/04/2026" },
  { id: "edaplan-470", name: "EDAPLAN® 470", group: "Dispersant", brand: "MÜNZING", industries: ["Sơn nước", "Mực in"], status: "published", lang: { vn: true, en: true, cn: true }, updated: "28/04/2026" },
  { id: "metolat-358", name: "METOLAT® 358", group: "Wetting Agent", brand: "MÜNZING", industries: ["Sơn nước"], status: "published", lang: { vn: true, en: true, cn: false }, updated: "27/04/2026" },
  { id: "hydropalat-3475", name: "HYDROPALAT® WE 3475", group: "Rheology Modifier", brand: "MÜNZING", industries: ["Sơn nước", "Mực in"], status: "published", lang: { vn: true, en: false, cn: false }, updated: "26/04/2026" },
  { id: "agitan-282", name: "AGITAN® 282", group: "Defoamer", brand: "MÜNZING", industries: ["Sơn dầu"], status: "draft", lang: { vn: true, en: false, cn: false }, updated: "25/04/2026" },
  { id: "tafigel-pur-80", name: "TAFIGEL® PUR 80", group: "Rheology Modifier", brand: "MÜNZING", industries: ["Sơn nước"], status: "published", lang: { vn: true, en: true, cn: false }, updated: "24/04/2026" },
  { id: "metolat-we-4150", name: "METOLAT® WE 4150", group: "Wax Additive", brand: "MÜNZING", industries: ["Nhựa"], status: "scheduled", lang: { vn: true, en: false, cn: false }, updated: "23/04/2026" },
];

const BANNERS = [
  { id: 1, title: "AGITAN® thế hệ mới — đã có hàng tại VN", from: "01/04/2026", to: "30/06/2026", status: "active", lang: { vn: true, en: true, cn: false } },
  { id: 2, title: "Triển lãm VietnamCoatings Expo 2026", from: "15/05/2026", to: "20/05/2026", status: "scheduled", lang: { vn: true, en: true, cn: true } },
  { id: 3, title: "MÜNZING — đối tác chiến lược", from: "01/01/2026", to: "31/12/2026", status: "active", lang: { vn: true, en: true, cn: true } },
  { id: 4, title: "Khuyến mãi Tết 2026", from: "20/01/2026", to: "15/02/2026", status: "expired", lang: { vn: true, en: false, cn: false } },
];

const ACTIVITY = [
  { who: "Bạn", what: "đã cập nhật sản phẩm", target: "AGITAN® 120", time: "10 phút trước" },
  { who: "Sales 1", what: "đã xử lý yêu cầu báo giá", target: "ĐH#2026-0428-12", time: "1 giờ trước" },
  { who: "Tech 1", what: "đã trả lời tư vấn kỹ thuật", target: "4 Oranges", time: "2 giờ trước" },
  { who: "Content", what: "đã đăng bài viết mới", target: "5 lưu ý chọn defoamer cho sơn nước", time: "3 giờ trước" },
  { who: "HR", what: "đã thêm vị trí tuyển dụng", target: "Lab Engineer", time: "Hôm qua" },
  { who: "Super Admin", what: "đã cập nhật banner", target: "AGITAN® thế hệ mới", time: "Hôm qua" },
];

const STATUS_LABELS = {
  new: { lbl: "Mới", cls: "pill--brand" },
  "in-progress": { lbl: "Đang xử lý", cls: "pill--info" },
  done: { lbl: "Đã xử lý", cls: "pill--success" },
  active: { lbl: "Đang chạy", cls: "pill--success" },
  scheduled: { lbl: "Đã lên lịch", cls: "pill--info" },
  expired: { lbl: "Hết hạn", cls: "pill--neutral" },
  published: { lbl: "Đã xuất bản", cls: "pill--success" },
  draft: { lbl: "Nháp", cls: "pill--neutral" },
};

// ============================================================================
// SHARED ATOMS
// ============================================================================

function Pill({ status }) {
  const s = STATUS_LABELS[status] || { lbl: status, cls: "pill--neutral" };
  return <span className={`pill ${s.cls}`}>{s.lbl}</span>;
}

function LangChip({ lang }) {
  return (
    <span className="lang">
      <span className={lang.vn ? "has" : ""}>VN</span>
      <span className={lang.en ? "has" : ""}>EN</span>
      <span className={lang.cn ? "has" : ""}>CN</span>
    </span>
  );
}

function Toggle({ on, onChange }) {
  return <span className={`toggle ${on ? "on" : ""}`} onClick={() => onChange(!on)}></span>;
}

function ActionRow() {
  return (
    <div className="tbl__actions">
      <button className="tbl__act" title="Xem">👁</button>
      <button className="tbl__act" title="Sửa">✎</button>
      <button className="tbl__act danger" title="Xóa">🗑</button>
    </div>
  );
}

function showToast(msg) {
  if (typeof document === "undefined") return;
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<span>✓</span><span>${msg}</span>`;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => { el.classList.remove("show"); setTimeout(() => el.remove(), 300); }, 2200);
}

// ============================================================================
// DETAIL-PAGE SHARED ATOMS
// ============================================================================

function DetailHeader({ breadcrumb, title, sub, badge, goBack, actions }) {
  return (
    <div className="page-h" style={{ marginBottom: 24 }}>
      <div>
        <div className="crumb">
          <a onClick={goBack} style={{ cursor: "pointer", color: "var(--brand-500)" }}>← {breadcrumb}</a> / <span>{title}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
          <h1 style={{ margin: 0 }}>{title}</h1>
          {badge}
        </div>
        {sub && <p>{sub}</p>}
      </div>
      <div style={{ display: "flex", gap: 8 }}>{actions}</div>
    </div>
  );
}

function FormSection({ title, desc, children }) {
  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div className="card__head">
        <div>
          <h3>{title}</h3>
          {desc && <div style={{ fontSize: 12, color: "var(--n-500)", marginTop: 2 }}>{desc}</div>}
        </div>
      </div>
      <div className="card__body">{children}</div>
    </div>
  );
}

function LangTabs({ lang, setLang }) {
  return (
    <div style={{ display: "inline-flex", gap: 0, background: "var(--n-100)", padding: 3, borderRadius: 8, marginBottom: 16 }}>
      {[
        { id: "vn", label: "🇻🇳 Tiếng Việt", flag: "VN" },
        { id: "en", label: "🇬🇧 English", flag: "EN" },
        { id: "cn", label: "🇨🇳 中文", flag: "CN" },
      ].map(t => (
        <button key={t.id} onClick={() => setLang(t.id)}
          style={{
            padding: "6px 14px", fontSize: 12, fontWeight: 600, borderRadius: 6,
            background: lang === t.id ? "#fff" : "transparent",
            color: lang === t.id ? "var(--n-900)" : "var(--n-600)",
            boxShadow: lang === t.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none"
          }}>
          {t.label}
        </button>
      ))}
    </div>
  );
}

function ChipMulti({ options, selected, onChange }) {
  const toggle = v => {
    if (selected.includes(v)) onChange(selected.filter(x => x !== v));
    else onChange([...selected, v]);
  };
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {options.map(o => {
        const on = selected.includes(o);
        return (
          <button key={o} onClick={() => toggle(o)}
            style={{
              padding: "6px 12px", fontSize: 12, fontWeight: 600, borderRadius: 999,
              border: on ? "1px solid var(--brand-500)" : "1px solid var(--n-300)",
              background: on ? "#FFE4E6" : "#fff",
              color: on ? "var(--brand-700)" : "var(--n-700)",
            }}>
            {on && "✓ "}{o}
          </button>
        );
      })}
    </div>
  );
}

// ============================================================================
// SIDEBAR & TOPBAR
// ============================================================================

function Sidebar({ active, setActive }) {
  return (
    <aside className="sb">
      <div className="sb__brand">
        <div className="sb__mark">S</div>
        <div>
          <div className="sb__name">STROMANN</div>
          <div className="sb__tag">Admin · CMS</div>
        </div>
      </div>
      {NAV.map((item, i) => item.group ? (
        <div key={"g"+i} className="sb__group">{item.group}</div>
      ) : (
        <div key={item.id} className={`sb__item ${active === item.id ? "active" : ""}`} onClick={() => setActive(item.id)}>
          <span className="sb__icon">{item.icon}</span>
          <span>{item.label}</span>
          {item.count != null && <span className={`sb__count ${item.hot ? "sb__count--hot" : ""}`}>{item.count}</span>}
        </div>
      ))}
    </aside>
  );
}

function TopBar({ openDrawer }) {
  return (
    <div className="topbar">
      <div className="searchbar">
        <span style={{ color: "var(--n-500)" }}>🔍</span>
        <input placeholder="Tìm sản phẩm, bài viết, yêu cầu, người dùng..." />
        <span style={{ fontSize: 11, color: "var(--n-400)", padding: "2px 6px", border: "1px solid var(--n-300)", borderRadius: 4 }}>⌘K</span>
      </div>
      <div className="tb__right">
        <button className="tb__btn" title="Trợ giúp">?</button>
        <button className="tb__btn" title="Thông báo" onClick={openDrawer}>
          🔔<span className="dot"></span>
        </button>
        <a className="tb__btn" href="/" title="Xem website" target="_blank">↗</a>
        <div className="tb__user">
          <div className="tb__avatar">VA</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700 }}>Văn A</div>
            <div className="tb__role">Super Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// LIST PAGES
// ============================================================================

function PageDashboard({ openDrawer, goTo }) {
  const days = ["T2","T3","T4","T5","T6","T7","CN"];
  const data = [12, 19, 8, 24, 16, 9, 5];
  const max = Math.max(...data);
  return (
    <>
      <div className="page-h">
        <div>
          <div className="crumb">Tổng quan / <span>Dashboard</span></div>
          <h1>Chào buổi chiều, Văn A 👋</h1>
          <p>Đây là tổng quan hoạt động website Stromann hôm nay.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn--secondary">Xuất báo cáo</button>
          <button className="btn btn--primary">+ Thêm nội dung</button>
        </div>
      </div>

      <div className="stats">
        <div className="stat stat--accent">
          <div className="stat__lbl">Yêu cầu mới hôm nay</div>
          <div className="stat__num">12</div>
          <div className="stat__delta">▲ +4 so với hôm qua</div>
        </div>
        <div className="stat">
          <div className="stat__lbl">Tổng sản phẩm</div>
          <div className="stat__num">72</div>
          <div className="stat__delta up">▲ +3 tuần này</div>
        </div>
        <div className="stat">
          <div className="stat__lbl">Lượt truy cập / 7 ngày</div>
          <div className="stat__num">8,432</div>
          <div className="stat__delta up">▲ +12.4%</div>
        </div>
        <div className="stat">
          <div className="stat__lbl">Tỷ lệ chuyển đổi</div>
          <div className="stat__num">3.8%</div>
          <div className="stat__delta down">▼ -0.3%</div>
        </div>
      </div>

      <div className="row-2">
        <div className="card">
          <div className="card__head">
            <h3>Yêu cầu gửi đến — 7 ngày qua</h3>
            <button className="btn btn--ghost btn--sm">Tuần này ▾</button>
          </div>
          <div className="card__body">
            <div className="chart">
              {data.map((v, i) => (
                <div key={i} className="bar" style={{ height: (v / max * 140) + "px" }}>
                  <span className="bar__lbl">{days[i]}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 36, fontSize: 12, color: "var(--n-600)" }}>
              <div><b style={{ color: "var(--brand-500)" }}>●</b> Báo giá: 38</div>
              <div><b style={{ color: "var(--brand-500)" }}>●</b> Tư vấn KT: 24</div>
              <div><b style={{ color: "var(--brand-500)" }}>●</b> Liên hệ: 19</div>
              <div><b style={{ color: "var(--brand-500)" }}>●</b> Ứng tuyển: 12</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card__head">
            <h3>Thông báo gần nhất</h3>
            <button className="btn btn--ghost btn--sm" onClick={openDrawer}>Xem tất cả →</button>
          </div>
          <div className="card__body" style={{ padding: 0 }}>
            {NOTIFICATIONS.slice(0, 4).map(n => (
              <div key={n.id} className={`notif ${n.unread ? "unread" : ""}`} style={{ paddingLeft: 16, cursor: "pointer" }} onClick={() => n.target && goTo(n.target.page, n.target.id)}>
                <div className={`notif__icon ${n.type}`}>{n.icon}</div>
                <div className="notif__body">
                  <div className="notif__title">{n.title}</div>
                  <div className="notif__sub">{n.sub}</div>
                  <div className="notif__time">{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row-2" style={{ marginTop: 20 }}>
        <div className="card">
          <div className="card__head"><h3>Sản phẩm xem nhiều nhất</h3></div>
          <div className="card__body" style={{ padding: 0 }}>
            <table className="tbl">
              <thead><tr><th>Sản phẩm</th><th>Nhóm</th><th style={{ textAlign: "right" }}>Lượt xem</th></tr></thead>
              <tbody>
                <tr><td className="tbl__name">AGITAN® 120</td><td>Defoamer</td><td style={{ textAlign: "right", fontWeight: 700 }}>1,249</td></tr>
                <tr><td className="tbl__name">EDAPLAN® 470</td><td>Dispersant</td><td style={{ textAlign: "right", fontWeight: 700 }}>892</td></tr>
                <tr><td className="tbl__name">METOLAT® 358</td><td>Wetting</td><td style={{ textAlign: "right", fontWeight: 700 }}>671</td></tr>
                <tr><td className="tbl__name">HYDROPALAT® WE 3475</td><td>Rheology</td><td style={{ textAlign: "right", fontWeight: 700 }}>540</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card__head"><h3>Hoạt động gần đây</h3></div>
          <div className="card__body">
            <div className="activity">
              {ACTIVITY.map((a, i) => (
                <div key={i} className="activity__row">
                  <span className="activity__dot"></span>
                  <div>
                    <div className="activity__txt"><b>{a.who}</b> {a.what} <b>{a.target}</b></div>
                    <div className="activity__time">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function PageSubmissions({ goTo }) {
  const [filter, setFilter] = useState("all");
  const filtered = SUBMISSIONS.filter(s => filter === "all" || s.status === filter || (filter === "type-quote" && s.type === "Báo giá") || (filter === "type-tech" && s.type === "Tư vấn KT") || (filter === "type-cv" && s.type === "Ứng tuyển") || (filter === "type-contact" && s.type === "Liên hệ"));

  return (
    <>
      <div className="page-h">
        <div>
          <div className="crumb">Tổng quan / <span>Form gửi đến</span></div>
          <h1>Form gửi đến</h1>
          <p>Tất cả yêu cầu báo giá, tư vấn kỹ thuật, liên hệ và ứng tuyển từ website.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn--secondary">⤓ Xuất CSV</button>
          <button className="btn btn--secondary">⚙ Cấu hình thông báo</button>
        </div>
      </div>

      <div className="stats">
        <div className="stat"><div className="stat__lbl">Mới chưa xử lý</div><div className="stat__num" style={{ color: "var(--brand-500)" }}>5</div><div className="stat__delta up">cần phản hồi trong 4h</div></div>
        <div className="stat"><div className="stat__lbl">Đang xử lý</div><div className="stat__num">11</div></div>
        <div className="stat"><div className="stat__lbl">Đã xử lý (7 ngày)</div><div className="stat__num">93</div><div className="stat__delta up">▲ +18%</div></div>
        <div className="stat"><div className="stat__lbl">Thời gian phản hồi TB</div><div className="stat__num">2.4h</div><div className="stat__delta up">trong SLA</div></div>
      </div>

      <div className="card">
        <div className="card__head">
          <div className="toolbar2" style={{ margin: 0 }}>
            <div className="filt">
              <button className={`chip ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>Tất cả</button>
              <button className={`chip ${filter === "new" ? "active" : ""}`} onClick={() => setFilter("new")}>Mới</button>
              <button className={`chip ${filter === "in-progress" ? "active" : ""}`} onClick={() => setFilter("in-progress")}>Đang xử lý</button>
              <button className={`chip ${filter === "done" ? "active" : ""}`} onClick={() => setFilter("done")}>Đã xử lý</button>
              <span style={{ width: 1, background: "var(--n-200)", margin: "0 4px" }}></span>
              <button className={`chip ${filter === "type-quote" ? "active" : ""}`} onClick={() => setFilter("type-quote")}>💰 Báo giá</button>
              <button className={`chip ${filter === "type-tech" ? "active" : ""}`} onClick={() => setFilter("type-tech")}>🛠 Tư vấn KT</button>
              <button className={`chip ${filter === "type-cv" ? "active" : ""}`} onClick={() => setFilter("type-cv")}>📄 CV</button>
              <button className={`chip ${filter === "type-contact" ? "active" : ""}`} onClick={() => setFilter("type-contact")}>✉ Liên hệ</button>
            </div>
          </div>
        </div>
        <table className="tbl">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Mã</th>
              <th>Loại</th>
              <th>Khách</th>
              <th>Thời gian</th>
              <th>Trạng thái</th>
              <th>Người phụ trách</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id} onClick={() => goTo("submissions", s.id)} style={{ cursor: "pointer" }}>
                <td onClick={e => e.stopPropagation()}><input type="checkbox" /></td>
                <td className="tbl__id">{s.id}</td>
                <td>{s.type}</td>
                <td>
                  <div className="tbl__name">{s.contact}</div>
                  <div className="tbl__sub">{s.company} · {s.email}</div>
                </td>
                <td><span style={{ fontSize: 12, color: "var(--n-600)" }}>{s.date}</span></td>
                <td><Pill status={s.status} /></td>
                <td>{s.assignee || <span style={{ color: "var(--n-400)" }}>Chưa gán</span>}</td>
                <td onClick={e => e.stopPropagation()}><ActionRow /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function PageProductsList({ goTo }) {
  const [search, setSearch] = useState("");
  const filtered = ADMIN_PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <div className="page-h">
        <div>
          <div className="crumb">Nội dung / <span>Sản phẩm</span></div>
          <h1>Quản lý sản phẩm</h1>
          <p>72 sản phẩm — phân theo nhóm chức năng, ngành ứng dụng, vấn đề kỹ thuật và thương hiệu.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn--secondary">⤴ Import CSV</button>
          <button className="btn btn--primary" onClick={() => goTo("products", "new")}>+ Thêm sản phẩm</button>
        </div>
      </div>

      <div className="card">
        <div className="card__head">
          <div className="searchbar" style={{ background: "#F4F4F5", maxWidth: 300 }}>
            <span>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm sản phẩm..." />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn--ghost btn--sm">Tất cả nhóm ▾</button>
            <button className="btn btn--ghost btn--sm">Tất cả ngành ▾</button>
            <button className="btn btn--ghost btn--sm">Trạng thái ▾</button>
          </div>
        </div>
        <table className="tbl">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Sản phẩm</th>
              <th>Nhóm</th>
              <th>Ngành ứng dụng</th>
              <th>Trạng thái</th>
              <th>Ngôn ngữ</th>
              <th>Cập nhật</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} onClick={() => goTo("products", p.id)} style={{ cursor: "pointer" }}>
                <td onClick={e => e.stopPropagation()}><input type="checkbox" /></td>
                <td>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div className="thumb thumb--brand"></div>
                    <div>
                      <div className="tbl__name">{p.name}</div>
                      <div className="tbl__sub">{p.brand} · {p.id}</div>
                    </div>
                  </div>
                </td>
                <td>{p.group}</td>
                <td><div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>{p.industries.map(i => <span key={i} style={{ fontSize: 11, padding: "2px 6px", background: "var(--n-100)", borderRadius: 4 }}>{i}</span>)}</div></td>
                <td><Pill status={p.status} /></td>
                <td><LangChip lang={p.lang} /></td>
                <td><span style={{ fontSize: 12, color: "var(--n-600)" }}>{p.updated}</span></td>
                <td onClick={e => e.stopPropagation()}><ActionRow /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function PageBanners({ goTo }) {
  return (
    <>
      <div className="page-h">
        <div>
          <div className="crumb">Nội dung / <span>Banner trang chủ</span></div>
          <h1>Banner & Slideshow</h1>
          <p>Quản lý banner hero homepage. Hỗ trợ thời gian hiệu lực để tự bật/tắt theo lịch.</p>
        </div>
        <button className="btn btn--primary" onClick={() => goTo("banners", "new")}>+ Thêm banner</button>
      </div>

      <div className="card">
        <table className="tbl">
          <thead><tr><th></th><th>Banner</th><th>Hiệu lực từ</th><th>Đến</th><th>Trạng thái</th><th>Ngôn ngữ</th><th>Bật/Tắt</th><th></th></tr></thead>
          <tbody>
            {BANNERS.map(b => (
              <tr key={b.id} onClick={() => goTo("banners", b.id)} style={{ cursor: "pointer" }}>
                <td><div className="thumb thumb--brand"></div></td>
                <td><div className="tbl__name">{b.title}</div><div className="tbl__sub">Banner #{b.id}</div></td>
                <td><span style={{ fontSize: 12 }}>{b.from}</span></td>
                <td><span style={{ fontSize: 12 }}>{b.to}</span></td>
                <td><Pill status={b.status} /></td>
                <td><LangChip lang={b.lang} /></td>
                <td onClick={e => e.stopPropagation()}><Toggle on={b.status === "active"} onChange={() => showToast("Đã đổi trạng thái banner")} /></td>
                <td onClick={e => e.stopPropagation()}><ActionRow /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function PageIndustriesList({ goTo }) {
  const items = [
    { id: 1, code: "S", name: "Sơn (Coatings)", products: 28, articles: 7, visible: true, default: true },
    { id: 2, code: "M", name: "Mực in (Printing Inks)", products: 18, articles: 4, visible: true, default: true },
    { id: 3, code: "N", name: "Nhựa & Masterbatch", products: 12, articles: 3, visible: true, default: true },
    { id: 4, code: "K", name: "Keo dán (Adhesives)", products: 5, articles: 0, visible: false, default: false },
    { id: 5, code: "G", name: "Giấy (Paper Coatings)", products: 0, articles: 0, visible: false, default: false },
  ];
  return (
    <>
      <div className="page-h">
        <div>
          <div className="crumb">Nội dung / <span>Ngành ứng dụng</span></div>
          <h1>Ngành ứng dụng</h1>
          <p>Mặc định 3 ngành chính. Có thể thêm ngành mới và bật hiển thị bất cứ lúc nào.</p>
        </div>
        <button className="btn btn--primary" onClick={() => goTo("industries", "new")}>+ Thêm ngành mới</button>
      </div>
      <div className="card">
        <table className="tbl">
          <thead><tr><th>Mã</th><th>Tên ngành</th><th>Sản phẩm</th><th>Bài viết</th><th>Mặc định</th><th>Hiển thị</th><th></th></tr></thead>
          <tbody>
            {items.map(i => (
              <tr key={i.id} onClick={() => goTo("industries", i.id)} style={{ cursor: "pointer" }}>
                <td><span style={{ display: "inline-flex", width: 28, height: 28, borderRadius: 6, background: "#FFE4E6", color: "var(--brand-700)", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{i.code}</span></td>
                <td className="tbl__name">{i.name}</td>
                <td>{i.products}</td>
                <td>{i.articles}</td>
                <td>{i.default ? <Pill status="published" /> : <span style={{ color: "var(--n-400)", fontSize: 12 }}>—</span>}</td>
                <td onClick={e => e.stopPropagation()}><Toggle on={i.visible} onChange={() => showToast("Đã đổi trạng thái ngành")} /></td>
                <td onClick={e => e.stopPropagation()}><ActionRow /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function PageTechList({ goTo }) {
  const items = [
    { id: 1, name: "Phân tán (Dispersion)", subs: 2, products: 8, articles: 3 },
    { id: 2, name: "Bọt (Foam)", subs: 2, products: 22, articles: 5 },
    { id: 3, name: "Độ nhớt (Rheology)", subs: 2, products: 9, articles: 2 },
    { id: 4, name: "Bề mặt (Surface)", subs: 3, products: 12, articles: 4 },
  ];
  return (
    <>
      <div className="page-h">
        <div>
          <div className="crumb">Nội dung / <span>Vấn đề kỹ thuật</span></div>
          <h1>Vấn đề kỹ thuật ↔ Giải pháp ↔ Sản phẩm</h1>
          <p>Liên kết vấn đề kỹ thuật với giải pháp đề xuất và sản phẩm phù hợp.</p>
        </div>
        <button className="btn btn--primary" onClick={() => goTo("tech", "new")}>+ Thêm vấn đề mới</button>
      </div>
      <div className="card">
        <table className="tbl">
          <thead><tr><th>Vấn đề</th><th>Vấn đề con</th><th>Sản phẩm liên kết</th><th>Bài viết</th><th></th></tr></thead>
          <tbody>
            {items.map(i => (
              <tr key={i.id} onClick={() => goTo("tech", i.id)} style={{ cursor: "pointer" }}>
                <td className="tbl__name">{i.name}</td>
                <td>{i.subs}</td>
                <td><b style={{ color: "var(--brand-500)" }}>{i.products}</b> sản phẩm</td>
                <td>{i.articles}</td>
                <td onClick={e => e.stopPropagation()}><ActionRow /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function PageNewsList({ goTo }) {
  const items = [
    { id: "n1", title: "5 lưu ý chọn defoamer cho sơn nước hệ acrylic", category: "Kiến thức KT", author: "Tech Team", views: 1240, status: "published", date: "25/04/2026" },
    { id: "n2", title: "Case study: tối ưu công thức mực in flexo", category: "Ứng dụng", author: "Tech Team", views: 892, status: "published", date: "18/04/2026" },
    { id: "n3", title: "MÜNZING ra mắt dòng AGITAN® thế hệ mới", category: "Sản phẩm", author: "Marketing", views: 1450, status: "published", date: "10/04/2026" },
    { id: "n4", title: "Stromann tham gia VietnamCoatings Expo 2026", category: "Sự kiện", author: "Marketing", views: 320, status: "published", date: "02/04/2026" },
    { id: "n5", title: "Wetting agent: cách chọn đúng cho từng loại pigment", category: "Kiến thức KT", author: "Tech Team", views: 0, status: "draft", date: "—" },
  ];
  return (
    <>
      <div className="page-h">
        <div>
          <div className="crumb">Nội dung / <span>Tin tức</span></div>
          <h1>Quản lý tin tức</h1>
          <p>4 chuyên mục: Kiến thức kỹ thuật · Ứng dụng thực tế · Sản phẩm · Tin công ty.</p>
        </div>
        <button className="btn btn--primary" onClick={() => goTo("news", "new")}>+ Viết bài mới</button>
      </div>
      <div className="card">
        <table className="tbl">
          <thead><tr><th>Tiêu đề</th><th>Chuyên mục</th><th>Tác giả</th><th>Lượt xem</th><th>Trạng thái</th><th>Ngày đăng</th><th></th></tr></thead>
          <tbody>
            {items.map(n => (
              <tr key={n.id} onClick={() => goTo("news", n.id)} style={{ cursor: "pointer" }}>
                <td className="tbl__name">{n.title}</td>
                <td><span style={{ fontSize: 11, padding: "2px 8px", background: "var(--n-100)", borderRadius: 4 }}>{n.category}</span></td>
                <td>{n.author}</td>
                <td>{n.views.toLocaleString()}</td>
                <td><Pill status={n.status} /></td>
                <td><span style={{ fontSize: 12, color: "var(--n-600)" }}>{n.date}</span></td>
                <td onClick={e => e.stopPropagation()}><ActionRow /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function PageRecruitmentList({ goTo }) {
  const items = [
    { id: 1, title: "Lab Engineer", dept: "Kỹ thuật", location: "TP.HCM", type: "Full-time", applicants: 12, deadline: "31/05/2026", status: "published" },
    { id: 2, title: "Tech Sales (Sơn nước)", dept: "Kinh doanh", location: "TP.HCM", type: "Full-time", applicants: 8, deadline: "30/05/2026", status: "published" },
    { id: 3, title: "Tech Sales miền Bắc", dept: "Kinh doanh", location: "Hà Nội", type: "Full-time", applicants: 5, deadline: "15/05/2026", status: "published" },
    { id: 4, title: "Logistics Coordinator", dept: "Kho vận", location: "TP.HCM", type: "Full-time", applicants: 3, deadline: "20/05/2026", status: "published" },
    { id: 5, title: "Marketing Specialist", dept: "Marketing", location: "TP.HCM", type: "Full-time", applicants: 7, deadline: "25/05/2026", status: "published" },
    { id: 6, title: "Warehouse Staff", dept: "Kho vận", location: "Hà Nội", type: "Full-time", applicants: 0, deadline: "—", status: "draft" },
  ];
  return (
    <>
      <div className="page-h">
        <div>
          <div className="crumb">Nội dung / <span>Tuyển dụng</span></div>
          <h1>Quản lý tuyển dụng</h1>
          <p>Vị trí đang mở và hồ sơ ứng viên.</p>
        </div>
        <button className="btn btn--primary" onClick={() => goTo("recruitment", "new")}>+ Thêm vị trí</button>
      </div>
      <div className="card">
        <table className="tbl">
          <thead><tr><th>Vị trí</th><th>Phòng ban</th><th>Địa điểm</th><th>Hình thức</th><th>Ứng viên</th><th>Hạn nộp</th><th>Trạng thái</th><th></th></tr></thead>
          <tbody>
            {items.map(j => (
              <tr key={j.id} onClick={() => goTo("recruitment", j.id)} style={{ cursor: "pointer" }}>
                <td className="tbl__name">{j.title}</td>
                <td>{j.dept}</td>
                <td>{j.location}</td>
                <td><span className="pill pill--neutral">{j.type}</span></td>
                <td><b style={{ color: "var(--brand-500)" }}>{j.applicants}</b> CV</td>
                <td><span style={{ fontSize: 12 }}>{j.deadline}</span></td>
                <td><Pill status={j.status} /></td>
                <td onClick={e => e.stopPropagation()}><ActionRow /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function PageNotifications({ goTo }) {
  const [filter, setFilter] = useState("all");
  const [items, setItems] = useState(NOTIFICATIONS);
  const filtered = items.filter(n => filter === "all" || (filter === "unread" && n.unread) || filter === n.type);
  const markAll = () => { setItems(items.map(n => ({ ...n, unread: false }))); showToast("Đã đánh dấu tất cả là đã đọc"); };

  return (
    <>
      <div className="page-h">
        <div>
          <div className="crumb">Tổng quan / <span>Thông báo</span></div>
          <h1>Trung tâm thông báo</h1>
          <p>Tất cả thông báo từ form, hệ thống và hoạt động đội nhóm.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn--secondary" onClick={markAll}>✓ Đánh dấu tất cả đã đọc</button>
          <button className="btn btn--secondary">⚙ Cài đặt thông báo</button>
        </div>
      </div>

      <div className="row-2">
        <div className="card">
          <div className="card__head">
            <div className="filt" style={{ display: "flex", gap: 6 }}>
              <button className={`chip ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>Tất cả</button>
              <button className={`chip ${filter === "unread" ? "active" : ""}`} onClick={() => setFilter("unread")}>Chưa đọc</button>
              <button className={`chip ${filter === "quote" ? "active" : ""}`} onClick={() => setFilter("quote")}>Báo giá</button>
              <button className={`chip ${filter === "tech" ? "active" : ""}`} onClick={() => setFilter("tech")}>Tư vấn KT</button>
              <button className={`chip ${filter === "cv" ? "active" : ""}`} onClick={() => setFilter("cv")}>Ứng tuyển</button>
              <button className={`chip ${filter === "contact" ? "active" : ""}`} onClick={() => setFilter("contact")}>Liên hệ</button>
            </div>
          </div>
          <div className="card__body" style={{ padding: 0 }}>
            {filtered.map(n => (
              <div key={n.id} className={`notif ${n.unread ? "unread" : ""}`} style={{ cursor: "pointer" }} onClick={() => n.target && goTo(n.target.page, n.target.id)}>
                <div className={`notif__icon ${n.type}`}>{n.icon}</div>
                <div className="notif__body">
                  <div className="notif__title">{n.title}</div>
                  <div className="notif__sub">{n.sub}</div>
                  <div className="notif__time">{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card__head"><h3>Cài đặt kênh nhận thông báo</h3></div>
          <div className="card__body">
            {[
              { name: "📧 Email", desc: "vana@stromann.vn", on: true },
              { name: "💬 Zalo OA", desc: "Bot Zalo Stromann", on: true },
              { name: "📱 Push (browser)", desc: "Khi đang mở admin", on: true },
              { name: "🔔 Telegram", desc: "Group Sales & Tech", on: false },
              { name: "📩 SMS", desc: "Chỉ cho yêu cầu khẩn", on: false },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", padding: "12px 0", borderTop: i ? "1px solid var(--n-100)" : "none" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: "var(--n-500)", marginTop: 2 }}>{c.desc}</div>
                </div>
                <Toggle on={c.on} onChange={() => showToast("Đã cập nhật cài đặt")} />
              </div>
            ))}
            <div style={{ marginTop: 16, padding: 12, background: "#FFF8F8", border: "1px solid #FFE4E6", borderRadius: 8, fontSize: 12, color: "var(--n-700)" }}>
              💡 Yêu cầu báo giá và tư vấn kỹ thuật khẩn sẽ <b>luôn</b> được gửi qua Email + Push, không thể tắt.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function PageGeneric({ title, breadcrumb, desc }) {
  return (
    <>
      <div className="page-h">
        <div>
          <div className="crumb">{breadcrumb} / <span>{title}</span></div>
          <h1>{title}</h1>
          <p>{desc}</p>
        </div>
      </div>
      <div className="card">
        <div className="card__body">
          <div className="empty">Trang quản lý {title.toLowerCase()} — bố cục tương tự các trang nội dung khác (table + filter + form thêm/sửa).</div>
        </div>
      </div>
    </>
  );
}

// ============================================================================
// DETAIL PAGES
// ============================================================================

function PageProductDetail({ id, goBack }) {
  const [lang, setLang] = useState("vn");
  const [industries, setIndustries] = useState(["Sơn nước", "Mực in nước"]);
  const [problems, setProblems] = useState(["Bọt"]);
  const [appMatrix, setAppMatrix] = useState({
    "Sơn nước": true, "Sơn dầu": false, "Sơn bóng": true,
    "Mực in nước": true, "Mực in dầu": false, "Nhựa": false, "Masterbatch": false
  });
  const [docs, setDocs] = useState([
    { name: "AGITAN-120-MSDS-VN.pdf", size: "247 KB", type: "MSDS", date: "20/04/2026" },
    { name: "AGITAN-120-Brochure.pdf", size: "1.2 MB", type: "Brochure", date: "15/04/2026" },
  ]);

  const isNew = id === "new";

  return (
    <>
      <DetailHeader
        breadcrumb="Sản phẩm"
        title={isNew ? "Thêm sản phẩm mới" : "AGITAN® 120"}
        sub={isNew ? "Điền đầy đủ thông tin sản phẩm cho cả 3 ngôn ngữ trước khi xuất bản." : "Defoamer · MÜNZING · Cập nhật lần cuối 29/04/2026 14:32 bởi Văn A"}
        badge={!isNew && <Pill status="published" />}
        goBack={goBack}
        actions={
          <>
            {!isNew && <button className="btn btn--secondary">⤓ Xuất COA</button>}
            {!isNew && <button className="btn btn--secondary">👁 Xem trên website</button>}
            <button className="btn btn--ghost">Lưu nháp</button>
            <button className="btn btn--primary" onClick={() => { showToast("Đã lưu sản phẩm thành công"); goBack(); }}>
              {isNew ? "Tạo & xuất bản" : "Lưu thay đổi"}
            </button>
          </>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        <div>
          <FormSection title="Thông tin cơ bản">
            <LangTabs lang={lang} setLang={setLang} />
            <div className="field-row">
              <div className="field">
                <label>Tên sản phẩm <span className="req">*</span></label>
                <input className="input" defaultValue={lang === "vn" ? "AGITAN® 120" : lang === "en" ? "AGITAN® 120" : "AGITAN® 120 消泡剂"} />
              </div>
              <div className="field">
                <label>Slug URL</label>
                <input className="input" defaultValue="agitan-120" />
                <div style={{ fontSize: 11, color: "var(--n-500)" }}>stromann.vn/san-pham/<b>agitan-120</b></div>
              </div>
            </div>
            <div className="field">
              <label>Mô tả ngắn (hiển thị trên card listing)</label>
              <textarea className="input" rows={2} defaultValue={lang === "vn"
                ? "Defoamer hiệu suất cao cho hệ sơn nước và mực in gốc nước. Khử bọt nhanh, không làm ảnh hưởng độ bóng."
                : lang === "en"
                ? "High-performance defoamer for waterborne coatings and inks. Fast knockdown, no gloss reduction."
                : "用于水性涂料和墨水的高性能消泡剂。快速消泡,不影响光泽度。"} />
            </div>
            <div className="field">
              <label>Mô tả chi tiết</label>
              <div style={{ border: "1px solid var(--n-300)", borderRadius: 8, overflow: "hidden" }}>
                <div style={{ padding: 6, background: "#FAFAFA", borderBottom: "1px solid var(--n-200)", display: "flex", gap: 2 }}>
                  {["B","I","U","H1","H2","•","1.","🔗","📷","</>"].map(t => (
                    <button key={t} style={{ padding: "4px 8px", fontSize: 12, fontWeight: 600, color: "var(--n-700)", borderRadius: 4 }}>{t}</button>
                  ))}
                </div>
                <textarea style={{ width: "100%", border: "none", padding: 12, minHeight: 120, fontSize: 13, outline: "none", resize: "vertical" }}
                  defaultValue="AGITAN® 120 là defoamer dạng nhũ tương dầu khoáng, được phát triển cho các hệ sơn nước có hàm lượng pigment cao. Sản phẩm hoạt động hiệu quả ngay cả ở liều thấp 0.1-0.5%, giúp loại bỏ bọt khí phát sinh trong quá trình khuấy trộn và thi công..."></textarea>
              </div>
            </div>
          </FormSection>

          <FormSection title="Phân loại & gắn tag">
            <div className="field-row-3">
              <div className="field">
                <label>Nhóm chức năng <span className="req">*</span></label>
                <select className="input" defaultValue="Defoamer">
                  <option>Defoamer</option><option>Dispersant</option><option>Wetting Agent</option>
                  <option>Rheology Modifier</option><option>Wax Additive</option>
                </select>
              </div>
              <div className="field">
                <label>Thương hiệu</label>
                <select className="input" defaultValue="MÜNZING"><option>MÜNZING</option><option>AddWorks</option></select>
              </div>
              <div className="field">
                <label>Khu vực có hiệu lực</label>
                <select className="input" defaultValue="Asia/Oceania">
                  <option>EMEA · Americas · Asia/Oceania</option>
                  <option>EMEA</option><option>Americas</option><option>Asia/Oceania</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label>Ngành ứng dụng</label>
              <ChipMulti
                options={["Sơn nước", "Sơn dầu", "Sơn bóng", "Mực in nước", "Mực in dầu", "Nhựa", "Masterbatch", "Keo dán"]}
                selected={industries} onChange={setIndustries}
              />
            </div>
            <div className="field">
              <label>Vấn đề kỹ thuật giải quyết</label>
              <ChipMulti
                options={["Bọt", "Phân tán", "Độ nhớt", "Bề mặt", "Lên màu", "Lưu biến", "Thấm ướt"]}
                selected={problems} onChange={setProblems}
              />
            </div>
          </FormSection>

          <FormSection title="Bảng ứng dụng" desc="Đánh dấu ✓ ở các ô loại sản phẩm cuối phù hợp — hiển thị thành matrix trên trang chi tiết.">
            <table className="tbl" style={{ border: "1px solid var(--n-200)", borderRadius: 8, overflow: "hidden" }}>
              <thead>
                <tr>
                  <th style={{ background: "#FAFAFA" }}>Loại sản phẩm cuối</th>
                  <th style={{ background: "#FAFAFA", textAlign: "center", width: 100 }}>Phù hợp</th>
                  <th style={{ background: "#FAFAFA", width: 200 }}>Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(appMatrix).map(k => (
                  <tr key={k}>
                    <td className="tbl__name">{k}</td>
                    <td style={{ textAlign: "center" }}>
                      <input type="checkbox" checked={appMatrix[k]} onChange={e => setAppMatrix({ ...appMatrix, [k]: e.target.checked })} style={{ width: 18, height: 18 }} />
                    </td>
                    <td><input className="input" placeholder="Liều dùng / lưu ý..." style={{ padding: "4px 8px", fontSize: 12 }} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </FormSection>

          <FormSection title="Tài liệu" desc="MSDS · Brochure · COA. Bỏ TDS theo yêu cầu.">
            <div style={{ marginBottom: 12 }}>
              {docs.map((d, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, border: "1px solid var(--n-200)", borderRadius: 8, marginBottom: 8 }}>
                  <div style={{ width: 36, height: 44, background: "#FEE2E2", color: "#DC2626", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 10 }}>PDF</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{d.name}</div>
                    <div style={{ fontSize: 11, color: "var(--n-500)" }}>{d.type} · {d.size} · Tải lên {d.date}</div>
                  </div>
                  <span className="pill pill--info">{d.type}</span>
                  <button className="tbl__act" title="Tải xuống">⤓</button>
                  <button className="tbl__act danger" title="Xóa" onClick={() => setDocs(docs.filter((_, x) => x !== i))}>🗑</button>
                </div>
              ))}
            </div>
            <div style={{ border: "2px dashed var(--n-300)", borderRadius: 8, padding: 24, textAlign: "center", color: "var(--n-500)", fontSize: 13 }}>
              📁 Kéo thả file PDF vào đây hoặc <a style={{ color: "var(--brand-500)", fontWeight: 600, cursor: "pointer" }}>chọn từ máy</a>
              <div style={{ fontSize: 11, marginTop: 4 }}>Tối đa 10MB · Hỗ trợ PDF</div>
            </div>
          </FormSection>

          <FormSection title="Sản phẩm tương tự" desc="Hiển thị ở cuối trang chi tiết. Để trống = tự đề xuất theo nhóm + ngành.">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {["EDAPLAN® 470", "METOLAT® 358", "AGITAN® 282", "TAFIGEL® PUR 80"].map(p => (
                <label key={p} style={{ display: "flex", alignItems: "center", gap: 8, padding: 10, border: "1px solid var(--n-200)", borderRadius: 8, cursor: "pointer" }}>
                  <input type="checkbox" defaultChecked={["EDAPLAN® 470", "AGITAN® 282"].includes(p)} />
                  <div className="thumb thumb--brand" style={{ width: 32, height: 32 }}></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 12 }}>{p}</div>
                    <div style={{ fontSize: 11, color: "var(--n-500)" }}>MÜNZING</div>
                  </div>
                </label>
              ))}
            </div>
          </FormSection>

          <FormSection title="SEO">
            <div className="field"><label>Meta title</label><input className="input" defaultValue="AGITAN® 120 — Defoamer cho sơn nước | Stromann VN" /></div>
            <div className="field"><label>Meta description</label><textarea className="input" rows={2} defaultValue="Defoamer hiệu suất cao MÜNZING AGITAN® 120 — khử bọt nhanh trong sơn nước, mực in. Liên hệ Stromann để nhận mẫu thử và báo giá."></textarea></div>
            <div className="field"><label>OG image (1200×630)</label>
              <div style={{ border: "2px dashed var(--n-300)", borderRadius: 8, padding: 16, textAlign: "center", fontSize: 12, color: "var(--n-500)" }}>📷 Chọn ảnh OG</div>
            </div>
          </FormSection>
        </div>

        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card__head"><h3>Trạng thái</h3></div>
            <div className="card__body">
              <div className="field">
                <label>Hiển thị</label>
                <select className="input" defaultValue="published">
                  <option value="published">Đã xuất bản</option>
                  <option value="draft">Nháp</option>
                  <option value="scheduled">Lên lịch</option>
                </select>
              </div>
              <div className="field">
                <label>Ảnh sản phẩm</label>
                <div style={{ aspectRatio: "1", background: "repeating-linear-gradient(45deg, #FFE4E6 0 8px, #fff 8px 16px)", border: "1px solid var(--n-200)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--n-500)", fontSize: 12 }}>
                  📷 Chọn ảnh chính
                </div>
              </div>
              <div className="field">
                <label>Ảnh phụ (gallery)</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                  {[1,2,3].map(i => (
                    <div key={i} style={{ aspectRatio: "1", background: "var(--n-100)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--n-400)", fontSize: 11, border: "1px dashed var(--n-300)" }}>+</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card__head"><h3>Trạng thái dịch</h3></div>
            <div className="card__body" style={{ padding: 0 }}>
              {[
                { lang: "🇻🇳 Tiếng Việt (gốc)", status: "Hoàn chỉnh", cls: "pill--success" },
                { lang: "🇬🇧 English", status: "Hoàn chỉnh", cls: "pill--success" },
                { lang: "🇨🇳 中文", status: "Thiếu mô tả", cls: "pill--warn" },
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderTop: i ? "1px solid var(--n-100)" : "none" }}>
                  <div style={{ flex: 1, fontSize: 12 }}>{t.lang}</div>
                  <span className={`pill ${t.cls}`}>{t.status}</span>
                </div>
              ))}
            </div>
          </div>

          {!isNew && (
            <div className="card">
              <div className="card__head"><h3>Thống kê</h3></div>
              <div className="card__body">
                {[
                  { lbl: "Lượt xem 30 ngày", val: "1,249" },
                  { lbl: "Yêu cầu báo giá", val: "23" },
                  { lbl: "Tải MSDS", val: "87" },
                  { lbl: "Compare", val: "14" },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: i ? "1px solid var(--n-100)" : "none" }}>
                    <span style={{ fontSize: 12, color: "var(--n-600)" }}>{s.lbl}</span>
                    <b>{s.val}</b>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isNew && (
            <button className="btn btn--danger" style={{ width: "100%", marginTop: 16, justifyContent: "center", border: "1px solid #FCA5A5", background: "#FEF2F2" }}>
              🗑 Xóa sản phẩm này
            </button>
          )}
        </div>
      </div>
    </>
  );
}

function PageSubmissionDetail({ id, goBack }) {
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("in-progress");
  const [assignee, setAssignee] = useState("Sales 1");

  return (
    <>
      <DetailHeader
        breadcrumb="Form gửi đến"
        title="Yêu cầu báo giá #SUB-2026-0429-001"
        sub="Cty Sơn Nippon VN · Phạm Thị Lan · 29/04/2026 14:32"
        badge={<Pill status={status} />}
        goBack={goBack}
        actions={
          <>
            <button className="btn btn--secondary">📞 Gọi ngay</button>
            <button className="btn btn--secondary">⤓ Xuất PDF</button>
            <button className="btn btn--primary" onClick={() => { showToast("Đã gửi phản hồi đến khách"); goBack(); }}>📤 Gửi phản hồi</button>
          </>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
        <div>
          <FormSection title="Thông tin khách">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { lbl: "Họ tên", val: "Phạm Thị Lan" },
                { lbl: "Công ty", val: "Cty CP Sơn Nippon Việt Nam" },
                { lbl: "Email", val: "lan.pt@nippon.vn", link: "mailto:lan.pt@nippon.vn" },
                { lbl: "Số điện thoại", val: "+84 909 123 456", link: "tel:+84909123456" },
                { lbl: "Địa chỉ", val: "Khu CN Amata, Biên Hòa, Đồng Nai" },
                { lbl: "Vai trò", val: "R&D Manager" },
              ].map((f, i) => (
                <div key={i}>
                  <div style={{ fontSize: 11, color: "var(--n-500)", textTransform: "uppercase", fontWeight: 700, letterSpacing: 0.06 }}>{f.lbl}</div>
                  <div style={{ marginTop: 4, fontSize: 13, fontWeight: 500 }}>
                    {f.link ? <a href={f.link} style={{ color: "var(--brand-500)" }}>{f.val}</a> : f.val}
                  </div>
                </div>
              ))}
            </div>
          </FormSection>

          <FormSection title="Sản phẩm yêu cầu báo giá">
            <table className="tbl">
              <thead><tr><th>Mã sản phẩm</th><th>Số lượng</th><th>Đơn vị</th><th>Ghi chú</th></tr></thead>
              <tbody>
                <tr>
                  <td><div className="tbl__name">AGITAN® 120</div><div className="tbl__sub">Defoamer · MÜNZING</div></td>
                  <td><b>200</b></td>
                  <td>kg</td>
                  <td style={{ fontSize: 12, color: "var(--n-600)" }}>Cần MSDS bản tiếng Anh</td>
                </tr>
                <tr>
                  <td><div className="tbl__name">EDAPLAN® 470</div><div className="tbl__sub">Dispersant · MÜNZING</div></td>
                  <td><b>50</b></td>
                  <td>kg</td>
                  <td style={{ fontSize: 12, color: "var(--n-600)" }}>—</td>
                </tr>
              </tbody>
            </table>
          </FormSection>

          <FormSection title="Ghi chú kỹ thuật từ khách">
            <div style={{ padding: 16, background: "#FAFAFA", borderRadius: 8, fontSize: 13, lineHeight: 1.6, color: "var(--n-700)" }}>
              "Chúng tôi đang phát triển dòng sơn nước nội thất mới với hàm lượng pigment cao (PVC ~75%). Đang gặp vấn đề bọt khí trong quá trình khuấy ở tốc độ 1500 rpm. Đã thử AGITAN® 282 nhưng hiệu quả không đủ. Mong được tư vấn và gửi mẫu thử AGITAN® 120 và EDAPLAN® 470 trước khi đặt lô lớn. Cần báo giá CIF Cát Lái, thanh toán LC 60 ngày."
            </div>
            <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center", fontSize: 12, color: "var(--n-600)" }}>
              📎 <b>company-spec.pdf</b> · 432 KB · <a style={{ color: "var(--brand-500)" }}>Tải xuống</a>
            </div>
          </FormSection>

          <FormSection title="Lịch sử trao đổi">
            <div style={{ position: "relative", paddingLeft: 24 }}>
              <div style={{ position: "absolute", left: 7, top: 4, bottom: 4, width: 2, background: "var(--n-200)" }}></div>
              {[
                { who: "Khách", color: "#1E40AF", bg: "#DBEAFE", msg: "Gửi yêu cầu báo giá lần đầu", time: "29/04/2026 14:32", initial: true },
                { who: "Hệ thống", color: "#52525B", bg: "var(--n-100)", msg: "Tự động gửi email xác nhận đến khách", time: "29/04/2026 14:32" },
                { who: "Văn A (Admin)", color: "var(--brand-700)", bg: "#FFE4E6", msg: "Gán cho Sales 1", time: "29/04/2026 14:35" },
                { who: "Sales 1", color: "#166534", bg: "#DCFCE7", msg: "Đã liên hệ khách qua điện thoại — xác nhận thông số", time: "29/04/2026 15:12" },
              ].map((m, i) => (
                <div key={i} style={{ position: "relative", marginBottom: 16 }}>
                  <div style={{ position: "absolute", left: -20, top: 4, width: 12, height: 12, borderRadius: "50%", background: m.color, border: "2px solid #fff" }}></div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 13 }}>{m.who}</span>
                    <span style={{ fontSize: 11, color: "var(--n-500)" }}>{m.time}</span>
                  </div>
                  <div style={{ padding: 10, background: m.bg, borderRadius: 8, fontSize: 13, color: "var(--n-800)" }}>{m.msg}</div>
                </div>
              ))}
            </div>
          </FormSection>

          <FormSection title="Phản hồi khách">
            <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
              {["📧 Email báo giá", "📞 Đã gọi xác nhận", "📋 Yêu cầu thêm thông tin", "✅ Hoàn tất giao dịch"].map(t => (
                <button key={t} className="chip" style={{ fontSize: 11 }}>{t}</button>
              ))}
            </div>
            <div style={{ border: "1px solid var(--n-300)", borderRadius: 8, overflow: "hidden" }}>
              <div style={{ padding: 6, background: "#FAFAFA", borderBottom: "1px solid var(--n-200)", display: "flex", gap: 2 }}>
                {["B","I","U","🔗","📷","📎","💰 Bảng giá"].map(t => (
                  <button key={t} style={{ padding: "4px 8px", fontSize: 11, fontWeight: 600, color: "var(--n-700)", borderRadius: 4 }}>{t}</button>
                ))}
              </div>
              <textarea value={reply} onChange={e => setReply(e.target.value)}
                style={{ width: "100%", border: "none", padding: 12, minHeight: 100, fontSize: 13, outline: "none", resize: "vertical" }}
                placeholder="Soạn nội dung phản hồi cho khách... (sẽ gửi qua email + lưu vào lịch sử)"
              ></textarea>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
              <label style={{ fontSize: 12, color: "var(--n-600)", display: "flex", gap: 6, alignItems: "center" }}>
                <input type="checkbox" defaultChecked /> CC bộ phận kỹ thuật
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn--secondary">Lưu nháp</button>
                <button className="btn btn--primary" onClick={() => showToast("Đã gửi phản hồi đến khách")}>📤 Gửi phản hồi</button>
              </div>
            </div>
          </FormSection>
        </div>

        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card__head"><h3>Trạng thái xử lý</h3></div>
            <div className="card__body">
              <div className="field">
                <label>Trạng thái</label>
                <select className="input" value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="new">Mới</option>
                  <option value="in-progress">Đang xử lý</option>
                  <option value="done">Đã xử lý</option>
                </select>
              </div>
              <div className="field">
                <label>Người phụ trách</label>
                <select className="input" value={assignee} onChange={e => setAssignee(e.target.value)}>
                  <option>Chưa gán</option>
                  <option>Sales 1 — Trần Văn B</option>
                  <option>Sales 2 — Lê Thị C</option>
                  <option>Tech 1 — Nguyễn D</option>
                </select>
              </div>
              <div className="field">
                <label>Mức độ ưu tiên</label>
                <div style={{ display: "flex", gap: 4 }}>
                  {["Thấp", "Bình thường", "Cao", "Khẩn"].map(p => (
                    <button key={p} className="chip" style={{ flex: 1, padding: "6px 0", fontSize: 11, ...(p === "Cao" ? { background: "var(--brand-500)", color: "#fff", borderColor: "var(--brand-500)" } : {}) }}>{p}</button>
                  ))}
                </div>
              </div>
              <div className="field">
                <label>Tags</label>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  <span className="pill pill--brand">Khách lớn</span>
                  <span className="pill pill--info">Sơn nước</span>
                  <span className="pill pill--neutral">+ Thêm tag</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card__head"><h3>Lịch sử khách</h3></div>
            <div className="card__body" style={{ padding: 0 }}>
              {[
                { date: "29/04/2026", text: "Yêu cầu báo giá hiện tại", current: true },
                { date: "15/03/2026", text: "Đã đặt 100kg AGITAN® 282" },
                { date: "10/01/2026", text: "Tư vấn kỹ thuật về dispersant" },
                { date: "20/11/2025", text: "Liên hệ lần đầu qua website" },
              ].map((h, i) => (
                <div key={i} style={{ padding: "10px 16px", borderTop: i ? "1px solid var(--n-100)" : "none", background: h.current ? "#FFF8F8" : "transparent" }}>
                  <div style={{ fontSize: 12, color: "var(--n-500)" }}>{h.date}</div>
                  <div style={{ fontSize: 13, fontWeight: h.current ? 600 : 400, marginTop: 2 }}>{h.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card__head"><h3>Hành động nhanh</h3></div>
            <div className="card__body" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <button className="btn btn--secondary" style={{ justifyContent: "flex-start" }}>📋 Tạo báo giá chính thức</button>
              <button className="btn btn--secondary" style={{ justifyContent: "flex-start" }}>🧪 Tạo phiếu gửi mẫu thử</button>
              <button className="btn btn--secondary" style={{ justifyContent: "flex-start" }}>👥 Chuyển sang Tech</button>
              <button className="btn btn--secondary" style={{ justifyContent: "flex-start" }}>🚫 Đánh dấu spam</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function PageBannerDetail({ id, goBack }) {
  const [lang, setLang] = useState("vn");
  const isNew = id === "new";
  return (
    <>
      <DetailHeader
        breadcrumb="Banner trang chủ"
        title={isNew ? "Tạo banner mới" : "AGITAN® thế hệ mới — đã có hàng tại VN"}
        sub={isNew ? "Banner sẽ tự động bật/tắt theo thời gian hiệu lực." : "Đang chạy · Hiệu lực 01/04 → 30/06/2026"}
        badge={!isNew && <Pill status="active" />}
        goBack={goBack}
        actions={
          <>
            <button className="btn btn--ghost">Lưu nháp</button>
            <button className="btn btn--primary" onClick={() => { showToast("Đã lưu banner"); goBack(); }}>{isNew ? "Tạo banner" : "Lưu thay đổi"}</button>
          </>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        <div>
          <FormSection title="Hình ảnh & nội dung">
            <LangTabs lang={lang} setLang={setLang} />
            <div className="field">
              <label>Ảnh banner (1920×800)</label>
              <div style={{ aspectRatio: "1920/800", background: "linear-gradient(135deg, #E11D2C, #931017)", borderRadius: 8, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 20px, transparent 20px 40px)" }}></div>
                <button style={{ position: "absolute", top: 12, right: 12, padding: "6px 12px", background: "rgba(255,255,255,0.95)", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>📷 Đổi ảnh</button>
                <div style={{ position: "absolute", bottom: 24, left: 32, color: "#fff" }}>
                  <div style={{ fontSize: 10, opacity: 0.8, fontWeight: 700, letterSpacing: 0.1 }}>NEW PRODUCT LINE</div>
                  <div style={{ fontSize: 28, fontWeight: 800, marginTop: 8 }}>AGITAN® thế hệ mới</div>
                </div>
              </div>
            </div>
            <div className="field"><label>Tiêu đề chính</label><input className="input" defaultValue="AGITAN® thế hệ mới — đã có hàng tại VN" /></div>
            <div className="field"><label>Mô tả</label><textarea className="input" rows={2} defaultValue="Defoamer hiệu suất cao, không silicone, phù hợp cho mọi hệ sơn nước"></textarea></div>
            <div className="field-row">
              <div className="field"><label>Text nút CTA</label><input className="input" defaultValue="Khám phá sản phẩm" /></div>
              <div className="field"><label>Link đích</label><input className="input" defaultValue="/san-pham/agitan-120" /></div>
            </div>
          </FormSection>

          <FormSection title="Thời gian hiệu lực" desc="Banner sẽ tự động hiển thị/ẩn theo thời gian này.">
            <div className="field-row">
              <div className="field"><label>Bắt đầu <span className="req">*</span></label><input className="input" type="datetime-local" defaultValue="2026-04-01T00:00" /></div>
              <div className="field"><label>Kết thúc</label><input className="input" type="datetime-local" defaultValue="2026-06-30T23:59" /></div>
            </div>
            <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, marginTop: 8 }}>
              <input type="checkbox" /> Không có thời hạn (luôn hiển thị)
            </label>
          </FormSection>
        </div>

        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card__head"><h3>Vị trí & thứ tự</h3></div>
            <div className="card__body">
              <div className="field"><label>Vị trí trang</label><select className="input"><option>Hero homepage</option><option>Hero trang sản phẩm</option><option>Banner giữa trang chủ</option></select></div>
              <div className="field"><label>Thứ tự hiển thị</label><input className="input" type="number" defaultValue="1" /></div>
              <div className="field">
                <label>Bật/tắt</label>
                <Toggle on={true} onChange={() => {}} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card__head"><h3>Hiệu suất banner</h3></div>
            <div className="card__body" style={{ padding: 0 }}>
              {[
                { lbl: "Lượt hiển thị", val: "12,432" },
                { lbl: "Lượt click", val: "847" },
                { lbl: "CTR", val: "6.8%", up: true },
                { lbl: "Báo giá phát sinh", val: "23" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 16px", borderTop: i ? "1px solid var(--n-100)" : "none" }}>
                  <span style={{ fontSize: 12, color: "var(--n-600)" }}>{s.lbl}</span>
                  <b style={{ color: s.up ? "#16A34A" : "var(--n-900)" }}>{s.val}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function PageNewsDetail({ id, goBack }) {
  const [lang, setLang] = useState("vn");
  const isNew = id === "new";
  return (
    <>
      <DetailHeader
        breadcrumb="Tin tức"
        title={isNew ? "Viết bài mới" : "5 lưu ý chọn defoamer cho sơn nước hệ acrylic"}
        sub={isNew ? "Bài viết hỗ trợ rich text, ảnh, video, embed." : "Kiến thức KT · Tech Team · Đăng 25/04/2026 · 1,240 lượt xem"}
        badge={!isNew && <Pill status="published" />}
        goBack={goBack}
        actions={
          <>
            <button className="btn btn--secondary">👁 Xem trước</button>
            <button className="btn btn--ghost">Lưu nháp</button>
            <button className="btn btn--primary" onClick={() => { showToast("Đã xuất bản bài viết"); goBack(); }}>📰 Xuất bản</button>
          </>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        <div>
          <FormSection title="Nội dung bài viết">
            <LangTabs lang={lang} setLang={setLang} />
            <div className="field"><label>Tiêu đề <span className="req">*</span></label><input className="input" style={{ fontSize: 18, fontWeight: 600 }} defaultValue="5 lưu ý chọn defoamer cho sơn nước hệ acrylic" /></div>
            <div className="field"><label>Slug URL</label><input className="input" defaultValue="5-luu-y-chon-defoamer-cho-son-nuoc" /></div>
            <div className="field">
              <label>Ảnh đại diện (1200×630)</label>
              <div style={{ aspectRatio: "1200/630", background: "repeating-linear-gradient(45deg, #FFE4E6 0 8px, #fff 8px 16px)", border: "1px solid var(--n-200)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--n-500)", fontSize: 13 }}>
                📷 Chọn ảnh đại diện
              </div>
            </div>
            <div className="field"><label>Mô tả ngắn (excerpt)</label><textarea className="input" rows={2} defaultValue="Hướng dẫn nhanh cho R&D: 5 yếu tố quyết định hiệu quả của defoamer trong hệ sơn nước, kèm ví dụ thực tế."></textarea></div>

            <div className="field">
              <label>Nội dung bài viết</label>
              <div style={{ border: "1px solid var(--n-300)", borderRadius: 8, overflow: "hidden" }}>
                <div style={{ padding: 8, background: "#FAFAFA", borderBottom: "1px solid var(--n-200)", display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {["¶ Đoạn", "H2", "H3"].map(t => <button key={t} style={{ padding: "5px 10px", fontSize: 12, fontWeight: 600, color: "var(--n-700)", borderRadius: 4, background: "#fff", border: "1px solid var(--n-200)" }}>{t}</button>)}
                  <span style={{ width: 1, background: "var(--n-200)", margin: "0 4px" }}></span>
                  {["B","I","U","S"].map(t => <button key={t} style={{ padding: "5px 10px", fontSize: 12, fontWeight: 600, color: "var(--n-700)", borderRadius: 4 }}>{t}</button>)}
                  <span style={{ width: 1, background: "var(--n-200)", margin: "0 4px" }}></span>
                  {["• Bullet","1. Số","❝ Trích","</> Code"].map(t => <button key={t} style={{ padding: "5px 10px", fontSize: 12, fontWeight: 600, color: "var(--n-700)", borderRadius: 4 }}>{t}</button>)}
                  <span style={{ width: 1, background: "var(--n-200)", margin: "0 4px" }}></span>
                  {["🔗 Link","📷 Ảnh","🎬 Video","📊 Bảng","📎 File"].map(t => <button key={t} style={{ padding: "5px 10px", fontSize: 12, fontWeight: 600, color: "var(--n-700)", borderRadius: 4 }}>{t}</button>)}
                </div>
                <div style={{ padding: 20, minHeight: 320, fontSize: 14, lineHeight: 1.7, color: "var(--n-800)" }} contentEditable suppressContentEditableWarning>
                  <h2 style={{ marginTop: 0 }}>1. Hệ sơn của bạn là gì?</h2>
                  <p>Trước khi chọn defoamer, cần xác định hệ nhựa (acrylic, vinyl, alkyd...) và hàm lượng pigment. AGITAN® 120 phù hợp cho hệ acrylic PVC trung-cao.</p>
                  <h2>2. Bọt đại thể hay bọt vi mô?</h2>
                  <p>Bọt đại thể (macro) dễ xử lý hơn bọt vi mô (micro). Đối với bọt vi mô gây pinhole, cần defoamer có hoạt tính mạnh hơn.</p>
                  <p style={{ padding: 12, background: "#FFF8F8", borderLeft: "3px solid var(--brand-500)", borderRadius: 4 }}>
                    💡 <b>Mẹo từ chuyên gia:</b> Luôn test ở cả 2 mức liều — khuyến nghị và 1.5× để xác định "vùng an toàn".
                  </p>
                  <h2>3. Tương thích với các phụ gia khác</h2>
                  <p>Defoamer mạnh có thể gây co màng (cratering) khi kết hợp với một số wetting agent. Cần kiểm tra DOI...</p>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, color: "var(--n-500)" }}>
                <span>Đã lưu tự động lúc 14:32</span>
                <span>1,247 từ · ~5 phút đọc</span>
              </div>
            </div>
          </FormSection>

          <FormSection title="SEO & Open Graph">
            <div className="field"><label>Meta title</label><input className="input" defaultValue="5 lưu ý chọn defoamer cho sơn nước hệ acrylic | Stromann VN" /></div>
            <div className="field"><label>Meta description</label><textarea className="input" rows={2}></textarea></div>
            <div style={{ padding: 12, background: "#FAFAFA", borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: "var(--n-500)", marginBottom: 8 }}>👁 Xem trước Google</div>
              <div style={{ fontSize: 18, color: "#1a0dab", fontWeight: 400 }}>5 lưu ý chọn defoamer cho sơn nước hệ acrylic</div>
              <div style={{ fontSize: 12, color: "#006621" }}>stromann.vn › tin-tuc › 5-luu-y-chon-defoamer</div>
              <div style={{ fontSize: 13, color: "#4d5156", marginTop: 4 }}>Hướng dẫn nhanh cho R&D: 5 yếu tố quyết định hiệu quả của defoamer trong hệ sơn nước...</div>
            </div>
          </FormSection>
        </div>

        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card__head"><h3>Phân loại</h3></div>
            <div className="card__body">
              <div className="field">
                <label>Chuyên mục <span className="req">*</span></label>
                <select className="input"><option>Kiến thức kỹ thuật</option><option>Ứng dụng thực tế</option><option>Sản phẩm</option><option>Tin công ty</option></select>
              </div>
              <div className="field">
                <label>Tags</label>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", padding: 4, border: "1px solid var(--n-300)", borderRadius: 8 }}>
                  {["#defoamer", "#sơn-nước", "#acrylic"].map(t => (
                    <span key={t} style={{ padding: "2px 8px", background: "var(--n-100)", borderRadius: 4, fontSize: 12 }}>{t} <span style={{ color: "var(--n-500)", cursor: "pointer" }}>×</span></span>
                  ))}
                  <input style={{ flex: 1, minWidth: 80, border: "none", outline: "none", fontSize: 12 }} placeholder="Thêm tag..." />
                </div>
              </div>
              <div className="field">
                <label>Sản phẩm liên kết</label>
                <select className="input" multiple style={{ height: 80 }}>
                  <option>AGITAN® 120</option><option>AGITAN® 282</option><option>EDAPLAN® 470</option>
                </select>
                <div style={{ fontSize: 11, color: "var(--n-500)" }}>Hiển thị ở cuối bài viết</div>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card__head"><h3>Xuất bản</h3></div>
            <div className="card__body">
              <div className="field"><label>Trạng thái</label>
                <select className="input"><option>Đã xuất bản</option><option>Nháp</option><option>Lên lịch</option></select>
              </div>
              <div className="field"><label>Ngày đăng</label><input className="input" type="datetime-local" defaultValue="2026-04-25T09:00" /></div>
              <div className="field"><label>Tác giả</label>
                <select className="input"><option>Tech Team</option><option>Marketing</option><option>Văn A</option></select>
              </div>
              <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13 }}><input type="checkbox" defaultChecked /> Cho phép comment</label>
              <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, marginTop: 6 }}><input type="checkbox" defaultChecked /> Bài nổi bật</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function PageJobDetail({ id, goBack }) {
  const isNew = id === "new";
  const [tab, setTab] = useState("info");

  return (
    <>
      <DetailHeader
        breadcrumb="Tuyển dụng"
        title={isNew ? "Thêm vị trí tuyển dụng" : "Lab Engineer"}
        sub={isNew ? "" : "Kỹ thuật · TP.HCM · Full-time · Hạn 31/05/2026"}
        badge={!isNew && <Pill status="published" />}
        goBack={goBack}
        actions={
          <>
            <button className="btn btn--ghost">Lưu nháp</button>
            <button className="btn btn--primary" onClick={() => { showToast("Đã lưu vị trí"); goBack(); }}>{isNew ? "Đăng tuyển" : "Lưu thay đổi"}</button>
          </>
        }
      />

      {!isNew && (
        <div className="tabs">
          <div className={`tab ${tab === "info" ? "active" : ""}`} onClick={() => setTab("info")}>Thông tin vị trí</div>
          <div className={`tab ${tab === "applicants" ? "active" : ""}`} onClick={() => setTab("applicants")}>Ứng viên (12)</div>
        </div>
      )}

      {tab === "info" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
          <div>
            <FormSection title="Thông tin chung">
              <div className="field-row">
                <div className="field"><label>Tên vị trí <span className="req">*</span></label><input className="input" defaultValue="Lab Engineer" /></div>
                <div className="field"><label>Slug URL</label><input className="input" defaultValue="lab-engineer" /></div>
              </div>
              <div className="field-row-3">
                <div className="field"><label>Phòng ban <span className="req">*</span></label>
                  <select className="input"><option>Kỹ thuật</option><option>Kinh doanh</option><option>Marketing</option><option>Kho vận</option><option>HR</option></select>
                </div>
                <div className="field"><label>Địa điểm</label>
                  <select className="input"><option>TP.HCM</option><option>Hà Nội</option><option>Remote</option></select>
                </div>
                <div className="field"><label>Hình thức</label>
                  <select className="input"><option>Full-time</option><option>Part-time</option><option>Intern</option></select>
                </div>
              </div>
              <div className="field-row">
                <div className="field"><label>Mức lương</label><input className="input" defaultValue="15-25 triệu (thỏa thuận)" /></div>
                <div className="field"><label>Hạn nộp</label><input className="input" type="date" defaultValue="2026-05-31" /></div>
              </div>
            </FormSection>

            <FormSection title="Mô tả công việc">
              <div className="field"><label>Mô tả ngắn</label><textarea className="input" rows={2} defaultValue="Tham gia phát triển, test và đánh giá các sản phẩm phụ gia trong lab; hỗ trợ kỹ thuật cho khách hàng B2B."></textarea></div>
              <div className="field">
                <label>Trách nhiệm chính</label>
                <textarea className="input" rows={6} defaultValue={"• Pha chế và test mẫu sản phẩm sơn/mực in/nhựa với phụ gia MÜNZING\n• Đo các chỉ tiêu: độ nhớt, độ phủ, độ bóng, đo bọt khí\n• Viết báo cáo test cho khách hàng và nội bộ\n• Hỗ trợ trực tiếp khách hàng tại nhà máy khi cần\n• Cập nhật tài liệu kỹ thuật, COA, MSDS"}></textarea>
              </div>
              <div className="field">
                <label>Yêu cầu</label>
                <textarea className="input" rows={5} defaultValue={"• Tốt nghiệp ĐH chuyên ngành Hóa, Polyme, Vật liệu\n• 1-3 năm kinh nghiệm trong lab sơn/mực in/nhựa\n• Tiếng Anh đọc hiểu tài liệu kỹ thuật\n• Thái độ học hỏi, làm việc nhóm tốt"}></textarea>
              </div>
              <div className="field">
                <label>Quyền lợi</label>
                <textarea className="input" rows={4} defaultValue={"• Lương + thưởng cạnh tranh, review 6 tháng/lần\n• BHXH, BHYT, BHTN đầy đủ\n• Đào tạo chuyên sâu tại MÜNZING (Đức) cho vị trí trọng điểm\n• Du lịch nước ngoài 1 năm/lần"}></textarea>
              </div>
            </FormSection>
          </div>

          <div>
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="card__head"><h3>Hiển thị</h3></div>
              <div className="card__body">
                <div className="field"><label>Trạng thái</label>
                  <select className="input"><option>Đang tuyển</option><option>Tạm dừng</option><option>Đã đóng</option><option>Nháp</option></select>
                </div>
                <div className="field">
                  <label>Đánh dấu</label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: 13, display: "flex", gap: 6 }}><input type="checkbox" /> 🔥 HOT — Vị trí ưu tiên</label>
                    <label style={{ fontSize: 13, display: "flex", gap: 6 }}><input type="checkbox" /> Hiển thị ở trang chủ</label>
                    <label style={{ fontSize: 13, display: "flex", gap: 6 }}><input type="checkbox" defaultChecked /> Cho phép nộp CV online</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card__head"><h3>Người tiếp nhận CV</h3></div>
              <div className="card__body">
                <div className="field"><label>HR phụ trách</label>
                  <select className="input"><option>HR — Lê Thị Mai</option></select>
                </div>
                <div className="field"><label>CC tới</label>
                  <input className="input" defaultValue="hr@stromann.vn, lab-manager@stromann.vn" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "applicants" && (
        <div className="card">
          <table className="tbl">
            <thead><tr><th>Ứng viên</th><th>Email / SĐT</th><th>Kinh nghiệm</th><th>CV</th><th>Trạng thái</th><th>Ngày nộp</th><th></th></tr></thead>
            <tbody>
              {[
                { name: "Nguyễn Thanh Hà", email: "hanguyen@gmail.com", phone: "0909 111 222", exp: "3 năm — MÜNZING TW", status: "new", date: "29/04/2026" },
                { name: "Trần Minh Tú", email: "tutm@gmail.com", phone: "0911 333 444", exp: "2 năm — Sơn 4 Oranges", status: "in-progress", date: "27/04/2026" },
                { name: "Lê Hoàng An", email: "an.lh@yahoo.com", phone: "0933 555 666", exp: "5 năm — AkzoNobel", status: "in-progress", date: "25/04/2026" },
                { name: "Phạm Thị Nga", email: "nga.pt@gmail.com", phone: "0977 777 888", exp: "Fresh", status: "done", date: "20/04/2026" },
              ].map((a, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#FFE4E6", color: "var(--brand-700)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12 }}>{a.name.split(" ").pop()[0]}</div>
                      <div className="tbl__name">{a.name}</div>
                    </div>
                  </td>
                  <td><div style={{ fontSize: 12 }}>{a.email}</div><div style={{ fontSize: 11, color: "var(--n-500)" }}>{a.phone}</div></td>
                  <td><span style={{ fontSize: 12 }}>{a.exp}</span></td>
                  <td><a style={{ color: "var(--brand-500)", fontSize: 12, fontWeight: 600 }}>📄 CV.pdf</a></td>
                  <td><Pill status={a.status} /></td>
                  <td><span style={{ fontSize: 12 }}>{a.date}</span></td>
                  <td><ActionRow /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function PageTechDetail({ id, goBack }) {
  const isNew = id === "new";
  const [solutions, setSolutions] = useState([
    { problem: "Pigment kết tụ", solutions: ["Sử dụng dispersant phù hợp", "Điều chỉnh tốc độ khuấy", "Kiểm soát pH hệ"], products: ["EDAPLAN® 470", "DISPERBYK-190"] },
    { problem: "Độ phủ kém", solutions: ["Tăng hàm lượng dispersant", "Tối ưu wetting agent"], products: ["EDAPLAN® 470", "METOLAT® 358"] },
  ]);

  return (
    <>
      <DetailHeader
        breadcrumb="Vấn đề kỹ thuật"
        title={isNew ? "Thêm vấn đề mới" : "Phân tán (Dispersion)"}
        sub="Vấn đề kỹ thuật và các cặp giải pháp ↔ sản phẩm đề xuất"
        goBack={goBack}
        actions={
          <>
            <button className="btn btn--ghost">Lưu nháp</button>
            <button className="btn btn--primary" onClick={() => { showToast("Đã lưu vấn đề KT"); goBack(); }}>Lưu</button>
          </>
        }
      />

      <FormSection title="Thông tin vấn đề chính">
        <div className="field-row">
          <div className="field"><label>Tên vấn đề <span className="req">*</span></label><input className="input" defaultValue="Phân tán (Dispersion)" /></div>
          <div className="field"><label>Icon</label>
            <div style={{ display: "flex", gap: 6 }}>
              {["⚗️","💧","🌀","✨","🎨"].map(e => (
                <button key={e} style={{ width: 36, height: 36, fontSize: 20, border: "1px solid var(--n-300)", borderRadius: 8, ...(e === "⚗️" ? { background: "#FFE4E6", borderColor: "var(--brand-500)" } : { background: "#fff" }) }}>{e}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="field"><label>Mô tả tổng quan</label><textarea className="input" rows={2} defaultValue="Vấn đề liên quan đến độ phân tán của pigment trong hệ sơn, ảnh hưởng đến độ lên màu và tính ổn định công thức."></textarea></div>
      </FormSection>

      <FormSection
        title="Vấn đề con ↔ Giải pháp ↔ Sản phẩm"
        desc="Mỗi cặp 3 yếu tố hiển thị thành 1 block giải pháp trên trang Hỗ trợ kỹ thuật."
      >
        {solutions.map((s, i) => (
          <div key={i} style={{ border: "1px solid var(--n-200)", borderRadius: 12, padding: 16, marginBottom: 12, position: "relative" }}>
            <div style={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 4 }}>
              <button className="tbl__act">↑</button>
              <button className="tbl__act">↓</button>
              <button className="tbl__act danger" onClick={() => setSolutions(solutions.filter((_, x) => x !== i))}>🗑</button>
            </div>
            <div style={{ display: "inline-block", padding: "2px 8px", background: "var(--brand-500)", color: "#fff", borderRadius: 4, fontSize: 11, fontWeight: 700, marginBottom: 8 }}>VẤN ĐỀ #{i + 1}</div>
            <div className="field"><label>Vấn đề con</label><input className="input" defaultValue={s.problem} /></div>
            <div className="field">
              <label>Giải pháp đề xuất (mỗi dòng = 1 giải pháp)</label>
              <textarea className="input" rows={3} defaultValue={s.solutions.join("\n")}></textarea>
            </div>
            <div className="field">
              <label>Sản phẩm đề xuất</label>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {s.products.map(p => (
                  <span key={p} style={{ padding: "4px 10px", background: "#FFE4E6", color: "var(--brand-700)", borderRadius: 999, fontSize: 12, fontWeight: 600 }}>
                    {p} <span style={{ marginLeft: 4, cursor: "pointer" }}>×</span>
                  </span>
                ))}
                <button className="chip" style={{ fontSize: 12 }}>+ Thêm sản phẩm</button>
              </div>
            </div>
          </div>
        ))}
        <button className="btn btn--secondary" style={{ width: "100%", justifyContent: "center", border: "1px dashed var(--n-300)" }}
          onClick={() => setSolutions([...solutions, { problem: "Vấn đề mới", solutions: [""], products: [] }])}>
          + Thêm vấn đề con
        </button>
      </FormSection>
    </>
  );
}

function PageIndustryDetail({ id, goBack }) {
  const [lang, setLang] = useState("vn");
  const isNew = id === "new";
  const [linkedProducts, setLinkedProducts] = useState(["AGITAN® 120", "EDAPLAN® 470", "METOLAT® 358"]);

  return (
    <>
      <DetailHeader
        breadcrumb="Ngành ứng dụng"
        title={isNew ? "Thêm ngành ứng dụng mới" : "Sơn (Coatings)"}
        sub={isNew ? "Thêm ngành mới — có thể bật/tắt hiển thị bất cứ lúc nào." : "28 sản phẩm · 7 bài viết · Mặc định"}
        badge={!isNew && <Pill status="active" />}
        goBack={goBack}
        actions={
          <>
            {!isNew && <button className="btn btn--secondary">👁 Xem trên website</button>}
            <button className="btn btn--ghost">Lưu nháp</button>
            <button className="btn btn--primary" onClick={() => { showToast("Đã lưu ngành ứng dụng"); goBack(); }}>{isNew ? "Tạo ngành" : "Lưu thay đổi"}</button>
          </>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        <div>
          <FormSection title="Thông tin chung">
            <LangTabs lang={lang} setLang={setLang} />
            <div className="field-row">
              <div className="field"><label>Tên ngành <span className="req">*</span></label>
                <input className="input" defaultValue={lang === "vn" ? "Sơn (Coatings)" : lang === "en" ? "Coatings" : "涂料"} />
              </div>
              <div className="field"><label>Slug URL</label>
                <input className="input" defaultValue="son-coatings" />
                <div style={{ fontSize: 11, color: "var(--n-500)" }}>stromann.vn/nganh-ung-dung/<b>son-coatings</b></div>
              </div>
            </div>
            <div className="field-row">
              <div className="field"><label>Mã viết tắt</label><input className="input" defaultValue="S" maxLength={2} style={{ width: 80 }} /></div>
              <div className="field"><label>Icon</label>
                <div style={{ display: "flex", gap: 6 }}>
                  {["🎨","🖌","🏭","💧","🧪","✨"].map(e => (
                    <button key={e} style={{ width: 36, height: 36, fontSize: 18, border: "1px solid var(--n-300)", borderRadius: 8, ...(e === "🎨" ? { background: "#FFE4E6", borderColor: "var(--brand-500)" } : { background: "#fff" }) }}>{e}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="field"><label>Mô tả ngắn (hiển thị trên card homepage)</label>
              <textarea className="input" rows={2} defaultValue="Cải thiện độ phân tán, độ trải và độ bền màng sơn"></textarea>
            </div>
            <div className="field"><label>Mô tả tổng quan (trang chi tiết ngành)</label>
              <textarea className="input" rows={5} defaultValue="Stromann cung cấp đầy đủ các phụ gia chuyên dụng cho ngành sơn — từ sơn nước nội ngoại thất, sơn công nghiệp đến sơn gỗ — giúp các nhà sản xuất tối ưu công thức, cải thiện hiệu suất và giảm chi phí sản xuất..."></textarea>
            </div>
          </FormSection>

          <FormSection title="Ảnh đại diện & banner">
            <div className="field">
              <label>Ảnh thumbnail (card homepage, 600×400)</label>
              <div style={{ aspectRatio: "3/2", background: "linear-gradient(135deg, #FFE4E6, #FECACA)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--brand-700)", fontWeight: 700, position: "relative" }}>
                <span>🎨 Sơn</span>
                <button style={{ position: "absolute", top: 8, right: 8, padding: "4px 10px", background: "#fff", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>📷 Đổi ảnh</button>
              </div>
            </div>
            <div className="field">
              <label>Banner trang chi tiết (1920×600)</label>
              <div style={{ aspectRatio: "1920/600", background: "repeating-linear-gradient(45deg, var(--n-100) 0 8px, #fff 8px 16px)", border: "1px dashed var(--n-300)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--n-500)", fontSize: 13 }}>
                📷 Chọn banner ngành
              </div>
            </div>
          </FormSection>

          <FormSection title="Sản phẩm liên kết" desc="Sản phẩm hiển thị khi khách click vào ngành này.">
            <div style={{ marginBottom: 12 }}>
              {linkedProducts.map(p => (
                <div key={p} style={{ display: "flex", alignItems: "center", gap: 12, padding: 10, border: "1px solid var(--n-200)", borderRadius: 8, marginBottom: 6 }}>
                  <div className="thumb thumb--brand" style={{ width: 40, height: 40 }}></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{p}</div>
                    <div style={{ fontSize: 11, color: "var(--n-500)" }}>MÜNZING · Defoamer</div>
                  </div>
                  <button className="tbl__act">↑</button>
                  <button className="tbl__act">↓</button>
                  <button className="tbl__act danger" onClick={() => setLinkedProducts(linkedProducts.filter(x => x !== p))}>🗑</button>
                </div>
              ))}
            </div>
            <button className="btn btn--secondary" style={{ width: "100%", justifyContent: "center", border: "1px dashed var(--n-300)" }}>
              + Thêm sản phẩm vào ngành
            </button>
            <div style={{ marginTop: 12, padding: 12, background: "#F0F9FF", border: "1px solid #BAE6FD", borderRadius: 8, fontSize: 12, color: "var(--n-700)" }}>
              💡 Sản phẩm cũng có thể tự động liên kết bằng cách gắn ngành này khi sửa từng sản phẩm.
            </div>
          </FormSection>

          <FormSection title="Bài viết liên quan">
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                "5 lưu ý chọn defoamer cho sơn nước hệ acrylic",
                "Case study: tối ưu công thức sơn xây dựng",
                "Wetting agent: cách chọn đúng cho từng loại pigment",
              ].map(t => (
                <label key={t} style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, border: "1px solid var(--n-200)", borderRadius: 8, cursor: "pointer" }}>
                  <input type="checkbox" defaultChecked />
                  <div style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{t}</div>
                  <span className="pill pill--neutral">Kiến thức KT</span>
                </label>
              ))}
            </div>
          </FormSection>

          <FormSection title="SEO">
            <div className="field"><label>Meta title</label><input className="input" defaultValue="Phụ gia ngành Sơn (Coatings) — MÜNZING | Stromann VN" /></div>
            <div className="field"><label>Meta description</label><textarea className="input" rows={2} defaultValue="Đầy đủ defoamer, dispersant, wetting agent, rheology modifier MÜNZING cho sơn nước, sơn dầu, sơn công nghiệp tại Việt Nam."></textarea></div>
          </FormSection>
        </div>

        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card__head"><h3>Hiển thị</h3></div>
            <div className="card__body">
              <div className="field">
                <label>Trạng thái</label>
                <select className="input" defaultValue="active">
                  <option value="active">Đang hiển thị</option>
                  <option value="hidden">Ẩn (chỉ admin thấy)</option>
                  <option value="draft">Nháp</option>
                </select>
              </div>
              <div className="field">
                <label>Thứ tự</label>
                <input className="input" type="number" defaultValue="1" />
                <div style={{ fontSize: 11, color: "var(--n-500)" }}>Số nhỏ hơn = hiển thị trước</div>
              </div>
              <div className="field">
                <label>Đánh dấu</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 13, display: "flex", gap: 6, alignItems: "center" }}>
                    <input type="checkbox" defaultChecked /> Ngành mặc định (1 trong 3 ngành chính)
                  </label>
                  <label style={{ fontSize: 13, display: "flex", gap: 6, alignItems: "center" }}>
                    <input type="checkbox" defaultChecked /> Hiển thị trên homepage
                  </label>
                  <label style={{ fontSize: 13, display: "flex", gap: 6, alignItems: "center" }}>
                    <input type="checkbox" defaultChecked /> Hiển thị trong mega menu
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card__head"><h3>Màu thương hiệu</h3></div>
            <div className="card__body">
              <div className="field">
                <label>Màu chủ đạo</label>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["#E11D2C","#1E40AF","#16A34A","#A855F7","#F59E0B","#0EA5E9"].map(c => (
                    <button key={c} style={{ width: 32, height: 32, borderRadius: 6, background: c, border: c === "#E11D2C" ? "3px solid var(--n-900)" : "2px solid #fff", outline: "1px solid var(--n-200)" }}></button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {!isNew && (
            <div className="card">
              <div className="card__head"><h3>Thống kê</h3></div>
              <div className="card__body" style={{ padding: 0 }}>
                {[
                  { lbl: "Sản phẩm", val: "28" },
                  { lbl: "Bài viết", val: "7" },
                  { lbl: "Lượt xem 30 ngày", val: "2,431" },
                  { lbl: "Báo giá phát sinh", val: "12" },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 16px", borderTop: i ? "1px solid var(--n-100)" : "none" }}>
                    <span style={{ fontSize: 12, color: "var(--n-600)" }}>{s.lbl}</span>
                    <b>{s.val}</b>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isNew && (
            <button className="btn btn--danger" style={{ width: "100%", marginTop: 16, justifyContent: "center", border: "1px solid #FCA5A5", background: "#FEF2F2" }}>
              🗑 Xóa ngành này
            </button>
          )}
        </div>
      </div>
    </>
  );
}

// ============================================================================
// NOTIFICATION DRAWER
// ============================================================================

function NotifDrawer({ open, onClose, goTo }) {
  const [filter, setFilter] = useState("all");
  const filtered = NOTIFICATIONS.filter(n => filter === "all" || (filter === "unread" && n.unread));
  const handleClick = (n) => {
    if (n.target) { goTo(n.target.page, n.target.id); onClose(); }
  };
  return (
    <>
      <div className={`drawer__overlay ${open ? "open" : ""}`} onClick={onClose}></div>
      <div className={`drawer ${open ? "open" : ""}`}>
        <div className="drawer__head">
          <h3>Thông báo</h3>
          <button className="btn btn--ghost btn--sm" onClick={onClose}>✕</button>
        </div>
        <div className="drawer__filter">
          <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>Tất cả ({NOTIFICATIONS.length})</button>
          <button className={filter === "unread" ? "active" : ""} onClick={() => setFilter("unread")}>Chưa đọc ({NOTIFICATIONS.filter(n => n.unread).length})</button>
          <span style={{ flex: 1 }}></span>
          <button onClick={() => showToast("Đã đánh dấu đã đọc")}>✓ Tất cả</button>
        </div>
        <div className="drawer__list">
          {filtered.map(n => (
            <div key={n.id} className={`notif ${n.unread ? "unread" : ""}`} onClick={() => handleClick(n)} style={{ cursor: "pointer" }}>
              <div className={`notif__icon ${n.type}`}>{n.icon}</div>
              <div className="notif__body">
                <div className="notif__title">{n.title}</div>
                <div className="notif__sub">{n.sub}</div>
                <div className="notif__time">{n.time}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", color: "var(--n-400)", fontSize: 16 }}>›</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ============================================================================
// APP
// ============================================================================

export default function AdminApp() {
  const [route, setRoute] = useState({ page: "dashboard" });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const active = route.page;
  const setActive = (page) => setRoute({ page });
  const goTo = (page, id) => setRoute({ page, id });
  const goBack = () => setRoute({ page: route.page });

  useEffect(() => {
    const t = setTimeout(() => showToast("🔔 Yêu cầu báo giá mới — Cty Sơn Nippon VN"), 2500);
    return () => clearTimeout(t);
  }, []);

  const renderPage = () => {
    if (route.id) {
      switch (route.page) {
        case "products": return <PageProductDetail id={route.id} goBack={goBack} />;
        case "submissions": return <PageSubmissionDetail id={route.id} goBack={goBack} />;
        case "banners": return <PageBannerDetail id={route.id} goBack={goBack} />;
        case "news": return <PageNewsDetail id={route.id} goBack={goBack} />;
        case "recruitment": return <PageJobDetail id={route.id} goBack={goBack} />;
        case "tech": return <PageTechDetail id={route.id} goBack={goBack} />;
        case "industries": return <PageIndustryDetail id={route.id} goBack={goBack} />;
      }
    }
    switch (active) {
      case "dashboard": return <PageDashboard openDrawer={() => setDrawerOpen(true)} goTo={goTo} />;
      case "notifications": return <PageNotifications goTo={goTo} />;
      case "submissions": return <PageSubmissions goTo={goTo} />;
      case "products": return <PageProductsList goTo={goTo} />;
      case "banners": return <PageBanners goTo={goTo} />;
      case "industries": return <PageIndustriesList goTo={goTo} />;
      case "tech": return <PageTechList goTo={goTo} />;
      case "news": return <PageNewsList goTo={goTo} />;
      case "recruitment": return <PageRecruitmentList goTo={goTo} />;
      case "users": return <PageGeneric title="Người dùng & quyền" breadcrumb="Hệ thống" desc="Phân quyền theo nhóm: Super Admin · Sales · Kỹ thuật · Content · HR." />;
      case "languages": return <PageGeneric title="Đa ngôn ngữ" breadcrumb="Hệ thống" desc="Quản lý chuỗi VN / EN / CN cho mọi nội dung động." />;
      case "seo": return <PageGeneric title="SEO" breadcrumb="Hệ thống" desc="Meta title / description / OG image cho từng trang, sản phẩm, bài viết." />;
      case "logs": return <PageGeneric title="Log hoạt động" breadcrumb="Hệ thống" desc="Toàn bộ thao tác admin được ghi lại để kiểm tra." />;
      case "settings": return <PageGeneric title="Cấu hình" breadcrumb="Hệ thống" desc="Hotline · Email · Bản đồ · Mạng xã hội · CAPTCHA · SMTP." />;
      default: return <PageDashboard openDrawer={() => setDrawerOpen(true)} goTo={goTo} />;
    }
  };

  return (
    <div className="app">
      <Sidebar active={active} setActive={setActive} />
      <div className="main">
        <TopBar openDrawer={() => setDrawerOpen(true)} />
        <div className="content">
          {renderPage()}
        </div>
      </div>
      <NotifDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} goTo={goTo} />
    </div>
  );
}
