import { signOut } from "@/lib/auth.session";
import { authRoutes } from "@/lib/auth/routes";

export default async function SignOutPage() {
  await signOut({ redirectTo: authRoutes.signIn });
}
