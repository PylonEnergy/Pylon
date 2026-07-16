"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Menu, X, ChevronDown, ArrowRight, Zap, X as Close } from "lucide-react";

const solarPackagesMenu = {
  residential: [
    { label: "5kW Solar System", href: "/solar-packages#5kw" },
    { label: "6.6kW Solar System", href: "/solar-packages#6-6kw" },
    { label: "8kW Solar System", href: "/solar-packages#8kw" },
    { label: "10kW Solar System", href: "/solar-packages#10kw" },
    { label: "13kW Solar System", href: "/solar-packages#13kw" },
  ],
  solarBattery: [
    { label: "6.6kW + Battery", href: "/solar-packages#6-6kw-battery", badge: "Popular" },
    { label: "8kW + Battery", href: "/solar-packages#8kw-battery" },
    { label: "10kW + Battery", href: "/solar-packages#10kw-battery", badge: "Popular" },
    { label: "13kW + Battery", href: "/solar-packages#13kw-battery" },
  ],
  commercial: [
    { label: "15kW Commercial", href: "/services/commercial-solar#15kw" },
    { label: "20kW Commercial", href: "/services/commercial-solar#20kw" },
    { label: "30kW Commercial", href: "/services/commercial-solar#30kw" },
    { label: "50kW Commercial", href: "/services/commercial-solar#50kw" },
    { label: "100kW+ Custom", href: "/services/commercial-solar#100kw", badge: "Enterprise" },
  ],
};

