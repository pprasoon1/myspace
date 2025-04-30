// models/Message.ts
import mongoose, { Schema, model, models } from "mongoose";

const MessageSchema = new Schema(
  {
    from: { type: Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const Message =
  (models.Message as mongoose.Model<any>) ||
  model("Message", MessageSchema);
