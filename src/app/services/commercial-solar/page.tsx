import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Check, ShieldCheck, Landmark } from "lucide-react";

export const metadata: Metadata = {
  title: "Commercial Solar Solutions | Pylon Energy",
  description: "Reduce business overheads with premium commercial solar installations. Quality engineering, customized designs, and rapid ROI calculations across NSW.",
};

const commercialSizes = [
  { size: "15kW – 20kW", suited: "Small offices, retail shops, local businesses", panels: "32 – 42 Panels" },
  { size: "30kW – 50kW", suited: "Medium warehouses, medical centres, showrooms", panels: "63 – 105 Panels" },
  { size: "100kW+", suited: "Large factories, cold storage, manufacturing plants", panels: "210+ Panels (Custom Designed)" },
];

export default function CommercialSolar() {
  return (
    <>
      <PageHero
        title="Commercial Solar Solutions"
        subtitle="Turn your corporate roof space into a high-yield asset that slashes operating costs and demonstrates real ESG commitment."
        breadcrumbs={[{ label: "Services", href: "/services" }, { label: "Commercial Solar" }]}
      />

      {/* Intro */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label">COMMERCIAL ENERGY</p>
              <h2 className="section-title">Drive Down Operational Overheads</h2>
              <p className="text-pe-gray-500 leading-relaxed mb-6">
                Electricity costs are one of the most volatile expenses a business faces. By generating your own power during peak trading hours, you protect your bottom line against rising grid prices.
              </p>
              
              <ul className="space-y-3 mb-8">
                {["Substantial reduction in peak demand charges", "Expected payback periods between 3 to 5 years", "Instant asset write-off tax advantages", "Showcase clear environmental and CSR credentials"].map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-pe-gray-700 font-medium">
                    <Check size={18} className="text-pe-green mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-pe-navy text-white rounded-3xl p-8 border border-pe-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                  <Landmark size={24} className="text-pe-orange" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Financing Your Transition</h3>
                  <p className="text-white/60 text-xs">PPA, Lease, and Outright Purchase</p>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                We design custom financial structures to suit your cash flow needs. From Power Purchase Agreements (PPAs) requiring $0 capital expenditure, to equipment leasing options, we facilitate the financial planning process.
              </p>
              <Link href="/contact" className="btn-primary w-full justify-center">
                Speak to our Commercial Consultants →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sizes Section */}
      <section className="section-padding bg-pe-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Commercial System Capacities</h2>
            <p className="section-subtitle mx-auto">We engineer and customize system layouts based on structural feasibility and load requirements.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {commercialSizes.map((sys, i) => (
              <div key={i} className="card p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-black text-pe-navy mb-3 font-mono">{sys.size}</h3>
                  <p className="text-pe-gray-400 text-sm mb-4">Approx: {sys.panels}</p>
                  <p className="text-pe-gray-600 text-sm mb-6"><strong>Ideally Suited For:</strong><br />{sys.suited}</p>
                </div>

                <Link href="/contact" className="btn-navy w-full justify-center">
                  Request Feasibility Audit →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
