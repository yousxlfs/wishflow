import type { Metadata } from "next";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { PageTransition } from "@/components/layout/page-transition";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Вход — Wishflow",
};

export default function SignInPage() {
  return (
    <AuthPageShell description="С возвращением! Войди, чтобы управлять списками желаний.">
      <PageTransition>
        <LoginForm />
      </PageTransition>
    </AuthPageShell>
  );
}
