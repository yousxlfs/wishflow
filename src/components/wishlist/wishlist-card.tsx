"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Gift, Lock, Unlock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type WishlistCardData = {
  id: number;
  title: string;
  description?: string | null;
  slug: string;
  isPublic: boolean;
  itemCount: number;
  createdAt: string;
};

export function WishlistCard({ wishlist }: { wishlist: WishlistCardData }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link href={`/main/wishlist/${wishlist.slug}`}>
        <Card className="group h-full hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
          <CardHeader className="gap-3">
            <div className="flex items-start justify-between gap-3">
              <CardTitle className="line-clamp-2 text-lg">{wishlist.title}</CardTitle>
              <Badge variant={wishlist.isPublic ? "public" : "private"}>
                {wishlist.isPublic ? (
                  <>
                    <Unlock className="size-3" /> Публичный
                  </>
                ) : (
                  <>
                    <Lock className="size-3" /> Приватный
                  </>
                )}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {wishlist.description || "Без описания"}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Gift className="size-3.5" />
                {wishlist.itemCount} items
              </span>
              <span className={cn("inline-flex items-center gap-1")}>
                <Calendar className="size-3.5" />
                {wishlist.createdAt}
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
