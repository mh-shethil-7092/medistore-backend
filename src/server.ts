import express from "express";
import cors from "cors";
import { env } from "./config/env";
import authRoutes from "./routes/auth.route";
import medicineRoutes from "./routes/medicine.route";
import dbConnect from "./lib/mongodb";
import feedbackRoute from "./routes/feedback.route";

const app = express();

// ✅ Fixed CORS: Allowing all origins so Netlify can connect
app.use(cors({ 
  origin: "*", 
  credentials: true 
}));

app.use(express.json());

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/feedback", feedbackRoute);

// (Removed the duplicate app.use(cors) from down here to keep code clean)

const PORT = env.PORT || 5000;

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