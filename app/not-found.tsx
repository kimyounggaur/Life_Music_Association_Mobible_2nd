import { ErrorState } from "@/components/ui/State";

export default function NotFound() {
  return <ErrorState title="페이지를 찾을 수 없습니다" description="경로가 바뀌었거나 아직 준비되지 않은 화면입니다." />;
}
