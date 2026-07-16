const brands = [
  "Jinko Solar", "Trina Solar", "Sungrow", "Fronius", "Enphase",
  "GoodWe", "Growatt", "Tesla", "Alpha ESS", "Sigenergy", "Solax", "Solis",
];

function renderBrandLogo(brand: string) {
  switch (brand) {
    case "Jinko Solar":
      return (
        <svg viewBox="0 0 160 35" className="h-8 w-auto" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5c-3.8 0-7 3-7 6.8 0 5 7 11.2 7 11.2s7-6.2 7-11.2c0-3.8-3.2-6.8-7-6.8z" fill="#009B4E" />
          <path d="M19 10c-3 0-5.5 2.5-5.5 5.5 0 4 5.5 9 5.5 9s5.5-5 5.5-9c0-3-2.5-5.5-5.5-5.5z" fill="#FF6D00" opacity="0.9" />
          <text x="32" y="24" fill="#002B5C" fontSize="19" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="-0.02em">JinkoSolar</text>
        </svg>
      );
    case "Trina Solar":
      return (
        <svg viewBox="0 0 160 35" className="h-8 w-auto" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 24L16 6l10 18H6z" fill="#005AAB" />
          <path d="M12 24c4.4-4.5 4.4-11.5 0-16l-3.5 6.3c1.9 2.5 1.9 6.8 0 9.7h3.5z" fill="#00A0E9" />
          <text x="34" y="23" fill="#005AAB" fontSize="17" fontWeight="900" fontFamily="system-ui, sans-serif">Trina Solar</text>
        </svg>
      );
    case "Sungrow":
      return (
        <svg viewBox="0 0 160 30" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="22" height="22" rx="4" fill="#E45D1C" />
          <path d="M15 8v14M8 15h14" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="15" cy="15" r="3.5" fill="#FFFFFF" />
          <text x="36" y="22" fill="#E45D1C" fontSize="18" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.04em">SUNGROW</text>
        </svg>
      );
    case "Fronius":
      return (
        <svg viewBox="0 0 140 28" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
          <g transform="skewX(-12)">
            <text x="2" y="22" fill="#E30613" fontSize="22" fontWeight="950" fontFamily="'Arial Black', sans-serif" letterSpacing="0.05em">Fronius</text>
          </g>
        </svg>
      );
    case "Enphase":
      return (
        <svg viewBox="0 0 160 30" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15" cy="15" r="11" fill="#FF5000" />
          <path d="M15 8c-3.9 0-7 3.1-7 7s3.1 7 7 7h5v-3h-5c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4v1h-5v2h7v-3c0-3.9-3.1-7-7-7z" fill="#FFFFFF" />
          <text x="36" y="22" fill="#1A1A1A" fontSize="18" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="0.05em">ENPHASE</text>
        </svg>
      );
    case "GoodWe":
      return (
        <svg viewBox="0 0 150 30" className="h-7 w-auto" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15" cy="15" r="11" fill="#E30613" />
          <path d="M19 15a4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4h4V9h-4c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6v-1h-6v1h4z" fill="#FFFFFF" />
          <text x="36" y="22" fill="#E30613" fontSize="19" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.02em">GOODWE</text>
        </svg>
      );
    case "Growatt":
      return (
        <svg viewBox="0 0 150 30" className="h-7 w-auto" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6c-3.5 0-6.5 3-6.5 6.5s3 6.5 6.5 6.5c2.5 0 4.5-1.5 5.5-3.5h-5.5v-2h8v5.5H23V18c-1.5 2-4 3.5-7 3.5-5.2 0-9.5-4.3-9.5-9.5S10.8 2.5 16 2.5c4.5 0 8.2 3.1 9.2 7.5H23c-1-3-3.8-5-7-5z" fill="#8DC63F" />
          <text x="34" y="21" fill="#111111" fontSize="18" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="-0.02em">Growatt</text>
        </svg>
      );
    case "Tesla":
      return (
        <svg viewBox="0 0 150 28" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5.5c1.8-.7 3.4-1.2 5.5-1.4-.8.8-1.5 1.8-1.5 3 0 1.2.7 2.2 1.5 3-2.1-.2-3.7-.7-5.5-1.4v11.8h-2.5V8.7C7.7 9.4 6.1 9.9 4 10.1c.8-.8 1.5-1.8 1.5-3 0-1.2-.7-2.2-1.5-3 2.1.2 3.7.7 5.5 1.4V5.5zm0-2.5c3.2 0 6-.3 8.3-.9a10.8 10.8 0 0 1-3.3 3.6C15.2 5.3 13.7 5 12 5s-3.2.3-5 .7c-1.1-1-2.2-2.3-3.3-3.6 2.3.6 5.1.9 8.3.9z" fill="#E31937" />
          <text x="36" y="21" fill="#E31937" fontSize="17" fontWeight="950" fontFamily="system-ui, sans-serif" letterSpacing="0.28em">TESLA</text>
        </svg>
      );
    case "Alpha ESS":
      return (
        <svg viewBox="0 0 160 30" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
          <polygon points="15,4 26,10 26,22 15,28 4,22 4,10" fill="#0E3E8C" />
          <path d="M11 20l4-7 4 7M12.5 17.5h5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <text x="36" y="22" fill="#0E3E8C" fontSize="17" fontWeight="900" fontFamily="system-ui, sans-serif">Alpha·ESS</text>
        </svg>
      );
    case "Sigenergy":
      return (
        <svg viewBox="0 0 160 30" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15" cy="15" r="11" fill="#00A896" />
          <path d="M12 9c2-1 4.5.5 4.5 2.5s-2 2-3.5 2.5-3.5.5-3.5 2.5 2.5 3 4.5 2" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />
          <text x="36" y="21" fill="#111111" fontSize="17" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.05em">SIGENERGY</text>
        </svg>
      );
    case "Solax":
      return (
        <svg viewBox="0 0 140 30" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15" cy="15" r="11" fill="#E30613" />
          <path d="M10 10l10 10M20 10L10 20" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <text x="36" y="22" fill="#E30613" fontSize="19" fontWeight="900" fontFamily="system-ui, sans-serif">SolaX</text>
        </svg>
      );
    case "Solis":
      return (
        <svg viewBox="0 0 140 30" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15" cy="15" r="9" fill="#FF8C00" />
          <circle cx="15" cy="15" r="5" fill="#FFFFFF" />
          <path d="M15 2v4M15 24v4M2 15h4M24 15h4" stroke="#FF8C00" strokeWidth="2" />
          <text x="36" y="21" fill="#2D2D2D" fontSize="19" fontWeight="800" fontFamily="system-ui, sans-serif">Solis</text>
        </svg>
      );
    default:
      return null;
  }
}

export default function BrandsCarousel() {
  const all = [...brands, ...brands];

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <p className="section-label mx-auto justify-center" style={{ color: '#29ABE2' }}>TRUSTED BRANDS</p>
        <h2 className="section-title">Solar Brands &amp; Inverter Brands We Install</h2>
      </div>

      <div className="relative">
        <div className="flex gap-6 animate-scroll-left items-center py-4 px-2" style={{ width: "max-content" }}>
          {all.map((brand, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center px-8 py-5 rounded-2xl bg-white border-2 border-[#E2E8F0] shadow-sm hover:border-[#29ABE2] transition-all duration-300 cursor-default"
            >
              {renderBrandLogo(brand)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
