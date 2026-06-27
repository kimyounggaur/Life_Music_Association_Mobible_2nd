import type { ReactNode } from "react";
import { AlertTriangle, LoaderCircle, Music2 } from "lucide-react";

import { Button } from "@/components/ui/Button";

export function SkeletonCard() {
  return (
    <div className="rounded-lg border border-line bg-surface p-4 shadow-e1" aria-hidden>
      <div className="skeleton-shimmer mb-4 aspect-square rounded-lg" />
      <div className="skeleton-shimmer mb-2 h-5 rounded-pill" />
      <div className="skeleton-shimmer h-4 w-2/3 rounded-pill" />
    </div>
  );
}

export function EmptyState({ title, description, actionLabel, href }: { title: string; description: string; actionLabel?: string; href?: string }) {
  return (
    <div className="safe-x grid place-items-center py-12 text-center">
      <div className="grid h-20 w-20 place-items-center rounded-pill bg-primary-soft text-primary">
        <Music2 size={32} aria-hidden />
      </div>
      <h2 className="t-h2 mt-5">{title}</h2>
      <p className="t-body-sm mt-2 max-w-sm text-ink-muted">{description}</p>
      {actionLabel && href && (
        <div className="mt-5">
          <Button href={href} variant="secondary">
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

export function ErrorState({ title = "불러오지 못했습니다", description = "네트워크 상태를 확인하고 다시 시도해 주세요." }) {
  return (
    <div className="safe-x grid place-items-center py-12 text-center">
      <div className="grid h-20 w-20 place-items-center rounded-pill bg-surface-2 text-danger">
        <AlertTriangle size={32} aria-hidden />
      </div>
      <h2 className="t-h2 mt-5">{title}</h2>
      <p className="t-body-sm mt-2 max-w-sm text-ink-muted">{description}</p>
      <div className="mt-5">
        <Button href="/" variant="secondary">
          홈으로 이동
        </Button>
      </div>
    </div>
  );
}

export function State({
  tone = "info",
  title,
  description,
  action,
}: {
  tone?: "info" | "loading" | "error";
  title: string;
  description: string;
  action?: ReactNode;
}) {
  const Icon = tone === "loading" ? LoaderCircle : tone === "error" ? AlertTriangle : Music2;
  const colorClass = tone === "error" ? "bg-surface-2 text-danger" : "bg-primary-soft text-primary";

  return (
    <div className="safe-x grid place-items-center py-12 text-center">
      <div className={`grid h-20 w-20 place-items-center rounded-pill ${colorClass}`}>
        <Icon className={tone === "loading" ? "animate-spin" : ""} size={32} aria-hidden />
      </div>
      <h2 className="t-h2 mt-5">{title}</h2>
      <p className="t-body-sm mt-2 max-w-sm text-ink-muted">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
