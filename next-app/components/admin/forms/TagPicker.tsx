"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, Plus, X } from "lucide-react";

export type TagAccent = "brand" | "blue" | "amber";

interface Option {
  value: string;
  label: string;
}

interface AccentTokens {
  bg: string;
  border: string;
  text: string;
}

const ACCENTS: Record<TagAccent, AccentTokens> = {
  brand: { bg: "#FFE4E6", border: "#E11D2C", text: "#B91C1C" },
  blue:  { bg: "#DBEAFE", border: "#2563EB", text: "#1E40AF" },
  amber: { bg: "#FEF3C7", border: "#D97706", text: "#92400E" },
};

export function TagPicker({
  name,
  label,
  accent,
  options,
  defaultSelected,
  manageHref,
  manageLabel,
}: {
  name: string;
  label: string;
  accent: TagAccent;
  options: Option[];
  defaultSelected: string[];
  manageHref: string;
  manageLabel?: string;
}) {
  const [selected, setSelected] = useState<string[]>(defaultSelected);
  const tokens = ACCENTS[accent];

  const optionsById = useMemo(() => {
    const m = new Map<string, Option>();
    options.forEach((o) => m.set(o.value, o));
    return m;
  }, [options]);

  const selectedOptions = selected
    .map((v) => optionsById.get(v))
    .filter((o): o is Option => Boolean(o));
  const availableOptions = options.filter((o) => !selected.includes(o.value));

  const add = (v: string) =>
    setSelected((prev) => (prev.includes(v) ? prev : [...prev, v]));
  const remove = (v: string) =>
    setSelected((prev) => prev.filter((x) => x !== v));

  return (
    <div className="field">
      {selected.map((v) => (
        <input key={v} type="hidden" name={name} value={v} />
      ))}

      <div className="flex items-center justify-between mb-2">
        <label className="m-0">
          {label}{" "}
          <span className="text-n-500 font-normal">({selectedOptions.length})</span>
        </label>
        <Link
          href={manageHref}
          className="text-[12px] font-semibold text-brand-500 hover:text-brand-600"
        >
          {manageLabel ?? "Quản lý"} →
        </Link>
      </div>

      <div
        className="rounded-lg border border-n-200 bg-white p-3.5"
        style={{ borderColor: "var(--n-200)" }}
      >
        <div className="flex gap-2 flex-wrap min-h-[34px] items-center">
          {selectedOptions.length === 0 ? (
            <span className="text-[12px] text-n-400 italic px-1">
              Chưa chọn tag nào — pick từ danh sách bên dưới.
            </span>
          ) : (
            selectedOptions.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => remove(o.value)}
                className="px-3.5! py-1.5! text-xs font-semibold rounded-full border inline-flex items-center gap-1.5 max-w-full"
                style={{
                  backgroundColor: tokens.bg,
                  borderColor: tokens.border,
                  color: tokens.text,
                }}
                aria-label={`Bỏ ${o.label}`}
                title={o.label}
              >
                <Check size={12} strokeWidth={2.5} />
                <span className="truncate max-w-[260px]">{o.label}</span>
                <X size={12} strokeWidth={2.5} />
              </button>
            ))
          )}
        </div>

        <div className="border-t border-n-100 my-3" />

        <div className="flex gap-2 flex-wrap">
          {availableOptions.length === 0 ? (
            <span className="text-[12px] text-n-400 italic px-1 py-1">Đã chọn hết.</span>
          ) : (
            availableOptions.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => add(o.value)}
                className="px-3.5! py-1.5! text-xs font-semibold rounded-full border border-n-300 bg-white text-n-700 inline-flex items-center gap-1.5 max-w-full hover:border-n-500"
                title={o.label}
              >
                <Plus size={12} strokeWidth={2.5} className="text-n-400" />
                <span className="truncate max-w-[260px]">{o.label}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
