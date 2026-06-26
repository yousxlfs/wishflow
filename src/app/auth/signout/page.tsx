"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { authRoutes } from "@/lib/auth/routes";

export default function SignOutPage() {
  useEffect(() => {
    void signOut({ callbackUrl: authRoutes.signIn });
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-sm text-muted-foreground">
      Выход из аккаунта...
    </div>
  );
}
