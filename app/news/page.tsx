import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { RouteShell } from "@/components/ui/RouteShell";
import { newsItems } from "@/src/data/dummy/routes";

export default function NewsPage() {
  return (
    <RouteShell title="공지·뉴스" description="협회 운영 공지와 콘텐츠 업데이트를 확인합니다.">
      <div className="divide-y divide-line rounded-lg border border-line bg-surface shadow-e1">
        {newsItems.map((item) => (
          <div key={item.id} className="flex min-h-20 items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="t-body-sm font-bold">{item.title}</p>
              <p className="t-caption mt-1 text-ink-muted">{item.date}</p>
            </div>
            <Button href={`/news/${item.id}`} variant="ghost" size="sm" leadingIcon={<ChevronRight size={16} aria-hidden />}>
              보기
            </Button>
          </div>
        ))}
      </div>
    </RouteShell>
  );
}
