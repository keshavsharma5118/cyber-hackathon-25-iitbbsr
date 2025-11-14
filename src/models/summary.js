import mongoose from "mongoose";

const SummarySchema = new mongoose.Schema({
  district: { type: String, required: true },
  month: { type: String, required: true }, 

  convictionCount: Number,
  acquittalCount: Number,
  importantDetections: String,

  remarks: String,
}, { timestamps: true });

export default mongoose.model("Summary", SummarySchema);
