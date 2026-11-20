import type { ReactElement } from 'react';
import Link from 'next/link';
import { Navigation } from '@/sections/navigation';
import { Footer } from '@/sections/footer';

export default function NotFoundPage(): ReactElement {
  return (
    <>
      <Navigation />
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-steel px-6 text-center text-insulation">
        <div className="w-full max-w-2xl" style={{ width: '100%', maxWidth: '42rem', marginLeft: 'auto', marginRight: 'auto' }}>
          <h1
            className="font-heading text-[72px] font-bold tracking-tight"
            style={{ whiteSpace: 'normal', wordBreak: 'normal', fontSize: '72px', fontWeight: 700, color: '#ef4444' }}
          >
            Error 404
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-insulation/80" style={{ width: '100%' }}>
            Looks like this page took a wrong turn in the pipework and went missing in transit. The route you requested isn&apos;t on our current blueprint — but we can still get your project back on track.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/" className="btn-primary inline-flex items-center gap-2">
              Back to Home
            </Link>
            <Link href="/products" className="inline-flex items-center gap-2 rounded border border-white/40 px-6 py-3 text-sm font-bold uppercase text-white transition hover:bg-white/10">
              Browse Products
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
