import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../config';
import { useNavPanel } from '../useNavPanel';

/**
 * The bar carries the page's own surface. /skills runs on the dark set, so the
 * chrome follows it rather than floating a sky-blue bar on near-black. The
 * overlay is already `bg-ink/95` in both tones and needs no variant.
 */
const TONES = {
  light: {
    bar: 'bg-surface',
    text: 'text-ink',
    ring: 'focus-visible:ring-ink focus-visible:ring-offset-surface',
  },
  dark: {
    bar: 'bg-night-card',
    text: 'text-night-ink',
    ring: 'focus-visible:ring-night-ink focus-visible:ring-offset-night-card',
  },
} as const;

export type NavTone = keyof typeof TONES;

const linkClass = (tone: NavTone) =>
  `text-xs uppercase tracking-[0.16em] ${TONES[tone].text} transition-opacity duration-200 hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 ${TONES[tone].ring} focus-visible:ring-offset-4 rounded-sm xl:text-sm`;

const overlayLinkClass =
  'block rounded-sm py-1 text-[30px] leading-tight text-white/85 transition-opacity duration-200 active:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink';

export default function ProjectsNav({ tone = 'light' }: { tone?: NavTone }) {
  const t = TONES[tone];
  // This bar sits on both / and /skills. A fixed entry is wrong on one of them —
  // it either points at the page you are already reading or omits the other one
  // entirely. So the slot always names the page you are *not* on.
  const onSkills = useLocation().pathname === '/skills';
  const cross = onSkills ? { to: '/', label: 'Projects' } : { to: '/skills', label: 'Skills' };
  const [first, ...rest] = siteConfig.name.split(' ');
  const headerRef = useRef<HTMLElement>(null);
  const { open, setOpen, close, triggerRef, panelRef } = useNavPanel(headerRef);

  return (
    <header ref={headerRef} className={`rounded-3xl ${t.bar} px-7 py-6 sm:px-9 lg:px-10 lg:py-9`}>
      {/* Below sm the nav and CTA move into the overlay — inline they cost three
          stacked rows and ate the whole first screen on a phone. From sm the CTA
          takes its own centred row rather than squeezing the wordmark and nav; at
          1440 all three share one row, where 1fr_auto_1fr centres the CTA against
          the bar rather than between two unequal sides. */}
      <div className="flex items-center justify-between gap-5 sm:grid sm:grid-cols-2 sm:items-center sm:gap-x-6 sm:gap-y-5 min-[1440px]:grid-cols-[1fr_auto_1fr]">
        <Link
          viewTransition
          to="/"
          className={`flex items-center gap-3 rounded-sm text-base uppercase tracking-[0.18em] ${t.text} transition-opacity duration-200 hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 ${t.ring} focus-visible:ring-offset-4 sm:col-start-1 sm:row-start-1 sm:text-lg xl:text-xl`}
        >
          <img
            src={siteConfig.avatar}
            alt=""
            width={40}
            height={40}
            decoding="async"
            className="h-9 w-9 shrink-0 rounded-full object-cover sm:h-10 sm:w-10"
          />
          <span>
            <span className="font-light italic">{first}</span>{' '}
            <span className="font-bold">{rest.join(' ')}</span>
          </span>
        </Link>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="projects-menu"
          aria-label="Open navigation"
          className={`-mr-2 rounded-sm p-2 ${t.text} transition-transform duration-200 active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 ${t.ring} focus-visible:ring-offset-2 sm:hidden`}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 8h16" />
            <path d="M4 16h10" />
          </svg>
        </button>

        <a
          href={siteConfig.social.calendar}
          target="_blank"
          rel="noopener noreferrer"
          className={`hidden rounded-sm text-sm font-bold tracking-[0.08em] ${t.text} sm:whitespace-nowrap transition-opacity duration-200 hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 ${t.ring} focus-visible:ring-offset-4 sm:col-span-2 sm:row-start-2 sm:block sm:justify-self-center min-[1440px]:col-span-1 min-[1440px]:col-start-2 min-[1440px]:row-start-1 xl:text-base`}
        >
          [ Schedule a Coffee Chat ]
        </a>

        <nav
          aria-label="Primary"
          className="hidden sm:col-start-2 sm:row-start-1 sm:block sm:justify-self-end min-[1440px]:col-start-3"
        >
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:gap-x-8 min-[1440px]:gap-x-7">
            <li>
              <Link viewTransition to="/about" className={linkClass(tone)}>
                [About]
              </Link>
            </li>
            <li>
              <Link viewTransition to={cross.to} className={linkClass(tone)}>
                [{cross.label}]
              </Link>
            </li>
            <li>
              {/* Route-qualified: this bar also renders on /skills, where a bare
                  #reading would point at nothing. */}
              <Link viewTransition to="/#reading" className={linkClass(tone)}>
                [What I Read]
              </Link>
            </li>
            <li>
              <a href={`mailto:${siteConfig.social.email}`} className={linkClass(tone)}>
                [Contact]
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {open && (
        <div
          id="projects-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className="nav-overlay fixed inset-0 z-50 flex flex-col justify-between bg-ink/95 px-7 pb-8 pt-6 backdrop-blur-sm sm:hidden"
        >
          <div className="flex items-start justify-between">
            <span className="max-w-[10rem] text-[11px] uppercase leading-relaxed tracking-[0.16em] text-white/45">
              Selected work
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close navigation"
              className="-mr-2 -mt-1 rounded-sm p-2 text-white transition-transform duration-200 active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6 18 18" />
                <path d="M18 6 6 18" />
              </svg>
            </button>
          </div>

          <nav aria-label="Sections" className="min-h-0 flex-1 overflow-y-auto py-6">
            <ul className="space-y-1">
              <li>
                <Link viewTransition to="/about" onClick={close} className={overlayLinkClass}>
                  About
                </Link>
              </li>
              <li>
                <Link viewTransition to={cross.to} onClick={close} className={overlayLinkClass}>
                  {cross.label}
                </Link>
              </li>
              <li>
                <Link viewTransition to="/#reading" onClick={close} className={overlayLinkClass}>
                  What I Read
                </Link>
              </li>
              <li>
                <a href={`mailto:${siteConfig.social.email}`} onClick={close} className={overlayLinkClass}>
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div className="border-t border-white/15 pt-6">
            <Link
              viewTransition
              to="/"
              onClick={close}
              className="block rounded-sm text-[30px] font-bold leading-tight text-white transition-opacity duration-200 active:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Home
            </Link>
            <a
              href={siteConfig.social.calendar}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="mt-3 block rounded-sm text-sm font-bold uppercase tracking-[0.14em] text-accent transition-opacity duration-200 active:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              [ Schedule a coffee chat ]
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
