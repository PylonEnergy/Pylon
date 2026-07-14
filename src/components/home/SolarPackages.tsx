"use client";
import { useState } from "react";
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

export default function SolarPackages() {
  const [activeTab, setActiveTab] = useState<Tab>("solarSystem");

  // Read URL hash on load/navigation to match clicked category tabs
  useState(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash === "#battery" || hash === "#solarBattery" || hash === "#solarSystem") {
        setActiveTab(hash.substring(1) as Tab);
      }
    }
  });

  const currentPackages = packages[activeTab];

  return (
    <section id="packages" className="section-padding bg-white">
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
              onClick={() => setActiveTab(tab.id)}
              className={`package-tab ${activeTab === tab.id ? "active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {currentPackages.map((pkg, i) => (
            <div
              key={i}
              className={`relative rounded-2xl border-2 p-7 transition-all ${
                pkg.popular
                  ? "border-pe-cyan shadow-[0_8px_40px_rgba(41,171,226,0.22)] scale-105"
                  : "border-pe-gray-200 hover:border-pe-cyan hover:shadow-[0_8px_30px_rgba(0,43,92,0.1)]"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-pe-cyan text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}

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
                {pkg.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-pe-gray-600">
                    <Check size={15} className="text-pe-green flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/get-quote"
                className={`block text-center py-3 rounded-xl font-bold text-sm transition-all ${
                  pkg.popular
                    ? "bg-pe-orange text-white hover:bg-pe-orange-dark"
                    : "bg-pe-navy text-white hover:bg-pe-navy-dark"
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
