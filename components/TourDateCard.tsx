import type { TourDate } from "@/lib/types";

interface Props {
  date: TourDate;
}

export default function TourDateCard({ date }: Props) {
  const d = new Date(date.date);
  const month = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const day = d.getDate();
  const year = d.getFullYear();

  return (
    <div
      className="flex items-center gap-6 p-5 rounded-sm transition-all duration-300 hover:border-pink"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(241,119,174,0.15)" }}
    >
      {/* Date block */}
      <div className="text-center shrink-0 w-16">
        <p className="text-xs tracking-widest" style={{ color: "var(--pink)", fontFamily: "Inter, sans-serif" }}>
          {month}
        </p>
        <p className="text-4xl leading-none" style={{ fontFamily: "STALPH, serif", color: "var(--yellow)" }}>
          {day}
        </p>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>
          {year}
        </p>
      </div>

      <div className="flex-1">
        <p className="text-lg font-medium" style={{ fontFamily: "STALPH, serif", color: "var(--foreground)" }}>
          {date.venue}
        </p>
        <p className="text-sm" style={{ color: "var(--light-blue)", fontFamily: "Inter, sans-serif" }}>
          {date.city}, {date.state_country}
        </p>
        {date.notes && (
          <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>
            {date.notes}
          </p>
        )}
      </div>

      {date.ticket_url && !date.sold_out && (
        <a
          href={date.ticket_url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-4 py-2 text-sm tracking-widest uppercase transition-all hover:opacity-80"
          style={{
            background: "var(--pink)",
            color: "var(--blackish)",
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
          }}
        >
          Tickets
        </a>
      )}
      {date.sold_out && (
        <span
          className="shrink-0 px-4 py-2 text-sm tracking-widest uppercase"
          style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.3)", fontFamily: "Inter, sans-serif" }}
        >
          Sold Out
        </span>
      )}
    </div>
  );
}
