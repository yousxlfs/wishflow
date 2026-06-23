import { redirect } from "next/navigation";
import { authRoutes } from "@/lib/auth/routes";

export default function LegacySignInRedirect() {
  redirect(authRoutes.signIn);
}
