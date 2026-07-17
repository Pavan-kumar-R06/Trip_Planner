import { Home, Utensils, Bus, Camera } from "lucide-react"
import type { BudgetBreakdown } from "@/lib/data"
import { formatINR } from "@/lib/data"

const items = [
  { key: "accommodation", label: "Accommodation", icon: Home, color: "var(--chart-1)" },
  { key: "food", label: "Food & Dining", icon: Utensils, color: "var(--chart-2)" },
  { key: "transport", label: "Transportation", icon: Bus, color: "var(--chart-3)" },
  { key: "sightseeing", label: "Sightseeing", icon: Camera, color: "var(--chart-4)" },
] as const

export function BudgetBreakdownCard({ breakdown }: { breakdown: BudgetBreakdown }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
      <h3 className="text-lg font-bold text-foreground">Estimated cost breakdown</h3>

      <div className="mt-5 space-y-4">
        {items.map((item) => {
          const value = breakdown[item.key]
          const pct = Math.round((value / breakdown.total) * 100)
          const Icon = item.icon
          return (
            <div key={item.key}>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-medium text-foreground">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  {item.label}
                </span>
                <span className="font-semibold text-foreground">{formatINR(value)}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, backgroundColor: item.color }}
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{pct}% of total</p>
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-xl bg-primary px-5 py-4 text-primary-foreground">
        <span className="font-semibold">Total estimated cost</span>
        <span className="text-2xl font-bold">{formatINR(breakdown.total)}</span>
      </div>
    </div>
  )
}
