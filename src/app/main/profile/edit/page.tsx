import Link from "next/link";
import { PageTransition } from "@/components/layout/page-transition";
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
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { appRoutes } from "@/lib/auth/routes";

export default function ProfileEditPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">
            Настройка профиля
          </h1>
          <p className="mt-2 text-muted-foreground">
            Заполни профиль после регистрации. Логика сохранения подключится позже.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Основная информация</CardTitle>
            <CardDescription>
              Эти данные будут видны в публичном профиле и вишлистах
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="size-16">
                  <AvatarImage src="" alt="Avatar" />
                  <AvatarFallback className="bg-primary/15 text-lg text-primary">
                    WF
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" type="button">
                  Загрузить фото
                </Button>
              </div>

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Имя</FieldLabel>
                  <Input id="name" name="name" placeholder="Как тебя называть" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input id="username" name="username" placeholder="ivan_wish" />
                  <FieldDescription>Используется для входа и публичной ссылки</FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="bio">О себе</FieldLabel>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Коротко о себе и своих интересах"
                    className="min-h-28 rounded-xl"
                  />
                </Field>
              </FieldGroup>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button variant="outline" type="button" asChild>
                  <Link href={appRoutes.dashboard}>Пропустить</Link>
                </Button>
                <Button type="submit">Сохранить профиль</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
