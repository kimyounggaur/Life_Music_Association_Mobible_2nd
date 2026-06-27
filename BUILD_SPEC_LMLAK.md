# 한국생활음악강사협회(LMLAK) 모바일앱 · 바이브코딩 마스터 프롬프트 — `BUILD_SPEC_LMLAK`

> **목적**: 한국생활음악강사협회(Life Music Lecturer Association of KOREA, **LMLAK**) 모바일앱을
> **기존 웹앱 래핑이 아니라 처음부터(신규 구축)** Next.js + Supabase + Capacitor로 만든다.
> `01 Source` 자산 + 오늘은뮤직(todaymusicgood.com) UX를 원천으로, AI 코딩 에이전트(Claude Code / Cursor)가 **한 Phase씩** 만들게 한다.
>
> **사용법**: AI 에이전트 세션에서 이 문서를 `@BUILD_SPEC_LMLAK.md` 로 항상 물려라. 모든 작업 프롬프트 첫 줄에 "이 문서의 규칙을 따라"를 붙인다.
>
> **이전 사양서와의 관계**: 첨부 `MOBILE_SPEC` 2종의 규율(하드 규칙·정적 익스포트 함정·Phase 체크포인트·복붙 프롬프트·수용 기준)을 **계승**한다. 단, 저 문서들은 "이미 있는 웹앱을 Capacitor로 감싸는" 마이그레이션이고, **이 문서는 빈 폴더에서 앱을 새로 짓는다**. 그래서 Phase 0~2는 "감사·전환"이 아니라 "셋업·디자인 시스템·퍼블리싱"으로 재설계했고, Capacitor 도입은 웹 핵심이 완성된 **Phase 5**로 뒤로 밀었다.

---

## ⓘ 동봉 문서 (바이브코딩 프롬프트 묶음)

이 프로젝트 사양은 **3개 문서**로 구성된다. AI 에이전트 세션에는 **세 문서를 함께** `@`로 물려라.

| 문서 | 역할 | 집중 참조 |
|---|---|---|
| **`@BUILD_SPEC_LMLAK.md`** (이 문서 · 마스터) | 결정사항·하드규칙·아키텍처·인증/오디오·자산 슬러그·스키마·**Phase 0~9 복붙 프롬프트**·수용 기준 | 전 Phase(항상) |
| **`@DESIGN_SYSTEM_LMLAK.md`** (디자인 심화) | 컬러(라이트/다크)·타이포·간격·그림자·**14개 컴포넌트 명세**·모션 토큰 | **Phase 0~1** |
| **`@IA_SCREENS_LMLAK.md`** (화면 심화) | 사이트맵·**17개 화면 상세**·빈/로딩/에러 상태·**6개 사용자 플로우**·권한 매트릭스 | **Phase 2~3** |

**정합성 규칙(SSOT):** 세부가 충돌하면 **이 마스터 문서가 최종 기준**이다. 컴포넌트 깊이는 디자인 시스템 문서를, 화면 깊이는 IA 문서를 따르되 — **탭/라우트 구조·스키마·인증·오디오·Phase 규율은 마스터(3·4·6·7장)를 우선**한다.

---

## 0. 결정 사항 (변경 금지 — 합의된 전제)

| 항목 | 결정 | 이유 |
|---|---|---|
| 제품 | **LMLAK 모바일앱** — 기관 수업 특화 생활음악 강사 협회 앱 | 자격증 강사 지원·교육콘텐츠 제공·기관 매칭이 본질 |
| 구축 방식 | **신규 구축**(빈 레포에서 시작), 래핑 아님 | 재활용할 기존 코드 없음. 처음부터 정적 익스포트·Capacitor 친화 설계 |
| 네이티브 경로 | **Capacitor** (RN/Expo 재작성 ❌) | 웹 코드 그대로 네이티브화, 바이브코딩 궁합 최상 |
| 빌드 모드 | Next.js(App Router) **정적 익스포트**(`output:'export'`, `images.unoptimized:true`) | Capacitor는 정적 파일을 감싼다. 서버 런타임 없음 → **처음부터 서버 의존 코드를 안 짠다** |
| 데이터 | **Supabase(Auth/DB/Storage) 클라이언트 직접 호출** | 서버 액션/서버 컴포넌트 런타임 없음 |
| 인증 | OAuth(구글/애플/네이버/카카오) + 매직링크, **PKCE + 브리지 콜백 딥링크** | 3장 인증 사양 준수 |
| 도메인 특성 | **음악·악기 교육 앱 → 오디오가 1급 기능** | 저지연 연주·타이밍·단순재생을 특별 취급 |
| 자산 | `01 Source`(과목 아이콘·연주자 아이콘·교재·연습곡집·소셜로고·엠블럼) 전 카테고리 활용 | 앱 콘텐츠의 원천. **한글 파일명 → 슬러그 매핑 필수** |
| 참고 UX | todaymusicgood.com(오늘은뮤직) | 모듈형 카드·브랜드스토리·교육철학·컬러 아이덴티티·따뜻한 톤 차용 |

> **신규 구축 Phase 순서(웹 우선 → 네이티브 후행)**: 0 셋업·감사 → 1 디자인 시스템 → 2 정적 골격·핵심 화면(더미) → 3 Supabase 연동·라우트 가드 → 4 인증(웹) → **5 Capacitor 도입** → 6 딥링크 인증(실기기) → 7 네이티브 오디오 → 8 네이티브 셸 → 9 출시 준비.
> 이유: 웹에서 화면·데이터·인증을 먼저 완성해 빠르게 반복하고, 네이티브는 그 위에 얹는다. 각 Phase는 **직전 Phase의 DoD 통과를 전제**한다.

---

## 1. 프로젝트 컨텍스트 (AI가 알아야 할 것)

```
[제품] 한국생활음악강사협회(LMLAK) 모바일앱.
  미션: 기관(학교·복지관·문화센터·요양시설) 수업에 특화된 협회. 협회 자격증을 취득한
  강사가 현장 수업에 쓰도록, 협회장·교육이사가 기관 수업을 병행하며 얻은 현장 R&D로
  커리큘럼·교재·연습곡집·수업용 PPT·시범연주를 지속 개발·제공한다.
[핵심가치] 현장 기반 R&D · 기관 수업 특화 · 자격증 강사 지원 · 실전 교육 콘텐츠.
[타깃] ① 자격증 취득/준비 강사 ② 수강생·강사 지망생 ③ 협회 운영진(교육이사/관리자).
[로고] 원형 '도장형 씰' 엠블럼(다양한 악기 아이콘 원형 배치, 둘레에 영문 협회명).
[스택] Next.js(App Router) + TypeScript + Tailwind + Supabase(Auth/DB/Storage) + Capacitor.
[빌드] output:'export', images.unoptimized:true. 서버 런타임 없음.
[배포] 웹 = Vercel(운영 도메인은 인증 브리지에도 사용). 네이티브 = App Store / Play.
[자산원천] /01 Source : 자격증 과목 아이콘(20+) · 연주자 아이콘 · 교재 표지(9) ·
  연습곡집 표지(81) · ETC Icon(소셜·브랜드) · 협회소개.jpg(미션+엠블럼).
  ⚠️ 파일명이 한글·공백·특수문자 → 빌드 전 슬러그(kebab-case)로 리네이밍+매핑 테이블.
[참고 UX] todaymusicgood.com : 모듈형 카드, 브랜드스토리·교육철학·컬러 아이덴티티,
  콘텐츠 프로그램 구획, 후기/매거진, 정갈한 모바일 IA, 따뜻하고 감성적 톤.
  변주: 지점/가맹 대신 '자격증 과정·강사 지원·교육 콘텐츠·기관 매칭'.
```

---

## 2. 하드 규칙 (절대 어기지 말 것 — 매 Phase 점검)

