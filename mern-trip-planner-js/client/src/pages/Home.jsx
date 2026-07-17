import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Map, Wallet, CalendarRange, ArrowRight, Globe2, Users, Star } from "lucide-react";
import { SearchForm } from "@/components/search-form";
import { DestinationCard } from "@/components/destination-card";
import { api } from "@/lib/api";
import { formatINR } from "@/lib/format";

export default function HomePage() {
  const [destinations, setDestinations] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.getDestinations().then(setDestinations).catch(() => {});
    api.getTripStats().then(setStats).catch(() => {});
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/hero-travel.png"
            alt="Aerial view of a tropical coastline"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/65" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 md:px-6 md:pb-24 md:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background/15 px-4 py-1.5 text-sm font-medium text-white ring-1 ring-white/25 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Smart Trip Planning, Made Simple
            </span>
            <h1 className="mt-6 text-balance text-4xl font-bold leading-tight text-white md:text-6xl">
              Plan your perfect trip in seconds
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-white/85 md:text-lg">
              Tell us where, how long and your style. TripWise instantly builds a day-wise itinerary
              with attractions, budget breakdowns and travel summaries.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-border/60 bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 md:grid-cols-4 md:px-6">
          <Stat icon={<Globe2 className="h-5 w-5" />} value={`${stats?.destinationCount ?? destinations.length}`} label="Destinations" />
          <Stat icon={<Users className="h-5 w-5" />} value={`${(stats?.tripCount ?? 0).toLocaleString("en-IN")}+`} label="Trips planned" />
          <Stat icon={<Wallet className="h-5 w-5" />} value={formatINR(stats?.averageTripBudget ?? 0)} label="Avg. trip budget" />
          <Stat icon={<Star className="h-5 w-5" />} value="4.7/5" label="Traveler rating" />
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            Travel planning without the stress
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Three simple steps from idea to a complete, ready-to-go travel plan.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Feature
            icon={<Map className="h-6 w-6" />}
            step="01"
            title="Pick a destination"
            desc="Choose from curated destinations across India, each with attractions and best times to visit."
          />
          <Feature
            icon={<CalendarRange className="h-6 w-6" />}
            step="02"
            title="Get a day-wise plan"
            desc="Instantly generate a detailed itinerary with activities and attractions for every day."
          />
          <Feature
            icon={<Wallet className="h-6 w-6" />}
            step="03"
            title="See the full budget"
            desc="Transparent cost breakdown for stay, food, transport and sightseeing — no surprises."
          />
        </div>
      </section>

      {/* Popular destinations */}
      <section className="bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
                Popular destinations
              </h2>
              <p className="mt-3 max-w-lg text-pretty text-muted-foreground">
                Handpicked getaways loved by travelers — from beaches to misty hills.
              </p>
            </div>
            <Link
              to="/destinations"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              View all destinations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d) => (
              <DestinationCard key={d.slug} destination={d} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center md:px-12">
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-bold text-primary-foreground md:text-4xl">
              Ready to plan your next adventure?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-pretty text-primary-foreground/85">
              Build a complete itinerary and budget in seconds. No sign-up required.
            </p>
            <Link
              to="/planner"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-background px-7 py-3.5 text-sm font-semibold text-foreground transition-transform hover:scale-105"
            >
              Start planning now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
        {icon}
      </span>
      <div>
        <p className="text-xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function Feature({ icon, step, title, desc }) {
  return (
    <div className="relative rounded-2xl border border-border/60 bg-card p-7 shadow-sm transition-shadow hover:shadow-md">
      <span className="absolute right-6 top-6 text-3xl font-bold text-secondary">{step}</span>
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </span>
      <h3 className="mt-5 text-lg font-bold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  );
}
