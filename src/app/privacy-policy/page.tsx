import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy | Pylon Energy",
  description: "Read our privacy guidelines. We protect your personal client data and lead details under the Privacy Act 1988.",
};

export default function PrivacyPolicy() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        subtitle="This statement explains how Pylon Energy manages your personal information."
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />

      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate">
          <p className="text-pe-gray-400 text-xs mb-8">Last Updated: July 2026</p>

          <h2 className="text-xl font-bold text-pe-navy mt-6 mb-3">1. Information We Collect</h2>
          <p className="text-pe-gray-600 text-sm leading-relaxed mb-6">
            We collect personal details such as your name, email address, phone number, and installation postcode to generate solar packages estimates. This data is collected when you enter inputs into postcode bars or contact query forms.
          </p>

          <h2 className="text-xl font-bold text-pe-navy mt-6 mb-3">2. How We Use Your Information</h2>
          <p className="text-pe-gray-600 text-sm leading-relaxed mb-6">
            Your details are used solely to assess site viability, calculate government STC rebates, and issue product performance comparisons. We do not sell your personal lead records to external third-party brokers.
          </p>

          <h2 className="text-xl font-bold text-pe-navy mt-6 mb-3">3. Data Security</h2>
          <p className="text-pe-gray-600 text-sm leading-relaxed mb-6">
            All submitted entries are stored securely in our MongoDB cluster. We employ standard transport layered encryption (HTTPS) protocols to protect database transmissions.
          </p>

          <h2 className="text-xl font-bold text-pe-navy mt-6 mb-3">4. Cookies and Analytics</h2>
          <p className="text-pe-gray-600 text-sm leading-relaxed mb-6">
            We use basic analytical tracking metrics to evaluate visitor trends. No individual behavioral user profiling is conducted.
          </p>

          <h2 className="text-xl font-bold text-pe-navy mt-6 mb-3">5. Your Rights (Australian Privacy Act 1988)</h2>
          <p className="text-pe-gray-600 text-sm leading-relaxed mb-6">
            Under the Australian Privacy Principles, you maintain the right to view, correct, or request deletion of any personal files we hold. Contact privacy@pylonenergy.com.au for privacy queries.
          </p>
        </div>
      </section>
    </>
  );
}
