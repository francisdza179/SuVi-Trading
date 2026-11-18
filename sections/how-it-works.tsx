'use client';

import type { ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    number: '01',
    title: 'Inquiry',
    description: 'A BOQ, a duty point or a site photo — phone, email or the quote form.',
  },
  {
    number: '02',
    title: 'Quotation',
    description: 'Multi-brand pricing with cross-brand alternatives, spec-checked line by line.',
  },
  {
    number: '03',
    title: 'Confirmation',
    description: 'One consolidated PO, with datasheets and submittals issued for approval.',
  },
  {
    number: '04',
    title: 'Delivery',
    description: 'Phased drops across the UAE, sequenced to your site programme.',
  },
  {
    number: '05',
    title: 'Support',
    description: 'Warranty, replacements and engineers on call — not an answering service.',
  },
];

/**
 * Hairlines follow the "More Than a Supplier" grid: dividers between columns at
 * each multi-column width, and between stacked rows below them. Widths only —
 * the colour is animated from transparent so each divider draws in with its
 * column.
 */
const cellBorders = [
  'border-b sm:border-r xl:border-b-0',
  'border-b lg:border-r xl:border-b-0',
  'border-b sm:border-r lg:border-r-0 xl:border-r xl:border-b-0',
  'border-b lg:border-r lg:border-b-0',
  '',
];

/** Shared reveal: a short upward drift on an expo-out curve. */
const reveal =
  'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none';

export function HowItWorks(): ReactElement {
  const headerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // `top < 0` covers landing on the page below the headline (scroll
        // restoration), where the section would never intersect again.
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#F4F6F9] py-24 lg:py-28">
      <div className="container-tight">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-12 flex w-full flex-col items-start gap-4 ${reveal} ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ width: '100%' }}
        >
          <h2
            className="font-heading text-3xl font-bold tracking-tight text-[#0B132B] md:text-4xl lg:text-5xl"
            style={{ color: '#0B132B' }}
          >
            From inquiry to support in five steps
          </h2>
          <p className="text-base leading-relaxed text-gray-600">
            One team, one purchase order — from first inquiry through to after-sales support.
          </p>
        </div>

        {/* Steps list */}
        <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`flex h-full flex-col gap-4 bg-transparent p-6 ${reveal} ${cellBorders[index]} ${
                inView
                  ? 'border-gray-200 opacity-100 translate-y-0'
                  : 'border-transparent opacity-0 translate-y-7'
              }`}
              style={{ transitionDelay: inView ? `${100 + index * 90}ms` : '0ms' }}
            >
              <div className="mb-2">
                <span className="font-heading text-4xl font-extrabold text-[#C46A3A]/80">
                  {step.number}
                </span>
              </div>
              <h3
                className="w-full block font-heading text-lg font-bold text-gray-900"
                style={{ color: '#0B132B', whiteSpace: 'normal' }}
              >
                {step.title}
              </h3>
              <p className="w-full block text-sm leading-relaxed text-gray-600" style={{ whiteSpace: 'normal' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
