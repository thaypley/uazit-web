"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { adminLogin, isAdminAuthed } from "@/lib/pocketbase-admin";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  useEffect(() => {
    if (isAdminAuthed()) router.replace("/admin");
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const ok = await adminLogin(email, password);
    if (ok) {
      router.push("/admin");
    } else {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.7)",
    border: "1px solid rgba(241,119,174,0.35)",
    color: "var(--blackish)",
    fontFamily: "STALPH, serif",
    fontSize: "1rem",
    width: "100%",
    padding: "0.85rem 1rem",
    outline: "none",
    borderRadius: "4px",
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "var(--background)" }}
    >
      <div
        className="w-full max-w-sm plastic-panel"
        style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(241,119,174,0.3)", padding: "3rem 2.5rem" }}
      >
        <h1
          className="mb-2 text-center"
          style={{ fontFamily: "STALPH, serif", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", color: "var(--pink)", lineHeight: 1 }}
        >
          write a thought
        </h1>
        <div className="pixel-divider mx-auto mb-8" aria-hidden>
          <span /><span /><span /><span /><span /><span /><span /><span />
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            required
            style={inputStyle}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
            style={inputStyle}
          />

          {status === "error" && (
            <p className="text-xs text-center" style={{ color: "var(--pink)", fontFamily: "STALPH, serif" }}>
              wrong credentials. try again.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="plastic-panel plastic-grape plastic-btn w-full text-center"
            style={{ marginTop: "0.5rem" }}
          >
            {status === "loading" ? "..." : "enter the back room"}
          </button>
        </form>
      </div>
    </div>
  );
}
