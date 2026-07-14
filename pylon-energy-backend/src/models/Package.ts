import { Schema, model } from "mongoose";

const PackageSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, enum: ["battery", "solarBattery", "solarSystem"], required: true },
    specs: { type: Object, required: true },
    annualSavings: { type: String, required: true },
    dailyOutput: { type: String },
    warranty: { type: String },
    suitedFor: { type: String },
    panels: { type: String },
    inverter: { type: String },
    popular: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Package = model("Package", PackageSchema);
