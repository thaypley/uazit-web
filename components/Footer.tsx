import EasterEgg from "./EasterEgg";

const socials = [
  { label: "bandcamp", href: "https://uazit.bandcamp.com/" },
  { label: "youtube", href: "https://www.youtube.com/@thewazuazshow" },
  { label: "apple music", href: "https://music.apple.com/us/artist/uazit" },
];

export default function Footer() {
  return (
    <footer
      className="border-t pt-12 pb-8 px-6"
      style={{ borderColor: "rgba(241,119,174,0.35)", background: "var(--lightest-pink)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
          <div>
            <p
              className="text-4xl mb-3"
              style={{ fontFamily: "STALPH, serif", color: "var(--pink)" }}
            >
              UaZit
            </p>
            <p className="text-xs tracking-widest uppercase" style={{ color: "var(--blue)" }}>
              classic troublemaker · eternal student of transmutation
            </p>
          </div>

          <nav className="flex flex-wrap gap-6 items-start">
            {socials.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-widest uppercase transition-colors hover:opacity-70"
                style={{ color: "var(--pink)", fontFamily: "STALPH, serif" }}
              >
                {label}
              </a>
            ))}
            <a
              href="https://stalph.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm tracking-widest uppercase transition-colors"
              style={{ color: "var(--blue)", fontFamily: "STALPH, serif" }}
            >
              stalph ↗
            </a>
          </nav>
        </div>

        <div
          className="flex justify-between items-center text-xs pt-6"
          style={{ borderTop: "1px solid rgba(241,119,174,0.25)", color: "var(--text-dim)" }}
        >
          <span>© {new Date().getFullYear()} UaZit. hand(fucking)made.</span>
          <EasterEgg />
        </div>
      </div>
    </footer>
  );
}
