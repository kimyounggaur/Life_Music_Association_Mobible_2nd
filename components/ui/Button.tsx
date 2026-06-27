import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost" | "danger" | "social";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  leadingIcon?: ReactNode;
  onClick?: () => void;
};

const variantClass = {
  primary: "bg-primary text-on-primary hover:bg-primary-pressed",
  secondary: "bg-primary-soft text-primary hover:border-primary",
  ghost: "bg-transparent text-primary hover:bg-primary-soft",
  danger: "bg-danger text-on-danger",
  social: "border border-line bg-surface text-ink hover:border-line-strong",
};

const sizeClass = {
  sm: "min-h-11 px-3 text-sm",
  md: "min-h-12 px-4",
  lg: "min-h-[52px] px-5 text-base",
};

function isExternalHref(href: string) {
  return /^[a-z][a-z0-9+.-]*:/i.test(href);
}

export function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth,
  loading,
  disabled,
  leadingIcon,
  onClick,
}: ButtonProps) {
  const className = [
    "pressable inline-flex items-center justify-center gap-2 rounded-md font-bold shadow-e1",
    variantClass[variant],
    sizeClass[size],
    fullWidth ? "w-full" : "",
    disabled ? "pointer-events-none opacity-50" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {loading ? <span className="h-4 w-4 rounded-pill border-2 border-current border-t-transparent" aria-hidden /> : leadingIcon}
      <span>{children}</span>
    </>
  );

  if (href) {
    if (isExternalHref(href)) {
      return (
        <a href={href} className={className} aria-disabled={disabled}>
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={className} aria-disabled={disabled}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={className} disabled={disabled || loading} onClick={onClick}>
      {content}
    </button>
  );
}
