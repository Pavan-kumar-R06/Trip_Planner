import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  MapPin,
  CalendarDays,
  Compass,
  Sparkles,
  Clock,
  Utensils,
  Wallet,
  Star,
  ArrowRight,
  Check,
} from "lucide-react";
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
import { useToast } from "@/components/toast-provider";

export default function PlannerPage() {
  const [searchParams] = useSearchParams();

  const [destinations, setDestinations] = useState([]);
  const [options, setOptions] = useState(null);

  const [destSlug, setDestSlug] = useState(searchParams.get("dest") || "");
  const [days, setDays] = useState(searchParams.get("days") || "4");
  const [category, setCategory] = useState(searchParams.get("category") || "Standard");

  const [destination, setDestination] = useState(null);
  const [itinerary, setItinerary] = useState([]);
  const [budget, setBudget] = useState(null);
  const [saved, setSaved] = useState(false);
  const { addToast } = useToast();

  // Load destination list + planner options once, then settle on an initial destination.
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

  // Whenever the selection changes, ask the backend to build the plan.
  useEffect(() => {
    if (!destSlug) return;
    const numDays = Number(days) > 0 ? Number(days) : 4;
    setSaved(false);
    api.getItinerary(destSlug, numDays, category).then((res) => {
      setDestination(res.destination);
      setItinerary(res.itinerary);
      setBudget(res.budget);
    });
  }, [destSlug, days, category]);

  async function handleSaveTrip() {
    if (!destination || !budget) return;
    try {
      await api.saveTrip({
        destinationSlug: destination.slug,
        days: Number(days),
        category,
        totalBudget: budget.total,
      });
      setSaved(true);
      addToast("Trip saved successfully.", "success");
    } catch (error) {
      addToast(error.message || "Unable to save trip.", "error");
    }
  }

  if (!destination || !budget || !options) {
    return <div className="mx-auto max-w-7xl px-4 py-20 text-muted-foreground md:px-6">Loading your trip plan…</div>;
  }

  const numDays = Number(days);

  return (
    <>
      {/* Header + controls */}
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Trip Planner</p>
          <h1 className="mt-2 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Your personalized itinerary
          </h1>
          <p className="mt-2 text-muted-foreground">
            Adjust the options below and your plan updates instantly.
          </p>

          <div className="mt-8 grid gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-sm md:grid-cols-3">
            <Control label="Destination" icon={<MapPin className="h-4 w-4 text-primary" />}>
              <Select value={destSlug} onValueChange={(v) => setDestSlug(v ?? "")}>
                <SelectTrigger className="w-full border-0 bg-transparent px-0 text-sm font-semibold shadow-none focus-visible:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((d) => (
                    <SelectItem key={d.slug} value={d.slug}>{d.name}, {d.state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Control>

            <Control label="Number of days" icon={<CalendarDays className="h-4 w-4 text-primary" />}>
              <Select value={days} onValueChange={(v) => setDays(v ?? "4")}>
                <SelectTrigger className="w-full border-0 bg-transparent px-0 text-sm font-semibold shadow-none focus-visible:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {options.dayOptions.map((d) => (
                    <SelectItem key={d} value={String(d)}>{d} days</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Control>

            <Control label="Travel style" icon={<Compass className="h-4 w-4 text-primary" />}>
              <Select value={category} onValueChange={(v) => setCategory(v ?? "Standard")}>
                <SelectTrigger className="w-full border-0 bg-transparent px-0 text-sm font-semibold shadow-none focus-visible:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {options.travelCategories.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Control>
          </div>
        </div>
      </section>

      {/* Travel summary card */}
      <section className="mx-auto max-w-7xl px-4 pt-12 md:px-6">
        <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
          <div className="grid md:grid-cols-5">
            <div className="relative md:col-span-2">
              <img
                src={destination.image || "/placeholder.svg"}
                alt={`Scenic view of ${destination.name}`}
                className="h-56 w-full object-cover md:h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-r" />
            </div>
            <div className="p-6 md:col-span-3 md:p-8">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                Trip Summary
              </div>
              <h2 className="mt-2 text-2xl font-bold text-foreground">
                {numDays}-Day {category} Trip to {destination.name}
              </h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{destination.description}</p>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <SummaryStat icon={<Clock className="h-4 w-4" />} label="Duration" value={`${numDays} days`} />
                <SummaryStat icon={<Star className="h-4 w-4" />} label="Rating" value={`${destination.rating}/5`} />
                <SummaryStat icon={<CalendarDays className="h-4 w-4" />} label="Best time" value={destination.bestTime} />
                <SummaryStat icon={<Wallet className="h-4 w-4" />} label="Est. total" value={formatINR(budget.total)} />
              </div>

              <button
                onClick={handleSaveTrip}
                disabled={saved}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
              >
                {saved ? <Check className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                {saved ? "Saved to your trips" : "Save this trip"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary + budget */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Itinerary timeline */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-foreground">Day-wise itinerary</h2>
            <div className="mt-6 space-y-5">
              {itinerary.map((day, idx) => (
                <div key={idx} className="relative rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                        D{idx + 1}
                      </span>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Day {idx + 1}
                        </p>
                        <h3 className="text-lg font-bold text-foreground">{day.title}</h3>
                      </div>
                    </div>
                    <span className="rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground">
                      {formatINR(day.estimatedExpense)}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {day.activities.map((act, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {act}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
                    <span className="text-xs font-medium text-muted-foreground">Attractions:</span>
                    {day.attractions.map((a) => (
                      <span
                        key={a}
                        className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent-foreground"
                      >
                        <MapPin className="h-3 w-3" />
                        {a}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Utensils className="h-3.5 w-3.5" />
                    {day.meals}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Budget sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              <BudgetBreakdownCard breakdown={budget} />
              <div className="rounded-2xl border border-border/60 bg-secondary/40 p-5 text-sm">
                <p className="font-semibold text-foreground">Want a deeper cost estimate?</p>
                <p className="mt-1 text-muted-foreground">
                  Use the calculator to compare travel styles side by side.
                </p>
                <Link
                  to={`/calculator?dest=${destSlug}&days=${days}&category=${category}`}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
                >
                  Open Budget Calculator
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Control({ label, icon, children }) {
  return (
    <div className="rounded-xl border border-border/60 bg-background px-4 py-2.5">
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-0.5">{children}</div>
    </div>
  );
}

function SummaryStat({ icon, label, value }) {
  return (
    <div className="rounded-xl bg-secondary/50 p-3">
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {label}
      </span>
      <p className="mt-1 text-sm font-bold text-foreground">{value}</p>
    </div>
  );
}
