import mongoose from "mongoose";

const ConvictionSchema = new mongoose.Schema(
  {
    district: { type: String, required: true },
    month: { type: String, required: true }, // "2025-02"

    // we store all Form2 fields under a flexible object
    data: { type: Object, required: true },

    remarks: String
  },
  { timestamps: true }
);

export default mongoose.model("Conviction", ConvictionSchema);
