import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Loader2 } from "lucide-react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "btn btn--primary bg-brand-500 text-white hover:bg-brand-600",
  secondary: "btn btn--secondary",
  ghost: "btn btn--ghost",
  danger: "btn btn--danger",
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: "btn--sm",
  md: "",
};

const ICON_SIZE: Record<ButtonSize, number> = { sm: 12, md: 14 };

function classes(
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth?: boolean,
  className?: string,
) {
  return [
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    "inline-flex items-center justify-center gap-1.5",
    fullWidth ? "w-full" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

function renderContent(
  icon: LucideIcon | undefined,
  iconPosition: "left" | "right",
  loading: boolean,
  size: ButtonSize,
  children: ReactNode,
) {
  const Icon = icon;
  const iconSize = ICON_SIZE[size];
  const iconNode = loading ? (
    <Loader2 size={iconSize} className="animate-spin" />
  ) : Icon ? (
    <Icon size={iconSize} />
  ) : null;
  if (iconPosition === "right") {
    return (
      <>
        {children}
        {iconNode}
      </>
    );
  }
  return (
    <>
      {iconNode}
      {children}
    </>
  );
}

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  loading?: boolean;
  fullWidth?: boolean;
}

export interface ButtonProps
  extends BaseButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  type?: "button" | "submit" | "reset";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    icon,
    iconPosition = "left",
    loading = false,
    fullWidth,
    type = "button",
    disabled,
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={classes(variant, size, fullWidth, className)}
      {...rest}
    >
      {renderContent(icon, iconPosition, loading, size, children)}
    </button>
  );
});

export interface ButtonLinkProps extends BaseButtonProps {
  href: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  fullWidth,
  href,
  external,
  className,
  children,
}: ButtonLinkProps) {
  const cls = classes(variant, size, fullWidth, className);
  const content = renderContent(icon, iconPosition, loading, size, children);

  if (external || /^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a className={cls} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
        {content}
      </a>
    );
  }
  return (
    <Link className={cls} href={href}>
      {content}
    </Link>
  );
}
