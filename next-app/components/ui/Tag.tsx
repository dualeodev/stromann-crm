import type { HTMLAttributes, ReactNode } from "react";

export type TagVariant = "brand" | "brand-soft" | "neutral" | "success" | "warn" | "info";

export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, "className"> {
  variant?: TagVariant;
  children?: ReactNode;
  className?: string;
}

const VARIANTS: Record<TagVariant, string> = {
  "brand":      "bg-accent text-white",
  "brand-soft": "bg-accent-bg text-accent-text",
  "neutral":    "bg-n-200 text-n-700",
  "success":    "bg-success-bg text-[#166534]",
  "warn":       "bg-warning-bg text-[#92400E]",
  "info":       "bg-info-bg text-[#1E40AF]",
};

const BASE =
  "inline-flex items-center gap-1.5 px-2 py-1 rounded-r-4 " +
  "text-[11px] font-bold tracking-[0.04em] uppercase whitespace-nowrap";

export function Tag({ variant = "brand", children, className, ...rest }: TagProps) {
  const cls = `${BASE} ${VARIANTS[variant]}${className ? ` ${className}` : ""}`;
  return (
    <span className={cls} {...rest}>
      {children}
    </span>
  );
}
