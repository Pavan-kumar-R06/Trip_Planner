import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, MapPin, Star, CalendarDays, Clock, Wallet, Sparkles, ArrowRight } from "lucide-react"
import { destinations, getDestination, formatINR } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }))
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const destination = getDestination(slug)
  if (!destination) notFound()

  return (
    <>
      {/* Hero banner */}
      <section className="relative h-[42vh] min-h-72 overflow-hidden">
        <img
          src={destination.image || "/placeholder.svg"}
          alt={`Scenic view of ${destination.name}`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/30" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-7xl px-4 pb-8 md:px-6">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              All destinations
            </Link>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Badge className="bg-accent text-accent-foreground hover:bg-accent">{destination.state}</Badge>
              <span className="flex items-center gap-1 text-sm font-medium text-white">
                <Star className="h-4 w-4 fill-accent text-accent" />
                {destination.rating}
              </span>
            </div>
            <h1 className="mt-2 text-balance text-4xl font-bold text-white md:text-5xl">
              {destination.name}
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-white/85">
              <MapPin className="h-4 w-4" />
              {destination.tagline}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-foreground">About {destination.name}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{destination.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {destination.highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-full bg-secondary px-3.5 py-1.5 text-sm font-medium text-secondary-foreground"
                >
                  {h}
                </span>
              ))}
            </div>

            <h3 className="mt-10 text-xl font-bold text-foreground">Popular attractions</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {destination.attractions.map((a) => (
                <div
                  key={a.name}
                  className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <h4 className="font-semibold text-foreground">{a.name}</h4>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
              <p className="text-sm text-muted-foreground">Estimated budget</p>
              <p className="text-3xl font-bold text-primary">
                {formatINR(destination.baseBudget)}
                <span className="text-sm font-normal text-muted-foreground">/day</span>
              </p>

              <div className="mt-5 space-y-3 border-t border-border/60 pt-5 text-sm">
                <InfoRow icon={<CalendarDays className="h-4 w-4 text-primary" />} label="Best time to visit" value={destination.bestTime} />
                <InfoRow icon={<Clock className="h-4 w-4 text-primary" />} label="Ideal duration" value={destination.idealDays} />
                <InfoRow icon={<Wallet className="h-4 w-4 text-primary" />} label="Per-day reference" value={formatINR(destination.baseBudget)} />
              </div>

              <Link
                href={`/planner?dest=${destination.slug}`}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                <Sparkles className="h-4 w-4" />
                Generate trip plan
              </Link>
              <Link
                href={`/calculator?dest=${destination.slug}`}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Estimate budget
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-muted-foreground">
        {icon}
        {label}
      </span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  )
}
