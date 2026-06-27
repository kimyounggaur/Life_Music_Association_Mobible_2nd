import Link from "next/link";
import { Star } from "lucide-react";

import { RouteShell } from "@/components/ui/RouteShell";
import { reviewItems } from "@/src/data/dummy/routes";

export default function ReviewsPage() {
  return (
    <RouteShell title="수강후기" description="기관과 강사 현장에서 남긴 수업 경험을 확인합니다.">
      <div className="grid gap-3 md:grid-cols-3">
        {reviewItems.map((item) => (
          <Link key={item.id} href={`/reviews/${item.id}`} className="pressable rounded-lg border border-line bg-surface p-4 shadow-e1">
            <div className="mb-3 flex gap-1 text-accent">
              {Array.from({ length: item.rating }).map((_, index) => (
                <Star key={index} size={16} fill="currentColor" aria-hidden />
              ))}
            </div>
            <h2 className="t-h3">{item.title}</h2>
            <p className="t-caption mt-2 text-ink-muted">{item.author}</p>
          </Link>
        ))}
      </div>
    </RouteShell>
  );
}
