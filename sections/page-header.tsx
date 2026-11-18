import type { ReactElement } from 'react';
import Image from 'next/image';

type PageHeaderProps = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export function PageHeader({ title, description, image, imageAlt }: PageHeaderProps): ReactElement {
  return (
    <section className="relative overflow-hidden text-insulation">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-steel-darker/80 to-steel-dark/70" />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="container-tight relative flex min-h-[400px] items-center py-20 lg:py-28">
        <div className="w-full max-w-3xl" style={{ width: '100%', maxWidth: '48rem', display: 'block' }}>
          <h1
            className="contact-hero-title mt-4 w-full font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl"
            style={{
              writingMode: 'horizontal-tb',
              wordBreak: 'normal',
              whiteSpace: 'normal',
              width: 'auto',
              maxWidth: 'none',
              display: 'block',
              flexDirection: 'row',
              color: '#ffffff',
              textShadow: '0 2px 8px rgba(0,0,0,0.6)',
            }}
          >
            {title}
          </h1>
          <p
            className="contact-hero-desc mt-6 w-full text-lg leading-relaxed text-white/90 md:text-xl"
            style={{
              writingMode: 'horizontal-tb',
              wordBreak: 'normal',
              whiteSpace: 'normal',
              width: 'auto',
              maxWidth: 'none',
              display: 'block',
              flexDirection: 'row',
              color: '#ffffff',
              textShadow: '0 1px 6px rgba(0,0,0,0.6)',
            }}
          >
            {description}
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 blueprint-grid-sm opacity-10" />
    </section>
  );
}
