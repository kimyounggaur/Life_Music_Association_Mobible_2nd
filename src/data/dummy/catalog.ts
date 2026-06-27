import { asset, recordsByCategory } from "@/src/lib/assets";

export const __DUMMY__ = true;

export type Subject = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  iconPath: string;
  performerPath: string;
  curriculum: string[];
};

export type ContentItem = {
  slug: string;
  title: string;
  type: "textbook" | "songbook" | "ppt" | "demo";
  typeLabel: string;
  instrument: string;
  target: string;
  level: string;
  keyLabel: string;
  coverPath: string;
  hasAudio: boolean;
  description: string;
};

const curatedSubjects: Subject[] = [
  {
    slug: "kalimba",
    title: "칼림바",
    category: "멜로디 악기",
    summary: "작고 따뜻한 울림으로 기관 수업 입문에 적합한 대표 과목",
    description: "17키와 21키 칼림바를 중심으로 쉬운 코드, 선율 지도, 합주 운영까지 이어지는 자격 과정입니다.",
    iconPath: asset("subjects", "kalimba"),
    performerPath: asset("performers", "kalimba"),
    curriculum: ["기본 자세와 음계 이해", "기관 수업용 레퍼토리 지도", "합주 구성과 발표 수업 운영"],
  },
  {
    slug: "tongue-drum",
    title: "텅드럼",
    category: "힐링 타악",
    summary: "음정 타악기의 안정적인 소리로 복지·요양 현장에 어울리는 과정",
    description: "11키·15키 텅드럼의 음색을 활용해 명상형 연주와 쉬운 합주 수업을 설계합니다.",
    iconPath: asset("subjects", "tongue-drum"),
    performerPath: asset("performers", "tongue-drum"),
    curriculum: ["키 배열과 기본 타법", "대상별 선율 지도", "치유형 프로그램 구성"],
  },
  {
    slug: "guitar",
    title: "통기타",
    category: "현악",
    summary: "기관 수업에서 가장 활용도가 높은 반주·합주 중심 과정",
    description: "쉬운 코드, 스트럼, 노래 반주를 중심으로 생활음악 수업 운영력을 기릅니다.",
    iconPath: asset("subjects", "guitar"),
    performerPath: asset("performers", "guitar"),
    curriculum: ["기초 코드와 리듬", "세대별 레퍼토리", "합주 지도와 발표회 구성"],
  },
  {
    slug: "electric-guitar",
    title: "일렉기타",
    category: "밴드",
    summary: "파워코드와 리프를 기반으로 밴드 수업을 확장하는 과정",
    description: "싱글노트, 리프, 앙상블 지도까지 청소년·성인 밴드 수업에 필요한 요소를 다룹니다.",
    iconPath: asset("subjects", "electric-guitar"),
    performerPath: asset("performers", "guitar-electric-and-bass"),
    curriculum: ["톤 세팅과 기본 피킹", "파워코드 리프", "밴드 합주 운영"],
  },
  {
    slug: "bass-guitar",
    title: "베이스기타",
    category: "밴드",
    summary: "리듬과 화성의 중심을 잡는 실전 밴드 지도 과목",
    description: "원비트, 루트 진행, 쉬운 리프를 통해 밴드 합주 수업의 기반을 만듭니다.",
    iconPath: asset("subjects", "bass-guitar"),
    performerPath: asset("performers", "bass-guitar"),
    curriculum: ["오른손·왼손 기본기", "루트와 패턴", "합주 적용"],
  },
  {
    slug: "ukulele",
    title: "우쿨렐레",
    category: "생활 악기",
    summary: "저학년부터 성인까지 폭넓게 운영 가능한 밝은 수업 과목",
    description: "코드 반주, 멜로디, 리듬별 연습곡을 통해 대상별 수업안을 구성합니다.",
    iconPath: asset("subjects", "ukulele"),
    performerPath: asset("performers", "ukulele"),
    curriculum: ["기본 코드와 스트럼", "대상별 레퍼토리", "수업안 구성"],
  },
  {
    slug: "drum",
    title: "드럼",
    category: "리듬 악기",
    summary: "리듬 감각과 앙상블 경험을 확장하는 타악 과정",
    description: "기초 비트, 필인, 합주 운영을 중심으로 밴드형 기관 수업에 대응합니다.",
    iconPath: asset("subjects", "drum"),
    performerPath: asset("performers", "drum"),
    curriculum: ["기초 그립과 자세", "8비트와 필인", "합주 수업 운영"],
  },
  {
    slug: "cup-tapping",
    title: "컵타",
    category: "리듬 놀이",
    summary: "준비물이 간단하고 참여도가 높은 리듬 활동 과목",
    description: "컵을 활용한 리듬 패턴, 팀 활동, 발표형 수업을 설계합니다.",
    iconPath: asset("subjects", "cup-tapping"),
    performerPath: asset("performers", "cup-tapping"),
    curriculum: ["기본 패턴", "노래 결합", "팀별 창작 활동"],
  },
  {
    slug: "nanta",
    title: "난타",
    category: "타악 퍼포먼스",
    summary: "몸으로 리듬을 익히고 무대형 수업까지 연결하는 과정",
    description: "생활 리듬, 도구 활용, 퍼포먼스 구성을 통해 단체 수업의 몰입도를 높입니다.",
    iconPath: asset("subjects", "nanta"),
    performerPath: asset("performers", "nanta"),
    curriculum: ["기본 타법", "퍼포먼스 패턴", "발표 수업 구성"],
  },
  {
    slug: "cajon",
    title: "카혼",
    category: "리듬 악기",
    summary: "간단한 장비로 밴드와 노래 반주를 지원하는 실전 타악",
    description: "박자, 베이스·스네어 감각, 반주 패턴을 기관 수업에 맞춰 익힙니다.",
    iconPath: asset("subjects", "cajon"),
    performerPath: asset("performers", "cajon"),
    curriculum: ["기본 소리 만들기", "리듬 패턴", "노래 반주 적용"],
  },
  {
    slug: "tone-chime",
    title: "톤차임",
    category: "앙상블",
    summary: "함께 울리는 소리를 통해 협동과 집중을 키우는 과정",
    description: "핸드벨·톤차임 계열의 합주 운영, 파트 배분, 기관 발표 수업을 다룹니다.",
    iconPath: asset("subjects", "tone-chime"),
    performerPath: asset("performers", "handbell"),
    curriculum: ["파트 배분", "앙상블 호흡", "발표곡 지도"],
  },
  {
    slug: "xylophone",
    title: "실로폰",
    category: "멜로디 타악",
    summary: "선율 학습과 합주를 쉽게 연결하는 교육 악기 과정",
    description: "기본 음계, 쉬운 멜로디, 핸드벨 연계 합주를 중심으로 운영합니다.",
    iconPath: asset("subjects", "xylophone"),
    performerPath: asset("performers", "xylophone"),
    curriculum: ["기초 음계", "선율 지도", "합주 편성"],
  },
];

