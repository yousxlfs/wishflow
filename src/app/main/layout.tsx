import { auth } from "@/lib/auth";
import { Navbar } from "@/components/layout/navbar";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        userName={session?.user?.name ?? "Пользователь"}
        userImage={session?.user?.image}
      />
      <main>{children}</main>
    </div>
  );
}
