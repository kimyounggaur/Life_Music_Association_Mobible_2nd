import { Headphones } from "lucide-react";
import Link from "next/link";

import { AssetImage } from "@/components/ui/AssetImage";
import { Badge } from "@/components/ui/Badge";

type ContentCardProps = {
  href: string;
  title: string;
  coverPath: string;
  meta: string[];
  typeLabel: string;
  hasAudio?: boolean;
};

export function ContentCard({ href, title, coverPath, meta, typeLabel, hasAudio }: ContentCardProps) {
  return (
    <Link href={href} className="pressable block rounded-lg border border-line bg-surface p-3 shadow-e1">
      <div className="relative mb-3 aspect-[3/4] overflow-hidden rounded-md bg-surface-2">
        <AssetImage src={coverPath} alt={`${title} 표지`} className="h-full w-full object-cover" sizes="220px" />
        {hasAudio && (
          <span className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-pill bg-surface/90 text-primary shadow-e1">
            <Headphones size={18} aria-hidden />
          </span>
        )}
      </div>
      <div className="space-y-2">
        <Badge tone={typeLabel === "연습곡집" ? "accent" : "primary"}>{typeLabel}</Badge>
        <h3 className="t-h3 line-clamp-2">{title}</h3>
        <p className="t-caption text-ink-muted">{meta.filter(Boolean).join(" · ")}</p>
      </div>
    </Link>
  );
}
