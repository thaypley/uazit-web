import BlogCard from "@/components/BlogCard";
import { getBlogPosts, getFileUrl } from "@/lib/pocketbase";

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* hero */}
      <section
        className="py-20 px-6 text-center"
        style={{ background: "var(--background)", borderBottom: "1px solid rgba(241,119,174,0.15)" }}
      >
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--blue)", fontFamily: "STALPH, serif" }}>
          words
        </p>
        <h1 style={{ fontFamily: "STALPH, serif", fontSize: "clamp(2.5rem, 8vw, 7rem)", color: "var(--blackish)", lineHeight: 1 }}>
          blog
        </h1>
        <div className="divider-yellow mx-auto mt-6" />
      </section>

      {/* posts */}
      <section className="py-20 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-5xl mx-auto">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  fileUrl={post.cover_image ? getFileUrl(post, post.cover_image) : undefined}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p style={{ fontFamily: "STALPH, serif", color: "var(--pink)", fontSize: "2.5rem" }}>
                first post incoming.
              </p>
              <div className="pixel-divider mx-auto mt-6" aria-hidden>
                <span /><span /><span /><span /><span /><span /><span /><span />
              </div>
              <p className="mt-4 text-sm" style={{ color: "var(--text-dim)", fontFamily: "STALPH, serif" }}>
                the words are being assembled. like everything UaZit does — by hand.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
