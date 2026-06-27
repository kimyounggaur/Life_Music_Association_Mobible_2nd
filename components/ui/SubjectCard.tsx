import Link from "next/link";

import { AssetImage } from "@/components/ui/AssetImage";
import { Badge } from "@/components/ui/Badge";

type SubjectCardProps = {
  href: string;
  title: string;
  summary: string;
  iconPath: string;
  category: string;
};

export function SubjectCard({ href, title, summary, iconPath, category }: SubjectCardProps) {
  return (
    <Link href={href} className="pressable block rounded-lg border border-line bg-surface p-4 shadow-e1">
      <div className="mb-4 grid aspect-square w-full place-items-center rounded-lg bg-primary-soft">
        <AssetImage src={iconPath} alt={`${title} 과목 아이콘`} className="h-[76%] w-[76%] object-contain" sizes="180px" />
      </div>
      <div className="space-y-2">
        <Badge tone="muted">{category}</Badge>
        <h3 className="t-h3">{title}</h3>
        <p className="t-body-sm line-clamp-2 text-ink-muted">{summary}</p>
      </div>
    </Link>
  );
}
