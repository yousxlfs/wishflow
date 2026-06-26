"use client";

import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/navbar";

export function MainShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
