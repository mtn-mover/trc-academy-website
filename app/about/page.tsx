import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Karen Florence | Founder & Master Coach | TRC Training Academy',
  description: 'Meet Karen Florence, CPC, CPRWC - Master Coach and founder of TRC Training Academy. With 20+ years of experience in transformational coaching, Psychosynthesis methodology, and career development. Discover her journey and approach to coaching.',
  keywords: [
    'Karen Florence',
    'master coach',
    'TRC Training Academy founder',
    'Certified Professional Coach',
    'Psychosynthesis coach',
    'career development coach',
    'transformational coaching expert',
    'ICF accredited trainer',
    'professional coach trainer',
    'executive coaching mentor',
  ],
  openGraph: {
    title: 'About Karen Florence | Founder & Master Coach | TRC Training Academy',
    description: 'Meet Karen Florence, CPC, CPRWC - Master Coach with 20+ years transforming lives through coaching. Founder of TRC Training Academy and expert in Psychosynthesis methodology.',
    url: 'https://trctrainingacademy.com/about',
    siteName: 'TRC Training Academy',
    images: [
      {
        url: 'https://trctrainingacademy.com/images/karen_new_2.jpg',
        width: 400,
        height: 500,
        alt: 'Karen Florence - Founder of TRC Training Academy',
      },
    ],
    locale: 'en_US',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Karen Florence | Founder & Master Coach | TRC Training Academy',
    description: 'Meet Karen Florence, CPC, CPRWC - Master Coach with 20+ years transforming lives through coaching and Psychosynthesis methodology.',
    images: ['https://trctrainingacademy.com/images/karen_new_2.jpg'],
  },
  alternates: {
    canonical: 'https://trctrainingacademy.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Gradient */}
      <section className="relative bg-gradient-to-br from-trc-blue-600 via-trc-blue-700 to-trc-blue-800 py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
              Meet Karen Florence
            </h1>
            <p className="text-xl lg:text-2xl text-trc-blue-100 leading-relaxed">
              Master Coach, Founder of TRC Training Academy, and Your Guide to Transformational Impact
            </p>
          </div>
        </div>
      </section>

      {/* Karen's Story Section - Enhanced Design */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                {/* Decorative background elements */}
                <div className="absolute -top-6 -left-6 w-72 h-72 bg-trc-gold-200 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-trc-blue-200 rounded-full opacity-20 blur-3xl"></div>

                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <Image
                    src="/images/karen_new_2.jpg"
                    alt="Karen Florence - Founder of TRC Training Academy"
                    width={600}
                    height={700}
                    className="w-full h-auto object-cover"
                  />
                  {/* Gradient overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-block px-4 py-2 bg-trc-gold-100 text-trc-gold-800 rounded-full text-sm font-semibold mb-6">
                20+ Years of Transformational Impact
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-trc-gray-900 mb-8 leading-tight">
                From Crisis to Calling
              </h2>

              <div className="space-y-6 text-lg text-trc-gray-700 leading-relaxed">
                <p className="text-lg">
                  For two decades, Karen Florence has been a beacon of transformation for professionals
                  seeking deeper meaning in their life&apos;s work. Her journey began not in a classroom,
                  but in the crucible of her own midlife awakening during the 2008 economic crash. Like
                  many, she lost the stability of secure employment. She immersed herself a profound journey
                  and came to the realization that success without soul satisfaction is merely existing,
                  not truly living.
                </p>

                <div className="bg-gradient-to-r from-trc-blue-50 to-trc-gold-50 border-l-4 border-trc-blue-600 p-6 rounded-r-lg my-6">
                  <p className="text-lg font-semibold text-trc-gray-900 italic">
                    &ldquo;That moment of crisis became my greatest gift—it forced me to discover
                    who I truly was beyond my job title and paycheck.&rdquo;
                  </p>
                </div>

                <p className="text-lg">
                  Tabula Rasa Coaching was launched after Karen received her first coaching certification.
                  Her coaching practice includes Psychosynthesis coaching, Executive coaching and Corporate
                  coaching. Karen&apos;s practice has taken her around the globe offering workshops in the
                  UAE for several years and even providing personal coaching to a member of royalty in Oman.
                  In 2018 She became an external coach for Cisco&apos;s elite coaching program.
                </p>

                <p className="text-lg">
                  After 18 years of coaching Karen decided it was time to teach her method of coaching to
                  others who want to make a difference. She founded TRC Training Academy in 2023. Karen has
                  developed the revolutionary Tabula Rasa methodology, which honors the blank slate within
                  each of us—ready to be inscribed with purpose, passion, and profound impact. Her approach
                  transcends traditional coaching methodologies, weaving together psychological wisdom,
                  spiritual insight, and practical business acumen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Impact Section - New */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-trc-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-trc-gray-900 mb-4">
              Global Impact & Recognition
            </h2>
            <p className="text-xl text-trc-gray-600 max-w-3xl mx-auto">
              Karen&apos;s expertise has transformed lives across continents
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* UAE Workshops */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-trc-blue-600">
              <div className="w-16 h-16 bg-gradient-to-br from-trc-blue-500 to-trc-blue-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-trc-gray-900 mb-3">International Workshops</h3>
              <p className="text-lg text-trc-gray-700 leading-relaxed">
                Led transformational coaching workshops in the United Arab Emirates, bringing her
                methodology to diverse international audiences.
              </p>
            </div>

            {/* Royalty Coaching */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-trc-gold-600">
              <div className="w-16 h-16 bg-gradient-to-br from-trc-gold-500 to-trc-gold-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-trc-gray-900 mb-3">Elite Clientele</h3>
              <p className="text-lg text-trc-gray-700 leading-relaxed">
                Trusted advisor to high-profile clients including members of royalty in Oman,
                demonstrating her exceptional coaching expertise.
              </p>
            </div>

            {/* Cisco Partnership */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-teal-600">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-trc-gray-900 mb-3">Corporate Excellence</h3>
              <p className="text-lg text-trc-gray-700 leading-relaxed">
                External coach for Cisco&apos;s elite coaching program since 2018, serving
                top-tier executives at one of the world&apos;s leading technology companies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section with Quote */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-trc-blue-600 via-trc-blue-700 to-trc-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <svg className="w-16 h-16 text-trc-gold-400 mx-auto mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="text-2xl lg:text-4xl font-bold text-white mb-8 leading-relaxed" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
            I believe that the second half of life holds our greatest potential for impact.
            When we combine our accumulated wisdom with our soul&apos;s true calling,
            we don&apos;t just change careers—we transform lives, starting with our own.
          </blockquote>
          <p className="text-xl text-trc-blue-100 font-semibold">
            — Karen Florence, Founder of TRC Training Academy
          </p>
        </div>
      </section>

      {/* The Tabula Rasa Methodology */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-trc-gold-100 text-trc-gold-800 rounded-full text-sm font-semibold mb-6">
              Our Unique Approach
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-trc-gray-900 mb-6">
              The Tabula Rasa Methodology
            </h2>
            <p className="text-xl text-trc-gray-600 max-w-3xl mx-auto">
              A revolutionary approach that honors the blank slate within each of us
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Transform */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-trc-blue-500 to-trc-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">T</span>
              </div>
              <h3 className="text-2xl font-bold text-trc-gray-900 mb-4">Transform</h3>
              <p className="text-lg text-trc-gray-700 leading-relaxed">
                Begin with your own transformation. Dive deep into your inner landscape,
                releasing old patterns and discovering your authentic self.
              </p>
            </div>

            {/* Realize */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-trc-gold-500 to-trc-gold-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">R</span>
              </div>
              <h3 className="text-2xl font-bold text-trc-gray-900 mb-4">Realize</h3>
              <p className="text-lg text-trc-gray-700 leading-relaxed">
                Realize your unique gifts and calling. Understand how your life experiences
                have prepared you for this profound work.
              </p>
            </div>

            {/* Connect */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">C</span>
              </div>
              <h3 className="text-2xl font-bold text-trc-gray-900 mb-4">Connect</h3>
              <p className="text-lg text-trc-gray-700 leading-relaxed">
                Connect authentically with those you serve. Build a coaching practice
                rooted in genuine presence and transformational impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action with Summit Image */}
      <section className="relative py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Summit_3.jpg"
            alt="Mountain summit representing transformation"
            fill
            style={{ objectFit: 'cover' }}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
              Ready to Begin Your<br />Transformation Journey?
            </h2>
            <p className="text-xl lg:text-2xl text-white max-w-4xl mx-auto mb-12 leading-relaxed" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.8)'}}>
              Join Karen and discover how your life experience can become your greatest
              professional asset in service to others.
            </p>
            <Link
              href="/contact"
              className="inline-block px-12 py-5 bg-gradient-to-r from-trc-gold-500 to-trc-gold-600 text-white font-bold rounded-lg hover:from-trc-gold-600 hover:to-trc-gold-700 hover:scale-105 transform transition-all duration-300 shadow-2xl text-lg"
            >
              Schedule a Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
