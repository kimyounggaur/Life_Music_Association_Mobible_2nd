import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "primary" | "accent" | "success" | "muted";
};

const toneClass = {
  primary: "bg-primary-soft text-primary",
  accent: "bg-accent text-on-accent",
  success: "bg-success text-on-primary",
  muted: "bg-surface-2 text-ink-muted",
};

export function Badge({ children, tone = "primary" }: BadgeProps) {
  return <span className={`t-label inline-flex min-h-7 items-center rounded-pill px-3 ${toneClass[tone]}`}>{children}</span>;
}
