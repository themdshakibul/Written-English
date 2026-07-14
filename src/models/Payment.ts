import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  itemId: string;
  itemName: string;
  userId: string;
  userEmail: string;
  amount: number;
  currency: string;
  stripeSessionId: string;
  stripePaymentIntent: string;
  status: string;
  createdAt: Date;
}

const PaymentSchema: Schema = new Schema({
  itemId: { type: String, required: true },
  itemName: { type: String, required: true },
  userId: { type: String, required: true },
  userEmail: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "usd" },
  stripeSessionId: { type: String, required: true },
  stripePaymentIntent: { type: String },
  status: { type: String, default: "completed" },
}, { timestamps: true });

export default mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);
