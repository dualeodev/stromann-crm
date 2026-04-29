"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function SortSelect({ options, current }: { options: string[]; current: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("sort", value);
    params.delete("page");
    router.push(`/products?${params.toString()}`);
  };

  return (
    <select
      value={current}
      onChange={(e) => onChange(e.target.value)}
      className="input"
      style={{ height: 32, width: "auto", padding: "4px 12px" }}
    >
      {options.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}
