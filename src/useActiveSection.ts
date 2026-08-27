import { useEffect, useState } from 'react';

/** Matches the fixed header's `h-16` and the `scroll-margin-top` on `section[id]`. */
const READING_LINE = 64;

/**
 * A hash jump leaves the target's top resting *exactly* on the reading line, because
 * `scroll-margin-top` is the same 4rem. Without a couple of pixels of slack, subpixel
 * rects decide whether /#certifications highlights Certifications or Education.
 */
const TOLERANCE = 2;

/**
 * Reports which of `ids` is the section the reader is currently in, or null when
 * they are above the first one (the hero).
 *
 * The answer is read from live rects rather than from the observer entries: a fling
 * or a smooth-scrolled `/#hash` jump can skip intermediate callbacks, and recomputing
 * on every callback makes the result self-correcting instead of cumulative.
 *
 * The observer's own job is only to say *when* to recompute. The thin band under the
 * header is what makes that precise — it fires exactly when a section boundary crosses
 * the reading line, which is the only moment the answer can change. A full-height root
 * would instead wake us when sections enter and leave the viewport, which is not it.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  // A stable dep — callers build the id list with .filter()/.map() and would
  // otherwise hand us a new array on every render.
  const key = ids.join(',');

  useEffect(() => {
    const sections = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const resolve = () => {
      let current: string | null = null;
      // Sections are in document order, so the last one past the line is the
      // one being read. Nothing past it means the reader is still in the hero.
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= READING_LINE + TOLERANCE) current = section.id;
      }
      setActive(current);
    };

    const observer = new IntersectionObserver(resolve, {
      rootMargin: `-${READING_LINE}px 0px -85% 0px`,
    });
    sections.forEach((section) => observer.observe(section));

    // A direct /#hash load lands mid-page before the first callback arrives.
    resolve();

    // The observer alone very nearly covers this, but a smooth-scrolled hash jump can
    // land its final callback while the page is still moving. One recompute once the
    // scroll comes to rest settles it. This fires once per gesture, not per frame.
    document.addEventListener('scrollend', resolve);

    return () => {
      observer.disconnect();
      document.removeEventListener('scrollend', resolve);
    };
  }, [key]);

  return active;
}
