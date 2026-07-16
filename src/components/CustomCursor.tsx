"use client";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Only render cursor if the device has a mouse/trackpad (pointer: fine)
    const hasMouse = window.matchMedia('(pointer: fine)').matches;
    if (!hasMouse) return;

    setHidden(false);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('.product-card') ||
        target.closest('.package-tab') ||
        target.closest('.faq-card') ||
        target.classList.contains('cursor-pointer')
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        className="fixed w-1.5 h-1.5 bg-[#FF7029] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) ${hovered ? 'scale(0.3)' : 'scale(1)'}`,
        }}
      />
      {/* Outer Circle (Smooth spring-like trailing transition) */}
      <div
        className="fixed w-8 h-8 border-2 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) ${hovered ? 'scale(1.6)' : 'scale(1)'}`,
          borderColor: hovered ? '#FF7029' : '#29ABE2',
          backgroundColor: hovered ? 'rgba(255,112,41,0.08)' : 'rgba(41,171,226,0.03)',
        }}
      />
    </>
  );
}
