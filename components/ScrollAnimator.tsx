"use client";

import { useEffect } from "react";

export default function ScrollAnimator() {
  useEffect(() => {
    let gsap: typeof import("gsap").default | null = null;
    let cleanup: (() => void) | null = null;

    import("gsap").then(({ default: g }) => {
      gsap = g;
      return import("gsap/ScrollTrigger");
    }).then(({ ScrollTrigger }) => {
      if (!gsap) return;
      gsap.registerPlugin(ScrollTrigger);

      const els = document.querySelectorAll<HTMLElement>(".fade-up");
      const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

      els.forEach((el) => {
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          onEnter: () => {
            el.classList.add("in-view");
          },
        });
        triggers.push(trigger);
      });

      cleanup = () => triggers.forEach((t) => t.kill());
    });

    return () => cleanup?.();
  }, []);

  return null;
}
