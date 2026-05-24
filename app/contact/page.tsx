"use client";

import { useState } from "react";
import { submitContact } from "@/lib/pocketbase";
import type { ContactSubmission } from "@/lib/types";

const subjects: ContactSubmission["subject"][] = ["Booking", "Press", "Collaboration", "General"];

const socials = [
  { label: "Bandcamp", href: "https://uazit.bandcamp.com/", color: "var(--light-blue)" },
  { label: "SoundCloud", href: "https://soundcloud.com/uazit", color: "var(--light-blue)" },
  { label: "Apple Music", href: "https://music.apple.com/us/artist/uazit", color: "var(--light-pink)" },
  { label: "YouTube", href: "https://www.youtube.com/@thewazuazshow", color: "var(--pink)" },
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
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(241,119,174,0.2)",
    color: "var(--foreground)",
    fontFamily: "Inter, sans-serif",
    fontSize: "0.875rem",
    width: "100%",
    padding: "0.75rem 1rem",
    outline: "none",
    borderRadius: "2px",
  };

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <section
        className="py-20 px-6 text-center"
        style={{ background: "linear-gradient(to bottom, rgba(101,129,184,0.06), var(--blackish))", borderBottom: "1px solid rgba(241,119,174,0.1)" }}
      >
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--light-blue)", fontFamily: "Inter, sans-serif" }}>
          Get in Touch
        </p>
        <h1 style={{ fontFamily: "STALPH, serif", fontSize: "clamp(2.5rem, 8vw, 7rem)", color: "var(--foreground)", lineHeight: 1 }}>
          Contact
        </h1>
        <div className="divider-yellow mx-auto mt-6" />
      </section>

      <section className="py-20 px-6" style={{ background: "var(--blackish)" }}>
        <div className="max-w-2xl mx-auto">
          {status === "sent" ? (
            <div className="py-20 text-center">
              <p style={{ fontFamily: "STALPH, serif", color: "var(--pink)", fontSize: "3rem" }}>
                Received.
              </p>
              <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif" }}>
                UaZit will be in touch. The signal travels.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "var(--light-blue)", fontFamily: "Inter, sans-serif" }}>
                    Name
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
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "var(--light-blue)", fontFamily: "Inter, sans-serif" }}>
                    Email
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
                <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "var(--light-blue)", fontFamily: "Inter, sans-serif" }}>
                  Subject
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handle}
                  style={inputStyle}
                >
                  {subjects.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "var(--light-blue)", fontFamily: "Inter, sans-serif" }}>
                  Message
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
                <p className="text-sm" style={{ color: "var(--pink)", fontFamily: "Inter, sans-serif" }}>
                  Something went wrong. Try again or reach out via Bandcamp.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="px-8 py-4 text-sm tracking-widest uppercase transition-all hover:opacity-80 disabled:opacity-40"
                style={{ background: "var(--pink)", color: "var(--blackish)", fontFamily: "Inter, sans-serif", fontWeight: 700 }}
              >
                {status === "sending" ? "Sending..." : "Send It"}
              </button>
            </form>
          )}

          {/* Social links */}
          <div className="mt-16 pt-12" style={{ borderTop: "1px solid rgba(241,119,174,0.1)" }}>
            <p className="text-xs tracking-widest uppercase mb-8 text-center" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Inter, sans-serif" }}>
              Find UaZit
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              {socials.map(({ label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm tracking-widest uppercase transition-opacity hover:opacity-70"
                  style={{ color, fontFamily: "Inter, sans-serif" }}
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
