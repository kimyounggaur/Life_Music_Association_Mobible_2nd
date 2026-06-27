import { DummyNotice } from "@/components/ui/DummyNotice";
import { ContentCard } from "@/components/ui/ContentCard";
import { FilterBar } from "@/components/ui/FilterBar";
import { Section } from "@/components/ui/Section";
import { contents } from "@/src/data/dummy/catalog";

export default function ContentsPage() {
  return (
    <>
      <DummyNotice />
      <section className="safe-x py-6">
        <p className="t-label text-primary">CONTENT LIBRARY</p>
        <h1 className="t-display mt-2">교육콘텐츠</h1>
        <p className="t-body mt-2 max-w-2xl text-ink-muted">교재 9종과 연습곡집 표지를 슬러그 매핑으로 연결했습니다.</p>
      </section>
      <Section title="콘텐츠 탐색" description="악기·대상·난이도 필터는 더미 UI이며 정적 경로를 유지합니다.">
        <FilterBar items={["전체", "교재", "연습곡집", "PPT", "시범연주"]} />
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {contents.map((content) => (
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
