import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Sun, Battery, PlugZap, Headphones, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Solar & Energy Services | Pylon Energy",
  description: "Explore our range of clean energy services including residential solar panel systems, commercial solar installations, home solar batteries, and EV charger installations.",
};

const services = [
  {
    icon: Sun,
    title: "Residential Solar",
    desc: "Reduce your household energy bills by up to 80% with our high-efficiency solar systems designed for Australian homes.",
    href: "/services/residential-solar",
    benefits: ["Tier-1 solar panels", "CEC accredited installations", "Gov rebate calculations included", "Flexible $0-down payment plans"]
  },
  {
    icon: Battery,
    title: "Solar Batteries",
    desc: "Maximise your energy independence. Store excess daytime solar energy to power your home through the night and during blackouts.",
    href: "/services/solar-batteries",
    benefits: ["Premium battery brands", "Blackout backup power", "Increased self-consumption", "10-year battery warranties"]
  },
  {
    icon: PlugZap,
    title: "EV Charger Installation",
    desc: "Charge your electric vehicle faster and safer at home or work. Certified Level 2 EV charging solutions tailored to your vehicle.",
    href: "/services/ev-charger",
    benefits: ["Certified installer team", "Compatible with all leading EVs", "Smart charging schedule support", "Safe, compliant installations"]
  },
  {
    icon: Headphones,
    title: "Commercial Solar Solutions",
    desc: "Reduce operational overheads, secure predictable power rates, and improve your brand sustainability credentials.",
    href: "/services/commercial-solar",
    benefits: ["Custom engineered designs", "Commercial financial models", "Asset management & maintenance", "Rapid payback periods"]
  }
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Clean Energy Services"
        subtitle="Discover how we can help you transition to sustainable energy, lower your utility bills, and gain power independence."
        breadcrumbs={[{ label: "Services" }]}
      />

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((s, i) => (
              <div key={i} className="card p-8 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#E8F7FD] flex items-center justify-center mb-6">
                    <s.icon size={26} className="text-pe-cyan" />
                  </div>
                  <h2 className="text-2xl font-bold text-pe-navy mb-3">{s.title}</h2>
                  <p className="text-pe-gray-500 text-sm leading-relaxed mb-6">{s.desc}</p>
                  
                  <ul className="space-y-2 mb-8">
                    {s.benefits.map((b, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-pe-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-pe-cyan" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link href={s.href} className="btn-secondary w-full justify-center mt-auto">
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-pe-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black mb-4">Unsure Which Option Suits You?</h2>
          <p className="text-white/60 mb-8">Our clean energy consultants will analyse your usage and guide you to the perfect package.</p>
          <Link href="/get-quote" className="btn-primary">
            Speak to a Solar Advisor →
          </Link>
        </div>
      </section>
    </>
  );
}
