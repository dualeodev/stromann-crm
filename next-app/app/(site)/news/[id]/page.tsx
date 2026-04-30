import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tag, Btn, IndustryImage } from "@/components/ui";
import Breadcrumb from "@/components/Breadcrumb";
import {
  getPublishedNewsBySlug,
  listPublishedNews,
  newsImageUrl,
  NEWS_CATEGORY_LABEL,
} from "@/lib/admin/news";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const n = await getPublishedNewsBySlug(params.id);
  if (!n) return {};
  return {
    title: `${n.meta_title ?? n.title} — Stromann Việt Nam`,
    description: n.meta_description ?? n.excerpt ?? n.title,
  };
}

function fmtDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const article = await getPublishedNewsBySlug(params.id);
  if (!article) notFound();

  const cover = newsImageUrl(article.cover_path);
  const categoryLabel = NEWS_CATEGORY_LABEL[article.category];
  const related = await listPublishedNews({
    category: article.category,
    excludeId: article.id,
    limit: 3,
  });

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Tin tức", href: "/news" },
          { label: article.title },
        ]}
      />

      <article className="max-w-[880px] mx-auto px-20 pt-12 pb-16">
        <header className="flex flex-col gap-4 items-start mb-8">
          <Tag variant="brand-soft">{categoryLabel}</Tag>
          <h1 className="text-[40px] font-bold leading-[1.2] tracking-[-0.015em] m-0 text-n-900">
            {article.title}
          </h1>
          <div className="flex gap-3 items-center text-[13px] text-n-500">
            <span>📅 {fmtDate(article.published_at ?? article.created_at)}</span>
            <span>•</span>
            <span>⏱ {article.read_minutes} phút đọc</span>
          </div>
        </header>

        <div className="h-[420px] rounded-r-16 overflow-hidden mb-8">
          {cover ? (
            <div
              className="w-full h-full"
              style={{ background: `url(${cover}) center/cover no-repeat` }}
            />
          ) : (
            <IndustryImage label={categoryLabel.toLowerCase()} />
          )}
        </div>

        {article.excerpt && (
          <p className="text-lg text-n-800 leading-[1.6] mt-0 mb-6">{article.excerpt}</p>
        )}

        <div
          className="news-prose text-base leading-[1.75] text-n-700"
          dangerouslySetInnerHTML={{ __html: article.body_html }}
        />

        <aside className="mt-12 p-8 bg-n-900 text-white rounded-r-16">
          <h3 className="m-0 text-[22px] font-bold">Cần tư vấn sâu hơn về chủ đề này?</h3>
          <p className="mt-2 text-n-400 text-sm leading-[1.6]">
            Đội kỹ sư Stromann sẵn sàng hỗ trợ bạn — phản hồi trong 4h làm việc.
          </p>
          <div className="flex gap-3 mt-5 flex-wrap">
            <Btn variant="primary" href="/technical">Tư vấn kỹ thuật →</Btn>
            <Btn variant="white" href="/quote">Yêu cầu báo giá</Btn>
          </div>
        </aside>
      </article>

      {related.length > 0 && (
        <section className="section section--alt">
          <h2 className="text-[28px] font-bold m-0 mb-8 tracking-[-0.01em]">Bài viết liên quan</h2>
          <div className="news-grid">
            {related.map((n) => {
              const c = newsImageUrl(n.cover_path);
              const label = NEWS_CATEGORY_LABEL[n.category];
              return (
                <Link key={n.id} href={`/news/${n.slug}`} className="news-card">
                  <div className="news-card__media">
                    {c ? (
                      <div
                        className="w-full h-full"
                        style={{ background: `url(${c}) center/cover no-repeat` }}
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
        </section>
      )}
    </>
  );
}
