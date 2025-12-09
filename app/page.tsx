import Link from 'next/link';
import Image from 'next/image';
import VideoTestimonials from '@/src/components/VideoTestimonials';

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
              <p className="text-xl lg:text-2xl text-white mb-4 tracking-wide" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.6)'}}>
                TRC Training Academy
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 tracking-tight leading-tight" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                Where Wisdom and Experience Impacts Transformation
              </h1>
              <p className="text-xl lg:text-2xl text-white leading-relaxed max-w-3xl lg:mx-auto" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.8)'}}>
                Your wisdom, experience, and calling converge here.
              </p>
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
            <div className="bg-gradient-to-br from-trc-blue-50 to-trc-blue-100/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-trc-blue-100">
              <div className="w-20 h-20 bg-gradient-to-br from-trc-blue-500 to-trc-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-trc-gray-900 mb-4 text-center">
                Wisdom-Centered Learning
              </h3>
              <p className="text-lg text-trc-gray-600 leading-relaxed text-center" style={{whiteSpace: 'normal', wordBreak: 'normal'}}>
                Your decades of experience become the foundation for transformative coaching.
                We honor and integrate your life wisdom into professional practice.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-orange-100">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-trc-gray-900 mb-4 text-center">
                Heart-Centered Approach
              </h3>
              <p className="text-lg text-trc-gray-600 leading-relaxed text-center" style={{whiteSpace: 'normal', wordBreak: 'normal'}}>
                Beyond techniques and certifications, discover coaching that touches souls.
                Create authentic connections that transform both you and your clients.
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-teal-100">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-trc-gray-900 mb-4 text-center">
                Mature Professional Community
              </h3>
              <p className="text-lg text-trc-gray-600 leading-relaxed text-center" style={{whiteSpace: 'normal', wordBreak: 'normal'}}>
                Join peers who understand your journey. 78% of our students are 40+,
                creating a rich tapestry of shared wisdom and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-white via-trc-blue-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-trc-gray-900 mb-6">
              Is Our Coaching Certification Right for You?
            </h2>
            <p className="text-xl text-trc-gray-600 max-w-4xl mx-auto leading-relaxed">
              This program is designed for experienced professionals who are ready to create meaningful change—in their own lives and in the lives of others.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 - Career Changers */}
            <div className="bg-gradient-to-br from-trc-blue-50 to-trc-blue-100/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-trc-blue-100">
              <div className="w-20 h-20 bg-gradient-to-br from-trc-blue-500 to-trc-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-trc-gray-900 mb-4 text-center">
                Career Changers
              </h3>
              <p className="text-lg text-trc-gray-700 mb-4 text-center font-medium">
                You're ready to transition your professional expertise into coaching:
              </p>
              <ul className="space-y-2.5 text-left">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-trc-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base text-trc-gray-700">HR professionals adding coaching to their skillset</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-trc-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base text-trc-gray-700">Therapists/counselors expanding into professional coaching</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-trc-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base text-trc-gray-700">Corporate trainers seeking a new career path</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-trc-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base text-trc-gray-700">Retiring executives building a second career</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-trc-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base text-trc-gray-700">Professionals affected by organizational restructuring</span>
                </li>
              </ul>
            </div>

            {/* Card 2 - Visionary Leaders */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-orange-100">
              <div className="w-20 h-20 bg-gradient-to-br from-trc-gold-500 to-trc-gold-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-trc-gray-900 mb-4 text-center">
                Visionary Leaders
              </h3>
              <p className="text-lg text-trc-gray-700 mb-4 text-center font-medium">
                You want to enhance your leadership with coaching skills:
              </p>
              <ul className="space-y-2.5 text-left">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base text-trc-gray-700">Mid to senior-level managers building leadership capability</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base text-trc-gray-700">Executives adding coaching to their skillset</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base text-trc-gray-700">Team leaders improving leadership effectiveness</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base text-trc-gray-700">Entrepreneurs who lead and develop teams</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base text-trc-gray-700">Career builders who want to develop themselves</span>
                </li>
              </ul>
            </div>

            {/* Card 3 - Inspiring Coaches */}
            <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-teal-100">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-trc-gray-900 mb-4 text-center">
                Inspiring Coaches
              </h3>
              <p className="text-lg text-trc-gray-700 mb-4 text-center font-medium">
                You have a natural gift for guiding others now deepen your impact:
              </p>
              <ul className="space-y-2.5 text-left">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-teal-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base text-trc-gray-700">You're already coaching informally and want certification</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-teal-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base text-trc-gray-700">Those with a genuine desire to help others grow and thrive</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-teal-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base text-trc-gray-700">Career counselors seeking professional certification</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-teal-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base text-trc-gray-700">Mentors wanting to formalize their skills</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-teal-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base text-trc-gray-700">Individuals seeking personal growth and transformation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <a
              href="/coaching-training"
              className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-lg"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Program Details Card */}
      <section id="enrollment-section" className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-trc-gold-200 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-trc-gold-600 to-trc-gold-700 text-white p-12">
                <div className="text-center">
                  <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                    Professional Coach Certification Program
                  </h2>
                  <p className="text-xl lg:text-2xl text-white opacity-95">
                    Transform Your Wisdom Into Your Life&apos;s Work
                  </p>
                </div>
              </div>

              <div className="p-8 lg:p-12">
                {/* What's Included */}
                <div className="mb-12">
                  <h3 className="text-3xl font-bold text-trc-gray-900 mb-8 text-center">What&apos;s Included in Your Journey</h3>
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Core Program - First Column */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <svg className="w-8 h-8 text-trc-gold-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <h4 className="text-xl font-bold text-trc-gray-900">Core Curriculum</h4>
                      </div>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-trc-gold-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-lg text-trc-gray-700">105+ coaching class and training hours</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-trc-gold-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-lg text-trc-gray-700">Comprehensive coaching curriculum</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-trc-gold-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-lg text-trc-gray-700">Psychosynthesis methodology training</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-trc-gold-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-lg text-trc-gray-700">Career & Executive coaching</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-trc-gold-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-lg text-trc-gray-700">Outplacement services</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-trc-gold-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-lg text-trc-gray-700">Business building essentials</span>
                        </li>
                      </ul>
                    </div>

                    {/* Additional Benefits - Second Column */}
                    <div className="bg-teal-50 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <svg className="w-8 h-8 text-teal-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                        </svg>
                        <h4 className="text-xl font-bold text-trc-gray-900">Benefits & Support</h4>
                      </div>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-trc-gold-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-lg text-trc-gray-700">All training materials included</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-trc-gold-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-lg text-trc-gray-700">Personal mentorship included</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-trc-gold-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-lg text-trc-gray-700">Lifetime membership in TRC Alumni Network</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-trc-gold-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-lg text-trc-gray-700">Ongoing community support and networking</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-trc-gold-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-lg text-trc-gray-700">Access to digital library</span>
                        </li>
                      </ul>
                    </div>

                    {/* Program Schedule - Third Column */}
                    <div className="bg-orange-50 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <svg className="w-8 h-8 text-orange-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h4 className="text-xl font-bold text-trc-gray-900">Schedule & Dates</h4>
                      </div>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-trc-gold-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-lg text-trc-gray-700">Orientation: Sat, Nov 1st, 2025</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-trc-gold-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-lg text-trc-gray-700">Program Start: Nov 8th/9th, 2025</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-trc-gold-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-lg text-trc-gray-700">Graduation: Sat, Jun 6th, 2026</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-trc-gold-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-lg text-trc-gray-700">Monthly schedule: 2nd weekend + 2 Wed evenings</span>
                        </li>
                        <li className="ml-12">
                          <span className="text-lg text-trc-gray-700">Wed evenings: 3 hours</span>
                        </li>
                        <li className="ml-12">
                          <span className="text-lg text-trc-gray-700">Sat: 6 hours | Sun: 4 hours</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Call-to-Action Area */}
                <div className="text-center mt-8">
                  <Link
                    href="/programs"
                    className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl text-lg"
                  >
                    View Programs & Apply
                  </Link>
                </div>

              </div>
            </div>
        </div>
      </section>

      {/* Testimonials Section - Carousel */}

      {/* Video Testimonials Section */}
      <VideoTestimonials />

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
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-trc-blue-600 font-bold rounded-md hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl text-lg"
            >
              Schedule a Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}