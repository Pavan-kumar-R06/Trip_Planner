import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { MapPin, CalendarDays, Compass, Minus, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BudgetBreakdownCard } from "@/components/budget-breakdown-card";
import { api } from "@/lib/api";
import { formatINR } from "@/lib/format";

export default function CalculatorPage({ currentUser }) {
  const [searchParams] = useSearchParams();

  // anonymous users may use the calculator; no auth required to generate estimates

  const [destinations, setDestinations] = useState([]);
  const [options, setOptions] = useState(null);

  const [destSlug, setDestSlug] = useState(searchParams.get("dest") || "");
  const initialDays = Number(searchParams.get("days") ?? 4);
  const [days, setDays] = useState(Number.isFinite(initialDays) && initialDays > 0 ? initialDays : 4);
  const [category, setCategory] = useState(searchParams.get("category") || "Standard");

  const [destination, setDestination] = useState(null);
  const [breakdown, setBreakdown] = useState(null);
  const [comparison, setComparison] = useState([]);

  useEffect(() => {
    Promise.all([api.getDestinations(), api.getPlannerOptions()]).then(([dests, opts]) => {
      setDestinations(dests);
      setOptions(opts);
      const requested = searchParams.get("dest");
      const valid = requested && dests.some((d) => d.slug === requested);
      setDestSlug(valid ? requested : dests[0]?.slug || "");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!destSlug) return;
    const cacheKey = `budget:${destSlug}:${days}:${category}`;
    const cached = api.getCached?.(cacheKey);
    if (cached) {
      setDestination(cached.destination);
      setBreakdown(cached.breakdown);
      setComparison(cached.comparison);
      return;
    }

    api.getBudget(destSlug, days, category).then((res) => {
      setDestination(res.destination);
      setBreakdown(res.breakdown);
      setComparison(res.comparison);
    });
  }, [destSlug, days, category, currentUser]);

  if (!options) {
    return <div className="mx-auto max-w-7xl px-4 py-20 text-muted-foreground md:px-6">Loading calculator…</div>;
  }

  const maxTotal = Math.max(...comparison.map((c) => c.total));

  const safeMaxTotal = comparison.length ? maxTotal : 1;

  return (
    <>
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Budget Calculator</p>
          <h1 className="mt-2 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Estimate your trip cost
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Pick a destination, duration and travel style to see a transparent cost breakdown.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        {/* Calculator usable by anonymous users; sign-in only required for saving trips */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Inputs */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
              <h2 className="text-lg font-bold text-foreground">Trip details</h2>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    Destination
                  </label>
                  <Select value={destSlug} onValueChange={(v) => setDestSlug(v ?? "")}>
                    <SelectTrigger className="mt-2 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {destinations.map((d) => (
                        <SelectItem key={d.slug} value={d.slug}>{d.name}, {d.state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <CalendarDays className="h-4 w-4 text-primary" />
                    Number of days
                  </label>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setDays((d) => Math.max(1, d - 1))}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-foreground transition-colors hover:bg-secondary"
                      aria-label="Decrease days"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <div className="flex h-10 flex-1 items-center justify-center rounded-xl bg-secondary text-base font-bold text-foreground">
                      {days} {days === 1 ? "day" : "days"}
                    </div>
                    <button
                      type="button"
                      onClick={() => setDays((d) => Math.min(14, d + 1))}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-foreground transition-colors hover:bg-secondary"
                      aria-label="Increase days"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <Compass className="h-4 w-4 text-primary" />
                    Travel style
                  </label>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {options.travelCategories.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCategory(c)}
                        className={
                          "rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors " +
                          (category === c
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:bg-secondary")
                        }
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{options.categoryFactors[category].label}</p>
                </div>
              </div>
            </div>

            {/* Comparison */}
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
              <h3 className="text-base font-bold text-foreground">Compare travel styles</h3>
              <div className="mt-4 space-y-3">
                {comparison.map((c) => (
                  <div key={c.category}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">{c.category}</span>
                      <span className="font-semibold text-foreground">{formatINR(c.total)}</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${Math.round((c.total / safeMaxTotal) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Result */}
          <div>
              <div className="sticky top-24">
              <BudgetBreakdownCard breakdown={breakdown} />
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Estimates for {days}-day {category.toLowerCase()} trip to {destination?.name || "destination"}. Data served live from MongoDB.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
