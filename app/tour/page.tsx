import TourDateCard from "@/components/TourDateCard";
import { getTourDates } from "@/lib/pocketbase";

export const revalidate = 300;

export default async function TourPage() {
  const dates = await getTourDates();

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <section
        className="py-20 px-6 text-center"
        style={{ background: "linear-gradient(to bottom, rgba(250,212,72,0.05), var(--blackish))", borderBottom: "1px solid rgba(241,119,174,0.1)" }}
      >
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--yellow)", fontFamily: "Inter, sans-serif" }}>
          Live
        </p>
        <h1 style={{ fontFamily: "STALPH, serif", fontSize: "clamp(2.5rem, 8vw, 7rem)", color: "var(--foreground)", lineHeight: 1 }}>
          Tour
        </h1>
        <div className="divider-yellow mx-auto mt-6" />
      </section>

      {/* Dates */}
      <section className="py-20 px-6" style={{ background: "var(--blackish)" }}>
        <div className="max-w-3xl mx-auto">
          {dates.length > 0 ? (
            <div className="flex flex-col gap-4">
              {dates.map((d) => (
                <TourDateCard key={d.id} date={d} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p
                style={{
                  fontFamily: "STALPH, serif",
                  fontSize: "clamp(2rem, 6vw, 4rem)",
                  color: "var(--pink)",
                  lineHeight: 1.1,
                }}
              >
                The road is quiet for now.
              </p>
              <div className="divider-yellow mx-auto mt-6" />
              <p
                className="mt-6 text-base"
                style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}
              >
                Stay tuned. The show always comes back.
              </p>
              <a
                href="/contact"
                className="inline-block mt-8 px-8 py-3 text-sm tracking-widest uppercase transition-all hover:opacity-80"
                style={{ border: "1px solid rgba(241,119,174,0.4)", color: "var(--light-pink)", fontFamily: "Inter, sans-serif" }}
              >
                Booking Inquiries →
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
