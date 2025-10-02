'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, cannot be disabled
    functional: false,
    analytics: false,
    marketing: false
  })

  useEffect(() => {
    // Check if user has already made a cookie choice
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      setShowBanner(true)
    } else {
      // Load saved preferences
      try {
        const savedPrefs = JSON.parse(cookieConsent)
        setPreferences(savedPrefs)
      } catch (e) {
        setShowBanner(true)
      }
    }
  }, [])

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true
    }
    setPreferences(allAccepted)
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
    setPreferences(onlyEssential)
    localStorage.setItem('cookieConsent', JSON.stringify(onlyEssential))
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-gray-200 shadow-2xl">
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          {!showPreferences ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  We value your privacy
                </h3>
                <p className="text-sm text-gray-600">
                  We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                  By clicking "Accept All", you consent to our use of cookies. Read our{' '}
                  <Link href="/cookie-policy" className="text-trc-blue-600 hover:text-trc-blue-700 underline">
                    Cookie Policy
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy-policy" className="text-trc-blue-600 hover:text-trc-blue-700 underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={rejectAll}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={() => setShowPreferences(true)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Manage Preferences
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
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Cookie Preferences
              </h3>
              <div className="space-y-3 mb-4">
                {/* Essential Cookies - Always enabled */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="mt-1 h-4 w-4 text-trc-blue-600 rounded border-gray-300"
                  />
                  <div className="ml-3">
                    <label className="text-sm font-medium text-gray-900">
                      Essential Cookies
                    </label>
                    <p className="text-xs text-gray-500">
                      Required for the website to function properly. Cannot be disabled.
                    </p>
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={(e) => setPreferences({...preferences, functional: e.target.checked})}
                    className="mt-1 h-4 w-4 text-trc-blue-600 rounded border-gray-300 cursor-pointer"
                  />
                  <div className="ml-3">
                    <label className="text-sm font-medium text-gray-900 cursor-pointer">
                      Functional Cookies
                    </label>
                    <p className="text-xs text-gray-500">
                      Enable enhanced functionality and personalization.
                    </p>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                    className="mt-1 h-4 w-4 text-trc-blue-600 rounded border-gray-300 cursor-pointer"
                  />
                  <div className="ml-3">
                    <label className="text-sm font-medium text-gray-900 cursor-pointer">
                      Analytics Cookies
                    </label>
                    <p className="text-xs text-gray-500">
                      Help us understand how visitors interact with our website.
                    </p>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                    className="mt-1 h-4 w-4 text-trc-blue-600 rounded border-gray-300 cursor-pointer"
                  />
                  <div className="ml-3">
                    <label className="text-sm font-medium text-gray-900 cursor-pointer">
                      Marketing Cookies
                    </label>
                    <p className="text-xs text-gray-500">
                      Used to track visitors across websites for marketing purposes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => setShowPreferences(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Back
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
    </>
  )
}