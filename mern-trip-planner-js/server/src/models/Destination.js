const { Schema, model } = require("mongoose");

const AttractionSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const ItineraryDaySchema = new Schema(
  {
    title: { type: String, required: true },
    activities: { type: [String], required: true },
    attractions: { type: [String], required: true },
    meals: { type: String, required: true },
    estimatedExpense: { type: Number, required: true },
  },
  { _id: false }
);

const DestinationSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    state: { type: String, required: true },
    tagline: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    baseBudget: { type: Number, required: true },
    rating: { type: Number, required: true },
    bestTime: { type: String, required: true },
    idealDays: { type: String, required: true },
    attractions: { type: [AttractionSchema], required: true },
    highlights: { type: [String], required: true },
    itinerary: { type: [ItineraryDaySchema], required: true },
  },
  { timestamps: true }
);

const Destination = model("Destination", DestinationSchema);

module.exports = { Destination };
