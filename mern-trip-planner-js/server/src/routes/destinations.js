const { Router } = require("express");
const { Destination } = require("../models/Destination");

const router = Router();

const normalizeStringArray = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item ?? "").trim())
      .filter(Boolean);
  }

  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const normalizeAttractions = (value) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => ({
      name: String(item?.name ?? "").trim(),
      description: String(item?.description ?? "").trim(),
    }))
    .filter((item) => item.name || item.description);
};

const normalizeItinerary = (value) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((day) => ({
      title: String(day?.title ?? "").trim(),
      activities: Array.isArray(day?.activities)
        ? day.activities.map((activity) => String(activity ?? "").trim()).filter(Boolean)
        : [],
      attractions: Array.isArray(day?.attractions)
        ? day.attractions.map((item) => String(item ?? "").trim()).filter(Boolean)
        : [],
      meals: String(day?.meals ?? "").trim(),
      estimatedExpense: Number(day?.estimatedExpense ?? 0),
    }))
    .filter((day) => day.title || day.activities.length || day.attractions.length || day.meals);
};

const normalizeDestinationPayload = (body = {}) => ({
  slug: String(body.slug || "").trim(),
  name: String(body.name || "").trim(),
  state: String(body.state || "").trim(),
  tagline: String(body.tagline || "").trim(),
  image: String(body.image || "").trim(),
  description: String(body.description || "").trim(),
  baseBudget: Number(body.baseBudget),
  rating: Number(body.rating),
  bestTime: String(body.bestTime || "").trim(),
  idealDays: String(body.idealDays || "").trim(),
  attractions: normalizeAttractions(body.attractions),
  highlights: normalizeStringArray(body.highlights),
  itinerary: normalizeItinerary(body.itinerary),
});

// GET /api/destinations - list all destinations
router.get("/", async (_req, res) => {
  try {
    const destinations = await Destination.find().sort({ name: 1 });
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch destinations", error: err.message });
  }
});

// GET /api/destinations/:slug - single destination detail
router.get("/:slug", async (req, res) => {
  try {
    const destination = await Destination.findOne({ slug: req.params.slug });
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.json(destination);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch destination", error: err.message });
  }
});

// POST /api/destinations - create a destination (admin)
router.post("/", async (req, res) => {
  try {
    const payload = normalizeDestinationPayload(req.body);

    const destination = await Destination.create(payload);
    res.status(201).json(destination);
  } catch (err) {
    res.status(500).json({ message: "Failed to create destination", error: err.message });
  }
});

// PUT /api/destinations/:slug - update a destination (admin)
router.put("/:slug", async (req, res) => {
  try {
    const payload = normalizeDestinationPayload(req.body);
    const destination = await Destination.findOneAndUpdate({ slug: req.params.slug }, payload, {
      new: true,
      runValidators: true,
    });

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.json(destination);
  } catch (err) {
    res.status(500).json({ message: "Failed to update destination", error: err.message });
  }
});

// DELETE /api/destinations/:slug - delete a destination (admin)
router.delete("/:slug", async (req, res) => {
  try {
    const destination = await Destination.findOneAndDelete({ slug: req.params.slug });
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.json({ message: "Destination deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete destination", error: err.message });
  }
});

module.exports = router;
