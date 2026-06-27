import { notFound } from "next/navigation";

import { ContentDetailView } from "@/components/content/ContentDetailView";
import { contents } from "@/src/data/dummy/catalog";

const songbooks = contents.filter((content) => content.type === "songbook");

export function generateStaticParams() {
  return songbooks.map((content) => ({ id: content.slug.replace(/^songbook-/, "") }));
}

export default async function SongbookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const content = songbooks.find((item) => item.slug === id || item.slug === `songbook-${id}`);

  if (!content) notFound();

  return <ContentDetailView slug={content.slug} />;
}
