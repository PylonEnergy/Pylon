import { Phone, PenTool, Wrench, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Free Consultation",
    desc: "Tell us about your energy needs and we'll design the perfect solar system tailored to your home.",
    color: "#29ABE2",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Custom System Design",
    desc: "Our engineers design a system optimised for your roof size, orientation, and energy usage.",
    color: "#0D5DB5",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Professional Installation",
    desc: "Fully licensed installers handle everything in as little as 1 day, including all paperwork.",
    color: "#0D5DB5",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Monitor & Save",
    desc: "Track your solar production and bill savings in real-time via our monitoring app.",
    color: "#29ABE2",
  },
];

export default function InstallationProcess() {
  return (
    <section
      id="process"
      className="section-padding relative overflow-hidden bg-white border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#1A8CBD]"
            style={{ background: "#E8F7FD", border: "1px solid rgba(41,171,226,0.25)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#29ABE2]" />
            How It Works
          </div>
          <h2 className="section-title">
            Your Solar Journey, <span style={{ color: "#29ABE2" }}>Simplified</span>
          </h2>
          <p className="text-pe-gray-500 text-base max-w-xl mx-auto">
            From consultation to energy savings in as little as 2 weeks.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line desktop */}
          <div
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(41,171,226,0.25), rgba(41,171,226,0.25), transparent)",
            }}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 xl:gap-16">
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center group px-2">
                {/* Step circle */}
                <div
                  className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}30, ${step.color}15)`,
                    border: `2px solid ${step.color}50`,
                    boxShadow: `0 8px 30px ${step.color}25`,
                  }}
                >
                  <step.icon size={28} style={{ color: step.color }} />
                  {/* Step number badge */}
                  <span
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full text-white text-xs font-black flex items-center justify-center"
                    style={{ background: step.color }}
                  >
                    {step.number}
                  </span>
                </div>

                <h3 className="text-pe-navy text-lg font-bold mb-2 group-hover:text-[#29ABE2] transition-colors">
                  {step.title}
                </h3>
                <p className="text-pe-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA below */}
        <div className="text-center mt-14">
          <Link
            href="/get-quote"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base transition-all hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #FF7029, #E5601E)",
              boxShadow: "0 8px 24px rgba(255, 112, 41, 0.35)",
            }}
          >
            Start Your Solar Journey <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
