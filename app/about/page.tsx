import Link from "next/link"
import {
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  Rocket,
  Map,
  Wallet,
  CalendarRange,
  LayoutDashboard,
  Globe2,
  ArrowRight,
} from "lucide-react"

const keyFeatures = [
  { icon: Map, title: "Curated Destinations", desc: "Detailed guides with attractions, budgets and best times to visit." },
  { icon: CalendarRange, title: "Smart Itinerary", desc: "Auto-generated day-wise plans tailored to trip length." },
  { icon: Wallet, title: "Budget Calculator", desc: "Transparent cost breakdown across travel styles." },
  { icon: LayoutDashboard, title: "Insights Dashboard", desc: "Visual stats on destinations, trips and budgets." },
  { icon: Globe2, title: "Responsive Design", desc: "Polished experience on mobile, tablet and desktop." },
  { icon: Sparkles, title: "Zero Setup", desc: "Works instantly with sample data — no backend required." },
]

const benefits = [
  "Saves hours of manual research and planning",
  "Gives clear, upfront budget expectations",
  "Beginner-friendly for first-time travelers",
  "Consistent, structured trip information",
  "Instant results with smooth interactions",
  "Deployable anywhere without infrastructure",
]

const futureScope = [
  { title: "Live data integration", desc: "Connect real APIs for flights, hotels and weather." },
  { title: "AI-powered suggestions", desc: "Personalized recommendations from traveler preferences." },
  { title: "User accounts & saved trips", desc: "Save, edit and share itineraries across devices." },
  { title: "Bookings & payments", desc: "End-to-end booking with secure checkout." },
]

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60 bg-primary">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-background/15 px-4 py-1.5 text-sm font-medium text-primary-foreground ring-1 ring-white/20">
            <Sparkles className="h-4 w-4" />
            About the Project
          </span>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-bold text-primary-foreground md:text-5xl">
            TripWise — Smart Trip Planning Platform
          </h1>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-primary-foreground/85">
            A college ideathon project that reimagines how travelers plan trips — turning scattered
            research into a single, instant, and beautifully organized travel plan.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-14 md:px-6">
        {/* Problem & Solution */}
        <div className="grid gap-6 md:grid-cols-2">
          <Panel
            icon={<AlertTriangle className="h-6 w-6" />}
            accent="bg-accent/20 text-accent-foreground"
            title="Problem Statement"
          >
            <p className="leading-relaxed text-muted-foreground">
              Planning a trip is overwhelming. Travelers juggle multiple websites for destinations,
              itineraries, and costs — leading to confusion, wasted time, and unexpected expenses.
              There is no single, simple tool that delivers a complete, budget-aware plan instantly.
            </p>
          </Panel>

          <Panel
            icon={<Lightbulb className="h-6 w-6" />}
            accent="bg-primary/10 text-primary"
            title="Proposed Solution"
          >
            <p className="leading-relaxed text-muted-foreground">
              TripWise centralizes the entire planning journey. Users pick a destination, duration and
              travel style, and instantly receive a day-wise itinerary, attraction highlights, and a
              transparent budget breakdown — all in one clean, responsive interface.
            </p>
          </Panel>
        </div>

        {/* Key Features */}
        <section className="mt-14">
          <SectionHeading
            icon={<Sparkles className="h-5 w-5" />}
            title="Key Features"
            subtitle="Everything needed to plan a complete trip in one place."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {keyFeatures.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-bold text-foreground">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Benefits */}
        <section className="mt-14">
          <SectionHeading
            icon={<CheckCircle2 className="h-5 w-5" />}
            title="Benefits"
            subtitle="Why TripWise makes travel planning effortless."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {benefits.map((b) => (
              <div key={b} className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-4 shadow-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed text-foreground">{b}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Future Scope */}
        <section className="mt-14">
          <SectionHeading
            icon={<Rocket className="h-5 w-5" />}
            title="Future Scope"
            subtitle="How TripWise can evolve into a full-scale product."
          />
          <div className="mt-8 space-y-4">
            {futureScope.map((item, i) => (
              <div key={item.title} className="flex gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-14 rounded-3xl bg-secondary/50 p-8 text-center md:p-12">
          <h2 className="text-balance text-2xl font-bold text-foreground md:text-3xl">
            Experience the demo
          </h2>
          <p className="mx-auto mt-2 max-w-md text-pretty text-muted-foreground">
            Try the planner and see a complete itinerary and budget generated instantly.
          </p>
          <Link
            href="/planner"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            Launch Trip Planner
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  )
}

function Panel({
  icon,
  accent,
  title,
  children,
}: {
  icon: React.ReactNode
  accent: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-7 shadow-sm">
      <div className="flex items-center gap-3">
        <span className={"flex h-12 w-12 items-center justify-center rounded-xl " + accent}>{icon}</span>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  )
}

function SectionHeading({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
        {icon}
        {title}
      </div>
      <p className="mt-2 text-2xl font-bold text-foreground">{subtitle}</p>
    </div>
  )
}
