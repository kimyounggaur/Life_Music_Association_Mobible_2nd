import { notFound } from "next/navigation";

import { RouteShell } from "@/components/ui/RouteShell";
import { newsItems } from "@/src/data/dummy/routes";

export function generateStaticParams() {
  return newsItems.map((item) => ({ id: item.id }));
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = newsItems.find((newsItem) => newsItem.id === id);

  if (!item) notFound();

  return (
    <RouteShell title={item.title} description={item.date}>
      <div className="rounded-lg border border-line bg-surface p-5 shadow-e1">
        <p className="t-body text-ink-muted">{item.body}</p>
      </div>
    </RouteShell>
  );
}
