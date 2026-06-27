"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { State } from "@/components/ui/State";
import { useSessionState } from "@/src/lib/auth/session";

type AuthGuardProps = {
  children: ReactNode;
  requiredRole?: "member" | "instructor" | "admin";
};

export function AuthGuard({ children, requiredRole = "member" }: AuthGuardProps) {
  const { isConfigured, isLoading, user } = useSessionState();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isConfigured || isLoading || user) return;

    const returnTo = `${window.location.pathname}${window.location.search}`;
    router.replace(`/auth/login?returnTo=${encodeURIComponent(returnTo)}`);
  }, [isConfigured, isLoading, pathname, router, user]);

  if (!isConfigured) {
    return (
      <State
        tone="info"
        title="인증 연결 대기 중"
        description="Supabase 환경 변수가 연결되면 이 화면은 세션을 확인한 뒤 보호 콘텐츠를 보여줍니다."
        action={<Button href="/auth/login">로그인 화면 보기</Button>}
      />
    );
  }

  if (isLoading) {
    return <State tone="loading" title="세션 확인 중" description="로그인 상태를 불러오고 있습니다." />;
  }

  if (!user) {
    return <State tone="info" title="로그인이 필요합니다" description="잠시 후 로그인 화면으로 이동합니다." />;
  }

  if (requiredRole !== "member") {
    return (
      <State
        tone="info"
        title="권한 확인 준비 중"
        description="Phase 3 RLS와 프로필 역할이 연결되면 승인된 강사 권한을 확인합니다."
      />
    );
  }

  return <>{children}</>;
}
