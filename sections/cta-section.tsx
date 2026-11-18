import type { ReactElement } from 'react';
import Link from 'next/link';

type CTASectionProps = {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function CTASection({
  title = 'Ready to source your next project?',
  description = 'Send us your bill of materials or product list. We will confirm availability and pricing fast.',
  primaryHref = '/contact',
  primaryLabel = 'Request a Quote',
  secondaryHref = '/products',
  secondaryLabel = 'Explore Products',
}: CTASectionProps): ReactElement {
  return (
    <section className="relative overflow-hidden bg-blueprint py-20 text-insulation lg:py-28">
      <div className="container-tight relative z-10">
        <div className="cta-content mx-auto text-center">
          <h2 className="cta-heading font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="cta-description mt-6 text-lg text-blueprint-900">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href={primaryHref} className="btn-accent" style={{ minWidth: '240px' }}>
              {primaryLabel}
            </Link>
            <Link
              href={secondaryHref}
              className="btn-accent"
              style={{
                minWidth: '240px',
                backgroundColor: 'transparent',
                borderColor: 'var(--color-insulation)',
                color: 'var(--color-insulation)',
              }}
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 blueprint-grid-sm opacity-10" />
    </section>
  );
}
