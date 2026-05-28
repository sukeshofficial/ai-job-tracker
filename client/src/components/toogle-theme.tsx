"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ToggleTheme() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const handleToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-yellow-500" />

            <Switch
              checked={isDark}
              onCheckedChange={handleToggle}
              aria-label="Toggle theme"
            />

            <Moon className="h-4 w-4 text-blue-500" />
          </div>
        </TooltipTrigger>

        <TooltipContent>
          <p>
            Switch to {isDark ? "light" : "dark"} mode
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}