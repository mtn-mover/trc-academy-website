'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, cannot be disabled
    functional: true,
    analytics: true,
    marketing: false
  })

  useEffect(() => {
    // Check if user has already made a cookie choice
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      // Delay showing banner for better UX
      setTimeout(() => setShowBanner(true), 1000)
    }
  }, [])

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true
    }
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted))
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setShowBanner(false)
  }

  const acceptSelected = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences))
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setShowBanner(false)
    setShowPreferences(false)
  }

  const rejectAll = () => {
    const onlyEssential = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false
    }
    localStorage.setItem('cookieConsent', JSON.stringify(onlyEssential))
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="bg-white shadow-2xl border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-5">
          {!showPreferences ? (
            // Main Banner View - Compact
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              {/* Text Content */}
              <div className="flex items-center gap-3 flex-1">
                <svg className="hidden sm:block w-8 h-8 text-trc-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div className="text-center lg:text-left">
                  <p className="text-sm sm:text-base text-gray-700">
                    We use cookies to enhance your experience. By clicking &ldquo;Accept All&rdquo;, you agree to our{' '}
                    <Link href="/cookie-policy" className="text-trc-blue-600 hover:text-trc-blue-700 underline">
                      Cookie Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setShowPreferences(true)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Customize
                </button>
                <button
                  onClick={rejectAll}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 text-sm font-medium text-white bg-trc-blue-600 rounded-lg hover:bg-trc-blue-700 transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          ) : (
            // Preferences View - Compact
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Cookie Preferences</h3>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
              </div>

              {/* Cookie Options - Horizontal Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                {/* Essential */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Essential</h4>
                      <p className="text-xs text-gray-600 mt-0.5">Always active</p>
                    </div>
                    <div className="relative w-10 h-5">
                      <input
                        type="checkbox"
                        checked={true}
                        disabled
                        className="sr-only"
                      />
                      <div className="block bg-green-600 w-full h-full rounded-full cursor-not-allowed"></div>
                      <div className="absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform transform translate-x-5"></div>
                    </div>
                  </div>
                </div>

                {/* Functional */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Functional</h4>
                      <p className="text-xs text-gray-600 mt-0.5">Enhanced features</p>
                    </div>
                    <button
                      onClick={() => setPreferences({...preferences, functional: !preferences.functional})}
                      className="relative w-10 h-5"
                    >
                      <div className={`block w-full h-full rounded-full transition-colors ${
                        preferences.functional ? 'bg-trc-blue-600' : 'bg-gray-300'
                      }`}></div>
                      <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform transform ${
                        preferences.functional ? 'translate-x-5' : 'translate-x-0'
                      }`}></div>
                    </button>
                  </div>
                </div>

                {/* Analytics */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Analytics</h4>
                      <p className="text-xs text-gray-600 mt-0.5">Help us improve</p>
                    </div>
                    <button
                      onClick={() => setPreferences({...preferences, analytics: !preferences.analytics})}
                      className="relative w-10 h-5"
                    >
                      <div className={`block w-full h-full rounded-full transition-colors ${
                        preferences.analytics ? 'bg-trc-blue-600' : 'bg-gray-300'
                      }`}></div>
                      <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform transform ${
                        preferences.analytics ? 'translate-x-5' : 'translate-x-0'
                      }`}></div>
                    </button>
                  </div>
                </div>

                {/* Marketing */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Marketing</h4>
                      <p className="text-xs text-gray-600 mt-0.5">Targeted ads</p>
                    </div>
                    <button
                      onClick={() => setPreferences({...preferences, marketing: !preferences.marketing})}
                      className="relative w-10 h-5"
                    >
                      <div className={`block w-full h-full rounded-full transition-colors ${
                        preferences.marketing ? 'bg-trc-blue-600' : 'bg-gray-300'
                      }`}></div>
                      <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform transform ${
                        preferences.marketing ? 'translate-x-5' : 'translate-x-0'
                      }`}></div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={rejectAll}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={acceptSelected}
                  className="px-4 py-2 text-sm font-medium text-white bg-trc-blue-600 rounded-lg hover:bg-trc-blue-700 transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}