"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e: MouseEvent) => {
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };

    const onDown = () => dot.classList.add("cursor-down");
    const onUp = () => dot.classList.remove("cursor-down");

    const matches = (el: EventTarget | null) => {
      if (!(el instanceof Element)) return false;
      return !!el.closest("a, button, [role='button'], input, textarea, select, label");
    };
    const onOver = (e: MouseEvent) => {
      if (matches(e.target)) setHovering(true);
    };
    const onOut = (e: MouseEvent) => {
      if (matches(e.target) && !matches(e.relatedTarget)) setHovering(false);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className={`cursor-snap ${hovering ? "is-hover" : ""}`}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" width="24" height="24" className="cursor-crosshair">
        <rect x="11" y="2" width="2" height="6" fill="var(--pink)" />
        <rect x="11" y="16" width="2" height="6" fill="var(--pink)" />
        <rect x="2" y="11" width="6" height="2" fill="var(--pink)" />
        <rect x="16" y="11" width="6" height="2" fill="var(--pink)" />
        <rect x="11" y="11" width="2" height="2" fill="var(--yellow)" />
      </svg>
      <span className="cursor-dot-inner" />
    </div>
  );
}
