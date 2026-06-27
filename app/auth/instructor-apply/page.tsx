import { Award, MapPin, Phone } from "lucide-react";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { Button } from "@/components/ui/Button";
import { DummyNotice } from "@/components/ui/DummyNotice";
import { subjects } from "@/src/data/dummy/catalog";

export default function InstructorApplyPage() {
  return (
    <>
      <DummyNotice />
      <AuthGuard>
        <section className="safe-x py-6">
          <div className="mx-auto max-w-2xl rounded-xl border border-line bg-surface p-5 shadow-e1">
            <div className="grid h-14 w-14 place-items-center rounded-pill bg-primary-soft text-primary">
              <Award size={26} aria-hidden />
            </div>
            <h1 className="t-h1 mt-4">강사 등록 신청</h1>
            <p className="t-body-sm mt-2 text-ink-muted">강사라운지 접근과 기관 매칭을 위해 기본 프로필과 활동 가능 과목을 확인합니다.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="t-caption text-ink-muted">이름</span>
                <input className="mt-2 h-12 w-full rounded-md border border-line bg-bg px-3 outline-none focus:border-primary" />
              </label>
              <label className="block">
                <span className="t-caption text-ink-muted">연락처</span>
                <div className="mt-2 flex h-12 items-center gap-2 rounded-md border border-line bg-bg px-3">
                  <Phone size={18} className="text-ink-muted" aria-hidden />
                  <input className="min-w-0 flex-1 bg-transparent outline-none" />
                </div>
              </label>
              <label className="block sm:col-span-2">
                <span className="t-caption text-ink-muted">활동 지역</span>
                <div className="mt-2 flex h-12 items-center gap-2 rounded-md border border-line bg-bg px-3">
                  <MapPin size={18} className="text-ink-muted" aria-hidden />
                  <input className="min-w-0 flex-1 bg-transparent outline-none" placeholder="예: 서울, 경기 남부" />
                </div>
              </label>
            </div>
            <div className="mt-5">
              <span className="t-caption text-ink-muted">활동 가능 과목</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {subjects.slice(0, 14).map((subject) => (
                  <button key={subject.slug} type="button" className="pressable min-h-11 rounded-pill border border-line bg-bg px-3 text-sm font-bold">
                    {subject.title}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <Button fullWidth>신청서 저장</Button>
            </div>
          </div>
        </section>
      </AuthGuard>
    </>
  );
}
