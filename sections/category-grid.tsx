'use client';

import type { ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const categories = [
  { title: 'Copper Pipes', description: 'HVAC and refrigeration copper tubing. Premium-grade for leak-free systems.', image: '/product-categories/copper-pipes.png' },
  { title: 'HVAC Accessories', description: 'Flexible ducts, diffusers, grilles, tapes. Complete every install with ease.', image: '/product-categories/hvac-accessories.png' },
  { title: 'Industrial Consumables', description: 'Sealants, adhesives, fasteners, maintenance supplies. Stocked for every job.', image: '/product-categories/industrial-consumables.png' },
  { title: 'Pipe Supports & Hangers', description: 'Clamps, channels, brackets, anchors. Secure every run with confidence.', image: '/product-categories/pipe-supports-hangers.png' },
  { title: 'Pipes & Fittings', description: 'PVC, HDPE, GI piping systems. Versatile solutions for any application.', image: '/product-categories/pipes-fittings.png' },
  { title: 'Pumps', description: 'Transfer pumps, booster pumps, circulation pumps. Built for reliable flow across every duty point.', image: '/product-categories/pumps.png' },
  { title: 'Refrigeration Components', description: 'Copper coils, refrigerants, filter driers. Keep cooling systems running.', image: '/product-categories/refrigeration-components.png' },
  { title: 'Thermal Insulation', description: 'Rubber insulation, insulation sheets, accessories. Cut heat loss and protect every line.', image: '/product-categories/thermal-insulation.png' },
  { title: 'Valves', description: 'Butterfly, gate, check, ball valves. Precision control for every system.', image: '/product-categories/valves.png' },
];

export function CategoryGrid(): ReactElement {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-20 lg:py-28">
      <div className="container-tight">
        <div
          className={`mb-12 text-center transition-all duration-700 ease-out ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h2 className="font-heading text-3xl font-bold text-steel md:text-4xl">
            Product Categories
          </h2>
          <p className="mt-3 text-slate-500">
            Explore our industrial HVAC components — sourced for quality, traded with confidence
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const slug = category.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, '');
            return (
            <Link
              key={category.title}
              href={`/products?category=${slug}`}
              className={`block overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-700 ease-out hover:delay-0 hover:duration-300 hover:-translate-y-1 hover:shadow-xl ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: visible ? `${index * 90}ms` : '0ms' }}
            >
              <div className="relative h-48 w-full overflow-hidden bg-concrete">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-lg font-bold text-steel text-center">
                  {category.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500 text-center">
                  {category.description}
                </p>
              </div>
            </Link>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/products"
            className="btn-primary inline-flex items-center gap-2"
          >
            Explore All Products <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}