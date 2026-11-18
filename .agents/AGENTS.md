# SuVi Website — Agent Guide

This document defines the architecture, import rules, and code-quality expectations for the SuVi Website Next.js project. All agents working on this codebase must follow these rules.

## Project Overview

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode enabled)
- **Styling:** Tailwind CSS v4 (CSS-first configuration via `app/globals.css`, no `tailwind.config.js`)
- **Rendering strategy:** Server Components by default; Client Components only for interactive elements and marked explicitly with `"use client"`.

## Directory Structure

```text
.
├── .agents/            # Agent instructions and project rules
├── app/                # Next.js App Router pages and global layout
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── products/page.tsx
│   ├── services/page.tsx
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   └── globals.css
├── components/         # Reusable, low-level UI primitives
│   ├── button.tsx
│   ├── card.tsx
│   └── input.tsx
├── sections/           # Large page layout blocks composed of components
│   ├── about-content.tsx
│   ├── category-grid.tsx
│   ├── contact-section.tsx
│   ├── cta-section.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── navigation.tsx
│   ├── page-header.tsx
│   ├── product-grid.tsx
│   ├── services-list.tsx
│   ├── stats.tsx
│   ├── testimonials.tsx
│   └── value-props.tsx
├── public/             # Static assets
│   ├── favicon.png
│   └── og-image.jpg
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## Import Hierarchy (Strict)

Dependencies must flow in one direction only:

```text
components -> sections -> app/pages
```

- **`components/`** may only import from other `components/` or external packages.
- **`sections/`** may import from `components/` and other `sections/`, but never from `app/`.
- **`app/`** (pages and layout) may import from `sections/` and `components/`.

**Never import upward.** A component must not import from a section or page.

Use absolute path aliases for all internal imports:

```ts
import { Button } from '@/components/button';
import { Hero } from '@/sections/hero';
```

Configured path aliases in `tsconfig.json`:

- `@/*` maps to the project root.
- Use `@/components/*`, `@/sections/*`, `@/app/*`, etc.

## Server vs. Client Components

- **Server Components are the default.** Page files (`app/**/page.tsx`), `layout.tsx`, and `not-found.tsx` must remain Server Components unless there is a compelling reason.
- **Mark client-side interactive elements with `"use client"`** at the very top of the file.
- Keep client logic isolated in small Client Components inside `components/` or `sections/` so that surrounding layouts stay on the server.

## Routing Rules

All pages are independent routes. Do not use anchor-based navigation or scroll-to-section behavior on the home page.

Allowed routes:

- `/`
- `/about`
- `/products`
- `/services`
- `/contact`

Navigation must use full route links only:

```tsx
<Link href="/about">About</Link>
<Link href="/services">Services</Link>
<Link href="/contact">Contact</Link>
```

Do **not** use `/#about`, `/#services`, `/#contact`, or any hash anchors.

## Code Quality Expectations

- TypeScript `strict` mode is enabled. Do not loosen type settings.
- Prefer explicit return types for reusable components and helpers.
- Use functional components. Avoid class components.
- Keep components focused and composable.
- Use Tailwind utility classes; avoid arbitrary values when possible.
- Ensure all new files are linted and pass `npm run type-check`.
- Run `npm run build` before declaring work complete.
