import Link from "next/link";
import type { ReactNode } from "react";

type IconButtonProps = {
  icon: ReactNode;
  label: string;
  href?: string;
  badge?: boolean;
  onClick?: () => void;
};

export function IconButton({ icon, label, href, badge, onClick }: IconButtonProps) {
  const className =
    "relative grid min-h-11 min-w-11 place-items-center rounded-pill text-ink-muted transition-colors hover:bg-primary-soft hover:text-primary";

  const content = (
    <>
      {icon}
      {badge && <span className="absolute right-2 top-2 h-2 w-2 rounded-pill bg-accent" aria-hidden />}
      <span className="sr-only">{label}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className} aria-label={label}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={className} aria-label={label} onClick={onClick}>
      {content}
    </button>
  );
}
