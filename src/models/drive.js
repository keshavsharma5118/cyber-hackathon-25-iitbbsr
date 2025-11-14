import mongoose from "mongoose";

const DriveSchema = new mongoose.Schema({
  district: { type: String, required: true },
  driveType: { type: String, required: true },

  // Dates can be optional if not sent
  startDate: { type: Date },
  endDate: { type: Date },

  // to store all dynamic form fields 
  data: { type: Object, required: true },

  attachments: [String],
}, { timestamps: true });

export default mongoose.model("Drive", DriveSchema);
