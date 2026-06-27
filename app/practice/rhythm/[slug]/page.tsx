import { notFound } from "next/navigation";

import { RouteShell } from "@/components/ui/RouteShell";
import { subjects } from "@/src/data/dummy/catalog";

export function generateStaticParams() {
  return subjects.map((subject) => ({ slug: subject.slug }));
}

export default async function RhythmPracticePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const subject = subjects.find((item) => item.slug === slug);

  if (!subject) notFound();

  return (
    <RouteShell title={`${subject.title} 리듬 연습`} description="패턴을 보고 따라 치는 수업용 리듬 연습 화면입니다.">
      <div className="rounded-lg border border-line bg-surface p-5 shadow-e1">
        <div className="grid grid-cols-8 gap-2">
          {Array.from({ length: 16 }).map((_, index) => (
            <div key={index} className={`aspect-square rounded-md ${index % 4 === 0 ? "bg-primary text-on-primary" : "bg-surface-2"}`} />
          ))}
        </div>
        <p className="t-caption mt-4 text-ink-muted">실제 리듬 엔진과 점수화는 오디오 단계에서 연결합니다.</p>
      </div>
    </RouteShell>
  );
}
