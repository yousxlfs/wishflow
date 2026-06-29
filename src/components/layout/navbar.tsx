"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { appRoutes } from "@/lib/auth/routes";
import { logoutUser } from "@/features/auth/handlers/actions";
import { cn } from "@/lib/utils";

type NavbarProps = {
  userName?: string;
  userImage?: string | null;
};

const navLinks = [
  { href: appRoutes.dashboard, label: "Вишлисты" },
  { href: "/main/stats", label: "Статистика" },
  { href: appRoutes.profileEdit, label: "Профиль" },
];

export function Navbar({ userName = "Пользователь", userImage }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const initials = userName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href={appRoutes.dashboard} className="font-display text-xl font-semibold">
          Wishflow
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-2 py-1.5">
            <Avatar className="size-8">
              {userImage ? <AvatarImage src={userImage} alt={userName} /> : null}
              <AvatarFallback className="bg-primary/15 text-xs text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="max-w-28 truncate text-sm">{userName}</span>
          </div>
          <form action={logoutUser}>
            <Button variant="ghost" size="sm" type="submit">
              Выйти
            </Button>
          </form>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Меню"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <form action={logoutUser} className="pt-2">
                <Button variant="outline" className="w-full" type="submit">
                  Выйти
                </Button>
              </form>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
