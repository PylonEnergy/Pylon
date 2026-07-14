import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SolarPackages from "@/components/home/SolarPackages";

export const metadata: Metadata = {
  title: "Solar Packages & Pricing | Pylon Energy",
  description: "Browse our packages combining Tier-1 panels, hybrid inverters, and battery systems. Government rebates active. Get upfront estimates.",
};

export default function PackagesPage() {
  return (
    <>
      <PageHero
        title="Solar Packages &amp; Pricing"
        subtitle="Compare our transparent system pricing for residential solar setups, premium batteries, and hybrid configurations."
        breadcrumbs={[{ label: "Solar Packages" }]}
      />

      <SolarPackages />

      {/* Pricing Comparison Table */}
      <section className="section-padding bg-pe-gray-50 border-t border-pe-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Package Comparison Matrix</h2>
            <p className="section-subtitle mx-auto">Compare technical performance characteristics side-by-side to make the right investment choice.</p>
          </div>

          <div className="overflow-x-auto shadow-xl rounded-3xl border border-pe-gray-200 bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-pe-navy text-white text-sm font-semibold border-b border-pe-navy-dark">
                  <th className="p-5 font-bold uppercase tracking-wider">Package Option</th>
                  <th className="p-5 font-bold uppercase tracking-wider">Panel Output</th>
                  <th className="p-5 font-bold uppercase tracking-wider">Inverter Size</th>
                  <th className="p-5 font-bold uppercase tracking-wider font-mono">Storage Size</th>
                  <th className="p-5 font-bold uppercase tracking-wider">Avg. Daily Gen</th>
                  <th className="p-5 font-bold uppercase tracking-wider">Warranty Terms</th>
                  <th className="p-5 font-bold uppercase tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pe-gray-200 text-sm text-pe-gray-700">
                <tr className="hover:bg-pe-gray-50/50 transition-colors">
                  <td className="p-5">
                    <p className="font-black text-pe-navy text-base">6.6kW Starter</p>
                    <span className="text-[10px] bg-pe-cyan-light text-pe-cyan font-bold px-2 py-0.5 rounded-full border border-pe-cyan/15 uppercase mt-1 inline-block">Best Value</span>
                  </td>
                  <td className="p-5 font-medium">6.65 kW (14 × 475W panels)</td>
                  <td className="p-5">5kW Smart Wi-Fi Inverter</td>
                  <td className="p-5 font-mono text-pe-gray-400">None</td>
                  <td className="p-5">
                    <span className="font-mono font-bold text-pe-green bg-pe-green-light px-2.5 py-1 rounded-lg">24 – 27 kWh</span>
                  </td>
                  <td className="p-5 text-xs text-pe-gray-600 font-medium">25 Years Panel / 10 Years Inverter</td>
                  <td className="p-5 text-center">
                    <a href="/get-quote?interest=residential" className="inline-block px-4 py-2 rounded-xl bg-pe-cyan hover:bg-pe-cyan-dark text-white font-bold text-xs transition-all shadow-md hover:shadow-lg">
                      Get Quote
                    </a>
                  </td>
                </tr>
                <tr className="bg-pe-gray-50/30 hover:bg-pe-gray-50/50 transition-colors">
                  <td className="p-5">
                    <p className="font-black text-pe-navy text-base">10.4kW Standard</p>
                    <span className="text-[10px] bg-pe-navy/5 text-pe-navy font-bold px-2 py-0.5 rounded-full border border-pe-navy/10 uppercase mt-1 inline-block">Popular Midsize</span>
                  </td>
                  <td className="p-5 font-medium">10.45 kW (22 × 475W panels)</td>
                  <td className="p-5">8kW Smart Wi-Fi Inverter</td>
                  <td className="p-5 font-mono text-pe-gray-400">None</td>
                  <td className="p-5">
                    <span className="font-mono font-bold text-pe-green bg-pe-green-light px-2.5 py-1 rounded-lg">38 – 42 kWh</span>
                  </td>
                  <td className="p-5 text-xs text-pe-gray-600 font-medium">25 Years Panel / 10 Years Inverter</td>
                  <td className="p-5 text-center">
                    <a href="/get-quote?interest=residential" className="inline-block px-4 py-2 rounded-xl bg-pe-cyan hover:bg-pe-cyan-dark text-white font-bold text-xs transition-all shadow-md hover:shadow-lg">
                      Get Quote
                    </a>
                  </td>
                </tr>
                <tr className="hover:bg-pe-gray-50/50 transition-colors">
                  <td className="p-5">
                    <p className="font-black text-pe-navy text-base">6.6kW + Battery</p>
                    <span className="text-[10px] bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded-full border border-purple-200/50 uppercase mt-1 inline-block">Hybrid Entry</span>
                  </td>
                  <td className="p-5 font-medium">6.65 kW (14 × 475W panels)</td>
                  <td className="p-5">5kW Hybrid Inverter</td>
                  <td className="p-5 font-mono font-bold text-purple-700">10 kWh Storage</td>
                  <td className="p-5">
                    <span className="font-mono font-bold text-pe-green bg-pe-green-light px-2.5 py-1 rounded-lg">24 – 27 kWh</span>
                  </td>
                  <td className="p-5 text-xs text-pe-gray-600 font-medium">25 Years Panel / 10 Years Battery</td>
                  <td className="p-5 text-center">
                    <a href="/get-quote?interest=battery" className="inline-block px-4 py-2 rounded-xl bg-pe-cyan hover:bg-pe-cyan-dark text-white font-bold text-xs transition-all shadow-md hover:shadow-lg">
                      Get Quote
                    </a>
                  </td>
                </tr>
                <tr className="bg-pe-gray-50/30 hover:bg-pe-gray-50/50 transition-colors">
                  <td className="p-5">
                    <p className="font-black text-pe-navy text-base">10.5kW + Battery</p>
                    <span className="text-[10px] bg-pe-cyan-light text-pe-cyan font-bold px-2 py-0.5 rounded-full border border-pe-cyan/15 uppercase mt-1 inline-block">Most Popular</span>
                  </td>
                  <td className="p-5 font-medium">10.45 kW (22 × 475W panels)</td>
                  <td className="p-5">8kW Hybrid Inverter</td>
                  <td className="p-5 font-mono font-bold text-purple-700">14 kWh Storage</td>
                  <td className="p-5">
                    <span className="font-mono font-bold text-pe-green bg-pe-green-light px-2.5 py-1 rounded-lg">38 – 42 kWh</span>
                  </td>
                  <td className="p-5 text-xs text-pe-gray-600 font-medium">25 Years Panel / 10 Years Battery</td>
                  <td className="p-5 text-center">
                    <a href="/get-quote?interest=battery" className="inline-block px-4 py-2 rounded-xl bg-pe-cyan hover:bg-pe-cyan-dark text-white font-bold text-xs transition-all shadow-md hover:shadow-lg">
                      Get Quote
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
