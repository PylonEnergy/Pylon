"use client";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Sarah M.",
    suburb: "Parramatta, NSW",
    text: "Excellent service from start to finish. Our 10kW system was installed in one day and we're already seeing huge savings on our electricity bills. The team was professional and left everything spotless.",
    rating: 5,
    savings: "$180/mth saved",
  },
  {
    name: "David L.",
    suburb: "Penrith, NSW",
    text: "The team at Pylon Energy made going solar incredibly easy. Very professional and great communication throughout. They handled all the paperwork and rebates — couldn't be happier.",
    rating: 5,
    savings: "$210/mth saved",
  },
  {
    name: "Michelle & James K.",
    suburb: "Blacktown, NSW",
    text: "Best decision we ever made. Our electricity bills dropped by 85% after installing the 13kW system with battery storage. The monitoring app is great too — love seeing how much we generate each day.",
    rating: 5,
    savings: "$320/mth saved",
  },
  {
    name: "Robert T.",
    suburb: "Campbelltown, NSW",
    text: "Great value packages and the installers were very neat and tidy. Highly recommend Pylon Energy to anyone considering solar. The $0 finance option made it very accessible.",
    rating: 5,
    savings: "$145/mth saved",
  },
  {
    name: "Linda P.",
    suburb: "Liverpool, NSW",
    text: "Professional team, quality products, and amazing after-sales support. They came back to check on the system 2 weeks after installation to make sure everything was perfect. Couldn't ask for more.",
    rating: 5,
    savings: "$190/mth saved",
  },
];

export default function CustomerReviews() {
  return (
    <section id="reviews" className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ background: "#E8F7FD", color: "#1A8CBD" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#29ABE2]" />
            Customer Reviews
          </div>

          <h2 className="section-title">
            Real Customers.{" "}
            <span style={{ color: "#29ABE2" }}>Real Savings.</span>
          </h2>

          {/* Rating badge — inspired by Arise Solar */}
          <div
            className="inline-flex flex-col sm:flex-row items-center gap-4 mt-6 px-6 py-4 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, #001A3A, #002B5C)",
              boxShadow: "0 10px 40px rgba(0,43,92,0.2)",
            }}
          >
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-white/60 text-xs">1,000+ Verified Reviews</p>
            </div>
            <div className="w-px h-10 bg-white/15 hidden sm:block" />
            <div className="text-center sm:text-left">
              <p className="text-4xl font-black text-white leading-none">4.9</p>
              <p className="text-[#29ABE2] text-xs font-semibold mt-0.5">Google Rating</p>
            </div>
            <div className="w-px h-10 bg-white/15 hidden sm:block" />
            <div className="text-center sm:text-left">
              <p className="text-white font-bold text-sm">Verified Reviews on</p>
              <p className="text-[#29ABE2] text-xs font-semibold">Google • ProductReview.com.au</p>
            </div>
          </div>
        </div>

        {/* Review cards scroll */}
        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="flex-none w-[300px] sm:w-[340px] rounded-2xl p-6 snap-center group transition-all duration-300 hover:-translate-y-2"
              style={{
                background: "white",
                border: "1.5px solid #E2E8F0",
                boxShadow: "0 4px 20px rgba(0,43,92,0.06)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#29ABE2";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 20px 50px rgba(41,171,226,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#E2E8F0";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 4px 20px rgba(0,43,92,0.06)";
              }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-0.5">
                  {[...Array(r.rating)].map((_, j) => (
                    <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <Quote size={18} className="text-[#29ABE2]/30 flex-shrink-0" />
              </div>

              {/* Savings badge */}
              <div
                className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold mb-4"
                style={{ background: "#E8F7FD", color: "#1A8CBD" }}
              >
                💰 {r.savings}
              </div>

              {/* Quote */}
              <p className="text-pe-gray-600 text-sm leading-relaxed mb-5 italic">
                &ldquo;{r.text}&rdquo;
              </p>

              {/* Author */}
              <div className="border-t border-gray-100 pt-4 flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #29ABE2, #0D5DB5)" }}
                >
                  {r.name[0]}
                </div>
                <div>
                  <p className="font-bold text-pe-gray-900 text-sm">{r.name}</p>
                  <p className="text-pe-gray-400 text-xs">{r.suburb}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
