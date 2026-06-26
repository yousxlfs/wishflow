import { redirect } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { getOptionalSession } from "@/lib/auth.session";
import { authRoutes } from "@/lib/auth/routes";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getOptionalSession();

  if (!session?.user) {
    redirect(authRoutes.signIn);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        userName={session.user.name ?? "Пользователь"}
        userImage={session.user.image}
      />
      <main>{children}</main>
    </div>
  );
}
