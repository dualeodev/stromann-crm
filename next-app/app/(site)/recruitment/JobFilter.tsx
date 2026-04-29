"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function JobFilter({
  dept,
  loc,
  depts,
  locs,
}: {
  dept: string;
  loc: string;
  depts: string[];
  locs: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const update = (key: "dept" | "loc", value: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (value === "Tất cả") params.delete(key);
    else params.set(key, value);
    const qs = params.toString();
    router.push(qs ? `/recruitment?${qs}` : "/recruitment");
  };

  const selectCls = "input";
  const selectStyle = { height: 40, width: "auto", padding: "0 12px" } as const;

  return (
    <>
      <select
        className={selectCls}
        style={selectStyle}
        value={dept}
        onChange={(e) => update("dept", e.target.value)}
      >
        {depts.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>
      <select
        className={selectCls}
        style={selectStyle}
        value={loc}
        onChange={(e) => update("loc", e.target.value)}
      >
        {locs.map((l) => (
          <option key={l}>{l}</option>
        ))}
      </select>
    </>
  );
}
