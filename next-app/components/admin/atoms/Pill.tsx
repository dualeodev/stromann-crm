import { STATUS_LABELS } from "@/lib/admin/data";
import type { AdminStatus } from "@/lib/admin/types";

export function Pill({ status }: { status: AdminStatus | string }) {
  const s = STATUS_LABELS[status as AdminStatus] ?? { lbl: status, cls: "pill--neutral" };
  return <span className={`pill ${s.cls}`}>{s.lbl}</span>;
}
