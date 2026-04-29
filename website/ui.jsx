// ui.jsx — shared atoms

const Tag = ({ variant = "brand", children, ...rest }) => (
  <span className={`tag tag--${variant}`} {...rest}>{children}</span>
);

const Btn = ({ variant = "primary", size, as = "button", children, ...rest }) => {
  const Cmp = as;
  const cls = `btn btn--${variant}${size ? ` btn--${size}` : ""}`;
  return <Cmp className={cls} {...rest}>{children}</Cmp>;
};

const Placeholder = ({ label, variant = "default", style, children }) => {
  const cls = `placeholder${variant === "brand" ? " placeholder--brand" : ""}${variant === "dark" ? " placeholder--dark" : ""}`;
  return (
    <div className={cls} style={style}>
      {children}
      {label && <span className="placeholder__label">{label}</span>}
    </div>
  );
};

const LinkArrow = ({ children, onClick, href }) => (
  <a className="link-arrow" href={href} onClick={onClick}>{children} <span>→</span></a>
);

const SectHead = ({ eyebrow, title, sub, center, right, row, eyebrowVariant = "brand-soft" }) => (
  <div className={`sect-head${center ? " sect-head--center" : ""}${row ? " sect-head--row" : ""}`}>
    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: center ? "center" : "flex-start" }}>
      {eyebrow && <Tag variant={eyebrowVariant}>{eyebrow}</Tag>}
      <h2 className="sect-head__title" style={{ margin: 0 }}>{title}</h2>
      {sub && <p className="sect-head__sub" style={{ margin: 0 }}>{sub}</p>}
    </div>
    {right}
  </div>
);

// Product image — branded striped placeholder with bottle silhouette
const ProductImage = ({ name, group, dark }) => (
  <div className={dark ? "placeholder placeholder--dark" : "placeholder placeholder--brand"} style={{ width: "100%", height: "100%" }}>
    <svg viewBox="0 0 200 180" style={{ width: "60%", maxWidth: 160, opacity: dark ? 0.7 : 0.9 }} aria-hidden="true">
      <rect x="74" y="20" width="52" height="20" rx="3" fill="var(--n-700)" opacity="0.4" />
      <rect x="60" y="40" width="80" height="120" rx="6" fill="var(--n-300)" opacity="0.5" />
      <rect x="68" y="78" width="64" height="36" rx="3" fill="#fff" opacity="0.95" />
      <rect x="76" y="86" width="48" height="6" rx="1" fill="var(--accent)" />
      <rect x="76" y="98" width="36" height="4" rx="1" fill="var(--n-500)" />
      <rect x="76" y="106" width="24" height="3" rx="1" fill="var(--n-500)" />
    </svg>
    <span className="placeholder__label" style={{ position: "absolute", bottom: 12, left: 12 }}>{name || "Product"}</span>
  </div>
);

// Industry image placeholder
const IndustryImage = ({ label, dark }) => (
  <div className={dark ? "placeholder placeholder--dark" : "placeholder"} style={{ width: "100%", height: "100%" }}>
    <span className="placeholder__label">{label || "industry photo"}</span>
  </div>
);

const Checkbox = ({ checked, onChange, label, count }) => (
  <label className={`filter-row${checked ? " checked" : ""}`}>
    <span className="filter-row__label">
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </span>
    {count != null && <span className="filter-row__count">({count})</span>}
  </label>
);

window.SUI = { Tag, Btn, Placeholder, LinkArrow, SectHead, ProductImage, IndustryImage, Checkbox };
