export interface VideoCardShape {
  id: string;
  youtube_id: string;
  title: string;
  category?: string;
}

interface Props {
  video: VideoCardShape;
}

export default function VideoCard({ video }: Props) {
  const thumb = `https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`;
  const url = `https://www.youtube.com/watch?v=${video.youtube_id}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative overflow-hidden rounded-sm vhs-hover"
      style={{ border: "1px solid rgba(241,119,174,0.1)" }}
    >
      <div className="aspect-video relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumb}
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{ background: "rgba(241,119,174,0.9)", backdropFilter: "blur(4px)" }}
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 ml-1" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {/* Overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
          style={{ background: "rgba(35,31,32,0.3)" }}
        />
      </div>

      <div className="p-3" style={{ background: "rgba(255,255,255,0.02)" }}>
        <h3 className="text-sm leading-snug" style={{ color: "var(--foreground)", fontFamily: "Inter, sans-serif" }}>
          {video.title}
        </h3>
        {video.category && (
          <p className="text-xs mt-1 uppercase tracking-widest" style={{ color: "var(--light-blue)" }}>
            {video.category}
          </p>
        )}
      </div>
    </a>
  );
}
