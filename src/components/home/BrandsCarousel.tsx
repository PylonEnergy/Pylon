const brands = [
  "Jinko Solar", "Trina Solar", "Sungrow", "Fronius", "Enphase",
  "GoodWe", "Growatt", "Tesla", "Alpha ESS", "Sigenergy", "Solax", "Solis",
];

function renderBrandLogo(brand: string) {
  switch (brand) {
    case "Tesla":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#E31937]" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5.362l2.475-3.026s4.245.09 8.471 2.054c-1.082 1.636-3.231 2.438-3.231 2.438-.146-1.439-1.154-1.79-4.354-1.79L12 24 8.619 5.034c-3.18 0-4.188.354-4.335 1.792 0 0-2.146-.795-3.229-2.43C5.28 2.431 9.525 2.34 9.525 2.34L12 5.362l-.004.002H12v-.002zm0-3.899c3.415-.03 7.326.528 11.328 2.28" />
        </svg>
      );
    case "Enphase":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#F37321" />
          <path d="M12 6a6 6 0 0 0-6 6c0 3.31 2.69 6 6 6h4v-2.5h-4a3.5 3.5 0 0 1-3.5-3.5c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5v1h-5v2h7v-3a6 6 0 0 0-6-6z" fill="#FFFFFF" />
        </svg>
      );
    case "Sungrow":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#FF7029" />
          <path d="M12 4a8 8 0 0 0-8 8h16a8 8 0 0 0-8-8z" fill="#FFFFFF" opacity="0.25" />
          <path d="M12 4v16M4 12h16" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" fill="#FF7029" />
          <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" />
        </svg>
      );
    case "Jinko Solar":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 3C6.58 3 3 6.58 3 11c0 3.18 1.86 5.92 4.56 7.22l1.24-2.15C6.98 15.22 6 13.23 6 11c0-2.76 2.24-5 5-5V3z" fill="#4CAF50" />
          <path d="M9 3v3c-1.66 0-3 1.34-3 3H3c0-3.31 2.69-6 6-6z" fill="#4CAF50" />
          <path d="M13 3v3c2.76 0 5 2.24 5 5c0 2.23-.98 4.22-2.8 6.07l1.24 2.15C19.14 16.92 21 14.18 21 11c0-4.42-3.58-8-8-8z" fill="#FF7029" />
          <path d="M15 3c3.31 0 6 2.69 6 6h-3c0-1.66-1.34-3-3-3V3z" fill="#FF7029" />
        </svg>
      );
    case "Trina Solar":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#005A9C" strokeWidth="2" />
          <path d="M5 12c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="#29ABE2" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4" fill="#005A9C" />
          <path d="M12 12c0 2.21-1.79 4-4 4s-4-1.79-4-4" fill="#29ABE2" />
        </svg>
      );
    case "Growatt":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 18h18" stroke="#00B050" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M12 18V9c0-3.5 2.5-6 6-6-2.5 1.5-3.5 4-3.5 7v8" stroke="#00B050" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M12 14c-2.5-1.5-3.5-4-3.5-7C8.5 3.5 11 2 11 2v12" stroke="#00B050" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "Fronius":
      return (
        <svg viewBox="0 0 34 12" className="w-9 h-3.5" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="10" fill="#E30613" fontSize="9.5" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.03em">FRONIUS</text>
        </svg>
      );
    case "GoodWe":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#E2001A" />
          <path d="M12 6a6 6 0 1 0 6 6h-2a4 4 0 1 1-4-4V6z" fill="#FFFFFF" />
          <circle cx="12" cy="12" r="2" fill="#FFFFFF" />
        </svg>
      );
    case "Alpha ESS":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z" fill="#0D5DB5" />
          <path d="M9 14.5l3-6 3 6M10.5 12h3" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "Sigenergy":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#00A896" />
          <path d="M8.5 14.5c0-1.5 2-2 3.5-2.5s3.5-1 3.5-2.5c0-1.5-1.5-2-3.5-2S8.5 8.5 8.5 10" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="15.5" cy="14.5" r="1.5" fill="#FFFFFF" />
        </svg>
      );
    case "Solax":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#E30613" />
          <path d="M8 8l8 8M16 8L8 16" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M4 12c0-4.42 3.58-8 8-8" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
        </svg>
      );
    case "Solis":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="5" fill="#FF8C00" />
          <path d="M12 2l1.5 3h-3zM12 22l1.5-3h-3zM2 12l3 1.5v-3zM22 12l-3 1.5v-3z" fill="#FF8C00" />
          <path d="M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2 2" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function BrandsCarousel() {
  // Duplicate for seamless loop
  const all = [...brands, ...brands];

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <p className="section-label mx-auto justify-center" style={{ color: '#29ABE2' }}>TRUSTED BRANDS</p>
        <h2 className="section-title">Solar Brands &amp; Inverter Brands We Install</h2>
      </div>

      {/* Row 1 — left */}
      <div className="relative mb-6">
        <div className="flex gap-5 animate-scroll-left" style={{ width: "max-content" }}>
          {all.map((brand, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white border border-slate-100 text-pe-navy font-bold text-sm shadow-[0_4px_15px_rgba(0,43,92,0.03)] hover:border-[#29ABE2] hover:shadow-[0_8px_25px_rgba(41,171,226,0.08)] transition-all duration-300 cursor-default whitespace-nowrap"
            >
              {renderBrandLogo(brand)}
              <span>{brand}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — right (reverse direction) */}
      <div className="relative">
        <div
          className="flex gap-5"
          style={{
            width: "max-content",
            animation: "scroll-left 35s linear infinite reverse",
          }}
        >
          {[...all].reverse().map((brand, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white border border-slate-100 text-pe-gray-600 font-bold text-sm shadow-[0_4px_15px_rgba(0,43,92,0.03)] hover:border-[#002B5C] hover:shadow-[0_8px_25px_rgba(0,43,92,0.06)] transition-all duration-300 cursor-default whitespace-nowrap"
            >
              {renderBrandLogo(brand)}
              <span>{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
