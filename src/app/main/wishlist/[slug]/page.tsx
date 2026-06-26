import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/layout/page-transition";
import { Badge } from "@/components/ui/badge";
import {
  WishlistItemCard,
  type WishlistItemData,
} from "@/components/wishlist/wishlist-item-card";
import { appRoutes } from "@/lib/auth/routes";

const mockWishlists: Record<
  string,
  { title: string; description: string; isPublic: boolean; items: WishlistItemData[] }
> = {
  "birthday-2026": {
    title: "День рождения",
    description: "Подарки, которые хочу получить в этом году",
    isPublic: true,
    items: [
      {
        id: 1,
        name: "Kindle Paperwhite",
        description: "Электронная книга для чтения перед сном",
        price: 14990,
        url: "https://example.com",
        isReserved: false,
      },
      {
        id: 2,
        name: "Набор керамических кружек",
        description: "Тёплые оттенки, 4 штуки",
        price: 3200,
        isReserved: true,
      },
      {
        id: 3,
        name: "Плед из мериноса",
        price: 8900,
        isReserved: false,
      },
    ],
  },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function WishlistDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const wishlist = mockWishlists[slug];

  if (!wishlist) {
    notFound();
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href={appRoutes.dashboard} className="hover:text-foreground">
            Wishlists
          </Link>
          <ChevronRight className="size-4" />
          <span className="text-foreground">{wishlist.title}</span>
        </nav>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">
              {wishlist.title}
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">{wishlist.description}</p>
          </div>
          <Badge variant={wishlist.isPublic ? "public" : "private"}>
            {wishlist.isPublic ? "Публичный" : "Приватный"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.items.map((item) => (
            <WishlistItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
