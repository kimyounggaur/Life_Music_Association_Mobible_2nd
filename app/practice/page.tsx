import Link from "next/link";
import { Music2, Timer } from "lucide-react";

import { DummyNotice } from "@/components/ui/DummyNotice";
import { Section } from "@/components/ui/Section";
import { SubjectCard } from "@/components/ui/SubjectCard";
import { subjects } from "@/src/data/dummy/catalog";

export default function PracticePage() {
  return (
    <>
      <DummyNotice />
      <section className="safe-x py-6">
        <p className="t-label text-primary">PRACTICE</p>
        <h1 className="t-display mt-2">연주·실습 허브</h1>
        <p className="t-body mt-2 text-ink-muted">Web Audio와 네이티브 오디오는 Phase 7에서 실기기 기준으로 완성합니다.</p>
      </section>
      <Section title="가상악기 진입" description="과목 상세에서도 같은 경로로 연결됩니다.">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {subjects.slice(0, 8).map((subject) => (
            <SubjectCard
              key={subject.slug}
              href={`/practice/instrument/${subject.slug}`}
              title={subject.title}
              summary="사운드 샘플 준비 중"
              iconPath={subject.iconPath}
              category={subject.category}
            />
          ))}
        </div>
      </Section>
      <Section title="타이밍 도구" description="메트로놈은 오디오 클럭 기반 스케줄러로 확장합니다.">
        <div className="grid gap-3 md:grid-cols-2">
          {[
            { title: "메트로놈", icon: Timer, href: "/practice/metronome" },
            { title: "리듬 연습", icon: Music2, href: "/practice/rhythm/drum" },
          ].map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.title} href={tool.href} className="pressable rounded-lg border border-line bg-surface p-4 shadow-e1">
                <Icon className="mb-4 text-primary" size={28} aria-hidden />
                <h2 className="t-h3">{tool.title}</h2>
                <p className="t-body-sm mt-2 text-ink-muted">실제 오디오 엔진 연결 전 UI 자리입니다.</p>
              </Link>
            );
          })}
        </div>
      </Section>
    </>
  );
}
