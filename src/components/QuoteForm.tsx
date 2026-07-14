"use client";
import { useState, useEffect } from "react";

interface QuoteFormProps {
  defaultPostcode?: string;
  defaultInterest?: string;
  defaultMessage?: string;
}

export default function QuoteForm({
  defaultPostcode = "",
  defaultInterest = "residential",
  defaultMessage = "",
}: QuoteFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    postcode: defaultPostcode,
    interest: defaultInterest,
    message: defaultMessage,
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const source = params.get("utm_source") || "";
      const medium = params.get("utm_medium") || "";
      const campaign = params.get("utm_campaign") || "";
      if (source || medium || campaign) {
        setFormData((d) => ({
          ...d,
          utmSource: source,
          utmMedium: medium,
          utmCampaign: campaign,
        }));
      }
    }
  }, []);

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorDetails, setErrorDetails] = useState<string>("");

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFormData((d) => ({ ...d, [field]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorDetails("");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
      const res = await fetch(`${apiUrl}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        if (errData.details && Array.isArray(errData.details)) {
          const msgs = errData.details.map((d: any) => d.message).join(", ");
          throw new Error(msgs);
        }
        throw new Error();
      }
      setStatus("sent");
    } catch (err: any) {
      setErrorDetails(err.message || "");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="text-center py-12 px-6">
        <div className="w-16 h-16 rounded-full bg-pe-green-light flex items-center justify-center mx-auto mb-4">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M8 16l6 6L24 10" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-pe-gray-900 mb-2">Quote Request Sent!</h3>
        <p className="text-pe-gray-500">We&apos;ll be in touch within 24 hours with your free solar quote.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-pe-gray-700 mb-1.5">Full Name *</label>
          <input
            type="text"
            required
            placeholder="John Smith"
            value={formData.name}
            onChange={set("name")}
            className="form-input"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-pe-gray-700 mb-1.5">Email *</label>
          <input
            type="email"
            required
            placeholder="john@example.com"
            value={formData.email}
            onChange={set("email")}
            className="form-input"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-pe-gray-700 mb-1.5">Phone *</label>
          <input
            type="tel"
            required
            placeholder="04XX XXX XXX"
            value={formData.phone}
            onChange={set("phone")}
            className="form-input"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-pe-gray-700 mb-1.5">Postcode *</label>
          <input
            type="text"
            required
            maxLength={4}
            placeholder="2000"
            value={formData.postcode}
            onChange={set("postcode")}
            className="form-input font-mono"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-pe-gray-700 mb-1.5">I&apos;m interested in *</label>
        <select value={formData.interest} onChange={set("interest")} className="form-input">
          <option value="residential">Residential Solar</option>
          <option value="commercial">Commercial Solar</option>
          <option value="battery">Solar Battery Storage</option>
          <option value="ev">EV Charger Installation</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-pe-gray-700 mb-1.5">Message (optional)</label>
        <textarea
          placeholder="Tell us about your home, current electricity bill, or any questions..."
          value={formData.message}
          onChange={set("message")}
          rows={3}
          className="form-input resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Get Your Free Quote →"}
      </button>

      {status === "error" && (
        <p className="text-red-500 text-sm text-center bg-red-50 rounded-lg p-3">
          {errorDetails ? `Validation error: ${errorDetails}` : "Something went wrong — please try again or call us on 1300 000 000."}
        </p>
      )}

      <p className="text-pe-gray-400 text-xs text-center">
        No obligation. Free quote. We respond within 24 hours.
      </p>
    </form>
  );
}
