// const { Router } = require("express");
// const { Trip } = require("../models/Trip");
// const { Destination } = require("../models/Destination");

// const router = Router();

// // POST /api/trips - save a planned trip (e.g. when a user finalizes a plan)
// router.post("/", async (req, res) => {
//   try {
//     const { destinationSlug, days, category, travelerName, totalBudget } = req.body;

//     if (!destinationSlug || !days || !category || totalBudget == null) {
//       return res.status(400).json({ message: "destinationSlug, days, category and totalBudget are required" });
//     }

//     const destination = await Destination.findOne({ slug: destinationSlug });
//     if (!destination) return res.status(404).json({ message: "Destination not found" });

//     const trip = await Trip.create({
//       destinationSlug,
//       destinationName: destination.name,
//       days,
//       category,
//       travelerName,
//       totalBudget,
//     });

//     res.status(201).json(trip);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to save trip", error: err.message });
//   }
// });

// // GET /api/trips/recent?limit=5 - most recently saved trips (for the dashboard)
// router.get("/recent", async (req, res) => {
//   try {
//     const limit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 5;
//     const trips = await Trip.find().sort({ createdAt: -1 }).limit(limit);
//     res.json(trips);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch recent trips", error: err.message });
//   }
// });

// // GET /api/trips/admin - list all trips for admin management
// router.get("/admin", async (_req, res) => {
//   try {
//     const trips = await Trip.find().sort({ createdAt: -1 });
//     res.json(trips);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch admin trips", error: err.message });
//   }
// });

// // GET /api/trips/stats - aggregate stats for the dashboard
// router.get("/stats", async (_req, res) => {
//   try {
//     const [tripCount, destinationCount, avgResult] = await Promise.all([
//       Trip.countDocuments(),
//       Destination.countDocuments(),
//       Trip.aggregate([{ $group: { _id: null, avgBudget: { $avg: "$totalBudget" } } }]),
//     ]);

//     const averageTripBudget = avgResult[0]?.avgBudget ? Math.round(avgResult[0].avgBudget) : 0;

//     res.json({ tripCount, destinationCount, averageTripBudget });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch stats", error: err.message });
//   }
// });

// module.exports = router;

const { Router } = require("express");
const mongoose = require("mongoose");
const { Trip } = require("../models/Trip");
const { Destination } = require("../models/Destination");

const router = Router();

// POST /api/trips
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      destinationSlug,
      days,
      category,
      travelerName,
      totalBudget,
    } = req.body;

    if (
      !userId ||
      !destinationSlug ||
      !days ||
      !category ||
      totalBudget == null
    ) {
      return res.status(400).json({
        message:
          "userId, destinationSlug, days, category and totalBudget are required",
      });
    }

    const destination = await Destination.findOne({ slug: destinationSlug });

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    const trip = await Trip.create({
      userId,
      destinationSlug,
      destinationName: destination.name,
      days,
      category,
      travelerName,
      totalBudget,
    });

    res.status(201).json(trip);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to save trip", error: err.message });
  }
});

// GET /api/trips/recent?userId=...&limit=5
// router.get("/recent", async (req, res) => {
//    console.log("Query:", req.query);
//   try {
//     const { userId } = req.query;
//     const limit = Number(req.query.limit) || 5;

//     if (!userId) {
//       return res.status(400).json({ message: "userId is required" });
//     }

//     const trips = await Trip.find({ userId })
//       .sort({ createdAt: -1 })
//       .limit(limit);

//     res.json(trips);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Failed to fetch recent trips", error: err.message });
//   }
// });
router.get("/recent", async (req, res) => {
  try {
    console.log("QUERY:", req.query);

    const { userId } = req.query;
    const limit = Number(req.query.limit) || 5;

    const trips = await Trip.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit);

    console.log("FOUND:", trips);

    res.json(trips);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
});

// GET /api/trips/admin
router.get("/admin", async (_req, res) => {
  try {
    const trips = await Trip.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name email");

    res.json(trips);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch admin trips", error: err.message });
  }
});

// GET /api/trips/stats?userId=...
router.get("/stats", async (req, res) => {
  console.log("Stats Query:", req.query);
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const [tripCount, destinationCount, avgResult] = await Promise.all([
      Trip.countDocuments({ userId }),
      Destination.countDocuments(),
      Trip.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $group: {
            _id: null,
            avgBudget: {
              $avg: "$totalBudget",
            },
          },
        },
      ]),
    ]);

    const averageTripBudget = avgResult[0]?.avgBudget
      ? Math.round(avgResult[0].avgBudget)
      : 0;

    res.json({
      tripCount,
      destinationCount,
      averageTripBudget,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch stats", error: err.message });
  }
});

module.exports = router;