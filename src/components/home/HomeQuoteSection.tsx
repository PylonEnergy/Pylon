"use client";
import QuoteForm from "../QuoteForm";
import { CheckCircle2, ShieldAlert, Award, Sparkles } from "lucide-react";

export default function HomeQuoteSection() {
  return (
    <section id="quote-section" className="section-padding bg-pe-gray-50/80 border-t border-b border-pe-gray-200 relative overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pe-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pe-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Information / Value Proposition */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-pe-cyan bg-pe-cyan/10 border border-pe-cyan/20">
              <Sparkles size={12} className="animate-pulse" /> Get Started Today
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-black text-pe-navy leading-tight">
              Request a Free, <span className="text-[#29ABE2]">Tailored Solar Quote</span>
            </h2>
            
            <p className="text-pe-gray-600 leading-relaxed text-base">
              Submit your property details to receive a comprehensive solar assessment. Our expert engineering team will design a customized layout, forecast your energy production, and apply active 2026 STC government rebates upfront.
            </p>

            {/* Checklist of what's included */}
            <div className="space-y-4 pt-2">
              {[
                {
                  title: "Accredited Advisor Consult",
                  desc: "Obligation-free expert advice from Solar Accreditation Australia accredited solar professionals.",
                },
                {
                  title: "Upfront Government Rebates Applied",
                  desc: "We calculate and deduct up to $3,500 in STC rebate values directly from your system quote.",
                },
                {
                  title: "Customized ROI & Energy Performance",
                  desc: "Understand your payback timeline, estimated daily generation, and lifetime financial savings.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <CheckCircle2 size={20} className="text-pe-green flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-pe-navy text-sm sm:text-base leading-snug">{item.title}</h4>
                    <p className="text-pe-gray-500 text-xs sm:text-sm mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust badge icons */}
            <div className="pt-6 border-t border-pe-gray-200/60 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-white border border-pe-gray-200 flex items-center justify-center text-pe-cyan shadow-sm">
                  <Award size={20} />
                </div>
                <div>
                  <p className="text-xs font-black text-pe-navy leading-none uppercase tracking-wide">Licensed Installers</p>
                  <p className="text-[10px] text-pe-gray-400 mt-0.5">Local NSW Experts</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-white border border-pe-gray-200 flex items-center justify-center text-pe-cyan shadow-sm">
                  <ShieldAlert size={20} />
                </div>
                <div>
                  <p className="text-xs font-black text-pe-navy leading-none uppercase tracking-wide">25-Yr Warranties</p>
                  <p className="text-[10px] text-pe-gray-400 mt-0.5">Panel &amp; Inverter Protection</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl border border-pe-gray-200 p-6 sm:p-8 lg:p-10 shadow-2xl relative">
              {/* Highlight top border banner */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pe-navy via-[#29ABE2] to-pe-navy rounded-t-3xl" />
              
              <div className="mb-6">
                <h3 className="text-xl font-black text-pe-navy">Quick Quote Inquiry</h3>
                <p className="text-pe-gray-400 text-xs mt-1">Takes under 60 seconds · No credit card required</p>
              </div>

              <QuoteForm />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
