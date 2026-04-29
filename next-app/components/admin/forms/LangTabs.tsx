"use client";

export type Lang = "vn" | "en" | "cn";

const TABS: Array<{ id: Lang; label: string }> = [
  { id: "vn", label: "🇻🇳 Tiếng Việt" },
  { id: "en", label: "🇬🇧 English" },
  { id: "cn", label: "🇨🇳 中文" },
];

export function LangTabs({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  return (
    <div className="inline-flex gap-0 bg-n-100 p-[3px] rounded-lg mb-4">
      {TABS.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => setLang(t.id)}
          className={
            "px-3.5 py-1.5 text-xs font-semibold rounded-md " +
            (lang === t.id
              ? "bg-white text-n-900 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
              : "bg-transparent text-n-600")
          }
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
