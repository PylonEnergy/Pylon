"use client";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function MobileCallBar() {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  // Hide bar when near the footer, show when scrolling up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom = window.innerHeight + y >= document.body.scrollHeight - 120;
      if (nearBottom) {
        setVisible(false);
      } else {
        setVisible(y < lastY || y < 80); // show on scroll-up or near top
      }
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 sm:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch h-[54px] shadow-[0_-2px_16px_rgba(0,0,0,0.1)]">
        {/* Call button */}
        <a
          href="tel:1300001598"
          className="flex-1 flex items-center justify-center gap-2.5 bg-[#002B5C] text-white active:bg-[#001a3a] transition-colors"
        >
          <Phone size={16} className="flex-shrink-0" />
          <span className="font-bold text-sm tracking-wide">1300 001 598</span>
        </a>

        {/* Divider */}
        <div className="w-px bg-white/15 flex-shrink-0" />

        {/* Quote button */}
        <Link
          href="/get-quote"
          className="flex-1 flex items-center justify-center gap-2 bg-[#FF7029] text-white active:bg-[#e55f1a] transition-colors"
        >
          <span className="font-bold text-sm">Free Quote</span>
          <ArrowRight size={15} className="flex-shrink-0" />
        </Link>
      </div>
    </div>
  );
}
