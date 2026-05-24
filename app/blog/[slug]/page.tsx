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
      {/* Hero */}
      <section
        className="py-20 px-6 text-center relative"
        style={{ background: "var(--blackish)", borderBottom: "1px solid rgba(241,119,174,0.1)" }}
      >
        {post.cover_image && (
          <div className="absolute inset-0 overflow-hidden opacity-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getFileUrl(post, post.cover_image)}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--yellow)", fontFamily: "Inter, sans-serif" }}>
            {date}
          </p>
          <h1
            style={{
              fontFamily: "STALPH, serif",
              fontSize: "clamp(2rem, 6vw, 5rem)",
              color: "var(--foreground)",
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
                  style={{ background: "rgba(101,129,184,0.2)", color: "var(--light-blue)", fontFamily: "Inter, sans-serif" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <article className="py-20 px-6" style={{ background: "var(--blackish)" }}>
        <div
          className="max-w-3xl mx-auto prose prose-invert prose-lg"
          style={{
            color: "rgba(255,255,255,0.75)",
            fontFamily: "Inter, sans-serif",
            lineHeight: 1.8,
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Back */}
      <section className="py-12 px-6 text-center" style={{ background: "var(--blackish)", borderTop: "1px solid rgba(241,119,174,0.1)" }}>
        <Link
          href="/blog"
          className="text-sm tracking-widest uppercase transition-colors hover:opacity-70"
          style={{ color: "var(--yellow)", fontFamily: "Inter, sans-serif" }}
        >
          ← Back to Blog
        </Link>
      </section>
    </div>
  );
}
