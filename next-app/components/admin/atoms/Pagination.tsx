import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  total: number;
  page: number;
  pageSize: number;
  hrefFor: (page: number) => string;
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

export function Pagination({ total, page, pageSize, hrefFor }: PaginationProps) {
  const last = Math.max(1, Math.ceil(total / pageSize));
  if (last <= 1) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const items = pageWindow(page, last);
  const prevHref = page > 1 ? hrefFor(page - 1) : null;
  const nextHref = page < last ? hrefFor(page + 1) : null;

  const baseBtn =
    "inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-md text-xs font-semibold border";
  const ghost = `${baseBtn} border-transparent text-n-700 hover:bg-n-100`;
  const active = `${baseBtn} border-brand-500 bg-brand-500 text-white`;
  const disabled = `${baseBtn} border-transparent text-n-300 cursor-not-allowed`;

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-n-100 bg-white rounded-b-lg">
      <div className="text-xs text-n-500">
        {from}–{to} / {total}
      </div>
      <div className="flex items-center gap-1">
        {prevHref ? (
          <Link href={prevHref} className={ghost} aria-label="Trang trước">
            <ChevronLeft size={14} />
          </Link>
        ) : (
          <span className={disabled} aria-hidden="true">
            <ChevronLeft size={14} />
          </span>
        )}

        {items.map((it, i) =>
          typeof it === "number" ? (
            <Link key={`p-${it}`} href={hrefFor(it)} className={it === page ? active : ghost}>
              {it}
            </Link>
          ) : (
            <span key={`d-${i}`} className="px-1 text-n-400 text-xs">…</span>
          ),
        )}

        {nextHref ? (
          <Link href={nextHref} className={ghost} aria-label="Trang sau">
            <ChevronRight size={14} />
          </Link>
        ) : (
          <span className={disabled} aria-hidden="true">
            <ChevronRight size={14} />
          </span>
        )}
      </div>
    </div>
  );
}
