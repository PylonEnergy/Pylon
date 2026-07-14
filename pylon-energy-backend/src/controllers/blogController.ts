import type { Request, Response } from "express";
import { Blog, BlogValidationSchema } from "../models/Blog.js";
import { isDBConnected } from "../config/db.js";

const initialBlogs = [
  {
    _id: "blog_1",
    title: "How to Save on 2026 Government Solar Rebates in NSW",
    slug: "nsw-2026-solar-rebates",
    content: "The Small-scale Technology Certificates (STC) rebate is active in 2026. For residential systems between 6.6kW to 13.2kW in NSW, homeowners can claim up to $3,500 upfront. Learn how you can maximize this rebate value before federal phasing reduces payouts in future cycles.",
    author: "Clean Energy Team",
    readTime: "4 min read",
    coverImage: null,
    createdAt: new Date("2026-07-01"),
  },
  {
    _id: "blog_2",
    title: "Is a Solar Battery Worth It for Sydney Homeowners?",
    slug: "sydney-solar-battery-worth-it",
    content: "With grid electricity rates rising by up to 20% in recent years, storing your solar energy has become highly viable. A typical 14kWh battery store protects you from blackout cycles and decreases daily peak grid imports by 90%. We review the payback ROI numbers.",
    author: "Energy Advisor",
    readTime: "5 min read",
    coverImage: null,
    createdAt: new Date("2026-07-08"),
  },
];

let memoryBlogs = [...initialBlogs];

export async function getBlogs(req: Request, res: Response): Promise<void> {
  try {
    if (isDBConnected) {
      const blogs = await Blog.find().sort({ createdAt: -1 });
      res.json({ success: true, blogs });
    } else {
      res.json({ success: true, blogs: [...memoryBlogs].reverse() });
    }
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getBlogBySlug(req: Request, res: Response): Promise<void> {
  try {
    const { slug } = req.params;
    if (isDBConnected) {
      const blog = await Blog.findOne({ slug } as any);
      if (!blog) {
        res.status(404).json({ error: "Blog post not found" });
        return;
      }
      res.json({ success: true, blog });
    } else {
      const blog = memoryBlogs.find((b) => b.slug === slug);
      if (!blog) {
        res.status(404).json({ error: "Blog post not found" });
        return;
      }
      res.json({ success: true, blog });
    }
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function createBlog(req: Request, res: Response): Promise<void> {
  try {
    const validated = BlogValidationSchema.parse(req.body);
    let blog: any;

    if (isDBConnected) {
      blog = await Blog.create({
        title: validated.title,
        slug: validated.slug,
        content: validated.content,
        author: validated.author,
        readTime: validated.readTime,
        coverImage: validated.coverImage ?? null,
      });
    } else {
      blog = {
        _id: `mem_blog_${Math.random().toString(36).substring(2, 9)}`,
        title: validated.title,
        slug: validated.slug,
        content: validated.content,
        author: validated.author,
        readTime: validated.readTime,
        coverImage: validated.coverImage ?? null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      memoryBlogs.push(blog);
    }
    res.status(201).json({ success: true, blog });
  } catch (error: any) {
    if (error.errors) {
      res.status(400).json({ error: "Validation failed", details: error.errors });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteBlog(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    if (isDBConnected) {
      const blog = await Blog.findByIdAndDelete(id);
      if (!blog) {
        res.status(404).json({ error: "Blog post not found" });
        return;
      }
    } else {
      const idx = memoryBlogs.findIndex((b) => b._id === id);
      if (idx === -1) {
        res.status(404).json({ error: "Blog post not found" });
        return;
      }
      memoryBlogs.splice(idx, 1);
    }
    res.json({ success: true, message: "Blog post deleted successfully" });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}
