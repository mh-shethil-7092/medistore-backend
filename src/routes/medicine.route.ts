import express from "express";
import mongoose from "mongoose";
import { ObjectId } from "mongodb"; // ✅ Fixes the 'ObjectId' error from image_784603.png

const router = express.Router();

// GET all medicines
router.get("/all", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    if (!db) return res.status(500).json({ error: "Database not ready" });

    const medicines = await db.collection("medicines").find({}).toArray();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch medicines" });
  }
});

// POST new medicine
router.post("/add", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    if (!db) return res.status(500).json({ error: "Database not connected" });

    const result = await db.collection("medicines").insertOne({
      ...req.body,
      createdAt: new Date(),
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to add medicine" });
  }
});

export default router;