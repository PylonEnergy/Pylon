import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import {
  MapPin, Star, Zap, Battery, Home, Building2, Sun,
  ArrowRight, CheckCircle2, Award, Users, TrendingUp
} from "lucide-react";

export const metadata: Metadata = {
  title: "Solar Installation Portfolio | Pylon Energy Case Studies",
  description:
    "Browse real solar installations completed by Pylon Energy across NSW, VIC, and QLD. See before & after results, system sizes, and customer savings.",
};

const STATS = [
  { icon: <Zap size={22} />, value: "500+", label: "Installations Completed" },
  { icon: <Users size={22} />, value: "98%", label: "Customer Satisfaction" },
  { icon: <TrendingUp size={22} />, value: "$2.4M", label: "Saved by Customers/yr" },
  { icon: <Award size={22} />, value: "10yr", label: "Workmanship Warranty" },
];

const CASES = [
  {
    id: 1,
    type: "residential",
    title: "3-Bedroom Home — Sydney, NSW",
    system: "6.6kW Solar + 10kWh Battery",
    location: "Parramatta, NSW 2150",
    saving: "$2,400/yr",
    payback: "4.5 years",
    description:
      "This family of four was spending over $600/quarter on electricity. After our 6.6kW Jinko solar system and Sungrow battery install, their bills dropped to near zero — even through winter.",
    highlights: ["22 x Jinko 300W panels", "Sungrow 10kWh battery", "5kW Fronius inverter", "Wi-Fi monitoring app"],
    rating: 5,
    tag: "Most Popular",
    tagColor: "#29ABE2",
    bgGradient: "linear-gradient(135deg, #E8F7FD 0%, #fff 100%)",
    accent: "#29ABE2",
  },
  {
    id: 2,
    type: "commercial",
    title: "Café & Restaurant — Melbourne, VIC",
    system: "30kW Commercial Solar",
    location: "Fitzroy, VIC 3065",
    saving: "$12,000/yr",
    payback: "3.2 years",
    description:
      "This busy inner-city café was running air conditioning and kitchen equipment all day. Our 30kW commercial installation now covers 80% of their daytime energy use, saving over $1,000/month.",
    highlights: ["100 x Risen 300W panels", "30kW SMA inverter", "3-phase grid connection", "Export metering"],
    rating: 5,
    tag: "Commercial",
    tagColor: "#002B5C",
    bgGradient: "linear-gradient(135deg, #EEF2FF 0%, #fff 100%)",
    accent: "#002B5C",
  },
  {
    id: 3,
    type: "residential",
    title: "5-Bedroom Home — Brisbane, QLD",
    system: "13.2kW Solar System",
    location: "Sunnybank, QLD 4109",
    saving: "$3,800/yr",
    payback: "5 years",
    description:
      "A large family home with a pool, EV charger, and ducted air conditioning. We designed a custom 44-panel system with optimisers on every panel to handle the partial shading from nearby trees.",
    highlights: ["44 x Sunpower 300W panels", "SolarEdge optimisers", "EV charger integration", "Pool pump scheduling"],
    rating: 5,
    tag: "Large System",
    tagColor: "#0ea5e9",
    bgGradient: "linear-gradient(135deg, #EFF6FF 0%, #fff 100%)",
    accent: "#0ea5e9",
  },
  {
    id: 4,
    type: "battery",
    title: "Battery Retrofit — Adelaide, SA",
    system: "10kWh Battery Added to Existing Solar",
    location: "Glenelg, SA 5045",
    saving: "$1,600/yr",
    payback: "6 years",
    description:
      "These customers had an existing 5kW solar system and were exporting most of their energy for only 5c/kWh. Adding a 10kWh Sungrow battery let them store and self-consume that power instead.",
    highlights: ["Sungrow SBR100 battery", "Hybrid inverter upgrade", "Time-of-use optimisation", "Blackout protection"],
    rating: 5,
    tag: "Battery Add-on",
    tagColor: "#16a34a",
    bgGradient: "linear-gradient(135deg, #F0FDF4 0%, #fff 100%)",
    accent: "#16a34a",
  },
  {
    id: 5,
    type: "commercial",
    title: "Warehouse — Western Sydney, NSW",
    system: "99kW Industrial Solar",
    location: "Wetherill Park, NSW 2164",
    saving: "$42,000/yr",
    payback: "2.8 years",
    description:
      "One of our largest installs — a 99kW system across the roof of a 3,000m² industrial warehouse. The client saw ROI in under 3 years and now exports excess power back to the grid.",
    highlights: ["330 x Canadian Solar 300W", "99kW SMA Tripower", "Switchboard upgrades", "Monthly energy reports"],
    rating: 5,
    tag: "Industrial",
    tagColor: "#7c3aed",
    bgGradient: "linear-gradient(135deg, #F5F3FF 0%, #fff 100%)",
    accent: "#7c3aed",
  },
  {
    id: 6,
    type: "residential",
    title: "Townhouse — Perth, WA",
    system: "5kW Solar + Hot Water Diverter",
    location: "Fremantle, WA 6160",
    saving: "$1,800/yr",
    payback: "4 years",
    description:
      "A compact townhouse with limited roof space. We used high-efficiency panels to maximise output, and added a hot water diverter to redirect excess solar into the electric hot water system.",
    highlights: ["16 x SunPower 400W", "Enphase microinverters", "Hot water diverter", "App monitoring"],
    rating: 5,
    tag: "Compact System",
    tagColor: "#29ABE2",
    bgGradient: "linear-gradient(135deg, #E8F7FD 0%, #fff 100%)",
    accent: "#29ABE2",
  },
];

