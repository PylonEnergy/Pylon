"use client";
import { useState, useEffect, useRef } from "react";
import { X, Gift, Zap, PhoneCall, Award, ShieldCheck } from "lucide-react";

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    postcode: "",
    interest: "residential",
    email: "popup-lead@pylonenergy.com.au", // placeholder to satisfy schema
    message: "Submitted via Exit Intent / Timer Promo Pop-up modal",
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 1. Check if user already saw or submitted the popup recently
    const hasSeen = localStorage.getItem("pylon_seen_lead_popup");
    if (hasSeen) return;

    // 2. Set Timer Trigger (Open after 15 to 20 seconds of activity)
    const delay = Math.floor(15000 + Math.random() * 5000);
    timerRef.current = setTimeout(() => {
      openPopup();
    }, delay);

    // 3. Set Exit Intent Trigger (Mouse leaving window)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20) {
        openPopup();
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const openPopup = () => {
    const hasSeen = localStorage.getItem("pylon_seen_lead_popup");
    if (!hasSeen) {
      setIsOpen(true);
      localStorage.setItem("pylon_seen_lead_popup", "true");
    }
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((d) => ({ ...d, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
      const res = await fetch(`${apiUrl}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-pe-navy/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={closePopup}
      />

      {/* Modal Container */}
      <div 
        className="relative z-10 w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,43,92,0.35)] animate-fade-in-up border border-pe-gray-200"
      >
        {/* Close Button */}
        <button 
          onClick={closePopup}
          className="absolute right-5 top-5 text-pe-gray-400 hover:text-pe-navy p-1.5 rounded-full hover:bg-pe-gray-100 transition-colors z-20"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Promo Header banner */}
        <div className="bg-pe-navy text-white px-5 py-6 sm:px-8 sm:py-7 relative overflow-hidden">
          <div className="absolute top-[-50px] right-[-50px] w-36 h-36 bg-[#29ABE2] opacity-25 rounded-full blur-2xl pointer-events-none" />
          <div className="inline-flex items-center gap-2 bg-[#29ABE2]/20 border border-[#29ABE2]/30 px-3 py-1 rounded-full text-xs font-bold text-[#29ABE2] uppercase tracking-wider mb-2">
            <Gift size={12} /> Special Offer
          </div>
          <h2 className="text-2xl font-black leading-tight tracking-tight mt-1">
            Wait! Lock In Your <span className="text-[#29ABE2]">NSW Rebate</span> Today!
          </h2>
          <p className="text-white/70 text-xs mt-1.5 leading-relaxed">
            Claim up to <strong className="text-white font-extrabold">$3,500</strong> in government solar incentives. Lock in your discount and get a free custom solar design layout.
          </p>
        </div>

        {/* Form area */}
        <div className="p-5 sm:p-8">
          {status === "sent" ? (
            <div className="text-center py-6 space-y-4 animate-fade-in-up">
              <div className="w-16 h-16 bg-pe-green-light border border-pe-green/20 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <ShieldCheck size={36} className="text-pe-green" />
              </div>
              <div>
                <h3 className="text-lg font-black text-pe-navy">Rebate Eligibility Reserved!</h3>
                <p className="text-pe-gray-500 text-xs mt-1.5 px-4 leading-relaxed">
                  Excellent! We have reserved your rebate spot. A certified CEC Solar Expert will call you on <strong className="text-pe-navy font-bold font-mono">{formData.phone}</strong> in under 15 minutes to verify details and configure your free custom proposal design.
                </p>
              </div>
              <button 
                onClick={closePopup}
                className="btn-primary w-full py-3.5 rounded-xl font-bold text-sm shadow-md transition-all hover:scale-[1.01]"
              >
                Close &amp; Keep Browsing
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-pe-gray-600 mb-1.5 uppercase tracking-wide">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={set("name")}
                  className="w-full px-4 py-3 rounded-xl border border-pe-gray-200 focus:border-[#29ABE2] focus:outline-none text-pe-gray-900 text-sm font-medium transition-colors bg-pe-gray-50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-pe-gray-600 mb-1.5 uppercase tracking-wide">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0400 000 000"
                    value={formData.phone}
                    onChange={set("phone")}
                    className="w-full px-4 py-3 rounded-xl border border-pe-gray-200 focus:border-[#29ABE2] focus:outline-none text-pe-gray-900 text-sm font-medium transition-colors bg-pe-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-pe-gray-600 mb-1.5 uppercase tracking-wide">NSW Postcode</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2000"
                    maxLength={4}
                    value={formData.postcode}
                    onChange={set("postcode")}
                    className="w-full px-4 py-3 rounded-xl border border-pe-gray-200 focus:border-[#29ABE2] focus:outline-none text-pe-gray-900 text-sm font-medium transition-colors bg-pe-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-pe-gray-600 mb-1.5 uppercase tracking-wide">System Interest</label>
                <select
                  value={formData.interest}
                  onChange={set("interest")}
                  className="w-full px-4 py-3 rounded-xl border border-pe-gray-200 focus:border-[#29ABE2] focus:outline-none text-pe-gray-700 text-sm font-medium transition-colors bg-pe-gray-50"
                >
                  <option value="residential">Residential Solar (5kW - 13kW)</option>
                  <option value="battery">Solar battery storage only</option>
                  <option value="commercial">Commercial Solar (15kW - 100kW+)</option>
                  <option value="ev">EV Home &amp; Business Charging</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 rounded-xl font-bold text-white text-sm transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-2"
                style={{
                  background: "linear-gradient(135deg, #29ABE2, #0D5DB5)",
                  boxShadow: "0 8px 25px rgba(41,171,226,0.35)",
                }}
              >
                {status === "sending" ? "Locking in Rebate..." : "Lock In My Rebate Eligibility →"}
              </button>

              {status === "error" && (
                <p className="text-red-500 text-xs text-center font-bold">
                  Connection timed out. Please check your network and try again.
                </p>
              )}

              {/* Trust markers */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-pe-gray-400 font-bold uppercase tracking-widest pt-4 border-t border-pe-gray-100">
                <span className="flex items-center gap-1"><Award size={12} className="text-[#29ABE2]" /> CEC Retailer</span>
                <span>·</span>
                <span className="flex items-center gap-1"><PhoneCall size={12} className="text-[#29ABE2]" /> Call in 15m</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
