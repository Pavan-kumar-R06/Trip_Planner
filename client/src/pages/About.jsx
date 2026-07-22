import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  Rocket,
  Wallet,
  ArrowRight,
} from "lucide-react";

const benefits = [
  "Helps travelers plan faster without jumping across multiple websites",
  "Turns destination research into a structured itinerary and cost overview",
  "Makes it easier for first-time visitors to understand where to go and how much to spend",
  "Keeps trip ideas organized with saved plans and a reusable dashboard",
  "Supports admins with a simple destination management workflow",
  "Provides a full-stack demo that shows how a real travel app can grow",
];

const futureScope = [
  { title: "Live booking integrations", desc: "Connect flights, hotels, and local experiences with real-time availability and pricing." },
  { title: "Personalized recommendations", desc: "Use traveler preferences and past trips to suggest better matches for each journey." },
  { title: "Advanced user profiles", desc: "Let users save favorites, share plans, and revisit trips from any device." },
  { title: "Admin analytics", desc: "Give admins richer insights into trip activity, destination popularity, and user behavior." },
];

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
            TripWise — a smarter way to plan your next trip
          </h1>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-primary-foreground/85">
            This project brings together destination discovery, day-wise trip planning, budget estimation,
            and user accounts in one modern web experience for travelers exploring India.
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
              Planning a trip often means opening several tabs for destination ideas, transport options,
              daily schedules, and costs. TripWise brings that process into one place so travelers can move
              from inspiration to a useful plan without losing momentum.
            </p>
          </Panel>

          <Panel
            icon={<Lightbulb className="h-6 w-6" />}
            accent="bg-primary/10 text-primary"
            title="Proposed Solution"
          >
            <p className="leading-relaxed text-muted-foreground">
              TripWise combines curated destination content, itinerary generation, budget planning, and saved
              trip history so users can build a complete plan in minutes. It is designed to feel practical,
              modern, and easy for both first-time and experienced travelers.
            </p>
          </Panel>
        </div>

        {/* Key Features removed per request */}

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
            to="/planner"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            Launch Trip Planner
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}

function Panel({ icon, accent, title, children }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-7 shadow-sm">
      <div className="flex items-center gap-3">
        <span className={"flex h-12 w-12 items-center justify-center rounded-xl " + accent}>{icon}</span>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function SectionHeading({ icon, title, subtitle }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
        {icon}
        {title}
      </div>
      <p className="mt-2 text-2xl font-bold text-foreground">{subtitle}</p>
    </div>
  );
}
