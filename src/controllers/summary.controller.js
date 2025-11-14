import Summary from "../models/summary.js";
import { success, error } from "../utils/response.js";

export const addSummary = async (req, res) => {
  try {
    const summary = await Summary.create(req.body);
    return success(res, "Summary saved", summary);
  } catch (err) {
    console.log(err);
    return error(res, "Failed to save summary");
  }
};

export const getSummaries = async (req, res) => {
  try {
    const filter = {};
    if (req.query.district) filter.district = req.query.district;
    if (req.query.month) filter.month = req.query.month;

    const list = await Summary.find(filter).sort({ createdAt: -1 });
    return success(res, "Summaries fetched", list);
  } catch (err) {
    console.log(err);
    return error(res, "Failed to fetch summaries");
  }
};
