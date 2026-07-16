"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Zap, Award, Shield, Timer, ArrowRight } from "lucide-react";

const slides = [
  {
    badge: "WELCOME TO PYLON ENERGY PTY LTD",
    title: "Power Your Home with\nPremium Pylon Solar",
    subtitle: "2026 SPECIAL LAUNCH PRICE",
    description: "Save up to 80% on electricity bills with Pylon Energy's high-efficiency Tier-1 solar panel systems and smart battery storage configurations. Fully customized for Sydney and NSW homes.",
    highlights: ["Sydney HQ & Support", "Licensed CEC Installers", "25-Year Product Warranty"],
    image: "/hero-battery.png",
    promoBadge: "2026 REBATES ACTIVE",
    ctaText: "Get Your Free Quote →",
    ctaLink: "/get-quote",
    secondaryCtaText: "View Packages",
    secondaryCtaLink: "#packages",
    gradient: "from-[#29ABE2] to-[#0D5DB5]",
  },
  {
    badge: "2026 GOVERNMENT SUB-SCHEME",
    title: "Save Up To $3,500\nWith Pylon Rebates",
    subtitle: "NSW CLEAN ENERGY INCENTIVE",
    description: "Lock in your Small-scale Technology Certificates (STCs) government rebates with Pylon Energy. We manage all eligibility approval and discount paperwork directly at point-of-sale.",
    highlights: ["Point-of-Sale Discounts", "Rebate Approvals Handled", "Affordable Finance From $0 Down"],
    image: "/hero-panels.png",
    promoBadge: "NSW SUB-SCHEME ACTIVE",
    ctaText: "Check Rebate Eligibility →",
    ctaLink: "/get-quote?interest=residential",
    secondaryCtaText: "Check Rebates",
    secondaryCtaLink: "/rebate-checker",
    gradient: "from-[#29ABE2] to-[#1A8CBD]",
  },
  {
    badge: "COMMERCIAL SOLAR DEALS",
    title: "Slash Business Power Bills\nWith Pylon Commercial",
    subtitle: "TAX WRITE-OFF & REBATES ACTIVE",
    description: "Optimise your corporate overheads with Pylon Energy's high-yield commercial solar grids. Full engineering designs, solar feasibility studies, and flexible business finance options.",
    highlights: ["Free Engineering Studies", "100% Tax Write-Off Eligible", "No-Cap Business Rebates"],
    image: "/hero-commercial.png",
    promoBadge: "FREE COMMERCIAL FEASIBILITY",
    ctaText: "Get Free Feasibility Study →",
    ctaLink: "/get-quote?interest=commercial",
    secondaryCtaText: "Commercial Solar",
    secondaryCtaLink: "/services/commercial-solar",
    gradient: "from-[#FF7029] to-[#E5601E]",
  },
];

