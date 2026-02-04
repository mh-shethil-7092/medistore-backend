// import express from "express";
// import clientPromise from "../lib/mongodb";

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

import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/test-db", (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({ success: isConnected, message: isConnected ? "Connected" : "Failed" });
});

export default router;
