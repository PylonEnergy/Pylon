"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BarChart3, TrendingUp, Eye, MousePointerClick,
  Megaphone, Plus, Trash2, Play, Pause, ArrowLeft,
  Globe, Share2, Search, Monitor, Tag, Zap,
  Check, AlertCircle, DollarSign, Activity,
} from "lucide-react";

type Campaign = {
  id: string;
  name: string;
  platform: string;
  status: "active" | "paused";
  budget: number;
  impressions: number;
  clicks: number;
};

const PLATFORM_ICONS: Record<string, any> = {
  "Google Ads": Search,
  "Facebook": Share2,
  "Website Banner": Monitor,
  "Instagram": Globe,
  "Other": Tag,
};

const PLATFORM_COLORS: Record<string, string> = {
  "Google Ads": "bg-blue-50 text-blue-700 border-blue-200",
  "Facebook": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Website Banner": "bg-orange-50 text-orange-700 border-orange-200",
  "Instagram": "bg-pink-50 text-pink-700 border-pink-200",
  "Other": "bg-gray-50 text-gray-600 border-gray-200",
};

export default function MarketingDashboardPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [gtmId, setGtmId] = useState("");
  const [pixelId, setPixelId] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [loading, setLoading] = useState(true);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    platform: "Google Ads",
    budget: "",
    impressions: "0",
    clicks: "0",
  });
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) { router.push("/admin/login"); return; }
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const res = await fetch("http://localhost:4000/api/settings");
      if (!res.ok) throw new Error();
      const data = await res.json();
      const s = data.settings;
      setCampaigns(s.adCampaigns || []);
      setGtmId(s.gtmId || "");
      setPixelId(s.pixelId || "");

      // Fetch leads to calculate ROI
      const leadsRes = await fetch("http://localhost:4000/api/leads");
      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        setLeads(leadsData.leads || []);
      }
    } catch {
      // keep defaults
    } finally {
      setLoading(false);
    }
  }

  async function saveAll(updatedCampaigns?: Campaign[]) {
    setSaveStatus("saving");
    try {
      const res = await fetch("http://localhost:4000/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gtmId,
          pixelId,
          adCampaigns: updatedCampaigns ?? campaigns,
        }),
      });
      if (!res.ok) throw new Error();
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    } catch {
      setSaveStatus("error");
    }
  }

  function toggleStatus(id: string) {
    const updated = campaigns.map((c) =>
      c.id === id ? { ...c, status: c.status === "active" ? "paused" : "active" } as Campaign : c
    );
    setCampaigns(updated);
    saveAll(updated);
  }

  function deleteCampaign(id: string) {
    if (!confirm("Remove this campaign from the dashboard?")) return;
    const updated = campaigns.filter((c) => c.id !== id);
    setCampaigns(updated);
    saveAll(updated);
  }

  function addCampaign(e: React.FormEvent) {
    e.preventDefault();
    const newEntry: Campaign = {
      id: `ad_${Date.now()}`,
      name: newCampaign.name,
      platform: newCampaign.platform,
      status: "active",
      budget: Number(newCampaign.budget),
      impressions: Number(newCampaign.impressions),
      clicks: Number(newCampaign.clicks),
    };
    const updated = [...campaigns, newEntry];
    setCampaigns(updated);
    saveAll(updated);
    setNewCampaign({ name: "", platform: "Google Ads", budget: "", impressions: "0", clicks: "0" });
    setShowNewForm(false);
  }

  // Totals
  const totalBudget = campaigns.reduce((s, c) => s + c.budget, 0);
  const totalImpressions = campaigns.reduce((s, c) => s + c.impressions, 0);
  const totalClicks = campaigns.reduce((s, c) => s + c.clicks, 0);
  const avgCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : "0.00";
  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pe-gray-50">
        <div className="text-center">
          <Activity className="text-pe-orange mx-auto mb-3 animate-pulse" size={40} />
          <p className="text-pe-gray-500 font-semibold">Loading Marketing Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-pe-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-pe-gray-400 hover:text-pe-navy text-sm font-semibold mb-2 transition-colors"
            >
              <ArrowLeft size={15} /> Back to Admin Console
            </Link>
            <h1 className="text-3xl font-black text-pe-navy">Marketing Dashboard</h1>
            <p className="text-pe-gray-500 text-sm mt-0.5">Manage ad campaigns, tracking pixels, and promotional content from one panel.</p>
          </div>
          <button
            onClick={() => setShowNewForm(!showNewForm)}
            className="btn-primary gap-2 flex-shrink-0"
          >
            <Plus size={18} />
            New Campaign
          </button>
        </div>

        {/* ─── KPI Stats Row ─────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Campaigns", value: activeCampaigns, icon: Zap, color: "text-pe-cyan", bg: "bg-pe-cyan-light" },
            { label: "Daily Ad Budget", value: `$${totalBudget}/day`, icon: DollarSign, color: "text-pe-green", bg: "bg-green-50" },
            { label: "Total Impressions", value: totalImpressions.toLocaleString(), icon: Eye, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Avg. Click-Through Rate", value: `${avgCTR}%`, icon: MousePointerClick, color: "text-indigo-600", bg: "bg-indigo-50" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-2xl border border-pe-gray-200 p-5 flex items-center gap-4 shadow-sm">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={stat.color} size={22} />
                </div>
                <div>
                  <p className="text-2xl font-black text-pe-navy">{stat.value}</p>
                  <p className="text-xs text-pe-gray-400 font-medium leading-tight">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── New Campaign Form ─────────────────────────────── */}
        {showNewForm && (
          <div className="bg-white border border-pe-cyan/30 rounded-3xl p-7 mb-8 shadow-sm animate-fade-in-up">
            <h2 className="font-black text-pe-navy text-lg mb-5 flex items-center gap-2">
              <Megaphone size={20} className="text-pe-cyan" /> Add New Campaign
            </h2>
            <form onSubmit={addCampaign}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                <div>
                  <label className="block text-xs font-bold text-pe-gray-600 mb-1.5 uppercase tracking-wide">Campaign Name</label>
                  <input
                    required
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                    placeholder="e.g. Summer Solar Promo"
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-pe-gray-600 mb-1.5 uppercase tracking-wide">Platform</label>
                  <select
                    value={newCampaign.platform}
                    onChange={(e) => setNewCampaign({ ...newCampaign, platform: e.target.value })}
                    className="form-input"
                  >
                    <option>Google Ads</option>
                    <option>Facebook</option>
                    <option>Instagram</option>
                    <option>Website Banner</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-pe-gray-600 mb-1.5 uppercase tracking-wide">Daily Budget ($)</label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={newCampaign.budget}
                    onChange={(e) => setNewCampaign({ ...newCampaign, budget: e.target.value })}
                    placeholder="50"
                    className="form-input font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-pe-gray-600 mb-1.5 uppercase tracking-wide">Impressions</label>
                  <input
                    type="number"
                    min="0"
                    value={newCampaign.impressions}
                    onChange={(e) => setNewCampaign({ ...newCampaign, impressions: e.target.value })}
                    placeholder="0"
                    className="form-input font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-pe-gray-600 mb-1.5 uppercase tracking-wide">Clicks</label>
                  <input
                    type="number"
                    min="0"
                    value={newCampaign.clicks}
                    onChange={(e) => setNewCampaign({ ...newCampaign, clicks: e.target.value })}
                    placeholder="0"
                    className="form-input font-mono"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="btn-primary">Launch Campaign</button>
                <button type="button" onClick={() => setShowNewForm(false)} className="btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ─── Campaigns List ───────────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-black text-pe-navy text-lg">Active & Paused Campaigns</h2>

            {campaigns.length === 0 ? (
              <div className="bg-white rounded-2xl border border-pe-gray-200 p-12 text-center">
                <BarChart3 className="mx-auto text-pe-gray-300 mb-3" size={40} />
                <p className="text-pe-gray-400 font-semibold">No campaigns yet.</p>
                <p className="text-pe-gray-300 text-sm mt-1">Click "New Campaign" to start tracking your first ad.</p>
              </div>
            ) : (
              campaigns.map((c) => {
                const PIcon = PLATFORM_ICONS[c.platform] || Tag;
                const ctr = c.impressions > 0 ? ((c.clicks / c.impressions) * 100).toFixed(2) : "0.00";
                return (
                  <div
                    key={c.id}
                    className={`bg-white border rounded-2xl p-5 shadow-sm transition-all ${
                      c.status === "active" ? "border-pe-gray-200" : "border-pe-gray-100 opacity-70"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-pe-gray-100 flex items-center justify-center flex-shrink-0">
                          <PIcon size={18} className="text-pe-gray-600" />
                        </div>
                        <div>
                          <p className="font-bold text-pe-navy text-sm">{c.name}</p>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border mt-0.5 ${PLATFORM_COLORS[c.platform] || PLATFORM_COLORS["Other"]}`}>
                            {c.platform}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {/* Status badge */}
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          c.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}>
                          {c.status}
                        </span>
                        {/* Toggle */}
                        <button
                          onClick={() => toggleStatus(c.id)}
                          title={c.status === "active" ? "Pause" : "Activate"}
                          className={`p-2 rounded-xl transition-colors ${
                            c.status === "active"
                              ? "text-yellow-600 hover:bg-yellow-50"
                              : "text-green-600 hover:bg-green-50"
                          }`}
                        >
                          {c.status === "active" ? <Pause size={16} /> : <Play size={16} />}
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => deleteCampaign(c.id)}
                          className="p-2 text-pe-gray-400 hover:text-red-500 rounded-xl hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Metrics strip */}
                    {(() => {
                      const conversions = leads.filter(
                        (l) =>
                          (l.utmCampaign && l.utmCampaign.toLowerCase() === c.name.toLowerCase()) ||
                          (l.utmSource && c.platform.toLowerCase().includes(l.utmSource.toLowerCase()))
                      ).length;
                      const cpc = c.clicks > 0 ? (c.budget / c.clicks).toFixed(2) : "0.00";
                      const cpl = conversions > 0 ? (c.budget / conversions).toFixed(2) : "0.00";
                      return (
                        <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-pe-gray-100">
                          <div className="text-center">
                            <p className="text-pe-navy font-black text-xs sm:text-sm">${c.budget}<span className="text-pe-gray-400 text-[10px] font-medium">/d</span></p>
                            <p className="text-[10px] text-pe-gray-400 font-medium">Budget</p>
                          </div>
                          <div className="text-center">
                            <p className={`font-black text-xs sm:text-sm ${parseFloat(ctr) > 3 ? "text-pe-green" : "text-pe-orange"}`}>{ctr}%</p>
                            <p className="text-[10px] text-pe-gray-400 font-medium">CTR</p>
                          </div>
                          <div className="text-center">
                            <p className="text-pe-navy font-black text-xs sm:text-sm">${cpc}</p>
                            <p className="text-[10px] text-pe-gray-400 font-medium">Est. CPC</p>
                          </div>
                          <div className="text-center">
                            <p className="text-pe-navy font-black text-xs sm:text-sm">{conversions}</p>
                            <p className="text-[10px] text-pe-gray-400 font-medium" title={conversions > 0 ? `Cost per Lead: $${cpl}` : ""}>Leads</p>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Progress bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-[10px] text-pe-gray-400 mb-1">
                        <span>Click-through efficiency</span>
                        <span>{ctr}%</span>
                      </div>
                      <div className="h-1.5 bg-pe-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-pe-cyan rounded-full transition-all duration-700"
                          style={{ width: `${Math.min(parseFloat(ctr) * 10, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* ─── Right Sidebar ─────────────────────────────────── */}
          <div className="space-y-6">

            {/* Tracking Pixels */}
            <div className="bg-white border border-pe-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-black text-pe-navy mb-4 flex items-center gap-2">
                <Tag size={18} className="text-pe-cyan" /> Tracking Pixels
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-pe-gray-600 mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                    <Search size={12} /> Google Tag Manager ID
                  </label>
                  <input
                    type="text"
                    value={gtmId}
                    onChange={(e) => setGtmId(e.target.value)}
                    placeholder="GTM-XXXXXXX"
                    className="form-input font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-pe-gray-600 mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                    <Share2 size={12} /> Meta Pixel ID
                  </label>
                  <input
                    type="text"
                    value={pixelId}
                    onChange={(e) => setPixelId(e.target.value)}
                    placeholder="1234567890123456"
                    className="form-input font-mono text-sm"
                  />
                </div>
                <button
                  onClick={() => saveAll()}
                  className="btn-navy w-full py-2.5 text-sm gap-2"
                >
                  {saveStatus === "saving" ? "Saving..." : "Save Pixel Configs"}
                </button>
                {saveStatus === "saved" && (
                  <p className="text-pe-green text-xs font-bold flex items-center gap-1 justify-center">
                    <Check size={13} /> Tracking configs saved successfully
                  </p>
                )}
                {saveStatus === "error" && (
                  <p className="text-red-500 text-xs font-bold flex items-center gap-1 justify-center">
                    <AlertCircle size={13} /> Failed to save. Check API status.
                  </p>
                )}
              </div>
            </div>

            {/* Platform Breakdown */}
            <div className="bg-white border border-pe-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-black text-pe-navy mb-4 flex items-center gap-2">
                <BarChart3 size={18} className="text-pe-cyan" /> Platform Breakdown
              </h3>
              <div className="space-y-3">
                {Object.entries(
                  campaigns.reduce((acc: Record<string, number>, c) => {
                    acc[c.platform] = (acc[c.platform] || 0) + c.clicks;
                    return acc;
                  }, {})
                ).sort((a, b) => b[1] - a[1]).map(([platform, clicks]) => {
                  const pct = totalClicks > 0 ? Math.round((clicks / totalClicks) * 100) : 0;
                  const PIcon = PLATFORM_ICONS[platform] || Tag;
                  return (
                    <div key={platform}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-pe-gray-700">
                          <PIcon size={12} /> {platform}
                        </span>
                        <span className="text-xs font-black text-pe-navy">{pct}%</span>
                      </div>
                      <div className="h-2 bg-pe-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-pe-cyan rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
                {campaigns.length === 0 && (
                  <p className="text-pe-gray-400 text-xs text-center py-4">No data available yet.</p>
                )}
              </div>
            </div>

            {/* Summary Stats */}
            <div className="bg-pe-navy rounded-2xl p-6 text-white">
              <h3 className="font-black mb-4 flex items-center gap-2 text-sm">
                <TrendingUp size={18} className="text-pe-cyan" /> Overall Performance
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Total Clicks</span>
                  <span className="font-black">{totalClicks.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Total Impressions</span>
                  <span className="font-black">{totalImpressions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Avg CTR</span>
                  <span className={`font-black ${parseFloat(avgCTR) > 3 ? "text-green-400" : "text-pe-cyan"}`}>{avgCTR}%</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-3 mt-1">
                  <span className="text-white/60">Daily Ad Spend</span>
                  <span className="font-black text-pe-cyan">${totalBudget}/day</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
