import assetMapJson from "@/public/assets/asset-map.json";

type AssetCategory = "subjects" | "performers" | "books" | "songbooks" | "social" | "brand";

type AssetMap = {
  _placeholder: string;
  records: Array<{
    slug: string;
    category: AssetCategory;
    destPath: string;
    status: "ready" | "placeholder";
    titleKo?: string;
    instrument?: string;
    target?: string;
    key?: string;
    level?: string;
  }>;
} & Record<AssetCategory, Record<string, string>>;

export const assetMap = assetMapJson as AssetMap;

export function asset(category: AssetCategory, slug: string) {
  return assetMap[category]?.[slug] ?? assetMap._placeholder;
}

export function recordsByCategory(category: AssetCategory) {
  return assetMap.records.filter((record) => record.category === category);
}
