import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { Navigation } from '@/sections/navigation';
import { Hero } from '@/sections/hero';
import { AboutHome } from '@/sections/about-home';
import { CategoryGrid } from '@/sections/category-grid';
import { WhyChooseUs } from '@/sections/why-choose-us';
import { BrandMarquee } from '@/sections/brand-marquee';
import { ServicesProcess } from '@/sections/services-process';
import { Industries } from '@/sections/industries';
import { Testimonials } from '@/sections/testimonials';
import { FAQ } from '@/sections/faq';
import { CTASection } from '@/sections/cta-section';
import { Footer } from '@/sections/footer';

export const metadata: Metadata = {
  title: 'SuVi Trading | Industrial Hardware & MEP Supplies',
  description:
    'Reliable supplier of industrial hardware, pumps, copper pipes, insulation, and MEP consumables. Quality products and dependable supply solutions for businesses.',
  openGraph: {
    title: 'SuVi Trading | Industrial Hardware & MEP Supplies',
    description:
      'Reliable supplier of industrial hardware, pumps, copper pipes, insulation, and MEP consumables. Quality products and dependable supply solutions for businesses.',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SuVi Trading | Industrial Hardware & MEP Supplies',
    description:
      'Reliable supplier of industrial hardware, pumps, copper pipes, insulation, and MEP consumables. Quality products and dependable supply solutions for businesses.',
    images: ['/og-image.jpg'],
  },
};

export default function HomePage(): ReactElement {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SuVi Trading',
    url: 'http://localhost:3000',
    logo: 'http://localhost:3000/logo.png',
    description:
      'Multi-brand industrial hardware supplier specializing in pumps, copper pipes, insulation, pipe supports, hangers, and MEP consumables.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+971-4-123-4567',
      contactType: 'sales',
      email: 'info@suvitrading.com',
    },
  };

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <AboutHome />
        <CategoryGrid />
        <WhyChooseUs />
        <BrandMarquee />
        <ServicesProcess />
        <Industries />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
