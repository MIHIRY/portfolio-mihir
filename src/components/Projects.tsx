import { Link } from 'react-router-dom';
import { siteConfig } from '../config';
import { ArrowOut } from './ProjectCard';
import Reveal from './Reveal';

export default function Projects() {
  if (siteConfig.projects.length === 0) return null;

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-24 lg:py-32 px-8 sm:px-12 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Centered header */}
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black">
            Projects
          </h2>
          <div
            className="w-12 h-1 mt-4 mx-auto"
            style={{ backgroundColor: siteConfig.accentColor }}
          />
          <p className="mt-6 text-sm text-gray-600 sm:text-base">
            Selected work is written up on the{' '}
            <Link
              viewTransition
              to="/"
              className="rounded-sm font-bold underline underline-offset-4 transition-opacity duration-200 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
              style={{ color: siteConfig.accentColor }}
            >
              projects page
            </Link>
            .
          </p>
        </Reveal>

        {/* 2-column grid. One group for all 14 cards — a per-card stagger would
            leave the last rows waiting on a delay they never see anyway. */}
        <Reveal delay={70} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {siteConfig.projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col p-8 rounded-lg bg-gray-50 hover:bg-gray-100 hover:-translate-y-1 active:scale-[0.99] transition-[transform,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 group min-h-[220px]"
            >
              <div className="flex justify-between items-start flex-1">
                <div className="flex-1 min-w-0">
                  <span
                    className="text-sm font-mono"
                    style={{ color: siteConfig.accentColor }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-1">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 mt-3 text-sm sm:text-base line-clamp-3">
                    {project.description}
                  </p>
                </div>
                <ArrowOut className="ml-4 mt-0.5 shrink-0 text-gray-900" />
              </div>
              <div className="flex flex-wrap gap-2 mt-auto pt-4">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium"
                    style={{ color: siteConfig.accentColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
