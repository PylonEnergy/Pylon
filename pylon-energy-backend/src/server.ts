import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import apiRoutes from "./routes/api.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3001";

// Middlewares
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman) or from any localhost
    if (!origin || origin.startsWith("http://localhost") || origin === CORS_ORIGIN) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
}));
app.use(express.json());

// API routes
app.use("/api", apiRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// Run server after DB connect
async function startServer() {
  await connectDB();

  // Self-heal/migrate default colors in database
  try {
    const { Settings } = await import("./models/Settings.js");
    const settings = await Settings.findOne();
    if (settings && settings.accentOrange === "#FF7029") {
      settings.accentOrange = "#29ABE2";
      await settings.save();
      console.log("Database theme migration: accentOrange updated to #29ABE2.");
    }
  } catch (err) {
    console.error("Database theme migration error:", err);
  }

  app.listen(PORT, () => {
    console.log(`Pylon Energy Backend API running on port ${PORT}`);
  });
}

startServer();
