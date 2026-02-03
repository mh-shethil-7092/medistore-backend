import express from "express";
import clientPromise from "../lib/mongodb";
import { IMedicine } from "../types/medicine";

const router = express.Router();

// GET all medicines for the shop
router.get("/all", async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("ymtipu101_db"); // Using the DB name from your .env
    const medicines = await db.collection<IMedicine>("medicines").find({}).toArray();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch medicines" });
  }
});

// POST a new medicine (Used by Seller Dashboard)
router.post("/add", async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("ymtipu101_db");
    const newMedicine: IMedicine = {
      ...req.body,
      createdAt: new Date(),
    };
    const result = await db.collection("medicines").insertOne(newMedicine);
    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Failed to add medicine" });
  }
});

export default router;