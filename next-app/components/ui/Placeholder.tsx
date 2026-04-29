import type { CSSProperties, ReactNode } from "react";

export type PlaceholderVariant = "default" | "brand" | "dark";

export interface PlaceholderProps {
  label?: string;
  variant?: PlaceholderVariant;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
}

const STRIPE: Record<PlaceholderVariant, string> = {
  default: "placeholder-stripe-default",
  brand:   "placeholder-stripe-brand",
  dark:    "placeholder-stripe-dark text-n-400",
};

const BASE = "relative overflow-hidden flex items-center justify-center";

const LABEL_BASE =
  "relative font-mono text-[11px] tracking-[0.05em] " +
  "px-2 py-1 rounded border";

const LABEL_VARIANT: Record<PlaceholderVariant, string> = {
  default: "text-n-500 bg-white/85 border-n-200",
  brand:   "text-n-500 bg-white/85 border-n-200",
  dark:    "text-n-400 bg-black/60 border-n-700",
};

export function Placeholder({
  label,
  variant = "default",
  style,
  className,
  children,
}: PlaceholderProps) {
  const cls =
    `${BASE} ${STRIPE[variant]}` + (className ? ` ${className}` : "");

  return (
    <div className={cls} style={style}>
      {children}
      {label && (
        <span className={`${LABEL_BASE} ${LABEL_VARIANT[variant]}`}>{label}</span>
      )}
    </div>
  );
}
