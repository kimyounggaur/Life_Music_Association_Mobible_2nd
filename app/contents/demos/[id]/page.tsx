import { RouteShell } from "@/components/ui/RouteShell";

export function generateStaticParams() {
  return [{ id: "sample-demo" }];
}

export default async function DemoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <RouteShell title="시범연주 상세" description={id}>
      <div className="rounded-lg border border-line bg-surface p-5 shadow-e1">
        <p className="t-body-sm text-ink-muted">실제 미디어 경로와 오프라인 저장 상태는 Supabase Storage 연결 후 표시합니다.</p>
      </div>
    </RouteShell>
  );
}
