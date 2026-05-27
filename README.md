# Felipe Cruz — Portfolio

Personal portfolio built with Next.js 14, TypeScript, Tailwind CSS.

## Stack

- **Framework:** Next.js 14 App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS custom properties
- **Fonts:** Syne (display) + DM Sans (body) — Google Fonts
- **Deployment:** Vercel

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

Add your custom domain in the Vercel dashboard.

## Structure

```
app/
  layout.tsx           Root layout, metadata
  page.tsx             Homepage assembly
  globals.css          Design tokens, base styles, cursor
components/
  Nav.tsx              Fixed nav, scroll-aware
  Hero.tsx             Animated headline
  SignalStrip.tsx      4-stat strip, count-up on scroll
  Work.tsx             3 project cards (coming soon)
  About.tsx            Bio, skills, quote
  Footer.tsx           Contact CTAs
  Cursor.tsx           Custom cursor
  ResponsiveStyles.tsx Mobile/tablet overrides
vercel.json            Vercel config
```

## Activating case studies

1. Create `app/work/[slug]/page.tsx`
2. In `Work.tsx` change project `status` to `"live"` and add `href`
3. Wrap the card div in a Next.js `<Link>`

## Update LinkedIn

Replace the LinkedIn href in `Footer.tsx` with your actual profile URL.
