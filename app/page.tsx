import { ArrowRight, BookOpen, GraduationCap, LibraryBig, Music2 } from "lucide-react";
import Link from "next/link";

import { AssetImage } from "@/components/ui/AssetImage";
import { DummyNotice } from "@/components/ui/DummyNotice";
import { Button } from "@/components/ui/Button";
import { ContentCard } from "@/components/ui/ContentCard";
import { Section } from "@/components/ui/Section";
import { SubjectCard } from "@/components/ui/SubjectCard";
import { asset } from "@/src/lib/assets";
import { contents, news, stats, subjects } from "@/src/data/dummy/catalog";

const modules = [
  {
    href: "/certifications",
    title: "자격증 과정",
    description: "과목별 자격 취득 흐름과 커리큘럼을 확인합니다.",
    icon: GraduationCap,
  },
  {
    href: "/contents",
    title: "교육콘텐츠",
    description: "교재와 연습곡집을 표지 중심으로 탐색합니다.",
    icon: LibraryBig,
  },
  {
    href: "/practice",
    title: "연주·실습",
    description: "가상악기, 메트로놈, 리듬 연습 진입점입니다.",
    icon: Music2,
  },
  {
    href: "/lounge",
    title: "강사라운지",
    description: "강사 전용 자료와 기관 매칭을 준비 중입니다.",
    icon: BookOpen,
  },
];

export default function HomePage() {
  return (
    <>
      <DummyNotice />
      <section className="safe-x py-6">
        <div className="grid gap-5 rounded-xl bg-primary-soft p-5 md:grid-cols-[1.2fr_.8fr] md:items-center">
          <div className="space-y-4">
            <p className="t-label text-primary">한국생활음악강사협회</p>
            <h1 className="t-display max-w-xl">현장에서 자란 음악교육, 기관 수업의 표준</h1>
            <p className="t-body text-ink-muted">
              학교·복지관·문화센터·요양시설 수업에 맞춘 자격증 과정과 교육 콘텐츠를 한곳에 모았습니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/certifications">과정 둘러보기</Button>
              <Button href="/about" variant="secondary">
                협회소개
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg bg-surface shadow-e1">
            <AssetImage src={asset("brand", "about-mission")} alt="협회 소개와 엠블럼 이미지" className="h-full max-h-80 w-full object-cover" priority />
          </div>
        </div>
      </section>

      <section className="safe-x grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-line bg-surface p-4 text-center shadow-e1">
            <p className="text-2xl font-black text-primary">{stat.value}</p>
            <p className="t-caption text-ink-muted">{stat.label}</p>
          </div>
        ))}
      </section>

      <Section title="빠른 이동" description="핵심 동선을 모바일 첫 화면에서 바로 시작합니다.">
        <div className="grid gap-3 md:grid-cols-4">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Link key={module.href} href={module.href} className="pressable rounded-lg border border-line bg-surface p-4 shadow-e1">
                <Icon className="mb-4 text-primary" size={28} aria-hidden />
                <h3 className="t-h3">{module.title}</h3>
                <p className="t-body-sm mt-1 text-ink-muted">{module.description}</p>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section
        eyebrow="CERTIFICATION"
        title="자격증 과목 바로가기"
        description="01 Source의 과목 아이콘을 슬러그 경로로 연결했습니다."
        action={
          <Link href="/certifications" className="t-label flex min-h-11 items-center gap-1 text-primary">
            전체 <ArrowRight size={16} />
          </Link>
        }
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {subjects.slice(0, 8).map((subject) => (
            <SubjectCard
              key={subject.slug}
              href={`/certifications/${subject.slug}`}
              title={subject.title}
              summary={subject.summary}
              iconPath={subject.iconPath}
              category={subject.category}
            />
          ))}
        </div>
      </Section>

      <Section title="추천 교육콘텐츠" description="교재와 연습곡집 표지를 3:4 비율 카드로 노출합니다.">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {contents.slice(0, 8).map((content) => (
            <ContentCard
              key={content.slug}
              href={`/contents/${content.slug}`}
              title={content.title}
              coverPath={content.coverPath}
              typeLabel={content.typeLabel}
              meta={[content.instrument, content.target, content.level, content.keyLabel]}
              hasAudio={content.hasAudio}
            />
          ))}
        </div>
      </Section>

      <Section title="공지와 소식" description="실제 운영 공지는 Phase 3 이후 Supabase posts 테이블로 연결됩니다.">
        <div className="divide-y divide-line rounded-lg border border-line bg-surface shadow-e1">
          {news.map((item) => (
            <Link key={item.id} href="/news" className="flex min-h-14 items-center justify-between gap-4 px-4 py-3">
              <span className="t-body-sm font-semibold">{item.title}</span>
              <span className="t-caption shrink-0 text-ink-muted">{item.date}</span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
