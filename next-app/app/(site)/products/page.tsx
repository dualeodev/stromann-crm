import type { Metadata } from "next";
import Link from "next/link";
import { Tag, ProductImage } from "@/components/ui";
import Breadcrumb from "@/components/Breadcrumb";
import { PRODUCTS } from "@/lib/data";
import { SortSelect } from "./SortSelect";

export const metadata: Metadata = { title: "Sản phẩm — Stromann Việt Nam" };

interface FilterGroupDef {
  id: "g" | "i" | "p";
  label: string;
  options: Array<{ v: string; l: string; c: number }>;
}

const FILTER_GROUPS: FilterGroupDef[] = [
  {
    id: "g",
    label: "Nhóm sản phẩm",
    options: [
      { v: "DEFOAMER", l: "Defoamer", c: 22 },
      { v: "DISPERSANT", l: "Dispersant", c: 18 },
      { v: "WETTING AGENT", l: "Wetting Agent", c: 12 },
      { v: "RHEOLOGY", l: "Rheology Modifier", c: 9 },
      { v: "WAX", l: "Wax Additives", c: 7 },
      { v: "LEVELING", l: "Leveling", c: 5 },
    ],
  },
  {
    id: "i",
    label: "Ngành ứng dụng",
    options: [
      { v: "coatings", l: "Sơn nước", c: 28 },
      { v: "coatings-solvent", l: "Sơn dầu / sơn bóng", c: 18 },
      { v: "ink-water", l: "Mực in gốc nước", c: 14 },
      { v: "ink-solvent", l: "Mực in gốc dầu", c: 8 },
      { v: "plastic", l: "Nhựa / Masterbatch", c: 11 },
    ],
  },
  {
    id: "p",
    label: "Vấn đề kỹ thuật",
    options: [
      { v: "foam", l: "Bọt khí", c: 22 },
      { v: "viscosity", l: "Độ nhớt", c: 9 },
      { v: "surface", l: "Bề mặt", c: 12 },
      { v: "color", l: "Lên màu", c: 7 },
    ],
  },
];

const CHIPS = ["All", "Best", "New", "Featured"] as const;
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

export default function ProductsPage({ searchParams = {} }: { searchParams?: RawParams }) {
  const groupSel    = asList(searchParams.g);
  const chip        = asString(searchParams.chip) ?? "All";
  const sort        = asString(searchParams.sort) ?? SORTS[0];
  const pageNum     = Math.max(1, Number(asString(searchParams.page) ?? 1));

  const filtered = PRODUCTS.filter((p) => {
    if (groupSel.length && !groupSel.some((v) => p.group.includes(v))) return false;
    if (chip === "Featured" && !p.featured) return false;
    if (chip === "New" && !["agitan-120", "edaplan-470"].includes(p.id)) return false;
    return true;
  });

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

          {FILTER_GROUPS.map((g) => {
            const selected = asList(searchParams[g.id]);
            return (
              <details key={g.id} open className="filter-group">
                <summary className="filter-group__head list-none cursor-pointer select-none">
                  <h5>{g.label}</h5>
                  <span className="filter-group__caret">▼</span>
                </summary>
                <div className="filter-group__items">
                  {g.options.map((o) => {
                    const checked = selected.includes(o.v);
                    const next = toggledList(selected, o.v);
                    const href = buildHref(searchParams, { [g.id]: next, page: undefined });
                    return (
                      <Link
                        key={o.v}
                        href={href}
                        className="flex items-center justify-between py-1.5 cursor-pointer select-none group"
                      >
                        <span
                          className={
                            "flex items-center gap-2 text-[13px] " +
                            (checked
                              ? "text-n-900 font-semibold"
                              : "text-n-700 group-hover:text-n-900")
                          }
                        >
                          <span
                            aria-hidden="true"
                            className={
                              "inline-flex items-center justify-center w-4 h-4 rounded-[3px] border " +
                              (checked
                                ? "bg-accent border-accent text-white"
                                : "bg-white border-n-300")
                            }
                          >
                            {checked ? "✓" : ""}
                          </span>
                          {o.l}
                        </span>
                        <span className="text-xs text-n-400">({o.c})</span>
                      </Link>
                    );
                  })}
                </div>
              </details>
            );
          })}

          <details open className="filter-group">
            <summary className="filter-group__head list-none cursor-pointer select-none">
              <h5>Thương hiệu</h5>
              <span className="filter-group__caret">▼</span>
            </summary>
            <div className="filter-group__items">
              <BrandCheck label="MÜNZING" count={48} checked />
              <BrandCheck label="AddWorks" count={8} />
              <BrandCheck label="Khác" count={4} />
            </div>
          </details>
        </aside>

        <div>
          <div className="toolbar">
            <div className="toolbar__left">
              <span className="toolbar__count">{filtered.length} sản phẩm</span>
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
            {filtered.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="prod-card">
                <div className="prod-card__media"><ProductImage name={p.name} /></div>
                <div className="prod-card__body">
                  <Tag variant="brand">{p.group}</Tag>
                  <h3 className="prod-card__name">{p.name}</h3>
                  <p className="prod-card__desc">{p.desc}</p>
                  <div className="prod-card__foot">
                    <span className="prod-card__cta">Xem chi tiết →</span>
                    <span className="prod-card__compare">+ Compare</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="pagination">
            {([1, 2, 3, "...", 8] as const).map((n, i) => {
              if (typeof n !== "number") {
                return <span key={i} className="pg pointer-events-none">{n}</span>;
              }
              const isActive = n === pageNum;
              const href = buildHref(searchParams, { page: n === 1 ? undefined : String(n) });
              return (
                <Link key={i} href={href} className={`pg${isActive ? " active" : ""}`}>
                  {n}
                </Link>
              );
            })}
            <Link
              href={buildHref(searchParams, { page: String(pageNum + 1) })}
              className="pg"
            >
              ›
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function BrandCheck({ label, count, checked }: { label: string; count: number; checked?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5 select-none">
      <span
        className={
          "flex items-center gap-2 text-[13px] " +
          (checked ? "text-n-900 font-semibold" : "text-n-700")
        }
      >
        <span
          aria-hidden="true"
          className={
            "inline-flex items-center justify-center w-4 h-4 rounded-[3px] border " +
            (checked ? "bg-accent border-accent text-white" : "bg-white border-n-300")
          }
        >
          {checked ? "✓" : ""}
        </span>
        {label}
      </span>
      <span className="text-xs text-n-400">({count})</span>
    </div>
  );
}

