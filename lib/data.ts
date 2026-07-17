export type TravelCategory = "Budget" | "Standard" | "Luxury"

export interface Attraction {
  name: string
  description: string
}

export interface ItineraryDay {
  title: string
  activities: string[]
  attractions: string[]
  meals: string
  estimatedExpense: number
}

export interface Destination {
  slug: string
  name: string
  state: string
  tagline: string
  image: string
  description: string
  baseBudget: number // per day, standard category, single reference
  rating: number
  bestTime: string
  idealDays: string
  attractions: Attraction[]
  highlights: string[]
  itinerary: ItineraryDay[]
}

// Per-day cost factors by travel category
export const categoryFactors: Record<
  TravelCategory,
  { accommodation: number; food: number; transport: number; sightseeing: number; label: string }
> = {
  Budget: { accommodation: 900, food: 500, transport: 400, sightseeing: 300, label: "Backpacker friendly" },
  Standard: { accommodation: 2200, food: 1000, transport: 800, sightseeing: 600, label: "Comfortable balance" },
  Luxury: { accommodation: 6000, food: 2500, transport: 1800, sightseeing: 1400, label: "Premium experience" },
}

export const travelCategories: TravelCategory[] = ["Budget", "Standard", "Luxury"]
export const dayOptions = [2, 3, 4, 5, 6, 7]
export const budgetOptions = ["Under ₹10,000", "₹10,000 – ₹25,000", "₹25,000 – ₹50,000", "₹50,000+"]

