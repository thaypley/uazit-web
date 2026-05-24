export const revalidate = 3600;

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <section
        className="py-32 px-6 text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(101,129,184,0.1) 0%, rgba(241,119,174,0.05) 100%), var(--blackish)",
          borderBottom: "1px solid rgba(241,119,174,0.1)",
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Portrait placeholder */}
        <div
          className="w-48 h-48 rounded-full mx-auto mb-8 flex items-center justify-center"
          style={{ border: "2px solid rgba(241,119,174,0.3)", background: "rgba(101,129,184,0.1)" }}
        >
          <span style={{ fontFamily: "STALPH, serif", color: "var(--pink)", fontSize: "4rem", opacity: 0.5 }}>U</span>
        </div>
        <h1
          style={{ fontFamily: "STALPH, serif", fontSize: "clamp(3rem, 10vw, 8rem)", color: "var(--foreground)", lineHeight: 1 }}
        >
          UaZit
        </h1>
        <div className="divider-yellow mx-auto mt-4" />
        <p
          className="mt-4 text-sm tracking-widest uppercase"
          style={{ color: "var(--light-blue)", fontFamily: "Inter, sans-serif" }}
        >
          artist · musician · classic troublemaker
        </p>
      </section>

      {/* Bio */}
      <section className="py-20 px-6" style={{ background: "var(--blackish)" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="mb-8" style={{ fontFamily: "STALPH, serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "var(--pink)" }}>
            The Story
          </h2>
          <div
            className="space-y-6 text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Inter, sans-serif" }}
          >
            <p>
              UaZit's identity is deeply rooted in their 90s upbringing — a time when rock 'n' roll, skateboarding,
              VHS classics, and video games shaped an artistic consciousness that refuses to be boxed in. From early
              childhood, UaZit engaged in a wide array of artistic pursuits: doodling with ink, composing music,
              skateboarding, drafting, sewing textiles, photography, videography, and crafting oat milk lattes —
              each activity a testament to boundless curiosity and a hands-on approach to life and art.
            </p>
            <p>
              Formally educated at the{" "}
              <span style={{ color: "var(--light-pink)" }}>Art Institute of Indianapolis</span>, UaZit refined raw
              talent into intentional craft — traversing multiple artistic disciplines with skill and ferocity. Their
              work is characterized by a fearless exploration of form and content, embracing the title of{" "}
              <em style={{ color: "var(--pink)" }}>"classic troublemaker"</em> and{" "}
              <em style={{ color: "var(--pink)" }}>"eternal student of transmutation."</em>
            </p>
            <p>
              A musical career spanning two decades and genres — rock 'n' roll, alternative grooves, eighties pop,
              trip-hop, and beyond — reflects a creative restlessness that refuses genre. UaZit's vocal range has
              been described as <em style={{ color: "var(--yellow)" }}>greater than a mid-century Sears-Roebuck catalog</em>,
              their lyrics thought-provoking and intricately interwoven with compositions that offer listeners a visceral
              experience blending raw emotion with intellectual stimulation.
            </p>
            <p>
              UaZit lives a vegan, gluten-free, plant-based life — an ethos not only personal but deeply embedded in
              every professional venture. Their self-produced reality show,{" "}
              <a
                href="https://www.youtube.com/@thewazuazshow"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--light-blue)", textDecoration: "underline", textUnderlineOffset: "4px" }}
              >
                theWAZUAZshow
              </a>
              , offers fans an unfiltered glimpse into their creative process and life on the road.
            </p>
          </div>
        </div>
      </section>

      {/* Shared the Stage With */}
      <section className="py-20 px-6" style={{ background: "rgba(101,129,184,0.05)", borderTop: "1px solid rgba(241,119,174,0.1)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-12 text-center" style={{ fontFamily: "STALPH, serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "var(--foreground)" }}>
            Shared the Stage With
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Chuck Mosley",
                role: "Faith No More (original vocalist)",
                quote: "play & hypnotize.",
                color: "var(--pink)",
              },
              {
                name: "Mike Vallely & The Complete Disaster",
                role: "Skate legend · musician",
                quote: "Energy that won't stop.",
                color: "var(--yellow)",
              },
            ].map(({ name, role, quote, color }) => (
              <div
                key={name}
                className="p-8 rounded-sm"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(241,119,174,0.15)" }}
              >
                <p className="text-2xl mb-2" style={{ fontFamily: "STALPH, serif", color }}>
                  {name}
                </p>
                <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--light-blue)", fontFamily: "Inter, sans-serif" }}>
                  {role}
                </p>
                <p className="text-sm italic" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>
                  "{quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* stalph section */}
      <section className="py-20 px-6" style={{ background: "var(--blackish)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-4" style={{ fontFamily: "STALPH, serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "var(--foreground)" }}>
            stalph
          </h2>
          <p className="text-xs tracking-widest uppercase mb-8" style={{ color: "var(--yellow)", fontFamily: "Inter, sans-serif" }}>
            The House of Hand(fucking)Made · Est. 2015 · Pine Village, IN
          </p>
          <p className="text-base leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Inter, sans-serif" }}>
            In 2015, UaZit co-founded stalph with partner WaZeil — a creative house embodying uncensored,
            eco-conscious, multifaceted artistry. A brick-and-mortar store and creative studio offering handmade
            wares, visual art, skateboarding products, and plant-based self-care. The stalph store is a
            destination fostering a "third-space" where art, skateboarding, and community converge.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { name: "WAZUAZ", desc: "Earth-friendly, gender-neutral apparel. Botanically dyed from raw organic materials." },
              { name: "hippie drips", desc: "Plant-based self-care: soaps, oils, balms. Natural ingredients, holistic wellness." },
              { name: "useless(fuck) skateboard co.", desc: "Hand-stamped decks celebrating skateboarding culture and creative expression." },
            ].map(({ name, desc }) => (
              <div
                key={name}
                className="p-5 rounded-sm"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(241,119,174,0.1)" }}
              >
                <p className="text-base mb-2" style={{ fontFamily: "STALPH, serif", color: "var(--light-pink)" }}>
                  {name}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Inter, sans-serif" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
          <a
            href="https://stalph.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 text-sm tracking-widest uppercase transition-all hover:opacity-80"
            style={{ border: "1px solid var(--light-blue)", color: "var(--light-blue)", fontFamily: "Inter, sans-serif" }}
          >
            Visit stalph.com ↗
          </a>
        </div>
      </section>

      {/* theWAZUAZshow */}
      <section className="py-20 px-6 text-center" style={{ background: "rgba(241,119,174,0.04)", borderTop: "1px solid rgba(241,119,174,0.1)" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--light-blue)", fontFamily: "Inter, sans-serif" }}>
            Reality Show
          </p>
          <h2 className="mb-6" style={{ fontFamily: "STALPH, serif", fontSize: "clamp(2rem, 6vw, 5rem)", color: "var(--foreground)" }}>
            theWAZUAZshow
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Inter, sans-serif" }}>
            Self-produced by UaZit and WaZeil — tour diaries, creative process, an unfiltered life in art.
          </p>
          <a
            href="https://www.youtube.com/@thewazuazshow"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 text-sm tracking-widest uppercase transition-all hover:opacity-80"
            style={{ background: "var(--pink)", color: "var(--blackish)", fontFamily: "Inter, sans-serif", fontWeight: 700 }}
          >
            Watch on YouTube ↗
          </a>
        </div>
      </section>

      {/* Values strip */}
      <section className="py-12 px-6 overflow-x-auto" style={{ background: "var(--blackish)" }}>
        <div className="flex flex-wrap gap-4 justify-center">
          {["vegan", "plant-based", "90s rebel", "hand(fucking)made", "genre-bending", "skate culture", "Art Institute of Indianapolis"].map((v) => (
            <span
              key={v}
              className="text-xs px-4 py-2 rounded-sm tracking-widest uppercase"
              style={{ border: "1px solid rgba(250,212,72,0.25)", color: "rgba(250,212,72,0.7)", fontFamily: "Inter, sans-serif" }}
            >
              {v}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
