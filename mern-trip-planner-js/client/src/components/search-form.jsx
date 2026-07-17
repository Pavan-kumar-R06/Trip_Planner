import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Wallet, CalendarDays, Compass, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";

export function SearchForm() {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [options, setOptions] = useState(null);

  const [dest, setDest] = useState("");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("4");
  const [category, setCategory] = useState("Standard");

  useEffect(() => {
    Promise.all([api.getDestinations(), api.getPlannerOptions()])
      .then(([dests, opts]) => {
        setDestinations(dests);
        setOptions(opts);
        if (dests[0]) setDest(dests[0].slug);
        if (opts.budgetOptions[1]) setBudget(opts.budgetOptions[1]);
      })
      .catch(() => {
        // Backend unreachable — form stays in a loading state, no crash.
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams({ dest, days, category, budget });
    navigate(`/planner?${params.toString()}`);
  }

  if (!options || destinations.length === 0) {
    return (
      <div className="rounded-2xl border border-border/60 bg-card/95 p-6 text-center text-sm text-muted-foreground shadow-xl backdrop-blur">
        Loading destinations…
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border/60 bg-card/95 p-4 shadow-xl backdrop-blur md:p-5"
    >
      <div className="grid gap-3 md:grid-cols-4">
        <Field label="Destination" icon={<MapPin className="h-4 w-4 text-primary" />}>
          <Select value={dest} onValueChange={(v) => setDest(v ?? "")}>
            <SelectTrigger className="w-full border-0 bg-transparent px-0 text-sm font-medium shadow-none focus-visible:ring-0">
              <SelectValue placeholder="Choose destination" />
            </SelectTrigger>
            <SelectContent>
              {destinations.map((d) => (
                <SelectItem key={d.slug} value={d.slug}>
                  {d.name}, {d.state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Budget" icon={<Wallet className="h-4 w-4 text-primary" />}>
          <Select value={budget} onValueChange={(v) => setBudget(v ?? "")}>
            <SelectTrigger className="w-full border-0 bg-transparent px-0 text-sm font-medium shadow-none focus-visible:ring-0">
              <SelectValue placeholder="Select budget" />
            </SelectTrigger>
            <SelectContent>
              {options.budgetOptions.map((b) => (
                <SelectItem key={b} value={b}>{b}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Days" icon={<CalendarDays className="h-4 w-4 text-primary" />}>
          <Select value={days} onValueChange={(v) => setDays(v ?? "4")}>
            <SelectTrigger className="w-full border-0 bg-transparent px-0 text-sm font-medium shadow-none focus-visible:ring-0">
              <SelectValue placeholder="Number of days" />
            </SelectTrigger>
            <SelectContent>
              {options.dayOptions.map((d) => (
                <SelectItem key={d} value={String(d)}>{d} days</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Travel Style" icon={<Compass className="h-4 w-4 text-primary" />}>
          <Select value={category} onValueChange={(v) => setCategory(v ?? "Standard")}>
            <SelectTrigger className="w-full border-0 bg-transparent px-0 text-sm font-medium shadow-none focus-visible:ring-0">
              <SelectValue placeholder="Travel category" />
            </SelectTrigger>
            <SelectContent>
              {options.travelCategories.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <button
        type="submit"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] active:scale-100"
      >
        <Search className="h-4 w-4" />
        Generate Trip Plan
      </button>
    </form>
  );
}

function Field({ label, icon, children }) {
  return (
    <div className="rounded-xl border border-border/60 bg-background px-3.5 py-2.5 text-left transition-colors focus-within:border-primary">
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-0.5">{children}</div>
    </div>
  );
}
