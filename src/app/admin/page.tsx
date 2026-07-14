"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Settings, Palette, Megaphone, FolderClosed, Newspaper, Eye, LogOut, Check, Plus, Trash2, BarChart3, Mail, MessageSquare, ShoppingBag } from "lucide-react";

type Tab = "styles" | "banner" | "packages" | "blogs" | "products" | "seo" | "inquiries";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("styles");
  const [authorized, setAuthorized] = useState(false);

  // Inquiries & Leads state
  const [leads, setLeads] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(true);

  // Styling Tab state
  const [navyColor, setNavyColor] = useState("#002B5C");
  const [orangeColor, setOrangeColor] = useState("#FF7029");

  // Banner Tab state
  const [bannerVisible, setBannerVisible] = useState(false);
  const [bannerMsg, setBannerMsg] = useState("");
  const [bannerLink, setBannerLink] = useState("");
  const [bannerImage, setBannerImage] = useState("");

  // Packages Tab state
  const [packages, setPackages] = useState<any[]>([]);
  const [newPkg, setNewPkg] = useState({
    name: "",
    category: "solarSystem",
    specs: "",
    annualSavings: "",
    dailyOutput: "",
    warranty: "",
    suitedFor: "",
    popular: false,
    order: "1",
  });

  // Blogs Tab state
  const [blogs, setBlogs] = useState<any[]>([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    slug: "",
    content: "",
    author: "Clean Energy Expert",
    readTime: "4 min read",
  });

  // Products Tab state
  const [products, setProducts] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    category: "panel",
    description: "",
    specs: "",
    image: "",
    datasheet: "",
    installImages: [] as string[],
  });

  // SEO Tab state
  const [selectedSeoPage, setSelectedSeoPage] = useState("/");
  const [seoConfig, setSeoConfig] = useState<Record<string, { title: string; description: string }>>({
    "/": { title: "", description: "" },
    "/about": { title: "", description: "" },
    "/solar-packages": { title: "", description: "" },
    "/services": { title: "", description: "" },
    "/services/residential-solar": { title: "", description: "" },
    "/services/commercial-solar": { title: "", description: "" },
    "/services/solar-batteries": { title: "", description: "" },
    "/services/ev-charger": { title: "", description: "" },
    "/special-offers": { title: "", description: "" },
    "/portfolio": { title: "", description: "" },
    "/rebate-checker": { title: "", description: "" },
    "/blog": { title: "", description: "" },
    "/contact": { title: "", description: "" },
    "/get-quote": { title: "", description: "" },
  });
  const [siteVerification, setSiteVerification] = useState("");
  const [ga4Id, setGa4Id] = useState("");

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
    } else {
      setAuthorized(true);
      fetchData();
    }
  }, []);

  async function fetchData() {
    try {
      // Fetch Settings
      const settingsRes = await fetch("http://localhost:4000/api/settings");
      if (settingsRes.ok) {
        const settingsData = await settingsRes.json();
        const s = settingsData.settings;
        setNavyColor(s.primaryNavy || "#002B5C");
        setOrangeColor(s.accentOrange || "#FF7029");
        setBannerVisible(!!s.bannerVisible);
        setBannerMsg(s.bannerMessage || "");
        setBannerLink(s.bannerLink || "");
        setBannerImage(s.bannerImage || "");
        
        setSiteVerification(s.siteVerification || "");
        setGa4Id(s.ga4Id || "");
        
        if (s.seo) {
          const newSeo = {
            "/": { title: "", description: "" },
            "/about": { title: "", description: "" },
            "/solar-packages": { title: "", description: "" },
            "/services": { title: "", description: "" },
            "/services/residential-solar": { title: "", description: "" },
            "/services/commercial-solar": { title: "", description: "" },
            "/services/solar-batteries": { title: "", description: "" },
            "/services/ev-charger": { title: "", description: "" },
            "/special-offers": { title: "", description: "" },
            "/portfolio": { title: "", description: "" },
            "/rebate-checker": { title: "", description: "" },
            "/blog": { title: "", description: "" },
            "/contact": { title: "", description: "" },
            "/get-quote": { title: "", description: "" },
          };
          Object.keys(newSeo).forEach((path) => {
            if (s.seo[path]) {
              newSeo[path as keyof typeof newSeo] = {
                title: s.seo[path].title || "",
                description: s.seo[path].description || "",
              };
            }
          });
          setSeoConfig(newSeo);
        }
      }

      // Fetch Packages
      const pkgRes = await fetch("http://localhost:4000/api/packages");
      if (pkgRes.ok) {
        const pkgData = await pkgRes.json();
        setPackages(pkgData.packages || []);
      }

      // Fetch Blogs
      const blogRes = await fetch("http://localhost:4000/api/blogs");
      if (blogRes.ok) {
        const blogData = await blogRes.json();
        setBlogs(blogData.blogs || []);
      }

      // Fetch Leads
      const leadsRes = await fetch("http://localhost:4000/api/leads");
      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        setLeads(leadsData.leads || []);
      }

      // Fetch Contacts
      const contactsRes = await fetch("http://localhost:4000/api/contact");
      if (contactsRes.ok) {
        const contactsData = await contactsRes.json();
        setContacts(contactsData.contacts || []);
      }

      // Fetch Products
      const prodRes = await fetch("http://localhost:4000/api/products");
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData.products || []);
      }

      setLeadsLoading(false);
    } catch (err) {
      console.error("Failed to load CMS data:", err);
      setLeadsLoading(false);
    }
  }

  async function handleSaveSettings() {
    setSaveStatus("saving");
    try {
      const res = await fetch("http://localhost:4000/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          primaryNavy: navyColor,
          accentOrange: orangeColor,
          bannerVisible,
          bannerMessage: bannerMsg,
          bannerLink,
          bannerImage,
          siteVerification,
          ga4Id,
          seo: seoConfig,
        }),
      });
      if (!res.ok) throw new Error();
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      setSaveStatus("error");
    }
  }

  async function handleAddPackage(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newPkg.name,
          category: newPkg.category,
          specs: { detail: newPkg.specs },
          annualSavings: newPkg.annualSavings,
          dailyOutput: newPkg.dailyOutput,
          warranty: newPkg.warranty,
          suitedFor: newPkg.suitedFor,
          popular: newPkg.popular,
          order: Number(newPkg.order),
        }),
      });
      if (!res.ok) throw new Error();
      setNewPkg({
        name: "",
        category: "solarSystem",
        specs: "",
        annualSavings: "",
        dailyOutput: "",
        warranty: "",
        suitedFor: "",
        popular: false,
        order: "1",
      });
      fetchData();
    } catch (err) {
      alert("Failed to create package");
    }
  }

  async function handleDeletePackage(id: string) {
    if (!confirm("Are you sure you want to delete this solar package?")) return;
    try {
      const res = await fetch(`http://localhost:4000/api/packages/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      fetchData();
    } catch {
      alert("Failed to delete package");
    }
  }

  async function handleAddBlog(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBlog),
      });
      if (!res.ok) throw new Error();
      setNewBlog({
        title: "",
        slug: "",
        content: "",
        author: "Clean Energy Expert",
        readTime: "4 min read",
      });
      fetchData();
    } catch {
      alert("Failed to publish blog post");
    }
  }

  async function handleDeleteBlog(id: string) {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`http://localhost:4000/api/blogs/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      fetchData();
    } catch {
      alert("Failed to delete blog post");
    }
  }

  async function handleDeleteLead(id: string) {
    if (!confirm("Delete this quote request?")) return;
    try {
      const res = await fetch(`http://localhost:4000/api/leads/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      fetchData();
    } catch {
      alert("Failed to delete lead");
    }
  }

  async function handleDeleteContact(id: string) {
    if (!confirm("Delete this contact inquiry?")) return;
    try {
      const res = await fetch(`http://localhost:4000/api/contact/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      fetchData();
    } catch {
      alert("Failed to delete contact inquiry");
    }
  }

  async function handleDeleteProduct(id: string) {
    if (!confirm("Delete this product from the catalog?")) return;
    try {
      const res = await fetch(`http://localhost:4000/api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      fetchData();
    } catch {
      alert("Failed to delete product");
    }
  }

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    try {
      const specsObj: Record<string, string> = {};
      if (newProduct.specs) {
        newProduct.specs.split(";").forEach((pair) => {
          const idx = pair.indexOf(":");
          if (idx !== -1) {
            const k = pair.substring(0, idx).trim();
            const v = pair.substring(idx + 1).trim();
            if (k && v) specsObj[k] = v;
          }
        });
      }

      const res = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newProduct.name,
          brand: newProduct.brand,
          category: newProduct.category,
          description: newProduct.description,
          specs: specsObj,
          image: newProduct.image,
          datasheet: newProduct.datasheet,
          installImages: newProduct.installImages,
        }),
      });

      if (!res.ok) throw new Error();
      setNewProduct({
        name: "",
        brand: "",
        category: "panel",
        description: "",
        specs: "",
        image: "",
        datasheet: "",
        installImages: [],
      });
      fetchData();
    } catch {
      alert("Failed to add product");
    }
  }

  const handleSingleImageUpload = (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setNewProduct((prev) => ({ ...prev, image: e.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleDatasheetUpload = (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      alert("Datasheet must be under 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setNewProduct((prev) => ({ ...prev, datasheet: e.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleMultiImageUpload = (files: FileList) => {
    const promises = Array.from(files).map((file) => {
      return new Promise<string>((resolve) => {
        if (file.size > 2 * 1024 * 1024) {
          alert(`Skipped ${file.name} because it exceeds 2MB.`);
          resolve("");
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((results) => {
      const filtered = results.filter(Boolean);
      setNewProduct((prev) => ({
        ...prev,
        installImages: [...prev.installImages, ...filtered],
      }));
    });
  };

  function handleLogout() {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  }

  if (!authorized) {
    return <div className="text-center py-20 text-pe-gray-500">Checking credentials...</div>;
  }

  return (
    <section className="min-h-screen bg-pe-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-pe-gray-200 rounded-3xl p-6 mb-8 shadow-sm">
          <div>
            <h1 className="text-3xl font-black text-pe-navy">Pylon Energy Admin Console</h1>
            <p className="text-pe-gray-500 text-sm mt-0.5">Manage styling tokens, blogs, SEO layouts, and active package pricing configurations.</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/admin/marketing"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-pe-cyan text-white font-bold hover:bg-pe-cyan-dark transition-all text-sm"
            >
              <BarChart3 size={16} /> Marketing Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-pe-gray-200 text-pe-gray-600 font-bold hover:bg-pe-gray-100 hover:text-pe-navy transition-all text-sm"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3 bg-white border border-pe-gray-200 rounded-3xl p-4 shadow-sm space-y-1">
            {/* Marketing Dashboard shortcut */}
            <Link
              href="/admin/marketing"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-left transition-all text-pe-cyan bg-pe-cyan-light hover:bg-pe-cyan hover:text-white mb-2"
            >
              <BarChart3 size={18} />
              Marketing &amp; Ads
            </Link>
            {[
              { id: "styles", label: "Theme Colors", icon: Palette },
              { id: "banner", label: "Promo Banner", icon: Megaphone },
              { id: "packages", label: "Solar Packages", icon: FolderClosed },
              { id: "blogs", label: "Blog Posts", icon: Newspaper },
              { id: "products", label: "Products Catalog", icon: ShoppingBag },
              { id: "seo", label: "SEO Configs", icon: Eye },
              { id: "inquiries", label: "Leads & Inquiries", icon: Mail },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-left transition-all ${
                    activeTab === tab.id
                      ? "bg-pe-navy text-white"
                      : "text-pe-gray-600 hover:bg-pe-gray-100 hover:text-pe-navy"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Details Content Box */}
          <div className="lg:col-span-9 bg-white border border-pe-gray-200 rounded-3xl p-8 shadow-sm">
            
            {/* 1. Theme Customizer */}
            {activeTab === "styles" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-black text-pe-navy">Theme Settings</h2>
                  <p className="text-pe-gray-500 text-sm mt-0.5">Customize global site typography styling variables instantly.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-pe-gray-100">
                  <div>
                    <label className="block text-sm font-semibold text-pe-gray-700 mb-2">Primary Navy Color</label>
                    <div className="flex gap-3">
                      <input
                        type="color"
                        value={navyColor}
                        onChange={(e) => setNavyColor(e.target.value)}
                        className="w-12 h-12 rounded-xl border border-pe-gray-200 p-1 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={navyColor}
                        onChange={(e) => setNavyColor(e.target.value)}
                        className="form-input font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-pe-gray-700 mb-2">Accent Cyan Color</label>
                    <div className="flex gap-3">
                      <input
                        type="color"
                        value={orangeColor}
                        onChange={(e) => setOrangeColor(e.target.value)}
                        className="w-12 h-12 rounded-xl border border-pe-gray-200 p-1 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={orangeColor}
                        onChange={(e) => setOrangeColor(e.target.value)}
                        className="form-input font-mono"
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-pe-gray-100 flex items-center justify-between">
                  <button onClick={handleSaveSettings} className="btn-primary">
                    {saveStatus === "saving" ? "Saving Colors..." : "Save Theme Colors"}
                  </button>
                  {saveStatus === "saved" && <span className="text-pe-green font-bold text-sm flex items-center gap-1"><Check size={16} /> Saved!</span>}
                </div>
              </div>
            )}

            {/* 2. Promo Banner settings */}
            {activeTab === "banner" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-black text-pe-navy">Floating Promo Banner</h2>
                  <p className="text-pe-gray-500 text-sm mt-0.5">Toggle active layout-wide header text alerts.</p>
                </div>
                <div className="pt-4 border-t border-pe-gray-100 space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="bannerVisible"
                      checked={bannerVisible}
                      onChange={(e) => setBannerVisible(e.target.checked)}
                      className="w-5 h-5 accent-pe-cyan rounded border-pe-gray-300"
                    />
                    <label htmlFor="bannerVisible" className="text-sm font-semibold text-pe-gray-700">Display Floating Announcement Banner</label>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-pe-gray-700 mb-1.5">Banner Message Text</label>
                    <input
                      type="text"
                      value={bannerMsg}
                      onChange={(e) => setBannerMsg(e.target.value)}
                      placeholder="🌟 Promo active — save up to $3500!"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-pe-gray-700 mb-1.5">Action Link URL</label>
                    <input
                      type="text"
                      value={bannerLink}
                      onChange={(e) => setBannerLink(e.target.value)}
                      placeholder="/solar-packages"
                      className="form-input font-mono"
                    />
                  </div>

                  {/* Banner Image Upload */}
                  <div className="pt-4 border-t border-pe-gray-100 space-y-3">
                    <div>
                      <label className="block text-sm font-semibold text-pe-gray-700 mb-1">Promotional Banner Image</label>
                      <p className="text-xs text-pe-gray-400 mb-3">Upload a promo graphic (JPG, PNG, WebP — max 2MB). Displayed on the Special Offers page when the banner is active.</p>
                      <label
                        htmlFor="bannerImageUpload"
                        className="flex items-center gap-3 cursor-pointer border-2 border-dashed border-pe-gray-300 hover:border-pe-cyan rounded-2xl px-5 py-4 transition-colors bg-pe-gray-50 hover:bg-pe-cyan-light"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white border border-pe-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pe-cyan"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-pe-navy">{bannerImage ? "Replace Banner Image" : "Click to Upload Banner Image"}</p>
                          <p className="text-xs text-pe-gray-400">JPG, PNG, WebP up to 2MB</p>
                        </div>
                        <input
                          id="bannerImageUpload"
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          className="sr-only"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            if (file.size > 2 * 1024 * 1024) {
                              alert("Image must be under 2MB.");
                              return;
                            }
                            const reader = new FileReader();
                            reader.onload = (ev) => setBannerImage(ev.target?.result as string);
                            reader.readAsDataURL(file);
                          }}
                        />
                      </label>
                    </div>

                    {bannerImage && (
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-pe-gray-500 uppercase tracking-wide">Preview</p>
                        <div className="relative rounded-2xl overflow-hidden border border-pe-gray-200 shadow-sm">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={bannerImage} alt="Banner preview" className="w-full max-h-48 object-cover" />
                          <button
                            type="button"
                            onClick={() => setBannerImage("")}
                            className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm border border-pe-gray-200 rounded-full p-1.5 shadow text-red-500 hover:bg-red-50 transition-colors"
                            title="Remove banner image"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          </button>
                        </div>
                        <p className="text-xs text-pe-gray-400">✓ Image ready — click &quot;Save Banner Configuration&quot; to apply</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-pe-gray-100 flex items-center justify-between">
                  <button onClick={handleSaveSettings} className="btn-primary">
                    {saveStatus === "saving" ? "Saving..." : "Save Banner Configuration"}
                  </button>
                  {saveStatus === "saved" && <span className="text-pe-green font-bold text-sm flex items-center gap-1"><Check size={16} /> Saved!</span>}
                </div>
              </div>
            )}

            {/* 3. Products/Packages CRUD */}
            {activeTab === "packages" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-black text-pe-navy">Solar Packages CMS</h2>
                  <p className="text-pe-gray-500 text-sm mt-0.5">Add or remove active solar package layouts dynamically.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleAddPackage} className="bg-pe-gray-50 rounded-2xl p-6 border border-pe-gray-200 space-y-4">
                  <h3 className="font-bold text-pe-navy text-sm flex items-center gap-1"><Plus size={16} /> Add New Package</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-pe-gray-700 mb-1">Package Name</label>
                      <input
                        type="text"
                        required
                        value={newPkg.name}
                        onChange={(e) => setNewPkg({ ...newPkg, name: e.target.value })}
                        placeholder="6.6kW Smart Solar"
                        className="form-input py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-pe-gray-700 mb-1">Category</label>
                      <select
                        value={newPkg.category}
                        onChange={(e) => setNewPkg({ ...newPkg, category: e.target.value })}
                        className="form-input py-2 text-sm"
                      >
                        <option value="solarSystem">Solar System</option>
                        <option value="battery">Solar Batteries</option>
                        <option value="solarBattery">Solar Panels &amp; Batteries</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-pe-gray-700 mb-1">Specifications (Details)</label>
                      <input
                        type="text"
                        required
                        value={newPkg.specs}
                        onChange={(e) => setNewPkg({ ...newPkg, specs: e.target.value })}
                        placeholder="14 × 475W Panels · 5kW Inverter"
                        className="form-input py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-pe-gray-700 mb-1">Annual Savings Estimate</label>
                      <input
                        type="text"
                        required
                        value={newPkg.annualSavings}
                        onChange={(e) => setNewPkg({ ...newPkg, annualSavings: e.target.value })}
                        placeholder="$2,400 – $2,600 / yr"
                        className="form-input py-2 text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-pe-gray-700 mb-1">Suited For</label>
                      <input
                        type="text"
                        value={newPkg.suitedFor}
                        onChange={(e) => setNewPkg({ ...newPkg, suitedFor: e.target.value })}
                        placeholder="Average homes / 2-3 people"
                        className="form-input py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-pe-gray-700 mb-1">Sort Order</label>
                      <input
                        type="number"
                        value={newPkg.order}
                        onChange={(e) => setNewPkg({ ...newPkg, order: e.target.value })}
                        placeholder="1"
                        className="form-input py-2 text-sm font-mono"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="pkgPopular"
                      checked={newPkg.popular}
                      onChange={(e) => setNewPkg({ ...newPkg, popular: e.target.checked })}
                      className="w-5 h-5 accent-pe-cyan rounded"
                    />
                    <label htmlFor="pkgPopular" className="text-xs font-semibold text-pe-gray-700">Display 'Most Popular' badge</label>
                  </div>
                  <button type="submit" className="btn-primary py-2 text-sm">Add Package</button>
                </form>

                {/* List */}
                <div className="space-y-3">
                  <h3 className="font-bold text-pe-navy text-sm">Current Active Packages ({packages.length})</h3>
                  <div className="divide-y divide-pe-gray-200 border border-pe-gray-200 rounded-2xl overflow-hidden">
                    {packages.map((pkg: any) => (
                      <div key={pkg._id} className="flex items-center justify-between p-4 bg-white hover:bg-pe-gray-50 transition-colors">
                        <div>
                          <p className="font-bold text-pe-navy">{pkg.name}</p>
                          <p className="text-xs text-pe-gray-400 uppercase tracking-wider">{pkg.category} · Order {pkg.order}</p>
                        </div>
                        <button
                          onClick={() => handleDeletePackage(pkg._id)}
                          className="p-2 text-pe-gray-400 hover:text-red-500 rounded-xl hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. Blogs Management Tab */}
            {activeTab === "blogs" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-black text-pe-navy">Blogs CMS</h2>
                  <p className="text-pe-gray-500 text-sm mt-0.5">Publish articles, updates, and educational guides.</p>
                </div>

                {/* Add form */}
                <form onSubmit={handleAddBlog} className="bg-pe-gray-50 rounded-2xl p-6 border border-pe-gray-200 space-y-4">
                  <h3 className="font-bold text-pe-navy text-sm flex items-center gap-1"><Plus size={16} /> Write New Article</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-pe-gray-700 mb-1">Article Title</label>
                      <input
                        type="text"
                        required
                        value={newBlog.title}
                        onChange={(e) => {
                          const slugified = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                          setNewBlog({ ...newBlog, title: e.target.value, slug: slugified });
                        }}
                        placeholder="Saving on Solar in 2026"
                        className="form-input py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-pe-gray-700 mb-1">URL Slug</label>
                      <input
                        type="text"
                        required
                        value={newBlog.slug}
                        onChange={(e) => setNewBlog({ ...newBlog, slug: e.target.value })}
                        placeholder="saving-on-solar"
                        className="form-input py-2 text-sm font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-pe-gray-700 mb-1">Article Body Content</label>
                    <textarea
                      required
                      value={newBlog.content}
                      onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                      rows={5}
                      placeholder="Write your article paragraphs here. Separate paragraphs with double enters..."
                      className="form-input text-sm resize-none"
                    />
                  </div>
                  <button type="submit" className="btn-primary py-2 text-sm">Publish Article</button>
                </form>

                {/* List */}
                <div className="space-y-3">
                  <h3 className="font-bold text-pe-navy text-sm">Published Articles ({blogs.length})</h3>
                  <div className="divide-y divide-pe-gray-200 border border-pe-gray-200 rounded-2xl overflow-hidden">
                    {blogs.map((b: any) => (
                      <div key={b._id} className="flex items-center justify-between p-4 bg-white hover:bg-pe-gray-50 transition-colors">
                        <div>
                          <p className="font-bold text-pe-navy">{b.title}</p>
                          <p className="text-xs text-pe-gray-400 font-mono">/blog/{b.slug}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteBlog(b._id)}
                          className="p-2 text-pe-gray-400 hover:text-red-500 rounded-xl hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4b. Products Catalog CMS */}
            {activeTab === "products" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-black text-pe-navy">Products Catalog CMS</h2>
                  <p className="text-pe-gray-500 text-sm mt-0.5">Manage clean-energy products, tech specs, datasheets, and real installation photos.</p>
                </div>

                {/* Add product form */}
                <form onSubmit={handleAddProduct} className="bg-pe-gray-50 rounded-2xl p-6 border border-pe-gray-200 space-y-4">
                  <h3 className="font-bold text-pe-navy text-sm flex items-center gap-1"><Plus size={16} /> Add New Product</h3>
                  
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-pe-gray-700 mb-1">Brand Name</label>
                      <input
                        type="text"
                        required
                        value={newProduct.brand}
                        onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                        placeholder="e.g. Jinko Solar, Sungrow"
                        className="form-input py-2 text-sm bg-white"
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-pe-gray-700 mb-1">Product Model Name</label>
                      <input
                        type="text"
                        required
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="e.g. Tiger Neo N-type 440W, SG5.0RS Inverter"
                        className="form-input py-2 text-sm bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-pe-gray-700 mb-1">Category</label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as any })}
                        className="form-input py-2 text-sm bg-white"
                      >
                        <option value="panel">Solar Panel</option>
                        <option value="inverter">Inverter</option>
                        <option value="battery">Battery Storage</option>
                        <option value="other">Other Accessory</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-pe-gray-700 mb-1">
                        Technical Specs (Format: Key:Value; Separate multiple with semicolons ;)
                      </label>
                      <input
                        type="text"
                        value={newProduct.specs}
                        onChange={(e) => setNewProduct({ ...newProduct, specs: e.target.value })}
                        placeholder="e.g. Max Power: 440W; Efficiency: 22.02%; Warranty: 25 Years"
                        className="form-input py-2 text-sm bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-pe-gray-700 mb-1">Description</label>
                    <textarea
                      required
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      rows={3}
                      placeholder="Enter a brief product overview..."
                      className="form-input text-sm resize-none bg-white"
                    />
                  </div>

                  {/* File Upload Fields */}
                  <div className="grid sm:grid-cols-3 gap-4 pt-2">
                    {/* Main Image */}
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-pe-gray-700">Product Image (Max 2MB)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleSingleImageUpload(file);
                        }}
                        className="block w-full text-xs text-pe-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-pe-navy/10 file:text-pe-navy file:cursor-pointer"
                      />
                      {newProduct.image && <p className="text-[10px] text-pe-green font-bold">✓ Product image selected</p>}
                    </div>

                    {/* Datasheet File */}
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-pe-gray-700">Datasheet File (PDF, Max 2MB)</label>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleDatasheetUpload(file);
                        }}
                        className="block w-full text-xs text-pe-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-pe-navy/10 file:text-pe-navy file:cursor-pointer"
                      />
                      {newProduct.datasheet && <p className="text-[10px] text-pe-green font-bold">✓ PDF Datasheet loaded</p>}
                    </div>

                    {/* Installation Photos */}
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-pe-gray-700">Install Photos (Multi-select, Max 2MB)</label>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files) handleMultiImageUpload(e.target.files);
                        }}
                        className="block w-full text-xs text-pe-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-pe-navy/10 file:text-pe-navy file:cursor-pointer"
                      />
                      {newProduct.installImages.length > 0 && (
                        <p className="text-[10px] text-pe-green font-bold">✓ {newProduct.installImages.length} install photos ready</p>
                      )}
                    </div>
                  </div>

                  <button type="submit" className="btn-primary py-2 text-sm mt-2">Add Product to Catalog</button>
                </form>

                {/* Products List Table */}
                <div className="space-y-3">
                  <h3 className="font-bold text-pe-navy text-sm">Product Catalog List ({products.length})</h3>
                  {products.length === 0 ? (
                    <div className="text-center py-10 border border-dashed border-pe-gray-200 rounded-2xl text-pe-gray-400 font-bold">
                      No products registered. Use the builder above to list a product.
                    </div>
                  ) : (
                    <div className="overflow-x-auto border border-pe-gray-200 rounded-2xl bg-pe-gray-50/50">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-pe-gray-200 bg-pe-gray-50 text-pe-gray-500 font-bold uppercase tracking-wider">
                            <th className="p-4">Product</th>
                            <th className="p-4">Brand / Category</th>
                            <th className="p-4">Specs</th>
                            <th className="p-4">Showcase Images</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-pe-gray-200 bg-white">
                          {products.map((p: any) => (
                            <tr key={p._id} className="hover:bg-pe-gray-50 transition-colors">
                              <td className="p-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg border border-pe-gray-200 overflow-hidden bg-pe-gray-100 flex-shrink-0 flex items-center justify-center">
                                  {p.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                  ) : (
                                    <ShoppingBag size={14} className="text-pe-gray-400" />
                                  )}
                                </div>
                                <span className="font-bold text-pe-navy">{p.name}</span>
                              </td>
                              <td className="p-4">
                                <p className="font-bold text-pe-gray-700">{p.brand}</p>
                                <span className="text-[10px] font-semibold text-pe-cyan uppercase tracking-wider mt-0.5 block">{p.category}</span>
                              </td>
                              <td className="p-4 max-w-xs truncate">
                                {p.specs && Object.keys(p.specs).length > 0 ? (
                                  Object.entries(p.specs).map(([k, v]) => `${k}:${v}`).join("; ")
                                ) : (
                                  <span className="text-pe-gray-300 italic">None</span>
                                )}
                              </td>
                              <td className="p-4 font-mono font-bold text-pe-gray-500">
                                {p.installImages ? p.installImages.length : 0} photos
                              </td>
                              <td className="p-4 text-right">
                                <button
                                  onClick={() => handleDeleteProduct(p._id)}
                                  className="p-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-500 transition-all"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 5. SEO Management Tab */}
            {activeTab === "seo" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-black text-pe-navy">SEO Meta Manager</h2>
                  <p className="text-pe-gray-500 text-sm mt-0.5">Customize meta tags and descriptions for optimal search engine performance.</p>
                </div>
                
                <div className="pt-4 border-t border-pe-gray-100 space-y-6">
                  {/* Search Console & GA4 Verification block */}
                  <div className="space-y-4 bg-pe-navy/5 p-5 rounded-2xl border border-pe-navy/10">
                    <h3 className="font-bold text-pe-navy text-sm flex items-center gap-1.5">
                      ⚙️ Site Verification & Analytics Tags
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-pe-gray-700 mb-1">Google Search Console Verification ID</label>
                        <input
                          type="text"
                          value={siteVerification}
                          onChange={(e) => setSiteVerification(e.target.value)}
                          placeholder="e.g. google-site-verification-12345"
                          className="form-input py-2 text-sm bg-white"
                        />
                        <p className="text-[10px] text-pe-gray-400 mt-1">Found in your Google Search Console settings (HTML tag option).</p>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-pe-gray-700 mb-1">Google Analytics 4 (GA4) Measurement ID</label>
                        <input
                          type="text"
                          value={ga4Id}
                          onChange={(e) => setGa4Id(e.target.value)}
                          placeholder="e.g. G-XXXXXX"
                          className="form-input py-2 text-sm bg-white"
                        />
                        <p className="text-[10px] text-pe-gray-400 mt-1">Your GA4 tracking tag. Loaded automatically on page visits.</p>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Page SEO Selector */}
                  <div className="space-y-4 bg-pe-gray-50 p-5 rounded-2xl border border-pe-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-pe-navy text-sm">Custom Page Metadata</h3>
                        <p className="text-xs text-pe-gray-400">Select a page route below to customize its SEO settings.</p>
                      </div>
                      <select
                        value={selectedSeoPage}
                        onChange={(e) => setSelectedSeoPage(e.target.value)}
                        className="form-input py-1.5 px-3 text-xs bg-white max-w-xs font-mono font-semibold"
                      >
                        <option value="/">Home Page (/)</option>
                        <option value="/about">About Us (/about)</option>
                        <option value="/solar-packages">Solar Packages (/solar-packages)</option>
                        <option value="/services">Services Main (/services)</option>
                        <option value="/services/residential-solar">Residential Solar (/services/residential-solar)</option>
                        <option value="/services/commercial-solar">Commercial Solar (/services/commercial-solar)</option>
                        <option value="/services/solar-batteries">Solar Batteries (/services/solar-batteries)</option>
                        <option value="/services/ev-charger">EV Chargers (/services/ev-charger)</option>
                        <option value="/special-offers">Special Offers (/special-offers)</option>
                        <option value="/portfolio">Portfolio (/portfolio)</option>
                        <option value="/rebate-checker">Rebate Checker (/rebate-checker)</option>
                        <option value="/blog">Blog (/blog)</option>
                        <option value="/contact">Contact Us (/contact)</option>
                        <option value="/get-quote">Get A Quote (/get-quote)</option>
                      </select>
                    </div>

                    <div className="pt-4 border-t border-pe-gray-200/50 space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-pe-gray-600 mb-1">Page Title Tag</label>
                        <input
                          type="text"
                          value={seoConfig[selectedSeoPage]?.title || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSeoConfig((prev) => ({
                              ...prev,
                              [selectedSeoPage]: { ...prev[selectedSeoPage], title: val }
                            }));
                          }}
                          placeholder="Page Title — Pylon Energy"
                          className="form-input py-2 text-sm bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-pe-gray-600 mb-1">Meta Description Tag</label>
                        <textarea
                          value={seoConfig[selectedSeoPage]?.description || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSeoConfig((prev) => ({
                              ...prev,
                              [selectedSeoPage]: { ...prev[selectedSeoPage], description: val }
                            }));
                          }}
                          rows={3}
                          placeholder="Enter page description for Google search snippet results..."
                          className="form-input text-sm bg-white resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-pe-gray-100 flex items-center justify-between">
                  <button onClick={handleSaveSettings} className="btn-primary">
                    {saveStatus === "saving" ? "Saving Configurations..." : "Save SEO Configurations"}
                  </button>
                  {saveStatus === "saved" && <span className="text-pe-green font-bold text-sm flex items-center gap-1"><Check size={16} /> Saved!</span>}
                </div>
              </div>
            )}

            {/* Leads & Inquiries Tab */}
            {activeTab === "inquiries" && (
              <div className="bg-white border border-pe-gray-200 rounded-3xl p-6 shadow-sm space-y-10 animate-fade-in-up">
                
                {/* Section 1: Quote Requests */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-black text-pe-navy flex items-center gap-2">
                        <Mail className="text-pe-cyan" size={22} /> Quote Requests (Leads)
                      </h2>
                      <p className="text-pe-gray-500 text-xs mt-0.5">Submitted via the Solar Savings Calculator or Get Quote forms.</p>
                    </div>
                    <span className="bg-pe-navy/5 text-pe-navy text-xs font-black px-3 py-1 rounded-full border border-pe-navy/10">
                      {leads.length} Active Leads
                    </span>
                  </div>

                  {leadsLoading ? (
                    <div className="text-center py-10 text-pe-gray-400 font-bold">Loading leads database...</div>
                  ) : leads.length === 0 ? (
                    <div className="text-center py-10 border border-dashed border-pe-gray-200 rounded-2xl text-pe-gray-400 font-bold">
                      No quote requests received yet.
                    </div>
                  ) : (
                    <div className="overflow-x-auto border border-pe-gray-200 rounded-2xl bg-pe-gray-50/50">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-pe-gray-200 bg-pe-gray-50 text-pe-gray-500 font-bold uppercase tracking-wider">
                            <th className="p-4">Date</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Postcode</th>
                            <th className="p-4">Interest</th>
                            <th className="p-4">Campaign / Source</th>
                            <th className="p-4">Message</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-pe-gray-200">
                          {leads.map((l) => (
                            <tr key={l._id} className="hover:bg-pe-gray-50 transition-colors">
                              <td className="p-4 font-semibold text-pe-gray-500 whitespace-nowrap">
                                {new Date(l.createdAt).toLocaleDateString()} {new Date(l.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </td>
                              <td className="p-4">
                                <p className="font-bold text-pe-navy">{l.name}</p>
                                <p className="text-pe-gray-500">{l.email}</p>
                                <p className="text-pe-gray-600 font-mono mt-0.5">{l.phone}</p>
                              </td>
                              <td className="p-4 font-mono font-bold text-pe-gray-700">{l.postcode}</td>
                              <td className="p-4 whitespace-nowrap">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                                  l.interest === "battery" ? "bg-purple-50 text-purple-700 border-purple-200" :
                                  l.interest === "commercial" ? "bg-blue-50 text-blue-700 border-blue-200" :
                                  l.interest === "ev" ? "bg-green-50 text-green-700 border-green-200" :
                                  "bg-pe-cyan-light text-pe-cyan border-[#29ABE2]/20"
                                }`}>
                                  {l.interest === "ev" ? "EV Installer" :
                                   l.interest === "battery" ? "Battery Storage" :
                                   l.interest === "commercial" ? "Commercial Solar" :
                                   "Residential Solar"}
                                </span>
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                {l.utmSource ? (
                                  <div className="space-y-0.5">
                                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded text-[10px] font-bold uppercase tracking-wider">
                                      {l.utmSource}
                                    </span>
                                    {(l.utmMedium || l.utmCampaign) && (
                                      <p className="text-[10px] text-pe-gray-400 font-medium">
                                        {l.utmMedium && `med: ${l.utmMedium}`}
                                        {l.utmCampaign && ` / camp: ${l.utmCampaign}`}
                                      </p>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-pe-gray-400 italic">Organic / Direct</span>
                                )}
                              </td>
                              <td className="p-4 max-w-xs truncate text-pe-gray-600 font-medium" title={l.message}>
                                {l.message || <span className="text-pe-gray-300 italic font-normal">No notes</span>}
                              </td>
                              <td className="p-4 text-right whitespace-nowrap space-x-2">
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(`Lead Name: ${l.name}\nEmail: ${l.email}\nPhone: ${l.phone}\nPostcode: ${l.postcode}\nInterest: ${l.interest}\nMessage: ${l.message || "N/A"}`);
                                    alert("Details copied to clipboard!");
                                  }}
                                  className="px-2.5 py-1.5 rounded-lg border border-pe-gray-200 bg-white hover:bg-pe-gray-100 text-pe-gray-600 font-bold transition-all"
                                >
                                  Copy
                                </button>
                                <button
                                  onClick={() => handleDeleteLead(l._id)}
                                  className="p-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-500 transition-all inline-flex items-center justify-center -mb-1"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Section 2: Contact Form Submissions */}
                <div>
                  <div className="flex justify-between items-center mb-6 pt-6 border-t border-pe-gray-200">
                    <div>
                      <h2 className="text-xl font-black text-pe-navy flex items-center gap-2">
                        <MessageSquare className="text-pe-cyan" size={22} /> Contact Inquiries
                      </h2>
                      <p className="text-pe-gray-500 text-xs mt-0.5">Submitted via the general Contact Us form page.</p>
                    </div>
                    <span className="bg-pe-navy/5 text-pe-navy text-xs font-black px-3 py-1 rounded-full border border-pe-navy/10">
                      {contacts.length} Inquiries
                    </span>
                  </div>

                  {leadsLoading ? (
                    <div className="text-center py-10 text-pe-gray-400 font-bold">Loading contacts database...</div>
                  ) : contacts.length === 0 ? (
                    <div className="text-center py-10 border border-dashed border-pe-gray-200 rounded-2xl text-pe-gray-400 font-bold">
                      No general contact inquiries received yet.
                    </div>
                  ) : (
                    <div className="overflow-x-auto border border-pe-gray-200 rounded-2xl bg-pe-gray-50/50">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-pe-gray-200 bg-pe-gray-50 text-pe-gray-500 font-bold uppercase tracking-wider">
                            <th className="p-4">Date</th>
                            <th className="p-4">Sender</th>
                            <th className="p-4">Inquiry Message</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-pe-gray-200">
                          {contacts.map((c) => (
                            <tr key={c._id} className="hover:bg-pe-gray-50 transition-colors">
                              <td className="p-4 font-semibold text-pe-gray-500 whitespace-nowrap">
                                {new Date(c.createdAt).toLocaleDateString()} {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </td>
                              <td className="p-4">
                                <p className="font-bold text-pe-navy">{c.name}</p>
                                <p className="text-pe-gray-500">{c.email}</p>
                                <p className="text-pe-gray-600 font-mono mt-0.5">{c.phone}</p>
                              </td>
                              <td className="p-4 max-w-sm truncate text-pe-gray-600 font-medium" title={c.message}>
                                {c.message}
                              </td>
                              <td className="p-4 text-right whitespace-nowrap space-x-2">
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(`Contact Name: ${c.name}\nEmail: ${c.email}\nPhone: ${c.phone}\nMessage: ${c.message}`);
                                    alert("Details copied to clipboard!");
                                  }}
                                  className="px-2.5 py-1.5 rounded-lg border border-pe-gray-200 bg-white hover:bg-pe-gray-100 text-pe-gray-600 font-bold transition-all"
                                >
                                  Copy
                                </button>
                                <button
                                  onClick={() => handleDeleteContact(c._id)}
                                  className="p-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-500 transition-all inline-flex items-center justify-center -mb-1"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
