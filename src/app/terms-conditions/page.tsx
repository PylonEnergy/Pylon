import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms & Conditions | Pylon Energy",
  description: "Review legal terms, system quotation guidelines, workmanship warranties, and installation agreements.",
};

export default function TermsConditions() {
  return (
    <>
      <PageHero
        title="Terms &amp; Conditions"
        subtitle="Please review our engineering agreements, quotation policies, and warranty definitions."
        breadcrumbs={[{ label: "Terms & Conditions" }]}
      />

      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate">
          <p className="text-pe-gray-400 text-xs mb-8">Last Updated: July 2026</p>

          <h2 className="text-xl font-bold text-pe-navy mt-6 mb-3">1. Scope of Agreement</h2>
          <p className="text-pe-gray-600 text-sm leading-relaxed mb-6">
            Pylon Energy agrees to design, supply, and install solar panel configurations, battery storages, and EV chargers in accordance with Solar Accreditation Australia guidelines.
          </p>

          <h2 className="text-xl font-bold text-pe-navy mt-6 mb-3">2. Quotation and Pricing Policies</h2>
          <p className="text-pe-gray-600 text-sm leading-relaxed mb-6">
            Quotations remain valid for exactly 30 calendar days from the date of issue. System pricing estimates include GST and state rebate calculations, assuming standard roof access conditions.
          </p>

          <h2 className="text-xl font-bold text-pe-navy mt-6 mb-3">3. Workmanship Warranties</h2>
          <p className="text-pe-gray-600 text-sm leading-relaxed mb-6">
            We provide a 5-year workmanship warranty covering system installation integrity. Individual component warranties (e.g., 25-year panel performance, 10-year battery warranty) are backed directly by the respective manufacturers.
          </p>

          <h2 className="text-xl font-bold text-pe-navy mt-6 mb-3">4. Installation and Grid Connection</h2>
          <p className="text-pe-gray-600 text-sm leading-relaxed mb-6">
            Installations are completed by fully licensed electricians. The customer is responsible for obtaining any necessary landlord approvals, though we manage all connection approval paperwork with your Distributed Network Service Provider (DNSP).
          </p>
        </div>
      </section>
    </>
  );
}
