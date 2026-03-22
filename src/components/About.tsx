import { siteConfig } from '../config';

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 lg:py-32 px-8 sm:px-12 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-black">
            About Me
          </h2>
          <div
            className="w-12 h-1 mt-4"
            style={{ backgroundColor: siteConfig.accentColor }}
          />
        </div>
        <div className="lg:col-span-8">
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
            {siteConfig.aboutMe}
          </p>
          <div className="flex flex-wrap gap-2">
            {siteConfig.skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm sm:text-base font-medium hover:bg-gray-200 transition-colors duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
