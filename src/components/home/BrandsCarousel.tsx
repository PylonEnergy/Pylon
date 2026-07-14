const brands = [
  "Jinko Solar", "Trina Solar", "Sungrow", "Fronius", "Enphase",
  "GoodWe", "Growatt", "Tesla", "Alpha ESS", "Sigenergy", "Solax", "Solis",
];

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
      <div className="relative mb-4">
        <div className="flex gap-4 animate-scroll-left" style={{ width: "max-content" }}>
          {all.map((brand, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-6 py-3 rounded-xl bg-white border border-pe-gray-200 text-pe-navy font-bold text-sm shadow-sm hover:bg-[#29ABE2] hover:text-white hover:border-[#29ABE2] transition-all cursor-default whitespace-nowrap"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — right (reverse direction) */}
      <div className="relative">
        <div
          className="flex gap-4"
          style={{
            width: "max-content",
            animation: "scroll-left 35s linear infinite reverse",
          }}
        >
          {[...all].reverse().map((brand, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-6 py-3 rounded-xl bg-white border border-pe-gray-200 text-pe-gray-600 font-semibold text-sm shadow-sm hover:bg-[#002B5C] hover:text-white hover:border-[#002B5C] transition-all cursor-default whitespace-nowrap"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