const FILTER_TABS = [
  { label: "All Projects", value: "all" },
  { label: "Residential", value: "residential" },
  { label: "Commercial", value: "commercial" },
  { label: "Battery", value: "battery" },
];

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        title="Our Installation Portfolio"
        subtitle="Real solar installs. Real customer savings. Browse case studies from across Australia."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
      />

      {/* Stats Strip */}
      <section className="portfolio-stats-section">
        <div className="container">
          <div className="portfolio-stats-grid">
            {STATS.map((s, i) => (
              <div className="portfolio-stat" key={i}>
                <div className="portfolio-stat-icon">{s.icon}</div>
                <span className="portfolio-stat-value">{s.value}</span>
                <span className="portfolio-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="portfolio-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="section-badge">Case Studies</span>
            <h2 className="section-title">Trusted by Homeowners & Businesses Across Australia</h2>
            <p className="section-subtitle">
              Every installation is backed by our 10-year workmanship warranty and performed by fully licensed electricians.
            </p>
          </div>

          <div className="portfolio-grid">
            {CASES.map((c) => (
              <div
                key={c.id}
                className="portfolio-card"
                style={{ background: c.bgGradient }}
              >
                {/* Header Row: Icon + Tag */}
                <div className="flex items-center justify-between gap-4">
                  <div className="portfolio-card-icon" style={{ color: c.accent }}>
                    {c.type === "commercial" ? <Building2 size={24} /> : c.type === "battery" ? <Battery size={24} /> : <Home size={24} />}
                  </div>
                  <span
                    className="portfolio-tag"
                    style={{ background: c.tagColor }}
                  >
                    {c.tag}
                  </span>
                </div>

                {/* Title & System */}
                <div>
                  <h3 className="portfolio-card-title">{c.title}</h3>
                  <p className="portfolio-card-system" style={{ color: c.accent }}>{c.system}</p>
                </div>

                {/* Location */}
                <div className="portfolio-location">
                  <MapPin size={13} />
                  <span>{c.location}</span>
                </div>

                {/* Description */}
                <p className="portfolio-description">{c.description}</p>

                {/* Highlights */}
                <ul className="portfolio-highlights">
                  {c.highlights.map((h, i) => (
                    <li key={i}>
                      <CheckCircle2 size={14} style={{ color: c.accent, flexShrink: 0 }} />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Savings */}
                <div className="portfolio-savings">
                  <div className="portfolio-saving-block">
                    <span className="saving-value" style={{ color: c.accent }}>{c.saving}</span>
                    <span className="saving-label">Annual Savings</span>
                  </div>
                  <div className="portfolio-saving-block">
                    <span className="saving-value" style={{ color: c.accent }}>{c.payback}</span>
                    <span className="saving-label">Payback Period</span>
                  </div>
                  <div className="portfolio-saving-block">
                    <div className="saving-stars">
                      {Array.from({ length: c.rating }).map((_, i) => (
                        <Star key={i} size={13} fill={c.accent} color={c.accent} />
                      ))}
                    </div>
                    <span className="saving-label">Customer Rating</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="portfolio-cta-section">
            <div className="portfolio-cta-card">
              <Sun size={40} color="#29ABE2" />
              <h3>Ready to Join Our Success Stories?</h3>
              <p>Get a free, no-obligation quote tailored to your home or business. Our expert team will design the perfect system for your needs.</p>
              <Link href="/get-quote" className="btn btn-primary btn-lg">
                Get My Free Quote <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .portfolio-stats-section {
          background: #002B5C;
          padding: 2rem 0;
        }
        .portfolio-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }
        @media (max-width: 768px) {
          .portfolio-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .portfolio-stat {
          display: flex; flex-direction: column; align-items: center; text-align: center; gap: 6px;
        }
        .portfolio-stat-icon { color: #29ABE2; }
        .portfolio-stat-value { font-size: 2rem; font-weight: 900; color: #fff; line-height: 1; }
        .portfolio-stat-label { font-size: 0.8rem; color: rgba(255,255,255,0.65); letter-spacing: 0.05em; text-transform: uppercase; }

        .portfolio-section { padding: 5rem 0; background: #f9fafb; }

        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }
        @media (max-width: 1100px) { .portfolio-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 680px) { .portfolio-grid { grid-template-columns: 1fr; } }

        .portfolio-card {
          position: relative;
          border-radius: 20px;
          padding: 28px;
          border: 1.5px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 20px rgba(0,43,92,0.06);
          display: flex; flex-direction: column; gap: 14px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .portfolio-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(0,43,92,0.12);
        }
        .portfolio-tag {
          color: #fff; font-size: 11px; font-weight: 700;
          padding: 4px 12px; border-radius: 99px; letter-spacing: 0.04em;
          text-transform: uppercase;
          display: inline-block;
        }
        .portfolio-card-header { display: flex; align-items: flex-start; gap: 14px; }
        .portfolio-card-icon {
          background: rgba(255,255,255,0.8); border-radius: 12px; padding: 10px;
          display: flex; flex-shrink: 0;
        }
        .portfolio-card-title { font-size: 1rem; font-weight: 800; color: #1a1a2e; margin: 0 0 3px; }
        .portfolio-card-system { font-size: 0.82rem; font-weight: 700; margin: 0; }

        .portfolio-location {
          display: flex; align-items: center; gap: 5px;
          font-size: 0.8rem; color: #888;
        }

        .portfolio-description {
          font-size: 0.88rem; color: #555; line-height: 1.65; margin: 0;
        }

        .portfolio-highlights { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 7px; }
        .portfolio-highlights li { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: #444; font-weight: 500; }

        .portfolio-savings {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 8px; background: rgba(255,255,255,0.6); border-radius: 12px; padding: 14px;
          border: 1px solid rgba(0,0,0,0.05); margin-top: auto;
        }
        .portfolio-saving-block { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 3px; }
        .saving-value { font-size: 1.1rem; font-weight: 900; }
        .saving-label { font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 0.05em; }
        .saving-stars { display: flex; gap: 2px; }

        .portfolio-cta-section { margin-top: 4rem; }
        .portfolio-cta-card {
          background: linear-gradient(135deg, #002B5C 0%, #00408a 100%);
          border-radius: 24px; padding: 3rem;
          display: flex; flex-direction: column; align-items: center; text-align: center; gap: 16px;
        }
        .portfolio-cta-card h3 { font-size: 1.8rem; font-weight: 900; color: #fff; margin: 0; }
        .portfolio-cta-card p { font-size: 1rem; color: rgba(255,255,255,0.75); max-width: 520px; margin: 0; line-height: 1.65; }
      `}</style>
    </>
  );
}
