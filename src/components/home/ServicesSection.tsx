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
    <section id="services" className="section-padding bg-[#F8FAFC] border-b border-slate-100">
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
              className="group bg-white rounded-2xl p-7 border border-slate-100/80 shadow-sm hover:shadow-md hover:border-slate-200/50 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "#29ABE215",
                    border: "1.5px solid #29ABE230",
                  }}
                >
                  <s.icon size={26} className="text-[#29ABE2]" />
                </div>
                {/* Content */}
                <h3 className="text-lg font-bold text-pe-gray-900 mb-2">{s.title}</h3>
                <p className="text-pe-gray-500 text-sm leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: s.desc }} />
              </div>
              <div className="pt-2">
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
