import { Schema, model } from "mongoose";
import { z } from "zod";

export const LeadValidationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(8, "Phone number must be at least 8 digits long"),
  postcode: z.string().length(4, "Postcode must be exactly 4 digits long"),
  interest: z.enum(["residential", "commercial", "battery", "ev"]),
  message: z.string().nullable().optional(),
  utmSource: z.string().optional().default(""),
  utmMedium: z.string().optional().default(""),
  utmCampaign: z.string().optional().default(""),
});

export type LeadInput = z.infer<typeof LeadValidationSchema>;

const LeadSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    postcode: { type: String, required: true },
    interest: { type: String, enum: ["residential", "commercial", "battery", "ev"], required: true },
    message: { type: String },
    utmSource: { type: String, default: "" },
    utmMedium: { type: String, default: "" },
    utmCampaign: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Lead = model("Lead", LeadSchema);
