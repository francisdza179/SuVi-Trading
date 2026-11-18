'use client';

import type { ReactElement } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import type { Product } from '@/lib/products';
import { allProducts, categories, getProductSlug, getProductImage } from '@/lib/products';
import { createPortal } from 'react-dom';
import {
  faqItemDelay,
  faqItemHidden,
  faqRevealHidden,
  faqRevealShown,
  faqRevealTransition,
  useFaqReveal,
} from './faq-reveal';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function ProductGrid(): ReactElement {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const [visible, setVisible] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const faqContainerRef = useRef<HTMLDivElement>(null);
  const { ref: faqHeadingRef, inView: faqInView } = useFaqReveal();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!categoryParam) return;
    const el = sectionRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Measure the section's document offset (offsetTop chain), which is
    // unaffected by the reveal transform, so the landing position is stable.
    const targetTop = (): number => {
      let top = 0;
      let node: HTMLElement | null = el;
      while (node) {
        top += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      return Math.max(top - 96, 0);
    };

    const scrollToCatalog = (): void => {
      window.scrollTo({ top: targetTop(), behavior: reduceMotion ? 'instant' : 'smooth' });
    };

    // The first pass runs right after mount; later passes correct the
    // position if Next.js' router scroll-restoration resets it afterwards.
    const timers = [180, 750, 1400].map((delay, index) =>
      window.setTimeout(() => {
        if (index === 0 || window.scrollY < 40) {
          scrollToCatalog();
        }
      }, delay)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [categoryParam]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (faqContainerRef.current && !faqContainerRef.current.contains(event.target as Node)) {
        setOpenFaqIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!quickViewProduct) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setQuickViewProduct(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [quickViewProduct]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const param = searchParams.get('category');
    if (!param) return [];
    const match = categories.find((c) => slugify(c.name) === param);
    return match ? [match.name] : [];
  });
  const router = useRouter();
  const currentPage = Math.max(1, Number(searchParams.get('page') || '1'));
  const setPage = (n: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (n <= 1) params.delete('page');
    else params.set('page', String(n));
    router.replace(`/products?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const param = searchParams.get('category');
    if (!param) {
      setSelectedCategories([]);
      return;
    }
    const match = categories.find((c) => slugify(c.name) === param);
    setSelectedCategories(match ? [match.name] : []);
  }, [searchParams]);

  const toggleCategory = (name: string) => {
    setSelectedCategories((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
    setPage(1);
  };

  const selectAll = () => {
    setSelectedCategories([]);
    setPage(1);
  };

  const filtered = useMemo(() => {
    const base =
      selectedCategories.length === 0
        ? allProducts
        : allProducts.filter((p) => selectedCategories.includes(p.category));
    const q = searchQuery.trim().toLowerCase();
    const searched = q
      ? base.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.sku.toLowerCase().includes(q)
        )
      : base;
    return [...searched].sort((a, b) => a.name.localeCompare(b.name));
  }, [selectedCategories, searchQuery]);

  const pageSize = 12;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const getPageNumbers = (current: number, total: number, mobile: boolean): (number | '...')[] => {
    if (!mobile || total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const set = new Set<number>([1, total, current, current - 1, current + 1]);
    const sorted = [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
    const result: (number | '...')[] = [];
    let prev = 0;
    for (const p of sorted) {
      if (p - prev > 1) result.push('...');
      result.push(p);
      prev = p;
    }
    if (total - prev > 1) result.push('...');
    return result;
  };

  const quickViewSpecs = quickViewProduct
    ? quickViewProduct.spec
        .split(' - ')
        .filter((part) => part.includes(':') && !/^\s*application:/i.test(part))
        .map((part) => {
          const separator = part.indexOf(':');
          return {
            key: part.slice(0, separator).trim(),
            value: part.slice(separator + 1).trim(),
          };
        })
    : [];

  return (
    <section id="product-catalog" ref={sectionRef} className={`bg-slate-50/50 py-12 lg:py-16 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ scrollMarginTop: '96px' }}>
      <div className="container-tight">
        <div className="mb-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="w-full whitespace-normal">
              <h1 className="font-heading text-[48px] font-bold leading-tight tracking-tight text-gray-900 md:text-[48px]" style={{ color: '#0B132B', fontSize: '48px' }}>
                Product Catalog
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Browse our range of industrial HVAC and MEP products sourced from trusted manufacturers. Request a quote for the specification you need.
              </p>
            </div>
            <div className="relative w-full md:w-72 self-end">
              <svg
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search..."
                className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 shadow-sm outline-none transition placeholder-gray-400 focus:border-[#C46A3A] focus:ring-2 focus:ring-[#C46A3A]/20"
              />
            </div>
          </div>
          <div className={`mt-6 flex flex-wrap gap-2 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
            <button
              onClick={selectAll}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                selectedCategories.length === 0
                  ? 'border-[#C46A3A] bg-[#C46A3A] text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-[#C46A3A]'
              }`}
            >
              All ({allProducts.length})
            </button>
            {categories.map((c) => {
              const count = allProducts.filter((p) => p.category === c.name).length;
              return (
              <button
                key={c.name}
                onClick={() => toggleCategory(c.name)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                  selectedCategories.includes(c.name)
                    ? 'border-[#C46A3A] bg-[#C46A3A] text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-[#C46A3A]'
                }`}
              >
                {c.name} ({count})
              </button>
              );
            })}
            {selectedCategories.length > 0 && (
              <button onClick={selectAll} className="px-2 py-1.5 text-xs font-semibold text-[#C46A3A] underline transition hover:text-[#C46A3A]/80">
                Clear
              </button>
            )}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg font-semibold text-gray-700">No products found</p>
            <p className="mt-2 text-sm text-gray-500">Try a different search term or clear filters.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                selectAll();
              }}
              className="mt-4 text-sm font-semibold text-[#C46A3A] underline"
            >
              Clear search
            </button>
          </div>
        )}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {paginated.map((product, index) => (
            <div
              key={product.sku}
              className={`relative block overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-700 ease-out hover:shadow-lg ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: visible ? `${index * 100}ms` : '0ms' }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setQuickViewProduct(product);
                }}
                className="absolute right-2 top-2 z-10 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-[#0B132B] shadow transition hover:bg-white sm:right-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs"
              >
                Quick View
              </button>
              <Link href={`/products/${getProductSlug(product)}`} className="block">
                {getProductImage(product) ? (
                  <div className="relative h-40 w-full overflow-hidden bg-concrete sm:h-80">
                    <img
                      src={getProductImage(product)}
                      alt={product.name}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="relative h-40 w-full overflow-hidden bg-gray-200 sm:h-80">
                    <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                      No image
                    </div>
                  </div>
                )}
                <div className="border-t border-gray-200 p-3 sm:p-4">
                  <h3 className="font-heading font-bold text-steel text-center leading-snug" style={{ fontSize: '12px' }}>
                    {product.name}
                  </h3>
                  <p className="mt-1 text-center text-[10px] text-gray-500 sm:text-xs">View details →</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-6 px-2 py-4">
          <div>
            <h3 className="font-heading text-xl font-bold" style={{ color: '#0B132B' }}>Need help finding a specific product?</h3>
            <p className="mt-2 text-sm text-gray-600">Our team can assist with sourcing, availability, and equivalent product recommendations.</p>
          </div>
          <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-[#C46A3A] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#C46A3A]/90">
            Contact Us
          </Link>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm">
          <button
            onClick={() => {
              setPage(Math.max(1, currentPage - 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={currentPage === 1}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-600 ${
              currentPage === 1 ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
            }`}
          >
            {'<'}
          </button>
          {getPageNumbers(currentPage, totalPages, isMobile).map((n, idx) =>
            n === '...' ? (
              <span
                key={`ellipsis-${idx}`}
                className="inline-flex min-w-[2.5rem] items-center justify-center px-2 py-2 text-gray-400"
              >
                …
              </span>
            ) : (
              <button
                key={n}
                onClick={() => {
                  setPage(n as number);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`inline-flex min-w-[2.5rem] items-center justify-center rounded-lg border px-3 py-2 text-center ${n === currentPage ? 'border-[#C46A3A] bg-[#C46A3A] text-white' : 'border-gray-200 bg-white text-gray-600'}`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {n}
              </button>
            )
          )}
          <button
            onClick={() => {
              setPage(Math.min(totalPages, currentPage + 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={currentPage === totalPages}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-600 ${
              currentPage === totalPages ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
            }`}
          >
            Next -&gt;
          </button>
        </div>

        {quickViewProduct &&
          createPortal(
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
              onClick={() => setQuickViewProduct(null)}
            >
              <div
                className="relative mx-auto grid w-full max-w-4xl grid-cols-1 items-center gap-6 rounded-xl bg-white p-6 shadow-2xl md:grid-cols-2"
                style={{ width: '100%', maxWidth: '900px' }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setQuickViewProduct(null)}
                  className="absolute right-4 top-4 text-gray-500 transition hover:text-gray-900"
                  aria-label="Close"
                >
                  ✕
                </button>
                <div className="relative h-80 w-full overflow-hidden rounded-xl bg-white md:h-[420px]">
                  {getProductImage(quickViewProduct) ? (
                    <img
                      src={getProductImage(quickViewProduct)}
                      alt={quickViewProduct.name}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                      No image
                    </div>
                  )}
                </div>
                <div className="whitespace-normal">
                  <h2 className="mt-2 font-heading text-[44px] font-bold leading-tight text-[#0B132B]" style={{ fontSize: '44px' }}>
                    {quickViewProduct.name}
                  </h2>
                  <dl className="mt-3 space-y-0.5 text-sm leading-5 text-gray-600">
                    <div className="flex gap-2">
                      <dt className="shrink-0 font-bold text-gray-900">Category:</dt>
                      <dd className="min-w-0 truncate" title={quickViewProduct.category}>{quickViewProduct.category}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="shrink-0 font-bold text-gray-900">Application:</dt>
                      <dd className="min-w-0 truncate" title={quickViewProduct.spec.match(/Application:\s*([^-]+)/i)?.[1]?.trim() || 'Commercial & industrial MEP applications'}>
                        {quickViewProduct.spec.match(/Application:\s*([^-]+)/i)?.[1]?.trim() ||
                          'Commercial & industrial MEP applications'}
                      </dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="shrink-0 font-bold text-gray-900">SKU:</dt>
                      <dd className="min-w-0 truncate">{quickViewProduct.sku}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="shrink-0 font-bold text-gray-900">Availability:</dt>
                      <dd className="min-w-0 truncate">In stock — ready for UAE dispatch</dd>
                    </div>
                    {quickViewSpecs.map((spec) => (
                      <div key={spec.key} className="flex gap-2" title={`${spec.key}: ${spec.value}`}>
                        <dt className="shrink-0 font-bold text-gray-900">{spec.key}:</dt>
                        <dd className="min-w-0 truncate">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-6">
                    <Link
                      href={`/products/${getProductSlug(quickViewProduct)}`}
                      className="inline-flex items-center justify-center rounded-full bg-[#C46A3A] px-6 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#C46A3A]/90"
                      onClick={() => setQuickViewProduct(null)}
                    >
                      View Full Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )}

        <p className="mt-6 text-center text-sm text-gray-500">
          Bulk RFQ available for 10+ units | Request custom quote for large orders
        </p>
        <p className="mt-4 text-center text-xs text-gray-500">
          * Note: Brands and product specifications listed above are indicative. The same products can also be procured from alternative manufacturers and brands based on availability and project requirements.
        </p>

        <div className={`mt-16 w-full max-w-4xl mx-auto px-4 md:px-8 py-12 ${faqRevealTransition} ${
          faqInView ? faqRevealShown : faqRevealHidden
        }`}>
          <div ref={faqHeadingRef} className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-gray-900 md:text-4xl" style={{ color: '#0B132B' }}>
              Product Sourcing FAQs
            </h2>
          </div>

          <div ref={faqContainerRef} className="w-full space-y-4">
            {(showAllFaqs ? [
              { q: "Can't find the exact product listed?", a: 'SuVi Trading works with multiple manufacturers and suppliers across the UAE and GCC. We can help identify alternative products, equivalent specifications, and suitable replacements based on project requirements, availability, and budget considerations.' },
              { q: 'Can you source products that are not shown in the catalog?', a: 'Yes. The products displayed on this website represent only a portion of our available offering. We can assist with sourcing additional pumps, valves, insulation materials, piping products, HVAC accessories, refrigeration components, and MEP consumables upon request.' },
              { q: 'Do you offer alternative brands?', a: 'Absolutely. If a preferred brand is unavailable or does not align with project budgets, our team can recommend suitable alternatives with comparable specifications, quality standards, and performance requirements.' },
              { q: 'Can you support bulk project requirements?', a: 'Yes. We regularly assist contractors, consultants, facility managers, and procurement teams with project-scale requirements, including bulk quantities, phased deliveries, and recurring supply needs.' },
              { q: 'Do you provide technical specifications and product documentation?', a: 'Yes. Technical datasheets, product specifications, and supporting documentation can be provided upon request to help customers evaluate product suitability and compliance with project requirements.' },
              { q: 'Can your team help us select the right product?', a: 'Yes. Our team can assist in identifying suitable products based on application requirements, operating conditions, project specifications, and budget considerations, helping simplify the procurement process.' },
              { q: 'How quickly can I receive a quotation?', a: 'Quotation turnaround times depend on product type, quantity, and sourcing requirements. For most standard inquiries, our team aims to respond as quickly as possible with pricing, availability, and lead-time information.' },
              { q: 'Do you deliver across the UAE?', a: 'Yes. We support customers across the UAE and coordinate deliveries based on product availability, project schedules, and location requirements to help keep projects moving efficiently.' },
            ] : [
              { q: "Can't find the exact product listed?", a: 'SuVi Trading works with multiple manufacturers and suppliers across the UAE and GCC. We can help identify alternative products, equivalent specifications, and suitable replacements based on project requirements, availability, and budget considerations.' },
              { q: 'Can you source products that are not shown in the catalog?', a: 'Yes. The products displayed on this website represent only a portion of our available offering. We can assist with sourcing additional pumps, valves, insulation materials, piping products, HVAC accessories, refrigeration components, and MEP consumables upon request.' },
              { q: 'Do you offer alternative brands?', a: 'Absolutely. If a preferred brand is unavailable or does not align with project budgets, our team can recommend suitable alternatives with comparable specifications, quality standards, and performance requirements.' },
              { q: 'Can you support bulk project requirements?', a: 'Yes. We regularly assist contractors, consultants, facility managers, and procurement teams with project-scale requirements, including bulk quantities, phased deliveries, and recurring supply needs.' },
              { q: 'Do you provide technical specifications and product documentation?', a: 'Yes. Technical datasheets, product specifications, and supporting documentation can be provided upon request to help customers evaluate product suitability and compliance with project requirements.' },
            ]).map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.q}
                  className={`w-full ${faqRevealTransition} ${faqInView ? faqRevealShown : faqItemHidden}`}
                  style={{ transitionDelay: faqInView ? faqItemDelay(index) : '0ms' }}
                >
                  <div
                    className={`w-full rounded-2xl border bg-white shadow-sm transition-all duration-200 hover:shadow-md ${
                      isOpen ? 'border-2 border-[#D97706]' : 'border border-gray-200'
                    }`}
                    style={{ width: '100%', display: 'block' }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="w-full block text-left font-semibold text-lg text-[#0B132B]" style={{ display: 'block', width: '100%' }}>
                        {faq.q}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                          isOpen ? 'bg-[#D97706] text-white' : 'bg-[#0B132B] text-white'
                        }`}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ display: 'block', margin: 'auto' }}>
                          {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          )}
                        </svg>
                      </span>
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{ maxHeight: isOpen ? '200px' : '0px', opacity: isOpen ? 1 : 0 }}
                    >
                      <div className="w-full block text-left pt-2 pb-4 px-6 text-gray-600 leading-relaxed text-base border-t border-gray-100 mt-4">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {true && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setShowAllFaqs((prev) => !prev)}
                className="btn-outline inline-flex items-center gap-2"
              >
                {showAllFaqs ? 'Show Less' : 'View All FAQs'} <span aria-hidden="true">{showAllFaqs ? '↑' : '↓'}</span>
              </button>
            </div>
          )}

          <p className="mt-10 text-center text-sm text-gray-600">
            Have a project requirement in mind? Speak with our team for product recommendations, availability checks, and quotation support.
          </p>
        </div>
      </div>
    </section>
  );
}
