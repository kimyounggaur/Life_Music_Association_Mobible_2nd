import { notFound } from "next/navigation";
import { Star } from "lucide-react";

import { RouteShell } from "@/components/ui/RouteShell";
import { reviewItems } from "@/src/data/dummy/routes";

export function generateStaticParams() {
  return reviewItems.map((item) => ({ id: item.id }));
}

export default async function ReviewDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = reviewItems.find((reviewItem) => reviewItem.id === id);

  if (!item) notFound();

  return (
    <RouteShell title={item.title} description={item.author}>
      <div className="rounded-lg border border-line bg-surface p-5 shadow-e1">
        <div className="mb-4 flex gap-1 text-accent">
          {Array.from({ length: item.rating }).map((_, index) => (
            <Star key={index} size={18} fill="currentColor" aria-hidden />
          ))}
        </div>
        <p className="t-body text-ink-muted">Phase 3에서 공개 후기 테이블과 연결될 상세 본문 영역입니다.</p>
      </div>
    </RouteShell>
  );
}
