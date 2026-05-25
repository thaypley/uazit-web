"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBlogPost, updateBlogPost, slugify, type BlogPostPayload } from "@/lib/pocketbase-admin";
import { markdownToHtml } from "@/lib/markdown";
import type { BlogPost } from "@/lib/types";

interface EditorProps {
  post?: BlogPost;
}

export default function Editor({ post }: EditorProps) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [body, setBody] = useState("");
  const [isDraft, setIsDraft] = useState(post?.draft ?? true);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [preview, setPreview] = useState(false);
  const [slugLocked, setSlugLocked] = useState(!!post);

  // Strip HTML from existing content for editing (basic reverse)
  useEffect(() => {
    if (post?.content) {
      const stripped = post.content
        .replace(/<\/p>/g, "\n\n")
        .replace(/<\/h[1-3]>/g, "\n\n")
        .replace(/<\/li>/g, "\n")
        .replace(/<[^>]+>/g, "")
        .trim();
      setBody(stripped);
    }
  }, [post]);

  const handleTitle = (v: string) => {
    setTitle(v);
    if (!slugLocked) setSlug(slugify(v));
  };

  const handleCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setCoverFile(file);
    if (file) setCoverPreview(URL.createObjectURL(file));
  };

  const save = async (draft: boolean) => {
    if (!title.trim() || !slug.trim()) return;
    setStatus("saving");
    setIsDraft(draft);

    const payload: BlogPostPayload = {
      title: title.trim(),
      slug: slug.trim(),
      content: markdownToHtml(body),
      published_at: new Date().toISOString(),
      draft,
      cover_image: coverFile,
    };

    const result = post
      ? await updateBlogPost(post.id, payload)
      : await createBlogPost(payload);

    if (result) {
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
      if (!post) router.push(`/admin/edit/${result.id}`);
    } else {
      setStatus("error");
    }
  };

  const btnBase: React.CSSProperties = {
    fontFamily: "STALPH, serif",
    fontSize: "0.8rem",
    letterSpacing: "0.12em",
    textTransform: "lowercase",
    cursor: "pointer",
    border: "none",
    padding: "0.6rem 1.4rem",
    transition: "opacity 0.15s",
  };

  const inputBase: React.CSSProperties = {
    background: "rgba(255,255,255,0.7)",
    border: "1px solid rgba(241,119,174,0.3)",
    color: "var(--blackish)",
    fontFamily: "STALPH, serif",
    fontSize: "0.9rem",
    padding: "0.6rem 0.9rem",
    outline: "none",
    borderRadius: "2px",
    width: "100%",
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--background)" }}>
      {/* top bar */}
      <div
        className="flex items-center justify-between px-6 py-3 sticky top-0 z-20"
        style={{ background: "color-mix(in srgb, var(--background) 95%, transparent)", borderBottom: "1px solid rgba(241,119,174,0.2)", backdropFilter: "blur(8px)" }}
      >
        <button
          onClick={() => router.push("/admin")}
          style={{ ...btnBase, background: "transparent", color: "var(--blue)", padding: "0.4rem 0" }}
        >
          ← back
        </button>

        <div className="flex items-center gap-3">
          {status === "saving" && <span className="mono text-xs" style={{ color: "var(--text-dim)" }}>saving...</span>}
          {status === "saved" && <span className="mono text-xs" style={{ color: "var(--blue)" }}>✓ saved</span>}
          {status === "error" && <span className="mono text-xs" style={{ color: "var(--pink)" }}>error — try again</span>}

          <button
            onClick={() => setPreview(!preview)}
            style={{ ...btnBase, background: "rgba(101,129,184,0.2)", color: "var(--blackish)", border: "1px solid rgba(101,129,184,0.4)" }}
          >
            {preview ? "write" : "preview"}
          </button>

          <button
            onClick={() => save(true)}
            disabled={status === "saving"}
            style={{ ...btnBase, background: "rgba(250,212,72,0.35)", color: "var(--blackish)", border: "1px solid rgba(250,212,72,0.5)" }}
          >
            save draft
          </button>

          <button
            onClick={() => save(false)}
            disabled={status === "saving"}
            className="plastic-panel plastic-grape plastic-btn"
            style={{ padding: "0.6rem 1.4rem", fontSize: "0.8rem" }}
          >
            {isDraft ? "publish" : "update"}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* title */}
        <input
          value={title}
          onChange={(e) => handleTitle(e.target.value)}
          placeholder="title"
          style={{
            ...inputBase,
            fontFamily: "STALPH, serif",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            border: "none",
            borderBottom: "2px solid rgba(241,119,174,0.3)",
            borderRadius: 0,
            background: "transparent",
            padding: "0 0 0.5rem 0",
            marginBottom: "1rem",
          }}
        />

        {/* slug */}
        <div className="flex items-center gap-2 mb-6">
          <span className="mono text-xs tracking-widest" style={{ color: "var(--text-ghost)" }}>slug:</span>
          <input
            value={slug}
            onChange={(e) => { setSlug(e.target.value); setSlugLocked(true); }}
            placeholder="auto-generated"
            style={{ ...inputBase, fontSize: "0.8rem", width: "auto", flexGrow: 1, padding: "0.3rem 0.6rem" }}
          />
          {slugLocked && (
            <button
              onClick={() => { setSlug(slugify(title)); setSlugLocked(false); }}
              style={{ ...btnBase, background: "transparent", color: "var(--text-dim)", fontSize: "0.75rem", padding: "0.2rem 0.5rem" }}
            >
              reset
            </button>
          )}
        </div>

        {/* cover image */}
        <div
          className="mb-6 relative flex items-center justify-center"
          style={{ height: "200px", border: "2px dashed rgba(241,119,174,0.4)", borderRadius: "8px", cursor: "pointer", overflow: "hidden", background: "rgba(255,255,255,0.4)" }}
          onClick={() => fileRef.current?.click()}
        >
          {coverPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={coverPreview} alt="cover" className="w-full h-full object-cover" />
          ) : post?.cover_image ? (
            <p className="mono text-xs tracking-widest" style={{ color: "var(--text-dim)" }}>cover set · click to replace</p>
          ) : (
            <p className="mono text-xs tracking-widest" style={{ color: "var(--text-dim)" }}>+ drop a cover image</p>
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleCover} />
        </div>

        {/* body */}
        {preview ? (
          <div
            className="prose prose-lg max-w-none"
            style={{ color: "var(--text-muted)", fontFamily: "STALPH, serif", lineHeight: 1.8, minHeight: "60vh" }}
            dangerouslySetInnerHTML={{ __html: markdownToHtml(body) }}
          />
        ) : (
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={"# your heading\n\nwrite here. markdown is fine.\n\n**bold** · *italic* · [link](url)"}
            style={{
              width: "100%",
              minHeight: "60vh",
              background: "transparent",
              border: "none",
              borderTop: "1px solid rgba(241,119,174,0.2)",
              color: "var(--blackish)",
              fontFamily: "var(--font-vt323, 'VT323', monospace)",
              fontSize: "1.15rem",
              lineHeight: 1.7,
              padding: "1.5rem 0",
              outline: "none",
              resize: "vertical",
            }}
          />
        )}

        {/* draft toggle */}
        <div className="flex items-center gap-3 mt-8 pt-6" style={{ borderTop: "1px solid rgba(241,119,174,0.15)" }}>
          <label className="mono text-xs tracking-widest uppercase" style={{ color: "var(--text-dim)" }}>
            status:
          </label>
          <button
            onClick={() => setIsDraft(!isDraft)}
            className="plastic-panel"
            style={{
              padding: "0.4rem 1rem",
              fontSize: "0.75rem",
              fontFamily: "STALPH, serif",
              letterSpacing: "0.1em",
              ...(isDraft
                ? { background: "rgba(250,212,72,0.3)", border: "1px solid rgba(250,212,72,0.5)", color: "var(--blackish)" }
                : { background: "rgba(241,119,174,0.3)", border: "1px solid rgba(241,119,174,0.5)", color: "var(--blackish)" }),
            }}
          >
            {isDraft ? "draft" : "published"}
          </button>
        </div>
      </div>
    </div>
  );
}
