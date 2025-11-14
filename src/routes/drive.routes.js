import { Router } from "express";
import { addDrive, getDrives } from "../controllers/drive.controller.js";

const router = Router();

router.post("/add", addDrive);
router.get("/list", getDrives);

export default router;
