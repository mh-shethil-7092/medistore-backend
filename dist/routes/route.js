"use strict";
// import express from "express";
// import clientPromise from "../lib/mongodb";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// /* TEST DATABASE CONNECTION */
// router.get("/test-db", async (req, res) => {
//   try {
//     const client = await clientPromise;
//     await client.db("admin").command({ ping: 1 });
//     res.json({
//       success: true,
//       message: "MongoDB connected 🚀",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "MongoDB connection failed",
//     });
//   }
// });
// export default router;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.default.Router();
router.get("/test-db", (req, res) => {
    const isConnected = mongoose_1.default.connection.readyState === 1;
    res.json({ success: isConnected, message: isConnected ? "Connected" : "Failed" });
});
exports.default = router;
