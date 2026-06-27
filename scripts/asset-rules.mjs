import path from "node:path";

const EXT_RE = /\.[^.]+$/;

const orderedNameRules = [
  ["기타&일렉기타&베이스기타", "guitar-electric-and-bass"],
  ["핸드벨&실로폰", "handbell-and-xylophone"],
  ["핸드벨앤실로폰", "handbell-and-xylophone"],
  ["핸드벨", "handbell"],
  ["톤차임", "tone-chime"],
  ["일렉기타", "electric-guitar"],
  ["베이스기타", "bass-guitar"],
  ["베이스", "bass-guitar"],
  ["스푼난타", "spoon-nanta"],
  ["칼림바", "kalimba"],
  ["텅드럼", "tongue-drum"],
  ["미니하프", "mini-harp"],
  ["우쿨렐레", "ukulele"],
  ["실용반주", "accompaniment"],
  ["실로폰", "xylophone"],
  ["아살라토", "asalato"],
  ["카카오톡", "kakao"],
  ["구글", "google"],
  ["네이버", "naver"],
  ["페이스북", "facebook"],
  ["인스타그램", "instagram"],
  ["유투브", "youtube"],
  ["유튜브", "youtube"],
  ["쓰레드", "threads"],
  ["틱톡", "tiktok"],
  ["링크드인", "linkedin"],
  ["장구", "janggu"],
  ["젬베", "djembe"],
  ["카혼", "cajon"],
  ["컵타", "cup-tapping"],
  ["난타", "nanta"],
  ["드럼", "drum"],
  ["밴드", "band"],
  ["기타", "guitar"],
  ["자산 1", "brand-asset-1"],
  ["자산 2", "brand-asset-2"],
  ["자산 3", "brand-asset-3"],
  ["자산 4", "brand-asset-4"],
  ["협회소개", "about-mission"],
];

const noiseTokens = [
  "아이콘",
  "연주",
  "교과서",
  "표지",
  "연습곡집",
  "쉬운악보",
  "쉬운",
  "한입",
  "크몽",
  "채색",
  "배경삭제",
  "인쇄용",
  "아트보드",
  "최신",
  "성인용",
  "청소년용",
  "저학년용",
];

function stripExtension(fileName) {
  return path.basename(fileName).replace(EXT_RE, "");
}

function extensionOf(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  return ext || ".png";
}

function asciiFallback(baseName) {
  return baseName
    .normalize("NFKD")
    .replace(/&/g, " and ")
    .replace(/level\s*([a-z])/gi, "level$1")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .toLowerCase();
}

export function normalizeAssetSlug(fileName) {
  const baseName = stripExtension(fileName)
    .replace(/^[\d\s_-]+/, "")
    .replace(/\u00A0/g, " ")
    .trim();

  for (const [needle, replacement] of orderedNameRules) {
    if (baseName.includes(needle)) return replacement;
  }

  let rough = baseName;
  for (const token of noiseTokens) rough = rough.replaceAll(token, " ");

  const fallback = asciiFallback(rough);
  return fallback || "asset";
}

export function providerSlug(fileName) {
  const baseName = stripExtension(fileName);
  if (baseName.includes("애플") || /apple/i.test(baseName)) return "apple";
  if (baseName.includes("카카오")) return "kakao";
  if (baseName.includes("구글") || /google/i.test(baseName)) return "google";
  if (baseName.includes("네이버") || /naver/i.test(baseName)) return "naver";
  if (baseName.includes("페이스북")) return "facebook";
  if (baseName.includes("인스타")) return "instagram";
  if (baseName.includes("유투브") || baseName.includes("유튜브")) return "youtube";
  if (baseName === "X 로고" || /^x$/i.test(baseName)) return "x";
  if (baseName.includes("쓰레드")) return "threads";
  if (baseName.includes("틱톡")) return "tiktok";
  if (baseName.includes("링크드인")) return "linkedin";
  return normalizeAssetSlug(fileName);
}

function parseInstrument(fileName) {
  const name = stripExtension(fileName);
  const rules = [
    ["칼림바", "kalimba"],
    ["텅드럼", "tongue-drum"],
    ["우쿨렐레", "ukulele"],
    ["일렉기타", "electric-guitar"],
    ["베이스기타", "bass-guitar"],
    ["베이스", "bass-guitar"],
    ["기타", "guitar"],
    ["드럼", "drum"],
    ["컵타", "cup-tapping"],
    ["실로폰", "xylophone"],
    ["미니하프", "mini-harp"],
    ["밴드", "band"],
    ["CCM", "ccm-second-keyboard"],
  ];
  return rules.find(([needle]) => name.includes(needle))?.[1] ?? "";
}

function parseTarget(fileName) {
  const name = stripExtension(fileName);
  if (name.includes("7080")) return "7080";
  if (name.includes("청소년")) return "teen";
  if (name.includes("성인")) return "adult";
  if (name.includes("저학년")) return "lower";
  if (name.includes("돌봄") || name.includes("늘봄")) return "care";
  return "";
}

function parseKey(fileName) {
  const name = stripExtension(fileName);
  const match = name.match(/(11|15|17|21)\s*키/);
  return match ? `${match[1]}key` : "";
}

function parseLevel(fileName) {
  const name = stripExtension(fileName).replace(/\u00A0/g, " ");
  if (name.includes("초급")) return "beginner";
  if (name.includes("중급")) return "intermediate";
  if (name.includes("고급")) return "advanced";
  const match = name.match(/Level\s*([A-Z])/i);
  return match ? `level${match[1].toLowerCase()}` : "";
}

export function parseSongbookMeta(fileName) {
  return {
    instrument: parseInstrument(fileName),
    target: parseTarget(fileName),
    key: parseKey(fileName),
    level: parseLevel(fileName),
  };
}

function prefixedDest(category, slug, ext) {
  if (category === "subjects") return `/assets/subjects/subject-${slug}${ext}`;
  if (category === "performers") return `/assets/performers/player-${slug}${ext}`;
  if (category === "books") return `/assets/books/covers/book-${slug}${ext}`;
  if (category === "songbooks") return `/assets/songbooks/covers/songbook-${slug}${ext}`;
  if (category === "social") return `/assets/social/social-${slug}${ext}`;
  if (category === "brand") return `/assets/brand/${slug}${ext}`;
  return `/assets/${category}/${slug}${ext}`;
}

export function buildAssetRecord({ category, sourcePath, status = "ready", destPath }) {
  const fileName = path.basename(sourcePath);
  const ext = extensionOf(fileName);
  const slug = category === "social" ? providerSlug(fileName) : normalizeAssetSlug(fileName);
  const record = {
    slug,
    titleKo: stripExtension(fileName),
    category,
    srcOriginal: sourcePath.replaceAll("\\", "/"),
    destPath: destPath ?? prefixedDest(category, slug, ext),
    status,
  };

  if (category === "songbooks") {
    Object.assign(record, parseSongbookMeta(fileName));
  }

  return record;
}
