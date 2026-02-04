import express from "express";
import cors from "cors";
import { env } from "./config/env";
import authRoutes from "./routes/auth.route";
import medicineRoutes from "./routes/medicine.route";
import dbConnect from "./lib/mongodb";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/medicines", medicineRoutes);

const PORT = env.PORT || 5000;

// ✅ Ensure server only listens AFTER DB is connected
async function startServer() {
  try {
    await dbConnect();
    console.log("✅ MongoDB Connected Successfully");
    
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
}

startServer();