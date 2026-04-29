import type { Metadata } from "next";
import Link from "next/link";
import { Tag, IndustryImage } from "@/components/ui";
import Breadcrumb from "@/components/Breadcrumb";
import { NEWS } from "@/lib/data";

export const metadata: Metadata = { title: "Tin tức — Stromann Việt Nam" };

const CHIPS: Array<{ label: string; tag: string | null }> = [
  { label: "Tất cả",              tag: null },
  { label: "Kiến thức kỹ thuật",   tag: "KIẾN THỨC KỸ THUẬT" },
  { label: "Sản phẩm",             tag: "SẢN PHẨM" },
  { label: "Sự kiện",              tag: "SỰ KIỆN" },
  { label: "Công ty",              tag: "CÔNG TY" },
];

export default function NewsPage({
  searchParams,
}: {
  searchParams?: { chip?: string };
}) {
  const activeTag = searchParams?.chip ?? null;
  const filtered = activeTag
    ? NEWS.filter((n) => n.tag === activeTag)
    : NEWS;

  return (
    <>
      <Breadcrumb items={[{ label: "Tin tức" }]} />
      <div className="page-head">
        <Tag variant="brand-soft" className="self-start">NEWSROOM</Tag>
        <h1>Tin tức &amp; Kiến thức kỹ thuật</h1>
        <p>
          Cập nhật sản phẩm mới, kiến thức về phụ gia và case study thực tế từ ngành sơn, mực in và nhựa.
        </p>
      </div>

      <div className="px-20">
        <div className="toolbar">
          <div className="toolbar__chips">
            {CHIPS.map((c) => {
              const isActive = (c.tag ?? null) === activeTag;
              const href = c.tag ? `/news?chip=${encodeURIComponent(c.tag)}` : "/news";
              return (
                <Link
                  key={c.label}
                  href={href}
                  className={`chip-btn${isActive ? " active" : ""}`}
                >
                  {c.label}
                </Link>
              );
            })}
          </div>
          <input
            className="input"
            placeholder="Tìm kiếm bài viết..."
            style={{ width: 260 }}
          />
        </div>
      </div>

      <div className="news-listing-grid">
        {filtered.map((n) => (
          <Link key={n.id} className="news-card" href={`/news/${n.id}`}>
            <div className="news-card__media">
              <IndustryImage label={n.tag.toLowerCase()} />
            </div>
            <div className="news-card__body">
              <Tag variant="brand-soft">{n.tag}</Tag>
              <h3 className="news-card__title">{n.title}</h3>
              <div className="news-card__meta mt-auto">
                <span>{n.date}</span><span>•</span><span>{n.read}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="pagination pb-12">
        <button className="pg active">1</button>
        <button className="pg">2</button>
        <button className="pg">3</button>
        <button className="pg">→</button>
      </div>
    </>
  );
}
