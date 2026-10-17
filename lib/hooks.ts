"use client";

import { useEffect, useState } from "react";

function useMedia(query: string, initial = false) {
  const [matches, setMatches] = useState(initial);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/** True on mouse/trackpad devices, false on touch. */
export const useFinePointer = () => useMedia("(pointer: fine)");
export const usePrefersReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)");
