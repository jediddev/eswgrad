import express from "express";
import { loadRoutes } from "./utils/loadRoutes";
import { connectDB } from "./lib/db";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

export const app = express();

const allowedOrigins = [
    "https://eswgrad.vercel.app",
    "http://localhost:3000", // for local development
];

app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = "The CORS policy for this site does not allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
connectDB();

// load Next.js style API routes
loadRoutes(app);

app.get("/", (req, res) => {
    res.send("API running");
});
