# portfolio-mihir

Personal portfolio for Mihir Yanamandra — data engineer.

**Live:** [mihiryanamandra.com](https://mihiryanamandra.com)

A single-page React app in two visual registers: a sky-blue bento grid for the work,
a white editorial résumé, and a near-black monochrome page for the toolset.

## Routes

| Path | Page | Notes |
| --- | --- | --- |
| `/` | Projects | Bento grid of featured work, reading list, credentials |
| `/about` | Résumé | About, experience, education, certifications, publications, blogs |
| `/skills` | Skills | Masonry of skill groups on a dark monochrome palette |
| `/projects` | → `/` | 301 in `public/_redirects`, kept so the old URL never breaks |
| `*` | 404 | Custom not-found page |

Routing uses `createBrowserRouter`, not `<BrowserRouter>` — React Router only honours a
`Link`'s `viewTransition` prop when `router.window` is set, which only a data router does.
That prop is what drives the 180 ms crossfade between routes.

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** — all design tokens live in `tailwind.config.js`
- **react-router-dom 7** (data router)
- **IBM Plex Mono** as the only typeface
- **No animation library.** Motion is CSS transitions plus `IntersectionObserver`;
  every effect has a `prefers-reduced-motion` path.
- Deployed on **Cloudflare Pages** from `main`

## Running it

```bash
npm install
npm run dev
```

`npm run build` emits to `dist/`. `npm run lint` runs ESLint.

> Editing `tailwind.config.js` requires a dev-server restart — a running Vite process
> will not pick up config changes and you will be debugging stale CSS.

## Where things are

```
src/
├─ config.ts              all site content — copy, projects, skills, links
├─ App.tsx                routes + scroll restoration
├─ pages/                 ProjectsPage, Home (résumé), SkillsPage, NotFound
├─ components/            Header, ProjectsNav, ProjectCard, Reveal, résumé sections
├─ useActiveSection.ts    scrollspy for the résumé nav's active-section rule
├─ useNavPanel.ts         mobile overlay: focus trap, Escape, scroll lock
└─ index.css              design tokens, reveal + route-transition keyframes
```

Content is data, not markup: nearly everything visible is edited in `src/config.ts`.

## Conventions worth knowing

- **Colour tokens** are in `tailwind.config.js`. The `night-*` set is the skills page and
  is deliberately neutral, not tinted. `night-pill` is *darker* than `night-card`, so pills
  read as inset rather than raised.
- **`Reveal`** wraps section-level groups, never individual cards — a per-card stagger
  would leave the bottom of a long grid waiting on a delay nobody sees.
- **`public/_redirects`** carries the SPA fallback. Without it a direct hit or refresh on
  any route but `/` returns 404 on Cloudflare Pages.
