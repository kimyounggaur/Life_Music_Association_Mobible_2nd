"use client";

import { Bell, Search } from "lucide-react";
import Link from "next/link";

import { IconButton } from "@/components/ui/IconButton";

const titles: Array<[RegExp, string]> = [
  [/^\/certifications|^\/courses/, "자격증과정"],
  [/^\/contents/, "교육콘텐츠"],
  [/^\/lounge/, "강사라운지"],
  [/^\/me/, "마이"],
  [/^\/about/, "협회소개"],
  [/^\/auth\/login/, "로그인"],
  [/^\/search/, "검색"],
];

function titleFor(pathname: string) {
  return titles.find(([pattern]) => pattern.test(pathname))?.[1] ?? "LMLAK";
}

export function AppHeader({ pathname }: { pathname: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/95 pt-safe-t shadow-e1 backdrop-blur">
      <div className="safe-x flex min-h-[52px] items-center gap-3">
        <Link href="/" className="flex min-h-11 min-w-11 items-center gap-2 rounded-pill" aria-label="홈으로 이동">
          <span className="grid h-10 w-10 place-items-center rounded-pill bg-primary text-sm font-black text-on-primary">
            L
          </span>
        </Link>
        <div className="min-w-0 flex-1">
          <p className="t-label text-ink-muted">Life Music Lecturer Association</p>
          <h1 className="truncate text-base font-extrabold leading-tight">{titleFor(pathname)}</h1>
        </div>
        <IconButton href="/search" label="검색" icon={<Search size={22} />} />
        <IconButton label="알림" icon={<Bell size={22} />} badge />
      </div>
    </header>
  );
}
