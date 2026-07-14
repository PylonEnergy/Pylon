"use client";
import { Calculator, FileText, PhoneCall } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FloatingSidebarCTA() {
  const pathname = usePathname();

  const handleScrollToCalculator = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      const element = document.getElementById("calculator");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2.5 items-end pr-0">
      {/* Tab 1: Calculate Savings */}
      <a
        href="/#calculator"
        onClick={handleScrollToCalculator}
        className="flex items-center bg-pe-navy hover:bg-pe-navy-dark text-white p-3 rounded-l-xl shadow-xl transition-all duration-300 group border border-r-0 border-white/10 cursor-pointer"
      >
        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
          <Calculator size={18} className="text-pe-cyan group-hover:scale-110 transition-transform" />
        </div>
        <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-3 transition-all duration-300 ease-out font-bold text-xs tracking-wider uppercase whitespace-nowrap">
          Calculate Savings
        </span>
      </a>

      {/* Tab 2: Get Free Quote */}
      <Link
        href="/get-quote"
        className="flex items-center bg-pe-cyan hover:bg-pe-cyan-dark text-white p-3 rounded-l-xl shadow-xl transition-all duration-300 group border border-r-0 border-white/10"
      >
        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
          <FileText size={18} className="text-white group-hover:scale-110 transition-transform" />
        </div>
        <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-3 transition-all duration-300 ease-out font-bold text-xs tracking-wider uppercase whitespace-nowrap">
          Get Free Quote
        </span>
      </Link>

      {/* Tab 3: Call Hotline */}
      <a
        href="tel:1300000000"
        className="flex items-center bg-pe-green hover:bg-pe-green/90 text-white p-3 rounded-l-xl shadow-xl transition-all duration-300 group border border-r-0 border-white/10"
      >
        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
          <PhoneCall size={18} className="text-white group-hover:scale-110 transition-transform" />
        </div>
        <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-3 transition-all duration-300 ease-out font-bold text-xs tracking-wider uppercase whitespace-nowrap">
          Call 1300 000 000
        </span>
      </a>
    </div>
  );
}
