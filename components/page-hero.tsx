import type { ReactElement } from 'react';
import Image from 'next/image';

type PageHeroProps = {
  title: string;
  description: string;
  image?: string;
};

export function PageHero({ title, description, image }: PageHeroProps): ReactElement {
  return (
    <div className="relative w-full flex flex-col justify-center items-start text-left pt-28 pb-16 px-4 min-h-[520px] bg-gray-950 overflow-hidden">
      {image && (
        <div className="absolute inset-0">
          <Image src={image} alt={title} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-black/70" />
        </div>
      )}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center items-start text-left">
        <h1
          className="opacity-0 font-heading text-4xl font-bold text-white md:text-5xl animate-slide-up"
          style={{ color: '#ffffff', textWrap: 'balance' as any, animationDelay: '0ms' }}
        >
          {title}
        </h1>
        <p
          className="opacity-0 mt-4 w-full max-w-2xl text-left text-gray-300 text-base leading-relaxed block animate-slide-up"
          style={{ width: '100%', maxWidth: '650px', display: 'block', animationDelay: '120ms' }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}