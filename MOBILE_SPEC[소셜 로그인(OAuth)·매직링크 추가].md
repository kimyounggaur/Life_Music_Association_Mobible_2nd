# MOBILE_SPEC.md · Lesson Designer 네이티브 앱(iOS/Android) 사양서

> **목적**: 현재 Next.js + Supabase 웹앱(`lesson-designer`)을 **Capacitor**로 감싸 iOS·Android에서 실제 구동되는 앱으로 출시한다.
> **사용법**: Claude Code / Cursor 등 AI 에이전트 세션에서 `@MOBILE_SPEC.md` 로 이 문서를 항상 참조시킨다. 모바일 관련 작업 프롬프트의 첫 줄에 "이 문서의 규칙을 따라"를 붙인다.
> **원칙**: 한 번에 한 Phase. 각 Phase 끝에서 **빌드 → 시뮬레이터/실기기 실행 → 보고 → 승인**. 한꺼번에 다 시키지 않는다.

---

## 0. 결정 사항 (변경 금지 — 합의된 전제)

| 항목 | 결정 | 이유 |
|---|---|---|
| 네이티브 경로 | **Capacitor** (RN/Expo 재작성 ❌) | 기존 웹 코드(src/) 재활용, 바이브코딩(웹 우선 AI 도구)과 궁합 최상 |
| 빌드 모드 | Next.js **정적 익스포트** (`output: 'export'`) | Capacitor는 정적 파일을 감싼다. 서버 런타임 없음 |
| 데이터 통신 | **클라이언트에서 직접 Supabase 호출** | 서버 액션/서버 컴포넌트 런타임이 사라지므로 |
| 인증 | Supabase Auth (클라이언트 세션 + 딥링크 리디렉트) | 아래 3장 참고 |
| 도메인 특성 | **음악·악기 교육 앱 → 오디오가 1급 기능** | 저지연/백그라운드 재생을 특별 취급 |

---

## 1. 프로젝트 컨텍스트 (AI가 알아야 할 것)

```
[제품] 악기 교육앱·음악 게임앱을 한곳에서 고르는 음악 수업 포털 "Lesson Designer".
[스택] Next.js(App Router) + TypeScript + Tailwind + Supabase(auth/DB) + Vitest. Vercel 배포 중.
[라우트] /  ·  /category/instrument-education  ·  /category/music-game  ·  /signup  ·  /login  ·  /admin-login  ·  /admin
[자산] icons/ , public/icons/ , 아이콘/ (앱 아이콘 소스), screenshots/ , supabase/migrations/
[현재 모바일 관련] middleware.ts 존재(인증 가드 추정) — ⚠️ 정적 익스포트에서 동작 안 함(3장)
```

---

## 2. 하드 규칙 (절대 어기지 말 것)

1. **기능을 깨지 마라.** 라우트·폼 동작·인증 흐름·외부 앱 링크·Supabase 스키마 유지.
2. **기존 코드 재사용 우선.** src/ 컴포넌트를 갈아엎지 말고 Capacitor 호환되게 리스타일/리팩터.
3. **라이브러리 추가 전 먼저 물어라.** 이유·대안·번들 영향 한 줄 설명 후 승인 대기.
4. **한 Phase 범위만.** 관련 없는 리팩터링/파일 이동 금지.
5. **각 Phase 끝에서 멈추고 보고.** 변경 파일·이유·다음 계획 요약 후 승인 대기.
6. **파괴적 변경(삭제·구조 변경) 전 질문.**
7. **매 단계 검증.** `npm run build` + `npx cap sync` + 시뮬레이터 실행으로 에러 0 확인 후 보고.
8. **없는 것 생성 금지.** 없는 앱·링크·이미지를 지어내지 말고, 깨지면 placeholder.

---

## 3. 아키텍처 전환 — Next.js → 정적 익스포트의 함정 ★최우선

Capacitor는 서버가 없으므로 다음이 **모두 깨진다.** AI는 작업 전 이 목록을 점검하고, 해당 부분을 발견하면 **멈추고 보고**한다.

- ❌ **`middleware.ts`** — 정적 익스포트에서 실행 안 됨. 인증 가드를 **클라이언트 라우트 가드**(세션 체크 후 리디렉트)로 이전해야 함.
- ❌ **서버 액션 / 서버 컴포넌트의 런타임 로직** — 클라이언트 컴포넌트 + Supabase JS SDK 직접 호출로 전환.
- ❌ **API Routes (`app/api/*`)** — Supabase 직접 호출 또는 Supabase Edge Function으로 이전.
- ❌ **`next/image` 최적화** — `images.unoptimized = true` 필요.
- ⚠️ **동적 라우트** — `generateStaticParams`로 정적화하거나 클라이언트 라우팅으로.

### 3.1 Supabase 인증 사양 ★OAuth + 매직링크 (확정)

