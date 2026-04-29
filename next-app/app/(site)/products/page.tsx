import type { Metadata } from "next";
import Link from "next/link";
import { Tag, ProductImage } from "@/components/ui";
import Breadcrumb from "@/components/Breadcrumb";
import {
  countProductsPerCategory,
  countProductsPerIndustry,
  countProductsPerTechIssue,
  listCategories,
  listProducts,
  listProductBrands,
  listProductIndustries,
  listTechnicalIssues,
  publicAssetUrl,
  PRODUCT_BUCKET,
} from "@/lib/catalog";
import { SortSelect } from "./SortSelect";
import { FilterGroup } from "./FilterGroup";

export const metadata: Metadata = { title: "Sản phẩm — Stromann Việt Nam" };

const CHIPS = ["All", "Featured", "New"] as const;
const SORTS = ["Mới nhất", "A → Z", "Z → A", "Phổ biến"];

type RawParams = Record<string, string | string[] | undefined>;

function asString(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

function asList(v: string | string[] | undefined): string[] {
  return (asString(v) ?? "").split(",").filter(Boolean);
}

function buildHref(current: RawParams, overrides: Record<string, string | undefined>) {
  const params = new URLSearchParams();
  for (const [k, raw] of Object.entries(current)) {
    if (k in overrides) continue;
    const v = asString(raw);
    if (v) params.set(k, v);
  }
  for (const [k, v] of Object.entries(overrides)) {
    if (v !== undefined && v !== "") params.set(k, v);
  }
  const qs = params.toString();
  return qs ? `/products?${qs}` : "/products";
}

function toggledList(list: string[], value: string): string | undefined {
  const set = new Set(list);
  if (set.has(value)) set.delete(value);
  else set.add(value);
  return set.size > 0 ? Array.from(set).join(",") : undefined;
}

function sortKey(label: string): "newest" | "az" | "za" | "popular" {
  switch (label) {
    case "A → Z": return "az";
    case "Z → A": return "za";
    case "Phổ biến": return "popular";
    default: return "newest";
  }
}

interface FacetOption {
  v: string;
  l: string;
  c: number;
}
interface FacetGroup {
  id: "g" | "i" | "p" | "b";
  label: string;
  options: FacetOption[];
}

export default async function ProductsPage({ searchParams = {} }: { searchParams?: RawParams }) {
  const groupSel = asList(searchParams.g);
  const indSel   = asList(searchParams.i);
  const techSel  = asList(searchParams.p);
  const brandSel = asList(searchParams.b);
  const chip     = asString(searchParams.chip) ?? "All";
  const sort     = asString(searchParams.sort) ?? SORTS[0];
  const pageNum  = Math.max(1, Number(asString(searchParams.page) ?? 1));

  const [
    { rows: products, total },
    categories,
    industries,
    techs,
    brands,
    catCounts,
    indCounts,
    techCounts,
  ] = await Promise.all([
    listProducts({
      publishedOnly: true,
      categorySlugs: groupSel,
      industrySlugs: indSel,
      techSlugs: techSel,
      brands: brandSel,
      featuredOnly: chip === "Featured",
      sort: sortKey(sort),
      page: pageNum,
      pageSize: 24,
    }),
    listCategories({ enabledOnly: true }),
    listProductIndustries({ enabledOnly: true }),
    listTechnicalIssues({ enabledOnly: true }),
    listProductBrands({ publishedOnly: true }),
    countProductsPerCategory(),
    countProductsPerIndustry(),
    countProductsPerTechIssue(),
  ]);

  const facetGroups: FacetGroup[] = [
    {
      id: "g",
      label: "Danh mục",
      options: categories.map((c) => ({ v: c.slug, l: c.name, c: catCounts[c.id] ?? 0 })),
    },
    {
      id: "i",
      label: "Ngành ứng dụng",
      options: industries.map((i) => ({ v: i.slug, l: i.name, c: indCounts[i.id] ?? 0 })),
    },
    {
      id: "p",
      label: "Vấn đề kỹ thuật",
      options: techs.map((t) => ({ v: t.slug, l: t.name, c: techCounts[t.id] ?? 0 })),
    },
    {
      id: "b",
      label: "Thương hiệu",
      options: brands.map((b) => ({ v: b.brand, l: b.brand, c: b.count })),
    },
  ];

  return (
    <>
      <Breadcrumb items={[{ label: "Sản phẩm" }]} />
      <div className="page-head">
        <Tag variant="brand-soft" className="self-start">CATALOG</Tag>
        <h1>Tất cả sản phẩm</h1>
        <p>Phụ gia chuyên biệt cho sơn, mực in và nhựa — phân phối chính hãng từ MÜNZING (Đức)</p>
      </div>

      <div className="listing">
        <aside className="filter-panel">
          <div className="filter-panel__head">
            <h4>Lọc sản phẩm</h4>
            <Link className="filter-panel__clear" href="/products">Clear all</Link>
          </div>

          {facetGroups.map((g) => {
            const selected = asList(searchParams[g.id]);
            return (
              <FilterGroup key={g.id} label={g.label} defaultOpen>
                {g.options.length === 0 ? (
                  <div className="text-xs text-n-400 py-2">Chưa có dữ liệu</div>
                ) : (
                  g.options.map((o) => {
                    const checked = selected.includes(o.v);
                    const next = toggledList(selected, o.v);
                    const href = buildHref(searchParams, { [g.id]: next, page: undefined });
                    return (
                      <Link
                        key={o.v}
                        href={href}
                        className="flex items-start justify-between gap-2 py-1.5 cursor-pointer select-none group"
                      >
                        <span
                          className={
                            "flex items-start gap-2 text-[13px] leading-[1.35] min-w-0 " +
                            (checked
                              ? "text-n-900 font-semibold"
                              : "text-n-700 group-hover:text-n-900")
                          }
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            readOnly
                            tabIndex={-1}
                            aria-hidden="true"
                            className="h-4 w-4 mt-0.5 rounded-[3px] border border-n-300 accent-accent pointer-events-none shrink-0"
                          />
                          <span className="min-w-0 wrap-break-word">{o.l}</span>
                        </span>
                        <span className="text-xs text-n-400 mt-0.5 shrink-0">({o.c})</span>
                      </Link>
                    );
                  })
                )}
              </FilterGroup>
            );
          })}
        </aside>

        <div>
          <div className="toolbar">
            <div className="toolbar__left">
              <span className="toolbar__count">{total} sản phẩm</span>
              <div className="toolbar__chips">
                {CHIPS.map((c) => {
                  const isActive = c === chip;
                  const href = buildHref(searchParams, {
                    chip: c === "All" ? undefined : c,
                    page: undefined,
                  });
                  return (
                    <Link
                      key={c}
                      href={href}
                      className={`chip-btn${isActive ? " active" : ""}`}
                      style={isActive ? { color: "#fff" } : undefined}
                    >
                      {c}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <span className="text-xs text-n-600">Sắp xếp:</span>
              <SortSelect options={SORTS} current={sort} />
            </div>
          </div>

          <div className="product-grid product-grid--3">
            {products.length === 0 ? (
              <div className="col-span-full text-n-500 py-12 text-center">
                Không tìm thấy sản phẩm phù hợp với bộ lọc.
              </div>
            ) : (
              products.map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`} className="prod-card">
                  <div className="prod-card__media">
                    <ProductImage name={p.name} src={publicAssetUrl(PRODUCT_BUCKET, p.main_image_path)} />
                  </div>
                  <div className="prod-card__body">
                    {p.brand && <Tag variant="brand">{p.brand}</Tag>}
                    <h3 className="prod-card__name">{p.name}</h3>
                    <p className="prod-card__desc">{p.short_description ?? ""}</p>
                    <div className="prod-card__foot">
                      <span className="prod-card__cta">Xem chi tiết →</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          <Pagination
            total={total}
            pageSize={24}
            current={pageNum}
            hrefFor={(n) =>
              buildHref(searchParams, { page: n === 1 ? undefined : String(n) })
            }
          />
        </div>
      </div>
    </>
  );
}

function pageWindow(current: number, last: number): Array<number | "..."> {
  if (last <= 7) return Array.from({ length: last }, (_, i) => i + 1);
  const out: Array<number | "..."> = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(last - 1, current + 1);
  if (start > 2) out.push("...");
  for (let i = start; i <= end; i += 1) out.push(i);
  if (end < last - 1) out.push("...");
  out.push(last);
  return out;
}

function Pagination({
  total,
  pageSize,
  current,
  hrefFor,
}: {
  total: number;
  pageSize: number;
  current: number;
  hrefFor: (n: number) => string;
}) {
  const last = Math.max(1, Math.ceil(total / pageSize));
  if (last <= 1) return null;

  const from = (current - 1) * pageSize + 1;
  const to = Math.min(current * pageSize, total);
  const items = pageWindow(current, last);

  return (
    <div className="flex items-center justify-between mt-8">
      <div className="text-xs text-n-500">
        {from}–{to} / {total} sản phẩm
      </div>
      <div className="pagination">
        {current > 1 ? (
          <Link href={hrefFor(current - 1)} className="pg" aria-label="Trang trước">‹</Link>
        ) : (
          <span className="pg pointer-events-none opacity-40" aria-hidden="true">‹</span>
        )}

        {items.map((it, i) =>
          typeof it === "number" ? (
            <Link
              key={`p-${it}`}
              href={hrefFor(it)}
              className={`pg${it === current ? " active" : ""}`}
            >
              {it}
            </Link>
          ) : (
            <span key={`d-${i}`} className="pg pointer-events-none">…</span>
          ),
        )}

        {current < last ? (
          <Link href={hrefFor(current + 1)} className="pg" aria-label="Trang sau">›</Link>
        ) : (
          <span className="pg pointer-events-none opacity-40" aria-hidden="true">›</span>
        )}
      </div>
    </div>
  );
}
