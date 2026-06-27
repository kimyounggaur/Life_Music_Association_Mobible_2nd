import { contents, subjects } from "@/src/data/dummy/catalog";

export function getSubject(slug: string) {
  return subjects.find((subject) => subject.slug === slug);
}

export function getContent(slug: string) {
  return contents.find((content) => content.slug === slug);
}

export function relatedContents(subjectSlug: string) {
  return contents.filter((content) => content.instrument.includes(subjectSlug)).slice(0, 4);
}
