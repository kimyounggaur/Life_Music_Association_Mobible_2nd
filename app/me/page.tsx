import Link from "next/link";
import { Settings, UserRound } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { DummyNotice } from "@/components/ui/DummyNotice";
import { Section } from "@/components/ui/Section";

export default function MePage() {
  return (
    <>
      <DummyNotice />
      <section className="safe-x py-6">
        <div className="rounded-xl border border-line bg-surface p-5 shadow-e1">
          <div className="grid h-16 w-16 place-items-center rounded-pill bg-primary-soft text-primary">
            <UserRound size={30} aria-hidden />
          </div>
          <h1 className="t-display mt-5">내 정보는 로그인 후 이용합니다</h1>
          <p className="t-body mt-3 text-ink-muted">세션 컨텍스트와 보호 라우트가 붙으면 프로필, 자격증, 찜, 다운로드 내역을 관리합니다.</p>
          <div className="mt-5">
            <Button href="/auth/login">로그인으로 이동</Button>
          </div>
        </div>
      </section>
      <Section title="마이 메뉴 자리" description="Phase 4 이후 실제 세션 데이터와 연결됩니다.">
        <div className="divide-y divide-line rounded-lg border border-line bg-surface shadow-e1">
          {[
            { title: "프로필 편집", href: "/me/profile" },
            { title: "내 자격증", href: "/me/certs" },
            { title: "찜한 콘텐츠", href: "/me/favorites" },
            { title: "다운로드 내역", href: "/me/downloads" },
            { title: "알림 설정", href: "/me/notifications" },
            { title: "설정", href: "/me/settings" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="pressable flex min-h-14 items-center gap-3 px-4">
              <Settings size={18} className="text-ink-muted" aria-hidden />
              <span className="t-body-sm font-semibold">{item.title}</span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
