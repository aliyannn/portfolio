import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aliyannn.vercel.app'),
  title: {
    default: 'Aliyan Gohar | Frontend Developer & Systems Engineer',
    template: '%s | Aliyan Gohar',
  },
  description:
    'Portfolio of Aliyan Gohar - Senior Frontend & Web Developer specializing in React, Next.js, TypeScript, modern 3D UI, and cloud automations.',
  keywords: [
    'Aliyan Gohar',
    'Frontend Developer',
    'React Engineer',
    'Next.js',
    'TypeScript',
    'Three.js',
    'Tailwind CSS',
    'Systems Engineer',
    'Fortinet FortiGate',
    'Portfolio',
  ],
  authors: [{ name: 'Aliyan Gohar', url: 'https://aliyannn.vercel.app' }],
  creator: 'Aliyan Gohar',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aliyannn.vercel.app/',
    title: 'Aliyan Gohar | Frontend Developer & Systems Engineer',
    description:
      'Explore interactive web applications, high-performance UI systems, and engineering projects by Aliyan Gohar.',
    siteName: 'Aliyan Gohar Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aliyan Gohar - Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aliyan Gohar | Frontend Developer & Systems Engineer',
    description:
      'Explore interactive web applications, high-performance UI systems, and engineering projects by Aliyan Gohar.',
    creator: '@aliyannn',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://aliyannn.vercel.app/#person',
      name: 'Aliyan Gohar',
      jobTitle: 'Frontend Developer & IT Systems Engineer',
      url: 'https://aliyannn.vercel.app',
      sameAs: [
        'https://github.com/aliyannn',
        'https://www.linkedin.com/in/allygohar/',
      ],
      knowsAbout: [
        'React',
        'Next.js',
        'TypeScript',
        'Three.js',
        'Tailwind CSS',
        'Fortinet FortiGate',
        'Network Security',
        'AI Workflows',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://aliyannn.vercel.app/#website',
      url: 'https://aliyannn.vercel.app',
      name: 'Aliyan Gohar Portfolio',
      publisher: { '@id': 'https://aliyannn.vercel.app/#person' },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark scroll-smooth ${jakartaSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#030712] text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
