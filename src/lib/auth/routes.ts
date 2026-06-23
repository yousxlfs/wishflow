export const authRoutes = {
  signIn: "/auth/signin",
  signUp: "/auth/signup",
} as const;

export const appRoutes = {
  home: "/",
  dashboard: "/main/dasboard",
} as const;

export const protectedRoutes = ["/main"] as const;
