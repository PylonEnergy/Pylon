import type { Request, Response } from "express";
import { Lead, LeadValidationSchema } from "../models/Lead.js";
import { sendLeadMail } from "../config/mailer.js";
import { isDBConnected } from "../config/db.js";

// In-memory fallback database
const memoryLeads: any[] = [];

export async function submitLead(req: Request, res: Response): Promise<void> {
  try {
    const validated = LeadValidationSchema.parse(req.body);
    let lead: any;

    const { utmSource, utmMedium, utmCampaign } = req.body;

    if (isDBConnected) {
      lead = await Lead.create({
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        postcode: validated.postcode,
        interest: validated.interest,
        message: validated.message ?? null,
        utmSource: utmSource || "",
        utmMedium: utmMedium || "",
        utmCampaign: utmCampaign || "",
      });
    } else {
      // Mock creation in memory
      lead = {
        _id: `mem_${Math.random().toString(36).substring(2, 9)}`,
        ...validated,
        message: validated.message ?? null,
        utmSource: utmSource || "",
        utmMedium: utmMedium || "",
        utmCampaign: utmCampaign || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      memoryLeads.push(lead);
      console.log("MOCK DB: Lead stored in memory:", lead);
    }
    
    // Non-blocking notification email
    sendLeadMail(lead);

    res.status(201).json({ success: true, lead });
  } catch (error: any) {
    if (error.errors) {
      res.status(400).json({ error: "Validation failed", details: error.errors });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getLeads(req: Request, res: Response): Promise<void> {
  try {
    if (isDBConnected) {
      const leads = await Lead.find().sort({ createdAt: -1 });
      res.json({ success: true, leads });
    } else {
      res.json({ success: true, leads: [...memoryLeads].reverse() });
    }
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteLead(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    if (isDBConnected) {
      await Lead.findByIdAndDelete(id);
    } else {
      // In-memory fallback
      const idx = memoryLeads.findIndex((l) => l._id === id);
      if (idx !== -1) {
        memoryLeads.splice(idx, 1);
      }
    }
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}
