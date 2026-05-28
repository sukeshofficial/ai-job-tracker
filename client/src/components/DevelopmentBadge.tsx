import { Badge } from "@/components/ui/badge";
import { CircleAlertFillIcon } from "@/components/ui/circle-alert-fill";

export default function DevelopmentBadge() {
  return (
    <div className="fixed bottom-2 right-2 z-[9999]">
      <Badge
        variant="destructive"
        className="text-sm whitespace-nowrap py-4 scale-90"
      >
        <CircleAlertFillIcon data-icon="inline-start" />
        <span className="text-sm">
          UNDER DEVELOPMENT
        </span>
      </Badge>
    </div>
  );
}