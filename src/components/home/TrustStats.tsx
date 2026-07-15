"use client";
import { useEffect, useRef, useState } from "react";
import { Star, Shield, Zap, Clock, Award } from "lucide-react";

const stats = [
  {
    icon: Zap,
    number: 100,
    suffix: "%",
    label: "Australian Owned",
    sub: "Owned & Operated",
    color: "#29ABE2",
  },
  {
    icon: Award,
    number: 5.0,
    suffix: "★",
    label: "Google Rating",
    sub: "Verified Reviews",
    color: "#D97706",
    isDecimal: true,
  },
  {
    icon: Shield,
    number: 25,
    suffix: "-Yr",
    label: "Warranties",
    sub: "Panel & Inverter",
    color: "#29ABE2",
  },
  {
    icon: Clock,
    number: 48,
    suffix: "hrs",
    label: "Avg. Install Time",
    sub: "From sign-off to live",
    color: "#FF7029",
  },
  {
    icon: Star,
    number: 0,
    suffix: "$0",
    label: "Upfront Finance",
    sub: "Interest-free options",
    color: "#29ABE2",
    isZero: true,
  },
];

function AnimatedNumber({ target, suffix, isDecimal, isZero }: {
  target: number; suffix: string; isDecimal?: boolean; isZero?: boolean;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setVal(target);
              clearInterval(timer);
            } else {
              setVal(current);
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  if (isZero) return <span ref={ref}>{suffix}</span>;
  return (
    <span ref={ref}>
      {isDecimal ? val.toFixed(1) : Math.round(val)}
      {suffix}
    </span>
  );
}

export default function TrustStats() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 relative z-20 mt-10 mb-8">
      <div
        className="max-w-7xl mx-auto rounded-3xl overflow-hidden border border-slate-100"
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 20px 45px rgba(0, 43, 92, 0.05)",
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center px-5 py-8 group hover:bg-slate-50/50 transition-colors border-slate-200/50
                ${i % 2 === 0 ? "border-r" : ""} 
                ${i < 4 ? "border-b" : ""}
                md:border-b-0 md:border-r-[0px]
                ${i % 3 !== 2 ? "md:border-r" : ""}
                ${i < 3 ? "md:border-b" : ""}
                lg:border-b-0 lg:border-r-[0px]
                ${i < 4 ? "lg:border-r" : ""}
              `}
            >
              {/* Icon ring */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{
                  background: `${stat.color}15`,
                  border: `1.5px solid ${stat.color}30`,
                }}
              >
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>

              {/* Number */}
              <p
                className="text-2xl lg:text-3xl font-black leading-none mb-1 font-mono"
                style={{ color: stat.color }}
              >
                <AnimatedNumber
                  target={stat.number}
                  suffix={stat.suffix}
                  isDecimal={stat.isDecimal}
                  isZero={stat.isZero}
                />
              </p>

              <p className="text-pe-navy font-bold text-sm mt-1">{stat.label}</p>
              <p className="text-pe-gray-500 text-xs mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
