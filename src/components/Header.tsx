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
              clipPath: "polygon(0 0, 100% 0, calc(100% - 40px) 100%, 0 100%)" 
            }}
            className="absolute left-0 top-0 bottom-0 w-[220px] sm:w-[270px] md:w-[310px] xl:w-[360px] bg-white flex items-center pl-3 sm:pl-6 lg:pl-8 z-20"
          >
            <Link href="/" className="flex items-center group">
              <Image
                src="/pylon-logo.png"
                alt="Pylon Energy"
                width={230}
                height={75}
                priority
                className="h-11 sm:h-13 md:h-15 xl:h-18 w-auto object-contain rounded-xl transition-opacity group-hover:opacity-90"
              />
            </Link>
          </div>

          {/* TOP BAR (navy bg) - slants on the left side */}
          <div 
            style={{ 
              clipPath: "polygon(40px 0, 100% 0, 100% 100%, 0 100%)"
            }}
            className="bg-[#002B5C] h-11 flex items-center justify-end px-4 sm:px-8 lg:px-12 xl:px-16 text-white text-xs z-10 ml-[180px] sm:ml-[230px] md:ml-[270px] xl:ml-[320px] transition-all duration-300"
          >
            <div className="flex items-center gap-6 font-semibold">
              <Link href="/get-quote" className="hover:underline flex items-center gap-1.5">
                Make A Payment <ArrowRight size={11} className="text-[#29ABE2]" />
              </Link>
              <a href="mailto:info@pylonenergy.com.au" className="hover:underline flex items-center gap-2 hidden sm:flex">
                <span className="w-5.5 h-5.5 rounded-full bg-white/10 flex items-center justify-center">
                  <Mail size={11} className="text-[#29ABE2]" />
                </span>
                info@pylonenergy.com.au
              </a>
              <a href="tel:1300000000" className="hover:underline flex items-center gap-2 font-black text-sm text-white">
                <span className="w-5.5 h-5.5 rounded-full bg-[#29ABE2]/20 flex items-center justify-center">
                  <Phone size={11} className="text-[#29ABE2]" />
                </span>
                1300 000 000
              </a>
            </div>
          </div>

          {/* MAIN HEADER (bottom bar, white bg) */}
          <div className="h-20 bg-white">
            <div className="h-full pl-[220px] sm:pl-[270px] md:pl-[310px] xl:pl-[360px] pr-4 sm:pr-8 lg:pr-12 xl:pr-16 flex items-center justify-between relative" style={{ position: "static" }}>
              
              {/* DESKTOP NAV */}
              <nav className="hidden lg:flex items-center justify-between flex-grow mx-4 xl:mx-8" style={{ position: "static" }}>
                <Link
                  href="/"
                  className="px-3 xl:px-4 py-2 text-[20px] xl:text-[23px] font-bold text-pe-gray-700 hover:text-pe-navy rounded-lg hover:bg-pe-gray-50 transition-all whitespace-nowrap"
                >
                  Home
                </Link>

                {/* SOLAR PACKAGES MEGA */}
                <div className="mega-menu-trigger" style={{ position: "static" }}>
                  <button className="flex items-center gap-1 px-3 xl:px-4 py-2 text-[20px] xl:text-[23px] font-bold text-pe-gray-700 hover:text-pe-navy rounded-lg hover:bg-pe-gray-50 transition-all whitespace-nowrap">
                    Solar Packages <ChevronDown size={19} />
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
                  <button className="flex items-center gap-1 px-3 xl:px-4 py-2 text-[20px] xl:text-[23px] font-bold text-pe-gray-700 hover:text-pe-navy rounded-lg hover:bg-pe-gray-50 transition-all whitespace-nowrap">
                    Solar Batteries <ChevronDown size={19} />
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
                  className="px-3 xl:px-4 py-2 text-[20px] xl:text-[23px] font-bold text-pe-gray-700 hover:text-pe-navy rounded-lg hover:bg-pe-gray-50 transition-all whitespace-nowrap"
                >
                  Products
                </Link>

                <Link
                  href="/rebate-checker"
                  className="px-3 xl:px-4 py-2 text-[20px] xl:text-[23px] font-bold text-pe-gray-700 hover:text-pe-navy rounded-lg hover:bg-pe-gray-50 transition-all whitespace-nowrap"
                >
                  Rebate Checker
                </Link>

                <Link
                  href="/special-offers"
                  className="px-3 xl:px-4 py-2 text-[20px] xl:text-[23px] font-bold text-pe-cyan hover:text-white hover:bg-pe-cyan rounded-lg transition-all flex items-center gap-1 whitespace-nowrap"
                >
                  Special Offers
                </Link>
              </nav>

              {/* CTA + MOBILE TOGGLE */}
              <div className="flex items-center gap-3">
                <Link 
                  href="/get-quote" 
                  className="bg-[#002B5C] hover:bg-[#001F42] text-white font-bold py-2.5 px-6 rounded-lg shadow-sm hover:shadow transition-all text-sm flex items-center gap-2 whitespace-nowrap hidden sm:flex"
                >
                  Get A Quote →
                </Link>
                <button
                  onClick={() => setMobileOpen(true)}
                  className="lg:hidden p-2 rounded-lg text-pe-gray-700 hover:bg-pe-gray-100 transition-colors"
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
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-pe-gray-200">
              <Image
                src="/pylon-logo.png"
                alt="Pylon Energy"
                width={160}
                height={52}
                className="h-12 w-auto object-contain"
              />
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
              <a href="tel:1300000000" className="flex items-center gap-2 text-pe-navy font-semibold">
                <Phone size={24} /> 1300 000 000
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
