'use client';

import type { ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const categoryIcons = [
  { label: 'Pumps' },
  { label: 'Copper Pipes' },
  { label: 'Insulation' },
  { label: 'Pipe Supports' },
  { label: 'Hangers' },
  { label: 'MEP Consumables' },
];

const collageImages = [
  '/procurement-partner-collage-1.jpg',
  '/procurement-partner-collage-2.jpg',
  '/procurement-partner-collage-3.jpg',
  '/procurement-partner-collage-4.jpg',
  '/procurement-partner-collage-5.jpg',
  '/procurement-partner-collage-6.jpg',
  '/procurement-partner-collage-7.jpg',
  '/procurement-partner-collage-8.jpg',
  '/procurement-partner-collage-9.jpg',
];

export function AboutContent(): ReactElement {
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
    <section ref={sectionRef} className="bg-insulation py-20 lg:py-28">
      <div className="container-tight">
        <div className={`grid items-stretch gap-12 transition-all duration-700 ease-out lg:grid-cols-2 lg:gap-20 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Editorial text column */}
          <div className="flex flex-col">
            <h2 className="font-heading text-3xl font-bold text-steel md:text-4xl">
              A procurement partner for technical teams
            </h2>
            <p className="mt-6 text-steel-300">
              SuVi Trading was established to simplify procurement for contractors, consultants, facility managers, and engineering teams working on fast-moving projects across the UAE. Rather than focusing on a single manufacturer or limited product range, we provide access to multiple trusted brands across pumps, copper piping, thermal insulation, valves, pipe supports, hangers, fittings, refrigeration components, and essential MEP consumables.
            </p>
            <p className="mt-4 text-steel-300">
              We understand that successful projects depend on more than product availability. Procurement teams need reliable specifications, competitive sourcing, responsive communication, and delivery schedules they can count on. Our role is to bridge the gap between technical requirements and commercial supply, helping customers compare options, identify suitable products, and secure materials efficiently.
            </p>
            <p className="mt-4 text-steel-300">
              Whether supporting a new installation, system upgrade, maintenance project, or large-scale development, our goal is to become a dependable extension of our customers' procurement process. We focus on delivering the right products, from the right manufacturers, at the right time, helping technical teams reduce unnecessary delays and keep projects moving forward with confidence.
            </p>
          </div>

          {/* Visual / categories column — 3×3 collage; every tile zooms only on its own hover */}
          <div className="relative">
            <div
              className="grid h-full min-h-[320px] w-full overflow-hidden rounded-2xl bg-white shadow-xl"
              style={{ gridTemplateColumns: '452fr 476fr 452fr', gridTemplateRows: '646fr 672fr 648fr', gap: '10px' }}
            >
              {collageImages.map((src, index) => (
                <div key={src} className="relative overflow-hidden">
                  <Image
                    src={src}
                    alt={index === 0 ? 'A procurement partner for technical teams' : ''}
                    aria-hidden={index === 0 ? undefined : true}
                    fill
                    className="object-cover transition-transform duration-500 ease-out hover:scale-105"
                    sizes="(max-width: 1024px) 33vw, 17vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
