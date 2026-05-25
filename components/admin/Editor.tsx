"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBlogPost, updateBlogPost, slugify, type BlogPostPayload } from "@/lib/pocketbase-admin";
import { markdownToHtml } from "@/lib/markdown";
import type { BlogPost } from "@/lib/types";

const ALL_TAGS = ["music", "stalph", "tour", "life", "art", "video", "skateboarding"];

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
  const [tags, setTags] = useState<string[]>(
    Array.isArray(post?.tags) ? post.tags : []
  );
  const [publishedAt, setPublishedAt] = useState(
    post?.published_at ? post.published_at.slice(0, 10) : new Date().toISOString().slice(0, 10)
  );
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [preview, setPreview] = useState(false);
  const [slugLocked, setSlugLocked] = useState(!!post);

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

  const toggleTag = (tag: string) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const save = async (draft: boolean) => {
    if (!title.trim() || !slug.trim()) return;
    setStatus("saving");
    setIsDraft(draft);

    const payload: BlogPostPayload = {
      title: title.trim(),
      slug: slug.trim(),
      content: markdownToHtml(body),
      published_at: new Date(publishedAt).toISOString(),
      draft,
      cover_image: coverFile,
      tags,
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

  const btn: React.CSSProperties = {
    fontFamily: "STALPH, serif",
    fontSize: "0.8rem",
    letterSpacing: "0.12em",
    cursor: "pointer",
    border: "none",
    padding: "0.55rem 1.2rem",
    transition: "opacity 0.15s",
    borderRadius: "2px",
  };

  const inp: React.CSSProperties = {
    background: "rgba(255,255,255,0.7)",
    border: "1px solid rgba(241,119,174,0.3)",
    color: "var(--blackish)",
    fontFamily: "STALPH, serif",
    fontSize: "0.85rem",
    padding: "0.5rem 0.7rem",
    outline: "none",
    borderRadius: "2px",
    width: "100%",
  };

  const lbl: React.CSSProperties = {
    fontFamily: "STALPH, serif",
    fontSize: "0.68rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--text-dim)",
    display: "block",
    marginBottom: "0.35rem",
  };

  const isSaving = status === "saving";

  return (
    <div style={{ minHeight: "100vh", background: "var(--background)" }}>
      {/* top bar */}
      <div
        className="flex items-center justify-between px-6 py-3 sticky top-0 z-20"
        style={{
          background: "color-mix(in srgb, var(--background) 95%, transparent)",
          borderBottom: "1px solid rgba(241,119,174,0.2)",
          backdropFilter: "blur(8px)",
        }}
      >
        <button
          onClick={() => router.push("/admin")}
          style={{ ...btn, background: "transparent", color: "var(--blue)", padding: "0.4rem 0" }}
        >
          ← posts
        </button>
        <div className="flex items-center gap-2">
          {status === "saving" && (
            <span className="mono text-xs" style={{ color: "var(--text-dim)" }}>saving...</span>
          )}
          {status === "saved" && (
            <span className="mono text-xs" style={{ color: "var(--blue)" }}>✓ saved</span>
          )}
          {status === "error" && (
            <span className="mono text-xs" style={{ color: "var(--pink)" }}>error — try again</span>
          )}
        </div>
      </div>

      {/* two-column body */}
      <div style={{ display: "flex", minHeight: "calc(100vh - 53px)" }}>

        {/* left: title + body */}
        <div
          style={{
            flex: 1,
            padding: "2rem 2.5rem",
            borderRight: "1px solid rgba(241,119,174,0.15)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* title */}
          <input
            value={title}
            onChange={(e) => handleTitle(e.target.value)}
            placeholder="title"
            style={{
              fontFamily: "STALPH, serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
              border: "none",
              borderBottom: "2px solid rgba(241,119,174,0.3)",
              borderRadius: 0,
              background: "transparent",
              color: "var(--blackish)",
              padding: "0 0 0.5rem",
              marginBottom: "1.5rem",
              width: "100%",
              outline: "none",
            }}
          />

          {/* write / preview toggle */}
          <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1rem" }}>
            {["write", "preview"].map((mode) => (
              <button
                key={mode}
                onClick={() => setPreview(mode === "preview")}
                style={{
                  ...btn,
                  padding: "0.25rem 0.75rem",
                  fontSize: "0.72rem",
                  background:
                    (mode === "preview") === preview
                      ? "rgba(101,129,184,0.2)"
                      : "transparent",
                  border: "1px solid rgba(101,129,184,0.3)",
                  color: "var(--blackish)",
                }}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* body */}
          {preview ? (
            <div
              className="prose prose-lg max-w-none"
              style={{
                color: "var(--text-muted)",
                fontFamily: "STALPH, serif",
                lineHeight: 1.8,
                flex: 1,
              }}
              dangerouslySetInnerHTML={{ __html: markdownToHtml(body) }}
            />
          ) : (
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={"# heading\n\nwrite here. markdown welcome.\n\n**bold** · *italic* · [link](url)"}
              style={{
                flex: 1,
                minHeight: "65vh",
                background: "transparent",
                border: "none",
                color: "var(--blackish)",
                fontFamily: "var(--font-vt323, 'VT323', monospace)",
                fontSize: "1.15rem",
                lineHeight: 1.7,
                padding: 0,
                outline: "none",
                resize: "vertical",
              }}
            />
          )}
        </div>

        {/* right: metadata sidebar */}
        <aside
          style={{
            width: "272px",
            flexShrink: 0,
            padding: "1.5rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            position: "sticky",
            top: "53px",
            height: "calc(100vh - 53px)",
            overflowY: "auto",
            background: "rgba(255,255,255,0.45)",
            borderLeft: "1px solid rgba(241,119,174,0.15)",
          }}
        >
          {/* slug */}
          <div>
            <label style={lbl}>slug</label>
            <div style={{ display: "flex", gap: "0.4rem" }}>
              <input
                value={slug}
                onChange={(e) => { setSlug(e.target.value); setSlugLocked(true); }}
                placeholder="auto"
                style={{ ...inp, fontSize: "0.78rem", padding: "0.4rem 0.55rem" }}
              />
              {slugLocked && (
                <button
                  onClick={() => { setSlug(slugify(title)); setSlugLocked(false); }}
                  title="reset to auto"
                  style={{
                    ...btn,
                    flexShrink: 0,
                    background: "transparent",
                    color: "var(--text-dim)",
                    fontSize: "0.8rem",
                    padding: "0.3rem 0.5rem",
                    border: "1px solid rgba(241,119,174,0.3)",
                  }}
                >
                  ↺
                </button>
              )}
            </div>
          </div>

          {/* cover image */}
          <div>
            <label style={lbl}>cover image</label>
            <div
              style={{
                height: "110px",
                border: "2px dashed rgba(241,119,174,0.4)",
                borderRadius: "4px",
                cursor: "pointer",
                overflow: "hidden",
                background: "rgba(255,255,255,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => fileRef.current?.click()}
            >
              {coverPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={coverPreview} alt="cover" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : post?.cover_image ? (
                <p className="mono text-xs" style={{ color: "var(--text-dim)" }}>set · click to replace</p>
              ) : (
                <p className="mono text-xs" style={{ color: "var(--text-dim)" }}>+ cover image</p>
              )}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleCover} />
            </div>
          </div>

          {/* tags */}
          <div>
            <label style={lbl}>tags</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  style={{
                    ...btn,
                    fontSize: "0.68rem",
                    padding: "0.2rem 0.55rem",
                    letterSpacing: "0.07em",
                    background: tags.includes(tag)
                      ? "rgba(241,119,174,0.25)"
                      : "rgba(255,255,255,0.5)",
                    border: tags.includes(tag)
                      ? "1px solid rgba(241,119,174,0.5)"
                      : "1px solid rgba(0,0,0,0.1)",
                    color: "var(--blackish)",
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* date */}
          <div>
            <label style={lbl}>date</label>
            <input
              type="date"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              style={{ ...inp, fontSize: "0.82rem", padding: "0.4rem 0.55rem" }}
            />
          </div>

          {/* status toggle */}
          <div>
            <label style={lbl}>status</label>
            <button
              onClick={() => setIsDraft(!isDraft)}
              style={{
                ...btn,
                width: "100%",
                textAlign: "center",
                ...(isDraft
                  ? { background: "rgba(250,212,72,0.3)", border: "1px solid rgba(250,212,72,0.5)", color: "var(--blackish)" }
                  : { background: "rgba(241,119,174,0.25)", border: "1px solid rgba(241,119,174,0.4)", color: "var(--blackish)" }),
              }}
            >
              {isDraft ? "draft" : "published"}
            </button>
          </div>

          {/* spacer */}
          <div style={{ flex: 1 }} />

          {/* save / publish */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <button
              onClick={() => save(true)}
              disabled={isSaving}
              style={{
                ...btn,
                width: "100%",
                textAlign: "center",
                background: "rgba(250,212,72,0.35)",
                border: "1px solid rgba(250,212,72,0.5)",
                color: "var(--blackish)",
                opacity: isSaving ? 0.5 : 1,
              }}
            >
              save draft
            </button>
            <button
              onClick={() => save(false)}
              disabled={isSaving}
              className="plastic-panel plastic-grape plastic-btn"
              style={{
                width: "100%",
                textAlign: "center",
                fontSize: "0.8rem",
                opacity: isSaving ? 0.5 : 1,
              }}
            >
              {isDraft ? "publish" : "update"}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
