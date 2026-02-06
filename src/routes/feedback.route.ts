import { Router } from "express";
import { getFeedbacks, createFeedback } from "../controllers/feedback.controller";

const router = Router();

router.get("/", getFeedbacks);
router.post("/", createFeedback);

export default router;
