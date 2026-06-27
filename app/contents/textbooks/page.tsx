import { ContentCard } from "@/components/ui/ContentCard";
import { RouteShell } from "@/components/ui/RouteShell";
import { contents } from "@/src/data/dummy/catalog";

export default function TextbooksPage() {
  const textbooks = contents.filter((item) => item.type === "textbook");

  return (
    <RouteShell title="교재" description="협회 수업 현장에 맞춘 교재 표지 자산 9종을 정리했습니다.">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {textbooks.map((item) => (
          <ContentCard
            key={item.slug}
            href={`/contents/textbooks/${item.slug.replace(/^book-/, "")}`}
            title={item.title}
            coverPath={item.coverPath}
            typeLabel={item.typeLabel}
            meta={[item.instrument, item.target, item.level, item.keyLabel]}
            hasAudio={item.hasAudio}
          />
        ))}
      </div>
    </RouteShell>
  );
}
