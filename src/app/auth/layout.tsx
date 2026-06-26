import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { appRoutes } from "@/lib/auth/routes";

export const metadata: Metadata = {
  title: "Авторизация — Wishflow",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (session) {
    redirect(appRoutes.profileEdit);
  }

  return children;
}
