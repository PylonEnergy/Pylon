"use client";
import { ShieldCheck, Award, Users, BadgeCheck } from "lucide-react";

export default function Accreditations() {
  const items = [
    {
      icon: Award,
      title: "Licensed Solar Installers",
      desc: "Qualified Local NSW Professionals",
    },
    {
      icon: ShieldCheck,
      title: "10-Yr Workmanship",
      desc: "Double-certified local installation warranty",
    },
    {
      icon: Users,
      title: "100% Australian Owned",
      desc: "Local Sydney team with nationwide support",
    },
  ];

  return (
    <section className="py-8 bg-pe-gray-50 border-y border-pe-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-center md:text-left">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-center gap-3.5 p-3 rounded-2xl hover:bg-white hover:shadow-sm transition-all duration-300 group"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-2xl bg-white border border-pe-gray-200 shadow-sm flex items-center justify-center flex-shrink-0 group-hover:border-pe-cyan/30 group-hover:bg-pe-cyan-light transition-all duration-300">
                <item.icon size={22} className="text-pe-cyan transition-transform group-hover:scale-110" />
              </div>
              
              {/* Text */}
              <div>
                <p className="font-bold text-pe-navy text-sm sm:text-base leading-tight group-hover:text-pe-cyan transition-colors">
                  {item.title}
                </p>
                <p className="text-pe-gray-500 text-xs mt-0.5 leading-snug">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
