import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import Link from 'next/link';
import { Navigation } from '@/sections/navigation';
import { PageHero } from '@/components/page-hero';
import { AboutContent } from '@/sections/about-content';
import { MissionVisionValues } from '@/sections/mission-vision-values';
import { OurPartners } from '@/sections/our-partners';
import { FAQ } from '@/sections/faq';
import { CTASection } from '@/sections/cta-section';
import { Footer } from '@/sections/footer';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about SuVi Trading — a multi-brand industrial hardware supplier helping MEP contractors and HVAC teams source pumps, pipes, insulation, and consumables.',
  openGraph: {
    title: 'About SuVi Trading',
    description:
      'Discover how SuVi Trading supports MEP contractors with reliable industrial hardware supply.',
    images: ['/hero-about.jpg'],
  },
};

export default function AboutPage(): ReactElement {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About SuVi Trading',
    url: 'http://localhost:3000/about',
    mainEntity: {
      '@type': 'Organization',
      name: 'SuVi Trading',
      description:
        'Multi-brand industrial hardware supplier focused on pumps, copper pipes, insulation, pipe supports, hangers, and MEP consumables.',
    },
  };

  const aboutFaqs = [
    { question: 'What is SuVi Trading?', answer: 'SuVi Trading is a UAE-based industrial trading company focused on supplying HVAC, plumbing, mechanical, and MEP products. We serve contractors, consultants, facility managers, and procurement teams by providing access to multiple trusted manufacturers through a single sourcing partner.' },
    { question: 'What industries does SuVi Trading serve?', answer: 'We support a wide range of industries including commercial construction, residential developments, hospitality, healthcare, infrastructure, industrial facilities, manufacturing, and facility management. Our product portfolio is designed to meet the needs of projects across various sectors.' },
    { question: 'What makes SuVi Trading different from traditional distributors?', answer: 'Unlike single-brand distributors, we work across multiple product categories and manufacturers. This allows customers to compare options, evaluate alternatives, and source a broader range of project requirements through one point of contact.' },
    { question: 'Does SuVi Trading work with contractors and consultants?', answer: 'Yes. We regularly support contractors, consultants, project engineers, procurement specialists, and facility management teams by helping them identify suitable products, evaluate alternatives, and source materials efficiently.' },
    { question: 'How does SuVi Trading ensure product quality?', answer: 'We focus on sourcing products from reputable manufacturers and suppliers that are recognized within the HVAC, plumbing, insulation, and industrial sectors. Every sourcing decision is guided by quality, reliability, performance, and project suitability.' },
    { question: 'Does SuVi Trading maintain local stock and warehousing capabilities?', answer: 'We work to maintain access to commonly required project materials and collaborate closely with suppliers and logistics partners to support efficient order fulfillment. Product availability may vary depending on category and project requirements.' },
    { question: 'Can SuVi Trading support large-scale projects?', answer: 'Yes. Our sourcing network enables us to support projects ranging from routine maintenance requirements to large commercial and industrial developments requiring coordinated procurement across multiple product categories.' },
    { question: 'What types of products does SuVi Trading specialize in?', answer: 'Our focus includes pumps, copper pipes, thermal insulation materials, valves, pipe supports, hangers, fittings, refrigeration components, HVAC accessories, and other essential MEP and industrial products.' },
    { question: 'How experienced is the SuVi Trading team?', answer: 'Our team understands the practical challenges faced by contractors, consultants, and procurement departments. We focus on combining product knowledge, technical understanding, responsive communication, and reliable sourcing support.' },
    { question: 'Does SuVi Trading work with international manufacturers?', answer: 'Yes. We collaborate with a network of regional and international manufacturers and suppliers, allowing us to offer customers access to a broad spectrum of products and brand options.' },
    { question: 'How does SuVi Trading support procurement teams?', answer: 'We simplify procurement by helping customers compare products, evaluate alternatives, coordinate sourcing, and manage multiple product requirements through a single supplier relationship. Our goal is to reduce complexity and improve efficiency.' },
    { question: 'What is SuVi Trading\'s long-term vision?', answer: 'Our vision is to become one of the UAE\'s most trusted industrial trading partners by building long-term relationships, continually expanding our supplier network, and delivering dependable procurement solutions that support successful project execution.' },
  ];

  return (
    <>
      <Navigation />
      <main>
        <PageHero
          title="Engineered reliability from specification to delivery"
          description="We help contractors, engineers, and procurement teams source the right industrial hardware without the usual procurement friction."
          image="/hero/about.png"
        />
        <AboutContent />
        <MissionVisionValues />
        <OurPartners />
        <FAQ faqs={aboutFaqs} title="Questions buyers ask us" />
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
