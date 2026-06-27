import { notFound } from "next/navigation";
import { LockKeyhole } from "lucide-react";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { Button } from "@/components/ui/Button";
import { RouteShell } from "@/components/ui/RouteShell";
import { loungeItems } from "@/src/data/dummy/routes";

export function generateStaticParams() {
  return loungeItems.map((item) => ({ section: item.slug }));
}

export default async function LoungeSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const item = loungeItems.find((loungeItem) => loungeItem.slug === section);

  if (!item) notFound();

  return (
    <AuthGuard requiredRole="instructor">
      <RouteShell title={item.title} description={item.description}>
        <div className="rounded-lg border border-line bg-surface p-5 shadow-e1">
          <LockKeyhole className="mb-4 text-primary" size={26} aria-hidden />
          <p className="t-body-sm text-ink-muted">승인된 강사 권한과 RLS가 연결되면 실제 목록을 표시합니다.</p>
          <div className="mt-5">
            <Button href="/auth/instructor-apply" variant="secondary">
              강사 등록 신청
            </Button>
          </div>
        </div>
      </RouteShell>
    </AuthGuard>
  );
}
