"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Zap, Award, Shield, Timer, ArrowRight } from "lucide-react";

const slides = [
  {
    badge: "NEW ENERGY SCHEME",
    title: "ZERO % INTEREST\n$0 UPFRONT FEES",
    subtitle: "HOME ENERGY SAVER LOAN",
    description: "Funded by NSW Government. Install premium solar + battery systems with interest-free financing and start saving immediately.",
    highlights: ["Limited-Time Offer", "Energy Security when you need it", "10-Year Warranty"],
    image: "/hero-battery.png",
    promoBadge: "FREE UPGRADE 10kW INVERTER",
    ctaText: "Apply For Zero % Interest →",
    ctaLink: "/get-quote?interest=battery",
  },
  {
    badge: "2026 GOVERNMENT SUB-SCHEME",
    title: "SAVE UP TO $3,500\nON NSW SOLAR INSTALLS",
    subtitle: "NSW CLEAN ENERGY INCENTIVE",
    description: "Secure premium Tier-1 solar panel packages with state government STC rebate incentives. Slash electricity bills by up to 90%.",
    highlights: ["CEC Approved Retailer", "25-Year Panel Warranty", "Zero Down Interest-Free Finance"],
    image: "/hero-panels.png",
    promoBadge: "NSW SUB-SCHEME ACTIVE",
    ctaText: "Check Rebate Eligibility →",
    ctaLink: "/get-quote?interest=residential",
  },
  {
    badge: "COMMERCIAL SOLAR DEALS",
    title: "SLASH YOUR BUSINESS\nPOWER BILLS BY 90%",
    subtitle: "INSTANT TAX WRITE-OFFS ACTIVE",
    description: "Custom solar grid layouts and high-performance commercial solar installations for offices, factories, and warehouses in NSW.",
    highlights: ["Instant ROI Forecast", "Free Engineering Site Study", "No Cap Custom Commercial Rebates"],
    image: "/hero-commercial.png",
    promoBadge: "FREE COMMERCIAL FEASIBILITY",
    ctaText: "Get Free Feasibility Study →",
    ctaLink: "/get-quote?interest=commercial",
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
      className="relative flex flex-col justify-center overflow-hidden bg-pe-navy"
      style={{
        background: "linear-gradient(135deg, #001229 0%, #002B5C 40%, #0D3572 70%, #001229 100%)",
      }}
    >
      {/* Grid overlay background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(41,171,226,1) 1px, transparent 1px), linear-gradient(90deg, rgba(41,171,226,1) 1px, transparent 1px)",
          backgroundSize: "55px 55px",
        }}
      />

      <div className="relative w-full">
        {/* Slider Frame */}
        <div className="relative overflow-hidden bg-[#001D3D]/95 border-b border-white/10 flex flex-col w-full">
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
                  <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight whitespace-pre-line">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-[#29ABE2] text-sm md:text-base font-extrabold tracking-wider uppercase">
                    {slide.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl">
                    {slide.description}
                  </p>

                  {/* Highlights list */}
                  <div className="flex flex-wrap gap-4 text-xs font-bold text-white/80">
                    {slide.highlights.map((h, i) => (
                      <span key={i} className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#29ABE2]" />
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Slide CTA Button */}
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <Link
                      href={slide.ctaLink}
                      className="inline-flex items-center justify-center font-black tracking-wider text-xs uppercase py-3.5 px-7 rounded-full shadow-lg transition-transform hover:scale-[1.02] text-white"
                      style={{
                        background: "linear-gradient(135deg, #FF7029, #E5601E)",
                        boxShadow: "0 8px 24px rgba(255, 112, 41, 0.35)",
                      }}
                    >
                      {slide.ctaText}
                    </Link>
                  </div>

                  {/* Slider Control pill inside info block */}
                  <div className="pt-2 flex items-center gap-3">
                    <div className="inline-flex items-center gap-4 bg-white/10 border border-white/10 px-4 py-2 rounded-full text-xs font-bold text-white select-none">
                      <button onClick={handlePrev} className="text-white/60 hover:text-white transition-colors" aria-label="Previous slide">
                        <ChevronLeft size={16} />
                      </button>
                      <span>
                        {currentSlide + 1} / {slides.length}
                      </span>
                      <button onClick={handleNext} className="text-white/60 hover:text-white transition-colors" aria-label="Next slide">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right side illustration - full bleed edge-to-edge inside the right column on desktop */}
                <div className="lg:col-span-5 relative hidden lg:block">
                  <div className="absolute inset-0">
                    <img
                      src={slide.image}
                      alt={slide.promoBadge}
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                    {/* Visual Promo Badge */}
                    <div className="absolute bottom-4 right-4 bg-pe-orange text-white text-[10px] font-black uppercase tracking-wider py-1.5 px-3.5 rounded-full shadow-lg flex items-center gap-1 border border-white/20 animate-pulse">
                      <Award size={12} />
                      {slide.promoBadge}
                    </div>
                  </div>
                </div>

                {/* Right side illustration - standard card style on mobile/tablet */}
                <div className="lg:hidden p-6 pt-0">
                  <div className="relative mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#001124] w-full max-w-[420px] aspect-[4/3] flex items-center justify-center">
                    <img
                      src={slide.image}
                      alt={slide.promoBadge}
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                    {/* Visual Promo Badge */}
                    <div className="absolute bottom-4 right-4 bg-pe-orange text-white text-[10px] font-black uppercase tracking-wider py-1.5 px-3.5 rounded-full shadow-lg flex items-center gap-1 border border-white/20">
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
              background: "linear-gradient(90deg, #001e3d 0%, #00529c 50%, #001e3d 100%)",
              borderTop: "3.5px solid #29ABE2",
              borderBottom: "2px solid #29ABE2",
              boxShadow: "0 0 30px rgba(41, 171, 226, 0.3)"
            }}
            className="px-4 sm:px-8 lg:px-12 xl:px-16 py-6.5 text-white w-full"
          >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-5">
              {/* Left section: Header */}
              <div className="text-center lg:text-left flex-shrink-0">
                <h4 className="font-black text-white text-base lg:text-lg uppercase tracking-wider leading-none">
                  Check For Battery Offers
                </h4>
                <p className="text-[#29ABE2] text-[11px] lg:text-xs mt-1.5 font-bold uppercase tracking-wider">
                  See local subsidies &amp; energy rebate offers in your postcode
                </p>
              </div>

              {/* Center section: Input list */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <span className="text-[#29ABE2] font-black text-xs sm:text-sm uppercase tracking-widest text-center sm:text-left">
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
                        border: "2.5px solid #29ABE2",
                        boxShadow: "0 0 10px rgba(41, 171, 226, 0.25)"
                      }}
                      className="w-12 h-12 md:w-13 md:h-13 text-center text-xl md:text-2xl font-black text-pe-navy rounded-xl focus:ring-4 focus:ring-[#29ABE2]/30 focus:border-[#29ABE2] focus:shadow-[0_0_20px_rgba(41, 171, 226, 0.5)] focus:outline-none transition-all bg-white"
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
