import { Mail } from "lucide-react";

import { AssetImage } from "@/components/ui/AssetImage";
import { Button } from "@/components/ui/Button";
import { DummyNotice } from "@/components/ui/DummyNotice";
import { asset } from "@/src/lib/assets";

const providers = [
  { key: "google", label: "구글로 계속하기" },
  { key: "apple", label: "Apple로 계속하기" },
  { key: "naver", label: "네이버로 계속하기" },
  { key: "kakao", label: "카카오로 계속하기" },
];

export default function LoginPage() {
  return (
    <>
      <DummyNotice />
      <section className="safe-x mx-auto max-w-md py-6">
        <div className="rounded-xl border border-line bg-surface p-5 shadow-e1">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-pill bg-primary text-xl font-black text-on-primary">L</div>
          <h1 className="t-h1 mt-5 text-center">로그인</h1>
          <p className="t-body-sm mt-2 text-center text-ink-muted">OAuth 4종과 매직링크는 Phase 4에서 Supabase PKCE 흐름으로 연결합니다.</p>
          <div className="mt-6 space-y-3">
            {providers.map((provider) => (
              <Button
                key={provider.key}
                variant="social"
                fullWidth
                leadingIcon={<AssetImage src={asset("social", provider.key)} alt="" className="h-5 w-5 rounded-sm object-contain" sizes="20px" />}
              >
                {provider.label}
              </Button>
            ))}
          </div>
          <div className="my-5 h-px bg-line" />
          <label className="t-label text-ink-muted" htmlFor="email">
            이메일
          </label>
          <div className="mt-2 flex min-h-12 items-center gap-2 rounded-md border border-line bg-surface-2 px-3">
            <Mail size={18} className="text-ink-muted" aria-hidden />
            <input id="email" type="email" inputMode="email" autoComplete="email" placeholder="name@example.com" className="min-w-0 flex-1 bg-transparent outline-none" />
          </div>
          <div className="mt-4">
            <Button fullWidth variant="secondary">
              매직링크 보내기
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
