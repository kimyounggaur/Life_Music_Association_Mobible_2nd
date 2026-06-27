import Link from "next/link";

import { RouteShell } from "@/components/ui/RouteShell";
import { magazineItems } from "@/src/data/dummy/routes";

export default function MagazinePage() {
  return (
    <RouteShell title="매거진" description="생활음악 수업 설계와 현장 운영 이야기를 모았습니다.">
      <div className="grid gap-3 md:grid-cols-2">
        {magazineItems.map((item) => (
          <Link key={item.id} href={`/magazine/${item.id}`} className="pressable rounded-lg border border-line bg-surface p-5 shadow-e1">
            <p className="t-caption text-primary">{item.date}</p>
            <h2 className="t-h2 mt-2">{item.title}</h2>
          </Link>
        ))}
      </div>
    </RouteShell>
  );
}
