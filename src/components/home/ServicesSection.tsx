import Link from "next/link";
import { Sun, Battery, PlugZap, Headphones, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Sun,
    title: "Solar Systems",
    desc: "Residential solar installations from 5kW to 13kW for Australian homes. Reduce your power bills by up to 80% with premium Tier-1 panels.",
    href: "/services/residential-solar",
    color: "bg-[#E8F7FD]",
    iconColor: "text-[#29ABE2]",
  },
  {
    icon: Battery,
    title: "Solar Batteries",
    desc: "Store excess solar energy and power your home day and night with premium battery systems from Tesla, Sungrow, and more.",
    href: "/services/solar-batteries",
    color: "bg-[#E8F0FB]",
    iconColor: "text-[#0D5DB5]",
  },
  {
    icon: PlugZap,
    title: "EV Charger",
    desc: "Level 2 home &amp; workplace EV charging solutions. Charge your electric vehicle using clean solar power for maximum savings.",
    href: "/services/ev-charger",
    color: "bg-[#E8F7FD]",
    iconColor: "text-[#29ABE2]",
  },
  {
    icon: Headphones,
    title: "Help &amp; Support",
    desc: "Expert support and maintenance for your solar system. Our team is always available to ensure your system performs at its best.",
    href: "/contact",
    color: "bg-[#EDF4FF]",
    iconColor: "text-[#002B5C]",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-pe-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="section-label mx-auto justify-center">OUR SERVICES</p>
          <h2 className="section-title">
            What services can we <em>help you</em> with today?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className={`group card overflow-hidden ${i % 2 === 1 ? "lg:mt-8" : ""}`}
            >
              {/* Icon area */}
              <div className={`${s.color} p-8 flex items-center justify-center`}>
                <div className="w-16 h-16 rounded-2xl bg-white/80 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <s.icon size={32} className={s.iconColor} />
                </div>
              </div>
              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-pe-gray-900 mb-2">{s.title}</h3>
                <p className="text-pe-gray-500 text-sm leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: s.desc }} />
                <Link
                  href={s.href}
                  className="inline-flex items-center gap-1.5 text-[#29ABE2] font-semibold text-sm hover:gap-3 transition-all"
                >
                  Learn More <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
