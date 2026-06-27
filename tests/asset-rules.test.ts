import { describe, expect, it } from "vitest";

import {
  buildAssetRecord,
  normalizeAssetSlug,
  parseSongbookMeta,
  providerSlug,
} from "../scripts/asset-rules.mjs";

describe("asset slug rules", () => {
  it("normalizes Korean source names into stable English kebab slugs", () => {
    expect(normalizeAssetSlug("01 칼림바 아이콘(크몽)[채색]-01.jpg")).toBe("kalimba");
    expect(normalizeAssetSlug("04-2 일렉기타 아이콘(크몽)[채색]03.png")).toBe("electric-guitar");
    expect(normalizeAssetSlug("핸드벨&실로폰 교과서 표지.jpg")).toBe("handbell-and-xylophone");
  });

  it("maps social providers and reserves an explicit apple placeholder", () => {
    expect(providerSlug("구글 아이콘.jpg")).toBe("google");
    expect(providerSlug("카카오톡 아이콘.jpg")).toBe("kakao");
    expect(providerSlug("애플 아이콘.png")).toBe("apple");
  });

  it("parses songbook metadata without inventing missing values", () => {
    expect(parseSongbookMeta("칼림바 연습곡집_표지(21키)[7080].png")).toMatchObject({
      instrument: "kalimba",
      key: "21key",
      target: "7080",
      level: "",
    });

    expect(parseSongbookMeta("기타 타브 연습곡집(초급)_표지[크몽].jpg")).toMatchObject({
      instrument: "guitar",
      target: "",
      level: "beginner",
    });
  });

  it("builds destination paths with category prefixes", () => {
    expect(
      buildAssetRecord({
        category: "subjects",
        sourcePath: "01 Source/자격증 과목 아이콘(Icon)/02 텅드럼 아이콘(크몽)[채색]-마레아15키-배경삭제.png",
        destPath: undefined,
      }),
    ).toMatchObject({
      slug: "tongue-drum",
      destPath: "/assets/subjects/subject-tongue-drum.png",
      status: "ready",
    });
  });
});
