import type { Metadata } from "next";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Вход — Wishflow",
};

export default function SignInPage() {
  return (
    <AuthPageShell
      title="Wishflow"
      description="С возвращением! Войди, чтобы управлять списками желаний."
    >
      <LoginForm />
    </AuthPageShell>
  );
}
