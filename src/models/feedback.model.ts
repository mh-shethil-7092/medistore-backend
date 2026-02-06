import { Schema, model } from "mongoose";

const feedbackSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const Feedback = model("Feedback", feedbackSchema);
