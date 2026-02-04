// env.ts
import dotenv from "dotenv";
import path from "path";

// Load .env file from the root directory
dotenv.config();

export const env = {
  MONGODB_URI: process.env.MONGODB_URI as string,
  PORT: process.env.PORT || "5000",
  JWT_SECRET: process.env.JWT_SECRET as string,
};

// Validation
if (!env.MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is missing in .env file");
}
