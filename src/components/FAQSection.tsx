"use client";
import { useState } from "react";
import { Plus, X } from "lucide-react";

const faqs = [
  {
    q: "Why should I choose Pylon Energy over other solar companies?",
    a: "Pylon Energy is a certified Solar Accreditation Australia Retailer, delivering premium Tier-1 solar packages with local service and 25-year warranties. We prioritize transparent pricing, custom system engineering, and lifetime monitoring support.",
  },
  {
    q: "How do I know which solar system is right for my home or business?",
    a: "Our experienced solar consultants will assess your energy usage, roof space, budget, and long-term goals. Based on this, we provide clear, honest recommendations on the best products and system size to suit your specific needs — ensuring maximum efficiency and savings.",
  },
  {
    q: "Is Pylon Energy an approved solar retailer in Australia?",
    a: "Yes, Pylon Energy is a fully certified Solar Accreditation Australia (CEC) Approved Retailer. This guarantees that we adhere to the highest standards of safety, quality, and consumer protection in Australia.",
  },
  {
    q: "What government solar rebates are available in NSW in 2026?",
    a: "The Small-scale Technology Certificates (STC) rebate is active, offering up to $3,500 in upfront savings. We calculate your eligible rebates and apply them as an immediate discount on your quote, managing all the paperwork for you.",
  },
  {
    q: "How long does the solar panel installation process take?",
    a: "For standard residential homes, the installation is completed in just 1 day. Commercial installations range from 2 to 5 days depending on scale. We coordinate all grid connection applications and smart meter upgrades so your system starts saving immediately.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(1); // Default to item 2 open to match screenshot

  return (
    <section id="faq" className="section-padding bg-[#F8FAFC] relative overflow-hidden border-t border-slate-100">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,43,92,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,43,92,1) 1px, transparent 1px)",
          backgroundSize: "55px 55px",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-[#29ABE2] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#29ABE2]" />
            See Our FAQs
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-pe-navy leading-[1.1] tracking-tight">
            Frequently <br />
            <span className="font-serif italic font-normal text-[#29ABE2] lowercase">asked</span> Questions
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className={`group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border ${
                  isOpen
                    ? "bg-[#002B5C] border-[#002B5C] shadow-[0_15px_35px_rgba(0,43,92,0.15)]"
                    : "bg-white border-slate-100 hover:border-[#29ABE2] hover:shadow-[0_10px_25px_rgba(0,43,92,0.06)]"
                }`}
              >
                {/* Header Row */}
                <div className="flex items-center justify-between gap-4 px-6 sm:px-8 py-6 relative">
                  {/* Giant Watermark behind */}
                  {isOpen && (
                    <span
                      className="absolute right-16 top-1/2 -translate-y-1/2 font-black italic text-8xl leading-none select-none pointer-events-none opacity-[0.07] text-white"
                      style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}

                  <div className="flex items-center gap-4 sm:gap-6 flex-1 z-10">
                    {/* Index Number */}
                    <span
                      className={`text-sm sm:text-base italic font-semibold flex-shrink-0 transition-colors duration-300 ${
                        isOpen ? "text-[#29ABE2]" : "text-[#002B5C]/40"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* Question Text */}
                    <span
                      className={`font-bold text-base sm:text-lg leading-snug transition-colors duration-300 ${
                        isOpen ? "text-white" : "text-[#002B5C]"
                      }`}
                    >
                      {faq.q}
                    </span>
                  </div>

                  {/* Plus/Close Button Icon */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 border ${
                      isOpen
                        ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                        : "bg-white border-[#002B5C]/15 text-[#002B5C] group-hover:border-[#29ABE2] group-hover:text-[#29ABE2]"
                    }`}
                  >
                    {isOpen ? <X size={15} /> : <Plus size={15} />}
                  </div>
                </div>

                {/* Answer Panel */}
                <div
                  className="transition-all duration-300 ease-in-out overflow-hidden"
                  style={{
                    maxHeight: isOpen ? "500px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="px-6 sm:px-8 pb-7 pt-1 text-sm sm:text-base leading-relaxed text-white/80 max-w-3xl ml-8 sm:ml-12 z-10 relative">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
