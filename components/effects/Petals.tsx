"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

type Petal = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  rot: number;
  vr: number;
  sway: number;
  phase: number;
  hue: number;
};

/** Marigold petals drifting down. Canvas-based, paused when hidden. */
export function Petals({ className, count = 26 }: { className?: string; count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const petals: Petal[] = [];

    const spawn = (p?: Petal, top = false): Petal => {
      const n: Petal = p ?? ({} as Petal);
      n.x = Math.random() * w;
      n.y = top ? -20 : Math.random() * h;
      n.r = 5 + Math.random() * 7;
      n.vy = 0.35 + Math.random() * 0.6;
      n.vx = -0.15 + Math.random() * 0.3;
      n.rot = Math.random() * Math.PI * 2;
      n.vr = (-0.5 + Math.random()) * 0.02;
      n.sway = 12 + Math.random() * 20;
      n.phase = Math.random() * Math.PI * 2;
      n.hue = 28 + Math.random() * 14;
      return n;
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    for (let i = 0; i < count; i++) petals.push(spawn());

    const draw = (t: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of petals) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(t / 1400 + p.phase) * 0.25;
        p.rot += p.vr;
        if (p.y > h + 20) spawn(p, true);
        const sx = Math.sin(t / 1800 + p.phase) * p.sway * 0.03;
        ctx.save();
        ctx.translate(p.x + sx, p.y);
        ctx.rotate(p.rot);
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.r);
        g.addColorStop(0, `hsla(${p.hue + 8} 95% 62% / 0.9)`);
        g.addColorStop(1, `hsla(${p.hue} 85% 48% / 0.55)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const vis = () => {
      running = document.visibilityState === "visible";
      if (running) raf = requestAnimationFrame(draw);
    };
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", vis);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", vis);
    };
  }, [reduce, count]);

  if (reduce) return null;
  return <canvas ref={ref} aria-hidden className={className} />;
}
