"use client";
import { useState, useEffect, useRef } from "react";
import { X, PhoneCall, Sun, CheckCircle2 } from "lucide-react";

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    postcode: "",
    interest: "residential",
    email: "popup-lead@pylonenergy.com.au",
    message: "",
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const delay = Math.floor(12000 + Math.random() * 5000);
    timerRef.current = setTimeout(() => setIsOpen(true), delay);
  };

  useEffect(() => {
    const checkStatus = () => {
      const hasSubmitted = localStorage.getItem("pylon_submitted_lead_popup");
      const dismissedAt = localStorage.getItem("pylon_dismissed_lead_popup");
      if (hasSubmitted) return true;
      if (dismissedAt) {
        const oneDay = 24 * 60 * 60 * 1000;
        const parsedTime = parseInt(dismissedAt, 10);
        if (!isNaN(parsedTime) && Date.now() - parsedTime < oneDay) return true;
      }
      return false;
    };

    if (checkStatus()) return;
    startTimer();

    const handleMouseLeave = (e: MouseEvent) => {
      if (checkStatus()) return;
      if (e.clientY < 20) setIsOpen(true);
    };
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    localStorage.setItem("pylon_dismissed_lead_popup", Date.now().toString());
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((d) => ({ ...d, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
      const submissionData = {
        ...formData,
        message: `Popup lead — Interest: ${formData.interest}`,
      };
      const res = await fetch(`${apiUrl}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });
      if (res.ok) {
        setStatus("sent");
        localStorage.setItem("pylon_submitted_lead_popup", "true");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closePopup}
      />

      {/* Modal */}
      <div className="relative z-10 w-full sm:max-w-[440px] bg-white sm:rounded-2xl rounded-t-2xl overflow-hidden shadow-2xl">

        {/* Close */}
        <button
          onClick={closePopup}
          className="absolute right-4 top-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors"
          aria-label="Close"
        >
          <X size={15} className="text-white" />
        </button>

        {/* Header */}
        <div className="relative bg-[#002B5C] px-6 pt-7 pb-6 overflow-hidden">
          {/* Decorative sun */}
          <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-[#FF7029]/20 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF7029] via-[#FFB347] to-transparent opacity-60" />

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-[#FF7029]/15 rounded-xl flex items-center justify-center mt-0.5">
              <Sun size={20} className="text-[#FF7029]" />
            </div>
            <div>
              <p className="text-[#FFB347] text-xs font-semibold uppercase tracking-widest mb-1">
                Quick question before you go
              </p>
              <h2 className="text-white text-xl font-bold leading-snug">
                Thinking about going solar?<br />
                <span className="text-[#29ABE2]">We'll do the hard work for you.</span>
              </h2>
            </div>
          </div>

          <p className="text-white/60 text-sm mt-3 leading-relaxed pl-[52px]">
            Drop your number and one of our Sydney team will give you a straight-talking, no-pressure call — usually within the hour.
          </p>
        </div>

        {/* Form */}
        <div className="px-6 py-5">
          {status === "sent" ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={28} className="text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#002B5C]">You're all set!</h3>
                <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">
                  Thanks {formData.name.split(" ")[0]}! Someone from our team will call{" "}
                  <span className="font-semibold text-[#002B5C]">{formData.phone}</span> shortly.
                  <br />No spam, we promise.
                </p>
              </div>
              <button
                onClick={closePopup}
                className="mt-2 text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors"
              >
                Close this window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">

              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Your first name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah"
                  value={formData.name}
                  onChange={set("name")}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 focus:bg-white focus:border-[#29ABE2] focus:ring-4 focus:ring-[#29ABE2]/10 focus:outline-none transition-all"
                />
              </div>

              {/* Phone + Postcode */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Mobile number</label>
                  <input
                    type="tel"
                    required
                    placeholder="04xx xxx xxx"
                    value={formData.phone}
                    onChange={set("phone")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 focus:bg-white focus:border-[#29ABE2] focus:ring-4 focus:ring-[#29ABE2]/10 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Your postcode</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2000"
                    maxLength={4}
                    value={formData.postcode}
                    onChange={set("postcode")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 focus:bg-white focus:border-[#29ABE2] focus:ring-4 focus:ring-[#29ABE2]/10 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Interest — pill style */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">What are you interested in?</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { val: "residential", label: "Home Solar" },
                    { val: "battery", label: "Battery Storage" },
                    { val: "commercial", label: "Commercial" },
                    { val: "ev", label: "EV Charging" },
                  ].map((opt) => (
                    <label
                      key={opt.val}
                      className={`flex items-center justify-center py-2.5 px-3 rounded-xl border text-sm font-medium cursor-pointer transition-all ${
                        formData.interest === opt.val
                          ? "border-[#29ABE2] bg-[#29ABE2]/8 text-[#0D5DB5]"
                          : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="interest"
                        value={opt.val}
                        checked={formData.interest === opt.val}
                        onChange={set("interest")}
                        className="sr-only"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full mt-1 py-3.5 rounded-xl font-bold text-white text-sm bg-[#FF7029] hover:bg-[#e55f1a] active:scale-[0.98] transition-all duration-150 shadow-md shadow-[#FF7029]/20 flex items-center justify-center gap-2"
              >
                <PhoneCall size={15} />
                {status === "sending" ? "Submitting..." : "Get a free callback"}
              </button>

              {status === "error" && (
                <p className="text-red-500 text-xs text-center">
                  Something went wrong. Please try again or call us on 1300 001 598.
                </p>
              )}

              {/* Human trust line */}
              <p className="text-center text-xs text-gray-400 pt-1">
                🔒 No spam, no hard sell — just honest solar advice from our Sydney team.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
