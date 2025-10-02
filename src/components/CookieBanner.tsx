'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already made a cookie choice
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      // Delay showing banner for better UX
      setTimeout(() => setShowBanner(true), 1500)
    }
  }, [])

  const acceptAll = () => {
    const consent = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true
    }
    localStorage.setItem('cookieConsent', JSON.stringify(consent))
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setShowBanner(false)
  }

  const rejectAll = () => {
    const consent = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false
    }
    localStorage.setItem('cookieConsent', JSON.stringify(consent))
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 lg:left-auto lg:right-6 lg:max-w-md z-50">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 md:p-5">
        {/* Header with Icon */}
        <div className="flex items-start mb-3">
          <svg className="w-5 h-5 text-trc-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900">Cookie Notice</h3>
          </div>
        </div>

        {/* Message */}
        <p className="text-sm text-gray-600 mb-4">
          We use cookies to enhance your experience and analyze our traffic. Please choose your preference below.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={rejectAll}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Reject All
          </button>
          <button
            onClick={acceptAll}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-trc-blue-600 rounded-md hover:bg-trc-blue-700 transition-colors"
          >
            Accept All
          </button>
        </div>

        {/* Links */}
        <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-center gap-3 text-xs">
          <Link href="/cookie-policy" className="text-gray-500 hover:text-trc-blue-600 transition-colors">
            Cookie Policy
          </Link>
          <span className="text-gray-300">•</span>
          <Link href="/privacy-policy" className="text-gray-500 hover:text-trc-blue-600 transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  )
}