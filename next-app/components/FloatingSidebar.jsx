function FsbIcon({ name }) {
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

export default function FloatingSidebar() {
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
