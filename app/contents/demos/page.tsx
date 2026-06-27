import { CirclePlay } from "lucide-react";

import { RouteShell } from "@/components/ui/RouteShell";

export default function DemosPage() {
  return (
    <RouteShell title="시범연주" description="오디오·영상 시범 자료를 담을 라이브러리 셸입니다.">
      <div className="rounded-lg border border-line bg-surface p-5 shadow-e1">
        <CirclePlay className="mb-4 text-primary" size={28} aria-hidden />
        <p className="t-body-sm text-ink-muted">Phase 7에서 네이티브 오디오 정책과 함께 재생 컴포넌트를 연결합니다.</p>
      </div>
    </RouteShell>
  );
}
