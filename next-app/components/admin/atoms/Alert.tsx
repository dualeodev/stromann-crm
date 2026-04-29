import type { ReactNode } from "react";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, type LucideIcon } from "lucide-react";

export type AlertVariant = "success" | "error" | "info" | "warning";

const STYLE: Record<AlertVariant, { bg: string; fg: string; border: string; icon: LucideIcon }> = {
  success: { bg: "#E8F5E9", fg: "#1B5E20", border: "#A5D6A7", icon: CheckCircle2 },
  error:   { bg: "#FFEBEE", fg: "#B00020", border: "#FFCDD2", icon: AlertCircle },
  info:    { bg: "#E3F2FD", fg: "#0D47A1", border: "#BBDEFB", icon: Info },
  warning: { bg: "#FFF8E1", fg: "#7C4A00", border: "#FFE0A3", icon: AlertTriangle },
};

export interface AlertProps {
  variant?: AlertVariant;
  title?: ReactNode;
  children?: ReactNode;
  icon?: LucideIcon | false;
  className?: string;
}

export function Alert({
  variant = "info",
  title,
  children,
  icon,
  className,
}: AlertProps) {
  const s = STYLE[variant];
  const Icon = icon === false ? null : icon ?? s.icon;
  return (
    <div
      className={[
        "px-3 py-2 rounded-r-8 text-sm flex items-start gap-2",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ background: s.bg, color: s.fg, border: `1px solid ${s.border}` }}
      role={variant === "error" || variant === "warning" ? "alert" : "status"}
    >
      {Icon && <Icon size={14} className="mt-0.5 shrink-0" />}
      <div className="flex-1">
        {title && <div className="font-semibold">{title}</div>}
        {children && <div>{children}</div>}
      </div>
    </div>
  );
}
