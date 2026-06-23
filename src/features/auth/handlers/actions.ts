"use server";

export type AuthActionState = {
  success: boolean;
  message?: string;
};

/**
 * TODO: реализуй регистрацию
 * - проверь совпадение password / confirmPassword
 * - захешируй пароль (bcrypt)
 * - создай пользователя через prisma.user.create
 * - опционально: signIn("credentials", ...) после успеха
 */
export async function registerUser(
  _prevState: AuthActionState,
  _formData: FormData,
): Promise<AuthActionState> {
  return {
    success: false,
    message: "Регистрация ещё не подключена",
  };
}

/**
 * TODO: реализуй вход через credentials
 * - обычно вызывается signIn("credentials", { email, password, redirectTo })
 */
export async function loginWithCredentials(
  _formData: FormData,
): Promise<AuthActionState> {
  return {
    success: false,
    message: "Вход ещё не подключён",
  };
}

/**
 * TODO: реализуй выход
 * - await signOut({ redirectTo: "/auth/signin" })
 */
export async function logoutUser(): Promise<void> {
  // placeholder
}
