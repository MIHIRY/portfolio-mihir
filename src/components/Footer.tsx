import { Link } from 'react-router-dom';
import { siteConfig } from '../config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navSections = [
    { id: 'about', label: 'About', to: '/about#about', show: true },
    { id: 'projects', label: 'Projects', to: '/', show: siteConfig.projects.length > 0 },
    { id: 'skills', label: 'Skills', to: '/skills', show: true },
    { id: 'experience', label: 'Experience', to: '/about#experience', show: siteConfig.experience.length > 0 },
    { id: 'education', label: 'Education', to: '/about#education', show: siteConfig.education.length > 0 },
    { id: 'certifications', label: 'Certifications', to: '/about#certifications', show: siteConfig.certifications.length > 0 },
    { id: 'publications', label: 'Publications', to: '/about#publications', show: siteConfig.publications.length > 0 },
    { id: 'blogs', label: 'Blogs', to: '/about#blogs', show: siteConfig.blogs.length > 0 },
  ].filter((s) => s.show);

  return (
    <footer className="bg-ink px-8 sm:px-12 md:px-16 lg:px-24 py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {siteConfig.name}
          </h3>
          <p className="text-gray-400 mt-1">{siteConfig.title}</p>
          <div className="flex items-center gap-4 mt-4">
            {siteConfig.social.email && (
              <a
                href={`mailto:${siteConfig.social.email}`}
                className="-m-2 rounded-sm p-2 text-gray-400 hover:text-[var(--accent-color)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                aria-label="Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            )}
            {siteConfig.social.linkedin && (
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="-m-2 rounded-sm p-2 text-gray-400 hover:text-[var(--accent-color)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            )}
            {siteConfig.social.github && (
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="-m-2 rounded-sm p-2 text-gray-400 hover:text-[var(--accent-color)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
            )}
          </div>
        </div>
        <nav>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3 md:block md:space-y-2">
            {navSections.map((section) => (
              <li key={section.id}>
                <Link
                  viewTransition
                  to={section.to}
                  className="rounded-sm text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  {section.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/15">
        <p className="text-gray-500 text-sm">
          &copy; {currentYear} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
