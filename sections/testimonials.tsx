'use client';

import type { ReactElement } from 'react';

const testimonials = [
  { quote: 'SuVi Trading cut our procurement time significantly. Their team understands specs and delivers on schedule.', author: 'Ahmed Hassan', role: 'MEP Project Manager', company: 'Al Naboodah' },
  { quote: 'Reliable stock availability and clear technical support. Exactly what we need on tight construction timelines.', author: 'Sarah Lin', role: 'HVAC Contractor', company: 'Emirates MEP' },
  { quote: 'They source the right pumps and pipe supports for our projects without back-and-forth. Highly recommended.', author: 'Michael Torres', role: 'Procurement Lead', company: 'AECOM' },
  { quote: 'Fast delivery of copper pipes and insulation across multiple sites. A dependable supply partner.', author: 'Priya Nair', role: 'MEP Engineer', company: 'WSP' },
  { quote: 'Their technical team helped us size pumps correctly the first time, saving weeks of rework.', author: 'Omar Al Farsi', role: 'Facilities Manager', company: 'Emaar' },
  { quote: 'Consolidated deliveries and clear communication make SuVi our go-to for MEP hardware.', author: 'Daniel Weber', role: 'Project Director', company: 'Balfour Beatty' },
  { quote: 'Quality insulation and fittings, always in stock when we need them.', author: 'Fatima Al Zaabi', role: 'HVAC Specialist', company: 'Khansaheb' },
  { quote: 'Responsive after-sales support and genuine warranty handling.', author: 'James Carter', role: 'Operations Manager', company: 'Serco' },
  { quote: 'SuVi keeps our maintenance spares flowing with zero delays.', author: 'Layla Haddad', role: 'Facility Engineer', company: 'Majid Al Futtaim' },
  { quote: 'Clear technical advice and fast quotes across multiple brands.', author: 'Rajesh Kumar', role: 'Procurement Manager', company: 'Larsen & Toubro' },
  { quote: 'Dependable copper pipe stock with consistent quality.', author: 'Chen Wei', role: 'MEP Supervisor', company: 'China State Construction' },
  { quote: 'Their team understands BOQs and delivers phased supply perfectly.', author: 'Maria Gonzalez', role: 'Project Engineer', company: 'Bechtel' },
  { quote: 'Excellent support for pump selection and pipe sizing.', author: 'Thomas Müller', role: 'HVAC Lead', company: 'Siemens' },
  { quote: 'Reliable insulation delivery even on tight timelines.', author: 'Aisha Al Mansoori', role: 'Construction Manager', company: 'Arabtec' },
  { quote: 'A trusted partner for MEP hardware across our projects.', author: 'Robert Klein', role: 'Supply Chain Lead', company: 'Jacobs' },
  { quote: 'Professional service from quote to delivery note.', author: 'Nadia Petrov', role: 'Operations Director', company: 'KBR' },
];

const columns = [
  testimonials.slice(0, 4),
  testimonials.slice(4, 8),
  testimonials.slice(8, 12),
  testimonials.slice(12, 16),
];

export function Testimonials(): ReactElement {
  return (
    <section className="bg-[#F4F6F9] py-24 lg:py-28">
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div className="w-full text-center mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-gray-900 md:text-4xl" style={{ color: '#0B132B' }}>
            Trusted by contractors and engineers
          </h2>
          <p style={{ width: '100%', maxWidth: '672px', margin: '0 auto', display: 'block', textAlign: 'center', color: '#4b5563', fontSize: '1rem', lineHeight: '1.625' }}>
            Real feedback from MEP teams who rely on SuVi Trading for pumps, pipes, insulation, and more.
          </p>
        </div>

        {/* Mobile: single scrolling column with all testimonials */}
        <div className="md:hidden">
          <div
            className="relative h-[520px] overflow-hidden"
            style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}
          >
            <div className="flex flex-col gap-6 animate-marquee-vertical will-change-transform transform-gpu" style={{ animationDuration: '240s' }}>
              {[...testimonials, ...testimonials].map((t, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <p className="text-base leading-relaxed text-gray-700">
                    “{t.quote}”
                  </p>
                  <div className="mt-4 border-t border-gray-100 pt-3">
                    <p className="font-heading text-sm font-bold text-gray-900" style={{ color: '#0B132B' }}>
                      {t.author}
                    </p>
                    <p className="text-xs text-gray-500">{t.role} — {t.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 hidden md:grid md:grid-cols-2 lg:grid-cols-4">
          {columns.map((col, ci) => (
            <div
              key={ci}
              className="relative h-[520px] overflow-hidden"
              style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}
            >
              <div className="flex flex-col gap-6 animate-marquee-vertical will-change-transform transform-gpu">
                {[...col, ...col].map((t, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                  >
                    <p className="text-base leading-relaxed text-gray-700">
                      “{t.quote}”
                    </p>
                    <div className="mt-4 border-t border-gray-100 pt-3">
                      <p className="font-heading text-sm font-bold text-gray-900" style={{ color: '#0B132B' }}>
                        {t.author}
                      </p>
                      <p className="text-xs text-gray-500">{t.role} — {t.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}