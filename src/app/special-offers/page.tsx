import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Tag, Zap, Phone, ArrowRight, Clock, CheckCircle2, Star, BadgePercent, Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "Special Offers & Solar Promotions | Pylon Energy",
  description:
    "Browse Pylon Energy's latest solar deals, government rebate promotions, battery bundle offers, and limited-time discounts across NSW.",
};

async function getActiveBanner() {
  try {
    const res = await fetch("http://localhost:4000/api/settings", { next: { revalidate: 5 } });
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data.settings;
  } catch {
    return { bannerVisible: false, bannerMessage: "", bannerLink: "" };
  }
}

const deals = [
  {
    badge: "🔥 Hot Deal",
    badgeColor: "bg-red-100 text-red-700 border-red-200",
    title: "10kW Solar + 28kWh Battery Bundle",
    subtitle: "Our most popular combo system — fully installed",
    description:
      "Get a premium 10kW solar system paired with a 28kWh Sigenergy battery. Reduce your power bill by up to 95% and earn money exporting energy back to the grid.",
    highlights: [
      "22 × 475W Tier-1 Solar Panels",
      "8kW Hybrid Inverter included",
      "28kWh LFP Battery Storage",
      "10-Year Battery Warranty",
      "Full installation & commissioning",
      "STC rebate applied upfront",
    ],
    cta: "Claim This Bundle",
    href: "/get-quote?interest=solar-battery",
    accent: "pe-orange",
    featured: true,
  },
  {
    badge: "💰 Rebate Offer",
    badgeColor: "bg-green-100 text-green-700 border-green-200",
    title: "Save Up to $3,500 on Residential Solar",
    subtitle: "2026 Federal STC Rebate — limited time",
    description:
      "The Small-scale Technology Certificate (STC) rebate is active now. Get up to $3,500 off a new residential solar system when installed by a licensed retailer like Pylon Energy.",
    highlights: [
      "Available on 6.6kW to 13.2kW systems",
      "Applied directly as discount at point of sale",
      "Must be a licensed installer (we are ✓)",
      "NSW, VIC, QLD, SA & WA eligible",
      "No forms — we handle it all for you",
    ],
    cta: "Check Your Rebate",
    href: "/get-quote",
    accent: "pe-green",
    featured: false,
  },
  {
    badge: "⚡ EV Offer",
    badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
    title: "Free EV Charger with Any 10kW+ Solar System",
    subtitle: "Limited availability — book now",
    description:
      "Purchase any 10kW or larger solar system and receive a complimentary EV charger installation (hardware & labour). Charge your car for free using your solar energy.",
    highlights: [
      "7kW Level 2 EV Charger included",
      "Certified installation by licensed electricians",
      "Compatible with all major EV brands",
      "Solar-optimised smart charging",
      "Valid for NSW metro bookings only",
    ],
    cta: "Book Before It Ends",
    href: "/get-quote?interest=ev-charger",
    accent: "pe-blue",
    featured: false,
  },
  {
    badge: "📦 Battery Only",
    badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
    title: "Existing Solar? Add a Battery from $0 Upfront",
    subtitle: "Finance available — no interest periods",
    description:
      "Already have solar panels? Upgrade with a Sigenergy or Alpha ESS battery storage system. Enjoy $0 upfront finance options and start saving from day one with stored solar energy.",
    highlights: [
      "14kWh, 28kWh, and 42kWh options",
      "$0 deposit finance available",
      "Works with any existing inverter brand",
      "Monitoring app included",
      "10-year warranty on all batteries",
    ],
    cta: "Explore Battery Options",
    href: "/services/solar-batteries",
    accent: "pe-navy",
    featured: false,
  },
];

const urgencyItems = [
  { icon: Clock, text: "STC rebate reduces every January — lock in 2026 rates now" },
  { icon: Flame, text: "EV charger promo limited to first 20 customers this month" },
  { icon: Star, text: "Finance rates currently at lowest — 0% for 12 months available" },
  { icon: BadgePercent, text: "Battery bundle pricing valid until 31 August 2026" },
];

