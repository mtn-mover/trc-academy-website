'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    // Check if user has already made a cookie choice
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      // Delay showing banner for smooth page load
      setTimeout(() => setShowBanner(true), 2000)
    }
  }, [])

  const handleClose = (action: 'accept' | 'reject' | 'dismiss') => {
    setIsClosing(true)

    const consent = {
      essential: true,
      functional: action === 'accept',
      analytics: action === 'accept',
      marketing: action === 'accept',
      timestamp: new Date().toISOString()
    }

    localStorage.setItem('cookieConsent', JSON.stringify(consent))

    // Fade out animation before hiding
    setTimeout(() => {
      setShowBanner(false)
      setIsClosing(false)
    }, 300)
  }

  if (!showBanner) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transform transition-all duration-300 ease-out ${
        isClosing ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
      role="banner"
      aria-label="Cookie consent banner"
    >
      {/* Semi-transparent backdrop for better readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

      {/* Main banner container */}
      <div className="relative bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

              {/* Left section: Icon and message */}
              <div className="flex items-start lg:items-center gap-3 lg:gap-4 flex-1">
                {/* Cookie Icon */}
                <div className="flex-shrink-0">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 text-trc-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 10 10l3.5 7.5z"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <circle cx="15.5" cy="8.5" r="1"/>
                    <circle cx="8.5" cy="15.5" r="1"/>
                    <circle cx="12" cy="12" r="1"/>
                  </svg>
                </div>

                {/* Message */}
                <div className="flex-1">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                    We value your privacy
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    We use cookies to enhance your experience and analyze our traffic.
                    You can choose to accept all cookies or customize your preferences.
                  </p>

                  {/* Policy links for mobile */}
                  <div className="mt-2 flex items-center gap-3 lg:hidden">
                    <Link
                      href="/cookie-policy"
                      className="text-xs text-trc-blue-600 hover:text-trc-blue-700 underline underline-offset-2"
                    >
                      Cookie Policy
                    </Link>
                    <span className="text-gray-300">•</span>
                    <Link
                      href="/privacy-policy"
                      className="text-xs text-trc-blue-600 hover:text-trc-blue-700 underline underline-offset-2"
                    >
                      Privacy Policy
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right section: Buttons and links */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-4">
                {/* Policy links for desktop */}
                <div className="hidden lg:flex items-center gap-3 mr-2">
                  <Link
                    href="/cookie-policy"
                    className="text-sm text-gray-500 hover:text-trc-blue-600 transition-colors whitespace-nowrap"
                  >
                    Cookie Policy
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link
                    href="/privacy-policy"
                    className="text-sm text-gray-500 hover:text-trc-blue-600 transition-colors whitespace-nowrap"
                  >
                    Privacy Policy
                  </Link>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={() => handleClose('reject')}
                    className="px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                    aria-label="Reject all cookies"
                  >
                    Reject All
                  </button>

                  <button
                    onClick={() => handleClose('accept')}
                    className="px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-medium text-white bg-gradient-to-r from-trc-blue-600 to-trc-blue-700 rounded-lg hover:from-trc-blue-700 hover:to-trc-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-trc-blue-500 shadow-lg hover:shadow-xl transition-all duration-200"
                    aria-label="Accept all cookies"
                  >
                    Accept All
                  </button>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => handleClose('dismiss')}
                className="absolute top-4 right-4 lg:top-6 lg:right-6 p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-lg transition-colors"
                aria-label="Close cookie banner"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}