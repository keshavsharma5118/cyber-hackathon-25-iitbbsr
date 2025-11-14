import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import driveRoutes from "./routes/drive.routes.js";
import summaryRoutes from "./routes/summary.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
connectDB();

// Routes
app.use("/api/drive", driveRoutes);
app.use("/api/summary", summaryRoutes);

app.get("/", (req, res) => res.send("Backend Running 🚀"));

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
