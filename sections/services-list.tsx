'use client';

import type { ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const services = [
  {
    number: '01',
    title: 'Product Sourcing & Procurement',
    image: '/images/services/sourcing.png',
    description:
      'Tell us the duty point or the BOQ line — we source across multiple brands, compare spec-for-spec, and consolidate everything into one purchase order at competitive, comparable pricing.',
    checks: [
      'Multi-brand sourcing (Grundfos, Mueller, Armacell, Victaulic, Anvil, Danfoss & more)',
      'Competitive pricing compared across brands before you commit',
      'Bulk procurement & project-rate pricing for full BOQs',
    ],
    tags: ['PUMPS', 'COPPER', 'VALVES'],
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h10M4 17h16M18 12l3-3-3-3" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Technical Consultation & Selection Support',
    image: '/images/services/consultation.png',
    description:
      'Our engineers size pumps, select pipework and check compliance against your duty point — before you buy — so the material that arrives on site is the material that passes inspection.',
    checks: [
      'Pump sizing & pipework selection against your exact duty point',
      'Spec compliance check before order placement',
      'Technical documentation & datasheet verification',
    ],
    tags: ['SIZING', 'COMPLIANCE', 'SPECS'],
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Logistics & Fast Delivery',
    image: '/images/services/logistics.png',
    description:
      'Local UAE stock, phased to your site schedule. Mixed brands travel on a single truck under one delivery note — material lands when the crew does, not weeks after.',
    checks: [
      'UAE-wide delivery in 1–3 days from local warehouse stock',
      'Phased deliveries matched to your site programme',
      'One PO, one delivery — mixed brands consolidated per drop',
    ],
    tags: ['1-3 DAYS', 'WAREHOUSING', 'UAE-WIDE'],
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h11v10H3zM14 10h4l3 4v3h-7zM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'After-Sales & Technical Support',
    image: '/images/services/after-sales.png',
    description:
      "Support doesn't end at the delivery note. Warranty handling, replacements and engineers on call — 24/7 — keep your installation running long after handover.",
    checks: [
      'Warranty coordination & genuine replacement parts',
      '24/7 technical support — engineers on call, not a call centre',
      'Commissioning guidance & troubleshooting after handover',
    ],
    tags: ['WARRANTY', '24/7', 'REPLACEMENTS'],
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.1 2.1-2.8-2.8 2.1-2.1z" />
      </svg>
    ),
  },
];

function ServiceRow({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
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

  const graphicLeft = index % 2 === 0;

  return (
    <div
      ref={rowRef}
      className={`overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: inView ? `${index * 100}ms` : '0ms' }}
    >
      <div className={`flex flex-col md:flex-row ${graphicLeft ? '' : 'md:flex-row-reverse'}`}>
        {/* Graphic side */}
        <div className="relative w-full md:w-1/2">
          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-bold text-white/60">
              {service.number}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content side */}
        <div className="flex w-full flex-col justify-center p-8 md:w-1/2">
          <h3 className="font-heading text-xl font-bold text-gray-900" style={{ color: '#0B132B' }}>
            {service.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-gray-600">
            {service.description}
          </p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-gray-700">
            {service.checks.map((check) => (
              <li key={check}>{check}</li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#E07A5F] transition hover:text-[#E07A5F]/80"
          >
            Learn More →
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ServicesList(): ReactElement {
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F4F6F9] py-24 lg:py-28">
      <div className="container-tight">
        <div
          className={`mb-12 text-center transition-all duration-700 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-gray-900 md:text-4xl" style={{ color: '#0B132B' }}>
            Four services, one accountable partner
          </h2>
          <p className="w-full max-w-2xl mx-auto text-center text-slate-600 text-base md:text-lg mb-12 px-4 whitespace-normal" style={{ width: '100%', maxWidth: '42rem', margin: '0 auto', display: 'block', whiteSpace: 'normal' }}>
            Every engagement can use one service or all four — most project clients use the full chain.
          </p>
        </div>

        <div className="space-y-8">
          {services.map((service, index) => (
            <ServiceRow key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}