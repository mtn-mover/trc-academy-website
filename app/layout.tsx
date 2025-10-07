import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import AuthSessionProvider from '@/src/components/providers/SessionProvider';
import CookieBanner from '@/src/components/CookieBanner';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://trctrainingacademy.com'),
  title: 'TRC Training Academy | Transform Your Soul\'s Work',
  description: 'Professional coach certification programs for mature professionals seeking transformation. Discover your calling and create meaningful impact in the second half of life.',
  keywords: 'coach certification, life coaching training, professional development, soul work, career transformation, mature professionals',
  authors: [{ name: 'Karen Florence' }],
  creator: 'TRC Training Academy',
  publisher: 'TRC Training Academy',
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
  openGraph: {
    title: 'TRC Training Academy | Your Soul\'s Work Awaits',
    description: 'Transform your wisdom into impact. Join our professional coaching programs designed for professionals 45+.',
    url: 'https://trctrainingacademy.com',
    type: 'website',
    locale: 'en_US',
    siteName: 'TRC Training Academy',
    images: [
      {
        url: '/images/karen.jpg',
        width: 1200,
        height: 630,
        alt: 'Karen Florence - TRC Training Academy Founder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TRC Training Academy',
    description: 'Transform your wisdom into impact. Professional coaching certification for 45+ professionals.',
    images: ['/images/karen.jpg'],
  },
  icons: {
    icon: [
      { url: '/images/favicon.ico', type: 'image/x-icon' },
      { url: '/images/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/images/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/images/apple-touch-icon.png',
  },
  manifest: '/images/site.webmanifest',
  appleWebApp: {
    title: 'TRC Academy',
    statusBarStyle: 'default',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1e40af',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'TRC Training Academy',
    alternateName: 'Tabula Rasa Coaching Training Academy',
    url: 'https://trctrainingacademy.com',
    logo: 'https://trctrainingacademy.com/images/logo.png',
    description: 'Professional coach certification programs specializing in transformational coaching, career coaching, and executive coaching with Psychosynthesis methodology.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '641 Fairview Rd.',
      addressLocality: 'Glenmoore',
      addressRegion: 'PA',
      postalCode: '19343',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-610-228-4145',
      email: 'karen@tabularasacoaching.com',
      contactType: 'Customer Service',
      availableLanguage: 'English',
    },
    founder: {
      '@type': 'Person',
      name: 'Karen Florence',
      jobTitle: 'Master Coach & Founder',
      description: 'Certified Professional Coach (CPC) and Certified Professional Resume Writer & Coach (CPRWC) with over 20 years of experience in transformational coaching.',
    },
    sameAs: [
      'https://www.linkedin.com/company/trc-training-academy',
      'https://trctrainingacademy.com',
    ],
    areaServed: {
      '@type': 'Place',
      name: 'United States',
    },
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <AuthSessionProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <CookieBanner />
        </AuthSessionProvider>
      </body>
    </html>
  );
}