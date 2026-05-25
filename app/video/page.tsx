import VideoCard from "@/components/VideoCard";
import { VIDEOS, FEATURED_VIDEO } from "@/lib/videos";

export const revalidate = 3600;

export default function VideoPage() {
  const rest = VIDEOS.filter((v) => v.id !== FEATURED_VIDEO.id);

  return (
    <div style={{ paddingTop: "80px" }}>
      <section
        className="py-20 px-6 text-center"
        style={{
          background: "var(--background)",
          borderBottom: "1px solid rgba(241,119,174,0.15)",
        }}
      >
        <p className="kicker mb-4">visual</p>
        <h1
          className="caret"
          style={{ fontFamily: "STALPH, serif", fontSize: "clamp(2.5rem, 8vw, 7rem)", color: "var(--blackish)", lineHeight: 1 }}
        >
          video
        </h1>
        <div className="pixel-divider mt-6" aria-hidden>
          <span /><span /><span /><span /><span /><span /><span /><span />
        </div>
        <p className="mono mt-6 text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
          {VIDEOS.length} frames · official videos
        </p>
      </section>

      <section className="py-16 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-4xl mx-auto">
          <p className="kicker mb-6 text-center" style={{ color: "var(--yellow)" }}>latest video</p>
          <div className="plastic-panel plastic-grape" style={{ padding: "8px" }}>
            <div className="aspect-video overflow-hidden" style={{ borderRadius: 8 }}>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${FEATURED_VIDEO.youtube_id}?rel=0`}
                title={FEATURED_VIDEO.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <p className="mt-4 text-center" style={{ fontFamily: "STALPH, serif", fontSize: "1.5rem", color: "var(--blackish)" }}>
            {FEATURED_VIDEO.title}
          </p>
          <p className="mono text-center text-xs tracking-widest uppercase" style={{ color: "var(--text-dim)" }}>
            {new Date(FEATURED_VIDEO.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
            {FEATURED_VIDEO.category ? ` · ${FEATURED_VIDEO.category}` : ""}
          </p>
        </div>
      </section>

      {rest.length > 0 && (
        <section className="py-16 px-6" style={{ background: "var(--bg-alt)" }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="mb-10 caret" style={{ fontFamily: "STALPH, serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--blackish)" }}>
              more videos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {rest.map((video) => (
                <div key={video.id}>
                  <VideoCard video={video} />
                  <p className="mt-2 mono text-xs tracking-widest uppercase text-center" style={{ color: "var(--text-dim)" }}>
                    {new Date(video.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        className="py-20 px-6 text-center"
        style={{ background: "var(--background)", borderTop: "1px solid rgba(241,119,174,0.12)" }}
      >
        <p className="kicker mb-4">see the full show</p>
        <h2 className="mb-6 caret" style={{ fontFamily: "STALPH, serif", fontSize: "clamp(1.5rem, 4vw, 3rem)", color: "var(--blackish)" }}>
          theWAZUAZshow
        </h2>
        <p className="text-sm mb-8" style={{ color: "var(--text-muted)", fontFamily: "STALPH, serif" }}>
          Self-produced by WaZeil & UaZit : tour diaries, creative process, an unfiltered life in art.
        </p>
        <a
          href="https://www.youtube.com/@thewazuazshow"
          target="_blank"
          rel="noopener noreferrer"
          className="plastic-panel plastic-grape plastic-btn"
        >
          watch on youtube ↗
        </a>
      </section>
    </div>
  );
}
