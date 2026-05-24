"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/music", label: "music" },
  { href: "/video", label: "video" },
  { href: "/photo", label: "photo" },
  { href: "/about", label: "about" },
  { href: "/tour", label: "tour" },
  { href: "/blog", label: "blog" },
  { href: "/contact", label: "contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
      style={{ background: "linear-gradient(to bottom, rgba(35,31,32,0.95), transparent)" }}>
      <Link href="/" className="font-stalph text-2xl tracking-widest hover:text-pink transition-colors"
        style={{ fontFamily: "STALPH, serif", color: "var(--pink)" }}>
        UaZit
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex gap-8 items-center">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-sm tracking-widest uppercase transition-colors hover:text-pink"
            style={{
              color: pathname === href ? "var(--yellow)" : "var(--foreground)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {label}
          </Link>
        ))}
        <a
          href="https://stalph.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm tracking-widest uppercase transition-colors"
          style={{ color: "var(--light-blue)", fontFamily: "Inter, sans-serif" }}
        >
          stalph ↗
        </a>
      </nav>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setOpen(!open)}
        aria-label="menu"
      >
        <span className="block w-6 h-0.5 transition-all" style={{ background: open ? "var(--pink)" : "var(--foreground)" }} />
        <span className="block w-6 h-0.5 transition-all" style={{ background: open ? "var(--pink)" : "var(--foreground)", opacity: open ? 0 : 1 }} />
        <span className="block w-6 h-0.5 transition-all" style={{ background: open ? "var(--pink)" : "var(--foreground)" }} />
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden fixed inset-0 top-16 flex flex-col gap-6 items-center justify-center"
          style={{ background: "rgba(35,31,32,0.98)", zIndex: 40 }}>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="font-stalph text-3xl tracking-widest transition-colors hover:text-pink"
              style={{
                fontFamily: "STALPH, serif",
                color: pathname === href ? "var(--yellow)" : "var(--foreground)",
              }}
            >
              {label}
            </Link>
          ))}
          <a
            href="https://stalph.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm tracking-widest uppercase"
            style={{ color: "var(--light-blue)" }}
          >
            stalph ↗
          </a>
        </div>
      )}
    </header>
  );
}
