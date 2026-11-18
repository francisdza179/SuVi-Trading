import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { Navigation } from '@/sections/navigation';
import { PageHero } from '@/components/page-hero';
import { ServicesList } from '@/sections/services-list';
import { BrandMarquee } from '@/sections/brand-marquee';
import { HowItWorks } from '@/sections/how-it-works';
import { WhoWeKeepSupplied } from '@/sections/who-we-keep-supplied';
import { FAQ } from '@/sections/faq';
import { CTASection } from '@/sections/cta-section';
import { Footer } from '@/sections/footer';

export const metadata: Metadata = {
  title: 'Products & Services',
  description:
    'Explore SuVi Trading product categories: pumps, copper pipes, insulation, pipe supports, hangers, and MEP consumables. Request a quote for your project.',
  openGraph: {
    title: 'Products & Services | SuVi Trading',
    description:
      'Pumps, copper pipes, insulation, pipe supports, hangers, and MEP consumables from trusted industrial brands.',
    images: ['/hero-services.jpg'],
  },
};

export default function ServicesPage(): ReactElement {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Industrial Hardware Supply',
    provider: {
      '@type': 'Organization',
      name: 'SuVi Trading',
      url: 'http://localhost:3000',
    },
    areaServed: 'United Arab Emirates',
    description:
      'Supply of multi-brand industrial hardware including pumps, copper pipes, insulation, pipe supports, hangers, and MEP consumables.',
  };

  const servicesFaqs = [
    { question: 'What products does SuVi Trading supply?', answer: 'SuVi Trading supplies a wide range of industrial and MEP products, including pumps, copper pipes, thermal insulation materials, valves, pipe supports, hangers, fittings, refrigeration components, HVAC accessories, and other essential project materials.' },
    { question: 'Do you represent a single brand or multiple manufacturers?', answer: 'We work across multiple manufacturers and product lines, allowing customers to compare options and select solutions that best match their technical requirements, budget, and project specifications.' },
    { question: 'Who are your typical customers?', answer: 'Our customers include MEP contractors, HVAC specialists, facility management companies, industrial operators, consultants, procurement teams, and construction firms across various sectors.' },
    { question: 'Can you help us select the right products for our project?', answer: 'Yes. Our team can assist with product selection, technical recommendations, and identifying suitable alternatives based on project requirements, specifications, and application needs.' },
    { question: 'Do you provide quotations for bulk orders?', answer: 'Absolutely. Whether you require materials for a small installation or a large-scale project, we can prepare customized quotations based on quantity, specifications, and delivery requirements.' },
    { question: 'Do you stock products locally?', answer: 'We maintain access to a wide range of commonly used industrial and MEP products. Product availability may vary, and our team can confirm stock status and lead times upon request.' },
    { question: 'How quickly can you respond to inquiries?', answer: 'We aim to respond to all inquiries as quickly as possible. Response times may vary based on product requirements, project complexity, and supplier availability.' },
    { question: 'Can you supply materials for ongoing construction projects?', answer: 'Yes. We support contractors and project teams by supplying products for new construction, retrofit projects, maintenance work, and facility upgrades.' },
    { question: 'Do you offer alternative brands when a product is unavailable?', answer: 'Yes. Because we work with multiple manufacturers, we can often recommend suitable alternatives that meet technical and project requirements while helping avoid delays.' },
    { question: 'What industries do you serve?', answer: 'We serve commercial, residential, hospitality, healthcare, industrial, infrastructure, and facility management sectors requiring reliable MEP and industrial products.' },
    { question: 'Can you assist with HVAC and refrigeration requirements?', answer: 'Yes. We supply products commonly used in HVAC and refrigeration systems, including copper pipes, insulation materials, valves, fittings, and related accessories.' },
    { question: 'Do you provide delivery across the UAE?', answer: 'We work to support customers throughout the UAE. Delivery availability and timelines depend on product type, quantity, and destination.' },
    { question: 'Can I request products that are not listed on the website?', answer: 'Yes. The website highlights our primary product categories, but we may be able to source additional products through our supplier network. Contact us with your requirements for assistance.' },
    { question: 'How do I request a quotation?', answer: 'Simply contact our team through the website, email, or phone and provide your product requirements, quantities, specifications, or project details. We will review the request and prepare a quotation.' },
    { question: 'Why choose SuVi Trading?', answer: 'SuVi Trading combines product expertise, access to multiple manufacturers, responsive customer support, and a commitment to helping customers source quality industrial and MEP products efficiently and reliably.' },
  ];

  return (
    <>
      <Navigation />
      <main>
        <PageHero
          title="Integrated Supply Chain & Product Sourcing"
          description="We simplify MEP procurement through trusted supplier partnerships, ensuring quality products, technical compliance, and on-time delivery."
          image="/hero/services.png"
        />
        <ServicesList />
        <BrandMarquee showLabel={false} />
        <HowItWorks />
        <WhoWeKeepSupplied />
        <FAQ faqs={servicesFaqs} title="Questions buyers ask us" bgClassName="bg-white" />
        <CTASection
          title="Need a specific brand or specification?"
          description="Send us your bill of materials. We will confirm availability, pricing, and lead times."
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
