import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    inputs: {
      fuelType: String,
      temperature: Number,
      pressure: Number,
      airFlow: Number,
      fuelFlow: Number,
    },
    results: {
      CO2: Number,
      CO: Number,
      carbon: Number,
      recommendations: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Session", sessionSchema);
