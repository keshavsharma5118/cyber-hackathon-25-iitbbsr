import Drive from "../models/drive.js";
import { success, error } from "../utils/response.js";

export const addDrive = async (req, res) => {
  try {
    const drive = await Drive.create(req.body);
    return success(res, "Drive saved successfully", drive);
  } catch (err) {
    console.log(err);
    return error(res, "Failed to save drive");
  }
};

export const getDrives = async (req, res) => {
  try {
    const filters = {};
    if (req.query.district) filters.district = req.query.district;
    if (req.query.driveType) filters.driveType = req.query.driveType;

    const drives = await Drive.find(filters).sort({ createdAt: -1 });
    return success(res, "Drives fetched", drives);
  } catch (err) {
    console.log(err);
    return error(res, "Failed to fetch drives!!!!!!!!!");
  }
};
