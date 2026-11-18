"use client";

import type { ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/logo';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About', children: [
    { href: '/about', label: 'Who We Are' },
    { href: '/about/qhse', label: 'QHSE Policy' },
  ] },
  { href: '/contact', label: 'Contact' },
];

export function Navigation(): ReactElement {
  const BLACK_THRESHOLD = 50; // solid after scrolling past top
  const HIDE_THRESHOLD = 900; // ~5 scroll actions: slide header out

  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const pathname = usePathname();
  const isProductDetail = Boolean(pathname && pathname.startsWith('/products/') && pathname !== '/products');
  const isActivePath = (href: string): boolean =>
    href === '/' ? pathname === '/' : pathname === href || Boolean(pathname?.startsWith(`${href}/`));
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollingDown = currentScrollY > lastScrollY.current;

        // Transparent at the very top (always solid on product detail pages)
        setSolid(currentScrollY >= BLACK_THRESHOLD || isProductDetail);

        if (currentScrollY < lastScrollY.current) {
          // Instant reappearance on any upward scroll
          setHidden(false);
        } else if (currentScrollY >= HIDE_THRESHOLD && scrollingDown) {
          // Disappear after ~6-7 scrolls down
          setHidden(true);
        }

        // Always show at the very top
        if (currentScrollY === 0) {
          setHidden(false);
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check on mount so a page loaded mid-scroll is solid
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const headerSolid = solid || isProductDetail;

  return (
    <>
      <header
        className={`header-sticky fixed top-0 left-0 right-0 z-[1000] overflow-visible outline-none ring-0 ${
          headerSolid
            ? '!bg-black/90 !backdrop-blur-md'
            : '!bg-transparent !backdrop-blur-none'
        }`}
        style={{
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          transition:
            'transform 0.8s ease, background-color 0.3s ease, backdrop-filter 0.3s ease',
          zIndex: 1000,
          boxShadow: 'none',
          border: 'none',
          borderBottom: 'none',
          outline: 'none',
          backgroundColor: headerSolid ? 'rgba(0,0,0,0.9)' : 'transparent',
          backdropFilter: headerSolid ? 'blur(8px)' : 'none',
          WebkitBackdropFilter: headerSolid ? 'blur(8px)' : 'none',
          willChange: 'transform',
        }}
      >
        {/* Accent stripe removed for seamless header */}

        <nav className="container-tight flex items-center justify-between gap-6 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center transition-transform duration-300 hover:scale-[1.03]"
          >
            <Logo size="lg" variant="light" />
          </Link>

          {/* Right side: nav links + mobile toggle */}
          <div className="flex items-center gap-6">
            <ul className="hidden items-center gap-6 md:flex">
              {navLinks.map((link) => (
                <li key={link.href} className={link.children ? 'group relative' : ''}>
                  {link.children ? (
                    <>
                      <span
                        className={`nav-link-premium relative inline-flex items-center gap-1 px-5 py-2.5 font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 ${
                          isActivePath(link.href)
                            ? '!text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]'
                            : headerSolid
                              ? 'text-insulation/80 hover:text-insulation'
                              : 'text-white/90 hover:text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]'
                        }`}
                      >
                        {link.label}
                        {isActivePath(link.href) && (
                          <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-[#C46A3A]" />
                        )}
                        {link.children && (
                          <svg
                            className="inline-block h-3 w-3 align-middle transition-transform duration-200 group-hover:rotate-180"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </span>
                      <div className="invisible absolute left-0 top-full z-50 mt-2 flex min-w-[200px] flex-col space-y-1 rounded-md bg-steel py-3 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 font-heading text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-insulation/80 transition-colors hover:bg-insulation/10 hover:text-insulation"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={`nav-link-premium relative block px-5 py-2.5 font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 ${
                        isActivePath(link.href)
                          ? '!text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]'
                          : headerSolid
                            ? 'text-insulation/80 hover:text-insulation'
                            : 'text-white/90 hover:text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]'
                      }`}
                    >
                      {link.label}
                      {isActivePath(link.href) && (
                        <span aria-hidden="true" className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#C46A3A] align-middle" />
                      )}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="rounded bg-copper px-5 py-2.5 font-heading text-xs font-bold uppercase tracking-wider text-insulation transition-all duration-200 hover:bg-copper-dark hover:shadow-[0_4px_12px_-2px_rgba(196,106,58,0.4)]"
                >
                  Request Quote
                </Link>
              </li>
            </ul>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-all duration-200 hover:border-copper hover:text-copper md:hidden"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform duration-300 ${mobileOpen ? 'rotate-90' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-steel/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-steel shadow-2xl">
            <div className="flex items-center justify-between border-b border-insulation/10 p-5">
              <Logo size="md" variant="light" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded text-insulation/50 transition hover:text-insulation"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="p-5">
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <div className="flex items-center">
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex-1 block rounded px-4 py-3 font-heading text-sm font-semibold uppercase tracking-wide transition-colors ${
                          isActivePath(link.href)
                            ? 'bg-copper/15 text-white'
                            : 'text-insulation/70 hover:bg-insulation/10 hover:text-insulation'
                        }`}
                      >
                        {link.label}
                        {isActivePath(link.href) && (
                          <span aria-hidden="true" className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-[#C46A3A] align-middle" />
                        )}
                      </Link>
                      {link.children && (
                        <button
                          type="button"
                          onClick={() => setMobileAboutOpen((v) => !v)}
                          aria-expanded={mobileAboutOpen}
                          aria-label="Toggle About sub-menu"
                          className="flex h-12 w-12 items-center justify-center rounded text-insulation/50 transition hover:text-insulation"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                    </div>
                    {link.children && mobileAboutOpen && (
                      <ul className="ml-4 space-y-1">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block rounded px-4 py-2 font-heading text-xs font-semibold uppercase tracking-wide text-insulation/50 transition-colors hover:bg-insulation/10 hover:text-insulation"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-insulation/10 pt-6">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="btn-accent w-full justify-center"
                >
                  Request Quote
                </Link>
                </div>
              </nav>
            </div>
          </div>
      )}
    </>
  );
}
