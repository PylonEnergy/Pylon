"use client";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {showTooltip && (
        <div className="bg-white text-pe-gray-900 text-sm font-medium px-3 py-2 rounded-xl shadow-lg border border-pe-gray-200 animate-fade-in-up whitespace-nowrap">
          Chat with us on WhatsApp
          <div className="absolute bottom-[-6px] right-5 w-3 h-3 bg-white border-b border-r border-pe-gray-200 rotate-45" />
        </div>
      )}
      <a
        href="https://wa.me/61400000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_12px_40px_rgba(37,211,102,0.5)] transition-all duration-300"
      >
        <MessageCircle size={26} fill="white" />
      </a>
    </div>
  );
}
