'use client';

import type { ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';

type Industry = {
  title: string;
  description: string;
  image: string;
  tags: string[];
};

const industries: Industry[] = [
  { title: 'HVAC Contractors', tags: ['Cooling', 'Ventilation', 'Refrigeration'], description: 'Supporting HVAC contractors with pumps, copper piping systems, insulation materials, valves, and refrigeration components required for commercial, industrial, and residential installations. We help project teams source reliable products that meet performance requirements while keeping construction and commissioning schedules on track.', image: '/services/who-we-keep-supplied-2/HVAC Contractors.png' },
  { title: 'Plumbing & MEP', tags: ['Piping', 'Valves', 'Insulation'], description: 'Supplying plumbing and MEP contractors with essential materials including copper pipes, fittings, valves, supports, and thermal insulation. Our multi-brand sourcing approach helps simplify procurement by providing access to a broad range of products through a single trusted supplier.', image: '/services/who-we-keep-supplied-2/Plumbing & MEP2.png' },
  { title: 'Facility Management', tags: ['Maintenance', 'Operations', 'Asset Care'], description: 'Helping facility management teams maintain critical building systems through dependable access to replacement components, maintenance materials, and MEP products. From routine upkeep to urgent repairs, we support smooth operations with responsive sourcing and timely supply.', image: '/services/who-we-keep-supplied-2/Facility Management.png' },
  { title: 'Industrial Plants', tags: ['Process Systems', 'Utilities', 'Operations'], description: 'Serving industrial facilities that depend on reliable pumps, valves, piping systems, insulation products, and mechanical components. We support maintenance teams, plant operators, and engineering departments with products designed to sustain operational efficiency and minimize downtime.', image: '/services/who-we-keep-supplied-2/Industrial Plants.png' },
  { title: 'Construction', tags: ['Commercial', 'Residential', 'Infrastructure'], description: 'Working with construction companies across commercial, residential, hospitality, and infrastructure sectors to support every stage of project execution. Our product portfolio is tailored to meet the diverse procurement requirements of modern construction environments.', image: '/services/who-we-keep-supplied-2/Construction.png' },
  { title: 'Distributors', tags: ['Inventory', 'Warehousing', 'Fulfillment'], description: 'Partnering with distributors and supply-chain specialists seeking dependable product availability, competitive sourcing, and access to multiple manufacturers. We help expand product offerings while supporting inventory and project requirements across a broad range of industrial sectors.', image: '/services/who-we-keep-supplied-2/Distributors.png' },
];

/**
 * Shared metadata typography: 11px uppercase copper, dotted separators. Used
 * for the industry tags under each heading and for the opening eyebrow.
 */
const metadataLine =
  'text-[0.6875rem] font-semibold uppercase leading-relaxed tracking-[0.14em] text-copper-dark';

function MetadataLine({
  tags,
  className = 'mt-2',
}: {
  tags: string[];
  className?: string;
}): ReactElement {
  return (
    <p className={`${metadataLine} ${className}`}>
      {tags.map((tag, index) => (
        <span key={tag} className="whitespace-nowrap">
          {index > 0 ? (
            <span aria-hidden="true" className="px-1.5 text-copper/40">
              •
            </span>
          ) : null}
          {tag}
        </span>
      ))}
    </p>
  );
}

export function WhoWeKeepSupplied(): ReactElement {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Layout values are cached and only re-measured on resize. Reading
    // getBoundingClientRect()/scrollWidth inside the scroll handler forces a
    // synchronous layout on every scroll event, which is what made the
    // motion stutter.
    let sectionTop = 0;
    let scrollDistance = 1;
    let maxTranslate = 0;

    let target = 0;
    let current = 0;
    let frame = 0;
    let lastTime = 0;
    let initialized = false;

    const paint = (value: number) => {
      // Written straight to the DOM: updating React state per scroll event
      // re-rendered the whole carousel and dropped frames.
      track.style.transform = `translate3d(${value.toFixed(2)}px, 0, 0)`;
    };

    const readTarget = () => {
      const raw = (window.scrollY - sectionTop) / scrollDistance;
      const progress = raw < 0 ? 0 : raw > 1 ? 1 : raw;
      target = -progress * maxTranslate;
    };

    const step = (time: number) => {
      frame = 0;
      const delta = lastTime ? Math.min(64, time - lastTime) : 16.7;
      lastTime = time;

      if (reduceMotion.matches) {
        current = target;
      } else {
        // Frame-rate independent easing (time constant ~90ms). This absorbs
        // the discrete wheel/trackpad steps and lets the track glide instead
        // of snapping to each scroll tick.
        current += (target - current) * (1 - Math.exp(-delta / 90));
        if (Math.abs(target - current) < 0.1) current = target;
      }

      paint(current);

      if (current !== target) {
        frame = window.requestAnimationFrame(step);
      } else {
        lastTime = 0;
      }
    };

    const animate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(step);
    };

    const measure = () => {
      const rect = section.getBoundingClientRect();
      sectionTop = rect.top + window.scrollY;
      scrollDistance = Math.max(1, section.offsetHeight - window.innerHeight);
      maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth);
      readTarget();

      if (!initialized) {
        // Snap on first measure so reloading mid-section doesn't animate in.
        initialized = true;
        current = target;
        paint(current);
        return;
      }

      if (Math.abs(target - current) < 0.5) {
        current = target;
        paint(current);
      } else {
        animate();
      }
    };

    const onScroll = () => {
      readTarget();
      animate();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    if (document.readyState !== 'complete') {
      window.addEventListener('load', measure, { once: true });
    }

    // Track width can settle late (late-decoding images, web fonts).
    const observer = new ResizeObserver(() => measure());
    observer.observe(track);
    observer.observe(section);

    measure();

    // The frames are off-screen inside the clipped track, so the browser only
    // decodes each PNG the first time it slides into view — which shows up as
    // a hitch mid-scroll. Decode them up front instead.
    const warmImages = () => {
      track.querySelectorAll('img').forEach((img) => {
        if (img.complete || !img.decode) return;
        img.decode().catch(() => undefined);
      });
    };
    const idle = window.requestIdleCallback
      ? () => window.requestIdleCallback(warmImages, { timeout: 2000 })
      : () => window.setTimeout(warmImages, 200);
    const idleId = idle();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      if (typeof idleId === 'number') {
        if (window.cancelIdleCallback) {
          window.cancelIdleCallback(idleId);
        } else {
          window.clearTimeout(idleId);
        }
      }
      track.style.transform = '';
    };
  }, [isDesktop]);

  if (!isDesktop) {
    return (
      <section className="bg-white py-20 lg:py-28">
        <div className="container-tight">
          <MetadataLine tags={['Build', 'Operate', 'Maintain']} className="mb-3" />
          <h2 className="mb-8 font-heading text-3xl font-bold tracking-tight text-gray-900 md:text-4xl" style={{ color: '#0B132B' }}>
            Who we keep supplied
          </h2>
          <div className="relative mb-8 w-full overflow-hidden rounded-3xl shadow-xl" style={{ maxWidth: '450px', aspectRatio: '11 / 15' }}>
            <img src="/services/who-we-keep-supplied-2/Industrial Infrastructure Ecosystem Aerial.png" alt="Industrial Infrastructure Ecosystem Aerial" width={450} height={614} className="h-full w-full object-cover" style={{ width: '100%', height: '100%' }} />
          </div>
          <p className="text-base leading-relaxed text-gray-600">
            SuVi Trading serves a broad spectrum of industries that depend on reliable MEP, HVAC, plumbing, and industrial products to operate efficiently and deliver successful projects.
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            From construction firms and HVAC contractors to facility management companies, distributors, industrial operators, and maintenance teams, we support organizations whose work depends on consistent product availability and dependable supply chains.
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            As industries continue to evolve, we remain committed to supporting the professionals who design, build, maintain, and operate the systems that keep businesses and facilities running every day.
          </p>
          <hr className="my-6 border-t border-gray-200" />
          <p className="font-heading text-xl italic leading-relaxed text-[#0B132B]/90">
            Serving contractors, facility operators, distributors, and industrial teams across multiple sectors.
          </p>
          <div className="mt-8 space-y-6">
            {industries.map((industry) => (
              <div key={industry.title} className="flex gap-4 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg">
                <div className="relative h-40 w-32 shrink-0 overflow-hidden bg-concrete">
                  <img src={industry.image} alt={industry.title} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col justify-center p-4">
                  <h3 className="font-heading text-lg font-bold" style={{ color: '#0B132B' }}>{industry.title}</h3>
                  <MetadataLine tags={industry.tags} />
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{industry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const pairs: Industry[][] = [];
  for (let i = 0; i < industries.length; i += 2) {
    pairs.push(industries.slice(i, i + 2));
  }

  return (
    <section ref={sectionRef} className="relative bg-white" style={{ height: `${(pairs.length + 2) * 100}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-12 will-change-transform"
          style={{ transform: 'translate3d(0px, 0, 0)' }}
        >
          <div style={{ width: 'max(0px, calc((100vw - 1200px) / 2))', flexShrink: 0 }} />
          {/* Opening frame */}
          <div className="flex w-[1200px] shrink-0 items-center justify-between gap-24">
            <div className="w-1/2">
              <MetadataLine tags={['Build', 'Operate', 'Maintain']} className="mb-3" />
              <h2 className="font-heading text-3xl font-bold tracking-tight text-gray-900 md:text-4xl" style={{ color: '#0B132B' }}>
                Who we keep supplied
              </h2>
              <p className="mt-6 text-base leading-relaxed text-gray-600">
                SuVi Trading serves a broad spectrum of industries that depend on reliable MEP, HVAC, plumbing, and industrial products to operate efficiently and deliver successful projects.
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                From construction firms and HVAC contractors to facility management companies, distributors, industrial operators, and maintenance teams, we support organizations whose work depends on consistent product availability and dependable supply chains.
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                As industries continue to evolve, we remain committed to supporting the professionals who design, build, maintain, and operate the systems that keep businesses and facilities running every day.
              </p>
              <hr className="my-6 border-t border-gray-200" />
              <p className="font-heading text-xl italic leading-relaxed text-[#0B132B]/90">
                Serving contractors, facility operators, distributors, and industrial teams across multiple sectors.
              </p>
            </div>
            <div className="shrink-0 overflow-hidden rounded-3xl shadow-xl" style={{ width: '450px', height: '614px', flex: '0 0 auto' }}>
              <img
                src="/services/who-we-keep-supplied-2/Industrial Infrastructure Ecosystem Aerial.png"
                alt="Industrial Infrastructure Ecosystem Aerial"
                width={450}
                height={614}
                className="h-full w-full object-cover"
                style={{ width: '450px', height: '614px', maxWidth: '100%', display: 'block' }}
              />
            </div>
          </div>
          {/* Divider matches the portrait image height; the opening frame's
              image is flush right, so the equal margins centre it in the gap. */}
          <div className="mx-6 w-px shrink-0 self-stretch bg-gray-200" />

          {/* Pair frames */}
          {pairs.map((pair, frameIndex) => (
            <div key={frameIndex} className="flex shrink-0 gap-12 items-center">
              {pair.map((industry, i) => {
                const globalIndex = frameIndex * 2 + i;
                const textFirst = globalIndex % 2 !== 0;
                return (
                  <div key={industry.title} className="flex w-[450px] shrink-0 flex-col justify-center gap-4">
                    {textFirst ? (
                      <>
                        <div>
                          <h3 className="font-heading text-xl font-bold" style={{ color: '#0B132B' }}>{industry.title}</h3>
                          <MetadataLine tags={industry.tags} />
                          <p className="mt-3 text-sm leading-relaxed text-gray-600">{industry.description}</p>
                        </div>
                        <div className="overflow-hidden rounded-3xl shadow-xl" style={{ width: '450px', height: '338px' }}>
                          <img src={industry.image} alt={industry.title} width={450} height={338} className="h-full w-full object-cover" style={{ width: '100%', height: '100%' }} />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="overflow-hidden rounded-3xl shadow-xl" style={{ width: '450px', height: '338px' }}>
                          <img src={industry.image} alt={industry.title} width={450} height={338} className="h-full w-full object-cover" style={{ width: '100%', height: '100%' }} />
                        </div>
                        <div>
                          <h3 className="font-heading text-xl font-bold" style={{ color: '#0B132B' }}>{industry.title}</h3>
                          <MetadataLine tags={industry.tags} />
                          <p className="mt-3 text-sm leading-relaxed text-gray-600">{industry.description}</p>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
              <div className="mx-6 w-px shrink-0 self-stretch bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}