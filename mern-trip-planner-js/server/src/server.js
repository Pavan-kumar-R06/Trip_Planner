require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/trip_planner";

async function start() {
  try {
    await mongoose.connect(MONGODB_URI);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
