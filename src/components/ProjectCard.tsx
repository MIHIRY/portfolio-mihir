import { useState } from 'react';
import type { FeaturedProject } from '../config';

/** Thin north-east arrow, matching the affordance in the reference. */
export function ArrowOut({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

type MediaProps = {
  src: string;
  alt: string;
  /** Tailwind aspect-ratio class, e.g. "aspect-[16/10]". */
  ratio: string;
  /** Full-bleed uses of this plate (the portrait) take the outer card radius. */
  radius?: string;
  /** object-position for the crop, e.g. "object-[32%_25%]" on tall portrait slots. */
  focus?: string;
  /** "object-cover" crops to fill; "object-contain" fits the whole image in. */
  fit?: string;
  className?: string;
};

/**
 * Renders the cover screenshot when one exists, and an empty tinted plate of the
 * same dimensions when it does not — so dropping a real image in later changes
 * nothing about the layout.
 */
export function ProjectMedia({
  src,
  alt,
  ratio,
  radius = 'rounded-2xl',
  focus = 'object-center',
  fit = 'object-cover',
  className = '',
}: MediaProps) {
  // Same guard as Hero.tsx: a missing file falls back to the plate rather than
  // leaving a broken image behind.
  const [failed, setFailed] = useState(false);

  return (
    <div className={`${ratio} ${radius} ${className} relative overflow-hidden bg-plate`}>
      {src && !failed ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full ${fit} ${focus} transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]`}
        />
      ) : (
        <div
          className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
          aria-hidden="true"
        >
          {/* Hairline cross-rule: reads as a plate awaiting artwork. */}
          <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <line x1="0" y1="0" x2="100" y2="100" stroke="#A3C8E4" strokeWidth="0.4" />
            <line x1="100" y1="0" x2="0" y2="100" stroke="#A3C8E4" strokeWidth="0.4" />
          </svg>
        </div>
      )}
    </div>
  );
}

type ProjectCardProps = {
  project: FeaturedProject;
  /**
   * featured — title above the media, as in the reference's lead project card
   * stacked  — media above the title
   * split    — media beside the text, for full-width cards
   */
  layout?: 'featured' | 'stacked' | 'split';
  ratio?: string;
  /** Column split for `layout="split"`. Defaults to even halves. */
  splitCols?: string;
  /** Drop the tag row — for tiles with only the height for a name and copy. */
  showTags?: boolean;
  className?: string;
};

export default function ProjectCard({
  project,
  layout = 'stacked',
  ratio = 'aspect-[16/10]',
  splitCols = 'sm:grid-cols-2',
  showTags = true,
  className = '',
}: ProjectCardProps) {
  const { name, description, link, tags, cover, coverFit, coverRatio, compact, logos } = project;
  const interactive = Boolean(link);
  const alt = cover ? `${name} preview` : '';
  const fit = coverFit === 'contain' ? 'object-contain' : 'object-cover';

  const heading = (
    <div className="flex items-start justify-between gap-4">
      <h3
        className={`font-medium leading-snug text-ink ${
          layout === 'featured' ? 'text-xl lg:text-2xl' : 'text-base lg:text-lg'
        }`}
      >
        {name}
      </h3>
      {interactive && (
        <ArrowOut className="mt-0.5 shrink-0 text-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
    </div>
  );

  const body = (
    <p
      className={`text-[13px] leading-relaxed lg:text-sm ${
        description ? 'text-ink-muted' : 'text-ink-muted/70'
      }`}
    >
      {description || 'Description to follow.'}
    </p>
  );

  // Logos say the same thing as the tags, so a card carrying them drops the
  // text row rather than naming each tool twice.
  // Logos say the same thing as the tags, so a card carrying them drops the
  // text row. A card with no link still shows its own tags when it has them;
  // "Coming soon" is only for one that has nothing to say yet.
  let labels: string[] = [];
  if (showTags && !logos?.length) {
    labels = tags.length > 0 ? tags : interactive ? [] : ['Coming soon'];
  }
  const meta = (extra = '') =>
    labels.length > 0 && (
      <ul className={`flex flex-wrap items-center gap-x-3 gap-y-1 pt-5 ${extra}`}>
        {labels.map((tag) => (
          <li
            key={tag}
            className={`text-[10px] uppercase tracking-[0.14em] lg:text-[11px] ${
              interactive ? 'text-ink-muted' : 'text-ink-muted/70'
            }`}
          >
            {tag}
          </li>
        ))}
      </ul>
    );

  /**
   * Square boxes of one fixed width, so logos of differing proportions still
   * occupy identical footprints. `mt-auto` drops the row onto the card's
   * bottom edge, taking up the slack a short cover leaves behind.
   */
  const logoRow = logos && logos.length > 0 && (
    // Three equal columns still span the full width, so the row keeps its
    // edges with the cover above and the spacing stays identical by
    // construction. The mark sits small and centred inside its column rather
    // than stretching to fill it.
    <ul className="mt-6 grid grid-cols-3 gap-3">
      {logos.map((logo) => (
        <li key={logo.src} className="flex items-center justify-center">
          <ProjectMedia
            src={logo.src}
            alt={logo.name}
            ratio="aspect-square"
            radius="rounded-lg"
            fit="object-contain"
            className="w-10 lg:w-12"
          />
        </li>
      ))}
    </ul>
  );

  let content;
  if (layout === 'split') {
    content = (
      <div className={`grid flex-1 gap-6 lg:gap-8 ${splitCols}`}>
        <ProjectMedia
          src={cover}
          alt={alt}
          ratio="aspect-[16/10] sm:aspect-auto"
          fit={fit}
          className="sm:h-full"
        />
        <div className="flex flex-col">
          {heading}
          <div className="mt-3">{body}</div>
          {meta('mt-auto')}
        </div>
      </div>
    );
  } else if (layout === 'featured') {
    // The media absorbs the slack on tall cards rather than leaving a gap.
    content = (
      <>
        {heading}
        <div className="mt-5 lg:flex lg:min-h-[220px] lg:flex-1 lg:flex-col">
          <ProjectMedia src={cover} alt={alt} ratio="aspect-[4/3] lg:aspect-auto lg:h-full" fit={fit} />
        </div>
        <div className="mt-5">{body}</div>
        {meta()}
      </>
    );
  } else {
    // Text sits on the card's bottom edge, so slack falls between it and the
    // media — the same rhythm the reference uses on its bio and lead cards.
    content = (
      <>
        <ProjectMedia src={cover} alt={alt} ratio={coverRatio ?? ratio} fit={fit} />
        <div className={compact ? 'mt-5' : 'mt-5 lg:mt-auto lg:pt-8'}>
          {heading}
          <div className="mt-3">{body}</div>
          {meta()}
        </div>
        {logoRow}
      </>
    );
  }

  const surface =
    'group flex h-full flex-col rounded-3xl bg-surface p-6 transition-colors duration-300 sm:p-7 lg:p-8';

  if (!interactive) {
    return <div className={`${surface} ${className}`}>{content}</div>;
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${surface} ${className} hover:bg-surface-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-page`}
    >
      {content}
      <span className="sr-only">(opens on GitHub in a new tab)</span>
    </a>
  );
}
