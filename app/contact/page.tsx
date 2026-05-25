"use client";

import { useState } from "react";
import { submitContact } from "@/lib/pocketbase";
import type { ContactSubmission } from "@/lib/types";

const subjects: ContactSubmission["subject"][] = ["Booking", "Press", "Collaboration", "General"];

const socials = [
  { label: "bandcamp", href: "https://uazit.bandcamp.com/", color: "var(--blue)" },
  { label: "apple music", href: "https://music.apple.com/us/artist/uazit", color: "var(--pink)" },
  { label: "youtube", href: "https://www.youtube.com/@thewazuazshow", color: "var(--pink)" },
];

export default function ContactPage() {
  const [form, setForm] = useState<ContactSubmission>({
    name: "",
    email: "",
    subject: "General",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const ok = await submitContact(form);
    setStatus(ok ? "sent" : "error");
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.6)",
    border: "1px solid rgba(241,119,174,0.35)",
    color: "var(--blackish)",
    fontFamily: "STALPH, serif",
    fontSize: "0.9rem",
    width: "100%",
    padding: "0.75rem 1rem",
    outline: "none",
    borderRadius: "2px",
  };

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* hero */}
      <section
        className="py-20 px-6 text-center"
        style={{ background: "var(--background)", borderBottom: "1px solid rgba(241,119,174,0.2)" }}
      >
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--blue)", fontFamily: "STALPH, serif" }}>
          get in touch
        </p>
        <h1 style={{ fontFamily: "STALPH, serif", fontSize: "clamp(2.5rem, 8vw, 7rem)", color: "var(--blackish)", lineHeight: 1 }}>
          contact
        </h1>
        <div className="divider-yellow mx-auto mt-6" />
      </section>

      <section className="py-20 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-2xl mx-auto">
          {status === "sent" ? (
            <div className="py-20 text-center">
              <p style={{ fontFamily: "STALPH, serif", color: "var(--pink)", fontSize: "3rem" }}>
                received.
              </p>
              <p className="mt-4 text-sm" style={{ color: "var(--text-muted)", fontFamily: "STALPH, serif" }}>
                UaZit will be in touch. the signal travels.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "var(--blue)", fontFamily: "STALPH, serif" }}>
                    name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handle}
                    required
                    style={inputStyle}
                    placeholder="your name"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "var(--blue)", fontFamily: "STALPH, serif" }}>
                    email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handle}
                    required
                    style={inputStyle}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "var(--blue)", fontFamily: "STALPH, serif" }}>
                  subject
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handle}
                  style={inputStyle}
                >
                  {subjects.map((s) => (
                    <option key={s} value={s}>{s.toLowerCase()}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "var(--blue)", fontFamily: "STALPH, serif" }}>
                  message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handle}
                  required
                  rows={7}
                  style={{ ...inputStyle, resize: "vertical" }}
                  placeholder="what's on your mind..."
                />
              </div>

              {status === "error" && (
                <p className="text-sm" style={{ color: "var(--pink)", fontFamily: "STALPH, serif" }}>
                  something went wrong. try again or reach out via bandcamp.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="px-8 py-4 text-sm tracking-widest uppercase transition-all hover:opacity-80 disabled:opacity-40"
                style={{ background: "var(--pink)", color: "var(--blackish)", fontFamily: "STALPH, serif", fontWeight: 700 }}
              >
                {status === "sending" ? "sending..." : "send it"}
              </button>
            </form>
          )}

          {/* socials */}
          <div className="mt-16 pt-12" style={{ borderTop: "1px solid rgba(241,119,174,0.2)" }}>
            <p className="text-xs tracking-widest uppercase mb-8 text-center" style={{ color: "var(--text-ghost)", fontFamily: "STALPH, serif" }}>
              find UaZit
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              {socials.map(({ label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm tracking-widest uppercase transition-opacity hover:opacity-70"
                  style={{ color, fontFamily: "STALPH, serif" }}
                >
                  {label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
