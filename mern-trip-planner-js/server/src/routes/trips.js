const { Router } = require("express");
const { Trip } = require("../models/Trip");
const { Destination } = require("../models/Destination");

const router = Router();

// POST /api/trips - save a planned trip (e.g. when a user finalizes a plan)
router.post("/", async (req, res) => {
  try {
    const { destinationSlug, days, category, travelerName, totalBudget } = req.body;

    if (!destinationSlug || !days || !category || totalBudget == null) {
      return res.status(400).json({ message: "destinationSlug, days, category and totalBudget are required" });
    }

    const destination = await Destination.findOne({ slug: destinationSlug });
    if (!destination) return res.status(404).json({ message: "Destination not found" });

    const trip = await Trip.create({
      destinationSlug,
      destinationName: destination.name,
      days,
      category,
      travelerName,
      totalBudget,
    });

    res.status(201).json(trip);
  } catch (err) {
    res.status(500).json({ message: "Failed to save trip", error: err.message });
  }
});

// GET /api/trips/recent?limit=5 - most recently saved trips (for the dashboard)
router.get("/recent", async (req, res) => {
  try {
    const limit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 5;
    const trips = await Trip.find().sort({ createdAt: -1 }).limit(limit);
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch recent trips", error: err.message });
  }
});

// GET /api/trips/admin - list all trips for admin management
router.get("/admin", async (_req, res) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch admin trips", error: err.message });
  }
});

// GET /api/trips/stats - aggregate stats for the dashboard
router.get("/stats", async (_req, res) => {
  try {
    const [tripCount, destinationCount, avgResult] = await Promise.all([
      Trip.countDocuments(),
      Destination.countDocuments(),
      Trip.aggregate([{ $group: { _id: null, avgBudget: { $avg: "$totalBudget" } } }]),
    ]);

    const averageTripBudget = avgResult[0]?.avgBudget ? Math.round(avgResult[0].avgBudget) : 0;

    res.json({ tripCount, destinationCount, averageTripBudget });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats", error: err.message });
  }
});

module.exports = router;
