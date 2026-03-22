import { siteConfig } from '../config';

export default function Publications() {
  if (siteConfig.publications.length === 0) return null;

  return (
    <section id="publications" className="py-16 sm:py-20 md:py-24 lg:py-32 px-8 sm:px-12 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black">
            Publications
          </h2>
          <div
            className="w-12 h-1 mt-4"
            style={{ backgroundColor: siteConfig.accentColor }}
          />
        </div>
        <div className="lg:col-span-8 space-y-6">
          {siteConfig.publications.map((pub, index) => (
            <a
              key={index}
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 rounded-lg border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
