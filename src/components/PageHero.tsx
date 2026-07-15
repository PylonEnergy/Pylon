import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
}

export default function PageHero({ title, subtitle, breadcrumbs }: PageHeroProps) {
  return (
    <section
      className="relative py-14 md:py-16 overflow-hidden border-b border-slate-100"
      style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #F5F9FD 60%, #E8F4FC 100%)" }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(0,43,92,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,43,92,0.1) 1px, transparent 1px)",
          backgroundSize: "55px 55px",
        }} />
      {/* Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10 rounded-full"
        style={{ background: "radial-gradient(circle, #29ABE2, transparent 70%)", transform: "translate(30%, -30%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-pe-gray-500 text-sm mb-5">
          <Link href="/" className="flex items-center gap-1 hover:text-pe-navy transition-colors font-semibold">
            <Home size={13} /> Home
          </Link>
          {breadcrumbs?.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5 font-semibold">
              <ChevronRight size={13} className="text-pe-gray-400" />
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-pe-navy transition-colors">{crumb.label}</Link>
              ) : (
                <span className="text-pe-navy">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-pe-navy tracking-tight mb-3">{title}</h1>
        {subtitle && <p className="text-pe-gray-600 text-base md:text-lg max-w-2xl font-medium">{subtitle}</p>}
      </div>
    </section>
  );
}
