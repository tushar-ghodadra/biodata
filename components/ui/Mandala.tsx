"use client";

import { motion, type MotionValue } from "motion/react";
import { useId } from "react";

type Props = {
  className?: string;
  /** Optional scroll-linked rotation for the outer ring. */
  rotate?: MotionValue<number>;
  /** Drop the slowest rings on small renders. */
  detail?: "full" | "simple";
};

/** Procedural vector mandala. Rings counter-rotate slowly; purely decorative. */
export function Mandala({ className, rotate, detail = "full" }: Props) {
  const id = useId();
  const petal = (r0: number, r1: number, w: number) =>
    `M0,${-r1} C ${w},${-r1 + (r1 - r0) * 0.3} ${w},${-r0 - (r1 - r0) * 0.3} 0,${-r0} C ${-w},${-r0 - (r1 - r0) * 0.3} ${-w},${-r1 + (r1 - r0) * 0.3} 0,${-r1} Z`;
  const ring = (n: number, d: string, extra?: string) =>
    Array.from({ length: n }, (_, i) => (
      <path key={i} d={d} transform={`rotate(${(360 / n) * i})`} className={extra} />
    ));
  const dots = (n: number, r: number, size: number) =>
    Array.from({ length: n }, (_, i) => {
      const a = ((Math.PI * 2) / n) * i;
      // Round so server and client serialise identical attribute strings.
      const cx = Math.round(Math.cos(a) * r * 100) / 100;
      const cy = Math.round(Math.sin(a) * r * 100) / 100;
      return <circle key={i} cx={cx} cy={cy} r={size} />;
    });

  return (
    <svg
      aria-hidden
      viewBox="-300 -300 600 600"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <radialGradient id={`${id}-g`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.12" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle r="290" fill={`url(#${id}-g)`} stroke="none" />

      {/* Outer ring: scroll-linked when provided, else slow CSS spin */}
      <motion.g style={rotate ? { rotate } : undefined} className={rotate ? undefined : "animate-spin-slow"}>
        <circle r="284" strokeOpacity="0.5" />
        <circle r="268" strokeOpacity="0.3" strokeDasharray="2 10" />
        <g fill="currentColor" stroke="none" opacity="0.7">
          {dots(48, 276, 1.6)}
        </g>
        <g strokeOpacity="0.8">{ring(24, petal(196, 262, 18))}</g>
        <g fill="currentColor" stroke="none" opacity="0.55">
          {dots(24, 229, 2.2)}
        </g>
      </motion.g>

      {detail === "full" && (
        <g className="animate-spin-slow-reverse">
          <circle r="190" strokeOpacity="0.45" />
          <g strokeOpacity="0.7">{ring(16, petal(124, 184, 20), undefined)}</g>
          <g fill="currentColor" stroke="none" opacity="0.5">
            {dots(16, 154, 2)}
          </g>
          <circle r="120" strokeOpacity="0.4" strokeDasharray="1 6" />
        </g>
      )}

      <g className="animate-spin-slow">
        <g strokeOpacity="0.9">{ring(12, petal(52, 112, 16))}</g>
        <g fill="currentColor" stroke="none" opacity="0.6">
          {dots(12, 82, 1.8)}
        </g>
        <circle r="48" strokeOpacity="0.6" />
        <g strokeOpacity="0.9">{ring(8, petal(14, 44, 9))}</g>
        <circle r="10" fill="currentColor" stroke="none" opacity="0.7" />
      </g>
    </svg>
  );
}
