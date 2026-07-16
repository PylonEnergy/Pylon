"use client";

import { useSearchParams } from "next/navigation";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import { Check } from "lucide-react";
import { Suspense } from "react";

function QuotePageContent() {
  const searchParams = useSearchParams();
  const postcode = searchParams.get("postcode") ?? "";
  const interestParam = searchParams.get("interest") ?? "";
  const bill = searchParams.get("bill") ?? "";
  const system = searchParams.get("system") ?? "";
  const battery = searchParams.get("battery") ?? "";

  // Map incoming interest slug to QuoteForm select values
  let mappedInterest = "residential";
  if (interestParam === "solar-battery" || interestParam === "battery") {
    mappedInterest = "battery";
  } else if (interestParam === "commercial") {
    mappedInterest = "commercial";
  } else if (interestParam === "ev" || interestParam === "ev-charger") {
    mappedInterest = "ev";
  }

  // Construct default message from calculator if info exists
  let defaultMessage = "";
  if (bill && system) {
    defaultMessage = `Calculated details from Solar Savings Calculator:\n- Recommended System Size: ${system}\n- Current Quarterly Bill: $${bill}\n- Includes Battery: ${battery === "yes" ? "Yes" : "No"}`;
  }

  return (
    <div className="grid lg:grid-cols-12 gap-12 items-start">
      {/* Left Info Column */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <p className="section-label">THE ESTIMATION PROCESS</p>
          <h2 className="text-3xl font-black text-pe-navy leading-tight mb-4">
            What Happens Next?
          </h2>
          <p className="text-pe-gray-500 leading-relaxed">
            After submitting your request, a certified Pylon Energy solar consultant will evaluate your rooftop configuration using regional satellite mapping.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-pe-gray-200">
          {[
            "Free, no-obligation performance audit",
            "Estimated annual savings and payback analysis",
            "Government STC rebate calculations included",
            "Custom panel layout draft map"
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-pe-green-light flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={12} className="text-pe-green" />
              </div>
              <p className="text-pe-gray-700 text-sm font-medium">{item}</p>
            </div>
          ))}
        </div>

        <div className="p-5 rounded-2xl bg-pe-gray-50 border border-pe-gray-200">
          <p className="font-bold text-pe-navy text-sm mb-1">Looking for immediate assistance?</p>
          <p className="text-pe-gray-500 text-xs leading-relaxed mb-3">Call our support desk during business hours to speak to a specialist instantly.</p>
          <a href="tel:1300001598" className="font-mono font-bold text-pe-cyan">1300 001 598</a>
        </div>
      </div>

      {/* Right Form Column */}
      <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-pe-gray-200 shadow-sm p-8">
        <QuoteForm
          defaultPostcode={postcode}
          defaultInterest={mappedInterest}
          defaultMessage={defaultMessage}
        />
      </div>
    </div>
  );
}

export default function GetQuote() {
  return (
    <>
      <PageHero
        title="Request a Free Solar Quote"
        subtitle="Provide your contact details and energy requirements to receive a customized solar performance estimation."
        breadcrumbs={[{ label: "Get Quote" }]}
      />

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={
            <div className="text-center py-20 text-pe-gray-500">Loading quote estimator...</div>
          }>
            <QuotePageContent />
          </Suspense>
        </div>
      </section>
    </>
  );
}
