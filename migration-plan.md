# Migration Plan: Portfolio Redesign

## Comparison Summary

| Aspect | `project` (Original) | `devportfolio-master` (Target Design) | `project` (Current State) |
|--------|---------------------|---------------------------------------|---------------------------|
| **Framework** | React 18 + Vite + TypeScript | Astro + TypeScript | React 18 + Vite + TypeScript (kept) |
| **CSS** | Tailwind CSS v3 + custom animations | Tailwind CSS v4 + utility-first | Tailwind CSS v3 + minimal animations |
| **Theme** | Dark (purple/pink gradients) | Light (white bg, blue accent) | Light (white bg, blue accent #1d4ed8) |
| **Font** | System defaults | IBM Plex Mono (monospace) | IBM Plex Mono (monospace) |
| **Icons** | lucide-react | Inline SVGs (Tabler-style) | Inline SVGs |
| **Architecture** | Single monolithic App.tsx (~390 lines) | Config-driven, 7 separate components | Config-driven, 10 separate components |
| **Content Source** | Hardcoded inline in JSX | Centralized `config.ts` | Centralized `config.ts` |
| **Hero** | Photo + background image + gradient | Text-only + SVG pattern background | Mount Fuji bg + SVG fallback |
| **Layout** | Centered max-w-4xl cards | 12-col grid (4-col heading / 8-col content) | 12-col grid + centered layouts |

---

## Current File Structure

```
project/src/
├── config.ts                    (centralized content — all personal data)
├── App.tsx                      (shell composing 10 components)
├── main.tsx                     (entry point)
├── index.css                    (light theme, IBM Plex Mono, fadeIn animations)
├── vite-env.d.ts
└── components/
    ├── Header.tsx               (fixed nav, scroll-blur, bold black links)
    ├── Hero.tsx                 (Mt Fuji bg + SVG fallback, greeting, name, socials)
    ├── About.tsx                (2-col grid, bio + 30 skill pills)
    ├── Experience.tsx           (centered timeline, alternating cards, date badges)
    ├── Projects.tsx             (centered 2-col grid, 8 numbered cards)
    ├── Education.tsx            (2-col grid, degree cards)
    ├── Certifications.tsx       (2-col grid, cert cards)
    ├── Publications.tsx         (2-col grid, paper links with venues)
    ├── Blogs.tsx                (2-col grid, numbered blog cards)
    └── Footer.tsx               (full footer, socials, nav, wave SVG)
```

---

## Section Order (Current)

1. **Hero** — Mt Fuji cherry blossom background, "Hello!", name (accent), title, social icons
2. **About Me** — Bio paragraph + 30 skill tags as rounded pills
3. **Professional Experience** — Alternating timeline (4 roles: TechTorch, Apexon, DBQ, RA)
4. **Projects** — 2-col grid, 8 numbered cards (3 real + 5 placeholder)
5. **Education** — 2 degrees (Stony Brook MS, GITAM BTech)
6. **Certifications** — 4 certs (ML Spec, DL Spec, IBM DS, DataCamp)
7. **Publications** — 2 Springer papers with venue names
8. **Blogs** — 3 blog entries
9. **Footer** — Name, title, social icons, nav links, copyright

---

## Completed Work

### Phase 1: Foundation (Done)
- Created `src/config.ts` with all personal content
- Updated `index.html` — Google Fonts (IBM Plex Mono), meta tags, title
- Rewrote `src/index.css` — light theme, smooth scroll, accent color CSS variable, fadeIn animations
- Updated `tailwind.config.js` — IBM Plex Mono font family

### Phase 2: Component Architecture (Done)
- Split monolithic App.tsx into 8 components (Header, Hero, About, Projects, Experience, Education, Blogs, Footer)
- App.tsx reduced to ~30 line shell composing all components
- All components read from centralized config.ts

### Phase 3: Header + Hero (Done)
- Header: fixed transparent nav, scroll-triggered blur (`bg-white/80 backdrop-blur-sm`), bold black links, conditional section visibility
- Hero: Mount Fuji cherry blossom background image with gradient overlays for text readability
- Hero fallback: if image fails to load, falls back to original SVG pattern (grid + code symbols + radial gradient)
- Staggered fadeIn animations on greeting, name, title, social icons

### Phase 4: About + Projects (Done)
- About: 2-col grid (heading left, bio + skill pills right), 30 skill tags
- Projects: centered layout with `max-w-7xl`, 2-col grid (`md:grid-cols-2`), 8 numbered cards with tech tags, `min-h-[220px]`, skills pinned to bottom

### Phase 5: Experience + Education + Certifications + Publications + Blogs (Done)
- Experience: distinct centered timeline design, alternating left/right cards, accent-colored date badges, briefcase icon, `bg-gray-50` background
- Experience data: 4 roles (TechTorch, Apexon, DBQ Technologies, University Housing RA)
- Education: 2-col grid, 2 real degrees (Stony Brook MS, GITAM BTech) with GPA and coursework
- Certifications: separated from Education into own section, 4 certs with issuer/date/description, heading capped at `text-5xl` to prevent overflow
- Publications: new section with 2 Springer papers, heading capped at `text-5xl`, numbered cards with venue names and external links
- Blogs: 2-col grid, 3 numbered blog entries

### Phase 6: Footer + Polish (Done)
- Footer: full footer with name, title, social icons, nav links, copyright, decorative wave SVG
- All section headings: `font-black text-black` (weight 900, pure black)
- Header nav links: always bold black, no hover color change
- Updated about bio and expanded skills to 30 items
- All nav (Header + Footer) updated with all sections including conditional visibility

---

## Remaining Work

### Phase 7: 3D Background with Vanta.js
**Objective:** Add Vanta.js 3D animated background (Net/Waves/Globe/Fog) behind content sections from About to Blogs.

**Dependencies to install:**
- `three` — 3D rendering engine
- `vanta` — pre-built 3D effects

**Files to edit:**
- `src/App.tsx` — wrap content sections in a Vanta container
- Possibly a new `src/components/VantaBackground.tsx` wrapper component

**Considerations:**
- Performance: Vanta runs WebGL — need to handle fallback for low-end devices
- Colors: configure to match accent color (#1d4ed8) and light theme
- Opacity: keep subtle so content remains readable
- Choose effect: Net, Waves, Globe, or Fog

**Status:** Pending user approval

---

## Content Summary

### Personal Info
- **Name:** Mihir Yanamandra
- **Title:** Data Science Student at Stony Brook University
- **GitHub:** https://github.com/MIHIRY
- **LinkedIn:** https://www.linkedin.com/in/mihir-yanamandra-60358021b
- **Personal Email:** mihiryanamandra10@gmail.com
- **University Email:** mihir.yanamandra@stonybrook.edu

### About Bio
> I'm a Data Science graduate student at Stony Brook University focused on building scalable, intelligent systems that transform data into real-world impact. My experience spans machine learning, statistics, SQL, and data engineering, with a focus on designing end-to-end solutions from predictive models to production-ready data workflows. I'm driven by complex problem-solving, analytical rigor, and building systems that are both technically robust and practically valuable.

### Skills (30 items)
Python, SQL, PySpark, Machine Learning, Statistics, Pandas, Scikit-learn, Airflow, dbt, Snowflake, PostgreSQL, Databricks, Docker, Git, FastAPI, MongoDB, MySQL, DuckDB, TensorFlow, Microsoft Fabric, Power BI, Tableau, Streamlit, R, Java, NumPy, MLflow, Excel, Jupyter, GitHub

### Experience (4 roles)
1. Data Engineer Intern — TechTorch (June–Aug 2025)
2. Data Analyst Trainee — Apexon (May–Jul 2024)
3. Data Analyst Intern — DBQ Technologies / Bankhaus Scheich (Sept 2023–Mar 2024)
4. Resident Assistant — University Housing (May 2025–Jun 2026)

### Projects (8 total — 3 complete, 5 placeholder)
1. Word Embeddings Analysis
2. Neural Networks for POS Tagging & Bigram Language Modeling
3. Hate Speech Detection Using Different Models
4. Terrorism Risk Forecasting (placeholder)
5. Business Insights 360 (placeholder)
6. RAGFlow: Enhancing Research Paper Comprehension (placeholder)
7. Adaptive Query Ranker – SQL Performance Optimization (placeholder)
8. Large-Scale Frequent Itemsets (placeholder)

### Education (2 degrees)
1. Stony Brook University — MS in Data Science, GPA 3.84 (Aug 2024–Jun 2026)
2. GITAM — BTech in CS&E, GPA 3.43 (Jun 2019–Jul 2023)

### Certifications (4)
1. Machine Learning Specialization — Coursera/Stanford (2023)
2. Deep Learning Specialization — Coursera/DeepLearning.AI (2023)
3. Data Science Professional Certificate — IBM (2022)
4. Python for Data Science — DataCamp (2022)

### Publications (2)
1. "A Study of Hate Speech Detection Using Different Models" — ICDSAI (Springer)
2. "Study of Various Routing and their Security Challenges in Vehicular Ad Hoc Networks" — ISSSC (Springer)

### Blogs (3)
1. Knowledge Graph for Financial Chat Bot
2. What Makes Good In-Context Examples for GPT-3? (KNN)
3. REST: Retrieval-Based Speculating Decoding

---

## Status Tracker

| Phase | Status | Completed |
|-------|--------|-----------|
| Phase 1: Foundation | Done | Yes |
| Phase 2: Component Architecture | Done | Yes |
| Phase 3: Header + Hero | Done | Yes |
| Phase 4: About + Projects | Done | Yes |
| Phase 5: Experience + Education + Certs + Pubs + Blogs | Done | Yes |
| Phase 6: Footer + Polish | Done | Yes |
| Phase 7: Vanta.js 3D Background | Pending | — |
