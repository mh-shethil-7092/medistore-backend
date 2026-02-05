// src/routes/auth.route.ts
import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import mongoose from "mongoose"; 

const router = Router();

router.post("/register", register);
router.post("/login", login);

// NEW: Get all users for the admin table
router.get("/users", async (req, res) => {
    const db = mongoose.connection.db;
    
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
    const db = mongoose.connection.db;
    
    // FIX: Add a guard clause to ensure the database is connected
    if (!db) {
        return res.status(500).json({ message: "Database connection not established" });
    }
    
    await db.collection("users").updateOne(
        { _id: new mongoose.Types.ObjectId(userId) },
        { $set: { role: newRole } }
    );
    res.json({ message: "Role updated successfully" });
});

export default router;