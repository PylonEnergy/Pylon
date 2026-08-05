"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Download, ExternalLink, Image as ImageIcon, Eye, X, ChevronLeft, ChevronRight, Zap } from "lucide-react";

type Product = {
  _id: string;
  name: string;
  brand: string;
  category: "panel" | "inverter" | "battery" | "other";
  description: string;
  specs: Record<string, string>;
  image?: string;
  datasheet?: string;
  installImages?: string[];
};

const MOCK_PRODUCTS: Product[] = [
  {
    _id: "mock-1",
    name: "Tiger Neo N-type 440W",
    brand: "Jinko Solar",
    category: "panel",
    description: "N-Type high efficiency monocrystalline solar panel featuring Tiger Neo technology for superior low-light performance.",
    specs: {
      "Max Power": "440W",
      "Efficiency": "22.02%",
      "Product Warranty": "25 Years",
      "Type": "N-Type Monocrystalline",
    },
    image: "/jinko-tiger-neo.png",
  },
  {
    _id: "mock-2",
    name: "Powerwall 3",
    brand: "Tesla",
    category: "battery",
    description: "All-in-one home energy storage system with integrated solar inverter and full home backup capabilities.",
    specs: {
      "Usable Capacity": "13.5 kWh",
      "Real Power": "11.5 kW",
      "Warranty": "10 Years",
      "System Type": "AC Coupled",
    },
    image: "/tesla-powerwall-3.jpg",
  },
  {
    _id: "mock-3",
    name: "SG10RT Premium Hybrid",
    brand: "Sungrow",
    category: "inverter",
    description: "Three-phase hybrid inverter with built-in backup power function and high efficiency solar conversion.",
    specs: {
      "Max PV Power": "15,000 W",
      "Rated AC Power": "10,000 W",
      "Max Efficiency": "98.2%",
      "Phase": "3-Phase",
    },
    image: "/sungrow-inverter.png",
  },
  {
    _id: "mock-4",
    name: "Smile5 10.1kWh",
    brand: "Alpha ESS",
    category: "battery",
    description: "Modular and expandable residential battery storage system using cobalt-free LFP chemistry.",
    specs: {
      "Capacity": "10.1 kWh",
      "Max Output": "5,000 W",
      "Warranty": "10 Years",
      "Battery Type": "LFP (LiFePO4)",
    },
    image: "/alpha-ess-smile5-home.jpg",
  },
  {
    _id: "mock-5",
    name: "SigenStor",
    brand: "Sigenergy",
    category: "battery",
    description: "5-in-1 energy storage system integrating PV inverter, battery storage, DC charger, and EMS.",
    specs: {
      "Capacity": "5.0 - 25.0 kWh",
      "Max Charging Power": "25 kW",
      "Warranty": "10 Years",
      "Protection": "IP66 Rated",
    },
    image: "/sigenergy-sigenstor-home.jpg",
  },
  {
    _id: "mock-6",
    name: "HM12 Home Battery System",
    brand: "ESY",
    category: "battery",
    description: "Premium all-in-one residential energy storage solution with modular design and high efficiency.",
    specs: {
      "Capacity": "12.0 kWh",
      "System Output": "12.0 kW",
      "Warranty": "10 Years",
      "Chemistry": "Lithium Iron Phosphate",
    },
    image: "/esy-battery-home.jpg",
  }
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  // Lightbox state
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const apiHost = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
        const res = await fetch(`${apiHost}/api/products`);
        if (res.ok) {
          const data = await res.json();
          const list = data.products || [];
          if (list.length > 0) {
            setProducts(list);
          } else {
            setProducts(MOCK_PRODUCTS);
          }
        } else {
          setProducts(MOCK_PRODUCTS);
        }
      } catch (err) {
        console.error("Failed to load products:", err);
        setProducts(MOCK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter(p => p.category === activeCategory);

  const categories = [
    { id: "all", label: "All Products" },
    { id: "panel", label: "Solar Panels" },
    { id: "inverter", label: "Inverters" },
    { id: "battery", label: "Battery Storage" },
    { id: "other", label: "Other" },
  ];

  // Helper to trigger datasheet download
  const handleDownloadDatasheet = (product: Product) => {
    if (product.datasheet && product.datasheet.startsWith("data:")) {
      const link = document.createElement("a");
      link.href = product.datasheet;
      let ext = "pdf";
      if (product.datasheet.includes("image/png")) ext = "png";
      else if (product.datasheet.includes("image/jpeg")) ext = "jpg";
      link.download = `${product.brand.replace(/\s+/g, "_")}_${product.name.replace(/\s+/g, "_")}_datasheet.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (product.datasheet && (product.datasheet.startsWith("http") || product.datasheet.startsWith("/"))) {
      window.open(product.datasheet, "_blank");
    } else {
      // Generate official technical datasheet print window
      const printWin = window.open("", "_blank");
      if (printWin) {
        printWin.document.write(`
          <html>
            <head>
              <title>${product.brand} - ${product.name} Technical Datasheet | Pylon Energy</title>
              <style>
                body { font-family: 'Outfit', Arial, sans-serif; padding: 40px; color: #002B5C; line-height: 1.6; }
                .header { border-bottom: 3px solid #29ABE2; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
                h1 { font-size: 28px; margin: 0; color: #002B5C; }
                .badge { background: #E8F7FD; color: #29ABE2; padding: 6px 14px; border-radius: 20px; font-weight: bold; font-size: 12px; text-transform: uppercase; }
                .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 30px; }
                .spec-box { background: #F8FAFC; border: 1px solid #E2E8F0; padding: 15px 20px; border-radius: 12px; }
                .spec-label { color: #64748B; font-size: 12px; font-weight: bold; text-transform: uppercase; }
                .spec-val { color: #002B5C; font-size: 16px; font-weight: bold; margin-top: 4px; }
                .footer { margin-top: 50px; border-top: 1px solid #E2E8F0; pt: 20px; font-size: 12px; color: #64748B; text-align: center; }
              </style>
            </head>
            <body>
              <div class="header">
                <div>
                  <span class="badge">${product.brand}</span>
                  <h1>${product.name}</h1>
                </div>
                <div style="text-align: right;">
                  <strong style="color: #FF7029; font-size: 18px;">PYLON ENERGY</strong><br/>
                  <small>CEC Approved Solar Installer</small>
                </div>
              </div>
              <p><strong>Product Category:</strong> ${product.category.toUpperCase()}</p>
              <p>${product.description}</p>
              <h2 style="margin-top: 30px; font-size: 18px; border-bottom: 2px solid #002B5C; padding-bottom: 8px;">Technical Specifications</h2>
              <div class="grid">
                ${Object.entries(product.specs || {}).map(([k, v]) => `
                  <div class="spec-box">
                    <div class="spec-label">${k}</div>
                    <div class="spec-val">${v}</div>
                  </div>
                `).join('')}
              </div>
              <div class="footer">
                © 2026 Pylon Energy Pty Ltd · 1300 001 598 · info@pylonenergy.com.au · Sydney NSW Australia
              </div>
              <script>window.print();</script>
            </body>
          </html>
        `);
        printWin.document.close();
      }
    }
  };

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <PageHero
        title="Premium Solar & Battery Products"
        subtitle="We only source and install Tier-1 components from world-leading solar manufacturers with industry-leading warranties."
        breadcrumbs={[{ label: "Products" }]}
      />

      <section className="section-padding bg-pe-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm border transition-all ${
                  activeCategory === cat.id
                    ? "bg-pe-navy text-white border-pe-navy shadow-sm"
                    : "bg-white text-pe-gray-600 border-pe-gray-200 hover:border-pe-navy hover:text-pe-navy"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Skeleton loader — shows while products are fetching */}
          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm p-8 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="skeleton h-6 w-24 rounded-full" />
                    <div className="skeleton h-5 w-20 rounded-full" />
                  </div>
                  <div className="skeleton h-7 w-3/4" />
                  <div className="skeleton h-44 w-full rounded-2xl" />
                  <div className="space-y-2">
                    <div className="skeleton h-3 w-full" />
                    <div className="skeleton h-3 w-5/6" />
                    <div className="skeleton h-3 w-4/6" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="skeleton h-10 rounded-xl" />
                    <div className="skeleton h-10 rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-pe-gray-200 max-w-2xl mx-auto p-8 shadow-sm">
              <Zap className="mx-auto text-pe-gray-300 mb-4" size={48} />
              <p className="text-pe-navy font-black text-lg">No products found</p>
              <p className="text-pe-gray-400 text-sm mt-1">There are no products in this category at the moment. Check back soon or visit the Admin dashboard to add products.</p>
            </div>
          ) : (
            /* Products Grid */
            <div className="grid md:grid-cols-2 gap-8">
              {filteredProducts.map((p) => (
                <div key={p._id} className="product-card bg-white rounded-3xl border border-pe-gray-200 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-card transition-all duration-300">
                  <div className="p-6 sm:p-8 space-y-6">
                    {/* Header: Brand & Category */}
                    <div className="flex items-center justify-between gap-4">
                      <span className="px-3 py-1 bg-pe-navy/5 text-pe-navy rounded-full text-xs font-black uppercase tracking-wider">
                        {p.brand}
                      </span>
                      <span className="px-2.5 py-1 bg-pe-cyan/10 text-pe-cyan rounded-full text-[10px] font-black uppercase tracking-widest">
                        {p.category === "panel" ? "Solar Panel" :
                         p.category === "inverter" ? "Inverter" :
                         p.category === "battery" ? "Battery Storage" :
                         "Accessory"}
                      </span>
                    </div>

                    {/* Image & Title */}
                    <div className="grid sm:grid-cols-5 gap-6 items-start">
                      <div className="product-image-container sm:col-span-2 rounded-2xl overflow-hidden border border-pe-gray-100 bg-pe-gray-50 aspect-square flex items-center justify-center relative shadow-inner">
                        {p.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={
                              p.brand.toLowerCase().includes("jinko") ? "/jinko-tiger-neo.png" :
                              p.brand.toLowerCase().includes("tesla") ? "/tesla-powerwall-3.jpg" :
                              p.brand.toLowerCase().includes("sungrow") ? "/sungrow-inverter.png" :
                              p.brand.toLowerCase().includes("alpha") ? "/alpha-ess-smile5-home.jpg" :
                              p.brand.toLowerCase().includes("sigenergy") ? "/sigenergy-sigenstor-home.jpg" :
                              p.brand.toLowerCase().includes("esy") ? "/esy-battery-home.jpg" :
                              "/hero-battery.png"
                            }
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="sm:col-span-3 space-y-3">
                        <h3 className="text-lg font-black text-pe-navy leading-tight">{p.name}</h3>
                        <p className="text-pe-gray-500 text-xs sm:text-sm leading-relaxed">{p.description}</p>
                      </div>
                    </div>

                    {/* Specifications List */}
                    {p.specs && Object.keys(p.specs).length > 0 && (
                      <div className="bg-pe-gray-50 rounded-2xl p-4 border border-pe-gray-100 space-y-2">
                        <p className="text-[10px] font-black text-pe-navy uppercase tracking-wider border-b border-pe-gray-200/60 pb-1.5">Technical Specifications</p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                          {Object.entries(p.specs).map(([key, val]) => (
                            <div key={key} className="flex justify-between border-b border-pe-gray-200/30 pb-1">
                              <span className="text-pe-gray-400 font-medium">{key}</span>
                              <span className="text-pe-navy font-bold font-mono">{val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer Installations & Datasheet Actions */}
                  <div className="border-t border-pe-gray-100 bg-pe-gray-50/50 p-6 sm:p-8 space-y-4">
                    {/* Installations Showcase */}
                    {p.installImages && p.installImages.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-[10px] font-black text-pe-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Eye size={12} /> Installation Showcase ({p.installImages.length})
                        </p>
                        <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
                          {p.installImages.map((img, i) => (
                            <button
                              key={i}
                              onClick={() => openLightbox(p.installImages!, i)}
                              className="w-14 h-14 rounded-lg overflow-hidden border border-pe-gray-200 bg-white flex-shrink-0 relative group hover:border-pe-cyan transition-all"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={img} alt="Installation photo" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                              <div className="absolute inset-0 bg-pe-navy/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Eye size={12} className="text-white" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Datasheet download trigger */}
                    <button
                      onClick={() => handleDownloadDatasheet(p)}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-pe-navy text-pe-navy hover:bg-pe-navy hover:text-white font-bold text-xs sm:text-sm transition-all"
                    >
                      <Download size={15} /> Download Technical Datasheet (PDF)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && lightboxImages.length > 0 && (
        <div className="fixed inset-0 bg-black/95 z-[999] flex flex-col justify-between p-4">
          {/* Header */}
          <div className="flex justify-between items-center text-white py-2">
            <span className="text-sm font-semibold tracking-wider">
              Installation Photo {lightboxIndex + 1} of {lightboxImages.length}
            </span>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              title="Close gallery"
            >
              <X size={24} />
            </button>
          </div>

          {/* Main image content with next/prev buttons */}
          <div className="flex-1 flex items-center justify-between max-h-[80vh]">
            <button
              onClick={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : lightboxImages.length - 1))}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors mx-2"
              disabled={lightboxImages.length <= 1}
            >
              <ChevronLeft size={28} />
            </button>
            
            <div className="max-w-[85vw] max-h-[75vh] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightboxImages[lightboxIndex]}
                alt="Installation showcase"
                className="max-w-full max-h-[70vh] object-contain rounded-lg border border-white/10 shadow-2xl"
              />
            </div>

            <button
              onClick={() => setLightboxIndex((prev) => (prev < lightboxImages.length - 1 ? prev + 1 : 0))}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors mx-2"
              disabled={lightboxImages.length <= 1}
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Thumbnail strip */}
          <div className="flex justify-center gap-2 overflow-x-auto py-4">
            {lightboxImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className={`w-12 h-12 rounded-md overflow-hidden border-2 flex-shrink-0 transition-all ${
                  lightboxIndex === i ? "border-pe-cyan scale-105" : "border-white/20 opacity-50 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CTA section */}
      <section className="bg-pe-navy text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-pe-cyan),transparent_50%)] opacity-10" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          <h2 className="text-3xl font-black">Ready to power your home with the best solar products?</h2>
          <p className="text-white/70 max-w-xl mx-auto text-sm sm:text-base">
            Get a tailored solar energy design utilizing clean-energy council approved panels and class-leading battery storage today.
          </p>
          <div className="pt-2">
            <Link href="/get-quote" className="btn-primary text-base px-8 py-3.5 shadow-lg">
              Get A Free Design & Quote →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
