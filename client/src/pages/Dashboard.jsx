import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Globe2, Users, Wallet, TrendingUp, MapPin, Star, ArrowRight, Plane } from "lucide-react";
import { api } from "@/lib/api";
import { formatINR } from "@/lib/format";

export default function DashboardPage({ currentUser }) {
  const [destinations, setDestinations] = useState([]);
  const [recentTrips, setRecentTrips] = useState([]);
  const [stats, setStats] = useState(null);

  // useEffect(() => {
  //   api.getDestinations().then(setDestinations).catch(() => {});
  //   api.getRecentTrips(5).then(setRecentTrips).catch(() => {});
  //   api.getTripStats().then(setStats).catch(() => {});
  // }, []);
useEffect(() => {
  api.getDestinations().then(setDestinations).catch(() => {});

  if (currentUser) {
    api.getRecentTrips(currentUser.id, 5)
      .then(setRecentTrips)
      .catch(() => {});

    api.getTripStats(currentUser.id)
      .then(setStats)
      .catch(() => {});
  }
}, [currentUser]);
  const topRated = [...destinations].sort((a, b) => b.rating - a.rating);
  const avgRating = destinations.length
    ? (destinations.reduce((sum, d) => sum + d.rating, 0) / destinations.length).toFixed(1)
    : "—";

  return (
    <>
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Dashboard</p>
          <h1 className="mt-2 text-balance text-3xl font-bold text-foreground md:text-4xl">
            TripWise at a glance
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            An overview of available destinations, planned trips and travel insights — live from the database.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        {/* Stat cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<Globe2 className="h-5 w-5" />}
            value={`${stats?.destinationCount ?? destinations.length}`}
            label="Total destinations"
            trend="Across India"
          />
          <StatCard
            icon={<Users className="h-5 w-5" />}
            value={`${(stats?.tripCount ?? 0).toLocaleString("en-IN")}`}
            label="Trips saved"
            trend="Stored in MongoDB"
          />
          <StatCard
            icon={<Wallet className="h-5 w-5" />}
            value={formatINR(stats?.averageTripBudget ?? 0)}
            label="Average trip budget"
            trend="Across saved trips"
          />
          <StatCard
            icon={<Star className="h-5 w-5" />}
            value={avgRating}
            label="Avg. destination rating"
            trend="Out of 5.0"
          />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* Popular destination cards */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Top-rated destinations</h2>
              <Link to="/destinations" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {topRated.slice(0, 4).map((d) => (
                <Link
                  key={d.slug}
                  to={`/destinations/${d.slug}`}
                  className="group flex gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <img
                    src={d.image || "/placeholder.svg"}
                    alt={d.name}
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {d.state}
                    </div>
                    <h3 className="mt-0.5 truncate font-bold text-foreground">{d.name}</h3>
                    <div className="mt-1 flex items-center gap-2 text-xs">
                      <span className="flex items-center gap-0.5 font-semibold text-foreground">
                        <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                        {d.rating}
                      </span>
                      <span className="text-muted-foreground">{formatINR(d.baseBudget)}/day</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent trips */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-foreground">Recently saved trips</h2>
            <div className="mt-5 space-y-3">
              {recentTrips.length === 0 && (
                <div className="rounded-xl border border-dashed border-border/60 p-5 text-sm text-muted-foreground">
                  No trips saved yet. Plan a trip and hit "Save this trip" to see it here.
                </div>
              )}
              {recentTrips.map((t) => (
                <div key={t._id} className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-3.5 shadow-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Plane className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {t.days}-day {t.destinationName}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.category}</p>
                  </div>
                  <span className="text-sm font-bold text-primary">{formatINR(t.totalBudget)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Budget distribution by destination */}
        <div className="mt-10 rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Per-day budget by destination</h2>
          </div>
          <div className="mt-6 space-y-4">
            {destinations.map((d) => {
              const max = Math.max(...destinations.map((x) => x.baseBudget));
              return (
                <div key={d.slug}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{d.name}</span>
                    <span className="font-semibold text-muted-foreground">{formatINR(d.baseBudget)}/day</span>
                  </div>
                  <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${Math.round((d.baseBudget / max) * 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

function StatCard({ icon, value, label, trend }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </span>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
          {trend}
        </span>
      </div>
      <p className="mt-4 text-3xl font-bold text-foreground">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
