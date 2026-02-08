"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
const router = express_1.default.Router();
// GET all medicines
router.get("/all", async (_req, res) => {
    try {
        const db = mongoose_1.default.connection.db;
        if (!db)
            return res.status(500).json({ error: "Database not ready" });
        const medicines = await db.collection("medicines").find({}).toArray();
        res.json(medicines);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch medicines" });
    }
});
// ADD medicine
router.post("/add", async (req, res) => {
    try {
        const db = mongoose_1.default.connection.db;
        if (!db)
            return res.status(500).json({ error: "Database not connected" });
        const result = await db.collection("medicines").insertOne({
            ...req.body,
            createdAt: new Date(),
        });
        res.status(201).json({ message: "Medicine added", result });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to add medicine" });
    }
});
// ✅ UPDATE medicine (THIS WAS MISSING)
router.put("/update/:id", async (req, res) => {
    try {
        const db = mongoose_1.default.connection.db;
        if (!db)
            return res.status(500).json({ error: "Database not ready" });
        const { id } = req.params;
        const result = await db.collection("medicines").updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { ...req.body, updatedAt: new Date() } });
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Medicine not found" });
        }
        res.json({ message: "Medicine updated" });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to update medicine" });
    }
});
// DELETE medicine
router.delete("/delete/:id", async (req, res) => {
    try {
        const db = mongoose_1.default.connection.db;
        if (!db)
            return res.status(500).json({ error: "Database not ready" });
        const { id } = req.params;
        await db.collection("medicines").deleteOne({
            _id: new mongodb_1.ObjectId(id),
        });
        res.json({ message: "Medicine deleted" });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to delete medicine" });
    }
});
exports.default = router;