1. **기능을 깨지 마라.** 이미 완성·승인된 라우트·폼 동작·인증 흐름·외부 링크·**Supabase 스키마**를 후속 Phase에서 깨지 않는다. 직전 Phase의 DoD를 회귀시키면 안 된다.
2. **라이브러리 추가 전 먼저 물어라.** 새 npm 패키지·Capacitor 플러그인을 넣기 전에 **이유·대안·번들/심사 영향 1줄**을 보고하고 승인 대기. (특히 오디오·소셜로그인 플러그인)
3. **한 Phase 범위만.** 지정된 Phase 밖의 리팩터링·파일 이동·"겸사겸사" 개선 금지. 다음 Phase 거리가 보이면 메모만 남기고 진행하지 마라.
4. **파괴적 변경(삭제·구조 변경·스키마 변경·마이그레이션 롤백) 전 질문.** 특히 Supabase 테이블/컬럼/RLS, 라우트 구조, 자산 폴더 구조.
5. **각 Phase 끝에서 멈추고 보고.** 변경 파일·이유·검증 결과·다음 계획을 요약하고 **승인 대기**. 묻지 않은 다음 Phase로 넘어가지 마라.
6. **매 단계 에러 0 검증.** Phase 성격에 맞는 검증을 **반드시 실행하고 로그를 보고**: `npm run build`(빌드 0에러) · `npm run lint`/`tsc --noEmit`(타입 0에러) · 개발서버 콘솔 0에러 · (Capacitor 도입 후)`npx cap sync` 0에러 · 시뮬/실기기 구동. 에러가 남으면 "완료"라고 보고하지 마라.
7. **없는 것 생성 금지.** 존재하지 않는 자산·링크·데이터·API를 지어내지 마라. 자산이 없으면 **명시적 placeholder**(예: `/assets/placeholder.svg`)와 TODO 주석을 남기고 보고한다. 더미데이터는 **반드시 더미라고 표시**(`__DUMMY__` 플래그/주석).
8. **자산은 슬러그화해서만 코드에 넣어라.** `01 Source`의 한글·공백·특수문자 파일명을 **절대 코드/URL에 직접 쓰지 마라.** Phase 0에서 만든 **슬러그 매핑 테이블**을 단일 출처로 삼아 영문 kebab-case 파일만 참조한다. 신규 자산도 같은 규칙.
9. **자산·스키마 보존.** `01 Source` 원본은 읽기 전용 취급(복사만, 원본 수정/삭제 금지). 한 번 합의한 Supabase 스키마/시드는 새 Phase에서 임의로 안 바꾼다(변경 필요 시 규칙 4).
10. **추측 금지·전제 확인.** 운영 도메인, 번들 ID(`com.lmlak.app` 가정값), 협회 실제 연락처/사업자정보/SNS URL, 자격증 과정 실제 커리큘럼 등 **사실 데이터는 모르면 placeholder + 질문**. 지어내지 마라.

---

## 3. 아키텍처 — 정적 익스포트 전제로 "처음부터" 짓기 ★최우선

> 래핑이 아니라 신규 구축이므로 **나중에 전환할 코드가 없다.** 대신 **처음부터 정적 익스포트에서 깨지는 패턴을 쓰지 않는다.** 아래는 "금지 패턴 / 대체 패턴" 가이드다. AI는 코드를 짤 때마다 이 목록을 점검한다.

| 정적 익스포트에서 깨지는 것 (쓰지 말 것) | 처음부터 이렇게 짓는다 |
|---|---|
| `middleware.ts` 인증 가드 | **클라이언트 라우트 가드** 컴포넌트(`<AuthGuard>`): 세션 체크 후 리디렉트 |
| 서버 액션 / 서버 컴포넌트 런타임 로직 | **클라이언트 컴포넌트 + Supabase JS SDK 직접 호출** |
| `app/api/*` (API Routes) | Supabase 직접 호출, 또는 보안 필요 로직은 **Supabase Edge Function** |
| `next/image` 최적화 | `images.unoptimized:true` (정적 `<img>`/`next/image` unoptimized) |
| 동적 라우트(`[id]`) 런타임 렌더 | `generateStaticParams`로 정적화 **또는** 쿼리스트링·클라이언트 라우팅 |
| 쿠키 기반 `@supabase/ssr` 단독 사용 | 네이티브는 **localStorage 기반 별도 클라이언트**(3.1 참고) |

**next.config 최소 형태:**
```js
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // trailingSlash: true,  // 정적 라우팅이 404 나면 검토
};
```

### 3.1 Supabase 인증 사양 ★OAuth(구글/애플/네이버/카카오) + 매직링크 (확정)

모바일 인증은 가장 까다롭다. 아래를 **정확히** 따른다.

- **핵심 1 — PKCE 필수.** Supabase 클라이언트를 `flowType:'pkce'`로 만든다. (implicit flow는 이메일 클라이언트/딥링크가 `#fragment`를 잘라먹어 깨진다.)
- **핵심 2 — "Email/OAuth → Website 브리지 → App" 다단계 리디렉트(가장 중요).** custom scheme(`com.lmlak://`)으로 **직접** 콜백받으면 ①이메일 스캐너가 1회용 토큰 조기소모 ②이메일 내장 브라우저가 PKCE 핸드셰이크를 끊음(`cannot parse response`) ③iOS `SFSafariViewController`가 custom scheme 직접 리디렉트를 신뢰성 있게 못 트리거. → **운영 도메인의 `/auth/callback` 브리지 페이지**에서 사용자가 "앱에서 열기"를 탭 → `com.lmlak://auth-callback` 딥링크 → 앱이 `code`를 받아 `exchangeCodeForSession`.
- **핵심 3 — 이메일 템플릿엔 https URL만.** custom scheme을 템플릿에 직접 넣으면 Go 보안 필터가 `#ZgotmplZ`로 깨뜨린다. custom scheme은 Supabase **Additional Redirect URLs**에 와일드카드(`com.lmlak://*`)로 등록한다.
- **핵심 4 — 네이티브 전용 클라이언트 분리.** iOS OAuth가 `SFSafariViewController`를 열면 WKWebView가 백그라운드로 가며 PKCE `code_verifier`(쿠키)가 날아갈 수 있다. 네이티브용은 **localStorage storage + `detectSessionInUrl:false` + `persistSession:true` + `autoRefreshToken:true`** 의 별도 클라이언트. (쿠키 기반 `@supabase/ssr`와 분리.)
- **구현 옵션:**
  - **옵션 A(범용·기본)**: `signInWithOAuth({ skipBrowserRedirect:true })` → `@capacitor/browser` `Browser.open()` → `@capacitor/app` `appUrlOpen` 리스너로 딥링크 캐치 → `exchangeCodeForSession`. **OAuth 4종 + 매직링크를 한 패턴**으로 처리. (네이버·카카오는 사실상 A 경로만 가능)
  - **옵션 B(고급화)**: `@capgo/capacitor-social-login`으로 네이티브 구글/애플 로그인 → ID 토큰 → `signInWithIdToken()`. UX 최상(브라우저 안 뜸)이나 제공자별 설정 부담↑. 구글/애플만 선택 적용.
- **필요 플러그인**: `@capacitor/app`, `@capacitor/browser`, (옵션 B 시)`@capgo/capacitor-social-login`.
- ⚠️ **Apple 심사 규칙**: 제3자 소셜 로그인(구글/네이버/카카오) 제공 시 Apple은 **'Sign in with Apple' 동반**을 요구(거부 사유). 애플 로그인을 반드시 포함한다.
- **실기기 필수**: 시뮬레이터는 딥링크가 불안정. Android는 `adb`로 딥링크 단독 테스트 가능.

### 3.2 음악 앱 오디오 사양 ★차별점

WebView에서도 Web Audio API는 돌지만 악기 앱은 별도 요구가 있다. **시키지 않으면 AI는 `<audio>` 태그로 끝낸다.**

- **저지연 연주**(음정 타격 → 가상 건반/패드): 칼림바·텅드럼·핸드벨·실로폰·미니하프 = 음정 → 건반/패드. 드럼·난타·컵타·카혼·젬베·장구 = 리듬 → 패드. 지연 누적 시 **네이티브 오디오 플러그인 2개 비교 후 승인**.
- **타이밍 정확도**: 메트로놈·리듬 연습은 `setTimeout`이 아니라 **오디오 클럭 기반 스케줄링**.
- **단순 재생**: 연습곡집 백킹트랙·시범연주 오디오/영상.
- **iOS 무음 스위치** → 무음에서도 소리 필요 시 오디오 세션 카테고리 `playback`. **첫 사용자 제스처에서 `AudioContext.resume()`**. 백그라운드 재생 필요 여부는 먼저 확인.

---

## 4. 디자인 토큰 & 정보구조(IA) 기준

### 4.1 디자인 토큰 (Phase 0에서 확정, 이후 단일 출처)
> 엠블럼의 도장형·따뜻한 톤 + 오늘은뮤직의 감성적 모던함. 아래는 **초기 제안값**이며 Phase 0에서 엠블럼 실제 색을 추출해 확정한다. 확정 후에는 `tailwind.config` + CSS 변수로만 참조(하드코딩 금지).

```
[컬러]  brand-primary(엠블럼 메인, 예: 딥 그린/버건디 계열) ·
        brand-secondary(서브) · brand-accent(포인트) ·
        ink(본문 텍스트) · muted(보조 텍스트) · surface(카드 배경) ·
        bg(앱 배경) · border · success/warning/danger.
[타이포] 한글 가독성 우선(예: Pretendard) + 영문 디스플레이.
        scale: display / h1 / h2 / h3 / body / caption.
[간격]   4px 그리드(space-1=4 ... space-6=24, section-pad).
[라운드] card=16, button=12, pill=full.
[그림자] card(은은), modal.
[모션]   카드 hover/press, 페이지 트랜지션(절제).
[터치]   최소 터치 타깃 44px, 하단 탭바·세이프에어리어 토큰화.
```

### 4.2 정보구조 / 핵심 화면 (Phase 2에서 더미로 퍼블리싱)
하단 탭 5개 기준(모바일 IA). **화면 상세·빈/로딩/에러 상태·6개 사용자 플로우·권한 매트릭스는 `@IA_SCREENS_LMLAK.md`를 단일 출처로 따른다.**

