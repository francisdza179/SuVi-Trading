import type { ReactElement } from 'react';

const brands = [
  'Grundfos',
  'Armstrong',
  'Danfoss',
  'Belimo',
  'Uponor',
  'Viega',
  'Honeywell',
  'Siemens',
  'Johnson Controls',
  'Carrier',
];

export function BrandMarquee({
  colorful = false,
  showLabel = true,
}: {
  colorful?: boolean;
  showLabel?: boolean;
}): ReactElement {
  const loop = [...brands, ...brands];

  return (
    <section className="bg-white py-8">
      <div className="container-tight">
        {showLabel ? (
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Trusted Manufacturers &amp; Brand Partners
          </p>
        ) : null}
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
          <div className="flex w-max animate-[marquee_25s_linear_infinite] items-center gap-16">
            {loop.map((brand, index) => (
              <span
                key={`${brand}-${index}`}
                className={`whitespace-nowrap text-2xl font-bold transition duration-300 ${
                  colorful ? 'text-gray-900' : 'text-gray-300 grayscale hover:text-gray-900 hover:grayscale-0'
                }`}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}