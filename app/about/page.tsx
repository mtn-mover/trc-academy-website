import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-trc-blue-50 to-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-5xl font-bold text-trc-gray-900 mb-6">
              Meet Karen Florence
            </h1>
            <p className="text-lg lg:text-xl text-trc-gray-600 leading-relaxed">
              Master Coach, TRC Founder, and Guide for Souls Seeking Their True Calling
            </p>
          </div>
        </div>
      </section>

      {/* Karen's Story Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative rounded-lg overflow-hidden shadow-lg mx-auto" style={{maxWidth: '400px'}}>
                <Image
                  src="/Images/Karen.jpg"
                  alt="Karen Florence - Founder of TRC Training Academy"
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover"
                  style={{maxHeight: '500px'}}
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl lg:text-4xl font-bold text-trc-gray-900 mb-8">
                A Journey of Transformation
              </h2>
              
              <div className="space-y-6 text-lg text-trc-gray-700 leading-relaxed">
                <p>
                  For over two decades, Karen Florence has been a beacon of transformation 
                  for professionals seeking deeper meaning in their life&apos;s work. Her journey 
                  began not in a classroom, but in the crucible of her own midlife awakening—a 
                  profound realization that success without soul satisfaction is merely existing, 
                  not truly living.
                </p>
                
                <p>
                  As the founder of TRC Training Academy, Karen has developed the revolutionary 
                  Tabula Rasa methodology, which honors the blank slate within each of us—ready 
                  to be inscribed with purpose, passion, and profound impact. Her approach 
                  transcends traditional coaching methodologies, weaving together psychological 
                  wisdom, spiritual insight, and practical business acumen.
                </p>
                
                <p>
                  &ldquo;I believe that the second half of life holds our greatest potential for impact,&rdquo; 
                  Karen shares. &ldquo;When we combine our accumulated wisdom with our soul&apos;s true calling, 
                  we don&apos;t just change careers—we transform lives, starting with our own.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials & Experience */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-4xl font-bold text-center text-trc-gray-900 mb-12">
            Excellence in Coach Training
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-trc-gray-900 mb-4">
                Professional Excellence
              </h3>
              <ul className="space-y-3 text-lg text-trc-gray-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-trc-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Master Coach Certification
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-trc-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  TRC Methodology Creator
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-trc-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Advanced Psychology Training
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-trc-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Leadership Development Expert
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-trc-gray-900 mb-4">
                Teaching Philosophy
              </h3>
              <p className="text-lg text-trc-gray-700 leading-relaxed">
                Karen&apos;s teaching philosophy centers on the belief that authentic coaching 
                emerges from the integration of professional skill and personal wisdom. 
                She creates transformative learning experiences that honor each student&apos;s 
                unique journey and potential.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-trc-gray-900 mb-4">
                The TRC Difference
              </h3>
              <p className="text-lg text-trc-gray-700 leading-relaxed">
                Our programs are designed specifically for mature professionals who bring 
                rich life experience to their coaching practice. We believe your wisdom 
                is your greatest asset, and we help you transform it into professional excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRC Academy Vision */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-4xl font-bold text-center text-trc-gray-900 mb-12">
            The TRC Training Academy Vision
          </h2>
          
          <div className="prose prose-lg mx-auto text-trc-gray-700 space-y-6">
            <p className="text-lg leading-relaxed">
              TRC Training Academy was born from a simple yet profound observation: the coaching 
              industry was missing the wisdom, depth, and life experience that mature professionals 
              bring to the table. While many programs focus on quick certifications and surface-level 
              techniques, TRC goes deeper.
            </p>
            
            <div className="bg-trc-blue-50 border-l-4 border-trc-blue-600 p-6 my-8">
              <p className="text-lg font-semibold text-trc-gray-900 mb-2">
                &ldquo;Transform, Realize, Connect&rdquo;
              </p>
              <p className="text-lg text-trc-gray-700">
                This isn&apos;t just our tagline—it&apos;s our methodology. We believe that true coaching 
                excellence comes from first transforming yourself, realizing your unique gifts, 
                and then connecting authentically with those you serve.
              </p>
            </div>
            
            <p className="text-lg leading-relaxed">
              Our academy has become a sanctuary for professionals in their second act, those who 
              refuse to believe their best contributions are behind them. Here, age is an asset, 
              wisdom is currency, and your life story becomes the foundation of your coaching legacy.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-trc-blue-600 to-trc-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-4xl font-bold text-white mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-lg text-trc-blue-100 mb-8 leading-relaxed">
            Join Karen and discover how your life experience can become your greatest 
            professional asset in service to others.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/coaching-training"
              className="inline-block px-8 py-4 bg-white text-trc-blue-600 font-semibold rounded-md hover:bg-trc-gray-50 hover:scale-105 transition-all duration-300 shadow-lg border-2 border-trc-blue-600"
            >
              Explore Our Programs
            </a>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-transparent text-white font-semibold rounded-md border-2 border-white hover:bg-white hover:text-trc-blue-600 hover:scale-105 transition-all duration-300"
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}