| 탭/라우트 | 화면 | 핵심 내용(자산 출처) |
|---|---|---|
| `/` 홈 | 히어로 + 모듈 카드 | 엠블럼·슬로건, 자격증 과정·교육콘텐츠·공지 바로가기, 추천 연습곡집(표지), **협회소개 진입** |
| `/courses` 자격증과정 | 과목 그리드 → 과목 상세(+연주·실습) | **자격증 과목 아이콘 20+종**, 과정 안내·신청 CTA, 가상악기/시범연주 진입 |
| `/contents` 교육콘텐츠 | 교재·연습곡집·시범연주 라이브러리 | **교재 표지 9 + 연습곡집 표지 81**, 필터(악기/대상/난이도), 백킹 재생 |
| `/lounge` 강사라운지 🔒🎓 | 강사 전용 자료·공지·기관 매칭 | 보호 라우트(강사 인증), 미인증 시 안내 게이트 |
| `/my` 마이 | 로그인·내 과정·찜·설정 | 인증 연동, 보호 라우트 |

- `/about` 협회소개(브랜드스토리·미션·핵심가치·교육철학·운영진, `협회소개.jpg` 원문)는 **홈 헤더/메뉴·마이에서 진입**(탭 아님).
- **연주·실습**(가상악기·메트로놈·리듬·백킹)은 과목 상세(`/courses/[slug]`)·교육콘텐츠에 내장(Phase 7).
- 각 화면은 **빈 상태 / 로딩(스켈레톤) / 에러** 3상태를 반드시 구현.
- 과목 상세에는 **연주자 아이콘** + (Phase 7) 가상 악기/시범연주 진입점.
- `/courses/[slug]`, `/contents/[slug]` 동적 라우트는 `generateStaticParams`로 정적화.
- 비로그인/회원/강사/관리자 **권한별 노출**은 IA 문서 권한 매트릭스를 따른다.

---

## 5. 자산 슬러그 매핑 규칙 (Phase 0 산출물의 핵심)

`01 Source` 전 카테고리를 **빠짐없이** 활용하되, 코드엔 슬러그만 쓴다. Phase 0에서 아래 형식의 **매핑 테이블 파일**(`asset-map.json` + `docs/asset-map.md`)을 생성한다.

**대상 폴더 → 목적지 → 슬러그 컨벤션:**

| 원본 폴더 | 카테고리 | 목적지(public) | 슬러그 컨벤션 | 비고 |
|---|---|---|---|---|
| `자격증 과목 아이콘(Icon)` (20+) | 과목 아이콘 | `/assets/subjects/` | `subject-{영문}.png` | 예: 칼림바→`subject-kalimba`, 텅드럼→`subject-tongue-drum`, 일렉기타→`subject-electric-guitar`, 베이스→`subject-bass-guitar` |
| `연주자 아이콘(Icon)` | 연주자 일러스트 | `/assets/players/` | `player-{영문}.png` | 가창&합창→`player-vocal-choir`, 보컬트레이닝→`player-vocal-training`, 무릎카혼→`player-knee-cajon`, 핸드벨&톤차임→`player-handbell-tonechime` |
| `교재 표지` (9) | 교재 | `/assets/books/` | `book-{영문}.jpg` | 베이스기타 한입→`book-bass-guitar-onebite`, 음악이론→`book-music-theory`, 핸드벨&실로폰→`book-handbell-xylophone` |
| `연습곡집 표지` (81) | 연습곡집 | `/assets/songbooks/` | `songbook-{악기}-{대상}-{키?}-{난이도?}.jpg` | 메타(악기/대상/키/난이도)를 **파일명 토큰 + JSON 필드 둘 다**로. 예: `songbook-guitar-7080-levela`, `songbook-kalimba-17key-beginner`, `songbook-ccm-secondkbd-brass` |
| `ETC Icon` | 소셜·브랜드 | `/assets/social/`, `/assets/brand/` | `social-{provider}.png`, `brand-asset-{n}.png` | google/naver/kakao/**apple(추가필요)**/facebook/instagram/youtube/x/threads/tiktok/linkedin. `자산1~4`→`brand-asset-1..4` |
| 루트 `협회소개.jpg` | 미션·엠블럼 | `/assets/brand/about-mission.jpg` | — | 엠블럼은 별도로 `/assets/brand/emblem.png`로 분리(아이콘/스플래시 원천) |

**규칙:**
- 슬러그는 **영문 소문자 kebab-case**, 공백·`&`·괄호·`[]` 제거(`&`→`and`, 키→`17key`/`21key`, `Level A`→`levela`).
- 확장자는 원본 유지(jpg/png). 투명 PNG는 그대로.
- **매핑 테이블이 단일 출처(SSOT)**: `{ slug, title_ko, category, instrument, target, key, level, src_original, dest_path }`. 연습곡집 81종은 가능한 한 메타를 파싱해 채우되, **불확실하면 빈 값 + TODO**(추측 금지, 규칙 7).
- **누락/중복/판독불가 파일은 표로 보고**하고 placeholder 처리. 원본은 수정·삭제 금지(규칙 9).
- Apple 로고는 `ETC Icon`에 없음 → `social-apple.png` **placeholder + 추가 필요 표시**(규칙 7/10).

---

## 6. Supabase 데이터 모델 — 전체 SQL DDL & RLS 정책 전문 (Phase 3 마이그레이션)

> 이 절은 Phase 3에서 **그대로 적용**할 완성형 스키마다. 변경은 하드 규칙 4/9 적용.
> **구현 절차(Supabase 권장):** `execute_sql`(MCP) 또는 `supabase db query`로 반복 적용 → 확정되면 `supabase db pull <name> --local`로 마이그레이션 파일 생성 → `supabase db advisors`로 보안/성능 점검(미사용 인덱스·RLS 누락 0 확인). **`apply_migration`으로 반복 적용 금지**(매번 히스토리 기록되어 diff가 꼬임).

### 6.0 RLS 베스트프랙티스 (이 스키마가 지키는 규칙)
- 모든 정책에 `(select auth.uid())` **래핑**(초기 플랜 캐싱) + `to anon|authenticated` **역할 명시**.
- `auth.role()` **금지**(익명 로그인 시 무력화) — 역할 분기는 `to` 절 + `private.is_admin()` 헬퍼로.
- **작업별(select/insert/update/delete) 정책 분리.** `UPDATE`는 `using` + `with check` **동시** 지정(소유자 변조 방지).
- `user_metadata`(=`raw_user_meta_data`)는 **인가에 사용 금지**(사용자 수정 가능). 권한 판정은 `profiles.role` + 헬퍼.
- 관리자 판정 함수는 **비공개 `private` 스키마**에 `SECURITY DEFINER`로 둬 `profiles` RLS 재귀를 차단(함수 본문에 `auth.uid()` 기준 검사 포함, anon 정책은 이 함수를 호출하지 않도록 설계).
- **Storage upsert는 INSERT + SELECT + UPDATE** 3종 정책 필요.
- **모든 public 테이블 RLS 활성화** + 역할별 `GRANT`(Data API 노출)를 함께 설정.

### 6.1 확장 · 스키마 · ENUM
```sql
-- 확장
create extension if not exists pgcrypto;        -- gen_random_uuid()

-- 비공개 헬퍼 스키마 (Data API 미노출 → 외부에서 호출 불가)
create schema if not exists private;

-- ENUM 타입
create type public.user_role         as enum ('student','instructor','admin');
create type public.player_kind       as enum ('pitched','percussion');                 -- 가상악기 유형(음정/리듬)
create type public.content_kind      as enum ('book','songbook','demo','ppt');         -- 교재/연습곡집/시범연주/수업PPT
create type public.target_audience   as enum ('lower_grade','youth','adult','7080');   -- 저학년/청소년/성인/7080
create type public.skill_level       as enum ('beginner','intermediate','advanced');   -- 초/중/고
create type public.institution_type  as enum ('school','welfare','culture','care');    -- 학교/복지관/문화센터/요양시설
create type public.match_status      as enum ('open','requested','matched','closed');
create type public.post_type         as enum ('notice','magazine');
create type public.enrollment_status as enum ('applied','in_review','issued','expired','rejected','cancelled');
create type public.device_platform   as enum ('ios','android','web');
```

### 6.2 헬퍼 함수 (private 스키마 · 정책 재귀 차단)
```sql
-- 현재 사용자 역할 (SECURITY DEFINER → profiles RLS 우회로 정책 재귀 방지, search_path 고정)
create or replace function private.current_user_role()
returns public.user_role
language sql stable security definer set search_path = ''
as $$ select role from public.profiles where id = (select auth.uid()) $$;

create or replace function private.is_admin()
returns boolean
language sql stable security definer set search_path = ''
as $$ select coalesce(private.current_user_role() = 'admin', false) $$;

create or replace function private.is_instructor_or_admin()
returns boolean
language sql stable security definer set search_path = ''
as $$ select coalesce(private.current_user_role() in ('instructor','admin'), false) $$;

-- PUBLIC 실행권 회수 후 authenticated에만 부여. (anon 정책에서는 호출하지 않음)
revoke all on function private.current_user_role()        from public;
revoke all on function private.is_admin()                 from public;
revoke all on function private.is_instructor_or_admin()   from public;
grant execute on function private.is_admin()              to authenticated;
grant execute on function private.is_instructor_or_admin() to authenticated;
```

