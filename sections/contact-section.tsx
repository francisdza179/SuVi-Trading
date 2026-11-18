"use client";

import type { ReactElement } from 'react';
import { useState } from 'react';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';

export function ContactSection(): ReactElement {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-insulation py-20 lg:py-28">
      <div className="container-tight">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Contact details */}
          <div>
            <h2 className="font-heading text-3xl font-bold text-steel md:text-4xl">
              Request a quote or ask a technical question
            </h2>
            <p className="mt-6 text-steel-300">
              Tell us what you need. Our team will review your requirements and respond with availability, pricing, and lead times.
            </p>

            <div className="mt-10 space-y-6">
              <div>
                <p className="font-heading text-xs font-bold uppercase tracking-wider text-copper">Email</p>
                <p className="mt-1 text-steel">info@suvitrading.com</p>
              </div>
              <div>
                <p className="font-heading text-xs font-bold uppercase tracking-wider text-copper">Phone</p>
                <p className="mt-1 text-steel">+971 4 123 4567</p>
              </div>
              <div>
                <p className="font-heading text-xs font-bold uppercase tracking-wider text-copper">Location</p>
                <p className="mt-1 text-steel">Dubai, United Arab Emirates</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bevel-card p-6 md:p-8">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blueprint/10">
                  <span className="text-2xl text-blueprint">✓</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-steel">Quote request received</h3>
                <p className="mt-2 text-sm text-steel-400">
                  We will review your requirements and get back to you within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <Input label="Name" name="name" type="text" placeholder="Your name" required />
                  <Input label="Company" name="company" type="text" placeholder="Company name" />
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <Input label="Email" name="email" type="email" placeholder="you@company.com" required />
                  <Input label="Phone" name="phone" type="tel" placeholder="+971 ..." />
                </div>
                <Input
                  label="Products / Categories"
                  name="products"
                  type="text"
                  placeholder="e.g. Pumps, Copper Pipes, Insulation"
                />
                <Textarea
                  label="Project Details"
                  name="details"
                  placeholder="Tell us about quantities, specifications, and delivery requirements."
                  required
                />
                <Button type="submit" variant="accent" className="w-full md:w-auto">
                  Send Quote Request
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
