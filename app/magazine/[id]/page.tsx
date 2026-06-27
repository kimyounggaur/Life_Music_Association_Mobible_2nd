import { notFound } from "next/navigation";

import { RouteShell } from "@/components/ui/RouteShell";
import { magazineItems } from "@/src/data/dummy/routes";

export function generateStaticParams() {
  return magazineItems.map((item) => ({ id: item.id }));
}

export default async function MagazineDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = magazineItems.find((magazineItem) => magazineItem.id === id);

  if (!item) notFound();

  return (
    <RouteShell title={item.title} description={item.date}>
      <div className="rounded-lg border border-line bg-surface p-5 shadow-e1">
        <p className="t-body text-ink-muted">Phase 3에서 매거진 본문과 대표 이미지를 Supabase posts 데이터로 연결합니다.</p>
      </div>
    </RouteShell>
  );
}
