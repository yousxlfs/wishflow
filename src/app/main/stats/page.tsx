import { PageTransition } from "@/components/layout/page-transition";

export default function StatsPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="font-display text-3xl font-semibold">Статистика</h1>
        <p className="mt-2 text-muted-foreground">
          Аналитика по вишлистам и подпискам появится здесь позже.
        </p>
      </div>
    </PageTransition>
  );
}