### 6.3 테이블 DDL · 인덱스
```sql
-- 1) 프로필 (auth.users 1:1)
create table public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  role         public.user_role not null default 'student',
  display_name text,
  phone        text,
  region       text,
  bio          text,
  avatar_url   text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- 2) 과목(자격증 과목) — 01 Source '자격증 과목 아이콘' 20+종
create table public.subjects (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  name_ko      text not null,
  name_en      text,
  category     text,                                  -- 멜로디타악/리듬타악/현악/건반/합창/합주
  player_kind  public.player_kind not null default 'percussion',
  icon_slug    text,                                  -- /assets/subjects/{slug}.png
  player_slug  text,                                  -- /assets/players/{slug}.png
  summary      text,
  description  text,
  sort_order   int not null default 0,
  is_active    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- 3) 자격증 과정
create table public.courses (
  id           uuid primary key default gen_random_uuid(),
  subject_id   uuid references public.subjects(id) on delete set null,
  slug         text unique not null,
  title        text not null,
  level        text,
  summary      text,
  description  text,
  curriculum   jsonb not null default '[]'::jsonb,    -- [{week, topic, detail}]
  fee          integer,
  apply_url    text,
  sort_order   int not null default 0,
  is_active    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- 4) 교육 콘텐츠(교재/연습곡집/시범연주/수업PPT) — 교재 9 + 연습곡집 81 등
create table public.contents (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  kind         public.content_kind not null,
  title        text not null,
  subject_id   uuid references public.subjects(id) on delete set null,
  cover_slug   text,                                  -- 표지 (/assets/covers|songbooks/{slug})
  instrument   text,
  audience     public.target_audience,                -- 저학년/청소년/성인/7080
  skill_level  public.skill_level,                    -- 초/중/고
  music_key    text,                                  -- '17key','21key','11key','15key'
  level_label  text,                                  -- 'Level A/B/C'
  media_path   text,                                  -- Storage 'media' 버킷 경로(백킹/시범연주)
  media_type   text,                                  -- 'audio' | 'video'
  is_offline_available boolean not null default false,
  sort_order   int not null default 0,
  is_active    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- 5) 기관
create table public.institutions (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  type         public.institution_type,
  region       text,
  contact      text,                                  -- 민감정보 → RLS로 강사/관리자만 열람
  created_by   uuid references auth.users(id) on delete set null,
  created_at   timestamptz not null default now()
);

-- 6) 기관-강사 매칭 (공개 모집 open → 강사 신청 requested → 매칭 matched)
create table public.matches (
  id             uuid primary key default gen_random_uuid(),
  institution_id uuid not null references public.institutions(id) on delete cascade,
  instructor_id  uuid references auth.users(id) on delete set null,   -- 매칭/신청 강사
  created_by     uuid references auth.users(id) on delete set null,   -- 게시자(보통 admin)
  subjects       text[] not null default '{}',                        -- 과목 slug 배열
  status         public.match_status not null default 'open',
  note           text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- 7) 자격 신청/발급 (마이 → 내 자격증)
create table public.enrollments (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  course_id    uuid not null references public.courses(id) on delete cascade,
  status       public.enrollment_status not null default 'applied',
  applied_at   timestamptz not null default now(),
  issued_at    timestamptz,
  cert_no      text unique,
  expires_at   timestamptz,
  note         text,
  unique (user_id, course_id)
);

-- 8) 찜
create table public.favorites (
  user_id      uuid not null references auth.users(id) on delete cascade,
  content_id   uuid not null references public.contents(id) on delete cascade,
  created_at   timestamptz not null default now(),
  primary key (user_id, content_id)
);

-- 9) 공지/매거진
create table public.posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  type         public.post_type not null default 'notice',
  title        text not null,
  body         text,
  cover_slug   text,
  author_id    uuid references auth.users(id) on delete set null,
  published_at timestamptz,
  is_published boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- 10) 수강후기 (작성자명 스냅샷 → profiles 비노출)
create table public.reviews (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  subject_id   uuid references public.subjects(id) on delete set null,
  author_name  text,
  rating       int not null check (rating between 1 and 5),
  body         text not null,
  is_public    boolean not null default true,
  created_at   timestamptz not null default now()
);

-- 11) 푸시 디바이스 토큰
create table public.device_tokens (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  token        text not null,
  platform     public.device_platform not null,
  updated_at   timestamptz not null default now(),
  unique (user_id, token)
);

-- 인덱스 (FK · 필터 · 정렬)
create index idx_courses_subject      on public.courses(subject_id);
create index idx_contents_subject     on public.contents(subject_id);
create index idx_contents_kind_active on public.contents(kind, is_active);
create index idx_contents_instrument  on public.contents(instrument);
create index idx_subjects_active_sort on public.subjects(is_active, sort_order);
create index idx_matches_institution  on public.matches(institution_id);
create index idx_matches_instructor   on public.matches(instructor_id);
create index idx_matches_status       on public.matches(status);
create index idx_enrollments_user     on public.enrollments(user_id);
create index idx_enrollments_course   on public.enrollments(course_id);
create index idx_favorites_content    on public.favorites(content_id);
create index idx_posts_type_pub       on public.posts(type, is_published, published_at desc);
create index idx_reviews_subject      on public.reviews(subject_id);
create index idx_reviews_user         on public.reviews(user_id);
create index idx_reviews_public       on public.reviews(is_public);
create index idx_device_tokens_user   on public.device_tokens(user_id);
```

### 6.4 트리거 (프로필 자동생성 · updated_at · 역할 보호)
```sql
-- updated_at 자동 갱신
create or replace function public.tg_set_updated_at()
returns trigger language plpgsql security invoker set search_path = ''
as $$ begin new.updated_at = now(); return new; end $$;

create trigger set_updated_at before update on public.profiles for each row execute function public.tg_set_updated_at();
create trigger set_updated_at before update on public.subjects for each row execute function public.tg_set_updated_at();
create trigger set_updated_at before update on public.courses  for each row execute function public.tg_set_updated_at();
create trigger set_updated_at before update on public.contents for each row execute function public.tg_set_updated_at();
create trigger set_updated_at before update on public.posts    for each row execute function public.tg_set_updated_at();
create trigger set_updated_at before update on public.matches  for each row execute function public.tg_set_updated_at();

-- 신규 가입 시 profiles 자동 생성 (OAuth/매직링크 메타에서 이름·아바타 추출)
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name',
             new.raw_user_meta_data->>'name',
             split_part(coalesce(new.email, ''), '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 역할(role) 변경은 관리자 전용 함수로만 → 자가 권한상승 차단
create or replace function public.admin_set_role(target uuid, new_role public.user_role)
returns void language plpgsql security definer set search_path = ''
as $$
begin
  if not private.is_admin() then
    raise exception 'forbidden: admin only';
  end if;
  update public.profiles set role = new_role where id = target;
end $$;
revoke all on function public.admin_set_role(uuid, public.user_role) from public;
grant execute on function public.admin_set_role(uuid, public.user_role) to authenticated;
```

