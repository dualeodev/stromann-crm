import type { AnchorHTMLAttributes, ReactNode } from "react";

export interface LinkArrowProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> {
  children?: ReactNode;
  className?: string;
}

const BASE =
  "inline-flex items-center gap-1.5 hover:gap-2.5 " +
  "text-accent font-bold text-sm transition-[gap] duration-150";

export function LinkArrow({ children, className, ...rest }: LinkArrowProps) {
  const cls = className ? `${BASE} ${className}` : BASE;
  return (
    <a className={cls} {...rest}>
      {children} <span>→</span>
    </a>
  );
}
