// const { Router } = require("express");
// const { User } = require("../models/User");
// const { Trip } = require("../models/Trip");

// const router = Router();

// router.get("/", async (_req, res) => {
//   try {
//     const [users, trips] = await Promise.all([User.find().sort({ createdAt: -1 }), Trip.find().sort({ createdAt: -1 })]);

//     const tripMap = new Map();
//     trips.forEach((trip) => {
//       const traveler = trip.travelerName || "Guest";
//       if (!tripMap.has(traveler)) {
//         tripMap.set(traveler, []);
//       }
//       tripMap.get(traveler).push(trip);
//     });

//     const payload = users.map((user) => {
//       const userTrips = tripMap.get(user.name) || tripMap.get(user.email) || [];
//       return {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         createdAt: user.createdAt,
//         tripCount: userTrips.length,
//         destinationsVisited: userTrips.map((trip) => trip.destinationName),
//         lastTrip: userTrips[0]?.destinationName || null,
//       };
//     });

//     res.json(payload);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch users", error: error.message });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({ message: "User deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete user", error: error.message });
//   }
// });

// module.exports = router;


const { Router } = require("express");
const { User } = require("../models/User");
const { Trip } = require("../models/Trip");

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    const payload = await Promise.all(
      users.map(async (user) => {
        const userTrips = await Trip.find({
          userId: user._id,
        }).sort({ createdAt: -1 });

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          tripCount: userTrips.length,
          destinationsVisited: userTrips.map(
            (trip) => trip.destinationName
          ),
          lastTrip: userTrips[0]?.destinationName || null,
        };
      })
    );

    res.json(payload);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Trip.deleteMany({
      userId: req.params.id,
    });

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete user",
      error: error.message,
    });
  }
});

module.exports = router;