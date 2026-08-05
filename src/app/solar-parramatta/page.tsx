import PageHero from "@/components/PageHero";
import RebateChecker from "@/components/RebateChecker";
import SolarPackages from "@/components/home/SolarPackages";
import FAQSection from "@/components/FAQSection";
import Link from "next/link";
import { Zap, ShieldCheck, Award, MapPin, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Panels & Battery Storage Parramatta | Pylon Energy",
  description:
    "Leading CEC Approved solar panel & battery installer in Parramatta & Western Sydney NSW. Claim up to $3,450 in STC government rebates.",
};

export default function SolarParramattaPage() {
  return (
    <>
      <PageHero
        title="Solar Panels & Battery Storage Parramatta"
        subtitle="Western Sydney's trusted solar & battery installation experts. Maximise your solar production with CEC Approved Technicians."
        breadcrumbs={[{ label: "Solar Parramatta" }]}
      />

      {/* Local Parramatta Stats Bar */}
      <section className="py-12 bg-white border-b border-pe-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-pe-gray-50 border border-pe-gray-200">
              <p className="text-3xl sm:text-4xl font-black text-pe-navy">4.4 Hrs</p>
              <p className="text-xs font-bold text-pe-gray-500 uppercase tracking-wider mt-1">Avg Daily Sun Hours in Parramatta</p>
            </div>
            <div className="p-6 rounded-2xl bg-pe-gray-50 border border-pe-gray-200">
              <p className="text-3xl sm:text-4xl font-black text-pe-green">$3,450</p>
              <p className="text-xs font-bold text-pe-gray-500 uppercase tracking-wider mt-1">STC Government Rebate</p>
            </div>
            <div className="p-6 rounded-2xl bg-pe-gray-50 border border-pe-gray-200">
              <p className="text-3xl sm:text-4xl font-black text-[#29ABE2]">Endeavour</p>
              <p className="text-xs font-bold text-pe-gray-500 uppercase tracking-wider mt-1">Grid Distributor Approved</p>
            </div>
            <div className="p-6 rounded-2xl bg-pe-gray-50 border border-pe-gray-200">
              <p className="text-3xl sm:text-4xl font-black text-pe-navy">$2,400</p>
              <p className="text-xs font-bold text-pe-gray-500 uppercase tracking-wider mt-1">Avg Annual Bill Savings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rebate Checker */}
      <RebateChecker />

      {/* Packages */}
      <SolarPackages />

      <FAQSection />
    </>
  );
}
