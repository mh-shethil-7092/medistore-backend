"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.route.ts
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const mongoose_1 = __importDefault(require("mongoose"));
const router = (0, express_1.Router)();
router.post("/register", auth_controller_1.register);
router.post("/login", auth_controller_1.login);
// NEW: Get all users for the admin table
router.get("/users", async (req, res) => {
    const db = mongoose_1.default.connection.db;
    // FIX: Add a guard clause to ensure the database is connected
    if (!db) {
        return res.status(500).json({ message: "Database connection not established" });
    }
    const users = await db.collection("users").find({}).toArray();
    res.json(users);
});
// NEW: Update user role (Make Admin/Seller/Customer)
router.patch("/update-role", async (req, res) => {
    const { userId, newRole } = req.body;
    const db = mongoose_1.default.connection.db;
    // FIX: Add a guard clause to ensure the database is connected
    if (!db) {
        return res.status(500).json({ message: "Database connection not established" });
    }
    await db.collection("users").updateOne({ _id: new mongoose_1.default.Types.ObjectId(userId) }, { $set: { role: newRole } });
    res.json({ message: "Role updated successfully" });
});
exports.default = router;
