"use client";

import { useEffect, useRef } from "react";

interface Props {
  text: string;
  className?: string;
}

export default function HeroGlitch({ text, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.setAttribute("data-text", text);
  }, [text]);

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
