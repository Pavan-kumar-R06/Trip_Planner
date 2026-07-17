import Link from "next/link"
import { Star, MapPin, Clock } from "lucide-react"
import type { Destination } from "@/lib/data"
import { formatINR } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={destination.image || "/placeholder.svg"}
          alt={`Scenic view of ${destination.name}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground hover:bg-accent">
          {destination.state}
        </Badge>
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          {destination.rating}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          {destination.name}
        </div>
        <h3 className="mt-1 text-lg font-bold text-foreground">{destination.tagline}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {destination.description}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
          <div>
            <p className="text-xs text-muted-foreground">From</p>
            <p className="text-base font-bold text-primary">{formatINR(destination.baseBudget)}<span className="text-xs font-normal text-muted-foreground">/day</span></p>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {destination.idealDays}
          </div>
        </div>
      </div>
    </Link>
  )
}
