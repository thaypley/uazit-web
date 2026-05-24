import VideoCard from "@/components/VideoCard";
import { getVideos } from "@/lib/pocketbase";

export const revalidate = 60;

export default async function VideoPage() {
  const videos = await getVideos();
  const featured = videos.find((v) => v.featured) ?? videos[0];
  const rest = videos.filter((v) => v.id !== featured?.id);

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <section
        className="py-20 px-6 text-center"
        style={{ background: "linear-gradient(to bottom, rgba(35,31,32,0.9), var(--blackish))", borderBottom: "1px solid rgba(241,119,174,0.1)" }}
      >
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--light-blue)", fontFamily: "Inter, sans-serif" }}>
          Visual
        </p>
        <h1 style={{ fontFamily: "STALPH, serif", fontSize: "clamp(2.5rem, 8vw, 7rem)", color: "var(--foreground)", lineHeight: 1 }}>
          Video
        </h1>
        <div className="divider-yellow mx-auto mt-6" />
      </section>

      {/* Featured embed */}
      {featured && (
        <section className="py-16 px-6" style={{ background: "var(--blackish)" }}>
          <div className="max-w-4xl mx-auto">
            <div
              className="aspect-video rounded-sm overflow-hidden"
              style={{ border: "1px solid rgba(241,119,174,0.2)" }}
            >
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${featured.youtube_id}?rel=0`}
                title={featured.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>
              {featured.title}
            </p>
          </div>
        </section>
      )}

      {/* Video grid */}
      {rest.length > 0 && (
        <section className="py-16 px-6" style={{ background: "rgba(101,129,184,0.03)" }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="mb-10" style={{ fontFamily: "STALPH, serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--foreground)" }}>
              More Videos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {rest.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty state */}
      {videos.length === 0 && (
        <section className="py-32 px-6 text-center" style={{ background: "var(--blackish)" }}>
          <p style={{ fontFamily: "STALPH, serif", color: "var(--pink)", fontSize: "2.5rem" }}>
            Coming Soon.
          </p>
          <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>
            Videos loading into the webiverse.
          </p>
        </section>
      )}

      {/* theWAZUAZshow CTA */}
      <section
        className="py-20 px-6 text-center"
        style={{ background: "var(--blackish)", borderTop: "1px solid rgba(241,119,174,0.1)" }}
      >
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--light-blue)", fontFamily: "Inter, sans-serif" }}>
          See the full show
        </p>
        <h2 className="mb-6" style={{ fontFamily: "STALPH, serif", fontSize: "clamp(1.5rem, 4vw, 3rem)", color: "var(--foreground)" }}>
          theWAZUAZshow
        </h2>
        <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif" }}>
          Reality show · tour diaries · creative life unfiltered
        </p>
        <a
          href="https://www.youtube.com/@thewazuazshow"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 text-sm tracking-widest uppercase transition-all hover:opacity-80"
          style={{ background: "var(--pink)", color: "var(--blackish)", fontFamily: "Inter, sans-serif", fontWeight: 700 }}
        >
          Watch on YouTube →
        </a>
      </section>
    </div>
  );
}
