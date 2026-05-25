import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPost, getFileUrl } from "@/lib/pocketbase";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const date = new Date(post.published_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* hero */}
      <section
        className="py-20 px-6 text-center relative"
        style={{ background: "var(--background)", borderBottom: "1px solid rgba(241,119,174,0.15)" }}
      >
        {post.cover_image && (
          <div className="photo-bleed">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getFileUrl(post, post.cover_image)}
              alt=""
            />
          </div>
        )}
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--blue)", fontFamily: "STALPH, serif" }}>
            {date}
          </p>
          <h1
            style={{
              fontFamily: "STALPH, serif",
              fontSize: "clamp(2rem, 6vw, 5rem)",
              color: "var(--blackish)",
              lineHeight: 1.05,
            }}
          >
            {post.title}
          </h1>
          <div className="divider-yellow mx-auto mt-6" />
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-sm"
                  style={{ background: "rgba(101,129,184,0.2)", color: "var(--blackish)", fontFamily: "STALPH, serif" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* content */}
      <article className="py-20 px-6" style={{ background: "var(--background)" }}>
        <div
          className="max-w-3xl mx-auto prose prose-lg"
          style={{
            color: "var(--text-muted)",
            fontFamily: "STALPH, serif",
            lineHeight: 1.8,
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* back */}
      <section className="py-12 px-6 text-center" style={{ background: "var(--bg-alt)", borderTop: "1px solid rgba(241,119,174,0.12)" }}>
        <Link
          href="/blog"
          className="text-sm tracking-widest uppercase transition-colors hover:opacity-70"
          style={{ color: "var(--blue)", fontFamily: "STALPH, serif" }}
        >
          ← back to blog
        </Link>
      </section>
    </div>
  );
}
