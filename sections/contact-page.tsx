"use client";

import type { ReactElement } from 'react';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';
import { Button } from '@/components/button';
import { PageHero } from '@/components/page-hero';

type Branch = {
  name: string;
  badge: string;
  address: string;
  phone: string;
  hours: string;
  href: string;
};

const branches: Branch[] = [
  { name: 'Dubai HQ', badge: 'HEAD OFFICE', address: 'Al Quoz Industrial Area 3, Dubai, UAE', phone: '+971 4 123 4567', hours: 'Sat–Thu 8AM–6PM', href: 'https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Dubai' },
  { name: 'Abu Dhabi — Mussafah', badge: 'BRANCH', address: 'Mussafah Industrial Area, Abu Dhabi, UAE', phone: '+971 2 123 4567', hours: 'Sat–Thu 7AM–6PM', href: 'https://maps.google.com/?q=Mussafah+Industrial+Area+Abu+Dhabi' },
  { name: 'Sharjah Warehouse', badge: 'WAREHOUSE', address: 'Industrial Area, Sharjah, UAE', phone: '+971 6 123 4567', hours: 'Sat–Thu 8AM–6PM', href: 'https://maps.google.com/?q=Industrial+Area+Sharjah' },
];

const steps = [
  { n: '1', title: 'Submit RFQ', pill: 'Now', desc: 'Send the form above with category, quantity and urgency. You’ll get a reference instantly.' },
  { n: '2', title: 'Review within 30 min', pill: '≤ 30 min', desc: 'Our sales engineer checks specs, stock in Dubai / Sharjah and best brand options.' },
  { n: '3', title: 'Quote within 2 hrs', pill: '≤ 2 hrs', desc: 'You receive a priced quote with delivery options across the UAE. No obligation.' },
  { n: '4', title: 'Dispatch', pill: 'Same-day', desc: 'Confirm and we dispatch — same-day in Dubai, next-day UAE-wide for stocked items.' },
];

function Icon({ name }: { name: string }): ReactElement | null {
  const common = 'h-5 w-5 text-copper';
  switch (name) {
    case 'address':
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case 'phone':
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.3a1 1 0 01.95.68l1.1 3.3a1 1 0 01-.25 1.03L7.3 9.8a11 11 0 005.9 5.9l1.8-1.8a1 1 0 011.03-.25l3.3 1.1a1 1 0 01.68.95V18a2 2 0 01-2 2h-1C10.4 20 4 13.6 4 6V5z" />
        </svg>
      );
    case 'mail':
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6" />
        </svg>
      );
    case 'clock':
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg className={common} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.5 3.5A11 11 0 003.6 18.6L2 22l3.5-1.5A11 11 0 1020.5 3.5zM12 20a8 8 0 01-4.1-1.1l-.3-.2-2.4 1 .9-2.3-.2-.3A8 8 0 1112 20zm4.3-6.1c-.2-.1-1.3-.7-1.5-.7s-.4-.1-.5.1-.5.7-.6.8-.3.2-.5.1a6.6 6.6 0 01-3.2-2.8c-.2-.4 0-.4.2-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.4 0-.1 0-.3-.1-.4s-.5-1.2-.7-1.6-.4-.3-.5-.3h-.4c-.1 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.3c.1.2 1.6 2.4 3.9 3.4.5.2.9.3 1.3.4.5.2 1 .2 1.3.1.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1z" />
        </svg>
      );
    default:
      return null;
  }
}

