import express from "express";
import { addConviction, getConvictions } from "../controllers/conviction.controller.js";

const router = express.Router();

router.post("/convictions", addConviction);
router.get("/convictions", getConvictions);

export default router;
