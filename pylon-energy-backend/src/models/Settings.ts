import { Schema, model } from "mongoose";

const SettingsSchema = new Schema(
  {
    primaryNavy: { type: String, default: "#002B5C" },
    accentOrange: { type: String, default: "#29ABE2" },
    bannerVisible: { type: Boolean, default: false },
    bannerMessage: { type: String, default: "" },
    bannerLink: { type: String, default: "" },
    bannerImage: { type: String, default: "" },
    seo: {
      type: Map,
      of: new Schema({
        title: { type: String },
        description: { type: String },
      }),
      default: {},
    },
    gtmId: { type: String, default: "" },
    pixelId: { type: String, default: "" },
    ga4Id: { type: String, default: "" },
    siteVerification: { type: String, default: "" },
    adCampaigns: {
      type: Array,
      default: [
        { name: "Google Search - Sydney Residential", platform: "Google Ads", status: "active", budget: 50, impressions: 12400, clicks: 482 },
        { name: "Meta Lead Gen - NSW Postcodes", platform: "Facebook", status: "active", budget: 35, impressions: 8900, clicks: 310 },
        { name: "Promo Header Announcement", platform: "Website Banner", status: "paused", budget: 0, impressions: 4500, clicks: 120 }
      ]
    },
  },
  { timestamps: true }
);

export const Settings = model("Settings", SettingsSchema);
