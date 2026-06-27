import { CheckCircle2, Mail } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { DummyNotice } from "@/components/ui/DummyNotice";

export default function SignupPage() {
  return (
    <>
      <DummyNotice />
      <section className="safe-x py-6">
        <div className="mx-auto max-w-md rounded-xl border border-line bg-surface p-5 shadow-e1">
          <h1 className="t-h1">회원가입</h1>
          <p className="t-body-sm mt-2 text-ink-muted">Phase 4에서 Supabase Auth와 약관 동의 저장을 연결합니다.</p>
          <div className="mt-5 space-y-3">
            <label className="block">
              <span className="t-caption text-ink-muted">이메일</span>
              <input className="mt-2 h-12 w-full rounded-md border border-line bg-bg px-3 outline-none focus:border-primary" placeholder="name@example.com" />
            </label>
            <label className="flex min-h-12 items-center gap-3 rounded-md border border-line px-3">
              <input type="checkbox" className="h-5 w-5 accent-primary" />
              <span className="t-body-sm">이용약관과 개인정보 처리방침에 동의합니다.</span>
            </label>
            <Button leadingIcon={<Mail size={18} aria-hidden />} fullWidth>
              매직링크로 가입
            </Button>
          </div>
          <div className="mt-5 rounded-lg bg-surface-2 p-4">
            <div className="flex items-center gap-2 text-primary">
              <CheckCircle2 size={18} aria-hidden />
              <span className="t-body-sm font-bold">가입 후 온보딩</span>
            </div>
            <p className="t-caption mt-2 text-ink-muted">역할, 관심 과목, 지역 정보를 받아 강사 과정과 콘텐츠 추천에 활용합니다.</p>
          </div>
        </div>
      </section>
    </>
  );
}
