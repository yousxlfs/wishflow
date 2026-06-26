import { redirect } from "next/navigation";
import { appRoutes } from "@/lib/auth/routes";

export default function LegacyWishlistIndexPage() {
  redirect(appRoutes.dashboard);
}
