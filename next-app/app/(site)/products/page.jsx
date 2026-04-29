"use client";

import Link from "next/link";
import { useState } from "react";
import { Tag, ProductImage, Checkbox } from "@/components/ui";
import Breadcrumb from "@/components/Breadcrumb";
import { PRODUCTS } from "@/lib/data";

const FILTER_GROUPS = [
  { id: "group", label: "Nhóm sản phẩm", options: [
    { v: "DEFOAMER", l: "Defoamer", c: 22 },
    { v: "DISPERSANT", l: "Dispersant", c: 18 },
    { v: "WETTING AGENT", l: "Wetting Agent", c: 12 },
    { v: "RHEOLOGY", l: "Rheology Modifier", c: 9 },
    { v: "WAX", l: "Wax Additives", c: 7 },
    { v: "LEVELING", l: "Leveling", c: 5 },
  ]},
  { id: "industry", label: "Ngành ứng dụng", options: [
    { v: "coatings", l: "Sơn nước", c: 28 },
    { v: "coatings-solvent", l: "Sơn dầu / sơn bóng", c: 18 },
    { v: "ink-water", l: "Mực in gốc nước", c: 14 },
    { v: "ink-solvent", l: "Mực in gốc dầu", c: 8 },
    { v: "plastic", l: "Nhựa / Masterbatch", c: 11 },
  ]},
  { id: "issue", label: "Vấn đề kỹ thuật", options: [
    { v: "foam", l: "Bọt khí", c: 22 },
    { v: "viscosity", l: "Độ nhớt", c: 9 },
    { v: "surface", l: "Bề mặt", c: 12 },
    { v: "color", l: "Lên màu", c: 7 },
  ]},
];

export default function ProductsPage() {
  const [filters, setFilters] = useState({});
  const [collapsed, setCollapsed] = useState({});
  const [sort, setSort] = useState("Mới nhất");
  const [chip, setChip] = useState("All");
  const [page, setPage] = useState(1);

  const toggle = (gid, v) => {
    setFilters(f => {
      const set = new Set(f[gid] || []);
      set.has(v) ? set.delete(v) : set.add(v);
      return { ...f, [gid]: Array.from(set) };
    });
  };
  const clearAll = () => setFilters({});

  const filtered = PRODUCTS.filter(p => {
    const g = filters.group;
    if (g && g.length && !g.some(v => p.group.includes(v))) return false;
    if (chip === "Featured" && !p.featured) return false;
    if (chip === "New" && !["agitan-120", "edaplan-470"].includes(p.id)) return false;
    return true;
  });

  return (
    <>
      <Breadcrumb items={[{ label: "Sản phẩm" }]} />
      <div className="page-head">
        <Tag variant="brand-soft" style={{ alignSelf: "flex-start" }}>CATALOG</Tag>
        <h1>Tất cả sản phẩm</h1>
        <p>Phụ gia chuyên biệt cho sơn, mực in và nhựa — phân phối chính hãng từ MÜNZING (Đức)</p>
      </div>

      <div className="listing">
        <aside className="filter-panel">
          <div className="filter-panel__head">
            <h4>Lọc sản phẩm</h4>
            <button className="filter-panel__clear" onClick={clearAll}>Clear all</button>
          </div>
          {FILTER_GROUPS.map(g => (
            <div key={g.id} className={`filter-group${collapsed[g.id] ? " collapsed" : ""}`}>
              <div className="filter-group__head" onClick={() => setCollapsed(c => ({...c, [g.id]: !c[g.id]}))}>
                <h5>{g.label}</h5>
                <span className="filter-group__caret">▼</span>
              </div>
              <div className="filter-group__items">
                {g.options.map(o => (
                  <Checkbox key={o.v}
                    checked={(filters[g.id] || []).includes(o.v)}
                    onChange={() => toggle(g.id, o.v)}
                    label={o.l} count={o.c} />
                ))}
              </div>
            </div>
          ))}
          <div className="filter-group">
            <div className="filter-group__head">
              <h5>Thương hiệu</h5>
            </div>
            <div className="filter-group__items">
              <Checkbox checked={true} onChange={()=>{}} label="MÜNZING" count={48} />
              <Checkbox checked={false} onChange={()=>{}} label="AddWorks" count={8} />
              <Checkbox checked={false} onChange={()=>{}} label="Khác" count={4} />
            </div>
          </div>
        </aside>

        <div>
          <div className="toolbar">
            <div className="toolbar__left">
              <span className="toolbar__count">{filtered.length} sản phẩm</span>
              <div className="toolbar__chips">
                {["All", "Best", "New", "Featured"].map(c => (
                  <button key={c} className={`chip${chip === c ? " active" : ""}`} onClick={() => setChip(c)}>{c}</button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "var(--n-600)" }}>Sắp xếp:</span>
              <select className="input" style={{ height: 32, width: "auto", padding: "4px 12px" }}
                      value={sort} onChange={e => setSort(e.target.value)}>
                <option>Mới nhất</option><option>A → Z</option><option>Z → A</option><option>Phổ biến</option>
              </select>
            </div>
          </div>

          <div className="product-grid product-grid--3">
            {filtered.map(p => (
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
            {[1,2,3,"...",8].map((n,i) => (
              <button key={i} className={`pg${n === page ? " active" : ""}`} onClick={() => typeof n === "number" && setPage(n)}>{n}</button>
            ))}
            <button className="pg" onClick={() => setPage(p => p + 1)}>›</button>
          </div>
        </div>
      </div>
    </>
  );
}
