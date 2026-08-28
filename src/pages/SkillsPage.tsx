import { useEffect } from 'react';
import { siteConfig, type SkillGroup } from '../config';
import ProjectsNav from '../components/ProjectsNav';
import { ProjectMedia } from '../components/ProjectCard';
import Reveal from '../components/Reveal';
import { useDocumentMeta } from '../useDocumentMeta';

/**
 * One skill group.
 *
 * Items that have a mark render as logo tiles; the rest render as text pills
 * underneath them. Splitting the two into their own rows keeps the mix reading
 * as a deliberate order — marks first, then the things that have none — rather
 * than as tiles and labels jumbled together in one line. A group with a full
 * set of icons is therefore all tiles, and one with none is all pills, without
 * either being a special case.
 */
function SkillCard({ group, span = '' }: { group: SkillGroup; span?: string }) {
  const withMarks = group.items.filter((item) => item.icon);
  const withoutMarks = group.items.filter((item) => !item.icon);

  return (
    // `h-full` is what levels the row: a grid item stretches to the tallest card
    // beside it, so every row closes on one line.
    <section className={`h-full rounded-3xl bg-night-card p-6 sm:p-7 lg:p-8 ${span}`}>
      {withMarks.length > 0 && (
        <ul className="flex flex-wrap items-center gap-3">
          {withMarks.map((item) => (
            <li key={item.label}>
              <ProjectMedia
                src={item.icon!}
                alt={item.label}
                ratio="aspect-square"
                radius="rounded-lg"
                fit="object-contain"
                plate="bg-night-pill"
                className="w-10 lg:w-12"
              />
            </li>
          ))}
        </ul>
      )}

      {withoutMarks.length > 0 && (
        <ul className={`flex flex-wrap gap-2 ${withMarks.length > 0 ? 'mt-3' : ''}`}>
          {withoutMarks.map((item) => (
            <li
              key={item.label}
              className="rounded-full bg-night-pill px-3 py-1.5 text-[11px] leading-snug text-night-pill-ink lg:text-xs"
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}

      <h2 className="mt-6 text-base font-medium leading-snug text-night-ink lg:text-lg">{group.name}</h2>
      <p className="mt-2 text-[13px] leading-relaxed text-night-muted lg:text-sm">{group.blurb}</p>
    </section>
  );
}

export default function SkillsPage() {
  useDocumentMeta(siteConfig.pageMeta.skills);

  // Same as the landing page: the tint has to reach the overscroll area too.
  useEffect(() => {
    const previous = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#0D0D0D';
    return () => {
      document.body.style.backgroundColor = previous;
    };
  }, []);

  return (
    <div className="min-h-screen bg-night p-3 sm:p-4 lg:p-5">
      <div className="mx-auto max-w-[1500px]">
        <ProjectsNav tone="dark" />

        <Reveal className="mt-3 block lg:mt-4">
          <section className="flex min-h-[280px] items-center justify-center rounded-3xl bg-night-card px-7 py-16 sm:min-h-[360px] sm:px-9 lg:min-h-[420px] lg:px-10">
            <h1 className="max-w-3xl text-center text-[34px] leading-[1.1] text-night-ink sm:text-5xl lg:text-6xl xl:text-7xl">
              <span className="font-bold">Skills that fuel</span>{' '}
              <span className="font-light italic">my work</span>
            </h1>
          </section>
        </Reveal>

        {/* A grid, not CSS columns. Columns packed tighter but each one stopped
            wherever its own contents ran out — a 176px ragged edge across the
            three. Here every card in a row shares the row's height, so the rows
            close on one line. 13 cards leaves the last row short, so that card
            spans the full width and the block ends flush. */}
        <Reveal delay={70} className="mt-3 block sm:mt-4">
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
            {siteConfig.skillGroups.map((group, i) => (
              <SkillCard
                key={group.name}
                group={group}
                span={
                  i === siteConfig.skillGroups.length - 1
                    ? 'md:col-span-2 lg:col-span-3'
                    : ''
                }
              />
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