### 6.5 RLS — 활성화 & 정책
```sql
-- 활성화 (모든 public 테이블)
alter table public.profiles      enable row level security;
alter table public.subjects      enable row level security;
alter table public.courses       enable row level security;
alter table public.contents      enable row level security;
alter table public.institutions  enable row level security;
alter table public.matches       enable row level security;
alter table public.enrollments   enable row level security;
alter table public.favorites     enable row level security;
alter table public.posts         enable row level security;
alter table public.reviews       enable row level security;
alter table public.device_tokens enable row level security;

-- ── profiles ── (본인 + 관리자, 역할 컬럼은 GRANT로 보호)
create policy profiles_select_own   on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy profiles_select_admin on public.profiles for select to authenticated using (private.is_admin());
create policy profiles_insert_own   on public.profiles for insert to authenticated with check ((select auth.uid()) = id);
create policy profiles_update_own   on public.profiles for update to authenticated
  using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

-- ── subjects / courses / contents ── (공개 카탈로그: 활성분 anon 읽기, 쓰기 admin)
create policy subjects_select_public on public.subjects for select to anon, authenticated using (is_active);
create policy subjects_admin_all     on public.subjects for all    to authenticated using (private.is_admin()) with check (private.is_admin());

create policy courses_select_public  on public.courses for select to anon, authenticated using (is_active);
create policy courses_admin_all      on public.courses for all    to authenticated using (private.is_admin()) with check (private.is_admin());

create policy contents_select_public on public.contents for select to anon, authenticated using (is_active);
create policy contents_admin_all     on public.contents for all    to authenticated using (private.is_admin()) with check (private.is_admin());

-- ── posts ── (발행분만 공개, 쓰기 admin)
create policy posts_select_public on public.posts for select to anon, authenticated using (is_published);
create policy posts_admin_all     on public.posts for all    to authenticated using (private.is_admin()) with check (private.is_admin());

-- ── reviews ── (공개 후기 anon 읽기 + 본인 CRUD, 삭제는 본인/관리자)
create policy reviews_select_public on public.reviews for select to anon, authenticated using (is_public);
create policy reviews_select_own    on public.reviews for select to authenticated using ((select auth.uid()) = user_id or private.is_admin());
create policy reviews_insert_own    on public.reviews for insert to authenticated with check ((select auth.uid()) = user_id);
create policy reviews_update_own    on public.reviews for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy reviews_delete_own    on public.reviews for delete to authenticated using ((select auth.uid()) = user_id or private.is_admin());

-- ── favorites ── (본인 전용)
create policy favorites_select_own on public.favorites for select to authenticated using ((select auth.uid()) = user_id);
create policy favorites_insert_own on public.favorites for insert to authenticated with check ((select auth.uid()) = user_id);
create policy favorites_delete_own on public.favorites for delete to authenticated using ((select auth.uid()) = user_id);

-- ── enrollments ── (본인 신청/취소·조회, 상태변경/삭제 admin)
create policy enrollments_select_own   on public.enrollments for select to authenticated using ((select auth.uid()) = user_id or private.is_admin());
create policy enrollments_insert_own   on public.enrollments for insert to authenticated
  with check ((select auth.uid()) = user_id and status = 'applied');
create policy enrollments_cancel_own   on public.enrollments for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id and status = 'cancelled');
create policy enrollments_admin_update on public.enrollments for update to authenticated
  using (private.is_admin()) with check (private.is_admin());
create policy enrollments_admin_delete on public.enrollments for delete to authenticated using (private.is_admin());

-- ── institutions ── (강사/관리자 열람, 쓰기 admin)
create policy institutions_select_priv on public.institutions for select to authenticated using (private.is_instructor_or_admin());
create policy institutions_admin_all   on public.institutions for all    to authenticated using (private.is_admin()) with check (private.is_admin());

-- ── matches ──
-- 열람: admin 전체 / 공개 모집(open)은 강사·관리자 / 본인 관련 건(신청 강사·게시자)
create policy matches_select on public.matches for select to authenticated
  using (
    private.is_admin()
    or (status = 'open' and private.is_instructor_or_admin())
    or (select auth.uid()) = instructor_id
    or (select auth.uid()) = created_by
  );
-- 게시(insert)는 admin
create policy matches_insert_admin on public.matches for insert to authenticated with check (private.is_admin());
-- 강사가 공개 모집에 본인을 'requested'로 신청
create policy matches_claim_instructor on public.matches for update to authenticated
  using (status = 'open' and private.is_instructor_or_admin())
  with check (instructor_id = (select auth.uid()) and status = 'requested');
-- admin 전체 수정/삭제
create policy matches_admin_update on public.matches for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy matches_admin_delete on public.matches for delete to authenticated using (private.is_admin());

-- ── device_tokens ── (본인 전용 · upsert)
create policy device_tokens_select_own on public.device_tokens for select to authenticated using ((select auth.uid()) = user_id);
create policy device_tokens_insert_own on public.device_tokens for insert to authenticated with check ((select auth.uid()) = user_id);
create policy device_tokens_update_own on public.device_tokens for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy device_tokens_delete_own on public.device_tokens for delete to authenticated using ((select auth.uid()) = user_id);
```

### 6.6 Storage 버킷 & 정책
```sql
-- 버킷: 공개 자산 / 아바타(공개) / 보호 미디어(signed)
insert into storage.buckets (id, name, public) values
  ('public-assets','public-assets', true),   -- 과목·연주자·표지·소셜·엠블럼
  ('avatars','avatars', true),               -- 프로필 이미지
  ('media','media', false)                   -- 시범연주/백킹(보호, signed URL)
on conflict (id) do nothing;

-- public-assets: 누구나 읽기, 쓰기 admin
create policy storage_public_read on storage.objects for select to anon, authenticated
  using (bucket_id = 'public-assets');
create policy storage_public_admin_write on storage.objects for all to authenticated
  using (bucket_id = 'public-assets' and private.is_admin())
  with check (bucket_id = 'public-assets' and private.is_admin());

-- avatars: 공개 읽기 + 본인 폴더(uid/...) upsert(INSERT+SELECT+UPDATE 필요)
create policy storage_avatars_read on storage.objects for select to anon, authenticated
  using (bucket_id = 'avatars');
create policy storage_avatars_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy storage_avatars_update on storage.objects for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text)
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy storage_avatars_delete on storage.objects for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);

-- media(보호): 로그인 사용자 읽기(앱은 createSignedUrl 사용), 쓰기 admin
create policy storage_media_read on storage.objects for select to authenticated
  using (bucket_id = 'media');
create policy storage_media_admin_write on storage.objects for all to authenticated
  using (bucket_id = 'media' and private.is_admin())
  with check (bucket_id = 'media' and private.is_admin());
```

### 6.7 권한(GRANT) & Data API 노출
> Data API 설정에 따라 새 테이블이 자동 노출되지 않을 수 있다. 역할별 권한을 **명시적으로 부여**하고(행 접근은 RLS가 최종 게이트), `profiles.role`은 컬럼 권한으로 보호한다.
```sql
grant usage on schema public to anon, authenticated;

-- 공개 카탈로그 읽기
grant select on public.subjects, public.courses, public.contents, public.posts, public.reviews to anon, authenticated;

-- 관리자 쓰기 대상(카탈로그/공지) — RLS admin 정책이 행을 통제
grant insert, update, delete on public.subjects, public.courses, public.contents, public.posts to authenticated;

-- 로그인 사용자 데이터
grant select, insert, update, delete on public.reviews, public.favorites, public.enrollments,
                                         public.device_tokens, public.matches, public.institutions to authenticated;

-- profiles: 조회/생성 + '안전 컬럼만' 수정(역할 자가변경 차단)
grant select, insert on public.profiles to authenticated;
revoke update on public.profiles from anon, authenticated;
grant update (display_name, phone, region, bio, avatar_url, updated_at) on public.profiles to authenticated;
```

### 6.8 시드 & 검증
- **시드:** Phase 0의 `asset-map.json` 기준으로 `subjects`(과목 20+) → `contents`(교재 9 + 연습곡집 81) 순서로 **`insert ... on conflict (slug) do update`**(idempotent). 메타 불확실분은 빈 값 + TODO(추측 금지, 하드 규칙 7). `courses`는 과목과 1:N 연결.
- **검증 쿼리 예시:**
```sql
-- ① 익명: 활성 과목만 노출되어야 함(비활성 0건)
set role anon;       select count(*) from public.subjects where is_active = false;  -- 기대: 0
-- ② 타인 데이터 차단: 로그인 A가 B의 enrollment를 못 봄(RLS)
-- ③ 권한상승 차단: authenticated의 profiles.role UPDATE → permission denied
reset role;
```
- **Advisor:** `supabase db advisors`(또는 MCP `get_advisors`)로 **security(노출/RLS 누락)·performance(미사용·중복 인덱스)** 경고 0 확인 후 마이그레이션 커밋.
- **네이버/카카오 주의:** Supabase 기본 제공자가 아니므로 Custom OAuth/Edge Function로 처리(8장). 가입 시 `email`이 비어도 `handle_new_user`가 `display_name`을 안전 생성한다.

### 6.9 권한 매트릭스 (요약)
| 리소스 | anon | student(회원) | instructor(강사) | admin |
|---|---|---|---|---|
| subjects/courses/contents | R(활성) | R(활성) | R(활성) | R(전체)·W |
| posts(공지/매거진) | R(발행) | R(발행) | R(발행) | R(전체)·W |
| reviews(후기) | R(공개) | R(공개)+본인 CUD | 〃 | R 전체·삭제 |
| favorites(찜) | — | 본인 CUD | 본인 CUD | 본인 |
| enrollments(자격신청) | — | 본인 신청/취소·조회 | 〃 | 상태변경·삭제 |
| institutions(기관) | — | — | R | R·W |
| matches(매칭) | — | — | open 열람+신청(requested) | R·W 전체 |
| profiles | — | 본인 R/U(역할 제외) | 〃 | 전체 R + 역할변경(함수) |
| device_tokens | — | 본인 CRUD | 본인 | 본인 |
| Storage `public-assets` | R | R | R | R·W |
| Storage `avatars` | R | 본인 upsert | 본인 upsert | R·W |
| Storage `media` | — | R(로그인·signed) | R | R·W |

> 운영진(admin) 판정은 **클라이언트 라우트 가드 + RLS** 이중. 클라이언트 `service_role` 키 사용 금지(공개 번들 노출 금지) — anon 키만 `NEXT_PUBLIC_*`에 둔다.

---

## 7. 단계별 작업 (Phases) — 순서대로, 체크포인트에서 멈춤

> **공통 규율**: 각 Phase는 직전 Phase의 DoD 통과 전제. 코드블록을 **그대로 복붙**해 에이전트에 준다. 각 Phase 끝에서 검증 명령 실행 → 보고 → 승인.

