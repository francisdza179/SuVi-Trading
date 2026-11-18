'use client';

import type { ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  faqItemDelay,
  faqItemHidden,
  faqRevealHidden,
  faqRevealShown,
  faqRevealTransition,
  useFaqReveal,
} from './faq-reveal';

export type FAQItem = { question: string; answer: string };

const defaultFaqs: FAQItem[] = [
  { question: 'What products does SuVi supply?', answer: 'SuVi supplies a wide range of industrial and commercial MEP products, including pumps, valves, copper pipes, HVAC accessories, pipe supports, refrigeration components, thermal insulation materials, fittings, and industrial consumables.' },
  { question: 'Which industries do you serve?', answer: 'We serve commercial buildings, industrial facilities, hospitals, hotels, educational institutions, residential developments, manufacturing plants, infrastructure projects, and MEP contractors.' },
  { question: 'Do you supply products from multiple brands?', answer: 'Yes. We work with leading global and regional manufacturers to provide customers with access to trusted brands that meet project specifications, budgets, and performance requirements.' },
  { question: 'Can you help select the right product for my application?', answer: 'Absolutely. Our technical team can recommend suitable products based on your project requirements, system design, operating conditions, and performance expectations.' },
  { question: 'Do you provide bulk orders for large projects?', answer: 'Yes. We regularly support large-scale construction, industrial, and infrastructure projects with bulk procurement, coordinated deliveries, and project-specific sourcing solutions.' },
  { question: 'How quickly can products be delivered?', answer: 'Delivery times depend on product availability and project location. Stocked items can often be dispatched within 24 to 48 hours, while specialized products may require additional lead time.' },
  { question: 'Do you offer technical support after purchase?', answer: 'Yes. We provide ongoing technical assistance, product documentation, installation guidance, and support to help ensure successful project execution.' },
  { question: 'Can I request a quotation online?', answer: 'Yes. Simply submit your product list, specifications, or project requirements through our quotation form, and our team will provide a detailed quote as quickly as possible.' },
  { question: 'Do you maintain inventory for urgent requirements?', answer: 'Yes. We maintain stock of commonly requested products to support emergency replacements, maintenance work, and time-sensitive project schedules.' },
  { question: 'Do your products comply with industry standards?', answer: 'We source products from reputable manufacturers whose products comply with relevant international and industry standards, certifications, and quality requirements where applicable.' },
  { question: 'Can you source hard-to-find or specialty products?', answer: 'Yes. Through our supplier network, we can assist in locating and procuring specialized, project-specific, or difficult-to-source MEP and industrial components.' },
  { question: 'Why choose SuVi as your supply partner?', answer: 'We combine extensive product availability, multi-brand sourcing, technical expertise, responsive customer service, and reliable delivery to help projects stay on schedule and within budget.' },
];

export type FAQProps = {
  faqs?: FAQItem[];
  title?: string;
  bgClassName?: string;
};

export function FAQ({ faqs = defaultFaqs, title = 'Questions buyers ask us', bgClassName = 'bg-[#F4F6F9]' }: FAQProps = {}): ReactElement {
  const { ref: headingRef, inView } = useFaqReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className={`${bgClassName} pt-10 pb-16 lg:pt-12 lg:pb-20 ${faqRevealTransition} ${
      inView ? faqRevealShown : faqRevealHidden
    }`}>
      <div className="w-full max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div ref={headingRef} className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-gray-900 md:text-4xl" style={{ color: '#0B132B' }}>
            {title}
          </h2>
        </div>

        <div ref={containerRef} className="w-full space-y-4">
          {(showAll ? faqs : faqs.slice(0, 5)).map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`w-full ${faqRevealTransition} ${inView ? faqRevealShown : faqItemHidden}`}
                style={{ transitionDelay: inView ? faqItemDelay(index) : '0ms' }}
              >
                <div
                  className={`w-full rounded-2xl border bg-white shadow-sm transition-all duration-200 hover:shadow-md ${
                    isOpen ? 'border-2 border-[#D97706]' : 'border border-gray-200'
                  }`}
                  style={{ width: '100%', display: 'block' }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="w-full block text-left font-semibold text-lg text-[#0B132B]" style={{ display: 'block', width: '100%' }}>
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isOpen ? 'bg-[#D97706] text-white' : 'bg-[#0B132B] text-white'
                      }`}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ display: 'block', margin: 'auto' }}>
                        {isOpen ? (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        )}
                      </svg>
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ maxHeight: isOpen ? '200px' : '0px', opacity: isOpen ? 1 : 0 }}
                  >
                    <div className="w-full block text-left pt-2 pb-4 px-6 text-gray-600 leading-relaxed text-base border-t border-gray-100 mt-4">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {faqs.length > 5 && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="btn-outline inline-flex items-center gap-2"
            >
              {showAll ? 'Show Less' : 'View All FAQs'} <span aria-hidden="true">{showAll ? '↑' : '↓'}</span>
            </button>
          </div>
        )}

        <p className="mt-10 text-center text-sm text-gray-600">
          Still unsure? Call{' '}
          <span className="font-semibold text-[#E07A5F]">+971 4 000 0000</span> — an engineer, not a script, will answer.
        </p>
      </div>
    </section>
  );
}