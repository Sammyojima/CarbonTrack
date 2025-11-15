import mongoose from "mongoose";

const emissionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    source: { type: String, required: true },
    fuelType: { type: String, required: true },
    quantity: { type: Number, required: true },
    co2Emitted: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("Emission", emissionSchema);
