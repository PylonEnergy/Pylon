"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Check, TrendingUp } from "lucide-react";

type Tab = "battery" | "solarBattery" | "solarSystem";

const tabs: { id: Tab; label: string }[] = [
  { id: "battery", label: "Solar Batteries" },
  { id: "solarBattery", label: "Solar Panels & Batteries" },
  { id: "solarSystem", label: "Solar System" },
];

const packages = {
  battery: [
    {
      name: "14kWh Battery",
      savings: "$1,500 – $1,700 / yr",
      daily: "12.5 – 13.5 kWh/day",
      warranty: "10-year warranty",
      suited: "2–3 person homes",
      popular: false,
      features: ["Premium lithium cells", "Smart monitoring app", "Blackout protection", "Expandable capacity"],
    },
    {
      name: "28kWh Battery",
      savings: "$3,000 – $3,400 / yr",
      daily: "25 – 27 kWh/day",
      warranty: "10-year warranty",
      suited: "4–5 person homes",
      popular: true,
      features: ["Premium lithium cells", "Smart monitoring app", "Blackout protection", "Expandable capacity"],
    },
    {
      name: "42kWh Battery",
      savings: "$4,500 – $5,100 / yr",
      daily: "38 – 41.5 kWh/day",
      warranty: "10-year warranty",
      suited: "Large homes / Commercial",
      popular: false,
      features: ["Premium lithium cells", "Smart monitoring app", "Blackout protection", "3-phase ready"],
    },
  ],
  solarBattery: [
    {
      name: "6.6kW + 28kWh",
      specs: "14 × 475W Panels · 5kW Hybrid Inverter",
      savings: "$6,000 – $6,500 / yr",
      popular: false,
      features: ["Premium Tier-1 panels", "Hybrid inverter", "Battery storage", "Smart monitoring"],
    },
    {
      name: "10.5kW + 28kWh",
      specs: "22 × 475W Panels · 8kW Hybrid Inverter",
      savings: "$7,500 – $8,000 / yr",
      popular: true,
      features: ["Premium Tier-1 panels", "Hybrid inverter", "Battery storage", "Smart monitoring"],
    },
    {
      name: "13.2kW + 28kWh",
      specs: "28 × 475W Panels · 10kW Hybrid Inverter",
      savings: "$8,800 – $9,200 / yr",
      popular: false,
      features: ["Premium Tier-1 panels", "Hybrid inverter", "Battery storage", "Smart monitoring"],
    },
  ],
  solarSystem: [
    {
      name: "6.6kW Solar",
      specs: "14 × 475W Panels · 5kW Smart Inverter",
      savings: "$2,400 – $2,600 / yr",
      popular: false,
      features: ["Premium Tier-1 panels", "Wi-Fi inverter", "Fully installed", "25-yr panel warranty"],
    },
    {
      name: "10.45kW Solar",
      specs: "22 × 475W Panels · 8kW Smart Inverter",
      savings: "$4,400 – $4,800 / yr",
      popular: true,
      features: ["Premium Tier-1 panels", "Wi-Fi inverter", "Fully installed", "25-yr panel warranty"],
    },
    {
      name: "13.2kW Solar",
      specs: "28 × 475W Panels · 10kW Smart Inverter",
      savings: "$5,500 – $5,800 / yr",
      popular: false,
      features: ["Premium Tier-1 panels", "Wi-Fi inverter", "Fully installed", "25-yr panel warranty"],
    },
  ],
};

function getCardAnchorId(name: string) {
  const n = name.toLowerCase();
  if (n.includes("6.6kw +")) return "6-6kw-battery";
  if (n.includes("10.5kw +")) return "10-kw-battery";
  if (n.includes("13.2kw +")) return "13-kw-battery";
  if (n.includes("6.6kw")) return "6-6kw";
  if (n.includes("10.45kw")) return "10kw";
  if (n.includes("13.2kw")) return "13kw";
  if (n.includes("14kwh")) return "14kwh";
  if (n.includes("28kwh")) return "28kwh";
  if (n.includes("42kwh")) return "42kwh";
  return undefined;
}

