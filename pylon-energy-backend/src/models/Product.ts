import { Schema, model } from "mongoose";
import { z } from "zod";

export const ProductValidationSchema = z.object({
  name: z.string(),
  brand: z.string(),
  category: z.enum(["panel", "inverter", "battery", "other"]),
  description: z.string().optional(),
  specs: z.record(z.string(), z.string()).optional().default({}),
  image: z.string().optional().default(""),
  datasheet: z.string().optional().default(""),
  installImages: z.array(z.string()).optional().default([]),
});

export type ProductInput = z.infer<typeof ProductValidationSchema>;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, enum: ["panel", "inverter", "battery", "other"], required: true },
    description: { type: String },
    specs: { type: Object },
    image: { type: String },
    datasheet: { type: String },
    installImages: { type: [String] },
  },
  { timestamps: true }
);

export const Product = model("Product", ProductSchema);
