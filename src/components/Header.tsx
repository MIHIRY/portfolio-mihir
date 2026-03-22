import { useState, useEffect } from 'react';
import { siteConfig } from '../config';

const navSections = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'publications', label: 'Publications' },
  { id: 'blogs', label: 'Blogs' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-sm' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-12 md:px-16 lg:px-24 flex items-center justify-between h-16">
        <a href="#" className="text-gray-900 font-bold text-lg">
          {siteConfig.name.split(' ')[0]}
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {visibleSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="text-black text-sm font-bold"
            >
              {section.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
