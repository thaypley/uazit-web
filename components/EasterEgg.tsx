"use client";

import { useState, useCallback } from "react";

export default function EasterEgg() {
  const [clicks, setClicks] = useState(0);
  const [visible, setVisible] = useState(false);
  const [typed, setTyped] = useState(0);

  const line1 = "the webiverse is watching.";
  const line2 = "thaypley.";

  const handleClick = useCallback(() => {
    const next = clicks + 1;
    setClicks(next);
    if (next >= 3) {
      setClicks(0);
      setVisible(true);
      setTyped(0);
      let i = 0;
      const total = line1.length + line2.length;
      const ticker = setInterval(() => {
        i++;
        setTyped(i);
        if (i >= total) {
          clearInterval(ticker);
          setTimeout(() => setVisible(false), 4000);
        }
      }, 60);
    }
  }, [clicks]);

  const full = line1 + line2;
  const shown = full.slice(0, typed);
  const l1 = shown.slice(0, line1.length);
  const l2 = shown.length > line1.length ? shown.slice(line1.length) : "";

  return (
    <>
      {/* The H mark — looks decorative, is the bunny */}
      <button
        onClick={handleClick}
        className="text-xs tracking-widest select-none focus:outline-none"
        style={{
          color: "rgba(241,119,174,0.25)",
          fontFamily: "STALPH, serif",
          fontSize: "1.4rem",
          cursor: "default",
          background: "none",
          border: "none",
          padding: "0 4px",
          transition: "color 0.3s",
        }}
        title=""
        aria-hidden="true"
      >
        H
      </button>

      {/* Overlay */}
      <div
        className={`easter-overlay ${visible ? "active" : ""}`}
        onClick={() => setVisible(false)}
      >
        <div className="easter-text">
          <span style={{ display: "block" }}>{l1}</span>
          {l2 && (
            <span style={{ display: "block", color: "var(--yellow)", marginTop: "0.5rem" }}>
              {l2}
            </span>
          )}
          <span className="sub">∴ coming soon ∴</span>
        </div>
      </div>
    </>
  );
}
