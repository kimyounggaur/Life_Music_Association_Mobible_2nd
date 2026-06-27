# 디자인 시스템 & 비주얼 언어 — 한국생활음악강사협회 모바일앱 (LMLAK)

> **이 문서의 위치**: 마스터 사양서 `@BUILD_SPEC_LMLAK.md`의 **디자인 심화 문서**다(Phase 0~1 집중 참조). 충돌 시 **마스터가 최종 기준**.
> 코딩 에이전트(Claude Code/Cursor)에 `@DESIGN_SYSTEM_LMLAK.md`로 물려 UI를 일관되게 짓게 한다.
> **전제 준수**: Next.js(App Router)+TS+Tailwind, 정적 익스포트(`output:'export'`), `images.unoptimized=true`, 서버 런타임 없음, Capacitor 셸, 터치 타깃 44px+, 세이프에어리어 대응.
> **무드 레퍼런스**: 오늘은뮤직(todaymusicgood.com)의 *정갈하고 감성적인 모던 음악 아카데미*. 단, 우리는 **'생활음악·기관 수업·자격증 강사 협회'**이므로 화려함보다 **신뢰·따뜻함·현장감**을 우선한다.
> **핵심 제약**: 01 Source의 **채색 일러스트(악기/연주자/표지)가 주인공**이다. → UI 크롬(테두리·그림자·색)은 **철저히 절제**하고, 컬러풀한 콘텐츠가 빛나도록 화면은 차분한 종이·아이보리 베이스로 깐다.

---

## 0. 디자인 결정 사항 (변경 금지 — 합의된 전제)

| 항목 | 결정 | 이유 |
|---|---|---|
| 비주얼 주역 | **01 Source 채색 일러스트** | 자산이 이미 풍부·고채도 → UI가 색을 또 얹으면 충돌. UI는 무채색·저채도 베이스. |
| 컬러 운용 | **차분한 베이스 + 단일 포인트(Primary)** | 엠블럼/악기 색과 안 싸우는 "딥 틸·세이지" 계열 1색 포인트. |
| 타이포 | **Pretendard(본문/제목) 셀프호스팅** | 한글 가독·중립·무료, 정적 익스포트에 번들 가능. |
| 토큰 체계 | **CSS 변수 → Tailwind theme 매핑** | 라이트/다크 모드 1소스. 하드코딩 색상 금지. |
| 모드 | **라이트 기본 + 다크 지원** | `prefers-color-scheme` + 수동 토글(`data-theme`). |
| 모션 | **절제(150–300ms, ease-out)** | "정갈함"이 무드. 과한 패럴럭스·바운스 금지. `prefers-reduced-motion` 존중. |

---

## 1. 브랜드 무드 / 톤 & 디자인 원칙

### 1.1 무드 키워드 (6개)
1. **따뜻한 신뢰 (Warm Trust)** — 자격증·협회의 공신력 + 사람 냄새.
2. **정갈한 현장감 (Calm Craft)** — 기관 수업 현장의 R&D, 다듬어진 교재.
3. **생활 밀착 (Everyday Music)** — 무대가 아닌 복지관·학교·요양시설의 음악.
4. **명료한 안내 (Clear Guidance)** — 강사가 길을 잃지 않는 또렷한 IA.
5. **감성적 모던 (Soft Modern)** — 오늘은뮤직식 여백·라운드·은은한 톤.
6. **다채로운 악기 (Colorful Instruments)** — 채색 일러스트가 화면의 컬러를 책임진다.

> 한 줄 무드 스테이트먼트: **"종이처럼 차분한 화면 위에, 악기들이 색을 입힌다."**

### 1.2 디자인 원칙 5가지
1. **콘텐츠가 컬러를 책임진다.** UI는 무채색·저채도. 색은 일러스트와 단일 포인트(Primary)만. 한 화면에 포인트 색면이 30%를 넘지 않게.
2. **여백이 신뢰다.** 카드 간격·섹션 패딩을 넉넉히. 정보 밀도보다 호흡. (오늘은뮤직식 모듈형 그리드)
3. **44px는 최소 약속.** 모든 탭/버튼/리스트 행 터치 타깃 ≥ 44×44px. 세이프에어리어를 침범하지 않는다.
4. **일관된 모서리·그림자 한 벌.** radius/elevation 토큰 외 임의값 금지. 그림자는 "들렸다"가 아니라 "놓였다" 수준으로 은은하게.
5. **상태를 항상 그린다.** 모든 데이터 화면은 *기본/로딩(스켈레톤)/빈 상태/에러* 4종을 반드시 가진다. 추측으로 비우지 않는다(placeholder 원칙).

---

## 2. 컬러 시스템

### 2.1 팔레트 설계 의도
- **베이스**: 따뜻한 **아이보리/페이퍼**(종이 무드) — 채색 일러스트의 배경으로 중립.
- **포인트(Primary)**: **딥 틸–그린(Pine/Teal)** — 신뢰(파랑 계열의 차분함) + 자연·생활(녹색의 따뜻함). 악기 일러스트의 빨강·노랑·핑크와 보색 충돌이 적은 안전한 포인트.
- **세컨더리**: **세이지/올리브** — Primary의 동계열 보조, 칩·태그·서브 액션.
- **액센트**: **따뜻한 앰버(Honey)** — 강조 배지·신규·CTA 보조점. 소량만.
- **시맨틱**: success(그린)/warning(앰버)/danger(테라코타-레드) — 채도를 한 단계 낮춰 일러스트와 안 싸우게.

