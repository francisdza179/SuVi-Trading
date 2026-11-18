'use client';

import type { ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const coreValues = [
  {
    title: 'Reliability',
    description: 'We understand that project schedules depend on timely procurement. Every inquiry, quotation, and delivery is handled with professionalism, accountability, and attention to detail.',
  },
  {
    title: 'Customer Commitment',
    description: 'Our customers\' success is at the center of everything we do. We strive to provide responsive service, practical solutions, and long-term support rather than one-time transactions.',
  },
  {
    title: 'Technical Understanding',
    description: 'We work closely with engineers, consultants, and contractors to understand project requirements and recommend products that align with technical specifications and operational needs.',
  },
  {
    title: 'Integrity & Transparency',
    description: 'We believe in honest communication, fair recommendations, and transparent business practices. Customers can expect clear information regarding pricing, availability, lead times, and alternatives.',
  },
  {
    title: 'Quality Focus',
    description: 'We are committed to supplying products sourced from reputable manufacturers and suppliers that meet industry expectations for reliability, performance, and durability.',
  },
  {
    title: 'Continuous Improvement',
    description: 'The needs of the construction and MEP industries continue to evolve. We remain committed to expanding our capabilities, strengthening supplier relationships, and improving the value we deliver to our customers.',
  },
];

export function MissionVisionValues(): ReactElement {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-20 lg:py-28">
      <div className="container-tight">
        <div className={`grid gap-10 transition-all duration-700 ease-out lg:grid-cols-2 lg:gap-16 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight" style={{ color: '#0B132B' }}>
              Mission
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              Our mission is to become the trusted sourcing and procurement partner for contractors, consultants, facility managers, and engineering teams throughout the UAE by delivering dependable access to quality MEP and industrial products.
            </p>
            <p className="mt-4 leading-relaxed text-gray-600">
              We are committed to simplifying procurement through responsive service, technical understanding, transparent communication, and access to multiple leading manufacturers. By helping customers source the right products efficiently and reliably, we aim to support successful project execution across every stage of the construction, infrastructure, and facility management lifecycle.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight" style={{ color: '#0B132B' }}>
              Vision
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              Our vision is to be recognized as one of the UAE's most reliable and customer-focused industrial trading companies, known for bridging technical requirements with practical supply solutions.
            </p>
            <p className="mt-4 leading-relaxed text-gray-600">
              We aspire to build long-term relationships based on trust, consistency, and accountability, becoming the preferred procurement partner for organizations that value quality products, responsive support, and dependable delivery. As we grow, we aim to expand our product offerings, strengthen our supplier network, and contribute to the success of projects across the region.
            </p>
          </div>
        </div>

        <div className="group relative mt-12 aspect-video w-full overflow-hidden rounded-2xl shadow-xl">
          <Image
            src="/modern-uae-infrastructure.jpg"
            alt="Modern UAE Infrastructure"
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="100vw"
          />
        </div>

        <div className="mt-14">
          <h2 className="font-heading text-2xl font-bold tracking-tight" style={{ color: '#0B132B' }}>
            Core Values
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {coreValues.map((value) => (
              <div key={value.title} className="rounded-2xl border border-slate-100 bg-[#F7F7F8] p-5">
                <h3 className="font-heading text-sm font-bold" style={{ color: '#0B132B' }}>
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h3 className="font-heading text-xl font-bold" style={{ color: '#0B132B' }}>
            Committed to Quality &amp; Compliance
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            Our responsibility to our clients, partners, and the environment goes beyond delivery. We adhere to rigorous standards across quality assurance, workplace safety, and environmental stewardship.
          </p>
          <Link
            href="/about/qhse"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#C46A3A] transition hover:text-[#A0552D]"
          >
            View our full QHSE Policy →
          </Link>
        </div>
      </div>
    </section>
  );
}