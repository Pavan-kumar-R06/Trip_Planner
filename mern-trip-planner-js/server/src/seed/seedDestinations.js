require("dotenv").config();

const mongoose = require("mongoose");
const { Destination } = require("../models/Destination");
const { destinations } = require("./destinationsData");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/trip_planner";

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB. Seeding destinations...");

    for (const dest of destinations) {
      await Destination.findOneAndUpdate({ slug: dest.slug }, dest, { upsert: true, new: true });
      console.log(`Upserted: ${dest.name}`);
    }

    console.log(`Done. Seeded ${destinations.length} destinations.`);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
