import { redirect } from "next/navigation";
import { authRoutes } from "@/lib/auth/routes";

export default function LegacySignUpRedirect() {
  redirect(authRoutes.signUp);
}
