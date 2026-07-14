import { Schema, model } from "mongoose";
import { z } from "zod";

export const BlogValidationSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  author: z.string().min(2, "Author must be at least 2 characters"),
  readTime: z.string().default("3 min read"),
  coverImage: z.string().optional().nullable(),
});

export type BlogInput = z.infer<typeof BlogValidationSchema>;

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    readTime: { type: String, default: "3 min read" },
    coverImage: { type: String, default: null },
  },
  { timestamps: true }
);

export const Blog = model("Blog", BlogSchema);
