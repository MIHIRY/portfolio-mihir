import { siteConfig } from '../config';

export default function Projects() {
  if (siteConfig.projects.length === 0) return null;

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-24 lg:py-32 px-8 sm:px-12 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Centered header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-black">
            Projects
          </h2>
          <div
            className="w-12 h-1 mt-4 mx-auto"
            style={{ backgroundColor: siteConfig.accentColor }}
          />
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {siteConfig.projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col p-8 rounded-lg bg-gray-50 hover:bg-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group min-h-[220px]"
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
                <div className="ml-4 flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto pt-4">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
