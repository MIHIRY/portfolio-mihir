import { siteConfig } from '../config';
import Reveal from './Reveal';
import { ArrowOut } from './ProjectCard';

export default function Publications() {
  if (siteConfig.publications.length === 0) return null;

  return (
    <section id="publications" className="py-16 sm:py-20 md:py-24 lg:py-32 px-8 sm:px-12 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black">
            Publications
          </h2>
          <div
            className="w-12 h-1 mt-4"
            style={{ backgroundColor: siteConfig.accentColor }}
          />
        </Reveal>
        <Reveal delay={70} className="lg:col-span-8 space-y-6">
          {siteConfig.publications.map((pub, index) => (
            <a
              key={index}
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 rounded-lg border border-gray-100 hover:border-gray-300 hover:-translate-y-1 active:scale-[0.99] transition-[transform,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 group"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <span
                    className="text-sm font-mono"
                    style={{ color: siteConfig.accentColor }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-1">
                    {pub.title}
                  </h3>
                  <p className="text-gray-600 mt-2 text-sm sm:text-base">
                    {pub.venue}
                  </p>
                </div>
                <ArrowOut className="ml-4 mt-0.5 shrink-0 text-gray-900 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
