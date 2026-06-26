import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

/**
 * Лёгкая сессия без Prisma/adapter — только для layout и чтения JWT.
 * Страницы /auth/* не должны импортировать @/lib/auth.
 */
export const { auth, signOut } = NextAuth(authConfig);

export async function getOptionalSession() {
  try {
    return await auth();
  } catch {
    return null;
  }
}
