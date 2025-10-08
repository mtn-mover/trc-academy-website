import Image from 'next/image';
import Link from 'next/link';
import TestimonialsCarousel from '@/src/components/TestimonialsCarousel';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professional Coach Certification Program | TRC Training Academy',
  description: 'Earn your ICF-accredited professional coach certification with TRC Training Academy. Master transformational coaching, Psychosynthesis methodology, career & executive coaching. 105+ hours of comprehensive training. November 2025 enrollment open.',
  keywords: [
    'professional coach certification',
    'ICF accredited coach training',
    'career coaching certification',
    'executive coaching training',
    'Psychosynthesis coaching',
    'transformational coach training',
    'coach certification program',
    'become a certified coach',
    'coaching certification Pennsylvania',
    'professional coaching program',
  ],
  openGraph: {
    title: 'Professional Coach Certification Program | TRC Training Academy',
    description: 'Master transformational coaching with ICF-accredited certification. 105+ hours of comprehensive training in career & executive coaching, Psychosynthesis methodology. November 2025 enrollment open.',
    url: 'https://trctrainingacademy.com/coaching-training',
    siteName: 'TRC Training Academy',
    images: [
      {
        url: 'https://trctrainingacademy.com/images/Image_Header_Coaching.jpg',
        width: 1200,
        height: 630,
        alt: 'TRC Training Academy Professional Coach Certification Program',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Coach Certification Program | TRC Training Academy',
    description: 'Master transformational coaching with ICF-accredited certification. 105+ hours training in career & executive coaching, Psychosynthesis methodology.',
    images: ['https://trctrainingacademy.com/images/Image_Header_Coaching.jpg'],
  },
  alternates: {
    canonical: 'https://trctrainingacademy.com/coaching-training',
  },
};

export default function CoachingTrainingPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Professional Coach Certification Program',
    description: 'Comprehensive ICF-accredited professional coach certification program featuring 105+ hours of training in transformational coaching, Psychosynthesis methodology, career coaching, and executive coaching.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'TRC Training Academy',
      url: 'https://trctrainingacademy.com',
    },
    courseCode: 'TRC-CPC-2025',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'blended',
      startDate: '2025-11-08',
      endDate: '2026-06-06',
      courseSchedule: {
        '@type': 'Schedule',
        repeatFrequency: 'Monthly',
        byDay: ['Wednesday', 'Saturday', 'Sunday'],
        duration: 'P8M',
      },
      location: {
        '@type': 'VirtualLocation',
        url: 'https://trctrainingacademy.com',
      },
      instructor: {
        '@type': 'Person',
        name: 'Karen Florence',
        description: 'Certified Professional Coach (CPC) and Certified Professional Resume Writer & Coach (CPRWC)',
      },
    },
    offers: {
      '@type': 'Offer',
      price: '6999',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: '2025-01-01',
      url: 'https://trctrainingacademy.com/contact',
    },
    educationalCredentialAwarded: 'Certified Professional Coach (CPC)',
    timeRequired: 'P8M',
    teaches: [
      'Transformational Coaching',
      'Psychosynthesis Methodology',
      'Career Coaching',
      'Executive Coaching',
      'Outplacement Services',
      'Building a Coaching Practice',
    ],
    numberOfCredits: '105',
    inLanguage: 'en',
    isAccessibleForFree: false,
    syllabusSections: [
      {
        '@type': 'Syllabus',
        name: 'Core Coaching Skills',
        description: '105+ hours of professional coaching training with comprehensive curriculum',
      },
      {
        '@type': 'Syllabus',
        name: 'Psychosynthesis Methodology',
        description: 'Deep training in Psychosynthesis approach to coaching',
      },
      {
        '@type': 'Syllabus',
        name: 'Career & Executive Coaching',
        description: 'Specialized training in career coaching and executive leadership coaching',
      },
      {
        '@type': 'Syllabus',
        name: 'Business Building',
        description: 'Essential skills for building and growing your coaching practice',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <div className="min-h-screen bg-white">
      {/* Hero Section with Header Coaching Background */}
      <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Image_Header_Coaching.jpg"
            alt="Professional coaching header"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        {/* Dark overlay only at bottom 40% for text area - matching main page */}
        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black/90 via-black/70 to-transparent z-10"></div>

        {/* Content positioned at absolute bottom - matching main page */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 lg:pb-12">
            <div className="text-left lg:text-center">
              <p className="text-xl lg:text-2xl text-white mb-4 tracking-wide" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.6)'}}>
                TRC Training Academy
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 tracking-tight leading-tight" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                Unlock Your Coaching Potential
              </h1>
              <p className="text-xl lg:text-2xl text-white mb-8 leading-relaxed max-w-3xl lg:mx-auto" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.8)'}}>
                Master the Art of Transformational Coaching with Tabula Rasa Coach Training Academy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section with Image */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-trc-gray-900 mb-6">
                Your Journey to Becoming a Certified Professional Coach
              </h2>
              <p className="text-lg text-trc-gray-700 leading-relaxed mb-6">
                Imagine the impact you can make as a Certified Professional Coach, helping
                individuals and groups navigate their internal landscapes, providing them the tools
                to comprehend their own selves better, aiding them to shape their own destiny
                personally and professionally.
              </p>
              <p className="text-lg text-trc-gray-700 leading-relaxed">
                Our academy is rooted in the belief that coaching is not just about solving
                problems, but about understanding the human being as a holistic entity, a rich
                tapestry of experiences, emotions, and ideas. We offer you an immersive learning
                journey, focusing on the art and science of meaningful coaching, allowing you to
                connect deeply with your clients, serving as a bridge between their present and
                their envisioned future.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/Image1.jpg"
                alt="Professional coaching journey"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center center' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Coaching Impact Section */}
      <section className="py-24 bg-trc-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-trc-gray-900 mb-4">
            Coaching: The Key to Unlocking Potential in Every Sphere
          </h2>
          <p className="text-lg text-trc-gray-700 text-center max-w-4xl mx-auto mb-16 leading-relaxed">
            In an increasingly complex and rapidly changing world, the need for coaching—both within
            corporate environments and across all walks of life—has never been more critical. Coaching
            is not just about performance enhancement or problem-solving; it&apos;s about unlocking potential,
            creating a culture of continuous growth, and instilling a deeper sense of purpose and direction.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Corporate World Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-[250px]">
                <Image
                  src="/images/Image2.jpg"
                  alt="Corporate coaching environment"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center center' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-trc-gray-900 mb-4">
                  Coaching and the Corporate World
                </h3>
                <p className="text-lg text-trc-gray-700 leading-relaxed">
                  Coaching has evolved from a remedial role to a strategic asset in the corporate world,
                  embraced by high-performing organizations to enhance productivity and spur innovation.
                  It aids leaders in creating inspiring environments, using the diverse abilities and
                  perspectives of their teams to tackle corporate challenges with agility.
                </p>
                <p className="text-lg text-trc-gray-700 leading-relaxed mt-4">
                  By fostering a coaching culture, organizations not only boost performance but also
                  enhance employee engagement, satisfaction, and retention, thereby driving sustainable growth.
                </p>
              </div>
            </div>

            {/* Personal Transformation Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-[250px]">
                <Image
                  src="/images/Image3.jpg"
                  alt="Personal transformation through coaching"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center 60%' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-trc-gray-900 mb-4">
                  Coaching: A Catalyst for Personal Transformation
                </h3>
                <p className="text-lg text-trc-gray-700 leading-relaxed">
                  Beyond the corporate world, coaching plays an equally vital role in facilitating
                  personal transformation. Whether navigating life transitions, overcoming personal
                  obstacles, or pursuing a path of personal growth and self-discovery, coaching
                  serves as a beacon of guidance and empowerment.
                </p>
                <p className="text-lg text-trc-gray-700 leading-relaxed mt-4">
                  Coaching provides a safe space for individuals to explore their values, beliefs,
                  and aspirations, empowering them to tap into their innate potential and write
                  their own unique story of success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Psychosynthesis Methodology Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/Image4.jpg"
                alt="Psychosynthesis methodology"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-trc-gray-900 mb-6">
                Psychosynthesis Methodology: A Unique Approach
              </h2>
              <p className="text-lg text-trc-gray-700 leading-relaxed mb-6">
                Beyond traditional coaching methodologies, we introduce you to the profound world of
                Psychosynthesis. This holistic approach, founded by Roberto Assagioli, combines
                psychological and spiritual dimensions, acknowledging the complexities of human nature.
              </p>
              <p className="text-lg text-trc-gray-700 leading-relaxed mb-6">
                It helps clients delve beneath their surface reality to discover a symphony of
                subconscious desires, fears, strengths, and potential that forms their unique inner cosmos.
              </p>
              <div className="bg-trc-blue-50 border-l-4 border-trc-blue-600 p-6 rounded-r-lg">
                <p className="text-lg text-trc-gray-900">
                  Our unique curriculum encapsulates this transformative approach, enabling you to guide
                  your clients towards achieving harmonious integration, promoting personal growth,
                  increased self-awareness, and ultimately, the manifestation of the client&apos;s true Self.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Training Programs */}
      <section className="py-24 bg-gradient-to-b from-trc-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-trc-gray-900 mb-4">
            Comprehensive Executive/Career Coaching
          </h2>
          <p className="text-lg text-trc-gray-700 text-center max-w-4xl mx-auto mb-16 leading-relaxed">
            Our comprehensive coaching curriculum has been expertly designed to equip you with the skills,
            knowledge, and confidence to embark on your coaching journey in various niche fields. Each
            module has been crafted with a unique blend of theory and practice, empowering you to guide,
            inspire, and transform lives.
          </p>

          {/* Training Modules Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Career Coaching Module */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="relative h-[200px] rounded-lg overflow-hidden mb-6">
                <Image
                  src="/images/Image5.jpg"
                  alt="Career coaching training"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="text-2xl font-bold text-trc-gray-900 mb-4">Career Coaching</h3>
              <p className="text-lg text-trc-gray-700 leading-relaxed">
                Step into the world of Career Coaching. Learn how to help clients navigate their
                professional paths, identify their unique strengths, and align their passions with
                their career goals. Gain the skills to support those making fresh starts or those
                considering significant career transitions.
              </p>
            </div>

            {/* Executive Coaching Module */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="relative h-[200px] rounded-lg overflow-hidden mb-6">
                <Image
                  src="/images/Image6.jpg"
                  alt="Executive coaching training"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="text-2xl font-bold text-trc-gray-900 mb-4">Executive Coaching</h3>
              <p className="text-lg text-trc-gray-700 leading-relaxed">
                Our Executive Coaching Training prepares you to guide leaders in the fast-paced
                corporate world. You will learn how to foster strategic thinking, enhance
                decision-making capabilities, and nurture leadership skills to overcome specific
                leadership challenges.
              </p>
            </div>

            {/* Outplacement Services Module */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="relative h-[200px] rounded-lg overflow-hidden mb-6">
                <Image
                  src="/images/Image7.jpg"
                  alt="Outplacement services"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="text-2xl font-bold text-trc-gray-900 mb-4">Outplacement Services Training</h3>
              <p className="text-lg text-trc-gray-700 leading-relaxed">
                Become a beacon of support during challenging corporate transitions. This module
                equips you with the expertise to provide personalized guidance to displaced employees,
                helping them discover new career opportunities and prepare effectively for job searches.
              </p>
            </div>

            {/* Building Your Practice Module */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="relative h-[200px] rounded-lg overflow-hidden mb-6">
                <Image
                  src="/images/Image8.jpg"
                  alt="Building coaching practice"
                  fill
                  style={{ objectFit: 'cover', objectPosition: '50% 25%' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="text-2xl font-bold text-trc-gray-900 mb-4">Building Your Own Coaching Practice</h3>
              <p className="text-lg text-trc-gray-700 leading-relaxed">
                If you dream of establishing your own coaching practice, this training is the perfect
                stepping stone. Learn how to create a unique coaching model, market your services, and
                build strong client relationships for a thriving practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transformational Beauty Quote Section */}
      <section className="relative py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Image9.jpg"
            alt="Transformational coaching beauty"
            fill
            style={{ objectFit: 'cover' }}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
              The Transformational Beauty of Coaching
            </h2>
            <p className="text-xl lg:text-2xl text-white italic max-w-4xl mx-auto" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.8)'}}>
              &ldquo;Coaching is the gentle art of awakening potential, a transformative dance that
              illuminates paths unknown, and a voyage of discovery that celebrates the beautiful
              evolution of the human spirit&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-trc-gray-900 mb-6">
                Our Unique Community of Transformational Coaches
              </h2>
              <p className="text-lg text-trc-gray-700 leading-relaxed mb-6">
                As you embark on your coaching journey with us, you become part of a network of
                change-makers. You&apos;ll be joining hands with individuals who, like you, believe in
                the power of human potential and are passionate about igniting it in others.
              </p>
              <p className="text-lg text-trc-gray-700 leading-relaxed mb-6">
                Here, every voice is valued, every experience is a learning opportunity, and every
                success is celebrated collectively. Our community fosters a culture of continuous
                learning and mutual support.
              </p>
              <p className="text-lg text-trc-gray-700 leading-relaxed">
                The experience you gain here goes beyond the confines of your training. It&apos;s about
                building lifelong relationships, creating synergies, and being part of a collective
                movement that aims to make a positive difference in the world.
              </p>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/Image 15.jpg"
                alt="Community of coaches"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center center' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Your Journey Section */}
      <section className="py-24 bg-gradient-to-b from-trc-gold-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/Image11.jpg"
                alt="Your coaching journey"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-trc-gray-900 mb-6">
                Your Journey Begins Here
              </h2>
              <p className="text-lg text-trc-gray-700 leading-relaxed mb-6">
                Our commitment is to provide you with a comprehensive, immersive, and deeply personal
                learning experience. As you walk through our virtual doors, you&apos;re not just beginning
                an educational journey; you&apos;re starting a voyage of self-discovery and growth.
              </p>
              <p className="text-lg text-trc-gray-700 leading-relaxed">
                You will develop the skills to guide others through their unique life narratives,
                empowering them to reach their fullest potential, and in the process, you&apos;ll discover
                your own potential blooming.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Details Card */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-trc-gold-200 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-trc-gold-600 to-trc-gold-700 text-white p-12">
                <div className="text-center">
                  <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                    Professional Coach Certification Program
                  </h2>
                  <p className="text-xl lg:text-2xl text-white opacity-95">
                    Transform Your Wisdom • November 2025 – June 2026
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
                          <span className="text-lg text-trc-gray-700">105+ hours professional coaching</span>
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

                {/* Enhanced Call-to-Action Area */}
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 mt-8 border border-orange-200">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                      <p className="text-3xl font-bold text-trc-gray-900 mb-2">$6,999</p>
                      <p className="text-lg font-semibold text-trc-gray-700">Complete Certification Program</p>
                      <p className="text-sm text-orange-600 mt-1 font-medium">✓ Payment plans available</p>
                      <p className="text-sm text-orange-600 mt-1 font-medium">✓ One Full and one 50% scholarship available</p>
                    </div>
                    <div className="text-center w-full md:w-auto">
                      <Link
                        href="/contact"
                        className="block w-full max-w-xs mx-auto md:inline-block md:w-auto md:max-w-none px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl text-lg leading-snug"
                      >
                        Schedule a Free Consultation
                      </Link>
                      <p className="text-sm text-orange-700 font-semibold mt-4 sm:mt-6 lg:mt-10 animate-pulse">⚡ Only 8 spots remaining</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
        </div>
      </section>

      {/* Why Choose TRC Section with Images */}
      <section className="py-24 bg-trc-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-trc-gray-900 mb-16">
            The TRC Training Advantage
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-[200px]">
                <Image
                  src="/images/Image12.jpg"
                  alt="TRC certification"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-trc-gray-900 mb-4">Internationally Recognized</h3>
                <p className="text-lg text-trc-gray-600 leading-relaxed">
                  Earn your certification and join an elite community of transformational coaches worldwide.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-[200px]">
                <Image
                  src="/images/Image13.jpg"
                  alt="Small cohorts"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-trc-gray-900 mb-4">Personalized Learning</h3>
                <p className="text-lg text-trc-gray-600 leading-relaxed">
                  Small cohort sizes ensure personalized attention and deep, meaningful connections.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-[200px]">
                <Image
                  src="/images/Image14.jpg"
                  alt="Lifetime support"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-trc-gray-900 mb-4">Ongoing Support</h3>
                <p className="text-lg text-trc-gray-600 leading-relaxed">
                  Join our vibrant alumni community for continuous learning, mentorship, and growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* Final CTA Section with Summit Image */}
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
    </>
  );
}