export default async function SpecialOffersPage() {
  const settings = await getActiveBanner();

  return (
    <>
      <PageHero
        title="Special Offers & Promotions"
        subtitle="Exclusive solar deals, government rebates, and limited-time bundle savings — all in one place."
        breadcrumbs={[{ label: "Special Offers" }]}
      />

      {/* Urgency Strip */}
      <div className="bg-pe-navy text-white py-3 overflow-hidden">
        <div className="flex animate-scroll-left gap-12 whitespace-nowrap" style={{ width: "max-content" }}>
          {[...urgencyItems, ...urgencyItems].map((item, i) => {
            const Icon = item.icon;
            return (
              <span key={i} className="flex items-center gap-2 text-xs font-semibold">
                <Icon size={13} className="text-pe-cyan flex-shrink-0" />
                {item.text}
              </span>
            );
          })}
        </div>
      </div>

      {/* Active Admin Banner — text strip */}
      {settings.bannerVisible && settings.bannerMessage && (
        <div className="bg-pe-cyan text-white py-3 px-4 text-center text-sm font-bold">
          <Link href={settings.bannerLink || "#"} className="hover:underline flex items-center justify-center gap-2">
            <Zap size={16} className="fill-white" /> {settings.bannerMessage}
          </Link>
        </div>
      )}

      {/* Promotional Banner Image — shown when admin uploads one */}
      {settings.bannerVisible && settings.bannerImage && (
        <div className="bg-white px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-5xl mx-auto">
            <Link href={settings.bannerLink || "#"} className="block group">
              <div className="relative rounded-3xl overflow-hidden shadow-lg border border-pe-gray-100 transition-transform duration-300 group-hover:scale-[1.01]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={settings.bannerImage}
                  alt={settings.bannerMessage || "Promotional Offer"}
                  className="w-full max-h-64 object-cover object-center"
                />
                {/* Gradient overlay with CTA */}
                <div className="absolute inset-0 bg-gradient-to-r from-pe-navy/70 via-transparent to-transparent flex items-center px-8">
                  <div className="text-white">
                    <p className="text-xs font-black uppercase tracking-widest text-pe-cyan mb-1">Limited Time Offer</p>
                    <p className="text-xl font-black leading-tight max-w-xs">{settings.bannerMessage}</p>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold bg-pe-cyan px-4 py-2 rounded-full">
                      View Deal <Zap size={14} className="fill-white" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Deals Grid */}
      <section className="section-padding bg-pe-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-label">
              <Tag size={12} /> Limited Time
            </span>
            <h2 className="section-title">
              Current <span>Active Deals</span>
            </h2>
            <p className="section-subtitle mx-auto">
              All offers are subject to availability and postcode eligibility. Contact us to confirm availability in your area.
            </p>
          </div>

          <div className="space-y-8">
            {deals.map((deal, i) => (
              <div
                key={i}
                className={`bg-white rounded-3xl border overflow-hidden shadow-sm transition-all hover:shadow-md ${
                  deal.featured
                    ? "border-pe-cyan ring-2 ring-pe-cyan/20"
                    : "border-pe-gray-200"
                }`}
              >
                {deal.featured && (
                  <div className="bg-pe-cyan text-white text-center py-2 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2">
                    <Star size={13} className="fill-white" /> Most Popular Deal — Limited Availability
                  </div>
                )}

                <div className="p-8 grid md:grid-cols-2 gap-8 items-center">
                  {/* Left: Content */}
                  <div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black border mb-4 ${deal.badgeColor}`}
                    >
                      {deal.badge}
                    </span>

                    <h3 className="text-2xl font-black text-pe-navy mb-1">{deal.title}</h3>
                    <p className="text-pe-cyan font-semibold text-sm mb-3">{deal.subtitle}</p>
                    <p className="text-pe-gray-600 leading-relaxed text-sm mb-6">{deal.description}</p>

                    <Link href={deal.href} className="btn-primary gap-2">
                      {deal.cta} <ArrowRight size={16} />
                    </Link>
                  </div>

                  {/* Right: Highlights */}
                  <div className="bg-pe-gray-50 rounded-2xl p-6 border border-pe-gray-200">
                    <p className="text-xs font-black uppercase tracking-widest text-pe-gray-400 mb-4">
                      What&apos;s Included
                    </p>
                    <ul className="space-y-2.5">
                      {deal.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-pe-gray-700">
                          <CheckCircle2
                            size={17}
                            className="text-pe-green flex-shrink-0 mt-0.5"
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-pe-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.3) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.3) 40px)",
          }} />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="section-label text-pe-cyan">Ready to Save?</span>
          <h2 className="text-4xl font-black mb-4">
            Don&apos;t Miss Out — These Deals Won&apos;t Last
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Get your free customised quote in under 60 seconds. No obligation, no pressure — just real savings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-quote" className="btn-primary text-base py-4 px-8">
              Claim Your Deal Now →
            </Link>
            <Link
              href="tel:1300001598"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white font-bold hover:bg-white/10 transition-all text-base"
            >
              <Phone size={18} /> Call Us: 1300 001 598
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
