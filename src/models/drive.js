import mongoose from "mongoose";

const DriveSchema = new mongoose.Schema({
  district: { type: String, required: true },
  driveType: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },

  // flexible metrics (your brother can send anything)
  arrests: Number,
  casesRegistered: Number,
  seizureValue: Number,
  notes: String,

  attachments: [String], // file paths via multer
}, { timestamps: true });

export default mongoose.model("Drive", DriveSchema);
