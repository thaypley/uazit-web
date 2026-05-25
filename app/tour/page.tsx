import TourDateCard from "@/components/TourDateCard";
import { getTourDates } from "@/lib/pocketbase";

export const revalidate = 300;

export default async function TourPage() {
  const dates = await getTourDates();

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* hero */}
      <section
        className="py-20 px-6 text-center"
        style={{ background: "var(--background)", borderBottom: "1px solid rgba(101,129,184,0.2)" }}
      >
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--blue)", fontFamily: "STALPH, serif" }}>
          live
        </p>
        <h1 style={{ fontFamily: "STALPH, serif", fontSize: "clamp(2.5rem, 8vw, 7rem)", color: "var(--blackish)", lineHeight: 1 }}>
          tour
        </h1>
        <div className="divider-yellow mx-auto mt-6" />
      </section>

      {/* dates */}
      <section className="py-20 px-6" style={{ background: "var(--background)" }}>
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
                the road is quiet for now.
              </p>
              <div className="divider-yellow mx-auto mt-6" />
              <p
                className="mt-6 text-base"
                style={{ color: "var(--text-muted)", fontFamily: "STALPH, serif" }}
              >
                stay tuned. the show always comes back.
              </p>
              <a
                href="/contact"
                className="inline-block mt-8 px-8 py-3 text-sm tracking-widest uppercase transition-all hover:opacity-70"
                style={{ border: "1px solid rgba(241,119,174,0.45)", color: "var(--pink)", fontFamily: "STALPH, serif" }}
              >
                booking inquiries →
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
