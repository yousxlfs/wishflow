import Link from "next/link";
import { cn } from "@/lib/utils";
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

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle>Создать аккаунт</CardTitle>
        <CardDescription>
          Заполни форму, чтобы начать собирать списки желаний
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* TODO: добавь action / onSubmit и server action registerUser */}
        <form>
          <FieldGroup>
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
              <FieldDescription>
                Используем только для входа и уведомлений.
              </FieldDescription>
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
              <Button type="submit" className="w-full">
                Создать аккаунт
              </Button>
            </Field>
            <FieldSeparator>или</FieldSeparator>
            <Field>
              {/* TODO: onClick -> signIn("google") */}
              <Button variant="outline" type="button" className="w-full">
                Регистрация через Google
              </Button>
              <FieldDescription className="text-center">
                Уже есть аккаунт?{" "}
                <Link href={authRoutes.signIn} className="underline-offset-4 hover:underline">
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
