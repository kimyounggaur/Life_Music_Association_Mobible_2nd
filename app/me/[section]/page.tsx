import { notFound } from "next/navigation";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { RouteShell } from "@/components/ui/RouteShell";
import { meItems } from "@/src/data/dummy/routes";

export function generateStaticParams() {
  return meItems.map((item) => ({ section: item.slug }));
}

export default async function MeSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const item = meItems.find((meItem) => meItem.slug === section);

  if (!item) notFound();

  return (
    <AuthGuard>
      <RouteShell title={item.title} description={item.description}>
        <div className="rounded-lg border border-line bg-surface p-5 shadow-e1">
          <p className="t-body-sm text-ink-muted">Phase 4 세션과 Phase 3 데이터가 연결되면 이 영역에 실제 사용자 데이터를 표시합니다.</p>
        </div>
      </RouteShell>
    </AuthGuard>
  );
}
