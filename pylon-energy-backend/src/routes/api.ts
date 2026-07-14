import { Router } from "express";
import { submitLead, getLeads, deleteLead } from "../controllers/leadController.js";
import { getPackages, seedPackages, createPackage, deletePackage } from "../controllers/packageController.js";
import { submitContact, getContacts, deleteContact } from "../controllers/contactController.js";
import { getSettings, updateSettings } from "../controllers/settingsController.js";
import { getBlogs, getBlogBySlug, createBlog, deleteBlog } from "../controllers/blogController.js";
import { adminLogin } from "../controllers/authController.js";
import { rateLimiter } from "../middleware/rateLimit.js";
import { getProducts, createProduct, deleteProduct } from "../controllers/productController.js";

const router = Router();

// Lead routes
router.post("/leads", rateLimiter, submitLead);
router.get("/leads", getLeads);
router.delete("/leads/:id", deleteLead);

// Package routes
router.get("/packages", getPackages);
router.post("/packages/seed", seedPackages);
router.post("/packages", createPackage);
router.delete("/packages/:id", deletePackage);

// Contact route
router.post("/contact", rateLimiter, submitContact);
router.get("/contact", getContacts);
router.delete("/contact/:id", deleteContact);

// Settings routes
router.get("/settings", getSettings);
router.put("/settings", updateSettings);

// Blog routes
router.get("/blogs", getBlogs);
router.get("/blogs/:slug", getBlogBySlug);
router.post("/blogs", createBlog);
router.delete("/blogs/:id", deleteBlog);

// Product routes
router.get("/products", getProducts);
router.post("/products", createProduct);
router.delete("/products/:id", deleteProduct);

// Auth route
router.post("/admin/login", adminLogin);

export default router;
