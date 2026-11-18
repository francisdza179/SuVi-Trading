'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * One entrance for every FAQ block on the site: same transition, same trigger,
 * same stagger. Import these instead of re-declaring the values per page.
 */
export const faqRevealTransition =
  'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none';

export const faqRevealHidden = 'opacity-0 translate-y-6';
export const faqRevealShown = 'opacity-100 translate-y-0';
export const faqItemHidden = 'opacity-0 translate-y-5';
export const faqItemDelay = (index: number): string => `${120 + index * 90}ms`;

/**
 * Fires once when the FAQ heading is 60% visible. Watching the heading rather
 * than the whole section keeps the trigger identical even when the accordion
 * is expanded to twelve questions.
 */
export function useFaqReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // `top < 0` covers landing below the heading (scroll restoration).
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
