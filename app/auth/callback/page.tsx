import { Suspense } from "react";

import { AuthCallbackClient } from "@/app/auth/callback/AuthCallbackClient";

export default function AuthCallbackPage() {
  return (
    <main className="safe-x grid min-h-screen place-items-center bg-bg py-10">
      <Suspense fallback={<div className="t-body-sm text-ink-muted">인증 정보를 확인하고 있습니다.</div>}>
        <AuthCallbackClient />
      </Suspense>
    </main>
  );
}
