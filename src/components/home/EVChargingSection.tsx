import Link from "next/link";
import { PlugZap, CheckCircle2 } from "lucide-react";

const checkpoints = [
  "Certified EV charger installers",
  "Hassle-free activation process",
  "Licensed & compliant electricians",
  "Tailored to your EV needs",
];

export default function EVChargingSection() {
  return (
    <section id="ev-charging" className="section-padding bg-pe-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: Illustration */}
          <div className="relative">
            <div
              className="rounded-3xl overflow-hidden flex items-center justify-center min-h-[250px] sm:min-h-[350px] lg:min-h-[400px]"
              style={{ background: "linear-gradient(135deg, #001A3A 0%, #002B5C 50%, #29ABE2 100%)" }}
            >
              {/* Decorative diagonal clip */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
                  backgroundSize: "20px 20px",
                }} />
              <div className="relative z-10 text-center p-10">
                <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-3xl bg-white/10 border-2 border-white/20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <PlugZap size={40} className="text-[#29ABE2] sm:hidden" />
                  <PlugZap size={64} className="text-[#29ABE2] hidden sm:block" />
                </div>
                <div className="bg-white/10 rounded-2xl p-5 border border-white/20">
                  <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Charging Status</p>
                  <p className="text-white font-black text-2xl font-mono">22 kW</p>
                  <p className="text-pe-green text-sm font-semibold mt-1">● Fast Charging Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Content */}
          <div>
            <p className="section-label">EV CHARGING SOLUTIONS</p>
            <h2 className="section-title">
              Trusted Experts for Home & Business <em>EV Charging</em>
            </h2>
            <p className="text-pe-gray-500 leading-relaxed mb-7">
              As electric vehicles become mainstream in Australia, charging at home using your own solar power is the smartest way to reduce both transport and energy costs. Pylon Energy installs Level 2 home and workplace EV chargers with full compliance and activation support.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {checkpoints.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-[#16A34A] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-pe-gray-700 font-semibold text-sm">{point}</span>
                </div>
              ))}
            </div>

            <Link href="/services/ev-charger" className="btn-primary">
              Explore EV Chargers →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
