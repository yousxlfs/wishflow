"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted
    ? (theme === "system" ? resolvedTheme : theme) === "dark"
    : true;

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      suppressHydrationWarning
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-muted",
        className,
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
