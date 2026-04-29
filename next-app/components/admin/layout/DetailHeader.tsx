import Link from "next/link";
import type { ReactNode } from "react";

export function DetailHeader({
  breadcrumb,
  backHref,
  title,
  sub,
  badge,
  actions,
}: {
  breadcrumb: string;
  backHref: string;
  title: string;
  sub?: string;
  badge?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="page-h mb-6">
      <div>
        <div className="crumb">
          <Link href={backHref} className="cursor-pointer text-brand-500">
            ← {breadcrumb}
          </Link>{" "}
          / <span>{title}</span>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <h1 className="m-0">{title}</h1>
          {badge}
        </div>
        {sub && <p>{sub}</p>}
      </div>
      <div className="flex gap-2">{actions}</div>
    </div>
  );
}
