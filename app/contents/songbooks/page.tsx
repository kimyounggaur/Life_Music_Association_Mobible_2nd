import { ContentCard } from "@/components/ui/ContentCard";
import { RouteShell } from "@/components/ui/RouteShell";
import { contents } from "@/src/data/dummy/catalog";

export default function SongbooksPage() {
  const songbooks = contents.filter((item) => item.type === "songbook");

  return (
    <RouteShell title="연습곡집" description="대상·키·난이도별 연습곡집을 모바일 라이브러리로 탐색합니다.">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {songbooks.map((item) => (
          <ContentCard
            key={item.slug}
            href={`/contents/songbooks/${item.slug.replace(/^songbook-/, "")}`}
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
