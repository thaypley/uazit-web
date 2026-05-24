import Link from "next/link";
import type { BlogPost } from "@/lib/types";

interface Props {
  post: BlogPost;
  fileUrl?: string;
}

export default function BlogCard({ post, fileUrl }: Props) {
  const date = new Date(post.published_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const excerpt = post.content
    .replace(/<[^>]+>/g, "")
    .slice(0, 140)
    .trim() + "…";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-sm overflow-hidden transition-transform duration-300 hover:-translate-y-1"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(241,119,174,0.1)" }}
    >
      {fileUrl && (
        <div className="aspect-video overflow-hidden vhs-hover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fileUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-5">
        <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--yellow)", fontFamily: "Inter, sans-serif" }}>
          {date}
        </p>
        <h2
          className="text-xl mb-3 leading-snug"
          style={{ fontFamily: "STALPH, serif", color: "var(--foreground)" }}
        >
          {post.title}
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Inter, sans-serif" }}>
          {excerpt}
        </p>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-sm"
                style={{ background: "rgba(101,129,184,0.2)", color: "var(--light-blue)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
