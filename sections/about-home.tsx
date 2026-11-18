'use client';

import type { ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  { title: '500+ Products', description: 'Pumps, pipes, insulation, valves & supports under one roof.', icon: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 7.5 8 4.5 8-4.5M12 12v9" />
    </svg>
  ) },
  { title: 'Multiple Brands', description: 'Leading global & regional brands — compared honestly.', icon: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 4h10l3 6-8 10L4 10l3-6Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 10h16M9 4l-1 6 4 10 4-10-1-6" />
    </svg>
  ) },
  { title: 'Fast Delivery', description: 'Stocked locally with 24–48h delivery across the UAE.', icon: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h11v12H3zM14 9h4l3 4v4h-7z" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </svg>
  ) },
  { title: 'Technical Support', description: 'Sizing, selection & submittal support from MEP specialists.', icon: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-3v-6h5M4 13h5v6H6a2 2 0 0 1-2-2v-4Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19c0 1-1 2-3 2" />
    </svg>
  ) },
];

export function AboutHome(): ReactElement {
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

  const collage = (
    <div
      className={`relative h-[420px] overflow-hidden rounded-3xl shadow-xl transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: inView ? '200ms' : '0ms' }}
    >
      <div className="flex h-full w-full" style={{ gap: '10px' }}>
        {/* Left column — three stacked photos */}
        <div className="grid h-full min-w-0 flex-1" style={{ gridTemplateRows: '324fr 394fr 324fr', gap: '10px' }}>
          <div className="relative overflow-hidden">
            <Image
              src="/multi-brand-hvac-plumbing-partner-left-1.png"
              alt="Multi-Brand HVAC & Plumbing Partner"
              fill
              className="object-cover transition-transform duration-500 ease-out hover:scale-105"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          </div>
          <div className="relative overflow-hidden">
            <Image
              src="/multi-brand-hvac-plumbing-partner-left-2.png"
              alt=""
              aria-hidden="true"
              fill
              className="object-cover transition-transform duration-500 ease-out hover:scale-105"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          </div>
          <div className="relative overflow-hidden">
            <Image
              src="/multi-brand-hvac-plumbing-partner-left-3.png"
              alt=""
              aria-hidden="true"
              fill
              className="object-cover transition-transform duration-500 ease-out hover:scale-105"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          </div>
        </div>
        {/* Right column — two stacked photos */}
        <div className="grid h-full min-w-0 flex-1" style={{ gridTemplateRows: '1fr 1fr', gap: '10px' }}>
          <div className="relative overflow-hidden">
            <Image
              src="/multi-brand-hvac-plumbing-partner-right-1.png"
              alt=""
              aria-hidden="true"
              fill
              className="object-cover transition-transform duration-500 ease-out hover:scale-105"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          </div>
          <div className="relative overflow-hidden">
            <Image
              src="/multi-brand-hvac-plumbing-partner-right-2.png"
              alt=""
              aria-hidden="true"
              fill
              className="object-cover transition-transform duration-500 ease-out hover:scale-105"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="bg-white py-20 lg:py-28">
      <div className="container-tight">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content side */}
          <div
            className={`transition-all duration-700 ease-out ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="font-heading text-3xl font-bold tracking-tight text-gray-900 md:text-4xl" style={{ color: '#0B132B' }}>
              Your Multi-Brand HVAC &amp; Plumbing Partner
            </h2>
            <p className="mt-5 leading-relaxed text-gray-600">
              We partner with top manufacturers to deliver reliable HVAC and plumbing solutions tailored to contractors, facility teams, and distributors. From equipment to parts, we bring together multiple brands, extensive inventory, and responsive service to keep your projects on schedule.
            </p>

            <div className="lg:hidden mt-8 mb-8">{collage}</div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`flex items-start gap-3 p-2 transition-all duration-700 ease-out ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: inView ? `${(index + 1) * 100}ms` : '0ms' }}
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-sm bg-[#C46A3A]" />
                  <div>
                    <h3 className="font-heading text-xs font-bold" style={{ color: '#0B132B' }}>
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/about" className="btn-primary inline-flex items-center gap-2">
                Learn More <span aria-hidden="true">→</span>
              </Link>
              <Link href="/contact" className="btn-outline inline-flex items-center gap-2">
                Request a Quote
              </Link>
            </div>
          </div>

          {/* Image side — five-photo collage; every tile zooms only on its own hover */}
          <div className="hidden lg:block">{collage}</div>
        </div>
      </div>
    </section>
  );
}