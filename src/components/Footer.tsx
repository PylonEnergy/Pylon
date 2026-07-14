import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-pe-navy text-white">
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5 rounded-xl overflow-hidden bg-white p-2 hover:opacity-90 transition-opacity">
              <Image
                src="/pylon-logo.png"
                alt="Pylon Energy — Solar Panels & Battery Storage"
                width={190}
                height={60}
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Australian-owned solar company delivering premium solar panels, battery storage &amp; EV charging solutions across NSW and beyond. CEC Approved Retailer.
            </p>
            <div className="flex items-center gap-3">
              {["FB", "IG", "LN", "YT"].map((label) => (
                <span
                  key={label}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/60 text-xs font-bold hover:bg-[#29ABE2] hover:text-white transition-all cursor-pointer"
                >
                  {label}
                </span>
              ))}
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
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <img src="/netcc-approved.png" alt="NETCC Approved Seller" className="h-5 w-auto object-contain bg-white rounded-full p-0.5" />
              <span>NETCC Approved Seller</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
