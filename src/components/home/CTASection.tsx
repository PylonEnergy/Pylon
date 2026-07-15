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
    <section id="cta" className="relative overflow-hidden py-10 md:py-14">
      {/* Premium Deep Background Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #000B18 0%, #001733 30%, #00224D 70%, #000B18 100%)",
        }}
      />

      {/* Subtle Micro-Dot Matrix Texture */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,1) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Abstract Topographic contour wave lines */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.16]" 
        viewBox="0 0 1440 800" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)" }}
      >
        <defs>
          <linearGradient id="contourWave" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#29ABE2" stopOpacity="0.4" />
            <stop offset="40%" stopColor="#0D5DB5" stopOpacity="0.2" />
            <stop offset="80%" stopColor="#FF7029" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#29ABE2" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path d="M -100,150 Q 250,50 600,200 T 1300,100 T 1700,200" stroke="url(#contourWave)" strokeWidth="1.5" />
        <path d="M -100,210 Q 250,110 600,260 T 1300,160 T 1700,260" stroke="url(#contourWave)" strokeWidth="1.5" />
        <path d="M -100,270 Q 250,170 600,320 T 1300,220 T 1700,320" stroke="url(#contourWave)" strokeWidth="1.5" />
        <path d="M -100,330 Q 250,230 600,380 T 1300,280 T 1700,380" stroke="url(#contourWave)" strokeWidth="1.5" />
        <path d="M -100,390 Q 250,290 600,440 T 1300,340 T 1700,440" stroke="url(#contourWave)" strokeWidth="1.5" />
        <path d="M -100,450 Q 250,390 600,500 T 1300,400 T 1700,500" stroke="url(#contourWave)" strokeWidth="1.5" />
        <path d="M -100,510 Q 250,450 600,560 T 1300,460 T 1700,560" stroke="url(#contourWave)" strokeWidth="1.5" />
        <path d="M -100,570 Q 250,510 600,620 T 1300,520 T 1700,620" stroke="url(#contourWave)" strokeWidth="1.5" />
      </svg>

      {/* Glowing Solar Flare Orbs */}
      {/* Cyan energy flare (left) */}
      <div
        className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full opacity-[0.15] pointer-events-none blur-[80px]"
        style={{ background: "radial-gradient(circle, #29ABE2 0%, transparent 70%)" }}
      />
      {/* Solar orange flare (right behind form) */}
      <div
        className="absolute bottom-[-100px] right-[-50px] w-[600px] h-[600px] rounded-full opacity-[0.14] pointer-events-none blur-[90px]"
        style={{ background: "radial-gradient(circle, #FF7029 0%, transparent 70%)" }}
      />
      {/* Royal blue ambient flare (center) */}
      <div
        className="absolute top-[20%] left-[40%] w-[450px] h-[450px] rounded-full opacity-[0.12] pointer-events-none blur-[80px]"
        style={{ background: "radial-gradient(circle, #0D5DB5 0%, transparent 75%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 xl:gap-20 items-center">

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
