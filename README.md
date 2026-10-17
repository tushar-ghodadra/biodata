# Tushar Ghodadra — Biodata

An animated marriage-biodata website. Next.js 16 (App Router, Cache Components), Tailwind v4, Motion, Lenis.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Edit content

Everything shown on the site comes from two files:

- `content/biodata.ts` — name, birth details, personal details, family, contact, PDF path.
- `content/photos.ts` — gallery items.

## Add photos

1. Drop image files into `public/photos/`.
2. In `content/photos.ts`, give each item a `src` (for example `/photos/traditional.jpg`), an `alt`, a `caption`, and its `ratio` (width ÷ height).
3. Items without `src` render as "Photo coming soon" tiles, so you can fill them in gradually.

The hero portrait is `public/photos/portrait.png` (set in `site.portrait`).

## Replace the PDF

Overwrite `public/Tushar-Ghodadra-Biodata.pdf`, or change `site.pdf` in `content/biodata.ts`.

## Notes

- The opening blessing animation plays once per browser session.
- The custom cursor, magnetic buttons, 3D tilt and pinned horizontal gallery are mouse-only; touch devices get native scrolling and a swipeable gallery.
- Users who prefer reduced motion get the content without the choreography.
- The site is set to `noindex` because a biodata is meant to be shared privately by link.
