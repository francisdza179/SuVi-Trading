'use client';

import type { ReactElement } from 'react';

const videos = Array.from({ length: 24 }, (_, i) => `/videos/marquee/video${i + 1}.mp4`);

const row1 = [...videos.slice(0, 12), ...videos.slice(0, 12)];
const row2 = [...videos.slice(12, 24), ...videos.slice(12, 24)];

export function Industries(): ReactElement {
  return (
    <section className="relative overflow-hidden bg-[#0B132B] py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(224,122,95,0.12),transparent_60%)]" />
      <div
        className="relative"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex w-max animate-marquee items-center gap-6 will-change-transform transform-gpu">
            {row1.map((src, i) => (
              <div key={`r1-${i}`} className="w-80 shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-md transition-transform duration-300 hover:scale-[1.02] hover:border-white/30">
                <video
                  src={src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="flex w-max animate-marquee-reverse items-center gap-6 will-change-transform transform-gpu">
            {row2.map((src, i) => (
              <div key={`r2-${i}`} className="w-80 shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-md transition-transform duration-300 hover:scale-[1.02] hover:border-white/30">
                <video
                  src={src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}