이 앱은 **소셜 로그인(OAuth) + 매직링크**를 쓴다. 모바일에서 이건 가장 까다로운 부분이라 아래를 정확히 따른다.

**핵심 원칙 1 — PKCE 흐름 필수.**
모바일은 implicit flow(토큰을 URL 해시로 전달)가 깨지기 쉽다. 이메일 클라이언트/딥링크 핸들러가 `#fragment`를 잘라먹기 때문이다. 따라서 Supabase 클라이언트를 반드시 `flowType: 'pkce'`로 만든다.

**핵심 원칙 2 — "Email → Website → App" 다단계 리디렉트 (가장 중요).**
매직링크·OAuth 콜백을 custom scheme(`com.lessondesigner://`)으로 **직접** 돌려받으면 두 가지가 깨진다:
- 이메일 스캐너가 링크를 미리 클릭해 1회용 토큰을 소모해버림
- 이메일 앱 내장 브라우저가 PKCE 핸드셰이크를 끊음 (`cannot parse response` 에러)
- iOS의 `SFSafariViewController`는 custom scheme 직접 리디렉트를 신뢰성 있게 못 트리거함 (서버 302 리디렉트는 잘 됨)

→ 해법: **이미 있는 웹사이트(lesson-designer.vercel.app)에 콜백 페이지를 두고** 거기서 앱으로 넘긴다. 흐름: `이메일/OAuth → https://(사이트)/auth/callback (사용자가 "앱에서 열기" 버튼 탭) → com.lessondesigner://auth-callback (딥링크) → 앱이 code를 받아 exchangeCodeForSession`. **이미 운영 중인 도메인이 있다는 게 큰 이점** — 이 브리지 페이지를 그대로 활용한다.

**핵심 원칙 3 — 이메일 템플릿에 custom scheme 직접 넣지 말 것.**
`{{ .SiteURL }}` 등에 `com.lessondesigner://`를 직접 넣으면 Go 보안 필터가 `#ZgotmplZ`로 치환해 링크가 깨진다. 이메일 링크는 **반드시 https 사이트 URL**을 가리키고, custom scheme은 Supabase "Additional Redirect URLs"에 와일드카드(`com.lessondesigner://*`)로 등록한다.

**핵심 원칙 4 — 네이티브 전용 Supabase 클라이언트 분리.**
iOS에서 OAuth가 `SFSafariViewController`를 열면 WKWebView가 백그라운드로 가며 쿠키(=PKCE code_verifier)가 날아갈 수 있다. 쿠키 기반 `@supabase/ssr` 대신, 네이티브용으로 **localStorage 기반 storage + `detectSessionInUrl: false`**를 쓰는 별도 클라이언트를 만든다. (`detectSessionInUrl: false`는 수동 딥링크 처리와의 충돌도 막는다.)

**구현 옵션 (Phase 0에서 선택):**
- **옵션 A — 브라우저 방식(범용):** `signInWithOAuth({ skipBrowserRedirect: true })` → `@capacitor/browser`의 `Browser.open()` → `@capacitor/app`의 `appUrlOpen` 리스너로 딥링크 캐치 → `exchangeCodeForSession`. **OAuth·매직링크 모두 한 패턴으로 처리.** 설정 단순, UX는 브라우저가 한 번 뜸.
- **옵션 B — 네이티브 소셜 플러그인:** `@capgo/capacitor-social-login`으로 네이티브 구글/애플 로그인 → ID 토큰 획득 → `signInWithIdToken()`. UX 최상(네이티브 계정 선택창, 브라우저 안 뜸)이나 제공자별 설정 부담↑. 매직링크는 어차피 옵션 A 패턴 필요.
- **권장:** 매직링크가 있으니 **옵션 A를 기본**으로 깔고, 구글/애플만 옵션 B로 고급화하는 하이브리드도 가능.

**필요 플러그인:** `@capacitor/app`(딥링크 수신), `@capacitor/browser`(OAuth URL 열기), (옵션 B 시)`@capgo/capacitor-social-login`.

**세션 영속:** localStorage 기반 storage로 앱 재실행 시 로그인 유지. `autoRefreshToken: true`, `persistSession: true`.

⚠️ **App Store 규칙:** 구글 등 제3자 소셜 로그인을 제공하면 Apple은 **"Sign in with Apple"도 함께 제공**할 것을 요구한다(심사 거부 사유). 옵션 B의 애플 로그인을 넣거나 최소한 계획에 포함한다.

### 3.2 next.config 최소 형태 (참고)
```js
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // trailingSlash: true,  // 라우팅 깨지면 검토
};
```

---

## 4. 음악 앱 오디오 사양 ★차별점

WebView 안에서도 Web Audio API는 돌지만, 악기 앱은 다음을 별도 요구한다. **시키지 않으면 AI는 `<audio>` 태그로 끝낸다.**

