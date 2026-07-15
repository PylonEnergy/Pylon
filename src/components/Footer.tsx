import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-pe-navy text-white">
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5 hover:opacity-90 transition-opacity">
              <svg viewBox="0 0 285 60" className="h-14 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Monogram P (White stem, Solar Sunburst loop) */}
                <rect x="8" y="16" width="4.5" height="28" fill="#FFFFFF" rx="1.5" />
                <circle cx="18" cy="22" r="6" stroke="#FF7029" strokeWidth="3" fill="none" />
                <path d="M23 17l2-2 M24 22h3 M23 27l2 2" stroke="#FF7029" strokeWidth="2" strokeLinecap="round" />
                
                {/* Monogram E (Cyan Battery Cell) */}
                <rect x="24" y="16" width="4.5" height="28" fill="#29ABE2" rx="1.5" />
                <rect x="28.5" y="16" width="11" height="4" fill="#29ABE2" rx="1" />
                <rect x="28.5" y="28" width="8" height="4" fill="#29ABE2" rx="1" />
                <rect x="28.5" y="40" width="11" height="4" fill="#29ABE2" rx="1" />
                {/* Battery outer bracket & terminal tip */}
                <path d="M35 16h4v28h-4" stroke="#29ABE2" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <rect x="39" y="26" width="2.5" height="8" rx="1" fill="#29ABE2" />
                
                {/* Rising Increment Trend Line Arrow Slicing Through Monogram */}
                <path d="M10 38 L19 29 L25 33 L38 18" stroke="#FF7029" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M28 18 h10 v10" stroke="#FF7029" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* PYLON Text (white, using site brand font variable) */}
                <text x="56" y="42" fill="#FFFFFF" fontSize="30" fontWeight="900" fontFamily="var(--font-sans), system-ui, sans-serif" letterSpacing="0.03em">PYLON</text>
                {/* ENERGY Text (cyan) */}
                <text x="166" y="42" fill="#29ABE2" fontSize="30" fontWeight="500" fontFamily="var(--font-sans), system-ui, sans-serif" letterSpacing="0.03em">ENERGY</text>
              </svg>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Australian-owned solar company delivering premium solar panels, battery storage &amp; EV charging solutions across NSW and beyond. SAA Accredited Retailer.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#29ABE2] hover:text-white transition-all"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#29ABE2] hover:text-white transition-all"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#29ABE2] hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#29ABE2] hover:text-white transition-all"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.555A3.002 3.002 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.858.555 9.388.555 9.388.555s7.53 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
            
            {/* Accreditation Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="relative h-11 px-3 bg-white rounded-lg border border-white/20 flex items-center justify-center shadow-sm">
                <img
                  src="/netcc-approved.png"
                  alt="NETCC Approved Seller"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div className="h-11 px-3 bg-white/5 border border-white/10 rounded-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white leading-none">SAA Accredited</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-white/40 mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Solar Packages", href: "/solar-packages" },
                { label: "Solar Batteries", href: "/services/solar-batteries" },
                { label: "Our Products", href: "/products" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Get A Quote", href: "/get-quote" },
                { label: "Contact Us", href: "/contact" },
                { label: "Blog", href: "/blog" },
              ].map((item, idx) => (
                <li key={`${item.href}-${idx}`}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-white text-sm transition-colors hover:translate-x-1 inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#29ABE2] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Our Services */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-white/40 mb-5">Our Services</h3>
            <ul className="space-y-3">
              {[
                { label: "Residential Solar", href: "/services/residential-solar" },
                { label: "Commercial Solar", href: "/services/commercial-solar" },
                { label: "Solar Batteries", href: "/services/solar-batteries" },
                { label: "EV Charger Installation", href: "/services/ev-charger" },
                { label: "5kW Solar System", href: "/solar-packages#5kw" },
                { label: "10kW Solar System", href: "/solar-packages#10kw" },
                { label: "13kW Solar System", href: "/solar-packages#13kw" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-white text-sm transition-colors hover:translate-x-1 inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#29ABE2] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-white/40 mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:1300000000" className="flex items-start gap-3 text-white/60 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#29ABE2] transition-colors mt-0.5">
                    <Phone size={14} />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-white/40 mb-0.5">Phone</p>
                    <p className="font-semibold font-mono text-white">1300 000 000</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:info@pylonenergy.com.au" className="flex items-start gap-3 text-white/60 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#29ABE2] transition-colors mt-0.5">
                    <Mail size={14} />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-white/40 mb-0.5">Email</p>
                    <p className="font-semibold text-white">info@pylonenergy.com.au</p>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={14} />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-white/40 mb-0.5">Address</p>
                  <p className="text-sm text-white/70">Sydney, NSW 2000<br />Australia</p>
                </div>
              </li>
            </ul>
            <div className="mt-6 p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-[11px] uppercase tracking-wider text-white/40 mb-1">Business Hours</p>
              <p className="text-sm text-white/70">Mon–Fri: 8am – 5pm</p>
              <p className="text-sm text-white/70">Sat: 9am – 1pm</p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 text-sm">
          <p>© 2026 Pylon Energy Pty Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/terms-conditions" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>            
          </div>
        </div>
      </div>
    </footer>
  );
}
