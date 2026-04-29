"use client";

import { useMemo, useState } from "react";

const CUSTOM = "__custom__";

interface ProductOption {
  slug: string;
  name: string;
}

const COMMON_PAGES: Array<{ value: string; label: string }> = [
  { value: "/",                  label: "Trang chủ" },
  { value: "/products",          label: "Tất cả sản phẩm" },
  { value: "/industries",        label: "Ngành ứng dụng" },
  { value: "/news",              label: "Tin tức" },
  { value: "/about",             label: "Giới thiệu" },
  { value: "/contact",           label: "Liên hệ" },
  { value: "/quote",             label: "Yêu cầu báo giá" },
  { value: "/recruitment",       label: "Tuyển dụng" },
];

export function BannerCtaPicker({
  name,
  initialValue,
  products,
}: {
  name: string;
  initialValue: string;
  products: ProductOption[];
}) {
  const productOptions = useMemo(
    () => products.map((p) => ({ value: `/products/${p.slug}`, label: p.name })),
    [products],
  );

  const allOptions = useMemo(
    () => [
      ...COMMON_PAGES,
      ...productOptions,
    ],
    [productOptions],
  );

  const matchesPreset = (v: string) => allOptions.some((o) => o.value === v);
  const initialIsPreset = initialValue !== "" && matchesPreset(initialValue);

  const [picker, setPicker] = useState<string>(
    initialValue === ""
      ? ""
      : initialIsPreset
        ? initialValue
        : CUSTOM,
  );
  const [custom, setCustom] = useState<string>(initialIsPreset ? "" : initialValue);

  const isCustom = picker === CUSTOM;
  const cta = isCustom ? custom : picker;

  return (
    <div className="field">
      <label>Link đích</label>
      <input type="hidden" name={name} value={cta} />
      <select
        className="input"
        value={picker}
        onChange={(e) => setPicker(e.target.value)}
      >
        <option value="">— Chưa có link —</option>
        <optgroup label="Trang phổ biến">
          {COMMON_PAGES.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </optgroup>
        {productOptions.length > 0 && (
          <optgroup label="Sản phẩm">
            {productOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </optgroup>
        )}
        <option value={CUSTOM}>Tuỳ chỉnh URL khác…</option>
      </select>

      {isCustom && (
        <input
          type="text"
          className="input mt-2"
          placeholder="https://… hoặc /đường-dẫn"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
        />
      )}

      {cta && (
        <div className="text-[11px] text-n-500 mt-1.5 truncate">
          → <code className="text-n-700">{cta}</code>
        </div>
      )}
    </div>
  );
}
