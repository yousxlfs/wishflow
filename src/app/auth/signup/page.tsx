import type { Metadata } from "next";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { PageTransition } from "@/components/layout/page-transition";
import { SignupForm } from "@/components/signup-form";

export const metadata: Metadata = {
  title: "Регистрация — Wishflow",
};

export default function SignUpPage() {
  return (
    <AuthPageShell description="Создай аккаунт и начни делиться списками желаний.">
      <PageTransition>
        <SignupForm />
      </PageTransition>
    </AuthPageShell>
  );
}
