"use client";

import { useEffect, useRef } from "react";

interface Props {
  text?: string;
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function HeroGlitch({ text, className = "", imageSrc, imageAlt = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !text) return;
    el.setAttribute("data-text", text);
  }, [text]);

  if (imageSrc) {
    return (
      <span className={`glitch-img ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageSrc} alt={imageAlt} className="glitch-img-base hero-logo" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageSrc} alt="" className="glitch-img-clone pink hero-logo" aria-hidden />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageSrc} alt="" className="glitch-img-clone yellow hero-logo" aria-hidden />
      </span>
    );
  }

  return (
    <span
      ref={ref}
      data-text={text}
      className={`glitch ${className}`}
      style={{ fontFamily: "STALPH, serif" }}
    >
      {text}
    </span>
  );
}
