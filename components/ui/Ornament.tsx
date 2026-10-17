/** Small gold flourish: a lotus bud between two tapering rules. */
export function Ornament({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 160 20" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M0 10 H60" strokeOpacity="0.9" />
      <path d="M100 10 H160" strokeOpacity="0.9" />
      <path d="M80 2 C 86 6, 86 14, 80 18 C 74 14, 74 6, 80 2 Z" fill="currentColor" fillOpacity="0.25" />
      <circle cx="66" cy="10" r="1.6" fill="currentColor" />
      <circle cx="94" cy="10" r="1.6" fill="currentColor" />
      <path d="M72 10 C 75 6, 78 6, 80 10 C 82 6, 85 6, 88 10" />
    </svg>
  );
}
