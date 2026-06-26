import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { appRoutes, authRoutes } from "@/lib/auth/routes";

class InvalidLoginError extends Error {
  code = "invalid_credentials";
}

const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const result = loginSchema.safeParse(credentials);
        if (!result.success) {
          throw new InvalidLoginError("Invalid username or password");
        }

        const user = await prisma.user.findUnique({
          where: { username: result.data.username },
        });

        if (!user?.password) {
          throw new InvalidLoginError("Invalid username or password");
        }

        const isValid = await bcrypt.compare(
          result.data.password,
          user.password,
        );

        if (!isValid) {
          throw new InvalidLoginError("Invalid username or password");
        }

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: authRoutes.signIn,
  },
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
});
