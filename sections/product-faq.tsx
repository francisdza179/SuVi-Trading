'use client';

import type { ReactElement } from 'react';
import {
  faqItemDelay,
  faqItemHidden,
  faqRevealHidden,
  faqRevealShown,
  faqRevealTransition,
  useFaqReveal,
} from './faq-reveal';

export type ProductFaqItem = { q: string; a: string };

/**
 * Product detail FAQ list. Same reveal as the site-wide FAQ accordion — the
 * product page is a server component, so the animation lives here.
 */
export function ProductFaq({ faqs }: { faqs: ProductFaqItem[] }): ReactElement {
  const { ref: headingRef, inView } = useFaqReveal<HTMLHeadingElement>();

  return (
    <section className={`${faqRevealTransition} ${inView ? faqRevealShown : faqRevealHidden}`}>
      <h2
        ref={headingRef}
        className="font-heading text-lg font-bold"
        style={{ color: '#0B132B', fontSize: '18px', fontWeight: '700' }}
      >
        Product FAQs
      </h2>
      <div className="mt-4 space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={`${index}-${faq.q}`}
            className={`rounded-xl border border-gray-200 bg-white p-4 ${faqRevealTransition} ${
              inView ? faqRevealShown : faqItemHidden
            }`}
            style={{ transitionDelay: inView ? faqItemDelay(index) : '0ms' }}
          >
            <p className="text-base font-semibold text-gray-900">{faq.q}</p>
            <p className="mt-2 text-base leading-relaxed text-gray-600">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