### Phase 0 — 셋업 · 감사 · 자산 인벤토리 · 디자인 토큰
```
이 문서(@BUILD_SPEC_LMLAK.md)의 규칙을 따른다. Phase 0만 수행하고 끝에서 멈춰 보고해라.

1) 스캐폴드: 빈 폴더에 Next.js(App Router)+TypeScript+Tailwind 프로젝트 생성.
   next.config에 output:'export', images:{unoptimized:true} 적용.
   ESLint+tsconfig strict. Pretendard 등 한글 폰트 셋업. 개발서버가 빈 페이지로 뜨는지 확인.
2) Supabase 클라이언트 골격만 준비: @supabase/supabase-js 설치(설치 전 이유 1줄 보고).
   .env.example에 NEXT_PUBLIC_SUPABASE_URL/ANON_KEY 키만 정의(실제 값은 내가 넣는다).
   아직 호출은 하지 않는다.
3) 자산 인벤토리 + 슬러그 매핑(5장 규칙):
   - /01 Source 전 폴더를 스캔해 파일 목록을 카테고리별로 집계(개수 포함).
   - 5장 컨벤션대로 슬러그를 부여한 asset-map.json + docs/asset-map.md 생성.
   - 원본은 절대 수정/삭제하지 말고, 슬러그 파일로 /public/assets/** 에 복사하는
     매핑만 만든다(실제 복사 스크립트 scripts/slugify-assets.* 작성, 실행은 보고 후).
   - 판독불가/누락/중복/메타불확실 파일은 표로 보고하고 placeholder 표시. 추측 금지.
   - Apple 소셜로고 부재 등 '추가 필요' 항목을 명시.
4) 디자인 토큰(4.1): 엠블럼(협회소개.jpg / emblem)에서 실제 컬러를 추출해 제안하고,
   tailwind.config + CSS 변수로 토큰화. 색·타이포·간격·라운드·터치타깃 정의.
5) 라우트/IA 초안(4.2)과 Supabase 스키마 초안(6장)을 '문서로만' 정리(코드 구현 금지).

검증: npm run build 통과(빈 앱), tsc/lint 0에러, 개발서버 콘솔 0에러.
보고: 자산 집계표 · 슬러그 매핑 요약 · 누락/추가필요 목록 · 확정 토큰 · IA/스키마 초안.
```
**✅ DoD:** 스캐폴드 빌드 0에러 / `asset-map.json`+문서 생성 / 슬러그 복사 스크립트 준비 / 디자인 토큰 확정 / IA·스키마 초안 문서화 / 누락·추가필요 목록 보고. **코드 화면 구현은 아직 없음.**

---

### Phase 1 — 디자인 시스템 / 컴포넌트 라이브러리 (스토리 화면)
```
@BUILD_SPEC_LMLAK.md 규칙 준수. Phase 1만. 끝에서 멈춰 보고.

Phase 0의 토큰으로 재사용 컴포넌트 라이브러리를 만든다(데이터 연동·실화면 금지).
상세 토큰·14개 컴포넌트 명세·모션은 @DESIGN_SYSTEM_LMLAK.md 를 단일 출처로 따른다.
1) 프리미티브: Button(variants/sizes, 44px+), IconButton, Tag/Pill, Card,
   Input/Select/Textarea, Badge, Avatar, Skeleton, Spinner, EmptyState, ErrorState,
   Modal/Sheet, Toast, BottomTabBar, AppHeader, SafeArea 래퍼.
2) 도메인 컴포넌트(더미 props): SubjectCard(과목 아이콘), PlayerBadge(연주자 아이콘),
   ContentCard(교재/연습곡집 표지+메타), CourseCard, SectionHeader, HeroBlock,
   FilterBar(악기/대상/난이도).
3) 모든 컴포넌트의 빈/로딩/에러 상태 포함.
4) /dev/stories 같은 내부 스토리 페이지에 컴포넌트들을 한 화면에 카탈로그로 렌더
   (Phase 0 슬러그 자산 일부를 placeholder로 사용). 이 페이지는 출시 빌드에서 제외 가능하게.
5) 접근성: 색대비, focus-visible, 터치타깃, 의미적 마크업/aria.

검증: npm run build 통과, tsc/lint 0에러, /dev/stories 콘솔 0에러, 스크린샷 체크리스트.
보고: 컴포넌트 목록·변형·상태, 스토리 페이지 스크린샷 체크리스트, 접근성 점검.
```
**✅ DoD:** 프리미티브+도메인 컴포넌트가 토큰만으로 구현(하드코딩 색·간격 0) / 빈·로딩·에러 상태 존재 / 스토리 카탈로그 렌더 / 빌드·타입·콘솔 0에러 / 접근성 기준 충족.

---

### Phase 2 — 정적 골격 + 라우팅 + 더미데이터로 핵심 화면 퍼블리싱
```
@BUILD_SPEC_LMLAK.md 규칙 준수. Phase 2만. 끝에서 멈춰 보고. (아직 Supabase 연동 금지)

4.2 IA대로 핵심 화면을 더미데이터로 퍼블리싱한다.
1) 레이아웃: AppHeader + BottomTabBar(홈/자격증과정/교육콘텐츠/강사라운지/마이) +
   SafeArea. 라우트: / , /about , /courses , /courses/[slug] , /contents ,
   /contents/[slug] , /lounge , /my (+ /login 스텁).
   ※ 화면별 상세 구성·빈/로딩/에러 상태·플로우·권한은 @IA_SCREENS_LMLAK.md 를 따른다.
2) 더미데이터 레이어: src/data/dummy/*.ts 에 subjects/courses/contents/posts 목업.
   반드시 __DUMMY__ 표시. 자산은 Phase 0 슬러그 경로만 사용.
3) 화면 구현(각 화면 빈/로딩/에러 3상태):
   - 홈: 히어로(엠블럼·슬로건) + 모듈 카드(과정/콘텐츠/공지/추천 연습곡집).
   - 협회소개: 협회소개.jpg 미션 원문 기반 브랜드스토리·미션·핵심가치·교육철학·운영진.
   - 자격증과정: 과목 아이콘 그리드 → /courses/[slug] 상세(연주자 아이콘, 과정 안내, 신청 CTA placeholder).
   - 교육콘텐츠: 교재+연습곡집 라이브러리, FilterBar(악기/대상/난이도), 표지 그리드 → 상세.
   - 마이: 로그인 안내(스텁)·메뉴·설정 자리.
   - 강사라운지(/lounge): 보호 라우트 자리(미인증 안내 게이트), 강사 자료·공지·기관 매칭 placeholder.
4) 동적 라우트는 generateStaticParams로 정적화(더미 slug 기준). 외부 링크는 placeholder.
5) 반응형·모바일 우선, 터치타깃 44px+, 따뜻한 톤(오늘은뮤직 참고, 가맹/지점은 제외).

검증: npm run build로 out/ 생성, 모든 라우트 정적 산출 확인, tsc/lint·콘솔 0에러.
보고: 라우트 맵, 화면별 스크린샷 체크리스트, 더미데이터 위치, 정적화 결과.
```
**✅ DoD:** 5개 핵심 화면 + 동적 상세가 더미로 렌더 / 모든 라우트 정적 익스포트(`out/`) 성공 / 각 화면 빈·로딩·에러 3상태 / 자산은 슬러그 경로만 / 빌드·타입·콘솔 0에러.

---

### Phase 3 — Supabase 스키마/시드/RLS + 데이터 연동 + 클라이언트 라우트 가드
```
@BUILD_SPEC_LMLAK.md 규칙 준수. Phase 3만. 끝에서 멈춰 보고.
스키마 변경·마이그레이션은 파괴적 변경 규칙(4) 적용: 확정 전 내 승인.

1) 스키마 마이그레이션(6장 기준): supabase/migrations/ 에 테이블·인덱스·RLS 작성.
   모든 테이블 RLS on. 공개 콘텐츠 anon SELECT, 쓰기 admin, 본인 데이터만 CRUD 정책.
   profiles 자동생성 트리거(auth.users→profiles).
2) 시드: Phase 0 asset-map 기반으로 subjects(과목 20+)·contents(교재9·연습곡집81)
   시드 데이터 생성. 슬러그/메타를 매핑 테이블에서 가져오고, 불확실 메타는 빈 값+TODO(추측 금지).
3) Storage: public 버킷에 슬러그 자산 업로드(또는 /public 정적 유지 중 택1 보고).
4) 데이터 연동: Phase 2 더미를 Supabase 클라이언트 직접 호출로 교체.
   네이티브 대비를 위해 클라이언트 생성은 src/lib/supabase/ 에 분리(웹용/추후 네이티브용 자리).
   로딩=스켈레톤, 에러=ErrorState, 빈=EmptyState 연결. 더미 플래그 제거.
5) 클라이언트 라우트 가드(<AuthGuard>): /my 등 보호 라우트는 세션 없으면 /login 리디렉트.
   (middleware 사용 금지 — 정적 익스포트). 인증 자체는 Phase 4에서. 지금은 가드 골격+세션조회.

검증: npm run build, tsc/lint·콘솔 0에러. RLS 정책을 anon/로그인 두 경우로 점검 보고.
보고: 마이그레이션 파일·정책 요약, 시드 결과 수치, 연동된 화면 목록, 가드 동작.
```
**✅ DoD:** 마이그레이션으로 스키마+RLS 적용 / 과목·콘텐츠 시드 완료 / 핵심 화면이 실제 Supabase 데이터로 렌더(더미 제거) / 빈·로딩·에러 상태 실데이터 연동 / 라우트 가드 골격 동작 / RLS anon·로그인 점검 / 빌드·타입·콘솔 0에러.

