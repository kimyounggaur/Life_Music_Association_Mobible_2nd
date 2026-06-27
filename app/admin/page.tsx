import { ShieldCheck } from "lucide-react";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { RouteShell } from "@/components/ui/RouteShell";

export default function AdminPage() {
  return (
    <AuthGuard requiredRole="admin">
      <RouteShell title="관리자" description="콘텐츠, 회원, 자격 승인 업무를 관리하는 운영자 영역입니다.">
        <div className="rounded-lg border border-line bg-surface p-5 shadow-e1">
          <ShieldCheck className="mb-4 text-primary" size={28} aria-hidden />
          <p className="t-body-sm text-ink-muted">관리자 역할 확인과 Supabase 정책 연결 후 실제 운영 콘솔을 표시합니다.</p>
        </div>
      </RouteShell>
    </AuthGuard>
  );
}
