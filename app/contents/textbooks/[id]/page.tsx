import { notFound } from "next/navigation";

import { ContentDetailView } from "@/components/content/ContentDetailView";
import { contents } from "@/src/data/dummy/catalog";

const textbooks = contents.filter((content) => content.type === "textbook");

export function generateStaticParams() {
  return textbooks.map((content) => ({ id: content.slug.replace(/^book-/, "") }));
}

export default async function TextbookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const content = textbooks.find((item) => item.slug === id || item.slug === `book-${id}`);

  if (!content) notFound();

  return <ContentDetailView slug={content.slug} />;
}
