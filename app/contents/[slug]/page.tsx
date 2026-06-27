import { notFound } from "next/navigation";

import { ContentDetailView } from "@/components/content/ContentDetailView";
import { contents } from "@/src/data/dummy/catalog";
import { getContent } from "@/src/data/dummy/helpers";

export function generateStaticParams() {
  return contents.map((content) => ({ slug: content.slug }));
}

export default async function ContentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = getContent(slug);

  if (!content) notFound();

  return <ContentDetailView slug={slug} />;
}
