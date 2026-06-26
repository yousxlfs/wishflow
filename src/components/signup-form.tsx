"use client";

import Link from "next/link";
import { useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { registerUser, type AuthActionState } from "@/features/auth/handlers/actions";
import { authRoutes } from "@/lib/auth/routes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const initialState: AuthActionState = {};

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  const [state, formAction, isPending] = useActionState(registerUser, initialState);

  return (
    <Card
      className={cn("border-border/80 bg-surface/90 shadow-xl backdrop-blur-sm", className)}
      {...props}
    >
      <CardHeader>
        <CardTitle>Создать аккаунт</CardTitle>
        <CardDescription>
          Заполни форму, чтобы начать собирать списки желаний
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            <AnimatePresence>
              {state.error ? (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                >
                  {state.error}
                </motion.div>
              ) : null}
            </AnimatePresence>

            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="ivan_wish"
                autoComplete="username"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="name">Имя</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Иван"
                autoComplete="name"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Пароль</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
              />
              <FieldDescription>Минимум 8 символов.</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">Подтверждение пароля</FieldLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </Field>

            <Field>
              <Button type="submit" className="w-full" isLoading={isPending}>
                Создать аккаунт
              </Button>
            </Field>

            <FieldSeparator>или</FieldSeparator>

            <Field>
              <Button variant="outline" type="button" className="w-full" disabled>
                Регистрация через Google
              </Button>
              <FieldDescription className="text-center">
                Уже есть аккаунт?{" "}
                <Link
                  href={authRoutes.signIn}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Войти
                </Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
