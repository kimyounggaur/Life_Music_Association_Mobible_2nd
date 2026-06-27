import { Badge } from "@/components/ui/Badge";

export function DummyNotice() {
  return (
    <div className="safe-x pt-4">
      <div className="flex items-center gap-2 rounded-lg border border-line bg-surface p-3 shadow-e1">
        <Badge tone="accent">__DUMMY__</Badge>
        <p className="t-caption text-ink-muted">현재 화면 데이터는 Phase 2용 더미입니다. Phase 3에서 Supabase 시드 데이터로 교체됩니다.</p>
      </div>
    </div>
  );
}
