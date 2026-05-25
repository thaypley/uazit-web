import { PORTRAIT_HERO } from "@/lib/photos";

export const revalidate = 3600;

const stageShares = [
  {
    name: "Chuck Mosley",
    role: "faith no more (original vocalist) / bad brains",
    quote: "thanks for playing & hypnotizing me",
    color: "var(--pink)",
  },
  {
    name: "Mike Vallely & The Complete Disaster",
    role: "skate legend · musician",
    color: "var(--blue)",
  },
] as const;

const subBrands = [
  {
    name: "WAZUAZ",
    desc: "WAZUAZ: an earth-friendly collection of slow fashion, comprised of gender-fluid styles that are designed, constructed & botanically dyed in house by WaZeil & UaZit.",
    href: "https://www.stalph.co/fashion",
  },
  {
    name: "hippie drips",
    desc: "hippie drips : plant-based self-care product line of hair oils, face oils, lip balms & cold-process soaps",
    href: "https://www.stalph.co/self-care",
  },
  {
    name: "useless(fuck) skateboard co.",
    desc: "useless(fuck) skateboard co. : pushing back to the basics of counterculture self-expression, featuring hand-stamped graphics",
    href: "https://www.stalph.co/uselessfuck",
  },
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <section
        className="py-32 px-6 text-center relative overflow-hidden"
        style={{
          background: "var(--background)",
          borderBottom: "1px solid rgba(241,119,174,0.15)",
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="relative w-48 h-48 rounded-full mx-auto mb-8 overflow-hidden plastic-panel"
          style={{ border: "2px solid rgba(241,119,174,0.5)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PORTRAIT_HERO}
            alt="UaZit"
            className="w-full h-full object-cover"
            style={{ filter: "contrast(1.05) saturate(1.1)" }}
          />
        </div>
        <h1
          className="caret"
          style={{ fontFamily: "STALPH, serif", fontSize: "clamp(3rem, 10vw, 8rem)", color: "var(--blackish)", lineHeight: 1 }}
        >
          UaZit
        </h1>
        <div className="pixel-divider mt-4" aria-hidden>
          <span /><span /><span /><span /><span /><span /><span /><span />
        </div>
        <p className="mt-4 mono text-sm tracking-widest uppercase" style={{ color: "var(--blue)" }}>
          artist · musician · classic troublemaker
        </p>
      </section>

      <section className="py-20 px-6" style={{ background: "var(--bg-alt)" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="mb-8 caret" style={{ fontFamily: "STALPH, serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "var(--pink)" }}>
            the story
          </h2>
          <div
            className="space-y-6 text-base leading-relaxed"
            style={{ color: "var(--text-muted)", fontFamily: "STALPH, serif" }}
          >
            <p>
              UaZit (they/them) is a plant-based gluten-free vegan, rock 'n' roll nurtured 90's child.  raised on skateboarding, VHS classics, video games & their mother's eclectic taste in music.  a classic troublemaker sipping (oat)milk LAttes from dawn 'til dusk.  UaZ is an eternal student of transmutation, with a bogus associates degree of science in digital photography from the Art Institute of (INDefinitely closed).  find them occasionally capturing light through the lens, slinging ink on paper, animating, stopping motion, smithing metals, working wood, soaping, drafting garment patterns, sewing… and baking.  While finding time to blueprint the entire (webiverse).
            </p>
            <p>
              This entirely unhinged, extroverted introvert has unparalleled presence dually beneath & beyond the stage lights.  Bringing the "dancing like you are alone in your bedroom vibes" everywhere, always, all of the time.
            </p>
            <p>
              Two decades & counting; writing, recording & performing throughout a multitude of musical disciplines has led to the development of UaZit's one-of-a-kind eclectic sound.
            </p>
            <p>
              With thought provoking lyrics intricately woven throughout self-composed genre bending instrumentals.  This comedically perverse lyricist wields a cast of vocal characters greater than your Grammy's mid-century Sears-Roebuck catalog.
            </p>
            <p>
              The wanderlust Indiana based multi-instrumentalist has graced stages in almost every state from sea to shining sea; sharing space with acts including Mike Vallely & The Complete Disaster as well as former Faith No More/Bad Brains vocalist, Chuck Mosley.  In the words of Chuck, "thanks for playing & hypnotizing me."
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: "var(--background)", borderTop: "1px solid rgba(241,119,174,0.12)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-12 text-center caret" style={{ fontFamily: "STALPH, serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "var(--blackish)" }}>
            shared the stage with
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stageShares.map((entry) => (
              <div
                key={entry.name}
                className="p-8 plastic-panel plastic-blueberry"
              >
                <p className="text-2xl mb-2" style={{ fontFamily: "STALPH, serif", color: entry.color }}>
                  {entry.name}
                </p>
                <p className="mono text-xs tracking-widest uppercase mb-4" style={{ color: "var(--blue)" }}>
                  {entry.role}
                </p>
                {"quote" in entry && entry.quote && (
                  <p className="text-sm italic" style={{ color: "var(--text-muted)", fontFamily: "STALPH, serif" }}>
                    "{entry.quote}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: "var(--bg-alt)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-4 caret" style={{ fontFamily: "STALPH, serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "var(--blackish)" }}>
            stalph
          </h2>
          <p className="mono text-xs tracking-widest uppercase mb-8" style={{ color: "var(--yellow)" }}>
            the house of hand(fucking)made · est. 2015 · pine village, in
          </p>
          <p className="text-base leading-relaxed mb-10" style={{ color: "var(--text-muted)", fontFamily: "STALPH, serif" }}>
            In 2015, UaZit co-founded (stalph) with their lover & creative partner WaZeil. The house of hand(fucking)made; a vegan & earth-friendly brand that is incessantly inspired by the natural world.  All of the plant-based apparel, accessories, bags, wares & more are designed, constructed & botanically dyed in house by lovestruck duo, WaZeil & UaZit. Slow Goods from the earth and that can be returned to the earth.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {subBrands.map(({ name, desc, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-5 plastic-panel plastic-grape transition-transform hover:-translate-y-0.5"
                style={{ textDecoration: "none" }}
              >
                <p className="text-base mb-2 flex items-center justify-between" style={{ fontFamily: "STALPH, serif", color: "var(--blackish)" }}>
                  <span>{name}</span>
                  <span className="mono text-xs" style={{ color: "var(--blackish)" }}>↗</span>
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(35,31,32,0.72)", fontFamily: "STALPH, serif" }}>
                  {desc}
                </p>
              </a>
            ))}
          </div>
          <a
            href="https://stalph.co"
            target="_blank"
            rel="noopener noreferrer"
            className="plastic-panel plastic-bondi plastic-btn"
          >
            visit stalph.co ↗
          </a>
        </div>
      </section>

      <section className="py-20 px-6 text-center" style={{ background: "var(--background)", borderTop: "1px solid rgba(241,119,174,0.12)" }}>
        <div className="max-w-3xl mx-auto">
          <p className="kicker mb-4">reality show</p>
          <h2 className="mb-6 caret" style={{ fontFamily: "STALPH, serif", fontSize: "clamp(2rem, 6vw, 5rem)", color: "var(--blackish)" }}>
            theWAZUAZshow
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)", fontFamily: "STALPH, serif" }}>
            Self-produced by WaZeil & UaZit : tour diaries, creative process, an unfiltered life in art.
          </p>
          <a
            href="https://www.youtube.com/@thewazuazshow"
            target="_blank"
            rel="noopener noreferrer"
            className="plastic-panel plastic-grape plastic-btn"
          >
            watch on youtube ↗
          </a>
        </div>
      </section>

      <section className="py-12 px-6 overflow-x-auto" style={{ background: "var(--bg-alt)" }}>
        <div className="flex flex-wrap gap-4 justify-center">
          {["vegan", "plant-based", "90s rebel", "hand(fucking)made", "genre-bending", "skate culture", "art institute of (INDefinitely closed)"].map((v) => (
            <span
              key={v}
              className="mono text-xs px-4 py-2 rounded-sm tracking-widest uppercase"
              style={{ border: "1px solid rgba(250,212,72,0.45)", color: "var(--blackish)" }}
            >
              {v}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
