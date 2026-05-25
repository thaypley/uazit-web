"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const MOODS: Record<string, string> = {
  "/": "pink",
  "/music": "blue",
  "/video": "yellow",
  "/photo": "white",
  "/about": "pink",
  "/blog": "yellow",
  "/tour": "blue",
  "/contact": "pink",
  "/admin": "white",
};

export default function MoodSetter() {
  const pathname = usePathname();

  useEffect(() => {
    const base = "/" + (pathname.split("/")[1] ?? "");
    const mood = MOODS[base] ?? MOODS["/"];
    document.body.dataset.mood = mood;
  }, [pathname]);

  return null;
}
