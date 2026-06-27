import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ContentCard } from "@/components/ui/ContentCard";
import { EmptyState, ErrorState, SkeletonCard } from "@/components/ui/State";
import { SubjectCard } from "@/components/ui/SubjectCard";
import { contents, subjects } from "@/src/data/dummy/catalog";

export default function StoriesPage() {
  const subject = subjects[0];
  const content = contents[0];

  return (
    <div className="safe-x space-y-8 py-6">
      <section>
        <h1 className="t-display">Component Stories</h1>
        <p className="t-body text-ink-muted">Phase 1 컴포넌트 상태 카탈로그입니다.</p>
      </section>
      <section className="flex flex-wrap gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Badge>추천</Badge>
        <Badge tone="accent">NEW</Badge>
      </section>
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <SubjectCard href="#" title={subject.title} summary={subject.summary} iconPath={subject.iconPath} category={subject.category} />
        <ContentCard href="#" title={content.title} coverPath={content.coverPath} typeLabel={content.typeLabel} meta={[content.instrument, content.target]} />
        <SkeletonCard />
      </section>
      <EmptyState title="빈 상태" description="아직 표시할 데이터가 없을 때의 상태입니다." />
      <ErrorState />
    </div>
  );
}
