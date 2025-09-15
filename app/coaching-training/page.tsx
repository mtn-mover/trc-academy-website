import Image from 'next/image';
import Link from 'next/link';

export default function CoachingTrainingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Virtual Meeting Background */}
      <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Virtual_Meeting_1.jpg"
            alt="Virtual coaching session"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        {/* Dark overlay for text contrast - focused on upper area */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent z-10"></div>

        {/* Content positioned in upper third */}
        <div className="relative z-20 h-full flex items-start justify-center pt-24 lg:pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 tracking-tight leading-tight" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                Professional Coach Certification
              </h1>
              <p className="text-lg lg:text-xl text-white mb-8 leading-relaxed max-w-3xl mx-auto" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.8)'}}>
                Transform your wisdom into professional coaching excellence with our
                comprehensive certification program designed for mature professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Main Program Card */}
            <div className="bg-white border-2 border-trc-gold-200 rounded-lg overflow-hidden shadow-xl">
              <div className="bg-gradient-to-r from-trc-gold-600 to-trc-gold-700 text-white p-10">
                <div className="text-center">
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                    Professional Coach Certification Program
                  </h2>
                  <p className="text-xl lg:text-2xl text-white opacity-95 mb-6">
                    Complete Your Transformation • October 18, 2025
                  </p>
                  <div className="inline-flex items-baseline bg-white/20 rounded-lg px-6 py-3">
                    <span className="text-4xl font-bold">$6,999</span>
                    <span className="ml-2 text-lg opacity-90">Investment</span>
                  </div>
                </div>
              </div>

              <div className="p-10">
                {/* Program Overview */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-trc-gray-900 mb-6">Program Overview</h3>
                  <p className="text-lg text-trc-gray-700 leading-relaxed mb-6">
                    Our flagship Professional Coach Certification Program is a comprehensive 12-lesson 
                    journey that transforms your accumulated wisdom and life experience into professional 
                    coaching excellence. Using the revolutionary Tabula Rasa methodology, you&apos;ll master 
                    the art of soul-centered coaching while building a sustainable practice that honors 
                    your unique gifts.
                  </p>
                  <div className="bg-trc-blue-50 border-l-4 border-trc-blue-600 p-6 rounded-r-lg">
                    <p className="text-lg font-semibold text-trc-gray-900">
                      &ldquo;Where your wisdom meets your calling, transformation begins.&rdquo;
                    </p>
                  </div>
                </div>

                {/* What's Included */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-trc-gray-900 mb-6">What&apos;s Included</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <svg className="w-6 h-6 text-trc-gold-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-lg text-trc-gray-700">12 comprehensive training lessons</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-6 h-6 text-trc-gold-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-lg text-trc-gray-700">TRC Methodology mastery training</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-6 h-6 text-trc-gold-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-lg text-trc-gray-700">Soul-centered coaching techniques</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-6 h-6 text-trc-gold-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-lg text-trc-gray-700">Business building essentials</span>
                      </li>
                    </ul>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <svg className="w-6 h-6 text-trc-gold-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-lg text-trc-gray-700">Personal mentor coaching sessions</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-6 h-6 text-trc-gold-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-lg text-trc-gray-700">Practice labs and peer coaching</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-6 h-6 text-trc-gold-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-lg text-trc-gray-700">Lifetime alumni community access</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-6 h-6 text-trc-gold-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-lg text-trc-gray-700">TRC Professional Certification</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Program Structure */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-trc-gray-900 mb-6">Program Structure</h3>
                  <div className="bg-trc-gray-50 rounded-lg p-8">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                      <div>
                        <div className="text-3xl font-bold text-trc-gold-600 mb-2">12</div>
                        <p className="text-lg text-trc-gray-700">Comprehensive Lessons</p>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-trc-gold-600 mb-2">6</div>
                        <p className="text-lg text-trc-gray-700">Months Duration</p>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-trc-gold-600 mb-2">Oct 18</div>
                        <p className="text-lg text-trc-gray-700">2025 Start Date</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Perfect For */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-trc-gray-900 mb-6">Perfect For</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-trc-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <p className="text-lg text-trc-gray-700">
                        Mature professionals seeking meaningful second-act careers
                      </p>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-trc-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <p className="text-lg text-trc-gray-700">
                        Leaders ready to transform their wisdom into coaching excellence
                      </p>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-trc-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <p className="text-lg text-trc-gray-700">
                        Individuals called to make a profound impact through coaching
                      </p>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-trc-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <p className="text-lg text-trc-gray-700">
                        Those seeking depth, authenticity, and soul in their professional practice
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="inline-block px-8 py-4 bg-trc-gold-600 text-white font-semibold rounded-md hover:bg-trc-gold-700 transition-all duration-200 shadow-lg text-center text-lg"
                  >
                    Apply Now for October 2025
                  </a>
                  <a
                    href="/contact"
                    className="inline-block px-8 py-4 bg-white text-trc-gold-600 font-semibold rounded-md border-2 border-trc-gold-600 hover:bg-trc-gold-50 transition-all duration-200 text-center text-lg"
                  >
                    Schedule a Consultation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose TRC */}
      <section className="py-24 bg-trc-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-trc-gray-900 mb-16">
            The TRC Training Advantage
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-trc-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-trc-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-trc-gray-900 mb-4">TRC Certified</h3>
              <p className="text-lg text-trc-gray-600 leading-relaxed">
                Earn your TRC certification and join an elite community of transformational coaches.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-trc-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-trc-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-trc-gray-900 mb-4">Small Cohorts</h3>
              <p className="text-lg text-trc-gray-600 leading-relaxed">
                Intimate learning environments ensure personalized attention and deep connections.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-trc-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-trc-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-trc-gray-900 mb-4">Lifetime Support</h3>
              <p className="text-lg text-trc-gray-600 leading-relaxed">
                Join our alumni community for ongoing mentorship, resources, and connection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-trc-gray-900 mb-12">
              What Our Graduates Say
            </h2>
            <div className="bg-trc-blue-50 rounded-lg p-10 relative">
              <svg className="absolute top-4 left-4 w-8 h-8 text-trc-blue-200" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="text-xl text-trc-gray-700 leading-relaxed italic mb-6">
                &ldquo;The TRC program didn&apos;t just teach me coaching skills—it helped me discover my true calling. 
                At 52, I thought my best years were behind me. Now I&apos;m building a thriving practice that 
                combines everything I&apos;ve learned with a purpose that lights me up every day.&rdquo;
              </p>
              <p className="text-lg font-semibold text-trc-gray-900">
                Sarah M., TRC Certified Coach
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section with Summit Image */}
      <div className="relative">
        <Image
          src="/images/Summit_3.jpg"
          alt="Mountain summit representing transformation"
          width={1920}
          height={1080}
          className="w-full h-auto block"
          sizes="100vw"
        />
        {/* Subtle gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20"></div>

        {/* Text Content - Positioned in Sky Area */}
        <div className="absolute top-8 lg:top-16 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 tracking-tight leading-tight" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
              Your Coaching Journey Begins October 18, 2025
            </h2>
            <p className="text-lg lg:text-xl text-white mb-8 leading-relaxed max-w-3xl mx-auto" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.8)'}}>
              Limited seats available. Join our next cohort of transformational coaches
              and discover how your wisdom can change lives.
            </p>
          </div>
        </div>

        {/* Button - Positioned Below Person */}
        <div className="absolute bottom-6 md:bottom-8 lg:bottom-10 left-0 right-0">
          <div className="text-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-trc-blue-600 font-bold rounded-md hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl text-lg"
            >
              Apply for October 2025 Cohort
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}