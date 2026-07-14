"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FAQSection from "@/components/FAQSection";
import { Check, BadgePercent } from "lucide-react";
import { Suspense } from "react";

const residentialPackages = [
  { name: "5kW Solar System", size: "11 Panels (475W)", inverter: "4kW Smart Inverter", suited: "Small homes / 1-2 people", savings: "Up to $1,800/yr" },
  { name: "6.6kW Solar System", size: "14 Panels (475W)", inverter: "5kW Smart Inverter", suited: "Average homes / 2-3 people", savings: "Up to $2,600/yr", popular: true },
  { name: "8kW Solar System", size: "17 Panels (475W)", inverter: "6kW Smart Inverter", suited: "Medium homes / 3-4 people", savings: "Up to $3,200/yr" },
  { name: "10kW Solar System", size: "22 Panels (475W)", inverter: "8kW Smart Inverter", suited: "Large homes / 4-5 people", savings: "Up to $4,500/yr" },
  { name: "13.2kW Solar System", size: "28 Panels (475W)", inverter: "10kW Smart Inverter", suited: "Extra large / High consumption", savings: "Up to $5,800/yr" },
];

const stateMap: { [key: string]: { name: string; rebate: string } } = {
  QLD: { name: "Queensland", rebate: "Up to $3,200" },
  NSW: { name: "New South Wales", rebate: "Up to $3,500" },
  VIC: { name: "Victoria", rebate: "Up to $3,000" },
  SA: { name: "South Australia", rebate: "Up to $3,400" },
  WA: { name: "Western Australia", rebate: "Up to $2,800" },
};

function ResidentialSolarContent() {
  const searchParams = useSearchParams();
  const stateCode = searchParams.get("state") || "NSW";
  const postcode = searchParams.get("postcode") || "";
  
  const activeState = stateMap[stateCode] || stateMap.NSW!;

  return (
    <>
      <PageHero
        title={`Solar Panels in ${activeState.name}`}
        subtitle={`Slash your bills with premium solar panels in ${activeState.name}. Save up to ${activeState.rebate} with active 2026 government incentives.`}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: `Residential Solar - ${stateCode}` },
        ]}
      />

      {/* Intro */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label">HOME SOLAR POWER</p>
              <h2 className="section-title">Save Up to 80% on Your Electricity Bills</h2>
              <p className="text-pe-gray-500 leading-relaxed mb-6">
                Going solar is one of the most effective ways for homeowners in {activeState.name} to cut living expenses. With rising electricity tariffs, generating your own clean, free power from the sun pays for itself in just a few years.
              </p>
              
              <ul className="space-y-3 mb-8">
                {["Increase your property valuation", "Generate free power for up to 25+ years", "Reduce carbon emissions instantly", "Apply federal STC rebate to save upfront"].map((b, i) => (
                  <li key={i} className="flex items-center gap-2 text-pe-gray-700 font-medium">
                    <Check size={18} className="text-pe-green" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-pe-navy text-white rounded-3xl p-8 border border-pe-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                  <BadgePercent size={24} className="text-pe-cyan" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">2026 Government Rebate</h3>
                  <p className="text-white/60 text-xs">Small-scale Technology Certificates (STC)</p>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Federal incentives offer significant support for home solar installations. For {activeState.name} households, this rebate can save you {activeState.rebate} on system costs. We handle all approvals and apply this discount directly.
              </p>
              <Link href={`/get-quote?postcode=${postcode}`} className="btn-primary w-full justify-center">
                Calculate My Rebate →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Systems Grid */}
      <section className="section-padding bg-pe-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Residential System Packages</h2>
            <p className="section-subtitle mx-auto">Select the system size that fits your energy footprint. All systems feature Tier-1 panels.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {residentialPackages.map((pkg, i) => (
              <div key={i} className={`card p-6 flex flex-col justify-between relative ${pkg.popular ? 'border-pe-orange shadow-[0_8px_30px_rgba(255,112,41,0.15)]' : ''}`}>
                {pkg.popular && (
                  <span className="absolute -top-3.5 left-6 bg-pe-orange text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3 className="text-xl font-bold text-pe-navy mb-2">{pkg.name}</h3>
                  <p className="text-sm text-pe-gray-500 mb-4">{pkg.size} &middot; {pkg.inverter}</p>
                  
                  <div className="bg-pe-gray-100 rounded-xl p-4 mb-6">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-pe-gray-400">Est. Annual Savings</p>
                    <p className="text-2xl font-black text-pe-green font-mono">{pkg.savings}</p>
                  </div>
                  
                  <p className="text-sm text-pe-gray-600 mb-6"><strong>Suited for:</strong> {pkg.suited}</p>
                </div>

                <Link href={`/get-quote?system=${pkg.name}&postcode=${postcode}`} className="btn-navy w-full justify-center">
                  Get Installed Quote →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />
    </>
  );
}

export default function ResidentialSolar() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading packages...</div>}>
      <ResidentialSolarContent />
    </Suspense>
  );
}