export default function HeroBanner() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-advance slideshow every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Postcode Checker logic inside the hero overlay
  const handlePostcodeInput = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    e.target.value = val ? val[val.length - 1]! : "";
    if (val && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
    // Auto submit once 4th box is filled
    if (val && index === 3) {
      setTimeout(() => handleSubmitPostcode(), 100);
    }
  };

  const handlePostcodeKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePostcodePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    digits.split("").forEach((d, i) => {
      if (inputsRef.current[i]) inputsRef.current[i]!.value = d;
    });
    const nextFocusIndex = Math.min(digits.length, 3);
    inputsRef.current[nextFocusIndex]?.focus();
    if (digits.length === 4) {
      setTimeout(() => handleSubmitPostcode(), 100);
    }
  };

  const handleSubmitPostcode = () => {
    const postcode = inputsRef.current.map((el) => el?.value ?? "").join("");
    if (postcode.length === 4) {
      const codeNum = parseInt(postcode, 10);
      if (codeNum >= 2000 && codeNum <= 2999) {
        router.push(`/services/residential-solar?state=NSW&postcode=${postcode}`);
      } else {
        router.push(`/get-quote?postcode=${postcode}`);
      }
    } else {
      inputsRef.current.find((el) => !el?.value)?.focus();
    }
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col justify-center overflow-hidden bg-white"
      style={{
        background: "linear-gradient(135deg, #FFFFFF 0%, #F5F9FD 60%, #E8F4FC 100%)",
      }}
    >
      {/* Grid overlay background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,43,92,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,43,92,0.1) 1px, transparent 1px)",
          backgroundSize: "55px 55px",
        }}
      />

      <div className="relative w-full">
        {/* Slider Frame */}
        <div className="relative overflow-hidden bg-transparent border-b border-slate-100 flex flex-col w-full">
          {/* Slider Track */}
          <div
            className="flex transition-transform duration-500 ease-in-out flex-1"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0 grid lg:grid-cols-12 items-stretch">
                {/* Left side content */}
                <div className="lg:col-span-7 px-4 sm:px-8 lg:pl-12 lg:pr-12 xl:pl-16 xl:pr-16 py-8 md:py-12 lg:py-16 space-y-5 text-left flex flex-col justify-center">
                  {/* Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#29ABE2] bg-[#29ABE2]/10 border border-[#29ABE2]/20 self-start">
                    <Zap size={10} />
                    {slide.badge}
                  </span>

                  {/* Title */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-pe-navy leading-[1.1] tracking-tight whitespace-pre-line">
                    {slide.title.split("\n")[0]}
                    {slide.title.split("\n")[1] && (
                      <span className={`block mt-1.5 bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent`}>
                        {slide.title.split("\n")[1]}
                      </span>
                    )}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-[#29ABE2] text-sm md:text-base font-extrabold tracking-wider uppercase">
                    {slide.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-pe-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
                    {slide.description}
                  </p>

                  {/* Highlights list */}
                  <div className="flex flex-wrap gap-4 text-xs font-bold text-pe-navy/80">
                    {slide.highlights.map((h, i) => (
                      <span key={i} className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 rounded-full px-3 py-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#29ABE2]" />
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Slide CTA Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <Link
                      href={slide.ctaLink}
                      className="inline-flex items-center justify-center font-black tracking-wider text-xs uppercase py-3.5 px-7 rounded-full shadow-lg transition-all hover:scale-[1.02] text-white"
                      style={{
                        background: "gradient" in slide && slide.gradient.includes("FF7029") ? "linear-gradient(135deg, #002B5C, #001A3A)" : "linear-gradient(135deg, #FF7029, #E5601E)",
                        boxShadow: "gradient" in slide && slide.gradient.includes("FF7029") ? "0 8px 24px rgba(0, 43, 92, 0.35)" : "0 8px 24px rgba(255, 112, 41, 0.35)",
                      }}
                    >
                      {slide.ctaText}
                    </Link>
                    {slide.secondaryCtaText && (
                      <Link
                        href={slide.secondaryCtaLink || "#"}
                        className="inline-flex items-center justify-center font-black tracking-wider text-xs uppercase py-3 px-7 rounded-full border-2 border-pe-navy text-pe-navy hover:bg-pe-navy hover:text-white transition-all hover:scale-[1.02] bg-white/20 backdrop-blur-sm"
                      >
                        {slide.secondaryCtaText}
                      </Link>
                    )}
                  </div>

                  {/* Slider Control pill inside info block */}
                  <div className="pt-2 flex items-center gap-3">
                    <div className="inline-flex items-center gap-4 bg-slate-100 border border-slate-200 px-4 py-2 rounded-full text-xs font-bold text-pe-navy select-none">
                      <button onClick={handlePrev} className="text-pe-navy/60 hover:text-pe-navy transition-colors" aria-label="Previous slide">
                        <ChevronLeft size={16} />
                      </button>
                      <span>
                        {currentSlide + 1} / {slides.length}
                      </span>
                      <button onClick={handleNext} className="text-pe-navy/60 hover:text-pe-navy transition-colors" aria-label="Next slide">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right side illustration - full bleed edge-to-edge inside the right column on desktop */}
                <div className="lg:col-span-5 relative hidden lg:block overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    {/* Backing glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(41,171,226,0.18)_0%,_transparent_65%)] pointer-events-none" />
                    
                    <img
                      src={slide.image}
                      alt={slide.promoBadge}
                      className="w-full h-full object-contain opacity-95 animate-float select-none pointer-events-none"
                    />
                    
                    {/* Visual Promo Badge */}
                    <div className="absolute bottom-6 right-6 bg-pe-orange text-white text-[10px] font-black uppercase tracking-wider py-1.5 px-3.5 rounded-full shadow-lg flex items-center gap-1 border border-white/20 animate-pulse z-10">
                      <Award size={12} />
                      {slide.promoBadge}
                    </div>
                  </div>
                </div>

                {/* Right side illustration - standard card style on mobile/tablet */}
                <div className="lg:hidden p-6 pt-0">
                  <div className="relative mx-auto rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-[#F8FAFC] w-full max-w-[420px] aspect-[4/3] flex items-center justify-center">
                    {/* Backing glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(41,171,226,0.12)_0%,_transparent_60%)] pointer-events-none" />
                    
                    <img
                      src={slide.image}
                      alt={slide.promoBadge}
                      className="w-full h-full object-contain p-6 opacity-95 animate-float select-none pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />

                    {/* Visual Promo Badge */}
                    <div className="absolute bottom-4 right-4 bg-pe-orange text-white text-[10px] font-black uppercase tracking-wider py-1.5 px-3.5 rounded-full shadow-lg flex items-center gap-1 border border-white/20 z-10">
                      <Award size={12} />
                      {slide.promoBadge}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Postcode Checker Strip at the bottom of the Slider Frame */}
          <div 
            style={{ 
              background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)",
              borderTop: "3.5px solid #29ABE2",
              borderBottom: "1px solid #E2E8F0",
              boxShadow: "0 10px 40px rgba(0, 43, 92, 0.06)"
            }}
            className="px-4 sm:px-8 lg:px-12 xl:px-16 py-6.5 text-pe-navy w-full"
          >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-5">
              {/* Left section: Header */}
              <div className="text-center lg:text-left flex-shrink-0">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-[#FF7029] bg-[#FFF0E5] border border-[#FF7029]/20 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7029] animate-ping" />
                  Live Update
                </div>
                <h4 className="font-black text-pe-navy text-base lg:text-lg uppercase tracking-wider leading-none">
                  Check For Battery Offers
                </h4>
                <p className="text-[#29ABE2] text-[11px] lg:text-xs mt-1.5 font-bold uppercase tracking-wider">
                  See local subsidies &amp; energy rebate offers in your postcode
                </p>
              </div>

              {/* Center section: Input list */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <span className="text-pe-navy font-black text-xs sm:text-sm uppercase tracking-widest text-center sm:text-left">
                  Enter Your Postcode!
                </span>
                <div className="flex gap-2">
                  {[0, 1, 2, 3].map((idx) => (
                    <input
                      key={idx}
                      ref={(el) => { inputsRef.current[idx] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      placeholder="0"
                      onChange={(e) => handlePostcodeInput(idx, e)}
                      onKeyDown={(e) => handlePostcodeKeyDown(idx, e)}
                      onPaste={handlePostcodePaste}
                      style={{
                        border: "2px solid #CBD5E1",
                      }}
                      className="w-12 h-12 md:w-13 md:h-13 text-center text-xl md:text-2xl font-black text-pe-navy rounded-xl focus:ring-4 focus:ring-[#29ABE2]/30 focus:border-[#29ABE2] focus:shadow-[0_0_20px_rgba(41, 171, 226, 0.3)] focus:outline-none transition-all bg-white"
                    />
                  ))}
                </div>
              </div>

              {/* Right section: Submit button */}
              <button
                onClick={handleSubmitPostcode}
                style={{
                  background: "linear-gradient(135deg, #FF7029 0%, #E5601E 100%)",
                  boxShadow: "0 6px 20px rgba(255, 112, 41, 0.4)",
                  border: "1.5px solid rgba(255, 112, 41, 0.5)"
                }}
                className="px-8 py-4.5 text-white font-black rounded-xl hover:scale-[1.04] active:scale-[0.98] hover:shadow-[0_8px_25px_rgba(255, 112, 41, 0.6)] transition-all text-xs sm:text-sm uppercase tracking-widest whitespace-nowrap shadow-md flex items-center justify-center gap-2"
              >
                Enter Postcode for Special Offer!
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