export function ContactPage(): ReactElement {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleFiles = (files: FileList | null): void => {
    if (files && files.length > 0) setFileName(files[0].name);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setDragOver(false);
    handleFiles(event.dataTransfer.files);
  };

  return (
    <>
      {/* Hero */}
      <PageHero
        title="Contact Us — Get Your Quote Today"
        description="Tell us what you need. Our Dubai team will price it, check stock, and confirm delivery — fast."
        image="/hero/contact.png"
      />

      {/* Main grid */}
      <section className="bg-insulation py-16 lg:py-24">
        <div className="container-tight">
          <div className="contact-main-grid relative z-0 grid items-start gap-8 lg:grid-cols-2 lg:gap-10" style={{ position: 'relative', zIndex: 0 }}>
            {/* Left: form */}
            <div className="bevel-card p-6 md:p-8">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blueprint/10">
                    <span className="text-2xl text-blueprint">✓</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-steel">Quote request received</h3>
                  <p className="mt-2 text-sm text-steel-400">
                    We will review your requirements and get back to you within 2 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="font-heading text-2xl font-bold text-steel">Request a Quote</h2>
                  <div className="grid gap-5 md:grid-cols-2">
                    <Input label="Full Name" name="fullName" type="text" placeholder="Your full name" required />
                    <Input label="Company Name" name="company" type="text" placeholder="Company name" />
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <Input label="Email" name="email" type="email" placeholder="you@company.com" required />
                    <Input label="Phone" name="phone" type="tel" placeholder="+971 ..." />
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-heading text-sm font-medium text-steel" htmlFor="category">
                        Product Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        className="rounded-md border border-concrete-300 bg-insulation px-4 py-3 font-body text-steel focus:border-blueprint focus:outline-none focus:ring-1 focus:ring-blueprint"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select a category
                        </option>
                        {['Pumps', 'Copper Pipes', 'Thermal Insulation', 'Pipes & Fittings', 'Pipe Supports & Hangers', 'Valves', 'HVAC Accessories', 'Refrigeration Components', 'Industrial Consumables'].map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-heading text-sm font-medium text-steel" htmlFor="urgency">
                        Urgency
                      </label>
                      <select
                        id="urgency"
                        name="urgency"
                        className="rounded-md border border-concrete-300 bg-insulation px-4 py-3 font-body text-steel focus:border-blueprint focus:outline-none focus:ring-1 focus:ring-blueprint"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select urgency
                        </option>
                        {['Standard', 'Urgent (24h)', 'Critical (same day)'].map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <Textarea label="Message" name="message" placeholder="Tell us about quantities, specifications, and delivery requirements." required />
                  {/* Dropzone */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={onDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`cursor-pointer rounded-md border-2 border-dashed p-6 text-center transition ${
                      dragOver ? 'border-copper bg-copper/5' : 'border-concrete-300 bg-concrete-50'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFiles(e.target.files)}
                    />
                    <p className="font-heading text-sm font-semibold text-steel">Drag &amp; drop your BOQ here</p>
                    <p className="mt-1 text-xs text-steel-400">or click to browse (PDF, XLSX, CSV)</p>
                    {fileName && <p className="mt-3 text-sm text-copper">{fileName}</p>}
                  </div>
                  <label className="flex items-start gap-3 text-sm text-steel-300">
                    <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-concrete-300 text-blueprint focus:ring-blueprint" />
                    <span>
                      I agree to the privacy policy and consent to being contacted about my request.
                    </span>
                  </label>
                  <Button type="submit" variant="accent" className="w-full md:w-auto">
                    Submit Quote Request
                  </Button>
                </form>
              )}
            </div>

            {/* Right: contact info + map */}
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: 'address', label: 'Office Address', value: 'Al Quoz Industrial Area 3, Dubai, UAE' },
                  { icon: 'phone', label: 'Phone & WhatsApp', value: '+971 4 123 4567' },
                  { icon: 'mail', label: 'Email', value: 'quotes@suvitrading.ae' },
                  { icon: 'clock', label: 'Working Hours', value: 'Sat–Thu, 8:00 AM – 6:00 PM' },
                ].map((item) => (
                  <div key={item.label} className="bevel-card p-5">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-copper/10">
                      <Icon name={item.icon} />
                    </div>
                    <p className="font-heading text-xs font-bold uppercase tracking-wider text-copper">{item.label}</p>
                    <p className="mt-1 text-sm text-steel">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="contact-map-card bevel-card w-full max-w-full overflow-hidden p-0">
                <div className="relative h-64 w-full max-w-full overflow-hidden">
                  <iframe
                    title="SuVi Trading - Al Quoz Dubai"
                    src="https://www.google.com/maps?q=Al+Quoz+Industrial+Area+3+Dubai&output=embed"
                    className="h-full w-full max-w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="p-5">
                  <p className="font-heading text-sm font-bold text-steel">Al Quoz, Dubai</p>
                  <p className="text-xs text-steel-400">Visit our HQ showroom &amp; warehouse</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branches */}
      <section className="contact-branches-section bg-concrete-100 py-20 lg:py-28" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="container-tight">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-3xl font-bold text-steel md:text-4xl">Our Branches</h2>
            <p className="mt-3 text-sm text-steel-400">Visit us or request delivery anywhere in the UAE.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {branches.map((b, index) => (
              <div key={b.name} className={`flex flex-col items-center text-center gap-2 py-4 ${index < branches.length - 1 ? 'md:border-r md:border-slate-200 md:pr-6' : ''}`}>
                <h3 className="font-heading text-lg font-bold text-steel">{b.name}</h3>
                <p className="text-sm text-steel-300">{b.address}</p>
                <p className="text-sm text-steel-300">{b.phone}</p>
                <p className="text-sm text-steel-300">{b.hours}</p>
                <a
                  href={b.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block whitespace-nowrap text-sm font-semibold text-[#C46A3A] transition hover:text-[#A0552D]"
                >
                  Get directions
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>


    </>
  );
}
