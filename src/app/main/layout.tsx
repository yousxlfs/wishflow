import { AuthGuard } from "@/components/auth/auth-guard";
import { MainShell } from "@/components/layout/main-shell";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <MainShell>{children}</MainShell>
    </AuthGuard>
  );
}
