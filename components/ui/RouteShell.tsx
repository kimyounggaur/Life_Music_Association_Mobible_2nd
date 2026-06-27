import type { ReactNode } from "react";

import { DummyNotice } from "@/components/ui/DummyNotice";

export function RouteShell({
  title,
  description,
  children,
  dummy = true,
}: {
  title: string;
  description: string;
  children?: ReactNode;
  dummy?: boolean;
}) {
  return (
    <>
      {dummy && <DummyNotice />}
      <section className="safe-x py-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="t-h1">{title}</h1>
          <p className="t-body-sm mt-2 text-ink-muted">{description}</p>
          {children && <div className="mt-5">{children}</div>}
        </div>
      </section>
    </>
  );
}
