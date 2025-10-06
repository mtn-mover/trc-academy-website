'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

interface VideoTestimonial {
  id: string
  title: string
  description: string
  videoUrl: string
  thumbnailUrl?: string
  name: string
  role?: string
}

const testimonials: VideoTestimonial[] = [
  {
    id: '1',
    title: 'From Corporate Consultant to Purpose-Driven Coach',
    description: 'The peer-to-peer coaching was incredibly rewarding. It made me realize how fulfilling coaching can be when you put the person at the center and get to the core issues with them.',
    videoUrl: '/video/Tris_lr.mp4',
    name: 'Tris C.',
    role: 'TRC Graduate'
  },
  {
    id: '2',
    title: 'Discovering the Art of Listening',
    description: "The listening skills and learning to ask 'one more question' opened things up tremendously. It's transformed how I connect with people at work and in life.",
    videoUrl: '/video/Joseph_lr.mp4',
    name: 'Joseph C.',
    role: 'TRC Graduate'
  },
  {
    id: '3',
    title: 'From Skeptic to Confident Coach',
    description: 'I started skeptical, but now understand that to be a good coach, you must go through the rabbit hole yourself first. That insight changed everything for me.',
    videoUrl: '/video/Flavio_lr.mp4',
    name: 'Flavio S.',
    role: 'TRC Graduate'
  },
  {
    id: '4',
    title: 'From Theory to Real Results',
    description: 'This training gave me the nuts and bolts I was missing. My niece got the job after our coaching sessions - I did nothing but ask questions, and it was immensely satisfying.',
    videoUrl: '/video/Eve_lr.mp4',
    name: 'Eve S.',
    role: 'TRC Graduate'
  }
]

export default function VideoTestimonials() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({})

  const handlePlay = (id: string) => {
    // Stop all other videos
    Object.keys(videoRefs.current).forEach((key) => {
      if (key !== id && videoRefs.current[key]) {
        videoRefs.current[key]?.pause()
      }
    })
    // Force state update
    setPlayingVideo(null)
    setTimeout(() => {
      setPlayingVideo(id)
    }, 0)
  }

  const handlePause = () => {
    setPlayingVideo(null)
  }

  const handleEnded = () => {
    setPlayingVideo(null)
  }

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hear From Our Graduates
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories of transformation from our TRC Academy community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 ${
                playingVideo === testimonial.id ? 'scale-110 z-20 relative' : ''
              }`}
            >
              <div className="relative aspect-video bg-gray-900">
                {testimonial.videoUrl ? (
                  <video
                    ref={(el) => { videoRefs.current[testimonial.id] = el }}
                    className="w-full h-full object-cover"
                    controls
                    controlsList="nodownload"
                    preload="metadata"
                    poster={testimonial.thumbnailUrl}
                    onPlay={() => handlePlay(testimonial.id)}
                    onPause={handlePause}
                    onEnded={handleEnded}
                  >
                    <source src={testimonial.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-600">
                    <div className="text-center text-white p-4">
                      <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <p className="text-base font-medium">Coming Soon</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col">
                <h3 className="font-bold text-lg text-gray-900 mb-4" style={{ minHeight: '56px' }}>
                  {testimonial.title}
                </h3>
                <div className="border-t pt-4 mt-auto">
                  <p className="font-semibold text-base text-gray-900">{testimonial.name}</p>
                  {testimonial.role && (
                    <p className="text-base text-teal-600">{testimonial.role}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xl text-gray-600 mb-8">
            Ready to write your own transformation story?
          </p>
          <Link
            href="/coaching-training"
            className="inline-block px-10 py-5 bg-trc-blue-600 text-white font-bold rounded-lg hover:bg-trc-blue-700 hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl text-lg"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}