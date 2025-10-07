import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Schedule Your Free Consultation | TRC Training Academy',
  description: 'Schedule your free consultation with TRC Training Academy. Get answers about our ICF-accredited professional coach certification program, enrollment dates, pricing, and payment options. Contact Karen Florence directly.',
  keywords: [
    'contact TRC Training Academy',
    'coach certification consultation',
    'schedule coaching consultation',
    'ICF coach training inquiry',
    'professional coaching enrollment',
    'career coaching certification contact',
    'coach training questions',
    'TRC Academy Pennsylvania',
    'coaching program consultation',
  ],
  openGraph: {
    title: 'Contact Us | Schedule Your Free Consultation | TRC Training Academy',
    description: 'Schedule your free consultation with TRC Training Academy. Learn about our ICF-accredited professional coach certification program and get all your questions answered.',
    url: 'https://trctrainingacademy.com/contact',
    siteName: 'TRC Training Academy',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us | Schedule Your Free Consultation | TRC Training Academy',
    description: 'Schedule your free consultation with TRC Training Academy. Learn about our ICF-accredited professional coach certification program.',
  },
  alternates: {
    canonical: 'https://trctrainingacademy.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
