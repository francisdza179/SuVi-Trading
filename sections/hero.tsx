"use client";

import type { ReactElement } from 'react';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Slide {
  headline: string;
  subheadline: string;
  cta: string;
  href: string;
  image: string;
  label: string;
  metric: { value: string; text: string };
}

const slides: Slide[] = [
  { headline: 'Industrial Pumps\nfor Every Application', subheadline: 'Reliable multi-brand pump solutions expertly engineered for commercial HVAC, plumbing networks, and demanding industrial fluid systems.', cta: 'Explore Pumps', href: '/products?category=pumps', image: '/hero-slides/slide-1.png', label: 'PUMPS', metric: { value: '50+', text: 'High-efficiency pump models' } },
  { headline: 'Premium Copper\nPiping Systems', subheadline: 'High-grade copper pipes and tubing built for efficient HVAC, refrigeration, and critical commercial plumbing installations.', cta: 'View Copper Pipes', href: '/products?category=copper-pipes', image: '/hero-slides/slide-2.png', label: 'COPPER PIPES', metric: { value: '30+', text: 'Standard copper diameters' } },
  { headline: 'Trusted Thermal &\nAcoustic Insulation', subheadline: 'Protect your building systems and control sound with reliable, high-performance insulation for ducts, pipes, and HVAC units.', cta: 'Browse Insulation', href: '/products?category=thermal-insulation', image: '/hero-slides/slide-3.png', label: 'THERMAL INSULATION', metric: { value: '120+', text: 'Insulation products in stock' } },
  { headline: 'Engineered Pipe\nSupports & Hangers', subheadline: 'Durable clamps, brackets, and suspension hardware designed for secure, vibration-resistant, and code-compliant industrial installations.', cta: 'See Pipe Supports', href: '/products?category=pipe-supports-hangers', image: '/hero-slides/slide-4.png', label: 'PIPE SUPPORTS', metric: { value: '80+', text: 'Support & hanger SKUs' } },
  { headline: 'Essential HVAC &\nMEP Accessories', subheadline: 'From precision valves to heavy-duty connectors, get reliable, high-specification components for every mechanical installation.', cta: 'Browse Accessories', href: '/products?category=hvac-accessories', image: '/hero-slides/slide-7.png', label: 'HVAC & MEP ACCESSORIES', metric: { value: '200+', text: 'Accessory items available' } },
  { headline: 'Precision Pipe\nFittings Systems', subheadline: 'Durable GI, PVC, and HDPE fittings precision-engineered for leak-free connections and long-term structural performance.', cta: 'View Pipe Fittings', href: '/products?category=pipes-fittings', image: '/hero-slides/slide-8.png', label: 'PIPE FITTINGS', metric: { value: '150+', text: 'Fitting variants in stock' } },
  { headline: 'Complete Industrial\nConsumables Range', subheadline: 'High-adhesion tapes, specialized adhesives, fasteners, and all the essential consumables needed for professional insulation work.', cta: 'Explore Consumables', href: '/products?category=industrial-consumables', image: '/hero-slides/slide-6.png', label: 'INSULATION CONSUMABLES', metric: { value: '60+', text: 'Consumable product lines' } },
  { headline: 'Your Multi-Brand\nIndustrial Partner', subheadline: 'Your single, trusted source for pumps, pipes, insulation, fittings, and comprehensive multi-brand MEP project supplies.', cta: 'View All Products', href: '/products', image: '/hero-slides/slide-5.png', label: 'INDUSTRIAL PARTNER', metric: { value: '15+', text: 'Trusted industrial brands' } },
];

const stats = [
  { value: '500+', label: 'Products in range' },
  { value: '40+', label: 'Brands supplied' },
  { value: '24–48h', label: 'UAE delivery' },
  { value: 'MEP', label: 'Contractor focused' },
];

