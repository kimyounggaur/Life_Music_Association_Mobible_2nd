import Link from "next/link";
import { LockKeyhole, NotebookTabs } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { DummyNotice } from "@/components/ui/DummyNotice";
import { Section } from "@/components/ui/Section";

export default function LoungePage() {
  return (
    <>
      <DummyNotice />
      <section className="safe-x py-6">
        <div className="rounded-xl border border-line bg-surface p-5 shadow-e1">
          <div className="grid h-16 w-16 place-items-center rounded-pill bg-primary-soft text-primary">
            <LockKeyhole size={28} aria-hidden />
          </div>
          <h1 className="t-display mt-5">강사라운지는 보호 라우트입니다</h1>
          <p className="t-body mt-3 text-ink-muted">
            Phase 4 인증이 붙으면 승인된 강사만 자료실, 공지, 기관 매칭, 커뮤니티에 접근합니다. 지금은 권한 게이트 화면을 먼저 고정했습니다.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button href="/auth/login">로그인</Button>
            <Button href="/auth/instructor-apply" variant="secondary">
              강사 등록 신청
            </Button>
          </div>
        </div>
      </section>
      <Section title="준비 중인 강사 기능" description="RLS와 다운로드 권한은 Supabase 단계에서 연결합니다.">
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { title: "수업 PPT·교안 자료실", href: "/lounge/resources" },
            { title: "강사 대상 공지", href: "/lounge/notices" },
            { title: "기관 매칭·구인", href: "/lounge/jobs" },
          ].map((item) => (
            <Link key={item.title} href={item.href} className="pressable rounded-lg border border-line bg-surface p-4 shadow-e1">
              <NotebookTabs className="mb-4 text-primary" size={26} aria-hidden />
              <h2 className="t-h3">{item.title}</h2>
              <p className="t-body-sm mt-2 text-ink-muted">강사 승인 후 접근 가능한 영역입니다.</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
