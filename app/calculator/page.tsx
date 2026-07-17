import { Suspense } from "react"
import { BudgetCalculator } from "@/components/budget-calculator"

export default function CalculatorPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-20 text-muted-foreground md:px-6">Loading calculator…</div>}>
      <BudgetCalculator />
    </Suspense>
  )
}