export function Hero(): ReactElement {
  const [index, setIndex] = useState(0);
  const [shownIndex, setShownIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [count500, setCount500] = useState(0);
  const [count40, setCount40] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const [stripReady, setStripReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setStripReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!stripReady) return;
    setStatsVisible(true);
    const duration = 800;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount500(Math.round(500 * eased));
      setCount40(Math.round(40 * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stripReady]);

  const goTo = useCallback((i: number) => {
    setIndex((i + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => {
      setShownIndex(index);
      setVisible(true);
    }, 300);
    return () => clearTimeout(t);
  }, [index]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(id);
  }, [paused]);

  useEffect(() => {
    setProgress(0);
    const duration = 5500;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setProgress(t * 100);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index]);

  const slide = slides[shownIndex];

  return (
    <section className="relative overflow-hidden bg-steel min-h-[90vh] flex flex-col">
      <div className={`absolute inset-0 z-0 transition-opacity duration-800 ease-out ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <Image src={slide.image} alt={slide.headline} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.82), rgba(0,0,0,0.5), rgba(0,0,0,0.2))', zIndex: 10, pointerEvents: 'none' }} />
      </div>

      <div className="relative z-20 flex-1 flex flex-col justify-center w-full max-w-[1200px] mx-auto px-6 py-24 lg:py-32">
        <div style={{ maxWidth: '760px', display: 'flex', flexDirection: 'column' }}>
          {/* Slide progress indicator */}
          <div className={`transition-all duration-[800ms] ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: '0ms' }}>
            <div className="text-xs font-semibold tracking-[0.2em] text-copper mb-6" style={{ whiteSpace: 'nowrap' }}>
              {String(shownIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')} — {slide.label}
            </div>
          </div>

          <h1 className={`font-heading text-3xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl !text-white whitespace-pre-line transition-all duration-[800ms] ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: '100ms', whiteSpace: 'pre-line', minHeight: '7.75rem' }}>
            {slide.headline}
          </h1>
          <p className={`mt-6 text-lg leading-relaxed text-insulation/80 md:text-xl transition-all duration-[800ms] ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: '200ms' }}>
            {slide.subheadline}
          </p>

          {/* Custom metric callout */}
          <div className={`mt-8 flex items-center gap-4 flex-nowrap transition-all duration-[800ms] ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: '300ms' }}>
            <span className="font-heading text-5xl font-extrabold text-copper" style={{ whiteSpace: 'nowrap' }}>{slide.metric.value}</span>
            <span className="text-xs sm:text-sm font-medium text-insulation/90 uppercase tracking-wider" style={{ whiteSpace: 'nowrap' }}>{slide.metric.text}</span>
          </div>

          {/* Uniform CTA buttons */}
          <div className={`mt-8 flex flex-wrap items-center gap-4 transition-all duration-[800ms] ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: '400ms' }}>
            <Link href={slide.href} className="btn-primary text-center justify-center" style={{ minWidth: '240px' }}>{slide.cta}</Link>
            <Link href="/contact" className="btn-accent text-center justify-center" style={{ minWidth: '240px' }}>Request a Quote</Link>
          </div>
        </div>

        {/* Slide dots */}
        <div className="mt-12 flex items-center gap-2">
          {slides.map((_, i) => {
            if (i === index) {
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                  className="h-2.5 w-8 rounded-full transition-all duration-300"
                  style={{ background: `linear-gradient(to right, #c46a3a ${progress}%, rgba(196,106,58,0.25) ${progress}%)` }}
                />
              );
            }
            return (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                className="h-2.5 w-2.5 rounded-full bg-gray-400 hover:bg-gray-500 transition-all duration-300"
              />
            );
          })}
        </div>
      </div>

      {/* Bottom stats bar */}
      <div className={`relative z-10 w-full border-t border-white/10 bg-steel/60 backdrop-blur-sm transition-all duration-800 ease-out ${stripReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-[1200px] mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => {
            let display = s.value;
            if (s.value === '500+') display = `${count500}+`;
            if (s.value === '40+') display = `${count40}+`;
            return (
              <div
                key={s.label}
                className={`flex flex-col transition-all duration-[800ms] ease-out ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                <span className="font-heading text-3xl font-extrabold text-copper">{display}</span>
                <span className="text-xs font-medium uppercase tracking-wider text-insulation/80 mt-1">{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <button type="button" aria-label="Previous slide" onClick={() => goTo(index - 1)} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-insulation/20 bg-steel/40 p-3 text-insulation transition hover:bg-steel/70 md:block cursor-pointer">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button type="button" aria-label="Next slide" onClick={() => goTo(index + 1)} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-insulation/20 bg-steel/40 p-3 text-insulation transition hover:bg-steel/70 md:block cursor-pointer">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>

      <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-20" style={{ zIndex: 5 }} />
    </section>
  );
}