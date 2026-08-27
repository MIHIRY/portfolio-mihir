import { useEffect } from 'react';
import { siteConfig } from '../config';
import ProjectsNav from '../components/ProjectsNav';
import ProjectCard, { ArrowOut, ProjectMedia } from '../components/ProjectCard';
import Reveal from '../components/Reveal';
import { useDocumentMeta } from '../useDocumentMeta';

/** Overlapping ellipses — the line-art motif from the reference, redrawn geometrically. */
function EllipseBloom() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="h-28 w-28 text-hairline sm:h-32 sm:w-32 lg:h-36 lg:w-36"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.6"
      aria-hidden="true"
    >
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse key={i} cx="60" cy="60" rx="52" ry="19" transform={`rotate(${i * 15} 60 60)`} />
      ))}
    </svg>
  );
}

/** Four-point mark, echoing the small sparkle on the reference's bio card. */
function DiamondMark() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7 text-accent-deep" fill="currentColor" aria-hidden="true">
      <rect x="14" y="0" width="4" height="4" transform="rotate(45 16 2)" />
      <rect x="14" y="28" width="4" height="4" transform="rotate(45 16 30)" />
      <rect x="0" y="14" width="4" height="4" transform="rotate(45 2 16)" />
      <rect x="28" y="14" width="4" height="4" transform="rotate(45 30 16)" />
      <circle cx="16" cy="16" r="2.5" />
    </svg>
  );
}

/** The reference's "Contact me" composition: small label, corner arrow, one large word. */
function StatementCard({
  label,
  word,
  href,
  external,
  className = '',
}: {
  label: string;
  word: string;
  href: string;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group flex h-full flex-col justify-between rounded-3xl bg-surface p-6 transition-colors duration-300 hover:bg-surface-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-page sm:p-7 lg:p-8 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="max-w-[9rem] text-xs leading-snug text-ink-muted lg:text-[13px]">
          {label}
        </span>
        <ArrowOut className="shrink-0 text-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
      {/* justify-between already pins the word to the bottom; this margin is
          only a floor, kept low so the word still fits at half height. */}
      <span className="mt-6 text-3xl leading-none text-ink sm:text-4xl lg:text-[42px]">
        {word}
      </span>
    </a>
  );
}

/**
 * Accent card listing verifiable credentials. Each row carries its own link, so
 * the card itself can't be one — nested anchors aren't valid.
 */
