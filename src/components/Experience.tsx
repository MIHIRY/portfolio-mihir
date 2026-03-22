import { siteConfig } from '../config';

export default function Experience() {
  if (siteConfig.experience.length === 0) return null;

  return (
    <section id="experience" className="py-16 sm:py-20 md:py-24 lg:py-32 px-8 sm:px-12 md:px-16 lg:px-24 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Section header — centered, distinct from 2-col sections */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: siteConfig.accentColor }}>
              <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black">
              Professional Experience
            </h2>
          </div>
          <div
            className="w-16 h-1 mx-auto"
            style={{ backgroundColor: siteConfig.accentColor }}
          />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gray-200" />

          {siteConfig.experience.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-start mb-12 last:mb-0 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                  <div
                    className="w-3.5 h-3.5 rounded-full border-[3px] border-white shadow-sm"
                    style={{ backgroundColor: siteConfig.accentColor }}
                  />
                </div>

                {/* Date badge — shown on opposite side on desktop */}
                <div className={`hidden md:flex md:w-1/2 ${isLeft ? 'justify-end pr-12' : 'justify-start pl-12'}`}>
                  <span
                    className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-white mt-0.5"
                    style={{ backgroundColor: siteConfig.accentColor }}
                  >
                    {exp.dateRange}
                  </span>
                </div>

                {/* Card */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? 'md:pl-12' : 'md:pr-12'}`}>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    {/* Mobile date */}
                    <span
                      className="inline-block md:hidden px-3 py-1 rounded-full text-xs font-medium text-white mb-3"
                      style={{ backgroundColor: siteConfig.accentColor }}
                    >
                      {exp.dateRange}
                    </span>

                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      {exp.title}
                    </h3>
                    <p className="font-medium mt-1" style={{ color: siteConfig.accentColor }}>
                      {exp.company}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {exp.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="text-gray-600 text-sm flex items-start gap-2">
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: siteConfig.accentColor, opacity: 0.5 }}
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
