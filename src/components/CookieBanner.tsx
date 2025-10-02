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
      setTimeout(() => setShowBanner(true), 1500)
    }
  }, [])

  const handleClose = (action: 'accept' | 'reject') => {
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
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-500 ease-out ${
        isClosing ? 'translate-y-full' : 'translate-y-0'
      }`}
      role="banner"
      aria-label="Cookie consent"
    >
      {/* Main banner */}
      <div className="bg-white border-t border-gray-200 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-6 md:px-8 md:py-8">
          {/* Desktop Layout */}
          <div className="hidden md:flex md:items-center md:justify-between">
            {/* Left section: Icon and message (70% width) */}
            <div className="flex items-center flex-1 mr-8">
              {/* Cookie Icon */}
              <div className="flex-shrink-0 mr-6">
                <svg
                  className="w-12 h-12 text-trc-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                  <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="8" cy="8" r="1" fill="currentColor" />
                  <circle cx="16" cy="8" r="1" fill="currentColor" />
                  <circle cx="8" cy="16" r="1" fill="currentColor" />
                  <circle cx="16" cy="16" r="1" fill="currentColor" />
                </svg>
              </div>

              {/* Message */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Cookie Notice
                </h2>
                <p className="text-base text-gray-600 leading-relaxed">
                  We use cookies to enhance your browsing experience, provide personalized content,
                  and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
                </p>
                <div className="mt-3 flex items-center space-x-4">
                  <Link
                    href="/cookie-policy"
                    className="text-sm text-trc-blue-600 hover:text-trc-blue-700 underline"
                  >
                    Cookie Policy
                  </Link>
                  <span className="text-gray-300">•</span>
                  <Link
                    href="/privacy-policy"
                    className="text-sm text-trc-blue-600 hover:text-trc-blue-700 underline"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>

            {/* Right section: Buttons (30% width) */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleClose('reject')}
                className="px-6 py-3 text-base font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                aria-label="Reject cookies"
              >
                Reject
              </button>
              <button
                onClick={() => handleClose('accept')}
                className="px-6 py-3 text-base font-medium text-white bg-trc-blue-600 rounded-lg hover:bg-trc-blue-700 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-trc-blue-500"
                aria-label="Accept cookies"
              >
                Accept
              </button>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Icon and Title */}
            <div className="flex items-center mb-4">
              <svg
                className="w-10 h-10 text-trc-blue-600 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
                <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8" cy="8" r="1" fill="currentColor" />
                <circle cx="16" cy="8" r="1" fill="currentColor" />
                <circle cx="8" cy="16" r="1" fill="currentColor" />
                <circle cx="16" cy="16" r="1" fill="currentColor" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-900">
                Cookie Notice
              </h2>
            </div>

            {/* Message */}
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              We use cookies to enhance your browsing experience, provide personalized content,
              and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
            </p>

            {/* Policy Links */}
            <div className="flex items-center space-x-4 mb-4">
              <Link
                href="/cookie-policy"
                className="text-xs text-trc-blue-600 hover:text-trc-blue-700 underline"
              >
                Cookie Policy
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                href="/privacy-policy"
                className="text-xs text-trc-blue-600 hover:text-trc-blue-700 underline"
              >
                Privacy Policy
              </Link>
            </div>

            {/* Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => handleClose('reject')}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Reject
              </button>
              <button
                onClick={() => handleClose('accept')}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-trc-blue-600 rounded-lg hover:bg-trc-blue-700 transition-colors shadow-md"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}