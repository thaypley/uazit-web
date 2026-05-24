"use client";

import { useState, useEffect } from "react";
import ReleaseCard from "@/components/ReleaseCard";
import BandcampPlayer from "@/components/BandcampPlayer";
import { getReleases, getFileUrl } from "@/lib/pocketbase";
import type { Release } from "@/lib/types";

type Filter = "all" | "album" | "ep" | "single";

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Albums", value: "album" },
  { label: "EPs", value: "ep" },
  { label: "Singles", value: "single" },
];

export default function MusicPage() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReleases().then((data) => {
      setReleases(data);
      setLoading(false);
    });
  }, []);

  const filtered = filter === "all" ? releases : releases.filter((r) => r.type === filter);
  const featured = releases[0];

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Page hero */}
      <section
        className="py-24 px-6 text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, rgba(101,129,184,0.08), var(--blackish))",
          borderBottom: "1px solid rgba(241,119,174,0.1)",
        }}
      >
        <p
          className="text-xs tracking-widest uppercase mb-4"
          style={{ color: "var(--light-blue)", fontFamily: "Inter, sans-serif" }}
        >
          Discography
        </p>
        <h1
          style={{
            fontFamily: "STALPH, serif",
            fontSize: "clamp(2.5rem, 8vw, 7rem)",
            color: "var(--foreground)",
            lineHeight: 1,
          }}
        >
          Music
        </h1>
        <div className="divider-yellow mx-auto mt-6" />
        <p
          className="mt-6 text-lg md:text-xl italic"
          style={{ color: "var(--pink)", fontFamily: "Inter, sans-serif", maxWidth: "44ch", margin: "1.5rem auto 0" }}
        >
          "Vocal range greater than a mid-century Sears-Roebuck catalog."
        </p>
        <p
          className="mt-3 text-xs tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Inter, sans-serif" }}
        >
          Multi-instrumentalist · Independent Producer · Genre Bender
        </p>

        {/* Genre tags */}
        <div className="flex flex-wrap gap-3 justify-center mt-8">
          {["Rock 'n' Roll", "Alternative", "80s Pop", "Trip-Hop"].map((g) => (
            <span
              key={g}
              className="text-xs px-3 py-1 rounded-sm tracking-widest uppercase"
              style={{ border: "1px solid rgba(241,119,174,0.3)", color: "var(--light-pink)", fontFamily: "Inter, sans-serif" }}
            >
              {g}
            </span>
          ))}
        </div>
      </section>

      {/* Bandcamp featured player */}
      {featured?.bandcamp_url && (
        <section className="py-16 px-6" style={{ background: "rgba(35,31,32,0.98)" }}>
          <div className="max-w-2xl mx-auto">
            <p
              className="text-xs tracking-widest uppercase mb-6 text-center"
              style={{ color: "var(--yellow)", fontFamily: "Inter, sans-serif" }}
            >
              Latest Release
            </p>
            <BandcampPlayer url={featured.bandcamp_url} title={featured.title} />
            <p className="mt-4 text-center">
              <a
                href="https://uazit.bandcamp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-widest uppercase transition-colors hover:opacity-70"
                style={{ color: "var(--light-blue)", fontFamily: "Inter, sans-serif" }}
              >
                Full catalog on Bandcamp ↗
              </a>
            </p>
          </div>
        </section>
      )}

      {/* Filter + Grid */}
      <section className="py-16 px-6" style={{ background: "var(--blackish)" }}>
        <div className="max-w-6xl mx-auto">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {filters.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className="px-5 py-2 text-sm tracking-widest uppercase transition-all"
                style={{
                  fontFamily: "Inter, sans-serif",
                  background: filter === value ? "var(--pink)" : "transparent",
                  color: filter === value ? "var(--blackish)" : "var(--light-pink)",
                  border: `1px solid ${filter === value ? "var(--pink)" : "rgba(241,119,174,0.3)"}`,
                  fontWeight: filter === value ? 700 : 400,
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Inter, sans-serif" }}>
              Loading...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p style={{ fontFamily: "STALPH, serif", color: "var(--pink)", fontSize: "2rem" }}>
                More coming soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((r) => (
                <ReleaseCard
                  key={r.id}
                  release={r}
                  fileUrl={r.cover_art ? getFileUrl(r, r.cover_art) : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
