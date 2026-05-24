import BlogCard from "@/components/BlogCard";
import { getBlogPosts, getFileUrl } from "@/lib/pocketbase";

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <section
        className="py-20 px-6 text-center"
        style={{ background: "linear-gradient(to bottom, rgba(101,129,184,0.06), var(--blackish))", borderBottom: "1px solid rgba(241,119,174,0.1)" }}
      >
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--light-blue)", fontFamily: "Inter, sans-serif" }}>
          Words
        </p>
        <h1 style={{ fontFamily: "STALPH, serif", fontSize: "clamp(2.5rem, 8vw, 7rem)", color: "var(--foreground)", lineHeight: 1 }}>
          Blog
        </h1>
        <div className="divider-yellow mx-auto mt-6" />
      </section>

      {/* Posts */}
      <section className="py-20 px-6" style={{ background: "var(--blackish)" }}>
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
                First post incoming.
              </p>
              <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>
                The words are being assembled. Like everything UaZit does — by hand.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
