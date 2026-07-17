const { Router } = require("express");
const { Destination } = require("../models/Destination");
const {
  calculateBudget,
  buildItinerary,
  travelCategories,
  categoryFactors,
  dayOptions,
  budgetOptions,
} = require("../utils/tripCalculations");

const router = Router();

// GET /api/planner/options - static option lists the frontend needs (days, categories, etc.)
router.get("/options", (_req, res) => {
  res.json({ travelCategories, categoryFactors, dayOptions, budgetOptions });
});

// GET /api/planner/itinerary?dest=goa&days=4&category=Standard
router.get("/itinerary", async (req, res) => {
  try {
    const { dest, days, category } = req.query;

    if (!dest) return res.status(400).json({ message: "dest is required" });

    const destination = await Destination.findOne({ slug: dest });
    if (!destination) return res.status(404).json({ message: "Destination not found" });

    const numDays = Number(days) > 0 ? Number(days) : 4;
    const cat = travelCategories.includes(category) ? category : "Standard";

    const itinerary = buildItinerary(destination, numDays);
    const budget = calculateBudget(destination, numDays, cat);

    res.json({ destination, days: numDays, category: cat, itinerary, budget });
  } catch (err) {
    res.status(500).json({ message: "Failed to build itinerary", error: err.message });
  }
});

// GET /api/planner/budget?dest=goa&days=4&category=Standard
// Also returns a comparison across all three travel categories.
router.get("/budget", async (req, res) => {
  try {
    const { dest, days, category } = req.query;

    if (!dest) return res.status(400).json({ message: "dest is required" });

    const destination = await Destination.findOne({ slug: dest });
    if (!destination) return res.status(404).json({ message: "Destination not found" });

    const numDays = Number(days) > 0 ? Number(days) : 4;
    const cat = travelCategories.includes(category) ? category : "Standard";

    const breakdown = calculateBudget(destination, numDays, cat);
    const comparison = travelCategories.map((c) => ({
      category: c,
      total: calculateBudget(destination, numDays, c).total,
    }));

    res.json({ destination, days: numDays, category: cat, breakdown, comparison });
  } catch (err) {
    res.status(500).json({ message: "Failed to calculate budget", error: err.message });
  }
});

module.exports = router;
