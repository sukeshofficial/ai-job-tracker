import { useEffect, useState } from "react";
import api from "@/services/api";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";

type HealthData = {
  server?: string;
  postgres?: string;
  ai?: {
    mongodb?: string;
    ai_service?: string;
  };
};

function HealthRow({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  const healthy =
    value === "running" ||
    value === "connected";

  return (
    <div className="flex items-center justify-between rounded-full border bg-background px-3 py-2">
      <span className="text-sm font-medium">
        {label}
      </span>

      <div className="flex items-center gap-2">
        <Badge
          variant={healthy ? "secondary" : "destructive"}
          className="gap-2 text-xs whitespace-nowrap"
        >

          <span
            className={`h-2 w-2 rounded-full ${healthy
              ? "bg-green-500"
              : "bg-red-500"
              }`}
          />

          <span className="text-xs capitalize text-muted-foreground">
            {value ?? "unknown"}
          </span>
        </Badge>
      </div>
    </div>
  );
}

export default function HealthStatus() {
  const [health, setHealth] =
    useState<HealthData | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    api
      .get("/health")
      .then((res) => setHealth(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const isHealthy =
    health?.server === "running";

  return (
    <div className="fixed top-4 right-4 z-[9999] scale-50">
      <HoverCard openDelay={150} closeDelay={100}>
        <HoverCardTrigger asChild>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border bg-background shadow-md transition hover:scale-105">
            <span
              className={`h-3 w-3 rounded-full ${loading
                ? "bg-yellow-500 animate-pulse"
                : isHealthy
                  ? "bg-green-500"
                  : "bg-red-500"
                }`}
            />
          </button>
        </HoverCardTrigger>

        <HoverCardContent
          align="end"
          sideOffset={10}
          className="w-[340px] p-4 scale-80"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {/* <span
                className={`h-2.5 w-2.5 rounded-full ${loading
                  ? "bg-yellow-500"
                  : isHealthy
                    ? "bg-green-500"
                    : "bg-red-500"
                  }`}
              /> */}

              <h4 className="text-sm font-semibold">
                System Health
              </h4>
            </div>

            <p className="text-xs text-muted-foreground">
              Backend service status
            </p>

            <div className="space-y-2 rounded-full">
              <HealthRow label="Postgres" value={health?.postgres} />
              <HealthRow label="MongoDB" value={health?.ai?.mongodb} />
              <HealthRow label="Server" value={health?.server} />
              <HealthRow label="AI Service" value={health?.ai?.ai_service} />
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}