export const destinations: Destination[] = [
  {
    slug: "goa",
    name: "Goa",
    state: "West India",
    tagline: "Sun, sand & sunset vibes",
    image: "/goa.png",
    description:
      "India's beach capital blends golden shorelines, Portuguese heritage, buzzing nightlife and laid-back shacks. Perfect for travelers who want sea breeze by day and music by night.",
    baseBudget: 4600,
    rating: 4.7,
    bestTime: "Nov – Feb",
    idealDays: "3–5 days",
    attractions: [
      { name: "Baga & Calangute Beach", description: "Lively beaches with water sports and shacks." },
      { name: "Fort Aguada", description: "17th-century Portuguese fort with ocean views." },
      { name: "Dudhsagar Falls", description: "Towering four-tiered waterfall in the forest." },
      { name: "Old Goa Churches", description: "UNESCO heritage basilicas and cathedrals." },
    ],
    highlights: ["Beaches", "Nightlife", "Water Sports", "Heritage"],
    itinerary: [
      {
        title: "Arrival & North Goa Beaches",
        activities: ["Check in & relax", "Sunset at Baga Beach", "Dinner at a beach shack"],
        attractions: ["Baga Beach", "Calangute Beach"],
        meals: "Welcome dinner included",
        estimatedExpense: 3800,
      },
      {
        title: "Forts, Old Goa & Cruise",
        activities: ["Visit Fort Aguada", "Explore Old Goa churches", "Evening Mandovi river cruise"],
        attractions: ["Fort Aguada", "Basilica of Bom Jesus"],
        meals: "Breakfast & lunch",
        estimatedExpense: 4200,
      },
      {
        title: "Dudhsagar & Spice Plantation",
        activities: ["Jeep safari to Dudhsagar Falls", "Spice plantation tour", "Local Goan thali"],
        attractions: ["Dudhsagar Falls", "Spice Plantation"],
        meals: "Breakfast & traditional lunch",
        estimatedExpense: 4600,
      },
      {
        title: "South Goa & Departure",
        activities: ["Palolem Beach morning", "Souvenir shopping", "Departure transfer"],
        attractions: ["Palolem Beach"],
        meals: "Breakfast",
        estimatedExpense: 3400,
      },
    ],
  },
  {
    slug: "manali",
    name: "Manali",
    state: "Himachal Pradesh",
    tagline: "Snow peaks & pine valleys",
    image: "/manali.png",
    description:
      "A Himalayan escape of snow-capped peaks, apple orchards and adventure sports. From Solang Valley paragliding to Old Manali cafes, it's a year-round mountain favorite.",
    baseBudget: 4200,
    rating: 4.8,
    bestTime: "Oct – Jun",
    idealDays: "4–6 days",
    attractions: [
      { name: "Solang Valley", description: "Adventure hub for paragliding and skiing." },
      { name: "Rohtang Pass", description: "High mountain pass with snow all year." },
      { name: "Hadimba Temple", description: "Ancient cedar-wood forest temple." },
      { name: "Old Manali", description: "Quaint cafes, riverside walks and shops." },
    ],
    highlights: ["Mountains", "Adventure", "Snow", "Cafes"],
    itinerary: [
      {
        title: "Arrival & Local Manali",
        activities: ["Check in", "Visit Hadimba Temple", "Explore Mall Road"],
        attractions: ["Hadimba Temple", "Mall Road"],
        meals: "Welcome dinner included",
        estimatedExpense: 3600,
      },
      {
        title: "Solang Valley Adventure",
        activities: ["Paragliding & zorbing", "Cable car ride", "Cafe hopping in Old Manali"],
        attractions: ["Solang Valley", "Old Manali"],
        meals: "Breakfast & lunch",
        estimatedExpense: 4400,
      },
      {
        title: "Rohtang Pass Day Trip",
        activities: ["Drive to Rohtang Pass", "Snow activities", "Scenic photo stops"],
        attractions: ["Rohtang Pass", "Rahala Falls"],
        meals: "Breakfast & packed lunch",
        estimatedExpense: 4800,
      },
      {
        title: "Kullu & Departure",
        activities: ["River rafting in Kullu", "Shawl & handicraft shopping", "Departure"],
        attractions: ["Kullu Valley"],
        meals: "Breakfast",
        estimatedExpense: 3500,
      },
    ],
  },
  {
    slug: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    tagline: "The royal Pink City",
    image: "/jaipur.png",
    description:
      "Rajasthan's regal capital dazzles with forts, palaces and bustling bazaars. Walk through history at Amber Fort and shop for jewels and textiles in the old walled city.",
    baseBudget: 3800,
    rating: 4.6,
    bestTime: "Oct – Mar",
    idealDays: "2–4 days",
    attractions: [
      { name: "Amber Fort", description: "Majestic hilltop fort with mirror palace." },
      { name: "Hawa Mahal", description: "Iconic pink honeycomb facade palace." },
      { name: "City Palace", description: "Royal residence with museums and courtyards." },
      { name: "Jantar Mantar", description: "UNESCO astronomical observatory." },
    ],
    highlights: ["Heritage", "Forts", "Shopping", "Culture"],
    itinerary: [
      {
        title: "Arrival & Pink City Walk",
        activities: ["Check in", "Visit Hawa Mahal", "Explore Johari Bazaar"],
        attractions: ["Hawa Mahal", "Johari Bazaar"],
        meals: "Welcome dinner included",
        estimatedExpense: 3200,
      },
      {
        title: "Amber Fort & City Palace",
        activities: ["Amber Fort with elephant ride", "City Palace tour", "Jantar Mantar visit"],
        attractions: ["Amber Fort", "City Palace", "Jantar Mantar"],
        meals: "Breakfast & Rajasthani lunch",
        estimatedExpense: 4000,
      },
      {
        title: "Nahargarh & Departure",
        activities: ["Sunrise at Nahargarh Fort", "Local handicraft shopping", "Departure"],
        attractions: ["Nahargarh Fort"],
        meals: "Breakfast",
        estimatedExpense: 3000,
      },
    ],
  },
  {
    slug: "ooty",
    name: "Ooty",
    state: "Tamil Nadu",
    tagline: "Queen of the Nilgiris",
    image: "/ooty.png",
    description:
      "A cool hill station of rolling tea gardens, colonial charm and toy-train rides. Ooty's misty mornings and botanical gardens make it a refreshing southern getaway.",
    baseBudget: 3600,
    rating: 4.5,
    bestTime: "Mar – Jun",
    idealDays: "3–4 days",
    attractions: [
      { name: "Nilgiri Toy Train", description: "Heritage mountain railway ride." },
      { name: "Botanical Gardens", description: "Lush terraced gardens with rare flora." },
      { name: "Ooty Lake", description: "Boating amid pine-fringed shores." },
      { name: "Doddabetta Peak", description: "Highest peak in the Nilgiris." },
    ],
    highlights: ["Hills", "Tea Gardens", "Nature", "Toy Train"],
    itinerary: [
      {
        title: "Arrival & Lake Side",
        activities: ["Check in", "Boating at Ooty Lake", "Evening Mall Road stroll"],
        attractions: ["Ooty Lake", "Mall Road"],
        meals: "Welcome dinner included",
        estimatedExpense: 3000,
      },
      {
        title: "Toy Train & Tea Estates",
        activities: ["Nilgiri toy train ride", "Tea factory & museum", "Botanical Gardens"],
        attractions: ["Nilgiri Toy Train", "Botanical Gardens"],
        meals: "Breakfast & lunch",
        estimatedExpense: 3800,
      },
      {
        title: "Doddabetta & Departure",
        activities: ["Doddabetta Peak viewpoint", "Homemade chocolate shopping", "Departure"],
        attractions: ["Doddabetta Peak"],
        meals: "Breakfast",
        estimatedExpense: 2900,
      },
    ],
  },
  {
    slug: "mysore",
    name: "Mysore",
    state: "Karnataka",
    tagline: "City of palaces",
    image: "/mysore.png",
    description:
      "Mysore enchants with its illuminated royal palace, sandalwood markets and rich Dasara traditions. A graceful blend of heritage, gardens and spirituality.",
    baseBudget: 3400,
    rating: 4.6,
    bestTime: "Oct – Mar",
    idealDays: "2–3 days",
    attractions: [
      { name: "Mysore Palace", description: "Grand illuminated royal palace." },
      { name: "Chamundi Hills", description: "Hilltop temple with city views." },
      { name: "Brindavan Gardens", description: "Musical fountain terraced gardens." },
      { name: "St. Philomena's Church", description: "Neo-Gothic cathedral." },
    ],
    highlights: ["Palaces", "Heritage", "Gardens", "Culture"],
    itinerary: [
      {
        title: "Arrival & Palace",
        activities: ["Check in", "Mysore Palace tour", "Evening palace illumination"],
        attractions: ["Mysore Palace"],
        meals: "Welcome dinner included",
        estimatedExpense: 3000,
      },
      {
        title: "Chamundi Hills & Gardens",
        activities: ["Chamundeshwari Temple", "Brindavan Gardens fountain show", "Local silk shopping"],
        attractions: ["Chamundi Hills", "Brindavan Gardens"],
        meals: "Breakfast & lunch",
        estimatedExpense: 3600,
      },
      {
        title: "City Tour & Departure",
        activities: ["St. Philomena's Church", "Devaraja Market", "Departure"],
        attractions: ["St. Philomena's Church", "Devaraja Market"],
        meals: "Breakfast",
        estimatedExpense: 2800,
      },
    ],
  },
  {
    slug: "coorg",
    name: "Coorg",
    state: "Karnataka",
    tagline: "Scotland of India",
    image: "/coorg.png",
    description:
      "A misty paradise of coffee plantations, waterfalls and emerald hills. Coorg offers peaceful homestays, spice-scented trails and the freshest filter coffee.",
    baseBudget: 4000,
    rating: 4.7,
    bestTime: "Oct – Mar",
    idealDays: "3–4 days",
    attractions: [
      { name: "Abbey Falls", description: "Cascading falls amid coffee estates." },
      { name: "Raja's Seat", description: "Sunset garden viewpoint." },
      { name: "Dubare Elephant Camp", description: "Riverside elephant interaction." },
      { name: "Coffee Plantations", description: "Guided estate walks and tastings." },
    ],
    highlights: ["Coffee", "Waterfalls", "Hills", "Nature"],
    itinerary: [
      {
        title: "Arrival & Sunset Point",
        activities: ["Check in to estate stay", "Visit Raja's Seat", "Coffee tasting evening"],
        attractions: ["Raja's Seat"],
        meals: "Welcome dinner included",
        estimatedExpense: 3400,
      },
      {
        title: "Waterfalls & Plantations",
        activities: ["Abbey Falls trek", "Coffee plantation walk", "Spice market visit"],
        attractions: ["Abbey Falls", "Coffee Plantations"],
        meals: "Breakfast & estate lunch",
        estimatedExpense: 4000,
      },
      {
        title: "Dubare & Departure",
        activities: ["Dubare Elephant Camp", "River rafting", "Departure"],
        attractions: ["Dubare Elephant Camp"],
        meals: "Breakfast",
        estimatedExpense: 3300,
      },
    ],
  },
]

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug)
}

