"use client";
import Link from "next/link";
import { Phone, ArrowRight, MessageCircle } from "lucide-react";
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
      <div className="flex items-stretch h-[54px] shadow-[0_-2px_16px_rgba(0,0,0,0.1)] bg-[#002B5C]">
        {/* Call button */}
        <a
          href="tel:1300001598"
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#002B5C] text-white active:bg-[#001a3a] transition-colors px-2"
        >
          <Phone size={15} className="flex-shrink-0 text-[#29ABE2]" />
          <span className="font-black text-xs tracking-tight">Call 1300</span>
        </a>

        {/* Divider */}
        <div className="w-px bg-white/15 flex-shrink-0" />

        {/* WhatsApp Chat Button */}
        <a
          href="https://wa.me/61400000000?text=Hi%20Pylon%20Energy,%20I'd%20like%20a%20free%20solar%20quote"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366] text-white active:bg-[#1ebd59] transition-colors px-2"
        >
          <MessageCircle size={15} className="flex-shrink-0" />
          <span className="font-black text-xs tracking-tight">WhatsApp</span>
        </a>

        {/* Divider */}
        <div className="w-px bg-white/15 flex-shrink-0" />

        {/* Quote button */}
        <Link
          href="/get-quote"
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#FF7029] text-white active:bg-[#e55f1a] transition-colors px-2"
        >
          <span className="font-black text-xs tracking-tight">Free Quote</span>
          <ArrowRight size={13} className="flex-shrink-0" />
        </Link>
      </div>
    </div>
  );
}
