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
      className="relative py-20 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #001A3A 0%, #002B5C 50%, #0D3572 100%)" }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(41,171,226,1) 1px, transparent 1px), linear-gradient(90deg, rgba(41,171,226,1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }} />
      {/* Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10 rounded-full"
        style={{ background: "radial-gradient(circle, #29ABE2, transparent 70%)", transform: "translate(30%, -30%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-white/50 text-sm mb-6">
          <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
            <Home size={13} /> Home
          </Link>
          {breadcrumbs?.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <ChevronRight size={13} />
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-white transition-colors">{crumb.label}</Link>
              ) : (
                <span className="text-white/80">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">{title}</h1>
        {subtitle && <p className="text-white/60 text-lg max-w-2xl">{subtitle}</p>}
      </div>
    </section>
  );
}
