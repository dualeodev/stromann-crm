import type { Metadata } from "next";
import Link from "next/link";
import { Tag, IndustryImage } from "@/components/ui";
import Breadcrumb from "@/components/Breadcrumb";
import {
  listPublishedNews,
  newsImageUrl,
  NEWS_CATEGORIES,
  NEWS_CATEGORY_LABEL,
} from "@/lib/admin/news";
import type { NewsCategory } from "@/lib/admin/types";

export const metadata: Metadata = { title: "Tin tức — Stromann Việt Nam" };

const CHIPS: Array<{ label: string; cat: NewsCategory | null }> = [
  { label: "Tất cả",              cat: null },
  { label: "Kiến thức kỹ thuật",  cat: "tech_knowledge" },
  { label: "Ứng dụng thực tế",    cat: "real_application" },
  { label: "Sản phẩm",            cat: "product" },
  { label: "Tin công ty",         cat: "company" },
];

function fmtDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams?: { cat?: string };
}) {
  const activeCat = (NEWS_CATEGORIES as readonly string[]).includes(searchParams?.cat ?? "")
    ? (searchParams!.cat as NewsCategory)
    : null;

  const items = await listPublishedNews({ category: activeCat });

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
              const isActive = (c.cat ?? null) === activeCat;
              const href = c.cat ? `/news?cat=${c.cat}` : "/news";
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
        </div>
      </div>

      <div className="news-listing-grid">
        {items.map((n) => {
          const cover = newsImageUrl(n.cover_path);
          const label = NEWS_CATEGORY_LABEL[n.category];
          return (
            <Link key={n.id} className="news-card" href={`/news/${n.slug}`}>
              <div className="news-card__media">
                {cover ? (
                  <div
                    className="w-full h-full"
                    style={{ background: `url(${cover}) center/cover no-repeat` }}
                  />
                ) : (
                  <IndustryImage label={label.toLowerCase()} />
                )}
              </div>
              <div className="news-card__body">
                <Tag variant="brand-soft">{label}</Tag>
                <h3 className="news-card__title">{n.title}</h3>
                <div className="news-card__meta mt-auto">
                  <span>{fmtDate(n.published_at ?? n.created_at)}</span>
                  <span>•</span>
                  <span>{n.read_minutes} phút đọc</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {items.length === 0 && (
        <div className="px-20 pb-12 text-center text-n-500">
          Chưa có bài viết nào trong chuyên mục này.
        </div>
      )}
    </>
  );
}
