'use client';

import type { ReactElement, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function FeatureIcon({ type }: { type: string }): ReactElement {
  const paths: Record<string, ReactNode> = {
    products: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m4 7.5 8 4.5 8-4.5M12 12v9" />
      </>
    ),
    brands: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 4h10l3 6-8 10L4 10l3-6Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 10h16M9 4l-1 6 4 10 4-10-1-6" />
      </>
    ),
    delivery: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h11v12H3zM14 9h4l3 4v4h-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </>
    ),
    support: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-3v-6h5M4 13h5v6H6a2 2 0 0 1-2-2v-4Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19c0 1-1 2-3 2" />
      </>
    ),
  };

  return (
    <svg className="h-6 w-6 text-[#E07A5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
      {paths[type]}
    </svg>
  );
}

const features = [
  { type: 'products', title: 'Product Selection Assistance', description: 'Receive guidance on choosing the right products based on application, performance requirements, and project specifications.' },
  { type: 'brands', title: 'Alternative Brand Recommendations', description: 'When a preferred product is unavailable, we help identify suitable alternatives without compromising project requirements.' },
  { type: 'delivery', title: 'Procurement Coordination', description: 'Streamline purchasing across multiple product categories through a single, reliable point of contact.' },
  { type: 'support', title: 'Responsive Project Support', description: 'Get fast responses, clear communication, and practical assistance to keep your project moving forward.' },
];

export function WhyChooseUs(): ReactElement {
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

  const imageCard = (
    <div
      className={`group relative h-full min-h-[430px] overflow-hidden rounded-3xl border border-gray-200 bg-[#0B132B] shadow-2xl shadow-[#0B132B]/30 ring-1 ring-white/10 transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <Image
        src="/warehouse-hvac-stock.png"
        alt="Warehouse & HVAC Stock"
        fill
        className="object-cover brightness-105 transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-10 p-6">
        <h3 className="font-heading text-2xl font-bold text-white md:text-3xl" style={{ color: '#ffffff' }}>
          Warehouse &amp; HVAC Stock
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-200 md:text-base">
          Pipes, insulation, pumps &amp; fittings — stocked and ready for project delivery.
        </p>
        <div className="mt-4 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
          <div className="flex h-7 w-7 items-center justify-center text-[#E07A5F]">
            <FeatureIcon type="delivery" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wide text-white">
            Direct UAE Dispatch
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#F4F6F9] py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 15% 25%, rgba(224,122,95,0.16), transparent 28%), radial-gradient(circle at 85% 80%, rgba(60,134,206,0.18), transparent 32%)' }} />
      <div className="container-tight relative">
        <div className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Visual stock card */}
          <div className="hidden lg:block">{imageCard}</div>

          {/* Copy and feature cards */}
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#0B132B] md:text-4xl lg:text-5xl">
              One supplier. Every brand your project needs.
            </h2>
            <div className="lg:hidden mt-6">{imageCard}</div>
            <p className="mt-5 whitespace-normal leading-relaxed text-gray-600">
              Unlike single-brand distributors, SuVi Trading retails across multiple manufacturers. Contractors and MEP consultants get unbiased advice, competitive pricing and a single point of supply for the full mechanical package.
            </p>
            <div className="mt-10 divide-y divide-gray-200">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`flex items-start gap-5 py-6 first:pt-0 last:pb-0 transition-all duration-700 ease-out ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: inView ? `${(index + 1) * 120}ms` : '0ms' }}
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-sm bg-[#C46A3A]" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-1 whitespace-normal text-sm leading-relaxed text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/services" className="btn-primary inline-flex items-center gap-2">
                Learn More <span aria-hidden="true">→</span>
              </Link>
              <Link href="/contact" className="btn-outline inline-flex items-center gap-2">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
