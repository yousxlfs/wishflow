"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { authRoutes } from "@/lib/auth/routes";
import { registerSchema } from "@/features/auth/lib/schemas";

export type AuthActionState = {
  success?: boolean;
  error?: string;
};

export async function registerUser(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const result = registerSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    const firstError = result.error.issues[0]?.message;
    return { error: firstError ?? "Неверные данные формы" };
  }

  const { username, password, name, email } = result.data;

  const existing = await prisma.user.findFirst({
    where: { OR: [{ username }, { email }] },
  });

  if (existing) {
    return { error: "Username или email уже заняты" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      name,
      email,
    },
  });

  redirect(authRoutes.signIn);
}

export async function logoutUser() {
  const { signOut } = await import("@/lib/auth.session");
  await signOut({ redirectTo: authRoutes.signIn });
}
