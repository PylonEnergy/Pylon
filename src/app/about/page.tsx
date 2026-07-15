import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { ShieldCheck, Leaf, HeartHandshake, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Pylon Energy",
  description:
    "Learn about Pylon Energy Pty Ltd — an Australian-owned solar company delivering premium solar panels, battery storage, and EV charging solutions across NSW.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Quality",
    desc: "We exclusively install Tier-1 solar panels and inverters — the highest quality components available in the Australian market.",
  },
  {
    icon: ShieldCheck,
    title: "Trust",
    desc: "Licensed Installers. All our work meets Australian Standards and is carried out by fully licensed, accredited installers.",
  },
  {
    icon: HeartHandshake,
    title: "Support",
    desc: "Ongoing monitoring, maintenance, and customer support. We build long-term relationships with our customers.",
  },
];

const stats = [
  { number: "25+", label: "Year Warranties" },
  { number: "100%", label: "Australian Owned" },
  { number: "5/5", label: "Customer Rating" },
  { number: "NSW", label: "Wide Service" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Pylon Energy"
        subtitle="Australia's trusted solar installation company, powering homes and businesses with clean, affordable energy."
        breadcrumbs={[{ label: "About Us" }]}
      />

      {/* Company Story */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label">OUR STORY</p>
              <h2 className="section-title">An Australian Company, Built for Australians</h2>
              <p className="text-pe-gray-500 leading-relaxed mb-5">
                Pylon Energy Pty Ltd is an Australian-owned solar company delivering high-performance solar panel systems, battery storage, and EV charging solutions to homes and businesses across NSW and beyond. Founded with a mission to make clean, affordable energy accessible to every Australian household.
              </p>
              <p className="text-pe-gray-500 leading-relaxed mb-6">
                We believe every Australian home deserves access to quality solar energy. That&apos;s why we offer flexible finance options, handle all rebate paperwork, and ensure every installation is completed to the highest standard by our accredited team.
              </p>
              <Link href="/get-quote" className="btn-primary">
                Get Your Free Quote <ArrowRight size={16} />
              </Link>
            </div>
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-5">
              {stats.map((s, i) => (
                <div key={i} className="bg-pe-gray-50 rounded-2xl p-7 border border-pe-gray-200 text-center">
                  <p className="text-4xl font-black text-pe-navy font-mono mb-1">{s.number}</p>
                  <p className="text-pe-gray-500 text-sm font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-pe-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label mx-auto justify-center">OUR VALUES</p>
            <h2 className="section-title">What We Stand For</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="card p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#E8F7FD] mx-auto flex items-center justify-center mb-5">
                  <v.icon size={28} className="text-pe-cyan" />
                </div>
                <h3 className="text-xl font-bold text-pe-gray-900 mb-3">{v.title}</h3>
                <p className="text-pe-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mx-auto justify-center">OUR TEAM</p>
          <h2 className="section-title">Licensed Installation Experts</h2>
          <p className="text-pe-gray-500 text-lg leading-relaxed">
            Our team of fully licensed installers brings decades of combined experience in solar energy system design and installation. From initial consultation through to commissioning and ongoing support, you&apos;re in safe hands every step of the way.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-pe-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to Go Solar?</h2>
          <p className="text-white/60 mb-8">Start saving with premium solar from Pylon Energy.</p>
          <Link href="/get-quote" className="btn-primary">
            Get Your Free Quote →
          </Link>
        </div>
      </section>
    </>
  );
}