---

### Phase 4 — 인증 (OAuth 4종 + 매직링크, PKCE, 브리지 콜백) — **웹 먼저**
```
@BUILD_SPEC_LMLAK.md 3.1 인증 사양을 그대로 구현한다. Phase 4만, 웹 환경에서 먼저. 끝에서 멈춰 보고.
라이브러리/제공자 설정 전 이유·영향 1줄 보고 후 승인.

1) Supabase 클라이언트 인증 설정: flowType:'pkce', persistSession:true,
   autoRefreshToken:true. 웹용과 (추후)네이티브용 클라이언트를 src/lib/supabase에서 분리 설계.
2) 로그인 화면(/login): 구글·애플·네이버·카카오 OAuth 버튼(소셜 로고는 슬러그 자산,
   apple은 placeholder 표시) + 매직링크(이메일 입력). signInWithOAuth / signInWithOtp 사용.
3) 브리지 콜백 페이지(/auth/callback): code를 받아 exchangeCodeForSession,
   성공 시 세션 저장·리디렉트. 웹에서는 직접 콜백, 네이티브 딥링크 분기는 Phase 6에서 추가할 자리만 마련.
   ⚠️ 이메일 템플릿/Redirect URL은 https만(custom scheme은 Phase 6). 코드에 custom scheme 직접 금지.
4) 세션 컨텍스트/훅(useSession): 앱 전역 세션 상태, 로그인/로그아웃, 보호 라우트 가드 연동.
5) Apple 심사 대비: 'Sign in with Apple' 버튼을 반드시 포함(제3자 소셜 동반 요구).
6) Supabase 대시보드 설정은 '안내만'(코드 아님): provider 키, Site URL=운영 도메인,
   Redirect URLs. 실제 등록은 내가 한다.

검증: npm run build·tsc/lint·콘솔 0에러. 웹 브라우저에서 ①매직링크 ②가능한 OAuth 로그인→
   세션 저장→새로고침 유지→로그아웃, ③보호 라우트 미로그인 차단을 테스트하고 체크리스트 보고.
보고: 인증 흐름도, 변경 파일, 대시보드 설정 안내값, 웹 테스트 결과, 네이티브에서 추가할 항목 메모.
```
**✅ DoD:** 웹에서 매직링크 + OAuth 로그인/로그아웃/세션유지 동작 / 'Sign in with Apple' 포함 / `/auth/callback` 브리지 작동 / 보호 라우트 차단 / 이메일·Redirect는 https만 / 빌드·타입·콘솔 0에러. **네이티브 딥링크는 다음 단계.**

---

### Phase 5 — Capacitor 도입 (ios/android add, config, sync, 시뮬 구동)
```
@BUILD_SPEC_LMLAK.md 규칙 준수. Phase 5만. 끝에서 멈춰 보고. 플러그인 설치 전 이유·영향 1줄.

웹 핵심(화면·데이터·웹인증)이 완성됐으니 Capacitor로 네이티브화한다.
1) @capacitor/core, @capacitor/cli, @capacitor/ios, @capacitor/android 설치.
2) capacitor.config.ts: appId='com.lmlak.app'(확정값 내게 확인), appName='LMLAK',
   webDir:'out'. 정적 익스포트 산출물을 감싼다.
3) npx cap add ios / android. .gitignore·플랫폼 폴더 정리.
4) npm run build → npx cap sync. iOS 시뮬레이터/Android 에뮬레이터에서 앱이 뜨고
   Phase 2~3 화면이 보이는지 확인(딥링크 인증은 아직, 웹 콜백 기반 동작 한계 기록).
5) 정적 자산 경로·라우팅이 file:// 환경에서 깨지지 않는지 점검(필요 시 trailingSlash 검토).

검증: npm run build·npx cap sync 0에러, 양 플랫폼 시뮬/에뮬 구동(크래시 0), 콘솔 0에러.
보고: 설치 플러그인, config 값, 빌드·sync 로그, 시뮬 첫화면 스크린샷 체크리스트, 알려진 한계.
```
**✅ DoD:** Capacitor 설치 + ios/android 플랫폼 추가 / `cap sync` 0에러 / 양 플랫폼 시뮬레이터에서 앱 구동(핵심 화면 표시, 크래시 0) / 정적 라우팅·자산 경로 정상 / 콘솔 0에러.

---

### Phase 6 — 딥링크 인증 실기기 완성 (옵션 A 기본, 옵션 B 고급화 판단)
```
@BUILD_SPEC_LMLAK.md 3.1을 네이티브에서 완성한다. Phase 6만. 끝에서 멈춰 보고. 실기기 필수.
옵션 A/B 선택을 먼저 보고(매직링크 때문에 A 기본 권장). 플러그인 설치 전 이유·영향 1줄.

1) custom scheme 등록: iOS Info.plist(CFBundleURLTypes) + Android Manifest intent-filter
   (VIEW). scheme='com.lmlak'(appId 기반). 딥링크 com.lmlak://auth-callback 수신.
2) 네이티브 전용 Supabase 클라이언트: localStorage storage, detectSessionInUrl:false,
   persistSession:true, autoRefreshToken:true (웹/쿠키 클라이언트와 분리).
3) 브리지 흐름 완성: 운영 도메인 /auth/callback(Phase4) → '앱에서 열기' →
   com.lmlak://auth-callback 딥링크 → 앱이 code 받아 exchangeCodeForSession.
   이메일 템플릿/Redirect는 https만, custom scheme은 Supabase Additional Redirect URLs에
   와일드카드(com.lmlak://*)로 등록(내가 등록, 너는 안내).
4) 옵션 A 구현: signInWithOAuth({skipBrowserRedirect:true}) → @capacitor/browser Browser.open
   → @capacitor/app appUrlOpen 리스너 → exchangeCodeForSession. 매직링크도 같은 appUrlOpen 경로.
5) (선택)옵션 B 고급화 판단: 구글/애플만 @capgo/capacitor-social-login → signInWithIdToken.
   장단점·설정부담 보고 후 적용 여부 결정. Apple 로그인은 필수 유지.
6) 세션 영속: 앱 종료→재실행 로그인 유지.

검증: npx cap sync 0에러. 실기기 체크리스트로 보고:
  ①구글 ②애플 ③네이버 ④카카오 ⑤매직링크 메일→앱 복귀 ⑥종료→재실행 세션유지
  ⑦보호 라우트 미로그인 차단. (Android는 adb로 딥링크 단독 테스트도 첨부.)
보고: scheme 등록 내용, 네이티브 클라이언트 설정, 옵션 A/B 결정, 실기기 결과표.
```
**✅ DoD:** 실기기에서 OAuth 4종 + 매직링크가 앱으로 정상 복귀 / 'Sign in with Apple' 동작 / 세션 영속(종료→재실행 유지) / 보호 라우트 정상 / custom scheme·브리지 정상 / `cap sync`·콘솔 0에러.

---

### Phase 7 — 네이티브 오디오 (저지연 / 타이밍 / 단순 재생)
```
@BUILD_SPEC_LMLAK.md 3.2 오디오 사양을 구현한다. Phase 7만. 끝에서 멈춰 보고. 실기기 필수.
오디오 플러그인 도입 시 후보 2개 비교 후 승인.

1) 분류 구현:
   - 저지연 음정(칼림바·텅드럼·핸드벨·실로폰·미니하프): 가상 건반/패드 즉시 반응.
   - 저지연 리듬(드럼·난타·컵타·카혼·젬베·장구): 패드 타격 즉시 반응.
   - 타이밍(메트로놈·리듬연습): 오디오 클럭 기반 스케줄링(setTimeout 금지).
   - 단순재생(연습곡집 백킹/시범연주): 안정 재생.
2) Web Audio로 먼저 구현하고 실기기 지연을 측정. 누적 지연 시 네이티브 오디오 플러그인
   후보 2개를 장단점·번들·심사영향과 함께 비교 보고 후 채택.
3) iOS: 무음 스위치 대응(오디오 세션 카테고리 playback 필요 여부 확인), 첫 사용자 제스처에서
   AudioContext.resume(), 백그라운드 재생 필요 여부 확인.
4) 과목 상세/콘텐츠에 연주·재생 UI 연결(Phase 2~3 화면 위에).

검증: 실기기(iOS/Android 각 1대) 지연 체감·무음 스위치·첫 제스처·타이밍 정확도 체크리스트.
보고: 오디오 구조, 플러그인 결정 근거, 실기기 측정 결과.
```
**✅ DoD:** 실기기에서 저지연 연주(음정·리듬) 지연 체감 없음 / 메트로놈·리듬 타이밍 정확 / 단순 재생 안정 / iOS 무음 스위치·첫 제스처 활성화 대응 / 콘솔 0에러.

---

