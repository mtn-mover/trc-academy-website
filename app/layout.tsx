import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import AuthSessionProvider from '@/src/components/providers/SessionProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#1e40af',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen flex flex-col">
        <AuthSessionProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  );
}