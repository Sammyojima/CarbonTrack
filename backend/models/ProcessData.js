import mongoose from "mongoose";

const processDataSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  naturalGasFlow: { type: Number, required: true }, // Nm³
  reformerTemp: { type: Number, required: true },   // °C
  steamToCarbonRatio: { type: Number, required: true },
  co2Generated: { type: Number }, // Calculated CO2 output in kg
}, { timestamps: true });

export default mongoose.model("ProcessData", processDataSchema);
