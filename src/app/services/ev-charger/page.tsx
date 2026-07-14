import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Check, PlugZap, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "EV Charger Installation | Pylon Energy",
  description: "Certified Level 2 EV charger installations for homes and workplaces across NSW. Compliant electrical design and fast charging setup.",
};

const evSteps = [
  { step: "01", title: "Site Assessment", desc: "We evaluate your home switchboard and check supply capacity to determine optimal charging speed (7.2kW to 22kW)." },
  { step: "02", title: "Compliant Installation", desc: "Our licensed electricians mount the charger, run dedicated cabling, and install necessary circuit breakers." },
  { step: "03", title: "Handover & App Setup", desc: "We configure smart charging profiles so you can schedule charging off-peak or using surplus solar power." },
];

export default function EVCharger() {
  return (
    <>
      <PageHero
        title="EV Charger Installation"
        subtitle="Fuel your electric vehicle with free energy from the sun. Fast, safe, and fully compliant home & workplace charging solutions."
        breadcrumbs={[{ label: "Services", href: "/services" }, { label: "EV Charger" }]}
      />

      {/* Intro */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label">ELECTRIC VEHICLES</p>
              <h2 className="section-title">Convenient Charging at Your Doorstep</h2>
              <p className="text-pe-gray-500 leading-relaxed mb-6">
                Charging via a standard 10A wall plug is slow, often taking 24+ hours for a full charge. A dedicated Level 2 wall-mounted charger charges up to 10x faster, ensuring your vehicle is ready to go every morning.
              </p>
              
              <ul className="space-y-3 mb-8">
                {["Charge up to 10x faster than standard plugs", "Integate with solar system to charge on surplus solar", "Built-in safety features prevent switchboard overload", "Compatible with Tesla, BYD, MG, Hyundai, and more"].map((b, i) => (
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
                  <PlugZap size={24} className="text-pe-orange" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Smart Solar Charging</h3>
                  <p className="text-white/60 text-xs">Drive on Free Sunlight</p>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                If you have a home solar array, we can configure dynamic charging. Your EV will adjust its charging rate dynamically based on how much surplus solar power your system is generating — literally running your car on sunshine.
              </p>
              <Link href="/get-quote?interest=ev" className="btn-primary w-full justify-center">
                Request EV Charger Quote →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section-padding bg-pe-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Installation Process</h2>
            <p className="section-subtitle mx-auto">We manage the full connection cycle, switchboard upgrades, and network notifications.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {evSteps.map((s, i) => (
              <div key={i} className="card p-8 relative">
                <span className="text-5xl font-black font-mono text-pe-orange/20 absolute top-5 right-5">{s.step}</span>
                <h3 className="text-xl font-bold text-pe-navy mb-3 mt-4">{s.title}</h3>
                <p className="text-pe-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
