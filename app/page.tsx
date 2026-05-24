import Link from "next/link";
import HeroGlitch from "@/components/HeroGlitch";
import ReleaseCard from "@/components/ReleaseCard";
import BlogCard from "@/components/BlogCard";
import TourDateCard from "@/components/TourDateCard";
import {
  getAnnouncements,
  getBlogPosts,
  getTourDates,
  getFileUrl,
} from "@/lib/pocketbase";
import { RELEASES_NEWEST_FIRST } from "@/lib/releases";
import { FEATURED_VIDEO } from "@/lib/videos";
import { HOME_BG_PHOTO } from "@/lib/photos";

export const revalidate = 60;

export default async function HomePage() {
  const [announcements, posts, tourDates] = await Promise.all([
    getAnnouncements(),
    getBlogPosts(),
    getTourDates(),
  ]);

  const featuredReleases = RELEASES_NEWEST_FIRST.slice(0, 3);
  const latestPost = posts[0];
  const featuredVideo = FEATURED_VIDEO;
  const nextShow = tourDates[0];
  const pinned = announcements.find((a) => a.pinned) ?? announcements[0];

  return (
    <>
      {/* HERO */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, rgba(101,129,184,0.18) 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, rgba(241,119,174,0.12) 0%, transparent 50%), var(--blackish)",
        }}
      >
        {/* Photo bleed */}
        <div className="photo-bleed">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={HOME_BG_PHOTO} alt="" aria-hidden />
        </div>

        {/* Decorative horizontal scanlines */}
        <div
          className="absolute left-0 right-0 h-px"
          style={{ top: "26%", background: "linear-gradient(to right, transparent, rgba(241,119,174,0.25), transparent)" }}
        />
        <div
          className="absolute left-0 right-0 h-px"
          style={{ top: "74%", background: "linear-gradient(to right, transparent, rgba(250,212,72,0.2), transparent)" }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="kicker mb-10">artist · musician · creator</p>

          <HeroGlitch imageSrc="/logo/uazit.png" imageAlt="UaZit" />

          <div className="pixel-divider mt-8" aria-hidden>
            <span /><span /><span /><span /><span /><span /><span /><span />
          </div>

          <p
            className="mt-4 text-base md:text-lg tracking-wide"
            style={{ color: "rgba(255,255,255,0.62)", fontFamily: "Inter, sans-serif", maxWidth: "36ch", margin: "1rem auto 0" }}
          >
            classic troublemaker.{" "}
            <span style={{ color: "var(--pink)" }}>eternal student of transmutation.</span>
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <Link
              href="/music"
              className="plastic-panel plastic-grape plastic-btn"
            >
              Hear the Music
            </Link>
            <Link
              href="/about"
              className="plastic-panel plastic-bondi plastic-btn"
            >
              The Story
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="mono text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
            ▼ scroll
          </span>
          <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, rgba(241,119,174,0.5), transparent)" }} />
        </div>
      </section>

      {/* ANNOUNCEMENT STRIP */}
      {pinned && (
        <section
          className="py-4 px-6 text-center text-sm mono"
          style={{ background: "var(--yellow)", color: "var(--blackish)", letterSpacing: "0.08em" }}
        >
          <span className="font-bold mr-2">[ NEW ]</span>
          {pinned.title}
        </section>
      )}

      {/* CHUCK MOSLEY PULL QUOTE */}
      <section className="fade-up py-24 px-6 text-center" style={{ background: "var(--blackish)" }}>
        <div className="max-w-4xl mx-auto">
          <p className="kicker mb-6">Chuck Mosley</p>
          <blockquote
            style={{
              fontFamily: "STALPH, serif",
              fontSize: "clamp(2rem, 5.5vw, 5rem)",
              color: "var(--pink)",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}
          >
            "thanks for playing & hypnotizing me"
          </blockquote>
          <div className="pixel-divider mt-8" aria-hidden>
            <span /><span /><span /><span /><span /><span /><span /><span />
          </div>
        </div>
      </section>

      {/* FEATURED RELEASES */}
      {featuredReleases.length > 0 && (
        <section className="fade-up py-20 px-6" style={{ background: "rgba(101,129,184,0.05)" }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <h2
                className="caret"
                style={{ fontFamily: "STALPH, serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--foreground)" }}
              >
                Latest Music
              </h2>
              <Link
                href="/music"
                className="mono text-sm tracking-widest uppercase transition-colors hover:opacity-70"
                style={{ color: "var(--yellow)" }}
              >
                Full Discography →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {featuredReleases.map((r) => (
                <ReleaseCard
                  key={r.id}
                  release={r}
                  fileUrl={r.cover_url}
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
              className="mb-10 text-center caret"
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
            <p className="mt-4 text-center text-sm mono" style={{ color: "rgba(255,255,255,0.5)" }}>
              {featuredVideo.title}
            </p>
            <div className="text-center mt-6">
              <Link
                href="/video"
                className="mono text-sm tracking-widest uppercase transition-colors hover:opacity-70"
                style={{ color: "var(--yellow)" }}
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
            className="mb-10 text-center caret"
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
                    className="mono text-sm tracking-widest uppercase"
                    style={{ color: "var(--yellow)" }}
                  >
                    All Dates →
                  </Link>
                </div>
              )}
            </>
          ) : (
            <p
              className="text-center text-lg"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "STALPH, serif" }}
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
                className="caret"
                style={{ fontFamily: "STALPH, serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--foreground)" }}
              >
                From the Blog
              </h2>
              <Link
                href="/blog"
                className="mono text-sm tracking-widest uppercase"
                style={{ color: "var(--yellow)" }}
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
