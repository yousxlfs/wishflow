import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Navbar } from "@/components/layout/navbar";
import { authRoutes } from "@/lib/auth/routes";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    redirect(authRoutes.signIn);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        userName={session.user?.name ?? "Пользователь"}
        userImage={session.user?.image}
      />
      <main>{children}</main>
    </div>
  );
}
