import { useEffect, useState } from "react";
import { DestinationCard } from "@/components/destination-card";
import { api } from "@/lib/api";

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getDestinations()
      .then(setDestinations)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Explore</p>
          <h1 className="mt-2 text-balance text-4xl font-bold text-foreground md:text-5xl">
            Discover your next destination
          </h1>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            Browse our curated collection of India's most-loved getaways. Each destination includes
            attractions, estimated budgets and the best time to visit.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        {loading ? (
          <p className="text-muted-foreground">Loading destinations…</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d) => (
              <DestinationCard key={d.slug} destination={d} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
