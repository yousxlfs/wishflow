import Link from "next/link";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

type AuthPageShellProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
};

export function AuthPageShell({
  children,
  title = "Wishflow",
  description = "Списки желаний для тебя и близких",
  className,
}: AuthPageShellProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center px-4 py-10 auth-gradient",
        className,
      )}
    >
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <div className="mb-8 flex w-full max-w-[420px] flex-col items-center gap-2 text-center">
        <Link href="/" className="font-display text-3xl font-semibold tracking-tight">
          {title}
        </Link>
        <p className="text-balance text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="w-full max-w-[420px]">{children}</div>
    </div>
  );
}