const generatedSubjectText: Record<string, Pick<Subject, "title" | "category" | "summary" | "description" | "curriculum">> = {
  "mini-harp": {
    title: "미니하프",
    category: "멜로디 악기",
    summary: "부드러운 현의 울림으로 정서 수업과 발표 활동을 연결하는 과정",
    description: "작은 하프의 기본 자세, 쉬운 선율, 앙상블 편성을 기관 수업에 맞춰 다룹니다.",
    curriculum: ["기본 자세와 튜닝", "쉬운 선율 연주", "소규모 앙상블 구성"],
  },
  janggu: {
    title: "장구",
    category: "전통 타악",
    summary: "우리 장단을 생활음악 수업으로 풀어내는 전통 타악 과정",
    description: "기본 장단, 구음, 단체 연주를 중심으로 세대 통합형 수업안을 구성합니다.",
    curriculum: ["장단과 구음", "기본 타법", "단체 연주 지도"],
  },
  djembe: {
    title: "젬베",
    category: "월드 타악",
    summary: "손 타악의 직접적인 리듬감을 활용하는 참여형 과정",
    description: "베이스·톤·슬랩 소리와 반복 패턴을 익혀 팀 리듬 수업에 적용합니다.",
    curriculum: ["기본 소리 구분", "반복 리듬 패턴", "콜앤리스폰스 활동"],
  },
  asalato: {
    title: "아살라토",
    category: "리듬 놀이",
    summary: "작은 악기로 리듬 집중과 손 협응을 키우는 생활음악 과정",
    description: "흔들기와 타격 패턴을 단계화해 아동·성인 수업 모두에 적용합니다.",
    curriculum: ["기본 그립과 흔들기", "리듬 패턴", "창작 활동"],
  },
  accompaniment: {
    title: "실용반주",
    category: "반주",
    summary: "노래 수업과 악기 수업을 연결하는 현장형 반주 과정",
    description: "코드 진행, 쉬운 리듬, 대상별 노래 반주를 중심으로 수업 활용도를 높입니다.",
    curriculum: ["기초 코드 진행", "리듬 반주", "대상별 반주 적용"],
  },
  band: {
    title: "밴드",
    category: "앙상블",
    summary: "여러 악기를 묶어 기관형 밴드 수업으로 운영하는 통합 과정",
    description: "파트 편성, 합주 호흡, 발표 운영을 통해 생활음악 밴드 프로그램을 설계합니다.",
    curriculum: ["파트 구성", "합주 리허설", "발표회 운영"],
  },
  "bass-guitar-2": {
    title: "베이스기타 심화",
    category: "밴드",
    summary: "베이스기타 자료를 확장해 밴드 합주 적용을 더 깊게 다루는 과정",
    description: "자산 원본의 추가 베이스기타 아이콘을 보존하며, 상세 커리큘럼은 실제 운영 데이터에서 확정합니다.",
    curriculum: ["기본 패턴 복습", "합주 적용", "운영 데이터 확정 예정"],
  },
  "spoon-nanta": {
    title: "스푼난타",
    category: "타악 퍼포먼스",
    summary: "생활 도구를 활용해 접근성을 높인 리듬 퍼포먼스 과정",
    description: "스푼 타법과 반복 패턴을 활용해 소규모·대규모 단체 수업에 맞춥니다.",
    curriculum: ["도구 안전과 기본 타법", "리듬 패턴", "퍼포먼스 구성"],
  },
};

