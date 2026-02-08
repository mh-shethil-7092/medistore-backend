"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFeedback = exports.getFeedbacks = void 0;
const feedback_model_1 = require("../models/feedback.model");
const getFeedbacks = async (_req, res) => {
    try {
        const feedbacks = await feedback_model_1.Feedback.find().sort({ createdAt: -1 });
        res.json(feedbacks);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch feedbacks" });
    }
};
exports.getFeedbacks = getFeedbacks;
const createFeedback = async (req, res) => {
    try {
        const { name, role, message } = req.body;
        if (!name || !role || !message) {
            return res.status(400).json({ error: "All fields required" });
        }
        const feedback = await feedback_model_1.Feedback.create({ name, role, message });
        res.status(201).json(feedback);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to submit feedback" });
    }
};
exports.createFeedback = createFeedback;
