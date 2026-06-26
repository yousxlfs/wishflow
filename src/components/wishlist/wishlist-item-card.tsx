"use client";

import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export type WishlistItemData = {
  id: number;
  name: string;
  description?: string | null;
  price?: number | null;
  url?: string | null;
  isReserved: boolean;
};

export function WishlistItemCard({ item }: { item: WishlistItemData }) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden hover:border-primary/30">
        <div className="aspect-[4/3] bg-gradient-to-br from-muted to-secondary" />
        <CardContent className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium leading-snug">{item.name}</h3>
            {item.isReserved ? <Badge variant="reserved">Забронировано</Badge> : null}
          </div>
          {item.description ? (
            <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
          ) : null}
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium text-primary">
              {item.price ? `${item.price.toLocaleString("ru-RU")} ₽` : "Цена не указана"}
            </span>
            {item.url ? (
              <Button variant="outline" size="sm" asChild>
                <a href={item.url} target="_blank" rel="noreferrer">
                  <ExternalLink className="size-3.5" />
                  Ссылка
                </a>
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