const curatedSubjectSlugs = new Set(curatedSubjects.map((subject) => subject.slug));
const subjectRecords = recordsByCategory("subjects");

export const subjects: Subject[] = [
  ...curatedSubjects,
  ...subjectRecords
    .filter((record) => !curatedSubjectSlugs.has(record.slug))
    .map((record) => {
      const text = generatedSubjectText[record.slug] ?? {
        title: record.titleKo?.replace(/^\d+[-\d\s]*/, "").replace(/\s*아이콘.*$/, "") || record.slug,
        category: "생활음악",
        summary: "01 Source 자산을 기준으로 보존한 생활음악 자격 과목",
        description: "상세 소개 문구는 운영 데이터 확정 후 Supabase 시드에서 교체합니다.",
        curriculum: ["기초 이해", "수업 적용", "발표 운영"],
      };

      return {
        slug: record.slug,
        ...text,
        iconPath: record.destPath,
        performerPath: asset("performers", record.slug),
      };
    }),
];

const bookRecords = recordsByCategory("books");
const songbookRecords = recordsByCategory("songbooks");

export const contents: ContentItem[] = [
  ...bookRecords.slice(0, 9).map((record) => ({
    slug: `book-${record.slug}`,
    title: record.titleKo?.replace(/^\d+\s*/, "") || `${record.slug} 교재`,
    type: "textbook" as const,
    typeLabel: "교재",
    instrument: record.slug,
    target: "강사",
    level: "기초",
    keyLabel: "",
    coverPath: record.destPath,
    hasAudio: false,
    description: "협회 현장 R&D를 바탕으로 만든 수업용 교재입니다.",
  })),
  ...songbookRecords.slice(0, 24).map((record) => ({
    slug: `songbook-${record.slug}`,
    title: record.titleKo || `${record.slug} 연습곡집`,
    type: "songbook" as const,
    typeLabel: "연습곡집",
    instrument: record.instrument || "music",
    target: record.target || "공통",
    level: record.level || "준비중",
    keyLabel: record.key || "",
    coverPath: record.destPath,
    hasAudio: true,
    description: "대상과 난이도에 맞춰 기관 수업에서 바로 활용할 수 있는 연습곡집입니다.",
  })),
];

export const news = [
  { id: "notice-2026-program", title: "2026 생활음악 강사 양성과정 안내", date: "2026.06.27" },
  { id: "notice-content", title: "기관 수업용 교재·연습곡집 업데이트", date: "2026.06.20" },
  { id: "notice-lounge", title: "강사라운지 자료실 공개 준비 중", date: "2026.06.12" },
];

export const stats = [
  { label: "과목 아이콘", value: "20+" },
  { label: "교재 표지", value: "9" },
  { label: "연습곡집 표지", value: "81" },
];
