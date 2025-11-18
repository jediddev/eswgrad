import express from "express";
import { loadRoutes } from "./utils/loadRoutes";
import { connectDB } from "./lib/db";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

export const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
connectDB();

// load Next.js style API routes
loadRoutes(app);

app.get("/", (req, res) => {
  res.send("API running");
});
