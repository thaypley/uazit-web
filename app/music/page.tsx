"use client";

import { useState } from "react";
import ReleaseCard from "@/components/ReleaseCard";
import { RELEASES_NEWEST_FIRST, FEATURED_RELEASE } from "@/lib/releases";
import { MUSIC_BG_PHOTO } from "@/lib/photos";

type Filter = "all" | "album" | "ep" | "single";

const filters: { label: string; value: Filter }[] = [
  { label: "all", value: "all" },
  { label: "albums", value: "album" },
  { label: "eps", value: "ep" },
  { label: "singles", value: "single" },
];

const chrono = RELEASES_NEWEST_FIRST;

export default function MusicPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all" ? chrono : chrono.filter((r) => r.type === filter);

  const featuredEmbed = FEATURED_RELEASE.bandcamp_embed_type === "album"
    ? `https://uazit.bandcamp.com/EmbeddedPlayer/album=${FEATURED_RELEASE.bandcamp_embed_id}/`
    : `https://uazit.bandcamp.com/EmbeddedPlayer/track=${FEATURED_RELEASE.bandcamp_embed_id}/`;

  return (
    <div style={{ paddingTop: "80px" }}>
      <section
        className="py-24 px-6 text-center relative overflow-hidden"
        style={{
          background: "var(--background)",
          borderBottom: "1px solid rgba(101,129,184,0.2)",
        }}
      >
        <div className="photo-bleed">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={MUSIC_BG_PHOTO} alt="" aria-hidden />
        </div>

        <div className="relative z-10">
          <p className="kicker mb-4">discography</p>
          <h1
            className="caret"
            style={{
              fontFamily: "STALPH, serif",
              fontSize: "clamp(2.5rem, 8vw, 7rem)",
              color: "var(--blackish)",
              lineHeight: 1,
            }}
          >
            music
          </h1>
          <div className="pixel-divider mt-6" aria-hidden>
            <span /><span /><span /><span /><span /><span /><span /><span />
          </div>
          <p
            className="mt-6 text-lg md:text-xl italic"
            style={{ color: "var(--pink)", fontFamily: "STALPH, serif", maxWidth: "44ch", margin: "1.5rem auto 0" }}
          >
            "vocal range greater than a mid-century Sears-Roebuck catalog."
          </p>
          <p className="mt-3 mono text-xs tracking-widest uppercase" style={{ color: "var(--text-dim)" }}>
            multi-instrumentalist · independent producer · genre bender
          </p>

          <div className="flex flex-wrap gap-3 justify-center mt-8">
            {["rock 'n' roll", "alternative", "80s pop", "trip-hop"].map((g) => (
              <span
                key={g}
                className="mono text-xs px-3 py-1 rounded-sm tracking-widest uppercase"
                style={{ border: "1px solid rgba(241,119,174,0.4)", color: "var(--blackish)" }}
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6" style={{ background: "var(--bg-alt)" }}>
        <div className="max-w-2xl mx-auto">
          <p className="kicker mb-6 text-center" style={{ color: "var(--yellow)" }}>latest release</p>
          <div className="plastic-panel plastic-blueberry" style={{ padding: "8px" }}>
            <iframe
              style={{ border: 0, width: "100%", height: "400px", display: "block", borderRadius: 8 }}
              src={`${featuredEmbed}size=large/bgcol=f0cbd9/linkcol=f177ae/tracklist=true/transparent=true/`}
              seamless
              title={FEATURED_RELEASE.title}
              allow="autoplay"
            />
          </div>
          <p className="mt-4 text-center">
            <a
              href="https://uazit.bandcamp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mono text-sm tracking-widest uppercase transition-colors hover:opacity-70"
              style={{ color: "var(--blue)" }}
            >
              full catalog on bandcamp ↗
            </a>
          </p>
        </div>
      </section>

      <section className="py-16 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {filters.map(({ label, value }) => {
              const active = filter === value;
              return (
                <button
                  key={value}
                  onClick={() => setFilter(value)}
                  className={`plastic-panel plastic-btn ${active ? "plastic-grape" : "plastic-blueberry"}`}
                  style={{
                    color: "var(--blackish)",
                    fontWeight: active ? 700 : 500,
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p style={{ fontFamily: "STALPH, serif", color: "var(--pink)", fontSize: "2rem" }}>
                more coming soon.
              </p>
            </div>
          ) : (
            <>
              <p className="mono text-center text-xs tracking-widest uppercase mb-8" style={{ color: "var(--text-dim)" }}>
                {filtered.length} {filtered.length === 1 ? "release" : "releases"} · chronological
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filtered.map((r) => (
                  <div key={r.id}>
                    <ReleaseCard release={r} fileUrl={r.cover_url} />
                    <p className="mt-2 mono text-xs tracking-widest uppercase text-center" style={{ color: "var(--text-dim)" }}>
                      {new Date(r.release_date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
