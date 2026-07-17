const { Schema, model } = require("mongoose");

const TripSchema = new Schema(
  {
    destinationSlug: { type: String, required: true, index: true },
    destinationName: { type: String, required: true },
    days: { type: Number, required: true },
    category: { type: String, enum: ["Budget", "Standard", "Luxury"], required: true },
    travelerName: { type: String },
    totalBudget: { type: Number, required: true },
  },
  { timestamps: true }
);

const Trip = model("Trip", TripSchema);

module.exports = { Trip };
