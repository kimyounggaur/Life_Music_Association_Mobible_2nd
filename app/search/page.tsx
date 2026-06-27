import { Search } from "lucide-react";
import Link from "next/link";

import { DummyNotice } from "@/components/ui/DummyNotice";
import { contents, subjects } from "@/src/data/dummy/catalog";

export default function SearchPage() {
  return (
    <>
      <DummyNotice />
      <section className="safe-x py-6">
        <h1 className="t-display">통합 검색</h1>
        <div className="mt-4 flex min-h-12 items-center gap-2 rounded-md border border-line bg-surface px-3 shadow-e1">
          <Search size={18} className="text-ink-muted" aria-hidden />
          <input placeholder="과목, 교재, 연습곡집 검색" className="min-w-0 flex-1 bg-transparent outline-none" />
        </div>
      </section>
      <section className="safe-x pb-6">
        <h2 className="t-h2 mb-3">추천 결과</h2>
        <div className="divide-y divide-line rounded-lg border border-line bg-surface shadow-e1">
          {[...subjects.slice(0, 5).map((item) => ({ href: `/certifications/${item.slug}`, title: item.title, desc: item.summary })), ...contents.slice(0, 5).map((item) => ({ href: `/contents/${item.slug}`, title: item.title, desc: item.typeLabel }))].map((item) => (
            <Link key={item.href} href={item.href} className="block min-h-14 px-4 py-3">
              <p className="t-body-sm font-semibold">{item.title}</p>
              <p className="t-caption text-ink-muted">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
