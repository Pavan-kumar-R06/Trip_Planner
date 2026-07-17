import { Suspense } from "react"
import { TripPlanner } from "@/components/trip-planner"

export default function PlannerPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-20 text-muted-foreground md:px-6">Loading your trip plan…</div>}>
      <TripPlanner />
    </Suspense>
  )
}
