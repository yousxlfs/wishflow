"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { authRoutes } from "@/lib/auth/routes";

export default function AuthError({
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
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 auth-gradient">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface/90 p-8 text-center shadow-xl backdrop-blur-sm">
        <h1 className="font-display text-2xl font-semibold">Не удалось открыть страницу</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Попробуйте снова или перейдите на страницу входа.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={reset}>Повторить</Button>
          <Button variant="outline" asChild>
            <Link href={authRoutes.signIn}>На страницу входа</Link>
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Если вы уже вошли, но видите ошибку —{" "}
          <Link
            href="/api/auth/signout?callbackUrl=/auth/signin"
            className="text-primary underline-offset-4 hover:underline"
          >
            выйти из аккаунта
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
