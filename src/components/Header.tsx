import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config';
import { useNavPanel } from '../useNavPanel';
import { useActiveSection } from '../useActiveSection';

const navSections = [
  { id: 'about', label: 'About', to: '/about#about' },
  { id: 'projects', label: 'Projects', to: '/' },
  { id: 'skills', label: 'Skills', to: '/skills' },
  { id: 'experience', label: 'Experience', to: '/about#experience' },
  { id: 'education', label: 'Education', to: '/about#education' },
  { id: 'certifications', label: 'Certifications', to: '/about#certifications' },
  { id: 'publications', label: 'Publications', to: '/about#publications' },
  { id: 'blogs', label: 'Blogs', to: '/about#blogs' },
];

const focusRing =
  'rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const { open, setOpen, close, triggerRef, panelRef } = useNavPanel(headerRef);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const visibleSections = navSections.filter((section) => {
    if (section.id === 'experience' && siteConfig.experience.length === 0) return false;
    if (section.id === 'education' && siteConfig.education.length === 0) return false;
    if (section.id === 'projects' && siteConfig.projects.length === 0) return false;
    if (section.id === 'certifications' && siteConfig.certifications.length === 0) return false;
    if (section.id === 'publications' && siteConfig.publications.length === 0) return false;
    if (section.id === 'blogs' && siteConfig.blogs.length === 0) return false;
    return true;
  });

  // On-page anchors fill the list; /projects is promoted to an action at the base.
  const anchors = visibleSections.filter(
    (section) => section.id !== 'projects' && section.id !== 'skills',
  );
  const hasProjectsPage = visibleSections.some((section) => section.id === 'projects');

  const currentSection = useActiveSection(visibleSections.map((section) => section.id));
  // The homepage has a #projects section, but the nav's Projects link goes to a
  // separate route. Lighting it up would point at a page the reader is not on, so
  // the rule hides for the length of that section instead.
  const activeId =
    currentSection === 'projects' || currentSection === 'skills' ? null : currentSection;

  // Where the rule sits. Held at its last position while hidden so it never
  // animates in from the left; `move` is false whenever it was invisible before.
  const [rule, setRule] = useState<{ x: number; w: number; move: boolean } | null>(null);
  const wasVisible = useRef(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const measure = () => {
      const link = activeId
        ? nav.querySelector<HTMLElement>(`[data-nav="${activeId}"]`)
        : null;
      if (link) setRule({ x: link.offsetLeft, w: link.offsetWidth, move: wasVisible.current });
      wasVisible.current = link !== null;
    };

    measure();
    // Catches viewport changes and the reflow when the webfont swaps in.
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(nav);
    return () => resizeObserver.disconnect();
  }, [activeId]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled && !open ? 'bg-white/90 backdrop-blur-sm' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-12 md:px-16 lg:px-24 flex items-center justify-between h-16">
        <Link viewTransition to="/about" className={`flex items-center gap-3 text-gray-900 font-bold text-lg ${focusRing}`}>
          <img
            src={siteConfig.avatar}
            alt=""
            width={36}
            height={36}
            decoding="async"
            className="h-9 w-9 rounded-full object-cover"
          />
          {siteConfig.name.split(' ')[0]}
        </Link>

        <nav className="hidden md:flex relative items-center gap-8" aria-label="Primary" ref={navRef}>
          {visibleSections.map((section) => (
            <Link
              key={section.id}
              viewTransition
              to={section.to}
              data-nav={section.id}
              aria-current={activeId === section.id ? 'location' : undefined}
              className={`text-black text-sm font-bold transition-opacity duration-200 hover:opacity-60 ${focusRing}`}
            >
              {section.label}
            </Link>
          ))}

          {/* Decorative — `aria-current` on the link above is what carries the
              state to assistive tech. */}
          <span
            aria-hidden="true"
            data-move={rule?.move ? 'true' : 'false'}
            className="nav-rule pointer-events-none absolute -bottom-2 left-0 h-0.5 w-px origin-left bg-[var(--accent-color)]"
            style={{
              transform: `translateX(${rule?.x ?? 0}px) scaleX(${rule?.w ?? 0})`,
              opacity: activeId && rule ? 1 : 0,
            }}
          />
        </nav>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label="Open navigation"
          className={`md:hidden -mr-2 p-2 text-gray-900 transition-transform duration-200 active:scale-[0.94] ${focusRing}`}
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
      </div>

      {open && (
        <div
          id="site-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className="nav-overlay md:hidden fixed inset-0 z-50 flex flex-col justify-between bg-ink/95 px-7 pb-8 pt-6 backdrop-blur-sm"
        >
          <div className="flex items-start justify-between">
            <span className="max-w-[10rem] text-[11px] uppercase leading-relaxed tracking-[0.16em] text-white/45">
              {siteConfig.title}
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
              {anchors.map((section) => (
                <li key={section.id}>
                  <Link
                    viewTransition
                    to={section.to}
                    onClick={close}
                    className="block rounded-sm py-1 text-[30px] leading-tight text-white/85 transition-opacity duration-200 active:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    {section.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-white/15 pt-6">
            {hasProjectsPage && (
              <Link
                viewTransition
                to="/"
                onClick={close}
                className="block rounded-sm text-[30px] font-bold leading-tight text-white transition-opacity duration-200 active:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Projects page <span aria-hidden="true">↗</span>
              </Link>
            )}
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
