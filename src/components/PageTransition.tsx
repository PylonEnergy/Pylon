"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(10px)";
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return (
    <div ref={ref} className="w-full">
      {children}
    </div>
  );
}
