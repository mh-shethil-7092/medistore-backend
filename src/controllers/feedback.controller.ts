import { Request, Response } from "express";
import { Feedback } from "../models/feedback.model";

export const getFeedbacks = async (_req: Request, res: Response) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch feedbacks" });
  }
};

export const createFeedback = async (req: Request, res: Response) => {
  try {
    const { name, role, message } = req.body;

    if (!name || !role || !message) {
      return res.status(400).json({ error: "All fields required" });
    }

    const feedback = await Feedback.create({ name, role, message });
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ error: "Failed to submit feedback" });
  }
};
