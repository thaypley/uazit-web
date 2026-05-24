"use client";

import { useState, useEffect } from "react";
import { getPhotos, getFileUrl } from "@/lib/pocketbase";
import type { Photo } from "@/lib/types";

type Category = "all" | "press" | "live" | "stalph" | "behind-scenes";

const categories: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Press", value: "press" },
  { label: "Live", value: "live" },
  { label: "stalph", value: "stalph" },
  { label: "Behind the Scenes", value: "behind-scenes" },
];

export default function PhotoPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [category, setCategory] = useState<Category>("all");
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  useEffect(() => {
    getPhotos().then(setPhotos);
  }, []);

  const filtered = category === "all" ? photos : photos.filter((p) => p.category === category);

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <section
        className="py-20 px-6 text-center"
        style={{ background: "linear-gradient(to bottom, rgba(241,119,174,0.05), var(--blackish))", borderBottom: "1px solid rgba(241,119,174,0.1)" }}
      >
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--light-blue)", fontFamily: "Inter, sans-serif" }}>
          Visual Archive
        </p>
        <h1 style={{ fontFamily: "STALPH, serif", fontSize: "clamp(2.5rem, 8vw, 7rem)", color: "var(--foreground)", lineHeight: 1 }}>
          Photo
        </h1>
        <div className="divider-yellow mx-auto mt-6" />
      </section>

      {/* Filters */}
      <section className="py-8 px-6 sticky top-16 z-30" style={{ background: "rgba(35,31,32,0.97)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(241,119,174,0.1)" }}>
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3 justify-center">
          {categories.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setCategory(value)}
              className="px-4 py-1.5 text-xs tracking-widest uppercase transition-all"
              style={{
                fontFamily: "Inter, sans-serif",
                background: category === value ? "var(--pink)" : "transparent",
                color: category === value ? "var(--blackish)" : "var(--light-pink)",
                border: `1px solid ${category === value ? "var(--pink)" : "rgba(241,119,174,0.3)"}`,
                fontWeight: category === value ? 700 : 400,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry grid */}
      <section className="py-12 px-6" style={{ background: "var(--blackish)" }}>
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="py-32 text-center">
              <p style={{ fontFamily: "STALPH, serif", color: "var(--pink)", fontSize: "2rem" }}>
                Photos coming soon.
              </p>
              <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>
                UaZit is behind the lens and in front of it.
              </p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
              {filtered.map((photo) => {
                const src = getFileUrl(photo, photo.image);
                return (
                  <div key={photo.id} className="break-inside-avoid mb-4">
                    <button
                      onClick={() => setLightbox(photo)}
                      className="block w-full overflow-hidden rounded-sm vhs-hover group"
                      style={{ border: "1px solid rgba(241,119,174,0.1)" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={photo.alt_text ?? photo.title}
                        className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(35,31,32,0.97)" }}
          onClick={() => setLightbox(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getFileUrl(lightbox, lightbox.image)}
            alt={lightbox.alt_text ?? lightbox.title}
            className="max-w-full max-h-full object-contain rounded-sm"
            style={{ maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-6 right-6 text-2xl"
            style={{ color: "var(--pink)", fontFamily: "STALPH, serif" }}
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          {lightbox.title && (
            <p
              className="absolute bottom-6 left-0 right-0 text-center text-sm"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif" }}
            >
              {lightbox.title}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
