import { useEffect, type ReactNode } from 'react';
import { createBrowserRouter, Navigate, Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import NotFound from './pages/NotFound';

/** Scrolls to the hash target on navigation, or to the top on a plain route change. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
      });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

/** The one-page site's chrome. The projects page carries its own header instead. */
function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function Root() {
  return (
    <>
      <ScrollManager />
      <Outlet />
    </>
  );
}

/**
 * A data router, not <BrowserRouter>. React Router only honours a Link's
 * `viewTransition` prop when `router.window` is set, which only the data router
 * does — with the declarative router the prop is silently ignored.
 */
export const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      // The work is the landing page; the résumé sits a click behind it.
      { path: '/', element: <ProjectsPage /> },
      {
        path: '/about',
        element: (
          <SiteLayout>
            <Home />
          </SiteLayout>
        ),
      },
      { path: '/skills', element: <SkillsPage /> },
      // /projects was the public url for the work for a while. Anyone holding
      // that link still lands on it rather than on the 404.
      { path: '/projects', element: <Navigate to="/" replace /> },
      {
        // Was rendering Home, so a mistyped url silently looked valid.
        path: '*',
        element: (
          <SiteLayout>
            <NotFound />
          </SiteLayout>
        ),
      },
    ],
  },
]);
