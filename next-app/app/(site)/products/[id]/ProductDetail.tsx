"use client";

import Link from "next/link";
import { useState } from "react";
import { Tag, Btn, ProductImage } from "@/components/ui";
import Breadcrumb from "@/components/Breadcrumb";
import type { ProductRow, ProductWithRelations } from "@/lib/catalog";

function publicAssetUrl(bucket: string, path: string | null | undefined): string | null {
  if (!path) return null;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return `${base}/storage/v1/object/public/${bucket}/${path}`;
}

type TabKey = "desc" | "app" | "spec" | "doc";

const TABS: Array<[TabKey, string]> = [
  ["desc", "Mô tả & Lợi ích"],
  ["app",  "Ứng dụng"],
  ["spec", "Thông số kỹ thuật"],
  ["doc",  "Tài liệu kỹ thuật"],
];

export default function ProductDetail({
  product: p,
  related,
}: {
  product: ProductWithRelations;
  related: ProductRow[];
}) {
  const [thumb, setThumb] = useState(0);
  const [tab, setTab] = useState<TabKey>("desc");

  const primaryCategory = p.categories[0];

  const galleryAll: Array<string | null> = [
    publicAssetUrl("product-images", p.main_image_path),
    ...p.gallery_paths.map((path) => publicAssetUrl("product-images", path)),
  ].filter((u): u is string => Boolean(u));
  const activeImage = galleryAll[thumb] ?? null;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Sản phẩm", href: "/products" },
          ...(primaryCategory
            ? [{ label: primaryCategory.name, href: `/products?g=${primaryCategory.slug}` }]
            : []),
          { label: p.name },
        ]}
      />

      <section className="pd-hero">
        <div className="pd-gallery">
          <div className="pd-gallery__main">
            <ProductImage name={p.name} src={activeImage} />
          </div>
          {galleryAll.length > 1 && (
            <div className="pd-gallery__thumbs">
              {galleryAll.map((url, i) => (
                <div
                  key={url ?? i}
                  className={`pd-gallery__thumb${thumb === i ? " active" : ""}`}
                  onClick={() => setThumb(i)}
                >
                  <ProductImage name={`${p.name} ${i + 1}`} src={url} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="pd-info">
          <div className="pd-info__top">
            {primaryCategory && <Tag variant="brand">{primaryCategory.name}</Tag>}
            {p.is_enabled && <Tag variant="success">CÒN HÀNG</Tag>}
            {p.brand && <Tag variant="neutral">{p.brand}</Tag>}
          </div>
          <h1 className="pd-info__title m-0">{p.name}</h1>
          {p.short_description && (
            <p className="pd-info__sub m-0">{p.short_description}</p>
          )}
          <div className="pd-info__ctas">
            <Btn variant="primary" size="lg" href="/quote">Yêu cầu báo giá</Btn>
            <Btn variant="secondary" size="lg">Yêu cầu mẫu thử</Btn>
            {p.documents.find((d) => d.kind === "msds") && (
              <Btn variant="ghost" size="lg" href={p.documents.find((d) => d.kind === "msds")!.url}>
                ↓ Tải MSDS
              </Btn>
            )}
          </div>

          {(p.industries.length > 0 || p.technical_issues.length > 0) && (
            <dl className="pd-info__meta">
              {p.industries.length > 0 && (
                <div className="pd-info__meta-row">
                  <dt>Ngành ứng dụng</dt>
                  <dd className="flex gap-1.5 flex-wrap">
                    {p.industries.map((i) => (
                      <Link
                        key={i.id}
                        href={`/products?i=${i.slug}`}
                        className="text-[12px] px-2 py-0.5 bg-n-100 rounded hover:bg-n-200"
                      >
                        {i.name}
                      </Link>
                    ))}
                  </dd>
                </div>
              )}
              {p.technical_issues.length > 0 && (
                <div className="pd-info__meta-row">
                  <dt>Giải quyết</dt>
                  <dd className="flex gap-1.5 flex-wrap">
                    {p.technical_issues.map((t) => (
                      <Link
                        key={t.id}
                        href={`/products?p=${t.slug}`}
                        className="text-[12px] px-2 py-0.5 bg-n-100 rounded hover:bg-n-200"
                      >
                        {t.name}
                      </Link>
                    ))}
                  </dd>
                </div>
              )}
              {p.region && (
                <div className="pd-info__meta-row">
                  <dt>Khu vực</dt>
                  <dd>{p.region}</dd>
                </div>
              )}
            </dl>
          )}
        </div>
      </section>

      <section className="section section--alt pt-8">
        <div className="flex gap-1 border-b border-n-200 mb-8">
          {TABS.map(([k, l]) => (
            <button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              className={
                "px-6 py-3.5 text-sm font-bold -mb-px " +
                "border-b-[3px] " +
                (tab === k
                  ? "text-accent border-accent"
                  : "text-n-600 border-transparent")
              }
            >
              {l}
            </button>
          ))}
        </div>

        {tab === "desc" && (
          <div className="grid grid-cols-[1.4fr_1fr] gap-12">
            <div>
              <h3 className="text-[22px] mt-0">Mô tả sản phẩm</h3>
              <p className="text-n-700 leading-[1.7] whitespace-pre-line">
                {p.detailed_description ?? p.short_description ?? "—"}
              </p>
            </div>
            <aside className="bg-white p-6 rounded-r-12 border border-n-200 h-fit">
              <h4 className="mt-0">Cần hỗ trợ chọn sản phẩm?</h4>
              <p className="text-[13px] text-n-600">
                Đội kỹ sư của chúng tôi sẽ phản hồi trong 4h làm việc.
              </p>
              <Btn variant="primary" className="w-full" href="/contact">
                Liên hệ kỹ sư
              </Btn>
              <div className="note-bar mt-4">
                <span>📞</span>
                <span>Hotline: +84 28 36200703</span>
              </div>
            </aside>
          </div>
        )}

        {tab === "app" && (
          <div className="text-n-600">
            {p.industries.length === 0 ? (
              <p>Chưa có thông tin ứng dụng cụ thể cho sản phẩm này.</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {p.industries.map((i) => (
                  <Link
                    key={i.id}
                    href={`/products?i=${i.slug}`}
                    className="p-4 border border-n-200 rounded-r-8 hover:border-accent"
                  >
                    <div className="font-bold mb-1">{i.name}</div>
                    {i.short_description && (
                      <div className="text-xs text-n-600">{i.short_description}</div>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "spec" && (
          <div className="text-n-600">
            <p>Thông số kỹ thuật chi tiết sẽ được cập nhật.</p>
          </div>
        )}

        {tab === "doc" && (
          <div className="resource-grid">
            {p.documents.length === 0 ? (
              <p className="text-n-600">Chưa có tài liệu nào được đính kèm cho sản phẩm này.</p>
            ) : (
              p.documents.map((r) => (
                <a key={r.url} href={r.url} className="resource">
                  <div className="resource__icon">PDF</div>
                  <div className="resource__body">
                    <div className="resource__title">{r.label}</div>
                    <div className="resource__meta">{r.kind.toUpperCase()}</div>
                  </div>
                  <span className="resource__cta">Tải ↓</span>
                </a>
              ))
            )}
          </div>
        )}
      </section>

      {related.length > 0 && (
        <section className="section">
          <h3 className="text-2xl font-bold m-0 mb-6">Sản phẩm liên quan</h3>
          <div className="product-grid">
            {related.map((rp) => (
              <Link key={rp.id} href={`/products/${rp.slug}`} className="prod-card">
                <div className="prod-card__media">
                  <ProductImage name={rp.name} />
                </div>
                <div className="prod-card__body">
                  {rp.brand && <Tag variant="brand">{rp.brand}</Tag>}
                  <h3 className="prod-card__name">{rp.name}</h3>
                  <p className="prod-card__desc">{rp.short_description ?? ""}</p>
                  <div className="prod-card__foot">
                    <span className="prod-card__cta">Xem chi tiết →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
