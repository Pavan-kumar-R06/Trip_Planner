const travelCategories = ["Budget", "Standard", "Luxury"];
const dayOptions = [2, 3, 4, 5, 6, 7];
const budgetOptions = ["Under ₹10,000", "₹10,000 – ₹25,000", "₹25,000 – ₹50,000", "₹50,000+"];

const categoryFactors = {
  Budget: { accommodation: 900, food: 500, transport: 400, sightseeing: 300, label: "Backpacker friendly" },
  Standard: { accommodation: 2200, food: 1000, transport: 800, sightseeing: 600, label: "Comfortable balance" },
  Luxury: { accommodation: 6000, food: 2500, transport: 1800, sightseeing: 1400, label: "Premium experience" },
};

function calculateBudget(destination, days, category) {
  const factor = categoryFactors[category];
  const index = destination.baseBudget / 4000;
  const accommodation = Math.round(factor.accommodation * days * index);
  const food = Math.round(factor.food * days * index);
  const transport = Math.round(factor.transport * days * index);
  const sightseeing = Math.round(factor.sightseeing * days * index);
  return {
    accommodation,
    food,
    transport,
    sightseeing,
    total: accommodation + food + transport + sightseeing,
  };
}

// Build a day-wise plan for any number of days while keeping the arrival day
// first and the departure day last. Middle days reuse the destination's
// predefined exploration days, then fall back to a generated leisure day.
function buildItinerary(destination, numDays) {
  const base = destination.itinerary;
  if (numDays <= 0) return [];
  if (numDays === 1) return [base[0]];
  if (numDays <= base.length) {
    const middleCount = numDays - 2;
    const middle = base.slice(1, 1 + middleCount);
    return [base[0], ...middle, base[base.length - 1]];
  }

  const arrival = base[0];
  const departure = base[base.length - 1];
  const middleDays = base.slice(1, base.length - 1);
  const result = [arrival, ...middleDays];

  const leisureTemplates = [
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
  ];

  let pad = 0;
  while (result.length < numDays - 1) {
    result.push(leisureTemplates[pad % leisureTemplates.length]);
    pad++;
  }
  result.push(departure);
  return result;
}

function formatINR(value) {
  return "₹" + value.toLocaleString("en-IN");
}

module.exports = {
  travelCategories,
  dayOptions,
  budgetOptions,
  categoryFactors,
  calculateBudget,
  buildItinerary,
  formatINR,
};