export default function SolarPackages() {
  const [activeTab, setActiveTab] = useState<Tab>("solarSystem");
  const [packagesList, setPackagesList] = useState<any>(packages);
  const [highlightedCard, setHighlightedCard] = useState<string | null>(null);

  // Read URL hash on load/navigation to match clicked category tabs
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleHashChange = () => {
        const hash = window.location.hash;
        if (!hash) return;
        
        // Map hashes to tabs
        if (["#5kw", "#6-6kw", "#8kw", "#10kw", "#13kw"].includes(hash)) {
          setActiveTab("solarSystem");
          if (hash === "#5kw" || hash === "#6-6kw") setHighlightedCard("6.6kW Solar");
          if (hash === "#8kw" || hash === "#10kw") setHighlightedCard("10.45kW Solar");
          if (hash === "#13kw") setHighlightedCard("13.2kW Solar");
        } else if (["#6-6kw-battery", "#8kw-battery", "#10kw-battery", "#13kw-battery"].includes(hash)) {
          setActiveTab("solarBattery");
          if (hash === "#6-6kw-battery") setHighlightedCard("6.6kW + 28kWh");
          if (hash === "#8kw-battery" || hash === "#10kw-battery") setHighlightedCard("10.5kW + 28kWh");
          if (hash === "#13kw-battery") setHighlightedCard("13.2kW + 28kWh");
        } else if (["#14kwh", "#28kwh", "#42kwh", "#5kwh", "#10kwh", "#15kwh", "#20kwh"].includes(hash)) {
          setActiveTab("battery");
          if (hash === "#5kwh" || hash === "#10kwh" || hash === "#14kwh") setHighlightedCard("14kWh Battery");
          if (hash === "#15kwh" || hash === "#20kwh" || hash === "#28kwh") setHighlightedCard("28kWh Battery");
          if (hash === "#42kwh") setHighlightedCard("42kWh Battery");
        } else if (hash === "#battery" || hash === "#solarBattery" || hash === "#solarSystem") {
          setActiveTab(hash.substring(1) as Tab);
        }
      };

      // Run on initial mount
      handleHashChange();

      // Listen for hash changes
      window.addEventListener("hashchange", handleHashChange);
      return () => window.removeEventListener("hashchange", handleHashChange);
    }
  }, []);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch("http://localhost:4000/api/packages");
        if (res.ok) {
          const data = await res.json();
          if (data.packages && data.packages.length > 0) {
            const grouped = {
              battery: [] as any[],
              solarBattery: [] as any[],
              solarSystem: [] as any[],
            };
            
            const sortedPkgs = [...data.packages].sort((a, b) => (a.order || 0) - (b.order || 0));

            sortedPkgs.forEach((pkg: any) => {
              const cat = pkg.category;
              if (grouped[cat as keyof typeof grouped]) {
                grouped[cat as keyof typeof grouped].push({
                  name: pkg.name,
                  specs: pkg.specs?.detail || "",
                  savings: pkg.annualSavings,
                  daily: pkg.dailyOutput ? `${pkg.dailyOutput} kWh/day` : "",
                  warranty: pkg.warranty,
                  suited: pkg.suitedFor,
                  popular: !!pkg.popular,
                  features: pkg.features || (cat === "battery" 
                    ? ["Premium lithium cells", "Smart monitoring app", "Blackout protection", "Expandable capacity"]
                    : cat === "solarBattery"
                    ? ["Premium Tier-1 panels", "Hybrid inverter", "Battery storage", "Smart monitoring"]
                    : ["Premium Tier-1 panels", "Wi-Fi inverter", "Fully installed", "25-yr panel warranty"]),
                });
              }
            });

            // Fallback for empty categories
            Object.keys(grouped).forEach((key) => {
              const catKey = key as keyof typeof grouped;
              if (grouped[catKey].length === 0) {
                grouped[catKey] = packages[catKey];
              }
            });

            setPackagesList(grouped);
          }
        }
      } catch (err) {
        console.error("Failed to load CMS packages:", err);
      }
    }
    fetchPackages();
  }, []);

  const currentPackages = packagesList[activeTab];

  return (
    <section id="packages" className="section-padding bg-[#F8FAFC] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-label mx-auto justify-center">OUR PACKAGES</p>
          <h2 className="section-title">
            Solar <span>Packages</span> for Every Home
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Choose from our range of solar systems, batteries, and combined packages. All include government rebate savings.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setHighlightedCard(null); // Reset highlight on manual tab click
              }}
              className={`package-tab ${activeTab === tab.id ? "active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
          {currentPackages.map((pkg: any, i: number) => (
            <div
              key={i}
              id={getCardAnchorId(pkg.name)}
              className={`relative rounded-2xl bg-white p-7 transition-all duration-300 ${
                highlightedCard === pkg.name
                  ? "border-2 border-pe-orange shadow-[0_15px_40px_rgba(255,112,41,0.18)] scale-105 z-10"
                  : pkg.popular
                  ? "border-2 border-[#29ABE2] shadow-[0_15px_40px_rgba(41,171,226,0.12)] md:scale-105 z-10"
                  : "border border-slate-100 hover:border-[#29ABE2]/50 hover:shadow-[0_15px_35px_rgba(0,43,92,0.06)]"
              }`}
            >
              {highlightedCard === pkg.name ? (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-pe-orange text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
                  Selected Package
                </div>
              ) : pkg.popular ? (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-pe-cyan text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              ) : null}

              <h3 className="text-2xl font-black text-pe-navy font-mono mb-1">{pkg.name}</h3>
              {"specs" in pkg && <p className="text-pe-gray-400 text-sm mb-4">{pkg.specs}</p>}
              {"daily" in pkg && <p className="text-pe-gray-400 text-sm mb-1">{pkg.daily}</p>}
              {"suited" in pkg && <p className="text-pe-gray-400 text-sm mb-4">Best for: {pkg.suited}</p>}
              {"warranty" in pkg && <p className="text-pe-gray-400 text-sm mb-4">{pkg.warranty}</p>}

              {/* Savings badge */}
              <div className="flex items-center gap-2 bg-pe-green-light rounded-xl p-3 mb-5">
                <TrendingUp size={18} className="text-pe-green flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-pe-green font-bold uppercase tracking-wider">Annual Savings</p>
                  <p className="text-pe-green font-black font-mono">{pkg.savings}</p>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {pkg.features.map((f: string, j: number) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-pe-gray-600">
                    <Check size={15} className="text-pe-green flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/get-quote"
                className={`block text-center py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 ${
                  pkg.popular
                    ? "bg-gradient-to-r from-[#FF7029] to-[#E5601E] text-white hover:from-[#E5601E] hover:to-[#C84E12] shadow-[0_4px_12px_rgba(255,112,41,0.25)] hover:shadow-[0_6px_18px_rgba(255,112,41,0.4)]"
                    : "border border-[#002B5C] text-[#002B5C] hover:bg-[#002B5C] hover:text-white"
                }`}
              >
                Get A Quote →
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-pe-gray-400 text-sm mt-8">
          All prices include GST. Government rebates applied at point of sale. Prices may vary based on site inspection.
        </p>
      </div>
    </section>
  );
}
