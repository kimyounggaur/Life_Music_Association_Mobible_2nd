"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { AppHeader } from "@/components/layout/AppHeader";
import { BottomTabBar } from "@/components/layout/BottomTabBar";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthCallback = pathname?.startsWith("/auth/callback");

  return (
    <div className="min-h-screen bg-bg text-ink">
      {!isAuthCallback && <AppHeader pathname={pathname ?? "/"} />}
      <main className="app-page mx-auto w-full max-w-5xl">{children}</main>
      {!isAuthCallback && <BottomTabBar pathname={pathname ?? "/"} />}
    </div>
  );
}
