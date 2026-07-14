import type { Request, Response } from "express";
import { Product, ProductValidationSchema } from "../models/Product.js";
import { isDBConnected } from "../config/db.js";

// In-memory fallback database pre-populated with mock items
const memoryProducts: any[] = [
  {
    _id: "prod_1",
    brand: "Jinko Solar",
    name: "Tiger Neo N-type 440W",
    category: "panel",
    description: "High efficiency monocrystalline solar panel utilizing N-type technology.",
    specs: { "Max Power": "440W", "Efficiency": "22.02%", "Warranty": "25 Years" },
    image: "",
    datasheet: "",
    installImages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "prod_2",
    brand: "Sungrow",
    name: "SG5.0RS Hybrid Inverter",
    category: "inverter",
    description: "Single-phase hybrid inverter with premium safety and monitoring features.",
    specs: { "Max Output": "5000W", "Efficiency": "98.4%", "MPPT Channels": "2" },
    image: "",
    datasheet: "",
    installImages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function getProducts(req: Request, res: Response): Promise<void> {
  try {
    if (isDBConnected) {
      const products = await Product.find().sort({ createdAt: -1 });
      res.json({ success: true, products });
    } else {
      // If the array was somehow emptied, ensure it has the mock items
      if (memoryProducts.length === 0) {
        memoryProducts.push(
          {
            _id: "prod_1",
            brand: "Jinko Solar",
            name: "Tiger Neo N-type 440W",
            category: "panel",
            description: "High efficiency monocrystalline solar panel utilizing N-type technology.",
            specs: { "Max Power": "440W", "Efficiency": "22.02%", "Warranty": "25 Years" },
            image: "",
            datasheet: "",
            installImages: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            _id: "prod_2",
            brand: "Sungrow",
            name: "SG5.0RS Hybrid Inverter",
            category: "inverter",
            description: "Single-phase hybrid inverter with premium safety and monitoring features.",
            specs: { "Max Output": "5000W", "Efficiency": "98.4%", "MPPT Channels": "2" },
            image: "",
            datasheet: "",
            installImages: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        );
      }
      res.json({ success: true, products: [...memoryProducts].reverse() });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function createProduct(req: Request, res: Response): Promise<void> {
  try {
    const validated = ProductValidationSchema.parse(req.body);
    let product: any;

    if (isDBConnected) {
      product = await Product.create({
        name: validated.name,
        brand: validated.brand,
        category: validated.category,
        description: validated.description ?? "",
        specs: validated.specs,
        image: validated.image,
        datasheet: validated.datasheet,
        installImages: validated.installImages,
      });
    } else {
      product = {
        _id: `prod_${Math.random().toString(36).substring(2, 9)}`,
        name: validated.name,
        brand: validated.brand,
        category: validated.category,
        description: validated.description ?? "",
        specs: validated.specs,
        image: validated.image,
        datasheet: validated.datasheet,
        installImages: validated.installImages,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      memoryProducts.push(product);
    }
    res.status(201).json({ success: true, product });
  } catch (error: any) {
    if (error.errors) {
      res.status(400).json({ error: "Validation failed", details: error.errors });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteProduct(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    if (isDBConnected) {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
    } else {
      const idx = memoryProducts.findIndex((p) => p._id === id);
      if (idx === -1) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      memoryProducts.splice(idx, 1);
    }
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
