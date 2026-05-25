"use client";

import { useState } from "react";
import { PHOTOS } from "@/lib/photos";

export default function PhotoPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const active = lightbox !== null ? PHOTOS[lightbox] : null;

  return (
    <div style={{ paddingTop: "80px" }}>
      <section
        className="py-20 px-6 text-center relative overflow-hidden"
        style={{
          background: "var(--background)",
          borderBottom: "1px solid rgba(241,119,174,0.15)",
        }}
      >
        <p className="kicker mb-4">visual archive</p>
        <h1
          className="caret"
          style={{ fontFamily: "STALPH, serif", fontSize: "clamp(2.5rem, 8vw, 7rem)", color: "var(--blackish)", lineHeight: 1 }}
        >
          photo
        </h1>
        <div className="pixel-divider mt-6" aria-hidden>
          <span /><span /><span /><span /><span /><span /><span /><span />
        </div>
        <p className="mono mt-6 text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
          {PHOTOS.length} frames · AMERiconUH shoot
        </p>
      </section>

      <section className="py-12 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
            {PHOTOS.map((photo, i) => (
              <div key={photo.id} className="break-inside-avoid mb-4">
                <button
                  onClick={() => setLightbox(i)}
                  className="block w-full overflow-hidden rounded-sm vhs-hover group"
                  style={{ border: "1px solid rgba(241,119,174,0.2)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
                <p className="mt-1 mono text-[10px] tracking-widest uppercase" style={{ color: "var(--text-ghost)" }}>
                  {photo.id} · {photo.shoot}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(240,203,217,0.97)" }}
          onClick={() => setLightbox(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active.src}
            alt={active.alt}
            className="max-w-full max-h-full object-contain rounded-sm"
            style={{ maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-6 right-6 text-3xl"
            style={{ color: "var(--pink)", fontFamily: "STALPH, serif" }}
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          <p
            className="absolute bottom-6 left-0 right-0 text-center mono text-xs tracking-widest uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            {active.id} · {active.shoot} · {(lightbox ?? 0) + 1} / {PHOTOS.length}
          </p>
        </div>
      )}
    </div>
  );
}
