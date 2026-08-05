import PageHero from "@/components/PageHero";
import RebateChecker from "@/components/RebateChecker";
import SolarPackages from "@/components/home/SolarPackages";
import FAQSection from "@/components/FAQSection";
import Link from "next/link";
import { Zap, ShieldCheck, Award, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Panels & Battery Storage Sydney | Pylon Energy",
  description:
    "Top-rated CEC Approved solar panel & battery installer in Sydney NSW. Save up to $3,500 with STC government rebates. Free onsite solar feasibility study.",
};

export default function SolarSydneyPage() {
  return (
    <>
      <PageHero
        title="Solar Panels & Battery Storage Sydney"
        subtitle="Sydney's trusted Clean Energy Council Approved Solar & Battery Installer. Slash your electricity bills by up to 85%."
        breadcrumbs={[{ label: "Solar Sydney" }]}
      />

      {/* Local Sydney Stats & Trust Bar */}
      <section className="py-12 bg-white border-b border-pe-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-pe-gray-50 border border-pe-gray-200">
              <p className="text-3xl sm:text-4xl font-black text-pe-navy">4.2 Hrs</p>
              <p className="text-xs font-bold text-pe-gray-500 uppercase tracking-wider mt-1">Avg Daily Sun Hours in Sydney</p>
            </div>
            <div className="p-6 rounded-2xl bg-pe-gray-50 border border-pe-gray-200">
              <p className="text-3xl sm:text-4xl font-black text-pe-green">$3,450</p>
              <p className="text-xs font-bold text-pe-gray-500 uppercase tracking-wider mt-1">Max NSW STC Rebate Available</p>
            </div>
            <div className="p-6 rounded-2xl bg-pe-gray-50 border border-pe-gray-200">
              <p className="text-3xl sm:text-4xl font-black text-[#29ABE2]">25 Yrs</p>
              <p className="text-xs font-bold text-pe-gray-500 uppercase tracking-wider mt-1">Tier-1 Panel Performance Warranty</p>
            </div>
            <div className="p-6 rounded-2xl bg-pe-gray-50 border border-pe-gray-200">
              <p className="text-3xl sm:text-4xl font-black text-pe-navy">Ausgrid</p>
              <p className="text-xs font-bold text-pe-gray-500 uppercase tracking-wider mt-1">Grid Operator Integration</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rebate Checker */}
      <RebateChecker />

      {/* Packages */}
      <SolarPackages />

      {/* Why Sydney Homes Choose Pylon */}
      <section className="section-padding bg-pe-navy text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-label text-[#29ABE2]">Local Sydney Energy Experts</span>
            <h2 className="text-3xl sm:text-4xl font-black">Why Sydney Homeowners Choose Pylon Energy</h2>
            <p className="text-pe-gray-300 text-base mt-4">
              We design custom solar power systems specifically tuned to Sydney's coastal microclimates and network grid requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
              <MapPin className="text-[#29ABE2]" size={32} />
              <h3 className="text-xl font-bold">Local Sydney HQ & Technicians</h3>
              <p className="text-sm text-pe-gray-300">
                Our licensed installers and electrical teams live right here in Sydney, providing fast turnarounds and dedicated ongoing support.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
              <ShieldCheck className="text-pe-green" size={32} />
              <h3 className="text-xl font-bold">NSW Point-of-Sale STC Discounts</h3>
              <p className="text-sm text-pe-gray-300">
                We handle 100% of your government rebate paperwork and apply your STC discount directly up-front to lower your out-of-pocket cost.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
              <Award className="text-pe-orange" size={32} />
              <h3 className="text-xl font-bold">Tier-1 Micro-Inverter & Battery Systems</h3>
              <p className="text-sm text-pe-gray-300">
                We only install premium CEC-listed Tier-1 products (Jinko Solar, Tesla Powerwall, Sigenergy, Alpha ESS, Sungrow).
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/get-quote?location=Sydney" className="btn-primary py-4 px-8 text-base">
              Get Your Free Sydney Solar Quote →
            </Link>
          </div>
        </div>
      </section>

      <FAQSection />
    </>
  );
}
