import { Download, Heart, Play } from "lucide-react";
import { notFound } from "next/navigation";

import { AssetImage } from "@/components/ui/AssetImage";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DummyNotice } from "@/components/ui/DummyNotice";
import { Section } from "@/components/ui/Section";
import { getContent } from "@/src/data/dummy/helpers";

export function ContentDetailView({ slug }: { slug: string }) {
  const content = getContent(slug);

  if (!content) notFound();

  return (
    <>
      <DummyNotice />
      <section className="safe-x grid gap-5 py-6 md:grid-cols-[.85fr_1.15fr] md:items-start">
        <div className="overflow-hidden rounded-lg bg-surface shadow-e1">
          <AssetImage src={content.coverPath} alt={`${content.title} 표지`} className="aspect-[3/4] w-full object-cover" priority />
        </div>
        <div>
          <Badge tone={content.type === "songbook" ? "accent" : "primary"}>{content.typeLabel}</Badge>
          <h1 className="t-display mt-3">{content.title}</h1>
          <p className="t-body mt-3 text-ink-muted">{content.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[content.instrument, content.target, content.level, content.keyLabel].filter(Boolean).map((item) => (
              <Badge key={item} tone="muted">
                {item}
              </Badge>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button leadingIcon={<Play size={18} />} disabled={!content.hasAudio}>
              미리듣기
            </Button>
            <Button leadingIcon={<Download size={18} />} variant="secondary" href="/lounge">
              강사용 다운로드
            </Button>
            <Button leadingIcon={<Heart size={18} />} variant="ghost">
              찜
            </Button>
          </div>
        </div>
      </section>

      <Section title="미리보기 상태" description="오디오·원본 파일이 없는 경우 준비 중 상태를 명시합니다.">
        <div className="rounded-lg border border-line bg-surface p-4 shadow-e1">
          <h2 className="t-h3">샘플 페이지와 백킹 트랙</h2>
          <p className="t-body-sm mt-2 text-ink-muted">
            현재는 표지 자산만 연결되어 있습니다. 실제 PDF, 오디오, 시범연주 파일은 Phase 3 Storage 또는 public 정적 자산 정책 확정 후 연결됩니다.
          </p>
        </div>
      </Section>
    </>
  );
}
