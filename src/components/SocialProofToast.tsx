"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, ShieldCheck, Zap, X } from "lucide-react";

interface ActivityItem {
  id: number;
  name: string;
  suburb: string;
  action: string;
  timeAgo: string;
  iconType: "solar" | "battery" | "rebate";
}

const ACTIVITIES: ActivityItem[] = [
  { id: 1, name: "David M.", suburb: "Parramatta, NSW", action: "requested a 6.6kW + Battery quote", timeAgo: "8 mins ago", iconType: "battery" },
  { id: 2, name: "Sarah K.", suburb: "Penrith, NSW", action: "locked in $3,250 STC Rebate discount", timeAgo: "14 mins ago", iconType: "rebate" },
  { id: 3, name: "Michael R.", suburb: "Castle Hill, NSW", action: "booked a 10kW Solar System installation", timeAgo: "23 mins ago", iconType: "solar" },
  { id: 4, name: "Jessica W.", suburb: "Blacktown, NSW", action: "checked battery rebate eligibility", timeAgo: "35 mins ago", iconType: "rebate" },
  { id: 5, name: "Andrew T.", suburb: "Liverpool, NSW", action: "requested a 13kW Commercial Solar feasibility study", timeAgo: "42 mins ago", iconType: "solar" },
  { id: 6, name: "Chloe B.", suburb: "Cronulla, NSW", action: "added a Tesla Powerwall 3 battery to system", timeAgo: "51 mins ago", iconType: "battery" },
];

export default function SocialProofToast() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Show initial toast after 4 seconds
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 4000);

    // Rotate toasts every 14 seconds
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ACTIVITIES.length);
        setVisible(true);
      }, 800);
    }, 14000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [dismissed]);

  if (dismissed) return null;

  const current = ACTIVITIES[currentIndex]!;

  return (
    <div
      className={`fixed bottom-20 sm:bottom-6 left-4 z-40 max-w-xs sm:max-w-sm transition-all duration-500 transform ${
        visible ? "translate-y-0 opacity-100 scale-100" : "translate-y-6 opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3.5 shadow-[0_10px_30px_rgba(0,43,92,0.15)] flex items-start gap-3 relative overflow-hidden group">
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#29ABE2] via-[#FF7029] to-[#0D5DB5]" />

        {/* Icon */}
        <div className="w-9 h-9 rounded-xl bg-pe-blue/10 text-pe-navy flex items-center justify-center flex-shrink-0 mt-0.5">
          {current.iconType === "solar" && <Zap size={18} className="text-[#FF7029]" />}
          {current.iconType === "battery" && <CheckCircle2 size={18} className="text-[#29ABE2]" />}
          {current.iconType === "rebate" && <ShieldCheck size={18} className="text-[#16A34A]" />}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center justify-between gap-1">
            <p className="text-xs font-black text-pe-navy truncate">{current.name}</p>
            <span className="text-[10px] font-bold text-pe-gray-400 flex-shrink-0">{current.timeAgo}</span>
          </div>
          <p className="text-[11px] font-semibold text-pe-gray-600 leading-snug mt-0.5">
            <span className="text-pe-navy font-bold">{current.suburb}</span> {current.action}
          </p>
          <div className="flex items-center gap-1 mt-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-pe-green animate-pulse" />
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-pe-green">Verified Activity</span>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setDismissed(true)}
          className="text-pe-gray-400 hover:text-pe-navy transition-colors p-1 -mr-1 -mt-1 rounded-md"
          aria-label="Dismiss toast"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
