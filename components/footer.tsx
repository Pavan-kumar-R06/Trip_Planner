import Link from "next/link"
import { Compass } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Compass className="h-4 w-4" />
              </span>
              <span className="text-base font-bold text-foreground">
                Trip<span className="text-primary">Wise</span>
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Smart trip planning that turns your travel dreams into ready-to-go itineraries.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Explore</h4>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="/destinations" className="hover:text-primary">Destinations</Link></li>
              <li><Link href="/planner" className="hover:text-primary">Trip Planner</Link></li>
              <li><Link href="/calculator" className="hover:text-primary">Budget Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Company</h4>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="/dashboard" className="hover:text-primary">Dashboard</Link></li>
              <li><Link href="/about" className="hover:text-primary">About Project</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Project</h4>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Built as a presentation-ready ideathon demo. All data is sample data for demonstration.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} TripWise. A college ideathon project.</p>
          <p>Made for smart, stress-free travel.</p>
        </div>
      </div>
    </footer>
  )
}
