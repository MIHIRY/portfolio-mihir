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
function SkillCard({ group }: { group: SkillGroup }) {
  const withMarks = group.items.filter((item) => item.icon);
  const withoutMarks = group.items.filter((item) => !item.icon);

  return (
    // `break-inside-avoid` keeps a card whole — CSS columns will otherwise split
    // one across a column boundary.
    <section className="mb-3 break-inside-avoid rounded-3xl bg-night-card p-6 sm:mb-4 sm:p-7 lg:p-8">
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

        {/* Native CSS columns give the reference's masonry packing — cards of
            different heights, no gaps, no JS and no layout library. Column count
            steps 1 → 2 → 3 the way the project grid does; the card itself is
            identical at every width. */}
        <Reveal delay={70} className="mt-3 block sm:mt-4">
          <div className="columns-1 gap-3 sm:gap-4 md:columns-2 lg:columns-3">
            {siteConfig.skillGroups.map((group) => (
              <SkillCard key={group.name} group={group} />
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
