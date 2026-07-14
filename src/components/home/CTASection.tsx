"use client";
import Link from "next/link";
import { CheckCircle2, Phone, Zap, ArrowRight } from "lucide-react";

const perks = [
  "Get Your Free Quote — No Obligation",
  "We Handle Everything — Paperwork, Rebates & Install",
  "Start Saving in as Little as 2 Weeks",
  "Interest-Free Finance Available",
];

export default function CTASection() {
  return (
    <section id="cta" className="relative overflow-hidden py-16 md:py-24">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #001229 0%, #002B5C 40%, #0D3572 70%, #001229 100%)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(41,171,226,1) 1px, transparent 1px), linear-gradient(90deg, rgba(41,171,226,1) 1px, transparent 1px)",
          backgroundSize: "55px 55px",
        }}
      />

      {/* Glow orbs */}
      <div
        className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full opacity-[0.08] pointer-events-none"
        style={{ background: "radial-gradient(circle, #29ABE2, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-80px] left-[-60px] w-[350px] h-[350px] rounded-full opacity-[0.08] pointer-events-none"
        style={{ background: "radial-gradient(circle, #29ABE2, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left: Copy */}
          <div>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-7 text-xs font-bold uppercase tracking-[0.18em]"
              style={{
                background: "rgba(41,171,226,0.12)",
                border: "1px solid rgba(41,171,226,0.3)",
                color: "#29ABE2",
              }}
            >
              <Zap size={12} className="text-[#29ABE2]" />
              2026 Rebates Are Now Active
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-white leading-[1.1] tracking-tight mb-5">
              Ready to Start{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #29ABE2, #6DD5FA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Saving?
              </span>
            </h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              Join 500+ NSW households who&apos;ve switched to Pylon Energy. Get your personalised quote with zero obligation in under 60 seconds.
            </p>

            {/* Checklist */}
            <div className="space-y-3">
              {perks.map((perk, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-md bg-[#29ABE2] flex items-center justify-center flex-shrink-0">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-white/80 text-sm font-medium">{perk}</span>
                </div>
              ))}
            </div>

            {/* Phone */}
            <div className="mt-8 flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(41,171,226,0.15)", border: "1px solid rgba(41,171,226,0.3)" }}
              >
                <Phone size={18} className="text-[#29ABE2]" />
              </div>
              <div>
                <p className="text-white/50 text-xs">Prefer to call? We&apos;re available Mon–Fri 8am–6pm</p>
                <a href="tel:1300000000" className="text-white font-bold font-mono hover:text-[#29ABE2] transition-colors">
                  1300 000 000
                </a>
              </div>
            </div>
          </div>

          {/* Right: Quick form card */}
          <div>
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="p-5 sm:p-8">
                <h3 className="text-white text-xl font-black mb-1">Get Your Free Quote</h3>
                <p className="text-white/50 text-sm mb-6">No spam. No pressure. Just savings.</p>

                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1.5px solid rgba(255,255,255,0.15)",
                      color: "white",
                      outline: "none",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#29ABE2")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    className="w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1.5px solid rgba(255,255,255,0.15)",
                      color: "white",
                      outline: "none",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#29ABE2")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                  />
                  <select
                    className="w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1.5px solid rgba(255,255,255,0.15)",
                      color: "rgba(255,255,255,0.7)",
                      outline: "none",
                    }}
                  >
                    <option value="" style={{ background: "#002B5C" }}>Quarterly Bill Range</option>
                    <option value="u300" style={{ background: "#002B5C" }}>Under $300</option>
                    <option value="300-600" style={{ background: "#002B5C" }}>$300 – $600</option>
                    <option value="600-1000" style={{ background: "#002B5C" }}>$600 – $1,000</option>
                    <option value="o1000" style={{ background: "#002B5C" }}>Over $1,000</option>
                  </select>
                  <Link
                    href="/get-quote"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white text-sm transition-all hover:-translate-y-0.5"
                    style={{
                      background: "linear-gradient(135deg, #29ABE2, #0D5DB5)",
                      boxShadow: "0 8px 25px rgba(41,171,226,0.35)",
                    }}
                  >
                    Get My Free Quote <ArrowRight size={16} />
                  </Link>
                </form>

                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-5 pt-5 border-t border-white/10">
                  {["✓ 100% Free", "✓ No Obligation", "✓ Reply in 2hrs"].map((t) => (
                    <span key={t} className="text-white/40 text-xs font-medium">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
