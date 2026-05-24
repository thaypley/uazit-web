export interface ReleaseCardShape {
  id: string;
  title: string;
  type: "album" | "ep" | "single";
  year: number;
  bandcamp_url?: string;
  spotify_url?: string;
  apple_url?: string;
  soundcloud_url?: string;
}

interface Props {
  release: ReleaseCardShape;
  fileUrl?: string;
}

const platformIcons: Record<string, { label: string; color: string }> = {
  bandcamp_url: { label: "BC", color: "#1da0c3" },
  spotify_url: { label: "SP", color: "#1db954" },
  apple_url: { label: "AM", color: "#fa243c" },
  soundcloud_url: { label: "SC", color: "#ff5500" },
};

export default function ReleaseCard({ release, fileUrl }: Props) {
  return (
    <article
      className="group relative overflow-hidden rounded-sm transition-transform duration-300 hover:-translate-y-1"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(241,119,174,0.1)" }}
    >
      {/* Cover art */}
      <div className="aspect-square relative overflow-hidden bg-blackish vhs-hover">
        {fileUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={fileUrl}
            alt={release.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, rgba(101,129,184,0.3), rgba(241,119,174,0.2))" }}
          >
            <span style={{ fontFamily: "STALPH, serif", color: "var(--pink)", fontSize: "3rem", opacity: 0.4 }}>
              ♪
            </span>
          </div>
        )}

        {/* Platform links on hover */}
        <div className="absolute inset-0 flex items-end justify-center gap-2 pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(to top, rgba(35,31,32,0.95), transparent)" }}>
          {Object.entries(platformIcons).map(([key, { label, color }]) => {
            const url = release[key as keyof ReleaseCardShape] as string | undefined;
            if (!url) return null;
            return (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold px-2 py-1 rounded-sm transition-transform hover:scale-110"
                style={{ background: color, color: "#fff", fontFamily: "Inter, sans-serif" }}
              >
                {label}
              </a>
            );
          })}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3
            className="text-base leading-snug"
            style={{ fontFamily: "STALPH, serif", color: "var(--foreground)" }}
          >
            {release.title}
          </h3>
          <span
            className="text-xs px-2 py-0.5 rounded-sm shrink-0 uppercase tracking-wider"
            style={{
              background: "rgba(241,119,174,0.15)",
              color: "var(--light-pink)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {release.type}
          </span>
        </div>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>
          {release.year}
        </p>
      </div>
    </article>
  );
}
