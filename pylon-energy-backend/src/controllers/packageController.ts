import type { Request, Response } from "express";
import { Package } from "../models/Package.js";
import { isDBConnected } from "../config/db.js";

let memoryPackages = [
  // Battery
  { _id: "pkg_1", name: "14kWh Battery", category: "battery", specs: { type: "LFP", weight: "120kg" }, annualSavings: "$1,500 – $1,700 / yr", dailyOutput: "12.5 – 13.5 kWh", warranty: "10 Years", suitedFor: "2-3 person homes", order: 1, popular: false },
  { _id: "pkg_2", name: "28kWh Battery", category: "battery", specs: { type: "LFP", weight: "240kg" }, annualSavings: "$3,000 – $3,400 / yr", dailyOutput: "25 – 27 kWh", warranty: "10 Years", suitedFor: "4-5 person homes", order: 2, popular: true },
  { _id: "pkg_3", name: "42kWh Battery", category: "battery", specs: { type: "LFP", weight: "360kg" }, annualSavings: "$4,500 – $5,100 / yr", dailyOutput: "38 – 41.5 kWh", warranty: "10 Years", suitedFor: "Large homes / Commercial", order: 3, popular: false },
  // Solar + Battery
  { _id: "pkg_4", name: "6.6kW + 28kWh", category: "solarBattery", specs: { panels: "14 × 475W", inverter: "5kW Hybrid" }, annualSavings: "$6,000 – $6,500 / yr", order: 4, popular: false },
  { _id: "pkg_5", name: "10.5kW + 28kWh", category: "solarBattery", specs: { panels: "22 × 475W", inverter: "8kW Hybrid" }, annualSavings: "$7,500 – $8,000 / yr", order: 5, popular: true },
  { _id: "pkg_6", name: "13.2kW + 28kWh", category: "solarBattery", specs: { panels: "28 × 475W", inverter: "10kW Hybrid" }, annualSavings: "$8,800 – $9,200 / yr", order: 6, popular: false },
  // Solar System
  { _id: "pkg_7", name: "6.6kW Solar", category: "solarSystem", specs: { panels: "14 × 475W", inverter: "5kW Smart" }, annualSavings: "$2,400 – $2,600 / yr", order: 7, popular: false },
  { _id: "pkg_8", name: "10.45kW Solar", category: "solarSystem", specs: { panels: "22 × 475W", inverter: "8kW Smart" }, annualSavings: "$4,400 – $4,800 / yr", order: 8, popular: true },
  { _id: "pkg_9", name: "13.2kW Solar", category: "solarSystem", specs: { panels: "28 × 475W", inverter: "10kW Smart" }, annualSavings: "$5,500 – $5,800 / yr", order: 9, popular: false },
];

export async function getPackages(req: Request, res: Response): Promise<void> {
  try {
    if (isDBConnected) {
      const packages = await Package.find().sort({ order: 1 });
      res.json({ success: true, packages });
    } else {
      res.json({ success: true, packages: memoryPackages });
    }
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function seedPackages(req: Request, res: Response): Promise<void> {
  try {
    if (!isDBConnected) {
      res.json({ success: true, message: "MOCK DB: Seed complete (in-memory mode).", count: memoryPackages.length });
      return;
    }
    const count = await Package.countDocuments();
    if (count > 0) {
      res.json({ success: true, message: "Database already seeded with packages.", count });
      return;
    }
    const packages = await Package.insertMany(memoryPackages.map(({ _id, ...p }) => p));
    res.status(201).json({ success: true, message: "Seeded solar packages successfully.", count: packages.length });
  } catch (error) {
    res.status(500).json({ error: "Seeding failed" });
  }
}

export async function createPackage(req: Request, res: Response): Promise<void> {
  try {
    const { name, category, specs, annualSavings, dailyOutput, warranty, suitedFor, popular, order } = req.body;
    let pkg: any;

    if (isDBConnected) {
      pkg = await Package.create({
        name,
        category,
        specs,
        annualSavings,
        dailyOutput,
        warranty,
        suitedFor,
        popular: !!popular,
        order: Number(order || 0),
      });
    } else {
      pkg = {
        _id: `mem_pkg_${Math.random().toString(36).substring(2, 9)}`,
        name,
        category,
        specs,
        annualSavings,
        dailyOutput,
        warranty,
        suitedFor,
        popular: !!popular,
        order: Number(order || 0),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      memoryPackages.push(pkg);
      memoryPackages.sort((a, b) => a.order - b.order);
    }
    res.status(201).json({ success: true, package: pkg });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deletePackage(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    if (isDBConnected) {
      const pkg = await Package.findByIdAndDelete(id);
      if (!pkg) {
        res.status(404).json({ error: "Package not found" });
        return;
      }
    } else {
      const idx = memoryPackages.findIndex((p) => p._id === id);
      if (idx === -1) {
        res.status(404).json({ error: "Package not found" });
        return;
      }
      memoryPackages.splice(idx, 1);
    }
    res.json({ success: true, message: "Package deleted successfully" });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}
