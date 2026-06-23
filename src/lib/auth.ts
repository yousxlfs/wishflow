/**
 * NextAuth (Auth.js v5) — заготовка конфигурации.
 *
 * Когда будешь подключать логику:
 * 1. npm install @auth/prisma-adapter bcryptjs
 * 2. npm install -D @types/bcryptjs
 * 3. Раскомментируй провайдеры и adapter ниже
 * 4. Добавь AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET в .env
 */
import NextAuth from "next-auth";

// import { PrismaAdapter } from "@auth/prisma-adapter";
// import Credentials from "next-auth/providers/credentials";
// import Google from "next-auth/providers/google";
// import bcrypt from "bcryptjs";
// import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // adapter: PrismaAdapter(prisma),
  providers: [
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    // Credentials({
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     // TODO: найти пользователя и проверить пароль через bcrypt
    //     return null;
    //   },
    // }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
