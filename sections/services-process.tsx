'use client';

import type { ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';

const services = [
  {
    number: '01',
    title: 'Product Sourcing',
    description:
      'Multi-brand sourcing across 500+ products. If it\u2019s in your BOQ, we\u2019ll find it \u2014 at the right spec and price.',
    icon: (
      <svg className="h-8 w-8 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="11" cy="11" r="7" />
        <path strokeLinecap="round" d="m20 20-3.5-3.5" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Technical Consultation',
    description:
      'Pump selection, pipe sizing and insulation thickness calculations from engineers who know MEP.',
    icon: (
      <svg className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Logistics & Delivery',
    description:
      'Consolidated deliveries to site, warehouse pickup, and project-phased supply across the Emirates.',
    icon: (
      <svg className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h11v10H3zM14 10h4l3 4v3h-7zM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'After-Sales Support',
    description:
      'Warranty handling, spare parts and replacement support long after the delivery note is signed.',
    icon: (
      <svg className="h-8 w-8 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.1 2.1-2.8-2.8 2.1-2.1z" />
      </svg>
    ),
  },
];

export function ServicesProcess(): ReactElement {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F4F6F9] py-24 lg:py-28">
      <div className="container-tight">
        {/* Header */}
        <div
          className={`mb-12 flex w-full flex-col items-start gap-4 transition-all duration-700 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ width: '100%' }}
        >
          <h2 className="whitespace-nowrap font-heading text-3xl font-bold tracking-tight text-[#0B132B] md:text-4xl lg:text-5xl" style={{ color: '#0B132B' }}>
            More Than a Supplier
          </h2>
          <p className="text-base leading-relaxed text-gray-600">
            A dedicated procurement partner for contractors, consultants, and
            <br />
            technical teams who cannot afford a single missed delivery date.
          </p>
        </div>

        {/* Services list */}
        <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`flex h-full flex-col gap-4 bg-transparent p-6 transition-all duration-700 ease-out ${
                index < services.length - 1 ? 'border-b border-gray-200' : ''
              } ${index % 2 === 0 ? 'sm:border-r sm:border-gray-200' : ''} ${
                index >= 2 ? 'sm:border-b-0' : ''
              } ${index < 3 ? 'lg:border-r lg:border-gray-200' : ''} lg:border-b-0 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: inView ? `${index * 120}ms` : '0ms' }}
            >
              <div className="mb-2">
                <span className="font-heading text-4xl font-extrabold text-[#C46A3A]/80">
                  {service.number}
                </span>
              </div>
              <h3 className="w-full block font-heading text-lg font-bold text-gray-900" style={{ color: '#0B132B', whiteSpace: 'normal' }}>
                {service.title}
              </h3>
              <p className="w-full block text-sm leading-relaxed text-gray-600" style={{ whiteSpace: 'normal' }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}