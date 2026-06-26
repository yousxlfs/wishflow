import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Авторизация — Wishflow",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
