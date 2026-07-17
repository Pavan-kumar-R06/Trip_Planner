const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    console.log("🔄 Using cached MongoDB connection");
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  try {
    // Prevent long buffering periods in serverless executions if connection drops
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false, 
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw error;
  }
}

module.exports = connectDB;