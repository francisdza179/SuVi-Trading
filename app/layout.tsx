import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://suvi-trading.vercel.app/'),
  title: {
    default: 'SuVi Trading | Industrial Hardware & MEP Supplies',
    template: '%s | SuVi Trading',
  },
  description:
    'Reliable supplier of industrial hardware, pumps, copper pipes, insulation, and MEP consumables. Quality products and dependable supply solutions for businesses.',
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
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'SuVi Trading | Industrial Hardware & MEP Supplies',
    description:
      'Reliable supplier of industrial hardware, pumps, copper pipes, insulation, and MEP consumables. Quality products and dependable supply solutions for businesses.',
    images: ['/og-image.jpg'],
    url: 'https://suvi-trading.vercel.app/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SuVi Trading | Industrial Hardware & MEP Supplies',
    description:
      'Reliable supplier of industrial hardware, pumps, copper pipes, insulation, and MEP consumables. Quality products and dependable supply solutions for businesses.',
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
