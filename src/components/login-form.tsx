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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Вход в аккаунт</CardTitle>
          <CardDescription>
            Введите email и пароль, чтобы войти в Wishflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* TODO: добавь action / onSubmit и вызов signIn("credentials", ...) */}
          <form>
            <FieldGroup>
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
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Пароль</FieldLabel>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
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
                <Button type="submit" className="w-full">
                  Войти
                </Button>
              </Field>
              <FieldSeparator>или</FieldSeparator>
              <Field>
                {/* TODO: onClick -> signIn("google") */}
                <Button variant="outline" type="button" className="w-full">
                  Войти через Google
                </Button>
                <FieldDescription className="text-center">
                  Нет аккаунта?{" "}
                  <Link href={authRoutes.signUp} className="underline-offset-4 hover:underline">
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
