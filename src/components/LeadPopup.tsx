"use client";
import { useState, useEffect, useRef } from "react";
import { X, Gift, Zap, PhoneCall, Award, ShieldCheck, User, MapPin, ChevronDown, Sparkles, ArrowRight } from "lucide-react";


export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    postcode: "",
    interest: "residential",
    email: "popup-lead@pylonenergy.com.au", // placeholder to satisfy schema
    message: "", // start empty for custom user enquiry
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Starts a randomized 10 to 15 seconds timer to open the modal
  const startTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const delay = Math.floor(10000 + Math.random() * 5000); // 10s - 15s
    timerRef.current = setTimeout(() => {
      setIsOpen(true);
    }, delay);
  };

  useEffect(() => {
    // 1. Initial timer schedule
    startTimer();

    // 2. Set Exit Intent Trigger (Mouse leaving window)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20) {
        setIsOpen(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    // Restart timer to pop up again in 10-15 seconds if not successfully submitted yet
    if (status !== "sent") {
      startTimer();
    }
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((d) => ({ ...d, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
      
      // Fallback to default tracker description if message is empty
      const submissionData = {
        ...formData,
        message: formData.message.trim() || "Submitted via Exit Intent / Timer Promo Pop-up modal",
      };

      const res = await fetch(`${apiUrl}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
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
      {/* Backdrop with premium blur */}
      <div 
        className="absolute inset-0 bg-[#001229]/65 backdrop-blur-md transition-opacity duration-300"
        onClick={closePopup}
      />

      {/* Modal Container */}
      <div 
        className="relative z-10 w-full max-w-[480px] bg-white rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,18,41,0.18)] animate-fade-in-up border border-pe-gray-100"
      >
        {/* Close Button */}
        <button 
          onClick={closePopup}
          className="absolute right-4 top-4 text-white/60 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-20 cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Promo Header Banner */}
        <div className="bg-gradient-to-br from-[#002B5C] via-[#001E42] to-[#001530] text-white px-6 py-8 sm:px-8 sm:py-9 relative overflow-hidden">
          {/* Subtle design blobs for depth */}
          <div className="absolute top-[-50px] right-[-50px] w-36 h-36 bg-[#29ABE2] opacity-15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-[-40px] left-[-30px] w-28 h-28 bg-[#FF7029] opacity-10 rounded-full blur-xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-1.5 bg-[#29ABE2]/10 border border-[#29ABE2]/20 px-3 py-1 rounded-full text-[10px] font-bold text-[#29ABE2] uppercase tracking-wider mb-3">
            <Sparkles size={11} className="animate-pulse" /> Special Offer
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight mt-1">
            Wait! Lock In Your <span className="bg-gradient-to-r from-[#29ABE2] to-[#60c4f1] bg-clip-text text-transparent font-black">NSW Rebate</span> Today!
          </h2>
          <p className="text-white/70 text-xs sm:text-sm mt-2 leading-relaxed">
            Claim up to <strong className="text-white font-bold">$3,500</strong> in government solar incentives. Lock in your discount and get a free custom solar design layout.
          </p>
        </div>

        {/* Form area */}
        <div className="p-6 sm:p-8">
          {status === "sent" ? (
            <div className="text-center py-6 space-y-5 animate-fade-in-up">
              <div className="w-16 h-16 bg-pe-green/10 border border-pe-green/20 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <ShieldCheck size={32} className="text-pe-green" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-pe-navy">Rebate Eligibility Reserved!</h3>
                <p className="text-pe-gray-500 text-sm px-2 leading-relaxed">
                  Excellent! We have reserved your rebate spot. A certified CEC Solar Expert will call you on <strong className="text-pe-navy font-semibold font-mono">{formData.phone}</strong> in under 15 minutes to configure your free custom proposal design.
                </p>
              </div>
              <button 
                onClick={closePopup}
                className="w-full py-3.5 rounded-xl font-bold text-white text-sm bg-pe-navy hover:bg-pe-navy-dark transition-all duration-200 cursor-pointer shadow-md"
              >
                Close &amp; Keep Browsing
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Your Name */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-pe-navy/60 uppercase tracking-wider">Your Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-pe-gray-400 group-focus-within:text-[#29ABE2] transition-colors">
                    <User size={16} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={set("name")}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-pe-gray-200/80 bg-pe-gray-50/30 text-pe-gray-900 text-sm font-medium placeholder-pe-gray-400 focus:bg-white focus:border-[#29ABE2] focus:ring-4 focus:ring-[#29ABE2]/8 focus:outline-none transition-all duration-200"
                  />
                </div>
              </div>

              {/* Mobile & Postcode grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-pe-navy/60 uppercase tracking-wider">Mobile Number</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-pe-gray-400 group-focus-within:text-[#29ABE2] transition-colors">
                      <PhoneCall size={15} />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="0400 000 000"
                      value={formData.phone}
                      onChange={set("phone")}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-pe-gray-200/80 bg-pe-gray-50/30 text-pe-gray-900 text-sm font-medium placeholder-pe-gray-400 focus:bg-white focus:border-[#29ABE2] focus:ring-4 focus:ring-[#29ABE2]/8 focus:outline-none transition-all duration-200"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-pe-navy/60 uppercase tracking-wider">NSW Postcode</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-pe-gray-400 group-focus-within:text-[#29ABE2] transition-colors">
                      <MapPin size={16} />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="2000"
                      maxLength={4}
                      value={formData.postcode}
                      onChange={set("postcode")}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-pe-gray-200/80 bg-pe-gray-50/30 text-pe-gray-900 text-sm font-medium placeholder-pe-gray-400 focus:bg-white focus:border-[#29ABE2] focus:ring-4 focus:ring-[#29ABE2]/8 focus:outline-none transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Vertical Enquiry Message Field (below Zipcode Grid) */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-pe-navy/60 uppercase tracking-wider">Your Enquiry</label>
                <div className="relative group">
                  <textarea
                    placeholder="Describe your enquiry (e.g. system size, roof details, special requests)..."
                    value={formData.message}
                    onChange={set("message")}
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl border border-pe-gray-200/80 bg-pe-gray-50/30 text-pe-gray-900 text-sm font-medium placeholder-pe-gray-400 focus:bg-white focus:border-[#29ABE2] focus:ring-4 focus:ring-[#29ABE2]/8 focus:outline-none transition-all duration-200 resize-none"
                  />
                </div>
              </div>

              {/* System Interest Select */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-pe-navy/60 uppercase tracking-wider">System Interest</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94a3b8] group-focus-within:text-[#29ABE2] transition-colors">
                    <Zap size={16} />
                  </div>
                  <select
                    value={formData.interest}
                    onChange={set("interest")}
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-pe-gray-200/80 bg-pe-gray-50/30 text-pe-gray-700 text-sm font-medium focus:bg-white focus:border-[#29ABE2] focus:ring-4 focus:ring-[#29ABE2]/8 focus:outline-none appearance-none transition-all duration-200 cursor-pointer"
                  >
                    <option value="residential">Residential Solar (5kW - 13kW)</option>
                    <option value="battery">Solar battery storage only</option>
                    <option value="commercial">Commercial Solar (15kW - 100kW+)</option>
                    <option value="ev">EV Home &amp; Business Charging</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#94a3b8] group-focus-within:text-[#29ABE2] transition-colors">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="group relative w-full py-4 rounded-xl font-bold text-white text-sm overflow-hidden bg-gradient-to-r from-[#29ABE2] to-[#0D5DB5] shadow-lg shadow-[#29ABE2]/20 hover:shadow-xl hover:shadow-[#29ABE2]/30 hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#32bcf7] to-[#005bc4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-1.5">
                  {status === "sending" ? "Locking in Rebate..." : "Lock In My Rebate Eligibility"}
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </span>
              </button>

              {status === "error" && (
                <p className="text-red-500 text-xs text-center font-bold">
                  Connection timed out. Please check your network and try again.
                </p>
              )}

              {/* Trust markers */}
              <div className="flex items-center justify-center gap-6 text-[10px] text-pe-navy/40 font-bold uppercase tracking-wider pt-5 mt-2 border-t border-pe-gray-100">
                <span className="flex items-center gap-1.5"><Award size={13} className="text-[#29ABE2]" /> CEC Retailer</span>
                <span className="w-1.5 h-1.5 rounded-full bg-pe-gray-200" />
                <span className="flex items-center gap-1.5"><PhoneCall size={13} className="text-[#29ABE2]" /> Callback in 15m</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
