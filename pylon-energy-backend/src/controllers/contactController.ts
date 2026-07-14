import type { Request, Response } from "express";
import { Contact, ContactValidationSchema } from "../models/Contact.js";
import { sendContactMail } from "../config/mailer.js";
import { isDBConnected } from "../config/db.js";

let memoryContacts: any[] = [];

export async function submitContact(req: Request, res: Response): Promise<void> {
  try {
    const validated = ContactValidationSchema.parse(req.body);
    let contact: any;

    if (isDBConnected) {
      contact = await Contact.create(validated);
    } else {
      contact = {
        ...validated,
        _id: `mem_${Math.random().toString(36).substring(2, 9)}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      memoryContacts.push(contact);
      console.log("MOCK DB: Contact stored in memory:", contact);
    }

    sendContactMail(contact);

    res.status(201).json({ success: true, contact });
  } catch (error: any) {
    if (error.errors) {
      res.status(400).json({ error: "Validation failed", details: error.errors });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getContacts(req: Request, res: Response): Promise<void> {
  try {
    if (isDBConnected) {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      res.json({ success: true, contacts });
    } else {
      res.json({ success: true, contacts: [...memoryContacts].reverse() });
    }
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteContact(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    if (isDBConnected) {
      await Contact.findByIdAndDelete(id);
    } else {
      memoryContacts = memoryContacts.filter((c) => c._id !== id);
    }
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}
