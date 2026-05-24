"use client";

interface Props {
  url: string;
  title?: string;
}

export default function BandcampPlayer({ url, title = "" }: Props) {
  const albumId = url.match(/album=(\d+)/)?.[1] ?? "";
  const trackId = url.match(/track=(\d+)/)?.[1] ?? "";
  const isTrack = !!trackId;

  if (!albumId && !trackId) {
    return (
      <div className="p-6 text-center" style={{ color: "rgba(255,255,255,0.4)" }}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm tracking-widest uppercase hover:text-pink transition-colors"
          style={{ color: "var(--pink)" }}
        >
          Listen on Bandcamp ↗
        </a>
      </div>
    );
  }

  const embedSrc = isTrack
    ? `https://bandcamp.com/EmbeddedPlayer/track=${trackId}/size=large/bgcol=231f20/linkcol=f177ae/tracklist=false/transparent=true/`
    : `https://bandcamp.com/EmbeddedPlayer/album=${albumId}/size=large/bgcol=231f20/linkcol=f177ae/tracklist=true/transparent=true/`;

  return (
    <div data-source="bandcamp" data-url={url} className="w-full">
      <iframe
        style={{ border: 0, width: "100%", height: isTrack ? "120px" : "400px" }}
        src={embedSrc}
        seamless
        title={title}
        allow="autoplay"
      />
    </div>
  );
}
