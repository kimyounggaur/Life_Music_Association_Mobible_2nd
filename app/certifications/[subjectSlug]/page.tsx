import { notFound } from "next/navigation";

import { AssetImage } from "@/components/ui/AssetImage";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ContentCard } from "@/components/ui/ContentCard";
import { DummyNotice } from "@/components/ui/DummyNotice";
import { Section } from "@/components/ui/Section";
import { getSubject, relatedContents } from "@/src/data/dummy/helpers";
import { subjects } from "@/src/data/dummy/catalog";

export function generateStaticParams() {
  return subjects.map((subject) => ({ subjectSlug: subject.slug }));
}

export default async function SubjectDetailPage({ params }: { params: Promise<{ subjectSlug: string }> }) {
  const { subjectSlug } = await params;
  const subject = getSubject(subjectSlug);

  if (!subject) notFound();

  const related = relatedContents(subject.slug);

  return (
    <>
      <DummyNotice />
      <section className="safe-x py-6">
        <div className="grid gap-5 rounded-xl bg-primary-soft p-5 md:grid-cols-[.8fr_1.2fr] md:items-center">
          <div className="grid aspect-square place-items-center rounded-lg bg-surface">
            <AssetImage src={subject.performerPath || subject.iconPath} alt={`${subject.title} 연주자 일러스트`} className="h-[82%] w-[82%] object-contain" priority />
          </div>
          <div>
            <Badge>{subject.category}</Badge>
            <h1 className="t-display mt-3">{subject.title} 자격증 과정</h1>
            <p className="t-body mt-3 text-ink-muted">{subject.description}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href={`/auth/instructor-apply?subject=${subject.slug}`}>자격 신청하기</Button>
              <Button href={`/practice/instrument/${subject.slug}`} variant="secondary">
                바로 연습
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Section title="커리큘럼" description="실제 회차와 시험요건은 Phase 3 시드 데이터로 확정합니다.">
        <div className="grid gap-3">
          {subject.curriculum.map((item, index) => (
            <div key={item} className="rounded-lg border border-line bg-surface p-4 shadow-e1">
              <p className="t-label text-primary">STEP {index + 1}</p>
              <h2 className="t-h3 mt-1">{item}</h2>
              <p className="t-body-sm mt-2 text-ink-muted">지도안, 실습곡, 평가 기준을 함께 다루는 현장형 수업 단위입니다.</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="연계 콘텐츠" description="과목과 연결된 교재·연습곡집 후보입니다.">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {(related.length > 0 ? related : []).map((content) => (
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
    </>
  );
}
