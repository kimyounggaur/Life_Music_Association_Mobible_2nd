import { Presentation } from "lucide-react";

import { RouteShell } from "@/components/ui/RouteShell";

export default function PptPage() {
  return (
    <RouteShell title="수업용 PPT" description="강사 승인 후 다운로드 가능한 수업 자료 영역입니다.">
      <div className="rounded-lg border border-line bg-surface p-5 shadow-e1">
        <Presentation className="mb-4 text-primary" size={28} aria-hidden />
        <p className="t-body-sm text-ink-muted">Phase 3 Storage/RLS와 연결되면 과목별 PPT 목록과 signed URL 다운로드를 제공합니다.</p>
      </div>
    </RouteShell>
  );
}
