import { Router } from "express";
import { addSummary, getSummaries } from "../controllers/summary.controller.js";

const router = Router();

router.post("/add", addSummary);
router.get("/list", getSummaries);

export default router;
