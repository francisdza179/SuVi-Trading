import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'SuVi Trading',
    template: '%s | SuVi Trading',
  },
  description:
    'SuVi Trading supplies multi-brand industrial hardware — pumps, copper pipes, insulation, pipe supports, and MEP consumables — to contractors, engineers, and procurement teams.',
  keywords: [
    'industrial hardware',
    'MEP supplies',
    'pumps',
    'copper pipes',
    'insulation materials',
    'pipe supports',
    'HVAC supplies',
    'procurement',
  ],
  openGraph: {
    title: 'SuVi Trading',
    description:
      'Reliable industrial hardware supplies for MEP contractors, HVAC companies, and procurement teams.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="bg-insulation font-sans text-steel antialiased">
        {children}
      </body>
    </html>
  );
}
