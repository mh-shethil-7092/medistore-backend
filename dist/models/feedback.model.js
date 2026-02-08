"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = void 0;
const mongoose_1 = require("mongoose");
const feedbackSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    message: { type: String, required: true },
}, { timestamps: true });
exports.Feedback = (0, mongoose_1.model)("Feedback", feedbackSchema);
