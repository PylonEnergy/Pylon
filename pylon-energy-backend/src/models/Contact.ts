import { Schema, model } from "mongoose";
import { z } from "zod";

export const ContactValidationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(8, "Phone must be at least 8 digits"),
  message: z.string().min(5, "Message must be at least 5 characters long"),
});

export type ContactInput = z.infer<typeof ContactValidationSchema>;

const ContactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const Contact = model("Contact", ContactSchema);
