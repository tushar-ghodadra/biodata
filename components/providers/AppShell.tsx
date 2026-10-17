"use client";

import { MotionConfig } from "motion/react";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { SmoothScroll } from "./SmoothScroll";
import { ScrollProgress } from "./ScrollProgress";
import { Intro } from "./Intro";

// Interaction-only layers load after hydration.
const Cursor = dynamic(() => import("./Cursor").then((m) => m.Cursor), { ssr: false });

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <Intro />
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      {children}
    </MotionConfig>
  );
}
