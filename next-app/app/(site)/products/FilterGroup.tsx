"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export function FilterGroup({
  label,
  defaultOpen = true,
  children,
}: {
  label: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="filter-group">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="filter-group__head w-full flex items-center justify-between cursor-pointer select-none bg-transparent"
      >
        <h5>{label}</h5>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className={
            "text-n-500 transition-transform duration-200 ease-out " +
            (open ? "rotate-180" : "rotate-0")
          }
        />
      </button>
      <div
        className={
          "grid transition-[grid-template-rows] duration-200 ease-out " +
          (open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")
        }
      >
        <div className="overflow-hidden">
          <div className="filter-group__items">{children}</div>
        </div>
      </div>
    </div>
  );
}
