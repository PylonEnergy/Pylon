import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import RebateChecker from "@/components/RebateChecker";

export const metadata: Metadata = {
  title: "Solar Rebate Eligibility Checker | Pylon Energy",
  description:
    "Check your eligibility for 2026 government solar rebates and battery incentives in NSW, VIC, and QLD. Take our 60-second quiz to claim your rebate.",
};

export default function RebateCheckerPage() {
  return (
    <>
      <PageHero
        title="Government Rebate Checker"
        subtitle="Check your eligibility for federal and state solar & battery storage rebates in under 60 seconds."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Rebate Checker" }]}
      />

      <section className="py-16 bg-pe-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Checker Card */}
            <div className="lg:col-span-7">
              <RebateChecker />
            </div>

            {/* Info Panel */}
            <div className="lg:col-span-5 space-y-6 bg-white p-8 rounded-2xl border border-pe-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-pe-navy">About 2026 Government Rebates</h3>
              <p className="text-pe-gray-600 text-sm leading-relaxed">
                The Australian Federal Government and state governments offer various incentives to accelerate the adoption of clean energy. These incentives can significantly lower the upfront cost of your solar panels and battery storage.
              </p>

              <div className="space-y-4 pt-4 border-t border-pe-gray-100">
                <div>
                  <h4 className="text-sm font-bold text-pe-navy mb-1">1. Small-scale Technology Certificates (STCs)</h4>
                  <p className="text-xs text-pe-gray-500 leading-relaxed">
                    A federal scheme available to all Australian households and small businesses. The rebate value is applied directly as a discount on your quote, reducing costs by up to $3,500.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-pe-navy mb-1">2. NSW Peak Demand Reduction Scheme (PDRS)</h4>
                  <p className="text-xs text-pe-gray-500 leading-relaxed">
                    NSW residents who install or upgrade to an eligible battery system can receive up to $1,400 under this state incentive.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-pe-navy mb-1">3. Solar Homes Program (VIC) & Battery Booster (QLD)</h4>
                  <p className="text-xs text-pe-gray-500 leading-relaxed">
                    Victoria and Queensland offer additional state-specific interest-free loans and battery incentives worth up to $3,000 for qualifying households.
                  </p>
                </div>
              </div>

              <div className="bg-[#E8F7FD] p-4 rounded-xl border border-[#29ABE2]/20 mt-6">
                <p className="text-xs text-pe-cyan font-semibold">
                  ⚠️ Note: Rebate caps are reviewed periodically and reduce each year on January 1st. Lock in your rate by applying today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
