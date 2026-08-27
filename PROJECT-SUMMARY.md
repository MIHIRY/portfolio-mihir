# Portfolio — Project Summary for Design-Engineering Handoff

Written from a full read of the codebase at `D:\Portfolio\portfolio-mihir-main\portfolio-mihir-main`
(Aug 2026). Describes what exists. No redesign proposed here.

---

## 1. Product Overview

**What it is.** A personal portfolio site for Mihir Yanamandra, a data engineer / Data
Science student at Stony Brook University. Two real surfaces: a one-page scrolling
resume site at `/`, and a separate bento-grid projects page at `/projects`. Static,
client-rendered, no backend, no auth, no database. All content lives in one TypeScript
file (`src/config.ts`, 476 lines) — the app is a rendering layer over that object.

**Who it's for.** Recruiters, hiring managers and engineering leads evaluating him for
data-engineering roles. Secondary: peers and collaborators arriving from LinkedIn/GitHub.

**Problem it solves.** Consolidates credibility — experience, 14 projects, education,
certifications, publications, blogs, reading — into one linkable address, with proof
(GitHub repos, Credly badges) one click away.

**Primary actions users should take**, in the order the site pushes them:
1. Click **View my projects** → `/projects`
2. Click **Schedule a coffee chat** → Google Calendar booking link (present in both the
   home hero and the projects-page nav — the site's only conversion action)
3. Open a project → external GitHub repo (new tab)
4. Email / LinkedIn / GitHub via icon row in hero and footer

**Experience being aimed at.** A credible, engineering-literate personal brand: mono
typeface throughout, restrained palette, work shown as artifacts rather than claims.
The `/projects` page reaches further — an editorial bento grid adapted from a Framer
reference, closer to a design-portfolio feel than a typical dev resume site.

---

## 2. Tech Stack

From `package.json` — the dependency list is genuinely this short:

| Area | What's used |
|---|---|
| Build | **Vite 5.4** (`@vitejs/plugin-react`) |
| Framework | **React 18.3** (no Next.js, no SSR/SSG) |
| Language | **TypeScript 5.5**; ESLint 9 flat config |
| Routing | **react-router-dom 7.18** (`BrowserRouter`, 3 routes) |
| Styling | **Tailwind CSS 3.4** + PostCSS + autoprefixer; one 81-line `src/index.css` |
| UI library | **none** — no shadcn, Radix, Headless UI, MUI |
| Animation library | **none** — CSS transitions/keyframes + one IntersectionObserver |
| Icons | `lucide-react` **is installed but unused in shipping code** — the only import lives in `src/App copy.tsx`, a stray leftover. Every icon in the live app is a hand-inlined SVG |
| State | **none** — no Zustand/Redux/Context. Three `useState` calls total (scroll flag, 2 image-error flags) |
| Forms / validation | none — there are no forms |
| Toasts / notifications | none |
| Fonts | IBM Plex Mono via Google Fonts CDN, **weights 100–700 plus all italics** |
| Deploy | Cloudflare Pages at mihiryanamandra.com, from a separate GitHub repo. **The local folder is not a git repo** — changes must be copied into the real repo to ship |

**Design system:** partial. `tailwind.config.js` defines a real named token set —
`page`, `surface`, `surface-deep`, `plate`, `plate-rule`, `accent`, `accent-deep`,
`hairline`, `ink`, `ink-muted` — but these are used **only by `/projects`**. The home
page uses raw Tailwind grays plus `siteConfig.accentColor` (`#1d4ed8`) injected as
inline `style` on ~15 elements. So: one tokenized surface, one untokenized surface.

**Reusable architecture:** thin. `ProjectCard` + `ProjectMedia` + `Reveal` are the only
genuinely reusable components; the eight home sections are one-off page sections that
happen to share a copy-pasted layout shape.

---

## 3. Website Structure

Three routes, defined in `src/App.tsx`:

### `/` — Home (`src/pages/Home.tsx`)
One-page vertical scroll. Wrapped in `SiteLayout` (fixed `Header` + `Footer`). Renders
eight sections in fixed order, each of which self-hides when its config array is empty:

| Section | Purpose | Notable UI |
|---|---|---|
| `Hero` | Name, title, primary CTAs | Full-viewport, remote mountain photo background with two white gradient scrims; hand-built SVG grid/code-symbol fallback if the image 404s; two buttons + 4 social icon links |
| `About` (`#about`) | Bio paragraph + 30 skill pills | 4/8 split grid, pill chips with hover tint |
| `Experience` (`#experience`) | 4 roles | **Alternating two-column timeline** with a center rule, dots, and date badges that flip to the opposite side; collapses to a left-rail timeline below `md`. Most structurally complex section on the page |
| `Projects` (`#projects`) | **All 14** projects | 2-column card grid, numbered `01`–`14`, blue tag pills, arrow-in-circle affordance; each card links straight to GitHub. A line of copy points to `/projects` |
| `Education` (`#education`) | 2 degrees | Bordered cards with achievement bullets |
| `Certifications` (`#certifications`) | 4 certs | Same card shape as Education |
| `Publications` (`#publications`) | 2 papers | Numbered link-cards, arrow circle |
| `Blogs` (`#blogs`) | 3 posts | Numbered link-cards, arrow circle |

### `/projects` — Projects page (`src/pages/ProjectsPage.tsx`, 350 lines)
The most designed surface. **Does not use `SiteLayout`** — it carries its own
`ProjectsNav` header and has **no footer at all**. Sets `document.body.background` to
`#EEF5FB` on mount so the overscroll area matches, restores on unmount.

Layout: a 12-column bento of `rounded-3xl` cards on a `p-3…p-5` page gutter, 12–20px gaps.
- **Lead grid:** typographic hero card ("Data Platforms *Engineered* for Scale") with a
  12-ellipse SVG bloom; full-bleed portrait; tall featured project card; education card
  with a diamond mark; certifications card (accent tint, per-row `[LINK]` verify anchors);
  a wide split-layout project; a `LinkedIn` statement card; two more project cards with
  hand-tuned aspect ratios.
- **Tech strip:** a full-width row of 14 tools, dot-separated, with a fluid
  `clamp(13px, calc(1.366vw - 4.8px), 16.4px)` font size derived so the line spans the
  box edge-to-edge.
- **Second grid:** a tall `ReadingCard` (3 books with covers, authors, takeaways) beside
  four more project cards.

Every grid item is wrapped in `<Reveal>` with a 0/70/140 ms stagger.

### `*` — NotFound (`src/pages/NotFound.tsx`)
404 label in accent mono, headline, two buttons (Back to home / View projects). Recently
fixed from silently rendering Home.

---

## 4. Important Components

| Component | Where | Notes |
|---|---|---|
| `Header` | `/` and 404 only | Fixed, `z-50`, `h-16`. Transparent until `scrollY > 100`, then `bg-white/80 backdrop-blur-sm`. Avatar + first name on the left, 7 nav links on the right. Filters out links to empty sections. **`hidden md:flex` — there is no mobile menu, no hamburger, no drawer. Below `md` the nav simply disappears** |
| `ProjectsNav` | `/projects` only | A completely different header: rounded-3xl surface card, bracketed nav labels (`[About]`, `[GitHub]`, `[What I Read]`, `[Contact]`), italic/bold split wordmark. Three-way responsive grid with a hand-picked `min-[1440px]` breakpoint. Not fixed — scrolls away. Fully visible on mobile (wraps) |
| `ProjectCard` | `/projects` | The real workhorse. Three layouts (`featured` / `stacked` / `split`), configurable plate aspect ratio, `cover`/`contain` fit, `compact` flag. Renders as `<a>` when `link` is set and as an inert `<div>` when not — non-linked cards show "Description to follow." and a `Coming soon` tag instead of real tags. Includes an `sr-only` "(opens on GitHub in a new tab)" |
| `ProjectMedia` | `/projects` | Image plate with a tinted `bg-plate` backing, `loading="lazy"`, and an `onError` fallback that draws an SVG cross-rule placeholder at identical dimensions — so a missing cover never shifts layout |
| `Reveal` | `/projects` only | IntersectionObserver, fires once (`observer.disconnect()`), toggles a `.is-visible` class; transition lives in CSS so `prefers-reduced-motion` can cancel it. `delay` prop drives stagger via inline `transition-delay` |
| `ArrowOut` | both pages | Shared north-east arrow, translates on group hover |
| `Footer` | `/` and 404 only | Dark gradient, name/title, 3 social icons, nav list, copyright, decorative wave SVG at 5% opacity |
| `ScrollManager` | app-wide | Scrolls to hash target (smooth, or instant under reduced-motion) or to top on route change |
| `useDocumentMeta` | all pages | Sets `<title>` and meta description per route, client-side |
| `EllipseBloom`, `DiamondMark`, `StatementCard`, `CertificationsCard`, `TechStrip`, `ReadingCard`, `SvgFallbackBg` | inline | Page-local, not extracted |

**Not present anywhere:** modals, drawers, dropdowns, tabs, tables, forms, inputs,
toasts, tooltips, command menu, skeletons, spinners, pagination, filters, search.

---

## 5. Current Visual Direction

**Two distinct design languages sharing one typeface.**

**Home page** — white, high-contrast, conventional:
- Type: IBM Plex Mono throughout; section headings `font-black` at up to `text-7xl`; body `text-gray-600`
- Color: white surfaces, `bg-gray-50` bands, `#1d4ed8` accent applied via inline styles; near-black `#1f2937` body text; dark gradient footer
- Radius: `rounded-lg` (8px) cards, `rounded-full` pills
- Shadows: `shadow-sm` → `hover:shadow-md/lg` on most cards
- Spacing: generous — `py-16` to `lg:py-32` per section; `px-8` to `lg:px-24` gutters; `max-w-7xl`
- Layout: repeated 4/8 twelve-column split (heading left, content right); Experience and Projects break to centered headings
- Density: low. Long page — 14 project cards plus 6 other sections

**Projects page** — sky-blue, editorial, flat:
- Palette: `#EEF5FB` page, `#D9E8F5` surfaces, `#C9DFF1` hover, `#BCD8EE` plates, `#0F1720` ink
- Radius: `rounded-3xl` (24px) everywhere
- **Shadows: none at all** — depth comes only from tint steps
- Spacing: tight, deliberate — 12–20px gaps, cards carry the padding
- Type: mixes `font-light italic` against `font-bold` in headlines and the wordmark; small caps-style labels at `tracking-[0.16em]`; several hand-computed fluid sizes
- Density: high, magazine-like

**Light/dark:** light only. No `dark:` variants, no `prefers-color-scheme` handling.

**Desktop vs mobile:** desktop-led. `/projects` degrades cleanly (12-col → 2-col → 1-col
with per-card `md:`/`lg:`/`xl:` spans). `/` degrades acceptably in body content but
**loses its entire navigation below 768px**.

**How it reads, and why:**
- `/projects` is **editorial / premium**: asymmetric bento, mixed italic-and-bold display
  type, a hand-drawn line-art motif, no shadows, tuned optical spacing. The code comments
  argue about 3-pixel crops and letterbox percentages — real craft went in.
- `/` is **utilitarian / professional**, closer to a good Tailwind template: heavy black
  headings, accent underline rules, gray card grids, standard shadow-lift hovers. Nothing
  wrong with it; nothing distinctive either.
- Neither is playful or experimental. Nothing is consumer-focused. The two surfaces read
  as different products by different designers, joined only by the shared mono font and
  the avatar in both headers.

---

## 6. Interaction Design

**What exists:**
- **Hover.** Home: cards lift (`-translate-y-1`) and gain shadow, buttons drop opacity or
  shift background, skill pills tint, arrow circles translate diagonally. Projects: card
  surface tints `surface → surface-deep`, cover image scales `1.03` over 700ms, `ArrowOut`
  nudges up-and-right, links fade to 60–75% opacity.
- **Focus.** `/projects` and the 404 have thorough `focus-visible:ring` treatment, with
  ring-offset colors matched per surface. **The entire home page has almost none** — the
  header nav links, project cards, publication and blog cards, and experience cards have
  no focus styling at all beyond what Tailwind's preflight already suppresses.
- **Navigation.** Hash links + `ScrollManager` + CSS `scroll-behavior: smooth` +
  `scroll-margin-top: 4rem` on sections. Reduced-motion switches to instant.
- **Header state.** Single boolean: transparent vs frosted at 100px scroll.
- **Error feedback.** Two `onError` image fallbacks (hero background, project covers).
  That is the site's entire error handling.
- **New-tab announcements.** `sr-only` spans on `/projects` links. Not on home links.

**Basic / unclear / unfinished:**
- **No mobile navigation on `/`.** Confirmed gap, not a preference.
- **No active-section indicator.** Seven nav links, no sense of where you are in a very
  long page.
- **Header nav links have no hover or focus state whatsoever** — plain `text-black text-sm font-bold`.
- **Header "Projects" goes to `/projects`, not `#projects`** — so the 14-card home section
  is unreachable from navigation, and both surfaces present "projects" with no explanation
  of the difference.
- **Scroll listener runs unthrottled on every scroll event** to flip one boolean.
- **No loading feedback of any kind.** No skeletons, no blur-up, no priority hint on the
  hero image. The hero background is a **hardcoded remote URL on wallpapercave.com** —
  third-party, uncached by the deploy, and the LCP element.
- **Books say "Click a book to read my takeaways" but all three `link` fields are empty**,
  so the cards render as inert `<div>`s. The affordance promises an interaction that does
  not exist.
- **No confirmation flows, destructive actions, inline editing, drag-and-drop, swipe
  gestures or keyboard shortcuts** — and none are needed. The site is read-only.

---

## 7. Current Animations and Motion

Everything is CSS. No animation library, no JS-driven motion, no view transitions.

| Animation | Implementation | Assessment |
|---|---|---|
| **Hero text entrance** | `@keyframes fadeIn` (20px rise), `.animate-fadeIn` + 3 delay classes at 0.2/0.4/0.6s, each 0.8s `ease-out` | **Too slow.** 0.8s × 4 with the last starting at 0.6s means the hero is still settling ~1.4s in. Standard entrance easing, no character. **Not reduced-motion guarded** — the only motion on the site that isn't |
| **Scroll reveal (`/projects`)** | `.reveal` class, 700ms `cubic-bezier(0.16, 1, 0.3, 1)`, opacity + 14px rise, IntersectionObserver at `threshold: 0.05`, `rootMargin: -8%`, staggered 0/70/140ms | **Good as-is.** Correct one-shot behaviour, tasteful stagger, fully cancelled under reduced-motion. The best motion on the site |
| **Card hover lift (`/`)** | `hover:-translate-y-1 hover:shadow-md`, 300ms `transition-all` | Works, but `transition-all` is broad and the lift+shadow combo is the most template-like gesture on the site |
| **Cover zoom (`/projects`)** | `group-hover:scale-[1.03]`, 700ms, same custom ease | **Good.** Restrained scale, long duration reads as intentional |
| **Card surface tint (`/projects`)** | `hover:bg-surface-deep`, 300ms | Good |
| **`ArrowOut` nudge** | `group-hover:-translate-y-0.5 translate-x-0.5`, 300ms | Good — consistent across both surfaces |
| **Arrow-circle nudge (`/`)** | `group-hover:translate-x-1 -translate-y-1`, 300ms | Same idea, **different distance and different icon** from `ArrowOut`. Inconsistent |
| **Header frost** | `transition-all duration-300` on a class swap | Fine, though `transition-all` on a fixed element is wasteful |
| **Smooth scroll** | native CSS | Good, correctly reduced-motion guarded |
| **Page transitions** | **none** | Route change from `/` to `/projects` is an instant hard swap between two entirely different visual worlds — the harshest cut on the site |
| **Modal / drawer / dropdown / menu motion** | **none exist** | n/a |
| **Loading animation** | **none** | Images pop in ungoverned |
| **List / item transitions** | **none** | Nothing enters, leaves or reorders |
| **Exit animations** | **none anywhere** | Nothing animates out |
| **Microinteractions** | essentially none beyond hover | No press/active feedback on any button; no tap feedback on touch |

**Where motion would genuinely earn its place** (mechanism, not decoration):
1. **Route transition `/` ↔ `/projects`** — the two pages share the avatar and the
   "Schedule a coffee chat" CTA but nothing else; a short crossfade or a shared-element
   handoff would give **continuity** across the biggest visual jump.
2. **Active-section indicator in the header** — a sliding or morphing underline tied to
   scroll position solves a real **spatial-understanding** problem on an 8-section page.
3. **Mobile nav open/close** — once a menu exists, it needs enter/exit motion to read as a
   layer rather than a repaint.
4. **Press/active states on the two hero CTAs** — the only conversion actions on the site
   currently give zero **feedback** on click.
5. **Hero entrance re-timing** — shorter, tighter stagger would improve **perceived
   responsiveness** at the exact moment first impressions form.
6. **Home page has no scroll reveal at all** while `/projects` does — extending `Reveal`
   to home sections is a **consistency** fix, not a new effect.

Motion that should **not** be added: parallax on the hero, animated counters, typewriter
effects on the title, card 3D tilt, scroll-jacked section snapping. None address a
comprehension problem, and all cut against a mono-typeface engineering brand.

---

## 8. UX Problems and Rough Areas

**Confirmed problems** (verifiable in the code, not matters of taste):
1. **No mobile navigation on `/`.** `hidden md:flex`, no alternative. Below 768px the
   site has no nav at all.
2. **Focus states missing across the home page.** Header nav, project cards, publication
   cards, blog cards, skill pills. `/projects` does this correctly — home does not.
3. **Header nav links have no hover state.**
4. **Two "Projects" destinations with no distinction.** Header sends you to `/projects`
   (8 curated cards); the home `#projects` section (14 cards) is orphaned from nav.
5. **Reading-list cards promise a click that does nothing** — copy says "Click a book to
   read my takeaways", all three `link` fields are `""`.
6. **`/projects` has no footer** and no path onward except the nav's four bracketed links.
7. **Hero background is a hardcoded third-party URL** (`wallpapercave.com`) — availability,
   licensing and LCP are all outside the project's control.
8. **Google Fonts request loads 14 IBM Plex Mono variants** (100–700, roman + italic). Only
   a handful are used. Straight performance cost on first paint.
9. **`src/App copy.tsx` is a stray dead file** and, per prior notes, the repo's only
   TypeScript error. It carries the only `lucide-react` import.
10. **Unthrottled scroll listener** in `Header`.
11. **No `og:` handling per route** — `useDocumentMeta` runs client-side, so LinkedIn/Slack
    previews always show the static `index.html` tags regardless of which page is shared.
    (Documented in the code as a known trade-off, not an oversight.)
12. **No error or loading states** beyond the two image fallbacks.

**Subjective opportunities:**
- The two pages read as two different sites. Whether to unify them, or lean into
  `/projects` as a deliberate second register, is a design decision that hasn't been made.
- 14 project cards on the home page is a lot of undifferentiated surface area; nothing
  ranks or filters them.
- Section hierarchy on `/` is flat — six of eight sections use the same 4/8 grid, the same
  heading scale, the same accent rule. Experience and Projects break the pattern, which
  reads more like drift than emphasis.
- Skill list is 30 undifferentiated pills with no grouping or proficiency signal.
- `/projects` card padding is tuned per card (`p-6 sm:p-7 lg:p-8`, several one-off
  `min-h` values); it works, but it is hand-fitted rather than systematic.
- Home uses inline `style={{ color: siteConfig.accentColor }}` in ~15 places instead of
  the Tailwind token layer that already exists for `/projects`.

---

## 9. Areas I Want to Improve — Ranked

**High priority**
1. Mobile navigation for `/` (component + motion). Blocking for a real share of visitors.
2. Accessibility pass on `/`: focus-visible rings, hover states, new-tab announcements —
   bring it up to the standard `/projects` already sets.
3. Resolve the two-projects-surfaces problem: naming, nav wiring, and what home's
   `#projects` section is for.
4. Route transition between `/` and `/projects`, plus a header active-section indicator.
5. Hero: self-host or bundle the background image, add a priority hint, re-time the
   entrance stagger, add press feedback to the two CTAs.

**Medium priority**
6. Extend `Reveal` to home sections for consistency.
7. Unify the visual languages — decide whether home adopts the `/projects` token system
   (`ink`, `surface`, `hairline`) or stays deliberately separate, then commit.
8. Extract the repeated home section shell (heading + accent rule + 4/8 grid) into one
   component; extract the arrow-circle affordance so it matches `ArrowOut`.
9. Subset the font load to the weights actually used.
10. Home project grid: hierarchy, grouping, or a "show more" past the first six.

**Low priority**
11. Footer on `/projects`.
12. Throttle the scroll listener (or swap for IntersectionObserver on a sentinel).
13. Delete `src/App copy.tsx`; drop `lucide-react` or actually adopt it in place of the
    inlined SVGs.
14. Dark mode.

---

## 10. Existing Libraries That Should Be Preserved

**Keep, do not replace:**
- **Vite + React 18 + TypeScript** — correct for a static portfolio. Migrating to Next.js
  would only be justified by an SSR/OG-per-route requirement, and that is not currently a
  stated goal.
- **Tailwind 3.4** with the existing custom color tokens. The token names
  (`ink`, `surface`, `plate`, `hairline`) are good and already carry design intent.
  Extend this layer; don't introduce a second styling system.
- **react-router-dom 7** — three routes, works, `ScrollManager` is already built around it.
- **The custom `Reveal` component.** IntersectionObserver + CSS class is the right amount
  of machinery for one-shot scroll reveals. **Do not swap this for Framer Motion /
  react-intersection-observer / AOS.** It already handles reduced-motion correctly.
- **`ProjectCard` / `ProjectMedia`.** Layout variants, aspect-ratio control and the
  no-layout-shift image fallback all encode real decisions. Extend, don't rewrite.
- **`src/config.ts` as the single content source.** Every component reads from it. Keep
  that contract.
- **Inlined SVG icons.** Zero-dependency and consistent. If icons get unified, unify on
  one approach — either finish adopting `lucide-react` or delete it.

**Explicitly not needed right now:** any toast library (there is nothing async to report),
any form library (there are no forms), any data-fetching library (there is no data layer),
any headless-component library (there are no dialogs, popovers or comboboxes yet — a
mobile nav would be the first genuine candidate).

---

## 11. Constraints

- **Must stay responsive**, from ~360px to ≥1500px. The `/projects` bento already has
  hand-tuned `md` / `lg` / `xl` / `min-[1440px]` spans — respect them.
- **Must support mobile.** Home nav is the known gap.
- **Accessibility:** `prefers-reduced-motion` is already honoured in three places
  (`.reveal`, `scroll-behavior`, `ScrollManager`) — any new motion must honour it too.
  `sr-only` labels, `aria-hidden` on decorative SVGs and per-surface focus rings are
  established patterns on `/projects`; match them.
- **Performance:** static site on Cloudflare Pages. No JS animation runtime should be
  added without a clear payoff. Hero image and font payload are the two current costs.
- **No backend, no API, no auth, no persistence.** Nothing to load, so no loading states
  are needed beyond images.
- **Content contract:** all copy comes from `siteConfig`. Sections self-hide on empty
  arrays; `ProjectCard` degrades to a non-interactive "Coming soon" state without a link.
  Preserve both behaviours.
- **Deploy path:** local folder is **not a git repo**; it deploys via a separate GitHub
  repo → Cloudflare Pages. Nothing is live until it reaches that repo.
- **Do not rewrite:** `ProjectCard`, `ProjectMedia`, `Reveal`, `siteConfig`, the Tailwind
  token block.
- **In flight / incomplete:** book `link` fields are empty and awaiting Mihir's own
  write-ups; the AI Project Copilot cover is a vendor logo rather than a screenshot (the
  only white tile on `/projects`); `src/App copy.tsx` is dead and should go.

---

## 12. Relevant File Structure

```
src/
├── config.ts                      ← ALL content + FeaturedProject type. Read first.  ★
├── index.css                      ← @keyframes fadeIn, .reveal transition, reduced-motion  ★
├── App.tsx                        ← routes, ScrollManager, SiteLayout
├── useDocumentMeta.ts             ← per-route title/description
├── pages/
│   ├── Home.tsx                   ← section order for /
│   ├── ProjectsPage.tsx           ← the bento grid + 6 inline card components  ★
│   └── NotFound.tsx
└── components/
    ├── Header.tsx                 ← home nav; MOBILE NAV MISSING HERE          ★
    ├── ProjectsNav.tsx            ← the separate /projects header
    ├── Hero.tsx                   ← remote bg image, fadeIn classes, CTAs      ★
    ├── ProjectCard.tsx            ← ProjectCard + ProjectMedia + ArrowOut      ★
    ├── Reveal.tsx                 ← the scroll-reveal primitive                ★
    ├── Projects.tsx               ← home 14-card grid
    ├── About.tsx / Experience.tsx / Education.tsx /
    │   Certifications.tsx / Publications.tsx / Blogs.tsx
    └── Footer.tsx

tailwind.config.js                 ← the color token system (projects-page only)  ★
index.html                         ← og/twitter tags, JSON-LD, Google Fonts link  ★
public/                            ← portrait.jpg, avatar.jpg, project covers, book covers

src/App copy.tsx                   ← DEAD FILE. Only lucide-react import. Delete.
```
★ = inspect these before touching design.

---

## Design-Engineering Brief

- **Product:** a two-surface personal portfolio for a data engineer — a one-page scrolling
  resume at `/` and a designed bento project showcase at `/projects`. Static, read-only,
  no backend, all content in one `config.ts`.
- **Users:** recruiters and engineering leads evaluating him; secondarily peers arriving
  from LinkedIn/GitHub.
- **Main flows:** land on hero → "View my projects" or "Schedule a coffee chat" → open a
  project on GitHub → email/LinkedIn. The calendar link is the only conversion action.
- **Stack:** Vite + React 18 + TypeScript + Tailwind 3.4 + react-router-dom 7. **No UI
  library, no animation library, no state library, no forms, no toasts.** `lucide-react`
  is installed but used only in a dead file.
- **Visual direction:** IBM Plex Mono everywhere. `/` is white/gray/`#1d4ed8`, `rounded-lg`,
  shadow-lift hovers — professional, utilitarian, template-adjacent. `/projects` is
  sky-blue (`#EEF5FB`/`#D9E8F5`/`#0F1720`), `rounded-3xl`, **zero shadows**, mixed
  italic-and-bold display type — editorial and genuinely crafted. Light mode only.
- **Key components:** `ProjectCard` (3 layouts, aspect-ratio control, degrades to a
  non-linked "Coming soon" state), `ProjectMedia` (lazy image with a no-layout-shift SVG
  fallback plate), `Reveal` (IntersectionObserver one-shot scroll reveal), `Header` (home,
  frosts on scroll), `ProjectsNav` (a separate header for `/projects`), `ArrowOut`.
- **Interaction patterns today:** hover only. Card lift + shadow on `/`, surface tint +
  1.03 cover zoom + arrow nudge on `/projects`. Smooth hash scrolling. Two image
  `onError` fallbacks. **No press/active states, no menus, no modals, no keyboard
  affordances beyond tab order.**
- **Animation approach:** pure CSS. One `@keyframes fadeIn` for the hero (0.8s × 4,
  delays to 0.6s — too slow, and the only motion **not** reduced-motion guarded), and
  `.reveal` at 700ms `cubic-bezier(0.16,1,0.3,1)` with 0/70/140ms stagger — that one is
  good and should be the reference for anything new. **No page transitions, no exit
  animations, no loading motion, no list transitions.**
- **Biggest UX problems (confirmed):** (1) home nav vanishes below 768px with no
  replacement; (2) focus-visible rings and hover states are absent across the home page
  while `/projects` handles them properly; (3) two different "Projects" destinations with
  the home `#projects` section orphaned from nav; (4) reading cards say "click a book" but
  all links are empty; (5) hero background is a hardcoded wallpapercave.com URL; (6) 14
  font variants loaded from Google Fonts.
- **Best UI-polish opportunities:** mobile nav; unify the arrow affordance between pages;
  press feedback on the two hero CTAs; migrate home off inline `style={{accentColor}}` onto
  the Tailwind token layer that already exists; extract the repeated home section shell.
- **Worth prototyping:** the `/` ↔ `/projects` route transition (crossfade vs shared
  avatar/CTA element); the mobile nav pattern (sheet vs full-screen overlay vs inline
  disclosure); whether home adopts the `/projects` visual language or stays a deliberate
  second register.
- **Worth an animation review:** the hero entrance timing; the inconsistent arrow-nudge
  distances; `transition-all` usage on hover cards. **Worth an animation-opportunity
  scan:** the missing route transition, the missing header active-section indicator, and
  the home page's complete absence of scroll reveal while `/projects` has one.
- **Where a UI library might be warranted:** only the mobile nav — it's the first real
  overlay/focus-trap need. A headless primitive (Radix / Headless UI dialog) is defensible
  there. Nothing else in the app needs one.
- **Where a library is not warranted:** toasts (nothing async happens), forms (none exist),
  data fetching (no data layer), scroll-reveal (already solved correctly in 45 lines).
- **Constraints:** must stay responsive 360px→1500px; must honour
  `prefers-reduced-motion` (three existing guards); Cloudflare Pages static deploy from a
  **separate** GitHub repo — the local folder is not a git repo; keep `siteConfig` as the
  single content source and its empty-array/empty-link degradation behaviours; do not
  rewrite `ProjectCard`, `ProjectMedia`, `Reveal`, or the Tailwind token block.
