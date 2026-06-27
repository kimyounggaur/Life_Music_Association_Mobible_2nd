"use client";

import { BookOpen, GraduationCap, Home, LibraryBig, UserRound } from "lucide-react";
import Link from "next/link";

const tabs = [
  { href: "/", label: "홈", key: "home", icon: Home },
  { href: "/certifications", label: "자격증", key: "certifications", icon: GraduationCap },
  { href: "/contents", label: "콘텐츠", key: "contents", icon: LibraryBig },
  { href: "/lounge", label: "라운지", key: "lounge", icon: BookOpen },
  { href: "/me", label: "마이", key: "me", icon: UserRound },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function BottomTabBar({ pathname }: { pathname: string }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/96 pb-safe-b shadow-e2 backdrop-blur">
      <div className="safe-x mx-auto grid max-w-5xl grid-cols-5">
        {tabs.map((tab) => {
          const active = isActive(pathname, tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.key}
              href={tab.href}
              className="flex min-h-[56px] min-w-16 flex-col items-center justify-center gap-1 rounded-md text-center"
              aria-current={active ? "page" : undefined}
            >
              <Icon
                size={23}
                strokeWidth={active ? 2.4 : 1.8}
                className={active ? "text-primary" : "text-ink-muted"}
                aria-hidden
              />
              <span className={active ? "t-label text-primary" : "t-label text-ink-muted"}>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
