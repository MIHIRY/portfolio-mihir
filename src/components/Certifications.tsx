import { siteConfig } from '../config';

export default function Certifications() {
  if (siteConfig.certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-16 sm:py-20 md:py-24 lg:py-32 px-8 sm:px-12 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black">
            Certifications
          </h2>
          <div
            className="w-12 h-1 mt-4"
            style={{ backgroundColor: siteConfig.accentColor }}
          />
        </div>
        <div className="lg:col-span-8 space-y-6">
          {siteConfig.certifications.map((cert, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  {cert.title}
                </h3>
                <span className="text-gray-500 text-sm">{cert.date}</span>
              </div>
              <p className="font-medium mb-3" style={{ color: siteConfig.accentColor }}>
                {cert.issuer}
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
