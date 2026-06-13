import Link from "next/link"
import { Globe2, Users, Wallet, TrendingUp, MapPin, Star, ArrowRight, Plane } from "lucide-react"
import {
  destinations,
  sampleTripsPlanned,
  averageTripBudget,
  formatINR,
  calculateBudget,
} from "@/lib/data"

const recentTrips = [
  { dest: "goa", name: "Goa", days: 4, category: "Standard", traveler: "Aarav S." },
  { dest: "manali", name: "Manali", days: 5, category: "Luxury", traveler: "Diya P." },
  { dest: "jaipur", name: "Jaipur", days: 3, category: "Budget", traveler: "Kabir M." },
  { dest: "coorg", name: "Coorg", days: 4, category: "Standard", traveler: "Meera R." },
  { dest: "ooty", name: "Ooty", days: 3, category: "Budget", traveler: "Rohan T." },
] as const

export default function DashboardPage() {
  const topRated = [...destinations].sort((a, b) => b.rating - a.rating)

  return (
    <>
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Dashboard</p>
          <h1 className="mt-2 text-balance text-3xl font-bold text-foreground md:text-4xl">
            TripWise at a glance
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            An overview of available destinations, planned trips and travel insights.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        {/* Stat cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<Globe2 className="h-5 w-5" />}
            value={`${destinations.length}`}
            label="Total destinations"
            trend="Across India"
          />
          <StatCard
            icon={<Users className="h-5 w-5" />}
            value={`${sampleTripsPlanned.toLocaleString("en-IN")}`}
            label="Sample trips planned"
            trend="+12% this month"
          />
          <StatCard
            icon={<Wallet className="h-5 w-5" />}
            value={formatINR(averageTripBudget)}
            label="Average trip budget"
            trend="Standard style"
          />
          <StatCard
            icon={<Star className="h-5 w-5" />}
            value="4.7"
            label="Avg. destination rating"
            trend="Out of 5.0"
          />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* Popular destination cards */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Top-rated destinations</h2>
              <Link href="/destinations" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {topRated.slice(0, 4).map((d) => (
                <Link
                  key={d.slug}
                  href={`/destinations/${d.slug}`}
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
            <h2 className="text-xl font-bold text-foreground">Recent trips planned</h2>
            <div className="mt-5 space-y-3">
              {recentTrips.map((t, i) => {
                const dest = destinations.find((d) => d.slug === t.dest)!
                const total = calculateBudget(dest, t.days, t.category).total
                return (
                  <div key={i} className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-3.5 shadow-sm">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Plane className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {t.days}-day {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{t.traveler} · {t.category}</p>
                    </div>
                    <span className="text-sm font-bold text-primary">{formatINR(total)}</span>
                  </div>
                )
              })}
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
              const max = Math.max(...destinations.map((x) => x.baseBudget))
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
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

function StatCard({
  icon,
  value,
  label,
  trend,
}: {
  icon: React.ReactNode
  value: string
  label: string
  trend: string
}) {
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
  )
}
