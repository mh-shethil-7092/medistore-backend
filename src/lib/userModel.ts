// userModel.ts
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
}, { timestamps: true });

// Add this line to stop the buffering error immediately
UserSchema.set('bufferCommands', false); 

export const User = mongoose.models.User || mongoose.model("User", UserSchema);