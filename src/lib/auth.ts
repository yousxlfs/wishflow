import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { authConfig } from "@/lib/auth.config";
import { prisma } from "@/lib/db";

class InvalidLoginError extends Error {
  code = "invalid_credentials";
}

const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
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
});
