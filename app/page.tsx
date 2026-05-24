import Link from "next/link";
import HeroGlitch from "@/components/HeroGlitch";
import ReleaseCard from "@/components/ReleaseCard";
import VideoCard from "@/components/VideoCard";
import BlogCard from "@/components/BlogCard";
import TourDateCard from "@/components/TourDateCard";
import {
  getAnnouncements,
  getReleases,
  getBlogPosts,
  getTourDates,
  getVideos,
  getFileUrl,
} from "@/lib/pocketbase";

export const revalidate = 60;

export default async function HomePage() {
  const [announcements, releases, posts, tourDates, videos] = await Promise.all([
    getAnnouncements(),
    getReleases(),
    getBlogPosts(),
    getTourDates(),
    getVideos(),
  ]);

  const featuredReleases = releases.slice(0, 3);
  const latestPost = posts[0];
  const featuredVideo = videos.find((v) => v.featured) ?? videos[0];
  const nextShow = tourDates[0];
  const pinned = announcements.find((a) => a.pinned) ?? announcements[0];

  return (
    <>
      {/* HERO */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, rgba(101,129,184,0.15) 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, rgba(241,119,174,0.1) 0%, transparent 50%), var(--blackish)",
        }}
      >
        {/* Decorative horizontal lines */}
        <div
          className="absolute left-0 right-0 h-px"
          style={{ top: "30%", background: "linear-gradient(to right, transparent, rgba(241,119,174,0.2), transparent)" }}
        />
        <div
          className="absolute left-0 right-0 h-px"
          style={{ top: "70%", background: "linear-gradient(to right, transparent, rgba(250,212,72,0.15), transparent)" }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <p
            className="text-xs tracking-widest uppercase mb-8"
            style={{ color: "var(--light-blue)", fontFamily: "Inter, sans-serif" }}
          >
            artist · musician · creator
          </p>

          <h1
            className="block mb-6 leading-none"
            style={{
              fontFamily: "STALPH, serif",
              fontSize: "clamp(5rem, 18vw, 16rem)",
              color: "var(--foreground)",
              letterSpacing: "-0.02em",
            }}
          >
            <HeroGlitch text="UaZit" />
          </h1>

          <div className="divider-yellow mx-auto" />

          <p
            className="mt-6 text-base md:text-lg tracking-wide"
            style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Inter, sans-serif", maxWidth: "36ch", margin: "1.5rem auto 0" }}
          >
            classic troublemaker.{" "}
            <span style={{ color: "var(--pink)" }}>eternal student of transmutation.</span>
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <Link
              href="/music"
              className="px-8 py-3 text-sm tracking-widest uppercase transition-all hover:opacity-80"
              style={{ background: "var(--pink)", color: "var(--blackish)", fontFamily: "Inter, sans-serif", fontWeight: 700 }}
            >
              Hear the Music
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 text-sm tracking-widest uppercase transition-all hover:opacity-80"
              style={{ border: "1px solid rgba(241,119,174,0.4)", color: "var(--light-pink)", fontFamily: "Inter, sans-serif" }}
            >
              The Story
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "Inter, sans-serif" }}>
            scroll
          </span>
          <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, rgba(241,119,174,0.5), transparent)" }} />
        </div>
      </section>

      {/* ANNOUNCEMENT STRIP */}
      {pinned && (
        <section
          className="py-4 px-6 text-center text-sm"
          style={{ background: "var(--yellow)", color: "var(--blackish)", fontFamily: "Inter, sans-serif" }}
        >
          <span className="font-bold mr-2">✦ NEW:</span>
          {pinned.title}
        </section>
      )}

      {/* CHUCK MOSLEY PULL QUOTE */}
      <section className="fade-up py-24 px-6 text-center" style={{ background: "var(--blackish)" }}>
        <div className="max-w-4xl mx-auto">
          <p
            className="text-xs tracking-widest uppercase mb-6"
            style={{ color: "var(--light-blue)", fontFamily: "Inter, sans-serif" }}
          >
            Chuck Mosley
          </p>
          <blockquote
            style={{
              fontFamily: "STALPH, serif",
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
              color: "var(--pink)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            "play & hypnotize."
          </blockquote>
          <div className="divider-yellow mx-auto mt-6" />
        </div>
      </section>

      {/* FEATURED RELEASES */}
      {featuredReleases.length > 0 && (
        <section className="fade-up py-20 px-6" style={{ background: "rgba(101,129,184,0.05)" }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <h2
                style={{ fontFamily: "STALPH, serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--foreground)" }}
              >
                Latest Music
              </h2>
              <Link
                href="/music"
                className="text-sm tracking-widest uppercase transition-colors hover:opacity-70"
                style={{ color: "var(--yellow)", fontFamily: "Inter, sans-serif" }}
              >
                Full Discography →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {featuredReleases.map((r) => (
                <ReleaseCard
                  key={r.id}
                  release={r}
                  fileUrl={r.cover_art ? getFileUrl(r, r.cover_art) : undefined}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FEATURED VIDEO */}
      {featuredVideo && (
        <section className="py-20 px-6" style={{ background: "var(--blackish)" }}>
          <div className="max-w-4xl mx-auto">
            <h2
              className="mb-10 text-center"
              style={{ fontFamily: "STALPH, serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--foreground)" }}
            >
              Watch
            </h2>
            <div className="aspect-video rounded-sm overflow-hidden" style={{ border: "1px solid rgba(241,119,174,0.2)" }}>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${featuredVideo.youtube_id}?rel=0`}
                title={featuredVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="mt-4 text-center text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>
              {featuredVideo.title}
            </p>
            <div className="text-center mt-6">
              <Link
                href="/video"
                className="text-sm tracking-widest uppercase transition-colors hover:opacity-70"
                style={{ color: "var(--yellow)", fontFamily: "Inter, sans-serif" }}
              >
                All Videos →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* TOUR / NEXT SHOW */}
      <section className="py-20 px-6" style={{ background: "rgba(241,119,174,0.04)" }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="mb-10 text-center"
            style={{ fontFamily: "STALPH, serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--foreground)" }}
          >
            Tour
          </h2>
          {nextShow ? (
            <>
              <TourDateCard date={nextShow} />
              {tourDates.length > 1 && (
                <div className="text-center mt-6">
                  <Link
                    href="/tour"
                    className="text-sm tracking-widest uppercase"
                    style={{ color: "var(--yellow)", fontFamily: "Inter, sans-serif" }}
                  >
                    All Dates →
                  </Link>
                </div>
              )}
            </>
          ) : (
            <p
              className="text-center text-lg"
              style={{ color: "rgba(255,255,255,0.35)", fontFamily: "STALPH, serif" }}
            >
              No shows scheduled — yet.
            </p>
          )}
        </div>
      </section>

      {/* LATEST BLOG POST */}
      {latestPost && (
        <section className="py-20 px-6" style={{ background: "var(--blackish)" }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <h2
                style={{ fontFamily: "STALPH, serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--foreground)" }}
              >
                From the Blog
              </h2>
              <Link
                href="/blog"
                className="text-sm tracking-widest uppercase"
                style={{ color: "var(--yellow)", fontFamily: "Inter, sans-serif" }}
              >
                All Posts →
              </Link>
            </div>
            <BlogCard
              post={latestPost}
              fileUrl={latestPost.cover_image ? getFileUrl(latestPost, latestPost.cover_image) : undefined}
            />
          </div>
        </section>
      )}
    </>
  );
}
