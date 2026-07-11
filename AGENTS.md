# AdityaKrCodes Portfolio v2.1

## Tech Stack

- **Framework:** Next.js 15.5.18 (App Router, Turbopack)
- **Runtime:** React 19.2.3, TypeScript 5 (strict mode)
- **Animation:** `motion` ^12.23.12 (successor to Framer Motion) — import from `"motion/react"`
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss"` in globals.css), PostCSS with `@tailwindcss/postcss`
- **Utilities:** `clsx` + `tailwind-merge` via `cn()` helper in `lib/util.ts`
- **Deployment:** Cloudflare Workers via `@opennextjs/cloudflare` ^1.20.1
- **Package Manager:** pnpm (NOT npm — `pnpm-lock.yaml` is source of truth)

## Available Scripts

```bash
pnpm dev          # Next.js dev server (with OpenNext Cloudflare dev)
pnpm build        # next build
pnpm start        # next start
pnpm lint         # next lint
pnpm preview      # opennextjs-cloudflare build && preview
pnpm deploy       # opennextjs-cloudflare build && deploy
pnpm upload       # opennextjs-cloudflare build && upload
pnpm cf-typegen   # wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts
```

## Project Structure

```
app/                          # Next.js App Router
├── layout.tsx                # Root layout (dark theme, grid bg, Navbar, Footer)
├── page.tsx                  # Home page (hero, experience, projects, skills, CTA)
├── about/page.tsx            # About page (profile card, skills, timeline)
├── projects/page.tsx         # Projects page (status + category filters)
├── contact/page.tsx          # Contact page (sidebar + form, currently disabled)
├── blog/page.tsx             # Blog placeholder ("Building")
├── globals.css               # Tailwind import, dark bg, noise texture, scrollbar
├── styles/fonts.tsx          # Custom fonts via next/font/local
└── components/               # Reusable app components
    ├── Navbar.tsx            # Sticky glassmorphism navbar, IntersectionObserver
    ├── Footer.tsx            # Footer with social links
    ├── ProjectCard.tsx       # Project card with image, status, category badges
    ├── ProjectModal.tsx      # Full-screen project detail modal
    └── GitHubContributions.tsx # Contribution graph via jogruber.de API
data/data.json                # Portfolio data (projects, experience, skills, etc.)
lib/util.ts                   # cn() utility
public/
├── fonts/                    # Jersey10 (logo), League Spartan (text), VT323
└── images/                   # pfp.png, project screenshots
```

## Code Conventions

### All Pages Are Client Components
All pages and interactive components use `"use client"` at the top — no server components with data fetching.

### Name & Export
- Components use `export default function ComponentName()` syntax (named functions, not arrow exports)
- Page files export `default function PageName()`
- Props are typed with inline `interface` just above the component
- File names: PascalCase for components (`ProjectCard.tsx`), kebab-case for pages (`page.tsx`)

### Imports
- `motion` is imported from `"motion/react"` (NOT `"framer-motion"`)
- Font utilities imported from `../styles/fonts` (exports `logo` and `text` — both `next/font/local`)
- Portfolio data imported from `../../data/data.json`
- Components use relative imports within `app/` (no barrel/index files)
- The `@/*` path alias maps to root but is NOT used consistently — prefer relative imports

### Font Usage
```tsx
import { logo, text } from "../styles/fonts";
// Display/logo text: {logo.className}
// Body text: {text.className}
```

### Styled Card Pattern
Repeating glassmorphism card style used throughout:
```tsx
className="bg-zinc-800/60 backdrop-blur-xl border border-zinc-700/40 rounded-2xl p-6 transition-all hover:bg-zinc-800/80 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]"
```

### Animation Patterns
- Common variants defined as module-level objects (`fadeInUp`, `staggerContainer`)
- Scroll-triggered: `initial + whileInView + viewport={{ once: true }}`
- Mounted-triggered: `initial + animate`
- Consistent durations: `0.5` for page elements, `0.3` for small elements, `0.12` for hover tooltips
- Stagger delays: `index * 0.1`

### Styling
- Tailwind CSS v4 syntax (`@import "tailwindcss"`, no `tailwind.config`)
- Dark theme (`#0a0a0b` background, `#fafafa` text)
- Class merging: `cn()` from `lib/util.ts`
- Inline SVG icons (no icon library)

### Data Layer
All portfolio content lives in `data/data.json`:
- `experiences[]` — work history with company, title, period, technologies
- `projects[]` — project entries with title, description, technologies, status, image, links
- Skills, education, personal info also in the same file

### Linting
- `next lint` (built-in Next.js ESLint, no custom config)
- TypeScript strict mode

## Cloudflare Deployment

- Deployed on Cloudflare Workers via OpenNext
- R2 incremental cache configured in `open-next.config.ts`
- `wrangler.jsonc` with `nodejs_compat` flag
- Static assets cached for 1 year (`public/_headers`)
- Dev vars: `NEXTJS_ENV=development` in `.dev.vars`
