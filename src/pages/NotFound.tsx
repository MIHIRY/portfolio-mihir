import { Link } from 'react-router-dom';
import { siteConfig } from '../config';
import { useDocumentMeta } from '../useDocumentMeta';

export default function NotFound() {
  useDocumentMeta(siteConfig.pageMeta.notFound);

  return (
    <section className="flex min-h-[70vh] items-center px-8 py-24 sm:px-12 md:px-16 lg:px-24">
      <div className="mx-auto w-full max-w-3xl">
        <p
          className="font-mono text-sm font-bold tracking-[0.16em]"
          style={{ color: siteConfig.accentColor }}
        >
          404
        </p>
        <h1 className="mt-4 text-3xl font-black text-black sm:text-4xl md:text-5xl">
          This page doesn’t exist.
        </h1>
        <p className="mt-4 max-w-xl text-base text-gray-600 sm:text-lg">
          The link may be out of date, or the address mistyped. Everything else is still
          where you left it.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            viewTransition
            to="/"
            className="rounded-lg px-6 py-3 text-sm font-bold text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ backgroundColor: siteConfig.accentColor }}
          >
            Back to home
          </Link>
          <Link
            viewTransition
            to="/projects"
            className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-bold text-gray-900 transition-colors duration-200 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
          >
            View projects
          </Link>
        </div>
      </div>
    </section>
  );
}