### Phase 8 — 네이티브 셸 (아이콘·스플래시·권한·세이프에어리어·back·푸시)
```
@BUILD_SPEC_LMLAK.md 규칙 준수. Phase 8만. 끝에서 멈춰 보고. 플러그인 추가 시 이유·영향 1줄.

1) 아이콘·스플래시: 엠블럼(emblem.png)으로 iOS/Android 전 사이즈 생성·적용
   (생성 도구 사용 시 보고). 안전영역 고려.
2) 권한 최소화: 실제 쓰는 기능에만 권한 문구 추가(Info.plist/AndroidManifest).
   미사용 권한 제거(심사 리스크↓). 오디오/푸시 등 실제 사용분만.
3) 세이프에어리어/노치/상태바 점검, iOS 스와이프 백, Android 하드웨어 back 동작 정의.
4) 푸시 알림(네이티브 가치 확보용): 도입 여부·플러그인을 먼저 보고 후 결정.
   공지/매거진 알림 시나리오. 토큰 등록·권한 흐름.
5) 터치 타깃 44px+ 전역 점검.

검증: npx cap sync 0에러, 양 플랫폼 시뮬/실기기에서 아이콘·스플래시·세이프에어리어·back·
   (도입 시)푸시 동작 체크리스트.
보고: 적용 아이콘/스플래시, 권한 목록(사용 근거), back/세이프에어리어 결과, 푸시 결정.
```
**✅ DoD:** 엠블럼 기반 아이콘·스플래시 전 사이즈 적용 / 권한은 실사용만 명시 / 세이프에어리어·노치·상태바·양 플랫폼 back 정상 / 터치타깃 44px+ / (도입 시)푸시 동작 / `cap sync`·콘솔 0에러.

---

### Phase 9 — 출시 준비 (심사 대비, 양 스토어 체크리스트, 베타)
```
@BUILD_SPEC_LMLAK.md 규칙 준수. Phase 9만. 끝에서 멈춰 보고.

1) Apple '단순 웹뷰 거부' 리스크 방어: 이 앱의 네이티브 가치 점검·보강
   (오프라인 학습자료/푸시/네이티브 오디오 등). 부족하면 보완안 제시.
2) iOS: 번들 ID(com.lmlak.app)·서명·Provisioning·App Store Connect 메타데이터
   (스크린샷·설명·개인정보·로그인 데모 계정) 체크리스트.
3) Android: applicationId·서명키·Play Console 메타데이터·데이터 안전 양식 체크리스트.
4) 'Sign in with Apple' 포함 확인(제3자 소셜 동반 요구), 개인정보처리방침/약관 링크 준비.
5) 베타: TestFlight / Play 내부 테스트 트랙 절차 정리.
6) 전역 품질 체크리스트(8장) 전수 점검 결과 표.

검증: 양 플랫폼 릴리스 빌드 산출(서명 포함), 8장 체크리스트 통과 보고.
보고: 플랫폼별 제출 체크리스트, 리스크·보완안, 베타 트랙 안내.
```
**✅ DoD:** 양 플랫폼 제출 가능한 서명 빌드 / 스토어 메타데이터 체크리스트 완비 / 'Sign in with Apple' 포함 / 네이티브 가치 방어 근거 / 8장 전역 품질 체크리스트 통과 / 베타 트랙 준비.

---

## 8. 전역 품질 체크리스트 (매 Phase·최종 점검)
- [ ] `npm run build`(+`npx cap sync`) **무에러**, 양 플랫폼 시뮬레이터/에뮬레이터 구동.
- [ ] `tsc --noEmit` / lint **0에러**, 개발서버·실행 **콘솔 에러 0**.
- [ ] 인증 **세션 영속**(앱 재실행 유지) · **보호 라우트** 정상(클라이언트 가드).
- [ ] OAuth 4종 + 매직링크 실기기 복귀 · **PKCE·브리지·custom scheme** 정상 · 'Sign in with Apple' 포함.
- [ ] 오디오: 저지연 연주(음정·리듬) · 타이밍(오디오 클럭) · 단순재생 · **무음 스위치·첫 제스처 활성화**.
- [ ] **세이프에어리어/노치/상태바** · iOS 스와이프 백 · Android 하드웨어 **back**.
- [ ] **권한 최소화**(실사용만 명시, 미사용 제거).
- [ ] **아이콘·스플래시** 전 사이즈(엠블럼 기반).
- [ ] **터치 타깃 44px+** 전역.
- [ ] **자산 슬러그화 보존**(한글 파일명 직접참조 0, asset-map SSOT) · **Supabase 스키마/시드/RLS 보존**.
- [ ] 각 화면 **빈/로딩/에러 3상태** 구현.
- [ ] **접근성**: 색대비, focus-visible, aria/의미적 마크업, 키보드.
- [ ] 외부 링크·라우트·스키마 **보존**, 더미데이터 잔존 0(`__DUMMY__` 제거).

---

## 9. 프롬프트 사용 패턴 (복붙용)

**세션 시작(마스터 컨텍스트):**
```
@BUILD_SPEC_LMLAK.md @DESIGN_SYSTEM_LMLAK.md @IA_SCREENS_LMLAK.md 세 문서를 함께 물린다.
@BUILD_SPEC_LMLAK.md 의 규칙을 최종 기준으로 따른다. 이 앱은 한국생활음악강사협회(LMLAK) 모바일앱을
'신규 구축'하는 작업이다(기존 코드 래핑 아님). 하드 규칙(2장)·정적 익스포트 금지패턴(3장)·
인증/오디오 사양(3.1/3.2)·자산 슬러그 규칙(5장)·스키마(6장)를 항상 지킨다.
확인했으면 "확인"만 답하고 Phase 0 계획을 제시해라. 이후 한 Phase씩만 진행하고,
각 Phase 끝에서 [빌드→(도입 후)cap sync→실행→보고]를 한 뒤 내 승인을 기다린다.
한꺼번에 다 하지 마라. 라이브러리 추가·파괴적 변경 전엔 먼저 물어라.
```

**다음 Phase 진행:**
```
승인한다. @BUILD_SPEC_LMLAK.md 의 Phase N 을 진행해라. 직전 Phase의 DoD가 유지되는지 먼저 확인하고,
지정 검증 명령을 실행해 에러 0을 확인한 뒤 끝에서 멈추고 보고해라.
```

**막혔을 때(경로 재진단):**
```
@BUILD_SPEC_LMLAK.md 0장 결정사항과 3장 금지패턴을 다시 확인해라. 지금 깨지는 원인이
(1) 정적 익스포트 비호환(미들웨어·서버액션·API라우트·next/image·동적라우트),
(2) 인증 PKCE/브리지/딥링크/네이티브 클라이언트 분리,
(3) 자산 한글 파일명 직접참조,
(4) Capacitor sync/경로(file://) 중 무엇인지 먼저 진단하고, 가설→최소수정→재검증 순으로 보고해라.
추측으로 없는 것 만들지 말고, 불확실하면 멈추고 질문해라.
```

**자산/스키마 점검(수시):**
```
@BUILD_SPEC_LMLAK.md 5장(슬러그)·6장(스키마)을 기준으로, 지금 코드가 한글 파일명을 직접 참조하거나
asset-map/스키마와 어긋나는 곳이 있는지 전수 점검하고 표로 보고해라. 변경은 승인 후.
```

---

## 10. 최종 수용 기준 (앱이 갖춰야 할 상태)
- `01 Source` 자산을 슬러그화해 빠짐없이 활용한, **신규 구축된** Next.js 정적 익스포트 앱이 iOS·Android에서 실제 구동된다.
- 처음부터 정적 익스포트 호환으로 설계되어, 미들웨어·서버액션·API라우트 없이 **클라이언트 라우트 가드 + Supabase 직접 호출**로 동작한다.
- 홈·협회소개·자격증과정·교육콘텐츠·마이 핵심 화면이 **실제 Supabase 데이터**(스키마·시드·RLS)로 렌더되고, 각 화면이 빈·로딩·에러 3상태를 갖춘다.
- OAuth(구글/애플/네이버/카카오) + 매직링크가 **PKCE·브리지 콜백·custom scheme 딥링크**로 실기기에서 앱 복귀하고, 'Sign in with Apple'을 포함하며, 세션이 앱 재실행 후에도 유지되고 보호 라우트가 정상이다.
- 음악 앱답게 오디오가 **네이티브 품질**(저지연 연주·오디오 클럭 타이밍·무음 스위치·첫 제스처 활성화)로 동작한다.
- 엠블럼 기반 **아이콘·스플래시**, 권한 최소화, 세이프에어리어/노치/상태바/back, 터치타깃 44px+가 갖춰지고, **푸시 등 네이티브 가치**로 Apple 단순 웹뷰 거부 리스크를 방어한다.
- 라우트·외부 링크·**Supabase 스키마/시드/RLS**·자산 슬러그 매핑이 보존되고, **빌드·sync·타입·lint·콘솔 에러 0**이다.
- 양 스토어에 제출 가능한 서명 빌드 + 플랫폼별 체크리스트 + 베타 트랙이 준비된다.
```
