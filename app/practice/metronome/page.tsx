import { Timer } from "lucide-react";

import { RouteShell } from "@/components/ui/RouteShell";

export default function MetronomePage() {
  return (
    <RouteShell title="메트로놈" description="수업과 개인 연습에서 공통으로 쓰는 박자 도구입니다.">
      <div className="rounded-lg border border-line bg-surface p-5 shadow-e1">
        <Timer className="mb-4 text-primary" size={28} aria-hidden />
        <div className="flex items-end gap-2">
          <span className="text-5xl font-black">80</span>
          <span className="t-body-sm pb-2 text-ink-muted">BPM</span>
        </div>
        <div className="mt-5 h-3 rounded-pill bg-primary-soft">
          <div className="h-3 w-1/3 rounded-pill bg-primary" />
        </div>
        <p className="t-caption mt-3 text-ink-muted">실시간 오디오 클릭은 Phase 7 네이티브 오디오 정책과 함께 연결합니다.</p>
      </div>
    </RouteShell>
  );
}
