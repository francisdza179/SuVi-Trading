import type { ReactElement } from 'react';

const partners = [
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

export function OurPartners(): ReactElement {
  return (
    <section className="bg-[#F4F6F9] py-16 lg:py-20">
      <div className="container-tight">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          Trusted Industry Partners
        </p>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
          {partners.map((partner) => (
            <div
              key={partner}
              className="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-6 text-center text-sm font-semibold text-gray-400 grayscale transition duration-300 hover:text-gray-900 hover:grayscale-0"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}