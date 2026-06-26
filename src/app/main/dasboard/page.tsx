import { Plus } from "lucide-react";
import { PageTransition } from "@/components/layout/page-transition";
import { Button } from "@/components/ui/button";
import {
  WishlistCard,
  type WishlistCardData,
} from "@/components/wishlist/wishlist-card";

const mockWishlists: WishlistCardData[] = [
  {
    id: 1,
    title: "День рождения",
    description: "Подарки, которые хочу получить в этом году",
    slug: "birthday-2026",
    isPublic: true,
    itemCount: 8,
    createdAt: "12 мар 2026",
  },
  {
    id: 2,
    title: "Для дома",
    description: "Мелочи для уюта и кухни",
    slug: "home-essentials",
    isPublic: false,
    itemCount: 5,
    createdAt: "3 мар 2026",
  },
  {
    id: 3,
    title: "Wishlist мечты",
    description: "Большие покупки, к которым коплю",
    slug: "dream-list",
    isPublic: true,
    itemCount: 12,
    createdAt: "20 фев 2026",
  },
];

export default function DashboardPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">
              My Wishlists
            </h1>
            <p className="mt-2 text-muted-foreground">
              Управляй подборками и делись ими с близкими
            </p>
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="size-4" />
            New Wishlist
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {mockWishlists.map((wishlist) => (
            <WishlistCard key={wishlist.id} wishlist={wishlist} />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Показаны демо-карточки. Подключи данные из Prisma, когда будешь готов.
        </p>
      </div>
    </PageTransition>
  );
}