const batteriesMenu = {
  systems: [
    { label: "5kWh Battery System", href: "/services/solar-batteries#5kwh" },
    { label: "10kWh Battery System", href: "/services/solar-batteries#10kwh" },
    { label: "15kWh Battery System", href: "/services/solar-batteries#15kwh" },
    { label: "20kWh Battery System", href: "/services/solar-batteries#20kwh" },
  ],
  brands: [
    { label: "Tesla Powerwall", href: "/services/solar-batteries#tesla" },
    { label: "Sungrow Battery", href: "/services/solar-batteries#sungrow" },
    { label: "Alpha ESS", href: "/services/solar-batteries#alpha-ess" },
    { label: "Growatt Battery", href: "/services/solar-batteries#growatt" },
    { label: "Enphase Battery", href: "/services/solar-batteries#enphase" },
    { label: "GoodWe Battery", href: "/services/solar-batteries#goodwe" },
  ],
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePackagesOpen, setMobilePackagesOpen] = useState(false);
  const [mobileBatteriesOpen, setMobileBatteriesOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(false);
  const [announcementMessage, setAnnouncementMessage] = useState("");
  const [announcementLink, setAnnouncementLink] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });

    async function fetchBannerSettings() {
      try {
        const res = await fetch("http://localhost:4000/api/settings");
        if (res.ok) {
          const data = await res.json();
          const s = data.settings;
          if (s && s.bannerVisible && s.bannerMessage) {
            setAnnouncementVisible(true);
            setAnnouncementMessage(s.bannerMessage);
            setAnnouncementLink(s.bannerLink || "");
          }
        }
      } catch (err) {
        console.error("Failed to load header promo settings:", err);
      }
    }
    fetchBannerSettings();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ANNOUNCEMENT BAR */}
      {announcementVisible && announcementMessage && (
        <div
          className="relative text-white text-sm py-2.5 px-4 text-center font-semibold animate-fade-in"
          style={{ background: "linear-gradient(90deg, #002B5C 0%, #0D5DB5 50%, #002B5C 100%)" }}
        >
          <span className="inline-flex items-center gap-2">
            <Zap size={14} className="text-[#29ABE2] flex-shrink-0" />
            <span>
              {announcementMessage}{" "}
              {announcementLink && (
                <Link href={announcementLink} className="underline underline-offset-2 hover:text-[#29ABE2] transition-colors">
                  Claim Now →
                </Link>
              )}
            </span>
          </span>
          <button
            onClick={() => setAnnouncementVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            aria-label="Close announcement"
          >
            <X size={24} />
          </button>
        </div>
      )}

      {/* STICKY TWO-TIER HEADER */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 w-full ${
          scrolled
            ? "shadow-[0_4px_30px_rgba(0,43,92,0.12)] bg-white/95 backdrop-blur-md"
            : "bg-white"
        }`}
      >
        <div className="relative w-full border-b border-pe-gray-100">
                   {/* DIAGONAL-CUT LOGO CONTAINER — spans both top bar and main header */}
          <div 
            style={{ 
              clipPath: "polygon(0 0, calc(100% - 40px) 0, 100% 44px, 100% 100%, 0 100%)" 
            }}
            className="absolute left-0 top-0 bottom-0 w-[240px] sm:w-[320px] md:w-[350px] lg:w-[380px] xl:w-[450px] bg-white flex items-center pl-3 sm:pl-6 lg:pl-8 z-20"
          >
            <Link href="/" className="flex items-center group">
              <svg viewBox="0 0 380 60" className="h-9 sm:h-12 md:h-13 lg:h-14 xl:h-[68px] w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <mask id="arrow-mask-header">
                    <rect width="360" height="60" fill="white" />
                    <path d="M4 50 L20 34 L26 40 L44 22" stroke="black" strokeWidth="6" fill="none" strokeLinecap="square" strokeLinejoin="miter" />
                    <polygon points="35,16 48,16 48,29" fill="black" />
                  </mask>
                </defs>
                
                {/* Navy P with hole, cut by arrow */}
                <path d="M6 12 h18 c6.6 0 12 5.4 12 12 s-5.4 12 -12 12 H12 v12 H6 V12 Z M12 18 v12 h12 c3.3 0 6 -2.7 6 -6 s-2.7 -6 -6 -6 H12 Z" fill="#002B5C" fillRule="evenodd" mask="url(#arrow-mask-header)" />
                
                {/* Cyan E horizontal bars, cut by arrow */}
                <path d="M12 32 h22 L28 38 H12 Z" fill="#29ABE2" mask="url(#arrow-mask-header)" />
                <path d="M12 42 h30 L36 48 H12 Z" fill="#29ABE2" mask="url(#arrow-mask-header)" />
                
                {/* Orange Arrow */}
                <path d="M4 50 L20 34 L26 40 L44 22" stroke="#FF7029" strokeWidth="3.5" fill="none" strokeLinecap="square" strokeLinejoin="miter" />
                <polygon points="37,18 46,18 46,27" fill="#FF7029" />
                
                {/* Orange Sunburst Flares */}
                <path d="M34 10 L30 6 M42 8 L42 2 M50 10 L54 6 M52 18 L58 18 M50 26 L54 30" stroke="#FF7029" strokeWidth="3.5" strokeLinecap="butt" />
                
                {/* Text: PYLON ENERGY on one line */}
                <text x="68" y="42" fontSize="32" fontWeight="800" fontFamily="var(--font-sans), system-ui, sans-serif" letterSpacing="0.02em">
                  <tspan fill="#002B5C">PYLON</tspan>
                  <tspan fill="#29ABE2"> ENERGY</tspan>
                </text>
              </svg>
            </Link>
          </div>

          {/* TOP BAR (navy bg) - slants on the left side */}
          <div 
            style={{ 
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 40px 100%)"
            }}
            className="bg-[#002B5C] h-11 flex items-center justify-end px-4 sm:px-8 lg:px-12 xl:px-16 text-white text-sm z-10 ml-[140px] sm:ml-[280px] md:ml-[310px] lg:ml-[340px] xl:ml-[410px] transition-all duration-300"
          >
            <style>{`
              @keyframes pulse-orange {
                0% {
                  box-shadow: 0 0 0 0 rgba(255, 112, 41, 0.6);
                }
                70% {
                  box-shadow: 0 0 0 8px rgba(255, 112, 41, 0);
                }
                100% {
                  box-shadow: 0 0 0 0 rgba(255, 112, 41, 0);
                }
              }
              .glow-pulse {
                animation: pulse-orange 2s infinite;
              }
            `}</style>
            <div className="flex items-center gap-6 font-semibold">
              <Link href="/get-quote" className="hidden sm:flex hover:underline items-center gap-1.5">
                Make A Payment <ArrowRight size={13} className="text-[#29ABE2]" />
              </Link>
              <a href="mailto:info@pylonenergy.com.au" className="hover:underline flex items-center gap-2 hidden sm:flex">
                <span className="w-7 h-7 rounded-full bg-[#FFE8D6] glow-pulse flex items-center justify-center flex-shrink-0">
                  <Mail size={13} className="text-[#002B5C]" />
                </span>
                info@pylonenergy.com.au
              </a>
              <a href="tel:1300001598" className="hover:underline flex xl:hidden items-center gap-2 font-black text-[16px] text-white">
                <span className="w-7 h-7 rounded-full bg-[#FFE8D6] glow-pulse flex items-center justify-center flex-shrink-0">
                  <Phone size={13} className="text-[#002B5C]" />
                </span>
                1300 001 598
              </a>
            </div>
          </div>

          {/* MAIN HEADER (bottom bar, white bg) */}
          <div className="h-20 bg-white">
            <div className="h-full pl-[240px] sm:pl-[320px] md:pl-[350px] lg:pl-[380px] xl:pl-[450px] pr-4 sm:pr-8 lg:pr-12 xl:pr-16 flex items-center justify-between relative" style={{ position: "static" }}>
              
              {/* DESKTOP NAV */}
              <nav className="hidden xl:flex items-center justify-between flex-grow mx-2 2xl:mx-8" style={{ position: "static" }}>
                <Link
                  href="/"
                  className="relative px-2 xl:px-3 2xl:px-4 py-2 text-[13px] xl:text-[14px] 2xl:text-[16px] font-bold text-pe-gray-700 hover:text-pe-navy transition-all whitespace-nowrap group"
                >
                  Home
                  <span className="absolute bottom-0.5 left-2 xl:left-3 2xl:left-4 right-2 xl:right-3 2xl:right-4 h-[2.5px] bg-[#29ABE2] transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
                </Link>

                {/* SOLAR PACKAGES MEGA */}
                <div className="mega-menu-trigger" style={{ position: "static" }}>
                  <button className="relative flex items-center gap-1 px-2 xl:px-3 2xl:px-4 py-2 text-[13px] xl:text-[14px] 2xl:text-[16px] font-bold text-pe-gray-700 hover:text-pe-navy transition-all whitespace-nowrap group">
                    Solar Packages <ChevronDown size={17} className="transition-transform group-hover:rotate-180 duration-200" />
                    <span className="absolute bottom-0.5 left-2 xl:left-3 2xl:left-4 right-[28px] h-[2.5px] bg-[#29ABE2] transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
                  </button>
                  <div className="mega-menu-panel" style={{ left: 0, right: 0, width: "100%", transform: "translateY(8px)" }}>
                    <div className="grid grid-cols-3 gap-12">
                      {/* Residential */}
                      <div>
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#29ABE2] mb-4.5 flex items-center gap-2">
                          Residential
                          <span className="flex-1 h-px bg-pe-gray-200" />
                        </p>
                        {solarPackagesMenu.residential.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-pe-gray-600 text-[15px] font-semibold hover:bg-pe-gray-50 hover:text-pe-navy transition-all group"
                          >
                            <span className="w-8 h-8 rounded-xl bg-pe-orange-light flex items-center justify-center text-pe-orange text-sm flex-shrink-0 group-hover:bg-pe-orange group-hover:text-white transition-all">
                              ⚡
                            </span>
                            {item.label}
                          </Link>
                        ))}
                      </div>
                      {/* Solar + Battery */}
                      <div>
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#29ABE2] mb-4.5 flex items-center gap-2">
                          Solar + Battery
                          <span className="flex-1 h-px bg-pe-gray-200" />
                        </p>
                        {solarPackagesMenu.solarBattery.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-pe-gray-600 text-[15px] font-semibold hover:bg-pe-gray-50 hover:text-pe-navy transition-all group"
                          >
                            <span className="w-8 h-8 rounded-xl bg-pe-orange-light flex items-center justify-center text-pe-orange text-sm flex-shrink-0 group-hover:bg-pe-orange group-hover:text-white transition-all">
                              🔋
                            </span>
                            <span className="flex-1">{item.label}</span>
                            {item.badge && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pe-orange-light text-pe-orange border border-pe-orange/20">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                      {/* Commercial */}
                      <div>
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#29ABE2] mb-4.5 flex items-center gap-2">
                          Commercial
                          <span className="flex-1 h-px bg-pe-gray-200" />
                        </p>
                        {solarPackagesMenu.commercial.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-pe-gray-600 text-[15px] font-semibold hover:bg-pe-gray-50 hover:text-pe-navy transition-all group"
                          >
                            <span className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-pe-blue text-sm flex-shrink-0 group-hover:bg-pe-blue group-hover:text-white transition-all">
                              🏭
                            </span>
                            <span className="flex-1">{item.label}</span>
                            {item.badge && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-pe-blue border border-blue-200">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                    {/* Promo card */}
                    <div className="mt-6 pt-5 border-t border-pe-gray-100 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-pe-green animate-pulse" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-pe-green">
                            2026 Rebates Active
                          </span>
                        </div>
                        <p className="text-pe-gray-600 text-sm mt-0.5">
                          Save up to <strong className="text-pe-orange">$3,500</strong> on your solar installation
                        </p>
                      </div>
                      <Link href="/get-quote" className="btn-primary text-sm py-2.5 px-5">
                        Check My Savings →
                      </Link>
                    </div>
                  </div>
                </div>

                {/* SOLAR BATTERIES MEGA */}
                <div className="mega-menu-trigger" style={{ position: "static" }}>
                  <button className="relative flex items-center gap-1 px-2 xl:px-3 2xl:px-4 py-2 text-[13px] xl:text-[14px] 2xl:text-[16px] font-bold text-pe-gray-700 hover:text-pe-navy transition-all whitespace-nowrap group">
                    Solar Batteries <ChevronDown size={17} className="transition-transform group-hover:rotate-180 duration-200" />
                    <span className="absolute bottom-0.5 left-2 xl:left-3 2xl:left-4 right-[28px] h-[2.5px] bg-[#29ABE2] transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
                  </button>
                  <div className="mega-menu-panel" style={{ left: 0, right: 0, width: "100%", transform: "translateY(8px)" }}>
                    <div className="grid grid-cols-2 gap-12">
                      <div>
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#29ABE2] mb-4.5 flex items-center gap-2">
                          Battery Systems
                          <span className="flex-1 h-px bg-pe-gray-200" />
                        </p>
                        {batteriesMenu.systems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-pe-gray-600 text-[15px] font-semibold hover:bg-pe-gray-50 hover:text-pe-navy transition-all group"
                          >
                            <span className="w-8 h-8 rounded-xl bg-pe-orange-light flex items-center justify-center text-pe-orange text-sm flex-shrink-0 group-hover:bg-pe-orange group-hover:text-white transition-all">
                              🔋
                            </span>
                            {item.label}
                          </Link>
                        ))}
                      </div>
                      <div>
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#29ABE2] mb-4.5 flex items-center gap-2">
                          By Brand
                          <span className="flex-1 h-px bg-pe-gray-200" />
                        </p>
                        {batteriesMenu.brands.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-pe-gray-600 text-[15px] font-semibold hover:bg-pe-gray-50 hover:text-pe-navy transition-all group"
                          >
                            <span className="w-2 h-2 rounded-full bg-[#29ABE2]/30 group-hover:bg-[#29ABE2] transition-colors" />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  href="/products"
                  className="relative px-2 xl:px-3 2xl:px-4 py-2 text-[13px] xl:text-[14px] 2xl:text-[16px] font-bold text-pe-gray-700 hover:text-pe-navy transition-all whitespace-nowrap group"
                >
                  Products
                  <span className="absolute bottom-0.5 left-2 xl:left-3 2xl:left-4 right-2 xl:right-3 2xl:right-4 h-[2.5px] bg-[#29ABE2] transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
                </Link>

                <Link
                  href="/rebate-checker"
                  className="relative px-2 xl:px-3 2xl:px-4 py-2 text-[13px] xl:text-[14px] 2xl:text-[16px] font-bold text-pe-gray-700 hover:text-pe-navy transition-all whitespace-nowrap group"
                >
                  Rebate Checker
                  <span className="absolute bottom-0.5 left-2 xl:left-3 2xl:left-4 right-2 xl:right-3 2xl:right-4 h-[2.5px] bg-[#29ABE2] transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
                </Link>

                <Link
                  href="/special-offers"
                  className="relative px-2 xl:px-3 2xl:px-4 py-2 text-[13px] xl:text-[14px] 2xl:text-[16px] font-bold text-pe-cyan transition-all flex items-center gap-1 whitespace-nowrap group"
                >
                  Special Offers
                  <span className="absolute bottom-0.5 left-2 xl:left-3 2xl:left-4 right-2 xl:right-3 2xl:right-4 h-[2.5px] bg-pe-cyan transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
                </Link>
              </nav>

              {/* CTA + MOBILE TOGGLE */}
              <div className="flex items-center gap-3">
                <a 
                  href="tel:1300001598" 
                  className="hidden xl:flex items-center gap-1.5 border border-[#002B5C] text-[#002B5C] hover:bg-[#002B5C] hover:text-white font-bold py-2 px-3.5 rounded-lg transition-all text-sm whitespace-nowrap"
                >
                  <Phone size={13} /> Call 1300 001 598
                </a>
                <Link 
                  href="/get-quote" 
                  className="bg-gradient-to-r from-[#FF7029] to-[#E5601E] hover:from-[#E5601E] hover:to-[#C84E12] text-white font-bold py-2.5 px-5.5 rounded-lg shadow-[0_4px_12px_rgba(255,112,41,0.25)] hover:shadow-[0_6px_18px_rgba(255,112,41,0.4)] transition-all text-sm flex items-center gap-2 whitespace-nowrap hidden sm:flex hover:-translate-y-0.5"
                >
                  Get A Quote →
                </Link>
                <button
                  onClick={() => setMobileOpen(true)}
                  className="xl:hidden p-2 rounded-lg text-pe-gray-700 hover:bg-pe-gray-100 transition-colors"
                  aria-label="Open menu"
                >
                  <Menu size={22} />
                </button>
              </div>

            </div>
          </div>

        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] xl:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-pe-gray-200">
              <svg viewBox="0 0 380 60" className="h-10 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <mask id="arrow-mask-mobile">
                    <rect width="360" height="60" fill="white" />
                    <path d="M4 50 L20 34 L26 40 L44 22" stroke="black" strokeWidth="6" fill="none" strokeLinecap="square" strokeLinejoin="miter" />
                    <polygon points="35,16 48,16 48,29" fill="black" />
                  </mask>
                </defs>
                
                {/* Navy P with hole, cut by arrow */}
                <path d="M6 12 h18 c6.6 0 12 5.4 12 12 s-5.4 12 -12 12 H12 v12 H6 V12 Z M12 18 v12 h12 c3.3 0 6 -2.7 6 -6 s-2.7 -6 -6 -6 H12 Z" fill="#002B5C" fillRule="evenodd" mask="url(#arrow-mask-mobile)" />
                
                {/* Cyan E horizontal bars, cut by arrow */}
                <path d="M12 32 h22 L28 38 H12 Z" fill="#29ABE2" mask="url(#arrow-mask-mobile)" />
                <path d="M12 42 h30 L36 48 H12 Z" fill="#29ABE2" mask="url(#arrow-mask-mobile)" />
                
                {/* Orange Arrow */}
                <path d="M4 50 L20 34 L26 40 L44 22" stroke="#FF7029" strokeWidth="3.5" fill="none" strokeLinecap="square" strokeLinejoin="miter" />
                <polygon points="37,18 46,18 46,27" fill="#FF7029" />
                
                {/* Orange Sunburst Flares */}
                <path d="M34 10 L30 6 M42 8 L42 2 M50 10 L54 6 M52 18 L58 18 M50 26 L54 30" stroke="#FF7029" strokeWidth="3.5" strokeLinecap="butt" />
                
                {/* Text: PYLON ENERGY on one line */}
                <text x="68" y="42" fontSize="32" fontWeight="800" fontFamily="var(--font-sans), system-ui, sans-serif" letterSpacing="0.02em">
                  <tspan fill="#002B5C">PYLON</tspan>
                  <tspan fill="#29ABE2"> ENERGY</tspan>
                </text>
              </svg>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg text-pe-gray-500 hover:bg-pe-gray-100"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-1">
              <Link href="/" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-pe-gray-700 font-semibold rounded-xl hover:bg-pe-gray-50">
                🏠 Home
              </Link>
              <Link href="/about" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-pe-gray-700 font-semibold rounded-xl hover:bg-pe-gray-50">
                About Us
              </Link>
              {/* Mobile Packages */}
              <div>
                <button
                  onClick={() => setMobilePackagesOpen(!mobilePackagesOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-pe-gray-700 font-semibold rounded-xl hover:bg-pe-gray-50"
                >
                  Solar Packages
                  <ChevronDown size={24} className={`transition-transform ${mobilePackagesOpen ? "rotate-180" : ""}`} />
                </button>
                {mobilePackagesOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {[...solarPackagesMenu.residential, ...solarPackagesMenu.solarBattery, ...solarPackagesMenu.commercial].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-2 text-sm text-pe-gray-600 rounded-lg hover:bg-pe-gray-50"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {/* Mobile Batteries */}
              <div>
                <button
                  onClick={() => setMobileBatteriesOpen(!mobileBatteriesOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-pe-gray-700 font-semibold rounded-xl hover:bg-pe-gray-50"
                >
                  Solar Batteries
                  <ChevronDown size={24} className={`transition-transform ${mobileBatteriesOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileBatteriesOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {[...batteriesMenu.systems, ...batteriesMenu.brands].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-2 text-sm text-pe-gray-600 rounded-lg hover:bg-pe-gray-50"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/products" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-pe-gray-700 font-semibold rounded-xl hover:bg-pe-gray-50">
                Products
              </Link>
              <Link href="/portfolio" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-pe-gray-700 font-semibold rounded-xl hover:bg-pe-gray-50">
                Portfolio
              </Link>
              <Link href="/rebate-checker" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-pe-gray-700 font-semibold rounded-xl hover:bg-pe-gray-50">
                Rebate Checker
              </Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-pe-gray-700 font-semibold rounded-xl hover:bg-pe-gray-50">
                Contact Us
              </Link>
              <Link href="/special-offers" onClick={() => setMobileOpen(false)} className="block px-4 py-3 font-bold rounded-xl bg-orange-50 text-pe-orange hover:bg-pe-orange hover:text-white transition-colors">
                🔥 Special Offers
              </Link>
            </div>
            <div className="p-4 border-t border-pe-gray-200 space-y-3">
              <a href="tel:1300001598" className="flex items-center gap-2 text-pe-navy font-semibold">
                <Phone size={24} /> 1300 001 598
              </a>
              <Link href="/get-quote" onClick={() => setMobileOpen(false)} className="btn-primary w-full justify-center">
                Get A Free Quote →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
