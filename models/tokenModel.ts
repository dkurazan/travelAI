import { Schema, model, models } from "mongoose";

const tokenSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  tokens: {
    type: Number,
    default: 1000,
  },
});

export const Token = models.tokens || model("tokens", tokenSchema);
