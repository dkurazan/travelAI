import { Schema, model, models } from "mongoose";

const messageSchema = new Schema({
  role: { type: String, required: true },
  content: { type: String, required: true },
  senderId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Message = models.Message || model("Message", messageSchema);