function CertificationsCard() {
  return (
    <section className="flex h-full flex-col justify-between rounded-3xl bg-accent p-6 sm:p-7 lg:min-h-[320px] lg:p-8">
      <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-ink lg:text-base">
        Certifications
      </h3>
      <ul className="mt-10 space-y-4">
        {siteConfig.credentials.map((credential) => (
          <li key={credential.name} className="border-t border-accent-deep pt-4">
            <p className="text-sm leading-snug text-ink lg:text-[15px]">
              {credential.name}{' '}
              <a
                href={credential.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Verify ${credential.name}`}
                /* py-1.5 lifts the hit area past the 24px target minimum without
                   changing the line box. */
                className="whitespace-nowrap rounded-sm py-1.5 text-[11px] uppercase tracking-[0.12em] text-ink underline underline-offset-4 transition-opacity duration-200 hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
              >
                [LINK]
              </a>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Full-width tech strip. The type scales fluidly so the row spans the box edge
 * to edge on desktop: the line measures 73.2·fontSize + 208px of fixed gaps, so
 * inverting that against the box's inner width gives the coefficient below.
 * Clamped at both ends — it wraps rather than shrink past legibility.
 */
function TechStrip() {
  const stack = siteConfig.dataStack;
  return (
    <div className="rounded-3xl bg-surface px-7 py-5 sm:px-9 lg:px-10">
      <ul
        className="flex flex-wrap items-center gap-x-2 gap-y-2"
        // ~10px of slack left deliberately: vw counts the scrollbar, which is
        // wider on some platforms than the 15px here, and overflow would wrap.
        style={{ fontSize: 'clamp(13px, calc(1.366vw - 4.8px), 16.4px)' }}
      >
        {stack.map((tool, i) => (
          <li key={tool} className="flex items-center gap-x-2">
            <span className="font-bold text-ink">{tool}</span>
            {i < stack.length - 1 && (
              <span aria-hidden="true" className="text-ink-muted">
                .
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Fills the tall column that used to repeat the portrait. Cover, then title,
 * author and takeaway, separated by hairlines as on the credentials card.
 */
function ReadingCard() {
  return (
    <section id="reading" className="flex h-full flex-col rounded-3xl bg-surface p-6 sm:p-7 lg:p-8">
      {/* Longer than "Certifications", so slightly tighter tracking keeps it
          to one line at the widths where it fits at all. */}
      <h3 className="text-sm font-bold uppercase leading-snug tracking-[0.1em] text-ink lg:text-base">
        Books That Shape My Thinking
      </h3>
      <p className="mt-2 text-[11px] leading-snug text-ink-muted lg:text-xs">
        (Click a book to read my takeaways)
      </p>
      <ul className="mt-7 space-y-7">
        {siteConfig.reading.map((book) => {
          const body = (
            <>
              <div className="flex gap-5">
                <ProjectMedia
                  src={book.cover}
                  alt={book.cover ? `${book.title} cover` : ''}
                  ratio="aspect-[3/4]"
                  className="w-[100px] shrink-0 sm:w-[130px] lg:w-[150px]"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[15px] font-medium leading-snug text-ink lg:text-base">
                      {book.title}
                    </p>
                    {book.link && (
                      <ArrowOut className="mt-0.5 shrink-0 text-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    )}
                  </div>
                  {book.author && (
                    <p className="mt-1.5 text-xs text-ink-muted lg:text-[13px]">{book.author}</p>
                  )}
                </div>
              </div>
              {book.takeaway && (
                <p className="mt-4 text-[13px] leading-relaxed text-ink-muted lg:text-sm">
                  {book.takeaway}
                </p>
              )}
            </>
          );

          return (
            <li key={book.title} className="border-t border-hairline pt-6">
              {book.link ? (
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-2xl transition-opacity duration-200 hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
                >
                  {body}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <div className="group">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function ProjectsPage() {
  useDocumentMeta(siteConfig.pageMeta.projects);

  // The soft page tint has to reach the overscroll area too, not just the layout box.
  useEffect(() => {
    const previous = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#EEF5FB';
    return () => {
      document.body.style.backgroundColor = previous;
    };
  }, []);

  const [lead, second, third, fourth] = siteConfig.featuredProjects;

  return (
    <div className="min-h-screen bg-page p-3 sm:p-4 lg:p-5">
      <div className="mx-auto max-w-[1500px]">
        <ProjectsNav />

        {/* ---- Lead grid: type-led card, portrait, tall featured project ---- */}
        <div className="mt-3 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-12 lg:mt-4">
          <Reveal className="md:col-span-2 lg:col-span-5">
            <section className="relative flex h-full flex-col justify-end overflow-hidden rounded-3xl bg-surface p-7 sm:p-9 lg:min-h-[460px] lg:p-10">
              <div className="pointer-events-none absolute right-6 top-6 lg:right-9 lg:top-9">
                <EllipseBloom />
              </div>
              {/* Line breaks come from block spans, not <br>, so the accessible
                  name keeps its word spacing. */}
              <h1 className="relative mt-24 text-[26px] leading-[1.12] text-ink sm:mt-28 sm:text-4xl lg:text-[34px] xl:text-[46px]">
                <span className="block font-bold">Data Platforms</span>{' '}
                <span className="block">
                  <span className="font-light italic">Engineered</span>{' '}
                  <span className="font-bold">for</span>
                </span>{' '}
                <span className="block font-bold">Scale</span>
              </h1>
            </section>
          </Reveal>

          {/* Absolutely positioned by `sr-only`, so it claims no grid track. */}
          <h2 className="sr-only">Work and background</h2>

          <Reveal delay={70} className="md:col-span-1 lg:col-span-3">
            {/* Full-bleed, as in the reference — no surface frame around the portrait. */}
            <ProjectMedia
              src={siteConfig.portrait}
              alt={siteConfig.portrait ? siteConfig.name : ''}
              ratio="aspect-[3/4] md:aspect-auto md:h-full"
              radius="rounded-3xl"
              className="h-full lg:min-h-[420px]"
            />
          </Reveal>

          <Reveal delay={140} className="md:col-span-1 lg:col-span-4 lg:row-span-2">
            <ProjectCard project={lead} layout="featured" />
          </Reveal>

          <Reveal delay={70} className="md:col-span-1 lg:col-span-4">
            <section className="flex h-full flex-col justify-between rounded-3xl bg-surface p-7 sm:p-8 lg:min-h-[320px] lg:p-9">
              <DiamondMark />
              <ul className="mt-10 space-y-5">
                {siteConfig.education.map((entry) => (
                  <li key={entry.school}>
                    <h3 className="text-base leading-snug text-ink lg:text-lg">
                      {entry.shortName}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted lg:text-sm">
                      {entry.degree}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal delay={140} className="md:col-span-1 lg:col-span-4">
            <CertificationsCard />
          </Reveal>

          {/* ---- Wide split card + connect card ---- */}
          <Reveal className="md:col-span-2 lg:col-span-8">
            <ProjectCard project={second} layout="split" className="sm:min-h-[230px] lg:min-h-[300px]" />
          </Reveal>

          <Reveal delay={70} className="md:col-span-2 lg:col-span-4">
            {/* Two equal halves. grid-rows-2 splits the box evenly where flex
                would not — a flex item can't shrink under its own content, so
                the card kept taking the larger share. 344 = twice the card's
                164px content height plus the 16px gap, so neither half is
                squeezed under what it holds. */}
            <div className="grid h-full grid-rows-2 gap-3 sm:gap-4 lg:min-h-[344px]">
              <StatementCard
                label="Let's connect"
                word="LinkedIn"
                href={siteConfig.social.linkedin}
                external
              />
              <div className="rounded-3xl bg-surface" />
            </div>
          </Reveal>

          {/* Plate ratios vary only from lg up, where the columns differ in width.
              Stacked in one column below that, a single ratio reads as intentional. */}
          <Reveal className="md:col-span-1 lg:col-span-7">
            {/* 21/9 matches this cover's 2.34 almost exactly, so the wide diagram
                fills its plate instead of floating in it. */}
            <ProjectCard project={third} ratio="aspect-[16/10] lg:aspect-[21/9]" />
          </Reveal>

          <Reveal delay={70} className="md:col-span-1 lg:col-span-5">
            {/* 16/9 rather than 4/3: this cover is 1.94, and a 4/3 plate left a
                third of it as letterbox. */}
            <ProjectCard project={fourth} ratio="aspect-[16/10] lg:aspect-[16/9]" />
          </Reveal>
        </div>

        {/* ---- Second section ---- */}
        <div className="mt-3 sm:mt-4">
          {/* Section two still needs a heading for the document outline, even
              though the visible label is gone. */}
          <h2 className="sr-only">More projects</h2>
          <Reveal>
            <TechStrip />
          </Reveal>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-12 lg:mt-4">
          <Reveal className="md:col-span-1 md:row-span-2 lg:col-span-4 lg:row-span-2">
            <ReadingCard />
          </Reveal>

          {/* Four cells. The fifth entry rides in the cell index 2 vacated. */}
          {siteConfig.upcomingProjects.slice(0, 4).map((project, i) => {
            // One plate ratio across both widths keeps paired cards the same
            // height. The 5/3 asymmetry only holds from xl; at lg it would
            // squeeze the narrow card to ~230px, too tight for a real name.
            const wide = i === 0 || i === 3;
            // RAGFlow's cover is a 4/1 strip, so its card ends far above the row
            // it shares. Split the cell: card at its own height, then the
            // Databricks project in the tile below it.
            const split = i === 0;
            // That project moved out of this cell, so the music platform takes
            // its place. A straight swap — no block changes size.
            const vacated = i === 2;
            return (
              <Reveal
                key={project.name}
                delay={(i % 2) * 70}
                className={`md:col-span-1 lg:col-span-4 ${
                  wide ? 'xl:col-span-5' : 'xl:col-span-3'
                }`}
              >
                {split ? (
                  <div className="flex h-full flex-col gap-3 sm:gap-4">
                    {/* Wrapper is content-height, so the card's own h-full
                        resolves to auto instead of stretching the row. */}
                    <div>
                      <ProjectCard project={project} ratio="aspect-[16/10]" />
                    </div>
                    {/* Cover takes 3 of 10 columns, name and copy the other 7. */}
                    <ProjectCard
                      project={siteConfig.upcomingProjects[2]}
                      layout="split"
                      splitCols="sm:grid-cols-[3fr_7fr]"
                      showTags={false}
                      /* Base padding rather than the lg:p-8 the taller cards
                         take — at this height p-8 pushed the tile past the
                         space the placeholder occupied. */
                      className="min-h-[140px] flex-1 !p-5"
                    />
                  </div>
                ) : vacated ? (
                  <div className="flex h-full flex-col gap-3 sm:gap-4">
                    {/* Wrapper is content-height, so the card ends under its
                        tags instead of stretching to the row. */}
                    <div>
                      <ProjectCard project={siteConfig.upcomingProjects[4]} />
                    </div>
                    {/* No floor from lg up: the reading card spans both rows,
                        so the two share its height — any minimum here drags
                        space out of the row above. Below lg the rows are
                        independent and the floor just keeps the box visible. */}
                    <div className="min-h-[120px] flex-1 rounded-3xl bg-surface lg:min-h-0" />
                  </div>
                ) : (
                  <ProjectCard project={project} ratio="aspect-[16/10]" />
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
