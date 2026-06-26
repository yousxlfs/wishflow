"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { authRoutes } from "@/lib/auth/routes";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ru">
      <body className="min-h-screen bg-background text-foreground">
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 text-center shadow-xl">
            <h1 className="text-2xl font-semibold">Что-то пошло не так</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Страница не загрузилась. Попробуйте обновить или вернитесь на вход.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button onClick={reset}>Обновить</Button>
              <Button variant="outline" asChild>
                <Link href={authRoutes.signIn}>Войти</Link>
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
