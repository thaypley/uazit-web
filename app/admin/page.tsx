"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAllBlogPosts, deleteBlogPost, adminLogout } from "@/lib/pocketbase-admin";
import AuthGuard from "@/components/admin/AuthGuard";
import type { BlogPost } from "@/lib/types";

function PostCard({ post, onDelete }: { post: BlogPost; onDelete: (id: string) => void }) {
  const date = new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const isDraft = post.draft;

  return (
    <div
      className="plastic-panel p-5 flex flex-col gap-3"
      style={{
        ...(isDraft
          ? { background: "rgba(250,212,72,0.18)", border: "1px solid rgba(250,212,72,0.45)" }
          : { background: "rgba(241,119,174,0.18)", border: "1px solid rgba(241,119,174,0.45)" }),
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p style={{ fontFamily: "STALPH, serif", fontSize: "1.1rem", color: "var(--blackish)", lineHeight: 1.2 }}>
            {post.title || "(untitled)"}
          </p>
          <p className="mono text-xs tracking-widest mt-1" style={{ color: "var(--text-dim)" }}>
            {post.slug} · {date}
          </p>
        </div>
        <span
          className="mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-sm"
          style={{
            background: isDraft ? "rgba(250,212,72,0.35)" : "rgba(241,119,174,0.3)",
            color: "var(--blackish)",
            whiteSpace: "nowrap",
          }}
        >
          {isDraft ? "draft" : "live"}
        </span>
      </div>

      <div className="flex gap-3">
        <Link
          href={`/admin/edit/${post.id}`}
          className="mono text-xs tracking-widest uppercase transition-opacity hover:opacity-70"
          style={{ color: "var(--blue)" }}
        >
          edit →
        </Link>
        {!isDraft && (
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            className="mono text-xs tracking-widest uppercase transition-opacity hover:opacity-70"
            style={{ color: "var(--pink)" }}
          >
            view ↗
          </Link>
        )}
        <button
          onClick={() => {
            if (confirm("delete this post?")) onDelete(post.id);
          }}
          className="mono text-xs tracking-widest uppercase transition-opacity hover:opacity-70 ml-auto"
          style={{ color: "rgba(35,31,32,0.35)", background: "none", border: "none", cursor: "pointer" }}
        >
          delete
        </button>
      </div>
    </div>
  );
}

function AdminHome() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const all = await getAllBlogPosts();
    setPosts(all);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    await deleteBlogPost(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const logout = () => {
    adminLogout();
    router.push("/admin/login");
  };

  const drafts = posts.filter((p) => p.draft);
  const published = posts.filter((p) => !p.draft);

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* header */}
      <div
        className="sticky top-0 z-20 px-6 py-4 flex items-center justify-between nav-gradient"
        style={{ borderBottom: "1px solid rgba(241,119,174,0.18)" }}
      >
        <h1 style={{ fontFamily: "STALPH, serif", fontSize: "1.5rem", color: "var(--pink)" }}>
          the back room
        </h1>
        <div className="flex items-center gap-4">
          <Link href="/" className="mono text-xs tracking-widest uppercase" style={{ color: "var(--blue)" }}>
            view site ↗
          </Link>
          <button
            onClick={logout}
            className="mono text-xs tracking-widest uppercase"
            style={{ color: "var(--text-dim)", background: "none", border: "none", cursor: "pointer" }}
          >
            logout
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {loading ? (
          <p className="mono text-sm text-center" style={{ color: "var(--text-dim)" }}>loading...</p>
        ) : (
          <>
            {/* drafts */}
            {drafts.length > 0 && (
              <div className="mb-10">
                <p className="mono text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-dim)" }}>
                  drafts ({drafts.length})
                </p>
                <div className="flex flex-col gap-3">
                  {drafts.map((p) => <PostCard key={p.id} post={p} onDelete={handleDelete} />)}
                </div>
              </div>
            )}

            {/* published */}
            {published.length > 0 ? (
              <div>
                <p className="mono text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-dim)" }}>
                  published ({published.length})
                </p>
                <div className="flex flex-col gap-3">
                  {published.map((p) => <PostCard key={p.id} post={p} onDelete={handleDelete} />)}
                </div>
              </div>
            ) : drafts.length === 0 ? (
              <div className="py-20 text-center">
                <p style={{ fontFamily: "STALPH, serif", color: "var(--pink)", fontSize: "2rem" }}>
                  the page is patient. so are you.
                </p>
                <div className="pixel-divider mx-auto mt-6" aria-hidden>
                  <span /><span /><span /><span /><span /><span /><span /><span />
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>

      {/* floating new post button */}
      <Link
        href="/admin/new"
        className="fixed bottom-8 right-8 plastic-panel plastic-grape plastic-btn"
        style={{ fontSize: "1.4rem", padding: "0.8rem 1.2rem", lineHeight: 1 }}
        title="new post"
      >
        +
      </Link>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AuthGuard>
      <AdminHome />
    </AuthGuard>
  );
}
