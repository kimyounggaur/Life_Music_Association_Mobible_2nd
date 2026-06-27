import type { ReactNode } from "react";

type SectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
};

export function Section({ eyebrow, title, description, action, children }: SectionProps) {
  return (
    <section className="safe-x py-6">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div className="min-w-0">
          {eyebrow && <p className="t-label mb-1 text-primary">{eyebrow}</p>}
          <h2 className="t-h2">{title}</h2>
          {description && <p className="t-body-sm mt-1 text-ink-muted">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
