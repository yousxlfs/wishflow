import type { Metadata } from "next";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { SignupForm } from "@/components/signup-form";

export const metadata: Metadata = {
  title: "Регистрация — Wishflow",
};

export default function SignUpPage() {
  return (
    <AuthPageShell
      title="Wishflow"
      description="Создай аккаунт и начни делиться списками желаний."
    >
      <SignupForm />
    </AuthPageShell>
  );
}
