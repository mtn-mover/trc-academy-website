'use client'

import { useState, useEffect } from 'react'

interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Stephan Z.',
    role: 'TRC Graduate',
    quote: "For a manager with no prior coaching experience, this training was absolutely perfect. You learn not only the fundamental basics but also go deep into inner transformation work. Beyond just questioning and listening skills, you receive a complete roadmap for building your own practice. After following Karen's expert guidance, I successfully landed my first paying clients almost immediately."
  },
  {
    id: '2',
    name: 'Joe G.',
    role: 'TRC Graduate',
    quote: "The peer coaching sessions taught me different perspectives and ways to look at things. I grew the most from connecting with my fellow students and learning from their approaches."
  },
  {
    id: '3',
    name: 'Christian H.',
    role: 'TRC Graduate',
    quote: "This training was a transformative journey of personal development that helped me discover myself on a deeper level and connect with my true purpose. The parts work was initially challenging but incredibly meaningful once I understood its power. As someone with a special forces and AI business background, I'm now successfully integrating coaching into my consulting services and have created a blog platform where clients can book my coaching expertise. This program gave me both the inner work and practical tools needed."
  },
  {
    id: '4',
    name: 'Eve S.',
    role: 'TRC Graduate',
    quote: "Having previous psychosynthesis training, I needed the practical nuts and bolts this program provided perfectly. Working with different personalities stretched me out of my comfort zone in the best way. My first real success came when I coached my niece through job interviews using just questions - she got the job! This training gave me the complete toolkit I was missing to build a successful transition coaching practice."
  },
  {
    id: '5',
    name: 'Tris',
    role: 'TRC Graduate',
    quote: "This training transformed me both personally and professionally. The parts work created deep self-examination that was initially uncomfortable but led to profound insights about my relationships and character. The peer coaching was incredibly rewarding and showed me how fulfilling this profession can be when you put the person at the center. I've gone from consultancy to pure coaching focus."
  },
  {
    id: '6',
    name: 'Joseph C.',
    role: 'TRC Graduate',
    quote: "I thought I was a good listener until this training showed me how much I had to learn. The simple technique of asking 'one more question' opened up conversations tremendously and transformed how I connect with people at work and in life. I'm now developing a coaching niche at my workplace and moving toward life coaching. The listening skills alone were worth the entire program."
  },
  {
    id: '7',
    name: 'Flavio S.',
    role: 'TRC Graduate',
    quote: "I started this training quite skeptical about becoming a good coach. The breakthrough came when Karen taught us that to be effective, you must first go through the rabbit hole yourself and come out the other side. Now coaching a young professional, I see how real this insight is. I'm building confidence and considering integrating coaching with my CFO consulting to create a unique offering."
  }
]

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false) // Stop auto-play when user interacts
    // Resume auto-play after 10 seconds of no interaction
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false) // Stop auto-play when user interacts
    // Resume auto-play after 10 seconds of no interaction
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false) // Stop auto-play when user interacts
    // Resume auto-play after 10 seconds of no interaction
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-teal-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Stories of Transformation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real journeys from professionals who found their calling
          </p>
        </div>

        {/* Desktop: Show 2 testimonials with proper sliding */}
        <div className="hidden lg:block relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute -left-16 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-6 h-6 text-gray-600 group-hover:text-teal-600 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute -right-16 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
            aria-label="Next testimonial"
          >
            <svg
              className="w-6 h-6 text-gray-600 group-hover:text-teal-600 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Testimonials Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 50}%)`
              }}
            >
              {/* Create doubled array for seamless sliding */}
              {[...testimonials, ...testimonials].map((testimonial, idx) => (
                <div
                  key={`${testimonial.id}-${idx}`}
                  className="px-4"
                  style={{ width: '50%', flexShrink: 0 }}
                >
                  <div className="bg-white rounded-2xl shadow-xl p-10 h-full">
                    {/* Stars */}
                    <div className="flex mb-6 justify-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote Icon */}
                    <div className="flex justify-center mb-6">
                      <svg className="w-12 h-12 text-teal-500 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    {/* Quote */}
                    <p className="text-lg text-gray-700 mb-8 text-center leading-relaxed italic" style={{ minHeight: '200px' }}>
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>

                    {/* Name and Role */}
                    <div className="text-center border-t pt-6">
                      <p className="font-bold text-xl text-gray-900">{testimonial.name}</p>
                      <p className="text-teal-600 font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-12 h-3 bg-teal-600 rounded-full'
                    : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile: Show 1 testimonial */}
        <div className="lg:hidden relative px-4">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-lg"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-lg"
            aria-label="Next testimonial"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Mobile Carousel */}
          <div className="px-12">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              {/* Stars */}
              <div className="flex mb-4 justify-center">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote Icon */}
              <div className="flex justify-center mb-4">
                <svg className="w-10 h-10 text-teal-500 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Quote */}
              <p className="text-base text-gray-700 mb-6 text-center leading-relaxed italic">
                &ldquo;{testimonials[currentIndex].quote}&rdquo;
              </p>

              {/* Name and Role */}
              <div className="text-center">
                <p className="font-bold text-lg text-gray-900">{testimonials[currentIndex].name}</p>
                <p className="text-teal-600 font-medium text-sm">{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </div>

          {/* Mobile Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-teal-600 rounded-full'
                    : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}