import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { Navigation } from '@/sections/navigation';
import { PageHero } from '@/components/page-hero';
import { Suspense } from 'react';
import { ProductGrid } from '@/sections/product-grid';
import { CTASection } from '@/sections/cta-section';
import { Footer } from '@/sections/footer';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Browse SuVi Trading product catalog: pumps, copper pipes, insulation, pipe supports, hangers, and MEP consumables from trusted industrial brands.',
  openGraph: {
    title: 'Products | SuVi Trading',
    description:
      'Industrial hardware products for MEP contractors and engineers. Request a quote for pumps, pipes, insulation, and more.',
    images: ['/hero-products.jpg'],
  },
};

export default function ProductsPage(): ReactElement {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'SuVi Trading Product Catalog',
    url: 'http://localhost:3000/products',
    description:
      'Multi-brand industrial hardware products including pumps, copper pipes, insulation, pipe supports, hangers, and MEP consumables.',
    provider: {
      '@type': 'Organization',
      name: 'SuVi Trading',
      url: 'http://localhost:3000',
    },
  };

  return (
    <>
      <Navigation />
      <main>
        <PageHero
          title="Industrial products for MEP systems"
          description="Browse our product catalog. We source from multiple trusted brands so you get the right specification, availability, and price for your project."
          image="/hero/products.png"
        />
        <Suspense fallback={<div className="container-tight py-12">Loading catalog…</div>}>
          <ProductGrid />
        </Suspense>
        <CTASection
          title="Need a specific brand or specification?"
          description="Send us your bill of materials. We will confirm availability, pricing, and lead times within 24 hours."
          primaryLabel="Request Quote"
          secondaryLabel="Contact Us"
          secondaryHref="/contact"
        />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
