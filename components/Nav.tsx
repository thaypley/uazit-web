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

  const toggle = (next: boolean) => {
    setOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between nav-gradient"
    >
      <Link href="/" className="block transition-opacity hover:opacity-80" aria-label="UaZit — home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo/uazit.png" alt="UaZit" className="h-9 w-auto" />
      </Link>

      {/* desktop nav */}
      <nav className="hidden md:flex gap-8 items-center">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-sm tracking-widest uppercase transition-colors hover:opacity-70"
            style={{
              color: pathname === href ? "var(--pink)" : "var(--blackish)",
              fontFamily: "STALPH, serif",
            }}
          >
            {label}
          </Link>
        ))}
        <a
          href="https://stalph.co"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm tracking-widest uppercase transition-colors hover:opacity-70"
          style={{ color: "var(--blue)", fontFamily: "STALPH, serif" }}
        >
          stalph ↗
        </a>
      </nav>

      {/* mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => toggle(!open)}
        aria-label="menu"
      >
        <span className="block w-6 h-0.5 transition-all" style={{ background: open ? "var(--pink)" : "var(--blackish)" }} />
        <span className="block w-6 h-0.5 transition-all" style={{ background: open ? "var(--pink)" : "var(--blackish)", opacity: open ? 0 : 1 }} />
        <span className="block w-6 h-0.5 transition-all" style={{ background: open ? "var(--pink)" : "var(--blackish)" }} />
      </button>

      {/* mobile menu */}
      {open && (
        <div
          className="md:hidden fixed inset-0 top-16 flex flex-col gap-6 items-center justify-center mobile-overlay"
          style={{ zIndex: 40 }}
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => toggle(false)}
              className="text-3xl tracking-widest transition-colors hover:opacity-70"
              style={{
                fontFamily: "STALPH, serif",
                color: pathname === href ? "var(--pink)" : "var(--blackish)",
              }}
            >
              {label}
            </Link>
          ))}
          <a
            href="https://stalph.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm tracking-widest uppercase"
            style={{ color: "var(--blue)", fontFamily: "STALPH, serif" }}
          >
            stalph ↗
          </a>
        </div>
      )}
    </header>
  );
}
