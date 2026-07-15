import { ShieldCheck, Clock, Award, Users, Wallet, BarChart3 } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "CEC Approved Retailer",
    desc: "Clean Energy Council approved, meeting the highest industry standards for system design, installation, and after-sales support.",
    accent: "#29ABE2",
  },
  {
    icon: Clock,
    title: "25-Year Warranties",
    desc: "Long-term protection on panels and inverters. We only use products that come with industry-leading warranties.",
    accent: "#0D5DB5",
  },
  {
    icon: Award,
    title: "Premium Tier-1 Panels",
    desc: "Only the top-rated solar panels from leading manufacturers like Jinko, Trina, and Sungrow.",
    accent: "#29ABE2",
  },
  {
    icon: Users,
    title: "Local Australian Team",
    desc: "Sydney-based team of CEC-accredited installers with nationwide service coverage across NSW.",
    accent: "#0D5DB5",
  },
  {
    icon: Wallet,
    title: "Flexible Finance",
    desc: "Interest-free options and affordable payment plans available. Go solar from $0 upfront.",
    accent: "#29ABE2",
  },
  {
    icon: BarChart3,
    title: "Performance Monitoring",
    desc: "Real-time monitoring to track your solar production and maximise your energy savings.",
    accent: "#0D5DB5",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="section-padding relative overflow-hidden bg-white border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ background: "#E8F7FD", color: "#1A8CBD" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#29ABE2" }}
            />
            Why Choose Us
          </div>
          <h2
            className="section-title"
            style={{
              background: "linear-gradient(135deg, #001A3A, #002B5C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Why Choose <em style={{ fontStyle: "italic", WebkitTextFillColor: "#29ABE2" }}>Pylon Energy</em>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            We&apos;re committed to making solar simple, affordable, and reliable for every Australian home and business.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-2xl p-7 border border-slate-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,43,92,0.06)] hover:border-slate-200/50 overflow-hidden"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `${f.accent}15`,
                  border: `1.5px solid ${f.accent}30`,
                }}
              >
                <f.icon size={24} style={{ color: f.accent }} />
              </div>

              <h3 className="text-lg font-bold text-pe-gray-900 mb-2 group-hover:text-[#002B5C] transition-colors">
                {f.title}
              </h3>
              <p className="text-pe-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
