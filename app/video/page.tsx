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
          background: "linear-gradient(to bottom, rgba(35,31,32,0.9), var(--blackish))",
          borderBottom: "1px solid rgba(241,119,174,0.1)",
        }}
      >
        <p className="kicker mb-4">Visual</p>
        <h1
          className="caret"
          style={{ fontFamily: "STALPH, serif", fontSize: "clamp(2.5rem, 8vw, 7rem)", color: "var(--foreground)", lineHeight: 1 }}
        >
          Video
        </h1>
        <div className="pixel-divider mt-6" aria-hidden>
          <span /><span /><span /><span /><span /><span /><span /><span />
        </div>
        <p className="mono mt-6 text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>
          {VIDEOS.length} frames · official videos
        </p>
      </section>

      <section className="py-16 px-6" style={{ background: "var(--blackish)" }}>
        <div className="max-w-4xl mx-auto">
          <p className="kicker mb-6 text-center" style={{ color: "var(--yellow)" }}>Latest Video</p>
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
          <p className="mt-4 text-center" style={{ fontFamily: "STALPH, serif", fontSize: "1.5rem", color: "var(--foreground)" }}>
            {FEATURED_VIDEO.title}
          </p>
          <p className="mono text-center text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
            {new Date(FEATURED_VIDEO.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
            {FEATURED_VIDEO.category ? ` · ${FEATURED_VIDEO.category}` : ""}
          </p>
        </div>
      </section>

      {rest.length > 0 && (
        <section className="py-16 px-6" style={{ background: "rgba(101,129,184,0.04)" }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="mb-10 caret" style={{ fontFamily: "STALPH, serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--foreground)" }}>
              More Videos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {rest.map((video) => (
                <div key={video.id}>
                  <VideoCard video={video} />
                  <p className="mt-2 mono text-xs tracking-widest uppercase text-center" style={{ color: "rgba(255,255,255,0.35)" }}>
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
        style={{ background: "var(--blackish)", borderTop: "1px solid rgba(241,119,174,0.1)" }}
      >
        <p className="kicker mb-4">See the full show</p>
        <h2 className="mb-6 caret" style={{ fontFamily: "STALPH, serif", fontSize: "clamp(1.5rem, 4vw, 3rem)", color: "var(--foreground)" }}>
          theWAZUAZshow
        </h2>
        <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Inter, sans-serif" }}>
          Reality show · tour diaries · creative life unfiltered
        </p>
        <a
          href="https://www.youtube.com/@thewazuazshow"
          target="_blank"
          rel="noopener noreferrer"
          className="plastic-panel plastic-grape plastic-btn"
        >
          Watch on YouTube ↗
        </a>
      </section>
    </div>
  );
}
