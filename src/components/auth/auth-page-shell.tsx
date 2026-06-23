import Link from "next/link";
import { cn } from "@/lib/utils";

type AuthPageShellProps = {
  children: React.ReactNode;
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
        "flex min-h-screen flex-col items-center justify-center bg-muted/40 px-4 py-10",
        className,
      )}
    >
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <Link
          href="/"
          className="text-2xl font-semibold tracking-tight hover:opacity-80"
        >
          {title}
        </Link>
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
