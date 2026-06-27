import { notFound } from "next/navigation";

import { AssetImage } from "@/components/ui/AssetImage";
import { RouteShell } from "@/components/ui/RouteShell";
import { subjects } from "@/src/data/dummy/catalog";

export function generateStaticParams() {
  return subjects.map((subject) => ({ slug: subject.slug }));
}

export default async function PracticeInstrumentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const subject = subjects.find((item) => item.slug === slug);

  if (!subject) notFound();

  return (
    <RouteShell title={`${subject.title} 실습`} description={subject.summary}>
      <div className="grid gap-4 md:grid-cols-[220px_1fr]">
        <div className="rounded-lg border border-line bg-surface p-4 shadow-e1">
          <AssetImage src={subject.iconPath} alt="" className="aspect-square w-full object-contain" sizes="220px" />
        </div>
        <div className="rounded-lg border border-line bg-surface p-5 shadow-e1">
          <h2 className="t-h2">가상악기 셸</h2>
          <p className="t-body-sm mt-2 text-ink-muted">터치 패드, 음원, 저지연 재생은 Phase 7에서 악기별 정책에 맞춰 연결합니다.</p>
          <div className="mt-5 grid grid-cols-4 gap-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <button key={index} type="button" className="pressable aspect-square rounded-md border border-line bg-primary-soft text-sm font-bold text-primary">
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </RouteShell>
  );
}
