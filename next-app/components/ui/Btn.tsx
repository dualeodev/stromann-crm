import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ElementType, ReactNode } from "react";

export type BtnVariant = "primary" | "secondary" | "dark" | "ghost" | "white";
export type BtnSize = "sm" | "lg";

const VARIANTS: Record<BtnVariant, string> = {
  primary:   "bg-accent text-white hover:bg-brand-600 hover:-translate-y-px hover:shadow-card-md",
  dark:      "bg-n-900 text-white hover:bg-n-800 hover:-translate-y-px hover:shadow-card-md",
  secondary: "bg-white text-n-800 border border-n-300 hover:border-n-900",
  ghost:     "text-n-700 hover:text-accent",
  white:     "bg-white text-n-900 hover:bg-n-100",
};

const SIZES: Record<BtnSize, string> = {
  sm: "px-3.5 py-2 text-[13px]",
  lg: "px-6 py-3.5 text-[15px]",
};

const BASE =
  "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-r-8 " +
  "text-sm font-bold leading-none transition-all duration-[180ms] ease-[ease] " +
  "cursor-pointer whitespace-nowrap";

type CommonProps = {
  variant?: BtnVariant;
  size?: BtnSize;
  className?: string;
  children?: ReactNode;
};

type AsBase = AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>;

export interface BtnProps extends CommonProps, Omit<AsBase, "size" | "className" | "children"> {
  href?: string;
  as?: ElementType;
}

function isExternalLike(href: string) {
  return (
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  );
}

export function Btn({
  variant = "primary",
  size,
  as,
  href,
  children,
  className,
  ...rest
}: BtnProps) {
  const cls =
    `${BASE} ${VARIANTS[variant]}` +
    (size ? ` ${SIZES[size]}` : "") +
    (className ? ` ${className}` : "");

  if (href) {
    if (isExternalLike(href)) {
      return (
        <a className={cls} href={href} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {children}
        </a>
      );
    }
    return (
      <Link className={cls} href={href} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  const Tag: ElementType = as ?? "button";
  return (
    <Tag className={cls} {...rest}>
      {children}
    </Tag>
  );
}
