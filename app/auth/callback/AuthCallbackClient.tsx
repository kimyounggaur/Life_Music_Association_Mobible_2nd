"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { buildNativeAuthCallback } from "@/src/lib/auth/bridge";
import { getSupabaseBrowserClient, hasSupabaseEnv } from "@/src/lib/supabase/client";

type CallbackStatus = "idle" | "success" | "error" | "unconfigured";

export function AuthCallbackClient() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<CallbackStatus>(hasSupabaseEnv() ? "idle" : "unconfigured");
  const [message, setMessage] = useState("인증 코드를 확인하고 있습니다.");

  const code = searchParams.get("code");
  const nativeHref = useMemo(() => buildNativeAuthCallback(searchParams.toString()), [searchParams]);

  useEffect(() => {
    if (!hasSupabaseEnv()) {
      setStatus("unconfigured");
      setMessage("Supabase 환경 변수가 연결되면 웹 세션 교환까지 자동 처리됩니다.");
      return;
    }

    if (!code) {
      setStatus("idle");
      setMessage("앱에서 열기를 누르면 같은 인증 정보를 네이티브 앱으로 전달합니다.");
      return;
    }

    let mounted = true;
    getSupabaseBrowserClient()
      .auth.exchangeCodeForSession(code)
      .then(({ error }) => {
        if (!mounted) return;
        if (error) {
          setStatus("error");
          setMessage(error.message);
          return;
        }
        setStatus("success");
        setMessage("웹 세션 교환이 완료되었습니다. 앱에서도 이어서 열 수 있습니다.");
      });

    return () => {
      mounted = false;
    };
  }, [code]);

  return (
    <div className="w-full max-w-md rounded-xl border border-line bg-surface p-5 text-center shadow-e2">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-pill bg-primary-soft text-primary">L</div>
      <h1 className="t-h1 mt-5">인증 브리지</h1>
      <p className="t-body-sm mt-2 text-ink-muted">{message}</p>
      {status === "error" && <p className="t-caption mt-2 text-danger">링크가 만료되었거나 이미 사용되었을 수 있습니다.</p>}
      {status === "unconfigured" && <p className="t-caption mt-2 text-ink-muted">현재는 Phase 2 목업 환경입니다.</p>}
      <div className="mt-5 flex flex-col gap-3">
        <Button href={nativeHref} variant="secondary" fullWidth>
          앱에서 열기
        </Button>
        <Button href="/" fullWidth>
          홈으로 이동
        </Button>
      </div>
    </div>
  );
}
