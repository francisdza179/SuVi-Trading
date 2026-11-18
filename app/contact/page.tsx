import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { Navigation } from '@/sections/navigation';
import { ContactPage } from '@/sections/contact-page';
import { CTASection } from '@/sections/cta-section';
import { Footer } from '@/sections/footer';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact SuVi Trading for quotes, product availability, and technical support. We supply pumps, copper pipes, insulation, pipe supports, hangers, and MEP consumables.',
  openGraph: {
    title: 'Contact SuVi Trading',
    description:
      'Request a quote or get technical support for industrial hardware supply.',
    images: ['/hero-contact.jpg'],
  },
};

export default function ContactPageRoute(): ReactElement {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact SuVi Trading',
    url: 'http://localhost:3000/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'SuVi Trading',
      telephone: '+971-4-123-4567',
      email: 'quotes@suvitrading.ae',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Al Quoz Industrial Area 3',
        addressLocality: 'Dubai',
        addressCountry: 'United Arab Emirates',
      },
    },
  };

  return (
    <>
      <Navigation />
      <main>
        <ContactPage />
      </main>
      <CTASection />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
