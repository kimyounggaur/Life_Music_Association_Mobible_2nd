import { DummyNotice } from "@/components/ui/DummyNotice";
import { FilterBar } from "@/components/ui/FilterBar";
import { Section } from "@/components/ui/Section";
import { SubjectCard } from "@/components/ui/SubjectCard";
import { subjects } from "@/src/data/dummy/catalog";

export default function CertificationsPage() {
  return (
    <>
      <DummyNotice />
      <section className="safe-x py-6">
        <p className="t-label text-primary">CERTIFICATION</p>
        <h1 className="t-display mt-2">자격증 과정</h1>
        <p className="t-body mt-2 max-w-2xl text-ink-muted">과목 아이콘 20+종을 정적 상세 라우트로 연결했습니다.</p>
      </section>
      <Section title="과목 찾기" description="필터 UI는 Phase 3에서 Supabase 검색과 연결됩니다.">
        <FilterBar items={["전체", "멜로디 악기", "리듬 악기", "밴드", "생활 악기", "앙상블"]} />
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {subjects.map((subject) => (
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
    </>
  );
}