> ⚠️ **WCAG AA 주의**: 본문 텍스트 대비 ≥ **4.5:1**, 큰 텍스트/아이콘 ≥ **3:1**. 아래 값은 대비를 검증해 배치했다. Primary 위 흰 글자, 베이스 위 본문 텍스트 모두 AA 통과. **앰버(Accent) 위에는 흰 글자 금지**(대비 부족) → 앰버 위엔 **`--text`(짙은 잉크)** 글자만.

### 2.2 라이트 모드 토큰

| 토큰 | HEX | 의미 / 용도 | 대비 메모 |
|---|---|---|---|
| `--bg` | `#FBF8F3` | 앱 최하단 배경(아이보리 페이퍼) | — |
| `--surface` | `#FFFFFF` | 카드·시트·앱바 표면 | — |
| `--surface-2` | `#F4EFE7` | 보조 표면(스켈레톤·인풋 배경) | — |
| `--primary` | `#2E6E5E` | 핵심 포인트(딥 틸–그린): CTA·활성 탭·링크 | 위에 흰 글자 6.0:1 ✅ |
| `--primary-pressed` | `#255A4C` | 눌림/호버 | — |
| `--primary-soft` | `#E4EFEA` | Primary 연한 배경(선택칩·강조 박스) | 위에 `--primary` 글자 AA ✅ |
| `--secondary` | `#6E8B6F` | 세이지: 서브 액션·보조 라벨 | 위에 흰 글자 3.4:1(큰 텍스트만) |
| `--accent` | `#E0A341` | 앰버(허니): 신규 배지·강조점 | **위엔 `--text` 글자만** |
| `--text` | `#23211C` | 본문/제목(웜 잉크) | bg 위 14.8:1 ✅ |
| `--text-muted` | `#6B6459` | 보조 텍스트·캡션 | bg 위 5.2:1 ✅ |
| `--text-disabled` | `#A79E90` | 비활성 텍스트 | 큰 텍스트/아이콘용 |
| `--border` | `#E7E0D4` | 카드/구분선(저대비, 은은) | — |
| `--border-strong`| `#D2C8B6` | 강조 구분선·인풋 포커스 외곽 | — |
| `--success` | `#2F8F5B` | 성공/완료/수료 | 위에 흰 글자 AA ✅ |
| `--warning` | `#C9871F` | 경고/미완 | 위에 흰 글자 3.1:1(큰 텍스트) |
| `--danger` | `#C2462E` | 오류/삭제(테라코타-레드) | 위에 흰 글자 AA ✅ |
| `--overlay` | `rgba(35,33,28,0.45)` | 모달/바텀시트 딤 | — |

### 2.3 다크 모드 토큰

> 다크는 "한밤의 종이"가 아니라 **딥 차콜–그린**으로. 채색 일러스트가 어두운 배경에서 더 도드라진다(배경삭제 PNG는 다크에서 특히 깔끔).

| 토큰 | HEX | 의미 |
|---|---|---|
| `--bg` | `#16191A` | 딥 차콜 |
| `--surface` | `#1F2426` | 카드·시트 |
| `--surface-2` | `#272D2F` | 보조 표면·스켈레톤 |
| `--primary` | `#5FB89F` | 밝힌 틸–그린(다크 배경 대비 확보) — 위에 `#0E1413` 글자 ✅ |
| `--primary-pressed` | `#4FA38C` | 눌림 |
| `--primary-soft` | `#1E322C` | Primary 연한 배경 |
| `--secondary` | `#8FAE90` | 세이지(밝힘) |
| `--accent` | `#E6B45C` | 앰버(밝힘) — 위엔 어두운 글자 |
| `--text` | `#ECE7DD` | 본문(웜 화이트) bg 위 13.5:1 ✅ |
| `--text-muted` | `#A6A093` | 보조 텍스트 bg 위 5.6:1 ✅ |
| `--text-disabled` | `#6F6A5F` | 비활성 |
| `--border` | `#333A3B` | 구분선 |
| `--border-strong`| `#46504F` | 강조 구분선 |
| `--success` | `#52C281` | 성공 |
| `--warning` | `#E0A93C` | 경고 |
| `--danger` | `#E0664B` | 오류 |
| `--overlay` | `rgba(0,0,0,0.55)` | 딤 |

### 2.4 CSS 변수 (정의 — `globals.css`)

```css
/* :root = 라이트 기본 */
:root {
  --bg:#FBF8F3; --surface:#FFFFFF; --surface-2:#F4EFE7;
  --primary:#2E6E5E; --primary-pressed:#255A4C; --primary-soft:#E4EFEA;
  --secondary:#6E8B6F; --accent:#E0A341;
  --text:#23211C; --text-muted:#6B6459; --text-disabled:#A79E90;
  --border:#E7E0D4; --border-strong:#D2C8B6;
  --success:#2F8F5B; --warning:#C9871F; --danger:#C2462E;
  --overlay:rgba(35,33,28,0.45);

  /* on-color 글자 (대비 보장) */
  --on-primary:#FFFFFF; --on-accent:#23211C; --on-danger:#FFFFFF;

  /* spacing / radius / elevation (3·4장) */
  --r-sm:8px; --r-md:12px; --r-lg:16px; --r-xl:24px; --r-pill:999px;
  --e-0:none;
  --e-1:0 1px 2px rgba(35,33,28,.06);
  --e-2:0 2px 8px rgba(35,33,28,.08);
  --e-3:0 8px 24px rgba(35,33,28,.10);

  /* 세이프에어리어 */
  --safe-top:env(safe-area-inset-top);
  --safe-bottom:env(safe-area-inset-bottom);
  --safe-left:env(safe-area-inset-left);
  --safe-right:env(safe-area-inset-right);
}

/* 다크: 수동 토글 우선, 없으면 시스템 따름 */
:root[data-theme="dark"] {
  --bg:#16191A; --surface:#1F2426; --surface-2:#272D2F;
  --primary:#5FB89F; --primary-pressed:#4FA38C; --primary-soft:#1E322C;
  --secondary:#8FAE90; --accent:#E6B45C;
  --text:#ECE7DD; --text-muted:#A6A093; --text-disabled:#6F6A5F;
  --border:#333A3B; --border-strong:#46504F;
  --success:#52C281; --warning:#E0A93C; --danger:#E0664B;
  --overlay:rgba(0,0,0,0.55);
  --on-primary:#0E1413; --on-accent:#23211C; --on-danger:#16191A;
  --e-1:0 1px 2px rgba(0,0,0,.4);
  --e-2:0 2px 8px rgba(0,0,0,.45);
  --e-3:0 8px 24px rgba(0,0,0,.5);
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    /* 위 다크 블록과 동일 값 — 시스템 다크 자동 적용. (빌드 시 한 번만 복제) */
  }
}
```

