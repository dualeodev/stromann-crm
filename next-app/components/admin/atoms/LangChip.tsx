import type { LangFlags } from "@/lib/admin/types";

export function LangChip({ lang }: { lang: LangFlags }) {
  return (
    <span className="lang">
      <span className={lang.vn ? "has" : ""}>VN</span>
      <span className={lang.en ? "has" : ""}>EN</span>
      <span className={lang.cn ? "has" : ""}>CN</span>
    </span>
  );
}