- **저지연 연주**(건반/타격 등 즉시 반응): 지연 누적 시 Capacitor 네이티브 오디오 플러그인 검토. 선택지 2개 + 장단점 제시 후 결정.
- **백그라운드/화면 꺼짐 재생** 필요 여부를 먼저 확인.
- **iOS 무음 스위치**: 무음 모드에서도 소리나야 하면 오디오 세션 카테고리를 `playback`으로 설정.
- **자동재생 정책**: 모바일은 사용자 제스처 후에만 오디오 컨텍스트 활성화 — 첫 탭에서 `AudioContext.resume()`.
- 게임앱(난타/드럼 등)은 타이밍 정확도가 더 중요 → 스케줄링을 `setTimeout`이 아닌 오디오 클럭 기반으로.

---

## 5. 단계별 작업 (Phases) — 순서대로, 체크포인트에서 멈춤

### Phase 0 — 감사 (코드 변경 0)
```
코드는 한 줄도 바꾸지 말고 분석만 해라.
1. 현재 어떤 Next.js 기능이 정적 익스포트와 충돌하는지 전수 조사(3장 기준):
   middleware.ts, 서버 액션/컴포넌트, app/api/*, next/image, 동적 라우트.
2. 오디오 재생 코드 위치와 방식을 모두 찾아 '연주(저지연)' vs '단순 재생'으로 분류(4장).
3. 인증 흐름(로그인 방식·세션 저장·미들웨어 가드) 정리.
충돌·이전 필요 목록을 표로 보고하고 멈춰라. 내가 우선순위를 정한다.
```
**✅ DoD:** 충돌 목록·오디오 목록·인증 흐름 보고, 코드 변경 0.

### Phase 1 — 정적 익스포트 전환
```
Next.js를 output:'export'로 전환하고 웹에서 먼저 깨짐 없이 빌드되게 만든다.
- next.config 수정, next/image unoptimized 처리
- middleware 가드 → 클라이언트 라우트 가드로 이전(인증 정책 유지)
- 서버 액션/API Route → 클라이언트 Supabase 호출(또는 Edge Function)로 이전
한 항목씩 처리하고, 항목마다 npm run build 통과를 확인. 깨지면 멈추고 보고.
```
**✅ DoD:** `npm run build`로 `out/` 정적 산출물 생성, 웹 기능 동등.

### Phase 2 — Capacitor 도입
```
- @capacitor/core, cli, ios, android 설치
- capacitor.config.ts 생성: appId(역도메인 형식), appName, webDir:'out'
- npx cap add ios / android
- npm run build → npx cap sync → iOS 시뮬레이터에서 앱이 뜨는 것까지 확인
빌드/실행 로그와 첫 화면 스크린샷 체크리스트를 보고하고 멈춰라.
```
**✅ DoD:** iOS·Android 시뮬레이터에서 앱 구동(흰 화면이라도 크래시 0).

### Phase 3 — 인증·세션·딥링크 ★(OAuth + 매직링크, 3.1 준수)
```
3.1장의 OAuth + 매직링크 사양을 그대로 구현한다. 순서:
1. custom URL scheme 등록: iOS Info.plist(CFBundleURLTypes) + Android AndroidManifest
   intent-filter(android.intent.action.VIEW). scheme는 appId 기반(com.lessondesigner).
2. Supabase 대시보드 설정 안내(코드 아님): Site URL = 운영 도메인,
   Additional Redirect URLs에 'com.lessondesigner://*' 추가. 내가 직접 등록한다.
3. 네이티브 전용 Supabase 클라이언트 생성: flowType:'pkce', detectSessionInUrl:false,
   persistSession:true, localStorage 기반 storage. (쿠키 기반 ssr 클라이언트와 분리)
4. 웹사이트에 브리지 콜백 페이지(/auth/callback): 사용자 탭으로 앱 딥링크로 넘김
   (이메일 스캐너의 토큰 조기소모 + PKCE 끊김 방지). 이메일 템플릿엔 https URL만.
5. 옵션 A 흐름 구현: signInWithOAuth({skipBrowserRedirect:true}) → @capacitor/browser
   Browser.open → @capacitor/app appUrlOpen 리스너로 딥링크 캐치 → exchangeCodeForSession.
   매직링크도 같은 appUrlOpen 경로로 code 받아 처리.
6. 미들웨어 대체: 클라이언트 라우트 가드로 보호 라우트(/admin 등) 접근 제어.
7. 세션 영속: 앱 재실행 시 로그인 유지(autoRefreshToken).

구현 전 옵션 A/B 중 무엇으로 갈지 먼저 확인하고(매직링크 때문에 A 기본 권장),
필요 플러그인 설치 목록을 보고한 뒤 진행해라.
실기기 테스트 체크리스트를 줘라: ①구글 로그인 ②애플 로그인 ③매직링크 메일→앱 복귀
④로그인 후 앱 종료→재실행 세션 유지 ⑤보호 라우트 미로그인 차단.
(시뮬레이터는 딥링크가 불안정하니 실기기 필수. Android는 adb로 딥링크 단독 테스트 가능.)
```
**✅ DoD:** 구글·애플·매직링크 로그인 모두 실기기에서 앱으로 정상 복귀, 세션 영속, 보호 라우트 정상, 콘솔 에러 0.