> **테마 토글 구현 팁(정적 익스포트)**: 서버가 없으므로 `<head>`에 인라인 스크립트로 FOUC 방지 —
> `localStorage.theme`를 읽어 `document.documentElement.dataset.theme`를 **첫 페인트 전** 세팅한다(`<Script strategy="beforeInteractive">` 또는 raw `<script>`).

### 2.5 Tailwind theme 매핑 (`tailwind.config.ts`)

```ts
import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: { DEFAULT: "var(--surface)", 2: "var(--surface-2)" },
        primary: {
          DEFAULT: "var(--primary)",
          pressed: "var(--primary-pressed)",
          soft: "var(--primary-soft)",
        },
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        ink: { DEFAULT: "var(--text)", muted: "var(--text-muted)", disabled: "var(--text-disabled)" },
        line: { DEFAULT: "var(--border)", strong: "var(--border-strong)" },
        success: "var(--success)", warning: "var(--warning)", danger: "var(--danger)",
        "on-primary": "var(--on-primary)", "on-accent": "var(--on-accent)",
      },
      borderRadius: { sm:"var(--r-sm)", md:"var(--r-md)", lg:"var(--r-lg)", xl:"var(--r-xl)", pill:"var(--r-pill)" },
      boxShadow: { e1:"var(--e-1)", e2:"var(--e-2)", e3:"var(--e-3)" },
      spacing: { "safe-t":"var(--safe-top)", "safe-b":"var(--safe-bottom)" },
      fontFamily: {
        sans: ["Pretendard","Pretendard Variable","-apple-system","BlinkMacSystemFont","system-ui","sans-serif"],
        display: ["Pretendard","Pretendard Variable","sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

> 사용 예: `className="bg-surface text-ink rounded-lg shadow-e1 border border-line"` — **HEX 하드코딩 금지.**

---

## 3. 타이포그래피

### 3.1 폰트 선택 & 셀프호스팅 (정적 익스포트 필수)
- **본문/제목**: **Pretendard**(한글·라틴·숫자 균형, 중립적 모던, 무료). 외부 CDN 금지 → **셀프호스팅**(`public/fonts/`에 woff2).
- **숫자/영문 보조(선택)**: 영문 캡션·로고 보조에 한해 시스템 산세리프 fallback. 별도 영문 디스플레이 폰트는 번들 비용 대비 효과 낮아 **도입 보류**(필요 시 1줄 사유 후 승인).
- **이유**: Pretendard variable 1개로 weight 전 범위 커버 → 번들 최소.

```css
/* globals.css — 셀프호스팅 (next/font/local 권장) */
@font-face{
  font-family:"Pretendard Variable";
  src:url("/fonts/PretendardVariable.woff2") format("woff2-variations");
  font-weight:45 920; font-display:swap;
}
html{ font-family:"Pretendard Variable",Pretendard,system-ui,sans-serif; -webkit-text-size-adjust:100%; }
```
> `next/font/local`로 로드하면 정적 익스포트에서도 안전하게 번들된다(외부 fetch 0).

### 3.2 타입 스케일 (모바일 기준, 16px=1rem)

| 토큰 | px / rem | weight | line-height | letter-spacing | 용도 |
|---|---|---|---|---|---|
| `display` | 28 / 1.75 | 700 | 1.25 (35px) | -0.02em | 화면 대표 타이틀(홈 히어로) |
| `h1` | 24 / 1.5 | 700 | 1.3 (31px) | -0.02em | 섹션/페이지 제목 |
| `h2` | 20 / 1.25 | 600 | 1.35 (27px) | -0.01em | 카드 그룹 헤더 |
| `h3` | 18 / 1.125 | 600 | 1.4 (25px) | -0.01em | 카드 타이틀 |
| `body` | 16 / 1.0 | 400 | 1.6 (26px) | 0 | 본문 기본 |
| `body-sm` | 14 / 0.875 | 400 | 1.55 (22px) | 0 | 보조 본문·리스트 |
| `caption` | 13 / 0.8125| 400 | 1.45 (19px) | 0 | 캡션·메타 |
| `label` | 12 / 0.75 | 600 | 1.35 (16px) | 0.02em | 칩·배지·탭 라벨 |
| `num` | 16 / 1.0 | 600 | 1.2 | 0 | 가격·키수(17키)·레벨 등 숫자 `font-variant-numeric:tabular-nums` |

- **한글 자간**: 제목은 -0.02~-0.01em(밀착), 본문은 0(가독). 음수 자간 과용 금지.
- **행간**: 본문 1.6 고정(한글 가독 핵심). 제목은 1.25–1.4.
- **숫자/영문**: 키수·레벨·가격 등은 `tabular-nums`로 정렬 흔들림 방지.
- **줄바꿈**: 한글 본문 `word-break:keep-all; overflow-wrap:anywhere;`(어절 단위 줄바꿈).

```css
.t-display{font-size:1.75rem;font-weight:700;line-height:1.25;letter-spacing:-.02em}
.t-h1{font-size:1.5rem;font-weight:700;line-height:1.3;letter-spacing:-.02em}
.t-h3{font-size:1.125rem;font-weight:600;line-height:1.4;letter-spacing:-.01em}
.t-body{font-size:1rem;line-height:1.6;word-break:keep-all;overflow-wrap:anywhere}
.t-num{font-weight:600;font-variant-numeric:tabular-nums}
```

---

## 4. 간격 · 라운드 · 그림자 · 레이어 토큰

### 4.1 Spacing scale (4px 베이스)
| 토큰 | px | 용도 |
|---|---|---|
| `space-0` | 0 | — |
| `space-1` | 4 | 아이콘-텍스트 미세 간격 |
| `space-2` | 8 | 인풋 내부, 칩 패딩 |
| `space-3` | 12 | 카드 내부 행 간격 |
| `space-4` | 16 | **기본 화면 좌우 패딩**, 카드 패딩 |
| `space-5` | 20 | 카드 간격 |
| `space-6` | 24 | 섹션 사이 |
| `space-8` | 32 | 섹션 큰 구획 |
| `space-10`| 40 | 히어로 상하 |
| `space-12`| 48 | 빈 상태 여백 |

> 화면 가로 거터: **좌우 16px 고정**(`px-4`) + 세이프에어리어 `+ env(safe-area-inset-left/right)`.

### 4.2 Radius
| 토큰 | px | 용도 |
|---|---|---|
| `r-sm` | 8 | 칩·배지·작은 버튼 |
| `r-md` | 12 | 인풋·기본 버튼 |
| `r-lg` | 16 | **카드·시트 상단** |
| `r-xl` | 24 | 바텀시트·대형 카드 |
| `r-pill`| 999 | 세그먼티드·필터칩·아바타 |

> 일러스트 썸네일은 카드보다 한 단계 작은 라운드(`r-md`)로 안쪽에 안긴 느낌.

### 4.3 Elevation (그림자 3단)
| 토큰 | 값 | 용도 |
|---|---|---|
| `e-0` | none | 평평한 표면(리스트 구분선만) |
| `e-1` | `0 1px 2px rgba(35,33,28,.06)` | 카드 기본(놓인 종이) |
| `e-2` | `0 2px 8px rgba(35,33,28,.08)` | 떠 있는 카드·앱바 스크롤 시 |
| `e-3` | `0 8px 24px rgba(35,33,28,.10)` | 바텀시트·모달·플로팅 플레이어 |

> 그림자는 **3단을 넘기지 않는다.** 채색 일러스트 위에 강한 그림자 금지(잘린 PNG 가장자리에 음영 끼임).

### 4.4 Z-index 레이어
| 레이어 | z | 비고 |
|---|---|---|
| base | 0 | 콘텐츠 |
| sticky header(상단앱바) | 30 | |
| bottom tab bar | 40 | 세이프에어리어 위 |
| audio player bar | 45 | 탭바 위 도킹 |
| toast/snackbar | 50 | |
| bottom sheet / modal scrim | 60 | overlay |
| bottom sheet / modal content | 61 | |

---

## 5. 아이콘 / 일러스트 운용 (01 Source)

> **대전제**: 01 Source는 **고채도 채색 일러스트**(악기·연주자·표지)다. 이게 화면의 컬러를 책임지므로 **UI 크롬은 무채색·저채도로 절제**한다. 컬러풀 콘텐츠 + 차분한 그릇.

### 5.1 자산 슬러그 매핑 테이블 (빌드 전 리네이밍 필수)
파일명이 한글·공백·괄호·특수문자 → **빌드 깨짐 위험**. 영문 kebab-case로 리네이밍하고 매핑 JSON을 둔다. (없는 자산은 `placeholder`)

**과목 아이콘 (`자격증 과목 아이콘(Icon)/` → `public/assets/subjects/`)**

| 원본 파일 | 슬러그 | subject key |
|---|---|---|
| `01 칼림바 아이콘…[채색]-01.jpg` | `kalimba.png`* | `kalimba` |
| `02 텅드럼…마레아15키-배경삭제.png` | `tongue-drum.png` | `tongue_drum` |
| `03 미니하프…Pink(배경삭제).png` | `mini-harp.png` | `mini_harp` |
| `04-1 기타…[채색].png` | `guitar.png` | `guitar` |
| `04-2 일렉기타…03.png` | `electric-guitar.png` | `electric_guitar` |
| `04-3 베이스…02.png` / `베이스기타…02.png` | `bass-guitar.png` | `bass_guitar` |
| `05 우쿨렐레…[채색].png` | `ukulele.png` | `ukulele` |
| `06 드럼…-01.jpg` | `drum.png`* | `drum` |
| `07 컵타…배경삭제.png` | `cup-tapping.png` | `cup_tapping` |
| `08 난타…배경삭제.png` | `nanta.png` | `nanta` |
| `스푼난타…4.jpg` | `spoon-nanta.png`* | `spoon_nanta` |
| `09 장구…배경삭제.png` | `janggu.png` | `janggu` |
| `10 젬베…배경삭제.png` | `djembe.png` | `djembe` |
| `11 카혼…배경삭제.png` | `cajon.png` | `cajon` |
| `12 아살라토…배경삭제.png` | `asalato.png` | `asalato` |
| `13 실용반주…02.png` | `accompaniment.png` | `accompaniment` |
| `14 톤차임…배경삭제.png` | `tone-chime.png` | `tone_chime` |
| `15 실로폰…배경삭제.png` | `xylophone.png` | `xylophone` |
| `밴드 아이콘…-01.jpg` | `band.png`* | `band` |
| (추가 필요) | `handbell.png` | `handbell` *(핸드벨 단독 아이콘 — 표지/연주자엔 있으나 과목 아이콘 누락 시 placeholder)* |

\* `.jpg`(배경 미삭제)는 **배경삭제 PNG로 교체 권장**. 흰 배경 jpg를 카드에 쓰면 베이스 색과 사각 경계가 보인다 → 5.3 규칙 참고.

**연주자 아이콘 (`연주자 아이콘(Icon)/` → `public/assets/performers/`)**: 위 과목 + `vocal-choir`(가창&합창), `vocal-training`(보컬트레이닝), `rhythm`(리듬악기), `percussion`(타악기), `lap-cajon`(무릎카혼), `handbell-tonechime`(핸드벨&톤차임). → **인물형 일러스트**라 히어로/소개/강사 섹션에 사용.

**교재 표지 9종 (`교재 표지/` → `public/assets/books/covers/`)**: `guitar`, `nanta`, `bass-onebite`, `ukulele`, `music-theory`, `electric-onebite`, `kalimba`, `tongue-drum`, `handbell-xylophone`.

**연습곡집 표지 81종 (`연습곡집 표지/` → `public/assets/practice/covers/`)**: 악기 × 대상(저학년/청소년/성인/7080) × 키(칼림바 17·21키, 텅드럼 11·15키) × 난이도(초/중/고, Level A/B/C). 슬러그 예: `guitar-tab-beginner`, `guitar-teen-levelB`, `guitar-7080-levelA`, `ccm-secondkb-brass`, `kalimba-21key-…`. **메타데이터를 DB 컬럼**(instrument/target/key/level)으로 분리하고 파일은 슬러그로만 참조.

**ETC (소셜/공유 — `ETC Icon/` → `public/assets/social/`)**: `google`, `naver`, `kakao`, `apple`(추가 필요·placeholder), `facebook`, `instagram`, `youtube`, `x`, `threads`, `tiktok`, `linkedin` + 브랜드 자산 `brand-1~4`.

```json
// public/assets/asset-map.json (발췌)
{
  "subjects": { "kalimba":"/assets/subjects/kalimba.png", "tongue_drum":"/assets/subjects/tongue-drum.png", "handbell":"/assets/subjects/handbell.png" },
  "books":    { "guitar":"/assets/books/covers/guitar.jpg", "music_theory":"/assets/books/covers/music-theory.png" },
  "social":   { "google":"/assets/social/google.png", "apple":"/assets/social/apple.png" },
  "_placeholder": "/assets/placeholder.png"
}
```

### 5.2 일러스트 타입별 운용 규칙
| 타입 | 어디에 | 컨테이너 | 배경 | 라운드 | 그림자 |
|---|---|---|---|---|---|
| 과목 아이콘(배경삭제 PNG) | 과목 카드·그리드·칩 | 정사각 1:1 | `--primary-soft` 또는 `--surface-2` **연한 원/스퀘어** | 아이콘 컨테이너 `r-pill`(원형) 또는 `r-lg` | **e-0~e-1**(과하지 않게) |
| 연주자 일러스트 | 히어로·강사·소개 | 자유비(투명 배경) | 베이스 위 직접 | — | none |
| 교재/연습곡집 표지(직사각 이미지) | 콘텐츠 카드 | **3:4 세로 비율** | 표지 자체가 배경 | `r-md` | `e-1` |

### 5.3 일관성 규칙 (충돌 방지)
1. **배경삭제 PNG 우선.** jpg(흰 배경)는 ① PNG 교체 ② 흰 배경 카드 위에만 사용 ③ 불가 시 연한 `--surface` 원형 패드 위에 올려 경계 숨김.
2. **과목 아이콘은 항상 "연한 색 원/스퀘어 패드 + 중앙 정렬"** 한 벌로. 패드 색은 `--surface-2`(중립) 또는 `--primary-soft`(활성). 패드마다 다른 색 칠하기 금지(일러스트가 이미 컬러풀).
3. **아이콘 비율**: 패드 대비 일러스트 **70~78%** 차지(여백 22~30%). 패드 56·64·72·88px 4사이즈만.
4. **표지는 3:4 고정.** `object-fit:cover`로 비율 통일(원본 jpg/png 혼재 흡수). 표지 위 텍스트 오버레이 금지(표지 자체가 디자인됨) → 제목은 카드 본문 영역에.
5. **UI 아이콘(시스템: 검색·뒤로·재생 등)은 일러스트와 분리.** 라인 아이콘 1세트(예: Lucide), `--text`/`--text-muted` 단색, stroke 1.75, 24px. **채색 일러스트와 라인 UI 아이콘을 한 행에서 섞지 않는다.**
6. **그림자 절제.** 잘린 PNG 가장자리에 drop-shadow 금지(누끼 음영 깨짐). 그림자는 *카드 컨테이너*에만, 일러스트 자체엔 없음.

---

## 6. 핵심 컴포넌트 라이브러리 명세

> 공통 규칙: **모든 인터랙티브 요소 터치 타깃 ≥ 44×44px**(시각 크기가 작아도 hit-area 확장). 세이프에어리어 대응. 상태: `default / hover(데스크톱) / pressed / focus-visible / disabled`. 색은 토큰만.

### 6.1 하단 탭바 `<TabBar>`
- **구성**: 5탭 — 홈 / 과목(자격증) / 콘텐츠(교재·곡집) / 커뮤니티(후기·매거진) / 내정보.
- **높이**: 56px + `padding-bottom: var(--safe-bottom)`. 배경 `--surface`, 상단 `1px var(--border)`, `z-40`.
- **아이템**: 라인 아이콘 24px + `label`(12px). 활성 = `--primary` 아이콘+텍스트, 비활성 = `--text-muted`. 활성 시 아이콘 위 점 또는 살짝 채움.
- **터치 타깃**: 각 탭 ≥ 64px 폭 × 48px 높이.
- **props**: `items: {key,icon,activeIcon,label,href}[]`, `active: key`, `onChange`.
- **상태**: 활성/비활성/배지(숫자 점). 스크롤 시 그림자 `e-2` 부여(선택).

### 6.2 상단 앱바 `<AppBar>`
- **높이**: 52px + `padding-top: var(--safe-top)`(상태바 침범 방지). `z-30`, 배경 `--surface`, 스크롤 시 하단 `1px var(--border)`.
- **variant**: `default`(가운데 타이틀 + 좌 back + 우 action) / `large`(스크롤 시 큰 타이틀 → 작은 타이틀로 축소) / `transparent`(히어로 위 투명, 스크롤 시 surface로 전환).
- **props**: `title`, `leading?(back|close|none)`, `actions?: IconButton[]`, `variant`, `onBack`.
- **back**: Android 하드웨어 back & iOS 스와이프 백과 일관(둘 다 이전 라우트로).

### 6.3 과목 카드 `<SubjectCard>`
- **레이아웃**: 정사각/세로 카드. 상단 **아이콘 패드(원형, `--surface-2`/`--primary-soft`)** + 과목명(`h3`) + 보조(자격증/난이도 칩).
- **그리드**: 2열(모바일) `gap-4`, `px-4`. 카드 `--surface`, `r-lg`, `border-line`, `e-1`.
- **props**: `subjectKey`, `title`, `badge?`, `href`, `selected?`.
- **상태**: default / pressed(scale .98) / selected(테두리 `--primary`, 패드 `--primary-soft`).

### 6.4 콘텐츠(교재/연습곡집) 카드 `<ContentCard>`
- **레이아웃**: 상단 **3:4 표지**(`object-cover`, `r-md`) + 제목(`h3`, 2줄 말줄임) + 메타(악기·대상·키·레벨 칩) + (옵션)가격/오디오 미리듣기 버튼.
- **그리드**: 2열 또는 가로 스크롤 캐러셀(`snap-x`). 카드 `--surface`, `r-lg`, `e-1`.
- **props**: `coverSlug`, `title`, `meta:{instrument,target,key,level}`, `hasAudio?`, `href`, `onPreview?`.
- **상태**: default / pressed / 표지 로딩(스켈레톤 3:4) / 표지 에러(placeholder).

### 6.5 리스트 아이템 `<ListRow>`
- **높이**: ≥ 56px(터치). 좌 아이콘/썸네일(40px) + 타이틀(`body`)·서브(`caption`) + 우 chevron/메타.
- **구분**: 행 사이 `1px var(--border)` (그림자 없음, `e-0`).
- **props**: `leading?`, `title`, `subtitle?`, `trailing?`, `onPress?`, `disabled?`.
- **상태**: default / pressed(배경 `--surface-2`) / disabled.

### 6.6 버튼 `<Button>`
- **높이**: `md`=48px(기본), `lg`=52px, `sm`=40px(단, hit-area 44px). 라운드 `r-md`, `label`/`body` 600.
- **variant**:
  - `primary`: 배경 `--primary`, 글자 `--on-primary`. pressed `--primary-pressed`.
  - `secondary`: 배경 `--primary-soft`, 글자 `--primary`. (또는 `--surface` + `border-strong`)
  - `ghost`: 배경 투명, 글자 `--primary`, pressed 시 `--primary-soft`.
  - `danger`: 배경 `--danger`, 글자 `--on-danger`.
  - `social`: **소셜 로그인 전용** — `--surface` 배경 + `border-line` + 좌측 브랜드 로고(ETC Icon) + 한글 라벨("구글로 계속하기" 등). **Apple은 가이드라인상 검정/흰 공식 버튼 스타일 준수**(제3자 소셜 제공 시 'Sign in with Apple' 필수 — `MOBILE_SPEC` 3.1).
- **props**: `variant`, `size`, `leadingIcon?`, `loading?`, `disabled?`, `fullWidth?`, `onPress`.
- **상태**: default / pressed(scale .98 + 색 전환) / loading(스피너, 라벨 유지·중복탭 잠금) / disabled(`--text-disabled` + 채도↓).

```tsx
// 소셜 버튼 예 — 로고는 asset-map에서, 라벨은 한글
<Button variant="social" leadingIcon={social.google}>구글로 계속하기</Button>
<Button variant="social" leadingIcon={social.kakao}>카카오로 계속하기</Button>
<Button variant="social" leadingIcon={social.apple}>Apple로 계속하기</Button>
```

### 6.7 인풋 / 폼필드 `<TextField>`
- **높이**: 48px. 배경 `--surface-2`(또는 surface+border), `r-md`, `border-line`. 포커스 시 `border-primary` + 외곽 `0 0 0 3px primary-soft`.
- **구성**: label(상단, `label`) + input(`body`, `--text`) + helper/error(`caption`). placeholder `--text-disabled`.
- **props**: `label`, `value`, `onChange`, `type`, `state(default|focus|error|disabled)`, `helper?`, `error?`, `leadingIcon?`, `trailing?(clear|toggle-pw)`.
- **상태**: default / focus / filled / error(`border-danger` + 메시지 `--danger`) / disabled.
- **모바일**: `inputmode`·`autocomplete` 명시, 키보드가 인풋을 가리지 않게 스크롤 보정. iOS 줌 방지 위해 `font-size:16px` 유지.

### 6.8 칩 / 필터 `<Chip>` `<FilterBar>`
- **칩 높이**: 32px(hit-area 44px), `r-pill`, `label`. 기본 `--surface-2`/`--text-muted`, 선택 `--primary-soft`/`--primary` + `border-primary`.
- **FilterBar**: 가로 스크롤(`overflow-x-auto`, `snap`), 좌우 `px-4`. 다중선택/단일선택 모드.
- **용도**: 연습곡집 필터 — 악기·대상(저학년/청소년/성인/7080)·키(17키/21키…)·난이도(초/중/고/Level A·B·C).
- **props**: `label`, `selected`, `count?`, `onToggle`, `removable?`.

### 6.9 배지 `<Badge>`
- **종류**: `count`(숫자, 탭바·알림), `dot`(점), `status`(NEW/추천/수료/마감).
- **색**: NEW=`--accent`(위 `--on-accent` 글자), 추천=`--primary-soft`/`--primary`, 수료=`--success`, 마감=`--text-disabled`.
- **크기**: 18px(점 8px), `label` 11~12px, `r-pill`.

### 6.10 모달 / 바텀시트 `<Modal>` `<BottomSheet>`
- **BottomSheet**(모바일 기본): 하단 도킹, 상단 `r-xl`, 핸들바(36×4px `--border-strong`), 배경 `--surface`, `e-3`, scrim `--overlay`. **드래그 다운 닫기** + 세이프에어리어 하단 패딩.
- **Modal**(중앙): 작은 확인창. `r-lg`, max-width 같은 좁은 폭.
- **props**: `open`, `onClose`, `title?`, `children`, `actions?`, `dismissible?`, `snapPoints?`(시트).
- **상태**: 열림(슬라이드 업 240ms ease-out)/닫힘/드래그 추적. 포커스 트랩 + 스크롤 락 + `Esc`/back 닫기.

### 6.11 토스트 / 스낵바 `<Toast>`
- **위치**: 하단(탭바·플레이어 위, `z-50`), 세이프에어리어 존중. 폭 `calc(100% - 32px)`, `r-md`, `e-3`.
- **종류**: info(`--surface`+`--text`), success(`--success`), warning(`--warning`), danger(`--danger`). 좌 아이콘 + 메시지(`body-sm`) + (옵션)액션.
- **동작**: 자동 닫힘 3~4s, 액션 있으면 5s. 동시 1개(큐). 슬라이드 업 + 페이드.
- **props**: `type`, `message`, `action?`, `duration?`.

### 6.12 상태 컴포넌트 — 빈/로딩/에러
- **`<EmptyState>`**: 연주자 일러스트(연한) + 제목(`h3`) + 안내(`body-sm`, `--text-muted`) + (옵션)CTA. 여백 `space-12`. 예: "아직 등록한 과목이 없어요."
- **`<Skeleton>`**: `--surface-2` 베이스 + 1.4s shimmer(좌→우 그라디언트). 카드/표지(3:4)/리스트/텍스트 줄 variant. `prefers-reduced-motion`이면 정적 톤.
- **`<ErrorState>`**: 아이콘 + 메시지 + **"다시 시도"** 버튼(`secondary`). 네트워크/Supabase 실패 시. 절대 빈 화면 방치 금지.
- **공통**: 모든 데이터 화면은 *로딩→성공/빈/에러* 분기 의무.

### 6.13 오디오 플레이어 바 `<AudioPlayerBar>`
> 음악앱 1급 기능(`MOBILE_SPEC` 4장). 연습곡집 백킹트랙·시범연주 재생.
- **위치**: 하단 탭바 **위에 도킹**(미니, 64px), `z-45`, `--surface`, 상단 `border-line`, `e-2`. 탭하면 전체화면 플레이어(바텀시트).
- **미니**: 좌 표지(40px `r-sm`) + 곡명(`body-sm` 1줄)·악기/레벨(`caption`) + 재생/일시정지(44px) + 진행바(2px `--primary`).
- **전체화면**: 큰 표지(3:4) + 타이틀 + 시크바 + 재생/이전/다음·속도·반복(A/B 루프) + (해당 시)**오디오 비주얼라이저**(7.4).
- **props**: `track:{coverSlug,title,meta,src}`, `state(playing|paused|loading|error)`, `position`, `duration`, `onSeek`, `onToggle`, `rate?`.
- **오디오 규칙(`MOBILE_SPEC` 4장)**: 첫 사용자 제스처에서 `AudioContext.resume()`; iOS 무음 스위치 대응 시 세션 카테고리 `playback`; 메트로놈/리듬연습은 `setTimeout` 금지·오디오 클럭 스케줄링. 로딩=스피너, 에러=재시도.

### 6.14 세그먼티드 컨트롤 `<Segmented>`
- **형태**: `r-pill` 트랙(`--surface-2`) 안 활성 세그(`--surface` + `e-1`, 글자 `--primary`)가 슬라이드.
- **높이**: 40px(hit-area 44px). 2~4세그 권장. 라벨 `label` 600.
- **용도**: 교재/연습곡집 토글, 대상(저학년/청소년/성인/7080) 전환, 라이트/다크 토글.
- **props**: `segments:{key,label}[]`, `value`, `onChange`.
- **모션**: 활성 인디케이터 200ms ease-out 슬라이드.

> **세이프에어리어 공통**: 하단 고정 요소(탭바·플레이어·시트·토스트)는 `padding-bottom: var(--safe-bottom)`, 상단 앱바는 `padding-top: var(--safe-top)`, 가로 거터는 `+ env(safe-area-inset-left/right)`. 노치/홈 인디케이터 침범 0.

---

## 7. 모션 / 마이크로인터랙션

> 무드는 "정갈함". **과한 모션 금지.** 모든 모션은 `prefers-reduced-motion: reduce`에서 비활성/단축.

### 7.1 듀레이션 & 이징 토큰
| 토큰 | 값 | 용도 |
|---|---|---|
| `--dur-fast` | 120ms | 탭 피드백·칩 토글 |
| `--dur-base` | 200ms | 세그먼티드·페이드·색 전환 |
| `--dur-slow` | 280ms | 바텀시트/모달 슬라이드 |
| `--ease-out` | `cubic-bezier(.2,.8,.2,1)` | 진입(기본) |
| `--ease-in` | `cubic-bezier(.4,0,1,1)` | 이탈 |

### 7.2 전환(화면·시트)
- 라우트 전환: 페이드+8px 슬라이드(`--dur-base`, `--ease-out`). 패럴럭스·3D 금지.
- 바텀시트: 아래→위 슬라이드(`--dur-slow`), scrim 페이드. 드래그 다운은 손가락 추적(1:1).

### 7.3 탭 피드백
- 버튼/카드 press: `transform:scale(.98)` + 색 한 단계(`--dur-fast`). 릴리즈 시 복귀.
- 리스트 행 press: 배경 `--surface-2` 페이드.
- `focus-visible`: `0 0 0 3px var(--primary-soft)` 링(키보드/접근성). 마우스/터치엔 미표시.

### 7.4 오디오 비주얼라이저 (절제)
- 전체화면 플레이어에서만. **막대 5~7개**가 재생 중 부드럽게 오르내림(`--primary`, 투명도 60~100%). 일시정지 시 가운데 정렬로 수렴.
- 저사양 대비 `requestAnimationFrame` 1개, 정지 시 RAF 중단. `prefers-reduced-motion`이면 **고정 웨이브폼**(움직임 없음).
- 연주(가상악기/패드) 탭 시: 해당 패드 **리플 1회**(`--primary-soft`, 200ms) — 소리 지연과 무관한 시각 피드백.

### 7.5 로딩/스켈레톤
- shimmer 1.4s 무한, 그라디언트 `--surface-2 → surface → surface-2`. reduced-motion이면 정적.

```css
@media (prefers-reduced-motion: reduce){
  *{ animation-duration:.001ms!important; transition-duration:.001ms!important; }
  .visualizer{ animation:none } /* 고정 웨이브폼 */
}
```

---

## 8. 디자인 DoD / 수용 기준 (`MOBILE_SPEC` 규율 계승)
- [ ] 모든 색·라운드·그림자·간격이 **토큰(CSS 변수/Tailwind)**으로만 사용 — HEX 하드코딩 0.
- [ ] 라이트/다크 모드 전환 시 깨짐 0, FOUC 0(인라인 테마 스크립트).
- [ ] **WCAG AA**: 본문 4.5:1·큰 텍스트 3:1 통과(앰버 위 흰 글자 금지 준수).
- [ ] 모든 인터랙티브 터치 타깃 ≥ 44×44px, `focus-visible` 링 존재.
- [ ] 세이프에어리어(상단 앱바/하단 탭바·플레이어·시트·토스트) 침범 0, 노치/홈 인디케이터 안전.
- [ ] 채색 일러스트 위 강한 그림자/누끼 음영 0, 과목 아이콘 패드 한 벌 일관.
- [ ] 자산은 **슬러그 매핑** 경유, jpg 흰 배경 노출 0, 없는 자산 placeholder.
- [ ] 모든 데이터 화면 **로딩(스켈레톤)/빈/에러** 3상태 구비.
- [ ] 모션 ≤ 300ms·ease-out, `prefers-reduced-motion` 존중, 오디오 비주얼라이저 절제.
- [ ] `next/font/local`로 Pretendard 셀프호스팅(외부 fetch 0, 정적 익스포트 안전).

---

## 9. 복붙용 프롬프트 (디자인 토큰 부트스트랩)
```
@BUILD_SPEC_LMLAK.md 와 @DESIGN_SYSTEM_LMLAK.md 의 규칙을 따른다.
이번 작업: 2장(CSS 변수)·2.5(Tailwind theme)·3.1(Pretendard 셀프호스팅)·4장(spacing/radius/elevation 토큰)을
globals.css + tailwind.config.ts + next/font/local 로 셋업해라.
- HEX 하드코딩 금지(토큰만). 라이트/다크 data-theme 토글 + FOUC 방지 인라인 스크립트 포함.
- 빌드(output:'export') 통과·콘솔 에러 0 확인 후 변경 파일과 다음 계획을 보고하고 멈춰라.
```
```
승인한다. 다음: 6장 컴포넌트 중 <TabBar><AppBar><Button><SubjectCard>를
명세(props/상태/터치44px+/세이프에어리어)대로 구현하고, 각 상태(default/pressed/loading/disabled)
스토리 화면을 하나 만들어 시뮬레이터 스크린샷 체크리스트로 보고하고 멈춰라.
```
