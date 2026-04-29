import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  const Icon = icon;
  return (
    <div
      className={[
        "p-8 text-center text-n-500 text-sm flex flex-col items-center gap-2",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {Icon && <Icon size={28} strokeWidth={1.5} className="text-n-400" />}
      <div className="font-semibold text-n-700">{title}</div>
      {description && <div className="text-xs max-w-md">{description}</div>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
