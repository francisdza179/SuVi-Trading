import type { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function ProductsHero(): ReactElement {
  return (
    <section className="relative overflow-hidden bg-steel">
      <div className="absolute inset-0">
        <Image
          src="/hero-products.jpg"
          alt="Industrial product catalog including pumps, pipes, and insulation"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15" />
      </div>

      <div className="relative z-10 container-tight py-24 lg:py-32">
        <div className="max-w-2xl">
          <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-copper">
            Product Catalog
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Industrial Products for MEP Systems
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/85 md:text-xl">
            Browse our product catalog. We source from multiple trusted brands so you get the right specification, availability, and price for your project.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/products" className="btn-primary text-center justify-center" style={{ minWidth: '200px' }}>
              Browse Products
            </Link>
            <Link href="/contact" className="btn-accent text-center justify-center" style={{ minWidth: '180px' }}>
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}