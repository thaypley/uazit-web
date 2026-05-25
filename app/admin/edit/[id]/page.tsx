"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AuthGuard from "@/components/admin/AuthGuard";
import Editor from "@/components/admin/Editor";
import { getBlogPostById } from "@/lib/pocketbase-admin";
import type { BlogPost } from "@/lib/types";

function EditLoader() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);

  useEffect(() => {
    if (id) getBlogPostById(id).then(setPost);
  }, [id]);

  if (post === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
        <p className="mono text-sm tracking-widest" style={{ color: "var(--text-dim)" }}>loading...</p>
      </div>
    );
  }

  if (post === null) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
        <p style={{ fontFamily: "STALPH, serif", color: "var(--pink)", fontSize: "2rem" }}>post not found.</p>
      </div>
    );
  }

  return <Editor post={post} />;
}

export default function EditPostPage() {
  return (
    <AuthGuard>
      <EditLoader />
    </AuthGuard>
  );
}
