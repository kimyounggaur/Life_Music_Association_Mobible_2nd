import { RouteShell } from "@/components/ui/RouteShell";

export function generateStaticParams() {
  return [{ id: "sample-ppt" }];
}

export default async function PptDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <RouteShell title="수업용 PPT 상세" description={id}>
      <div className="rounded-lg border border-line bg-surface p-5 shadow-e1">
        <p className="t-body-sm text-ink-muted">PPT 메타데이터와 다운로드 권한은 Supabase 연결 후 표시합니다.</p>
      </div>
    </RouteShell>
  );
}
