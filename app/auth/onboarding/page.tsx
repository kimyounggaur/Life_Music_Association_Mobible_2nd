import { Music2, UserRound } from "lucide-react";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { Button } from "@/components/ui/Button";
import { DummyNotice } from "@/components/ui/DummyNotice";
import { subjects } from "@/src/data/dummy/catalog";

export default function OnboardingPage() {
  return (
    <>
      <DummyNotice />
      <AuthGuard>
        <section className="safe-x py-6">
          <div className="mx-auto max-w-2xl">
            <h1 className="t-h1">온보딩</h1>
            <p className="t-body-sm mt-2 text-ink-muted">역할과 관심 과목을 고르면 홈 추천과 강사 신청 흐름에 반영됩니다.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {["일반 회원", "강사 또는 강사 희망"].map((role) => (
                <button key={role} type="button" className="pressable flex min-h-16 items-center gap-3 rounded-lg border border-line bg-surface p-4 text-left shadow-e1">
                  <UserRound size={22} className="text-primary" aria-hidden />
                  <span className="t-body-sm font-bold">{role}</span>
                </button>
              ))}
            </div>
            <div className="mt-6">
              <h2 className="t-h2">관심 과목</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {subjects.slice(0, 12).map((subject) => (
                  <button key={subject.slug} type="button" className="pressable inline-flex min-h-11 items-center gap-2 rounded-pill border border-line bg-surface px-3">
                    <Music2 size={16} className="text-primary" aria-hidden />
                    <span className="t-caption font-bold">{subject.title}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <Button href="/" fullWidth>
                시작하기
              </Button>
            </div>
          </div>
        </section>
      </AuthGuard>
    </>
  );
}
