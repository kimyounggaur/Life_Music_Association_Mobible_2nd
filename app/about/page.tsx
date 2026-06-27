import { AssetImage } from "@/components/ui/AssetImage";
import { Badge } from "@/components/ui/Badge";
import { DummyNotice } from "@/components/ui/DummyNotice";
import { Section } from "@/components/ui/Section";
import { asset } from "@/src/lib/assets";

const values = ["현장 기반 R&D", "기관 수업 특화", "자격증 강사 지원", "실전 교육 콘텐츠"];

export default function AboutPage() {
  return (
    <>
      <DummyNotice />
      <section className="safe-x py-6">
        <div className="overflow-hidden rounded-xl bg-surface shadow-e1">
          <AssetImage src={asset("brand", "about-mission")} alt="한국생활음악강사협회 소개 이미지" className="h-72 w-full object-cover" priority />
          <div className="p-5">
            <p className="t-label text-primary">ABOUT LMLAK</p>
            <h1 className="t-display mt-2">기관 수업에 특화된 생활음악 강사 협회</h1>
            <p className="t-body mt-3 text-ink-muted">
              협회장과 교육이사가 현장 수업을 병행하며 얻은 R&D를 바탕으로 커리큘럼, 교재, 연습곡집, 수업 자료를 지속 개발합니다.
            </p>
          </div>
        </div>
      </section>

      <Section title="핵심 가치" description="자격증 취득 이후 실제 수업 운영까지 이어지는 지원 구조입니다.">
        <div className="grid gap-3 md:grid-cols-4">
          {values.map((value) => (
            <div key={value} className="rounded-lg border border-line bg-surface p-4 shadow-e1">
              <Badge>{value}</Badge>
              <p className="t-body-sm mt-3 text-ink-muted">강사가 현장에서 바로 활용할 수 있는 체계를 우선합니다.</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="교육 철학" description="생활 속 음악 활동이 기관 수업에서 지속 가능한 경험이 되도록 설계합니다.">
        <div className="grid gap-3">
          {["쉽게 시작하되 수업 품질은 낮추지 않습니다.", "연주보다 수업 운영과 참여 경험을 함께 봅니다.", "교재와 연습곡집은 대상별 수준을 명확히 나눕니다."].map((item, index) => (
            <div key={item} className="flex gap-3 rounded-lg border border-line bg-surface p-4 shadow-e1">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-pill bg-primary-soft font-black text-primary">{index + 1}</span>
              <p className="t-body">{item}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
