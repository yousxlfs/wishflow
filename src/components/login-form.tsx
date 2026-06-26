"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { authRoutes, appRoutes } from "@/lib/auth/routes";
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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") ?? "");
    const password = String(formData.get("password") ?? "");

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.error) {
      setError("Неверный username или пароль");
      return;
    }

    window.location.href = appRoutes.profileEdit;
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-border/80 bg-surface/90 shadow-xl backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Вход в аккаунт</CardTitle>
          <CardDescription>
            Введите username и пароль, чтобы войти в Wishflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <AnimatePresence>
                {error ? (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                  >
                    {error}
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
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Пароль</FieldLabel>
                  <Link
                    href="#"
                    className="ml-auto text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                  >
                    Забыли пароль?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                />
              </Field>

              <Field>
                <Button type="submit" className="w-full" isLoading={isLoading}>
                  Войти
                </Button>
              </Field>

              <FieldSeparator>или</FieldSeparator>

              <Field>
                <Button variant="outline" type="button" className="w-full" disabled>
                  Войти через Google
                </Button>
                <FieldDescription className="text-center">
                  Нет аккаунта?{" "}
                  <Link
                    href={authRoutes.signUp}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Зарегистрироваться
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