### Phase 4 — 네이티브 오디오
```
4장 분류 결과를 바탕으로 오디오를 네이티브 품질로 끌어올린다.
- 저지연 연주가 필요한 부분에 적절한 오디오 처리(플러그인 필요 시 2개 비교 후 승인)
- iOS 오디오 세션 카테고리(playback), 첫 제스처에서 AudioContext 활성화
- 백그라운드 재생 필요 여부에 따라 설정
실기기(iOS/Android 각 1대) 오디오 테스트 체크리스트를 제시.
```
**✅ DoD:** 실기기에서 지연 체감 없는 연주·무음 스위치 대응 확인.

### Phase 5 — 네이티브 셸 (아이콘·스플래시·권한·상태바)
```
- icons/ , 아이콘/ 에셋으로 앱 아이콘·스플래시 생성(iOS/Android 전 사이즈)
- 실제 사용하는 기능에 맞는 권한 설명만 Info.plist / AndroidManifest에 추가
- 상태바/세이프에어리어/노치 대응, 스와이프 백 제스처 점검
- 하드웨어 back 버튼(Android) 동작 정의
멈춰 보고.
```
**✅ DoD:** 아이콘·스플래시 적용, 권한 문구 정상, 노치/세이프에어리어 깨짐 0.

### Phase 6 — 출시 준비 & 심사 대비
```
- 'Apple이 단순 웹뷰 앱을 거부'하는 리스크 점검: 이 앱의 네이티브 가치
  (오프라인 학습 자료, 푸시 알림 등)를 평가하고 부족하면 보완안 제시
- iOS: 번들 ID/서명/Provisioning, App Store Connect 메타데이터 체크리스트
- Android: applicationId/서명 키/Play Console 메타데이터 체크리스트
- 빌드·서명·제출 단계를 플랫폼별 체크리스트로 정리
```
**✅ DoD:** 양 플랫폼 제출 가능한 빌드 + 체크리스트 문서.

---

## 6. 전역 품질 체크리스트
- [ ] `npm run build` + `npx cap sync` 무에러, 양 플랫폼 시뮬레이터 구동.
- [ ] 인증 세션 영속·보호 라우트 정상, 콘솔 에러 0.
- [ ] 오디오: 저지연 연주·무음 스위치·첫 제스처 활성화·(필요 시)백그라운드.
- [ ] 세이프에어리어/노치/상태바/Android back 버튼 대응.
- [ ] 권한 문구는 **실제 쓰는 것만** 명시(미사용 권한 제거 → 심사 리스크↓).
- [ ] 아이콘·스플래시 전 사이즈, 모바일 터치 타깃 44px+.
- [ ] 기존 라우트·외부 링크·Supabase 스키마 보존.

---

## 7. 프롬프트 사용 패턴 (복사용)

**세션 시작(마스터 컨텍스트):**
```
@MOBILE_SPEC.md 의 규칙을 따른다. 확인했으면 "확인"만 답하고 Phase 0 계획을 제시해라.
이후 한 Phase씩, 각 Phase 끝에서 빌드·시뮬레이터 검증 후 보고하고 내 승인을 기다린다.
```

**다음 Phase 진행:**
```
승인한다. @MOBILE_SPEC.md 의 Phase N 을 진행해라. 끝에서 멈추고 보고.
```

**막혔을 때(경로 재확인):**
```
@MOBILE_SPEC.md 0장 결정사항과 3장 함정 목록을 다시 확인하고,
지금 깨지는 원인이 정적 익스포트 전환과 관련 있는지 먼저 진단해라.
```

---

## 8. 최종 수용 기준
- 기존 웹 코드(src/)를 재활용해 iOS·Android에서 실제 구동되는 앱이 빌드된다.
- 정적 익스포트 전환으로 깨졌던 기능(미들웨어 가드·서버 로직)이 클라이언트로 정상 이전됐다.
- 음악 앱답게 오디오가 네이티브 품질(저지연·무음 대응)로 동작한다.
- 인증 세션이 앱 재실행 후에도 유지되고 보호 라우트가 정상이다.
- 아이콘·스플래시·권한·세이프에어리어가 갖춰지고, 양 스토어에 제출 가능한 빌드가 나온다.
- 기존 라우트·외부 링크·Supabase 스키마가 보존되고 콘솔 에러 0.
