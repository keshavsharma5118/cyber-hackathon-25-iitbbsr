import Conviction from "../models/conviction.js";
import { success, error } from "../utils/response.js";

export const addConviction = async (req, res) => {
  try {
    const conviction = await Conviction.create(req.body);
    return success(res, "Monthly conviction summary saved", conviction);
  } catch (err) {
    console.log(err);
    return error(res, "Failed to save Form-2 data");
  }
};

export const getConvictions = async (req, res) => {
  try {
    const filters = {};
    if (req.query.district) filters.district = req.query.district;
    if (req.query.month) filters.month = req.query.month;

    const list = await Conviction.find(filters).sort({ createdAt: -1 });
    return success(res, "Conviction data fetched", list);
  } catch (err) {
    console.log(err);
    return error(res, "Failed to fetch Form-2 data");
  }
};
