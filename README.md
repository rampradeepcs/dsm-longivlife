# Nachi Tekneka — Website

A premium, cinematic marketing site for **Nachi Tekneka**, a solution provider for the
spinning industry (OEM-level spare parts, SpinLyfeX™ retrofits and onsite technical
services). Design language inspired by high-end product sites, adapted to Nachi Tekneka's
red / white / dark-gray brand.

## Highlights

- **Scroll-driven 3D hero** — a procedural servo + drive controller (SpinLyfeX MAXX) built
  with Three.js / react-three-fiber that rotates, zooms and reveals animated feature
  callouts as you scroll.
- **Cinematic scrolling** — Lenis momentum scroll, IntersectionObserver reveal animations,
  count-up stats, and micro-interactions throughout.
- **Full content architecture** — flagship retrofit showcase, OEM quality pillars, parts
  catalog, industry solutions, technical services, company overview, testimonials, global
  presence map, downloads and a working inquiry form.
- **Responsive, accessible & SEO-ready** — mobile-first layouts, reduced-motion support,
  skip links, semantic structure and JSON-LD organization schema.

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Three.js / @react-three/fiber +
drei · Lenis.

## Develop

```bash
npm run dev     # start dev server → http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## Structure

- `src/app/` — layout (fonts, SEO metadata, JSON-LD), global design system, page composition.
- `src/components/` — section components (Hero, SpinLyfeX, Catalog, Solutions, …) and shared
  primitives (Section, Reveal, Icons, Logo, SmoothScroll).
- `src/components/hero/` — the 3D scene and scroll-driven hero.
- `src/lib/data.ts` — all site content, distilled from the official company profile.
