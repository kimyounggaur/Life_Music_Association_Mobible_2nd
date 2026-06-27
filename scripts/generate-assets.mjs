import fs from "node:fs";
import path from "node:path";
import { buildAssetRecord } from "./asset-rules.mjs";

const root = process.cwd();
const sourceRoot = path.join(root, "01 Source");
const publicRoot = path.join(root, "public");
const docsRoot = path.join(root, "docs");

const categoryFolders = new Map([
  ["자격증 과목 아이콘(Icon)", "subjects"],
  ["연주자 아이콘(Icon)", "performers"],
  ["교재 표지", "books"],
  ["연습곡집 표지", "songbooks"],
  ["ETC Icon", "social"],
]);

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return listFiles(full);
      return [full];
    })
    .filter((file) => /\.(png|jpe?g|webp|svg)$/i.test(file));
}

function toAbsoluteDest(destPath) {
  return path.join(publicRoot, destPath.replace(/^\//, ""));
}

function copyRecord(record) {
  if (record.status !== "ready") return;
  const dest = toAbsoluteDest(record.destPath);
  ensureDir(dest);
  fs.copyFileSync(path.join(root, record.srcOriginal), dest);
}

function uniqueDestRecords(records) {
  const counts = new Map();
  return records.map((record) => {
    const base = record.destPath.replace(/\.[^.]+$/, "");
    const ext = path.extname(record.destPath);
    const count = counts.get(record.destPath) ?? 0;
    counts.set(record.destPath, count + 1);
    if (count === 0) return record;
    return {
      ...record,
      slug: `${record.slug}-${count + 1}`,
      destPath: `${base}-${count + 1}${ext}`,
      duplicateOf: record.slug,
    };
  });
}

function indexByCategory(records) {
  const map = {
    generatedAt: new Date().toISOString(),
    _placeholder: "/assets/placeholder.svg",
    records,
  };

  for (const record of records) {
    map[record.category] ??= {};
    map[record.category][record.slug] = record.destPath;
  }

  return map;
}

function writeJson(assetMap) {
  const outPath = path.join(publicRoot, "assets", "asset-map.json");
  ensureDir(outPath);
  fs.writeFileSync(outPath, `${JSON.stringify(assetMap, null, 2)}\n`, "utf8");
}

function writeDocs(records) {
  const lines = [
    "# LMLAK Asset Map",
    "",
    "Generated from `01 Source`. Original files are copied, not modified.",
    "",
    "| Category | Slug | Status | Destination | Original |",
    "|---|---|---|---|---|",
    ...records.map(
      (record) =>
        `| ${record.category} | ${record.slug} | ${record.status} | \`${record.destPath}\` | \`${record.srcOriginal}\` |`,
    ),
    "",
  ];

  const outPath = path.join(docsRoot, "asset-map.md");
  ensureDir(outPath);
  fs.writeFileSync(outPath, lines.join("\n"), "utf8");
}

function writePlaceholder() {
  const placeholder = path.join(publicRoot, "assets", "placeholder.svg");
  ensureDir(placeholder);
  if (fs.existsSync(placeholder)) return;
  fs.writeFileSync(
    placeholder,
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800" role="img" aria-label="준비 중인 이미지">
  <rect width="800" height="800" rx="64" fill="#F4EFE7"/>
  <circle cx="400" cy="342" r="112" fill="#E4EFEA"/>
  <path d="M320 420c34-40 58-56 82-56s49 18 78 56c22 28 42 42 78 42" fill="none" stroke="#2E6E5E" stroke-width="28" stroke-linecap="round"/>
  <text x="400" y="566" text-anchor="middle" font-family="Arial, sans-serif" font-size="42" font-weight="700" fill="#6B6459">LMLAK</text>
</svg>
`,
    "utf8",
  );
}

const records = [];

for (const [folderName, category] of categoryFolders) {
  for (const filePath of listFiles(path.join(sourceRoot, folderName))) {
    let finalCategory = category;
    const base = path.basename(filePath);
    if (category === "social" && /^자산\s*\d/.test(base)) finalCategory = "brand";
    records.push(
      buildAssetRecord({
        category: finalCategory,
        sourcePath: path.relative(root, filePath),
      }),
    );
  }
}

const aboutPath = path.join(sourceRoot, "협회소개.jpg");
if (fs.existsSync(aboutPath)) {
  records.push(
    buildAssetRecord({
      category: "brand",
      sourcePath: path.relative(root, aboutPath),
      destPath: "/assets/brand/about-mission.jpg",
    }),
  );
}

records.push({
  slug: "apple",
  titleKo: "Apple 로그인 로고 placeholder",
  category: "social",
  srcOriginal: "",
  destPath: "/assets/placeholder.svg",
  status: "placeholder",
  note: "01 Source에 Apple 로고가 없어 placeholder로 표시합니다.",
});

const finalRecords = uniqueDestRecords(records);
writePlaceholder();
for (const record of finalRecords) copyRecord(record);
const assetMap = indexByCategory(finalRecords);
writeJson(assetMap);
writeDocs(finalRecords);

console.log(`Generated ${finalRecords.length} asset records.`);