// Build a day-wise plan for any number of days while keeping the
// arrival day first and the departure day last. Middle days reuse the
// destination's predefined exploration days, then fall back to a generated
// leisure day so nothing repeats the "Arrival" entry.
export function buildItinerary(destination: Destination, numDays: number): ItineraryDay[] {
  const base = destination.itinerary
  if (numDays <= 0) return []
  if (numDays === 1) return [base[0]]
  if (numDays <= base.length) {
    // Take the first (arrival) and last (departure) plus middle days.
    const middleCount = numDays - 2
    const middle = base.slice(1, 1 + middleCount)
    return [base[0], ...middle, base[base.length - 1]]
  }

  // More days requested than predefined: keep arrival + all middle days,
  // pad with leisure days, then close with the departure day.
  const arrival = base[0]
  const departure = base[base.length - 1]
  const middleDays = base.slice(1, base.length - 1)
  const result: ItineraryDay[] = [arrival, ...middleDays]

  const leisureTemplates: ItineraryDay[] = [
    {
      title: "Leisure & Hidden Gems",
      activities: ["Relaxed breakfast", "Explore local markets", "Visit a lesser-known viewpoint"],
      attractions: destination.attractions.slice(0, 2).map((a) => a.name),
      meals: "Breakfast & lunch",
      estimatedExpense: Math.round(destination.baseBudget * 0.85),
    },
    {
      title: "Culture & Local Cuisine",
      activities: ["Heritage walk", "Authentic local food trail", "Evening leisure"],
      attractions: destination.attractions.slice(2, 4).map((a) => a.name),
      meals: "Breakfast & dinner",
      estimatedExpense: Math.round(destination.baseBudget * 0.9),
    },
  ]

  let pad = 0
  while (result.length < numDays - 1) {
    result.push(leisureTemplates[pad % leisureTemplates.length])
    pad++
  }
  result.push(departure)
  return result
}

export interface BudgetBreakdown {
  accommodation: number
  food: number
  transport: number
  sightseeing: number
  total: number
}

export function calculateBudget(
  destination: Destination,
  days: number,
  category: TravelCategory,
): BudgetBreakdown {
  const factor = categoryFactors[category]
  // Destination price index relative to a ₹4000 baseline
  const index = destination.baseBudget / 4000
  const accommodation = Math.round(factor.accommodation * days * index)
  const food = Math.round(factor.food * days * index)
  const transport = Math.round(factor.transport * days * index)
  const sightseeing = Math.round(factor.sightseeing * days * index)
  return {
    accommodation,
    food,
    transport,
    sightseeing,
    total: accommodation + food + transport + sightseeing,
  }
}

export function formatINR(value: number): string {
  return "₹" + value.toLocaleString("en-IN")
}

// Sample stats for dashboard
export const sampleTripsPlanned = 1284
export const averageTripBudget = 28500
