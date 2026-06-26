import type { NextAuthConfig } from "next-auth";
import { appRoutes, authRoutes } from "@/lib/auth/routes";

/**
 * Edge-safe Auth.js config (middleware).
 * Без Prisma, adapter и Credentials — только JWT/session callbacks.
 */
export const authConfig = {
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: authRoutes.signIn,
  },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return `${baseUrl}${appRoutes.profileEdit}`;
    },
  },
} satisfies NextAuthConfig;
