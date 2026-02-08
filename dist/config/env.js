"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
// env.ts
const dotenv_1 = __importDefault(require("dotenv"));
// Load .env file from the root directory
dotenv_1.default.config();
exports.env = {
    MONGODB_URI: process.env.MONGODB_URI,
    PORT: process.env.PORT || "5000",
    JWT_SECRET: process.env.JWT_SECRET,
};
// Validation
if (!exports.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI is missing in .env file");
}
