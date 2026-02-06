import express from "express";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const router = express.Router();

// GET all medicines
router.get("/all", async (_req, res) => {
  try {
    const db = mongoose.connection.db;
    if (!db) return res.status(500).json({ error: "Database not ready" });

    const medicines = await db.collection("medicines").find({}).toArray();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch medicines" });
  }
});

// ADD medicine
router.post("/add", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    if (!db) return res.status(500).json({ error: "Database not connected" });

    const result = await db.collection("medicines").insertOne({
      ...req.body,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Medicine added", result });
  } catch (err) {
    res.status(500).json({ error: "Failed to add medicine" });
  }
});

// ✅ UPDATE medicine (THIS WAS MISSING)
router.put("/update/:id", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    if (!db) return res.status(500).json({ error: "Database not ready" });

    const { id } = req.params;

    const result = await db.collection("medicines").updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...req.body, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    res.json({ message: "Medicine updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update medicine" });
  }
});

// DELETE medicine
router.delete("/delete/:id", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    if (!db) return res.status(500).json({ error: "Database not ready" });

    const { id } = req.params;

    await db.collection("medicines").deleteOne({
      _id: new ObjectId(id),
    });

    res.json({ message: "Medicine deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete medicine" });
  }
});

export default router;
