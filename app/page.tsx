import Link from 'next/link';
import Image from 'next/image';
import ScrollAnimation from '../src/components/ScrollAnimation';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - With Background Image */}
      <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Remote_Coaching_1.jpg"
            alt="Professional coaching session"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
            }}
            priority
          />
        </div>

        {/* Dark overlay only at bottom 30% for text area */}
        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black/90 via-black/70 to-transparent z-10"></div>

        {/* Content positioned at absolute bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 lg:pb-12">
            <div className="text-left lg:text-center">
              <p className="text-lg text-white mb-4 tracking-wide" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.6)'}}>
                TRC Training Academy
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 tracking-tight leading-tight" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                Where Wisdom and Experience Impacts Transformation
              </h1>
              <p className="text-lg lg:text-xl text-white mb-8 leading-relaxed max-w-3xl lg:mx-auto" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.8)'}}>
                Your wisdom, experience, and calling converge here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 lg:justify-center">
                <Link
                  href="/coaching-training"
                  className="px-8 py-4 bg-trc-blue-600 text-white font-bold rounded-md hover:bg-trc-blue-700 hover:scale-105 transition-all duration-300 shadow-xl text-lg"
                >
                  Answer Your Inner Calling
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-4 bg-white text-trc-blue-600 font-bold rounded-md hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl text-lg"
                >
                  Meet Karen Florence
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Section - Remote Coaching */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/Remote_Coaching_3.jpg"
                  alt="Professional coach in a remote coaching session"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-bold text-trc-gray-900 mb-6">Transform Lives From Anywhere</h3>
              <p className="text-lg text-trc-gray-700 leading-relaxed mb-6">
                Join our global community of professional coaches making a difference. Our remote coaching 
                methodology enables you to connect with clients worldwide while maintaining the 
                deep, transformative relationships that define exceptional coaching.
              </p>
              <p className="text-lg text-trc-gray-600 leading-relaxed">
                Whether you are looking to build your own personal or executive coaching practice,
                enhance your leadership skills, or simply want to experience deep personal growth,
                TRC equips you with the tools and techniques to deliver powerful coaching in any setting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRC Methodology Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-trc-gray-900 mb-6" style={{whiteSpace: 'normal', wordBreak: 'normal'}}>
              The TRC Methodology
            </h2>
            <p className="text-lg text-trc-gray-600 max-w-3xl mx-auto leading-relaxed" style={{whiteSpace: 'normal', wordBreak: 'normal', width: '100%'}}>
              Tabula Rasa Coach Training Academy transforms professionals through 
              our proven methodology that honors your wisdom and experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-trc-gray-50 rounded-xl p-8 hover:shadow-xl transition-all duration-300 shadow-md">
              <div className="w-16 h-16 bg-trc-blue-100 rounded-full flex items-center justify-center mb-8">
                <svg className="w-8 h-8 text-trc-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-trc-gray-900 mb-4">
                Wisdom-Centered Learning
              </h3>
              <p className="text-lg text-trc-gray-600 leading-relaxed" style={{whiteSpace: 'normal', wordBreak: 'normal'}}>
                Your decades of experience become the foundation for transformative coaching. 
                We honor and integrate your life wisdom into professional practice.
              </p>
            </div>
            
            <div className="bg-trc-gray-50 rounded-xl p-8 hover:shadow-xl transition-all duration-300 shadow-md">
              <div className="w-16 h-16 bg-trc-gold-100 rounded-full flex items-center justify-center mb-8">
                <svg className="w-8 h-8 text-trc-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-trc-gray-900 mb-4">
                Heart-Centered Approach
              </h3>
              <p className="text-lg text-trc-gray-600 leading-relaxed" style={{whiteSpace: 'normal', wordBreak: 'normal'}}>
                Beyond techniques and certifications, discover coaching that touches souls. 
                Create authentic connections that transform both you and your clients.
              </p>
            </div>
            
            <div className="bg-trc-gray-50 rounded-xl p-8 hover:shadow-xl transition-all duration-300 shadow-md">
              <div className="w-16 h-16 bg-trc-blue-100 rounded-full flex items-center justify-center mb-8">
                <svg className="w-8 h-8 text-trc-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-trc-gray-900 mb-4">
                Mature Professional Community
              </h3>
              <p className="text-lg text-trc-gray-600 leading-relaxed" style={{whiteSpace: 'normal', wordBreak: 'normal'}}>
                Join peers who understand your journey. 78% of our students are 40+,
                creating a rich tapestry of shared wisdom and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Coach Certification Program - Program Details Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white border-2 border-trc-blue-200 rounded-lg overflow-hidden shadow-xl">
              <div className="bg-gradient-to-r from-trc-blue-600 to-trc-blue-700 text-white p-10">
                <div className="text-center">
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                    Professional Coach Certification Program
                  </h2>
                  <p className="text-xl lg:text-2xl text-white opacity-95">
                    Transform Your Wisdom • Course Dates: October 25th, 2025 – June 06th, 2026
                  </p>
                </div>
              </div>
              
              <div className="p-10">
                {/* What's Included */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-trc-gray-900 mb-6">What&apos;s Included</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xl font-semibold text-trc-gray-900 mb-4">Core Program</h4>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-trc-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-lg text-trc-gray-700">105+ class hours covering all aspects of professional coaching</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-trc-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-lg text-trc-gray-700">All training materials and resources included</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-trc-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-lg text-trc-gray-700">Comprehensive coaching curriculum and resources</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-trc-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-lg text-trc-gray-700">Psychosynthesis methodology training</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-trc-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-lg text-trc-gray-700">Career & Executive coaching modules</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-trc-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-lg text-trc-gray-700">Outplacement services training</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-trc-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-lg text-trc-gray-700">Business building essentials</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-trc-gray-900 mb-4">Additional Benefits</h4>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-trc-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-lg text-trc-gray-700">Personal mentorship included</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-trc-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-lg text-trc-gray-700">Lifetime membership in TRC Alumni Network</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-trc-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-lg text-trc-gray-700">Ongoing community support and networking</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-trc-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-lg text-trc-gray-700">Access to digital library</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Call-to-Action Area */}
                <div className="bg-gradient-to-r from-trc-blue-50 to-trc-gold-50 rounded-2xl p-8 mt-8 border border-trc-blue-100">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                      <p className="text-3xl font-bold text-trc-gray-900 mb-2">$6,999</p>
                      <p className="text-lg font-semibold text-trc-gray-700">Complete Certification Program</p>
                      <p className="text-sm text-trc-blue-600 mt-1 font-medium">✓ Payment plans available</p>
                      <p className="text-sm text-trc-blue-600 mt-1 font-medium">✓ One Full and one 50% scholarship available</p>
                    </div>
                    <div className="text-center">
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                          href="/contact"
                          className="inline-block px-8 py-4 bg-gradient-to-r from-trc-blue-600 to-trc-blue-700 text-white font-bold rounded-lg hover:from-trc-blue-700 hover:to-trc-blue-800 hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl text-lg"
                        >
                          Enroll Now for October 2025
                        </a>
                        <a
                          href="https://tabularasacoaching.as.me/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-8 py-4 bg-white text-trc-blue-600 font-bold rounded-lg border-2 border-trc-blue-500 hover:bg-trc-blue-50 hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl text-lg"
                        >
                          Schedule a Free Consultation
                        </a>
                      </div>
                      <p className="text-sm text-trc-gold-700 font-semibold mt-8 lg:mt-10 animate-pulse">⚡ Only 8 spots remaining</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Modern Cards */}
      <section className="py-12 lg:py-16 bg-trc-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-trc-gray-900 mb-6">
              Stories of Transformation
            </h2>
            <p className="text-lg text-trc-gray-600">
              Real journeys from professionals who found their calling
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white border border-trc-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 shadow-md">
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-trc-gold-500 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-lg text-trc-gray-700 mb-8 italic leading-relaxed">
                &ldquo;At 52, I thought my best career years were behind me. TRC Academy showed me 
                they were just beginning. The depth of training and community support helped 
                me launch a thriving coaching practice that honors my life experience.&rdquo;
              </p>
              <div>
                <p className="font-bold text-trc-gray-900 text-lg">Sarah Mitchell</p>
                <p className="text-trc-gray-600">Executive Coach, Class of 2023</p>
              </div>
            </div>
            
            <div className="bg-white border border-trc-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 shadow-md">
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-trc-gold-500 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-lg text-trc-gray-700 mb-8 italic leading-relaxed">
                &ldquo;Karen&apos;s approach transcends traditional coaching education. She creates a 
                sacred space where wisdom meets purpose. I found not just a new career, 
                but my soul&apos;s true calling through TRC&apos;s transformative methodology.&rdquo;
              </p>
              <div>
                <p className="font-bold text-trc-gray-900 text-lg">Michael Chen</p>
                <p className="text-trc-gray-600">Life Transformation Coach, Class of 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - With Background Image */}
      <section className="relative py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Summit_3.jpg"
            alt="Mountain summit representing transformation"
            fill
            style={{ objectFit: 'cover' }}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
              Your Transformation Begins Today
            </h2>
            <p className="text-xl lg:text-2xl text-white max-w-4xl mx-auto mb-8" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.8)'}}>
              Take the first step toward your soul&apos;s work.
              Discover how your unique wisdom can create lasting impact in the world.
            </p>
            <Link
              href="/coaching-training"
              className="inline-block px-8 py-4 bg-white text-trc-blue-600 font-bold rounded-md hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl text-lg"
            >
              Begin Your Sacred Journey
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}