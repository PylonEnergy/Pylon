import type { Request, Response } from "express";
import { Settings } from "../models/Settings.js";
import { isDBConnected } from "../config/db.js";

// Global local settings fallback
let memorySettings: any = {
  primaryNavy: "#002B5C",
  accentOrange: "#29ABE2",
  bannerVisible: false,
  bannerMessage: "🌟 Special Promo: Get a 10kW system and get a free EV charger install!",
  bannerLink: "/services/ev-charger",
  bannerImage: "",
  gtmId: "",
  pixelId: "",
  ga4Id: "",
  siteVerification: "",
  adCampaigns: [
    { id: "ad_1", name: "Google Search - Sydney Residential", platform: "Google Ads", status: "active", budget: 50, impressions: 12400, clicks: 482 },
    { id: "ad_2", name: "Meta Lead Gen - NSW Postcodes", platform: "Facebook", status: "active", budget: 35, impressions: 8900, clicks: 310 },
    { id: "ad_3", name: "Promo Header Announcement", platform: "Website Banner", status: "paused", budget: 0, impressions: 4500, clicks: 120 },
  ],
  seo: {
    "/": { title: "Pylon Energy — Solar Panels & Battery Storage | NSW", description: "Pylon Energy Pty Ltd — Premium solar panels, batteries & EV charger installation across NSW." },
    "/about": { title: "About Us | Pylon Energy", description: "Learn about Pylon Energy — clean energy installers." },
  },
};

export async function getSettings(req: Request, res: Response): Promise<void> {
  try {
    if (isDBConnected) {
      let settings = await Settings.findOne();
      if (!settings) {
        settings = await Settings.create(memorySettings);
      }
      res.json({ success: true, settings });
    } else {
      res.json({ success: true, settings: memorySettings });
    }
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateSettings(req: Request, res: Response): Promise<void> {
  try {
    const { primaryNavy, accentOrange, bannerVisible, bannerMessage, bannerLink, bannerImage, seo, gtmId, pixelId, ga4Id, siteVerification, adCampaigns } = req.body;

    if (isDBConnected) {
      let settings: any = await Settings.findOne();
      if (!settings) settings = new Settings();
      if (primaryNavy !== undefined) settings.primaryNavy = primaryNavy;
      if (accentOrange !== undefined) settings.accentOrange = accentOrange;
      if (typeof bannerVisible === "boolean") settings.bannerVisible = bannerVisible;
      if (bannerMessage !== undefined) settings.bannerMessage = bannerMessage;
      if (bannerLink !== undefined) settings.bannerLink = bannerLink;
      if (bannerImage !== undefined) settings.bannerImage = bannerImage;
      if (gtmId !== undefined) settings.gtmId = gtmId;
      if (pixelId !== undefined) settings.pixelId = pixelId;
      if (ga4Id !== undefined) settings.ga4Id = ga4Id;
      if (siteVerification !== undefined) settings.siteVerification = siteVerification;
      if (seo) settings.seo = seo;
      if (adCampaigns) settings.adCampaigns = adCampaigns;
      await settings.save();
      res.json({ success: true, settings });
    } else {
      if (primaryNavy !== undefined) memorySettings.primaryNavy = primaryNavy;
      if (accentOrange !== undefined) memorySettings.accentOrange = accentOrange;
      if (typeof bannerVisible === "boolean") memorySettings.bannerVisible = bannerVisible;
      if (bannerMessage !== undefined) memorySettings.bannerMessage = bannerMessage;
      if (bannerLink !== undefined) memorySettings.bannerLink = bannerLink;
      if (bannerImage !== undefined) memorySettings.bannerImage = bannerImage;
      if (gtmId !== undefined) memorySettings.gtmId = gtmId;
      if (pixelId !== undefined) memorySettings.pixelId = pixelId;
      if (ga4Id !== undefined) memorySettings.ga4Id = ga4Id;
      if (siteVerification !== undefined) memorySettings.siteVerification = siteVerification;
      if (seo) memorySettings.seo = seo;
      if (adCampaigns) memorySettings.adCampaigns = adCampaigns;
      res.json({ success: true, settings: memorySettings });
    }
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}
