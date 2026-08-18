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
    default: 'Aliyan Gohar | Senior Frontend Developer & Systems Engineer',
    template: '%s | Aliyan Gohar',
  },
  description:
    'Explore the portfolio of Aliyan Gohar, a developer specializing in modern React, Next.js, 3D Web interfaces, secure infrastructure, and full-stack cloud solutions.',
  keywords: [
    'Aliyan Gohar',
    'Frontend Developer',
    'Next.js Developer',
    'React Engineer',
    'Three.js 3D Web',
    'Web Automation',
    'Lahore Developer',
    'Full Stack Engineer',
    'IT Support Engineer',
    'Fortinet FortiGate Firewall',
    'TypeScript Engineer',
  ],
  authors: [{ name: 'Aliyan Gohar', url: 'https://aliyannn.vercel.app' }],
  creator: 'Aliyan Gohar',
  publisher: 'Aliyan Gohar',
  alternates: {
    canonical: 'https://aliyannn.vercel.app',
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/favicon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aliyannn.vercel.app/',
    title: 'Aliyan Gohar | Senior Frontend Developer & Systems Engineer',
    description:
      'Explore the portfolio of Aliyan Gohar, a developer specializing in modern React, Next.js, 3D Web interfaces, secure infrastructure, and full-stack cloud solutions.',
    siteName: 'Aliyan Gohar Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aliyan Gohar - Senior Frontend Developer & Systems Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aliyan Gohar | Senior Frontend Developer & Systems Engineer',
    description:
      'Explore the portfolio of Aliyan Gohar, a developer specializing in modern React, Next.js, 3D Web interfaces, secure infrastructure, and full-stack cloud solutions.',
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
      jobTitle: 'Senior Frontend Developer & Systems Engineer',
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
        'Fortinet FortiGate Firewall',
        'Network Security',
        'AI Workflows & Vibe Coding',
        'Full Stack Cloud Integrations',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://aliyannn.vercel.app/#website',
      url: 'https://aliyannn.vercel.app',
      name: 'Aliyan Gohar Portfolio',
      publisher: { '@id': 'https://aliyannn.vercel.app/#person' },
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://aliyannn.vercel.app/#business',
      name: 'Aliyan Gohar Full Stack & Systems Services',
      url: 'https://aliyannn.vercel.app',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lahore',
        addressCountry: 'PK',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '4',
        bestRating: '5',
        worstRating: '1',
      },
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
