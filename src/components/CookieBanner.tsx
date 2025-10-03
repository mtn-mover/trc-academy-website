'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent')
    const consentDate = localStorage.getItem('cookieConsentDate')

    // Check if consent exists and is less than 365 days old
    if (cookieConsent && consentDate) {
      const daysSinceConsent = (Date.now() - new Date(consentDate).getTime()) / (1000 * 60 * 60 * 24)
      if (daysSinceConsent < 365) {
        return
      }
    }

    // Show banner with animation delay
    setTimeout(() => {
      setShowBanner(true)
      setTimeout(() => setIsVisible(true), 50)
    }, 1000)
  }, [])

  const handleAcceptAll = () => {
    setIsVisible(false)
    setTimeout(() => {
      localStorage.setItem('cookieConsent', 'accepted')
      localStorage.setItem('cookieConsentDate', new Date().toISOString())
      setShowBanner(false)
    }, 300)
  }

  const handleRejectAll = () => {
    setIsVisible(false)
    setTimeout(() => {
      localStorage.setItem('cookieConsent', 'rejected')
      localStorage.setItem('cookieConsentDate', new Date().toISOString())
      setShowBanner(false)
    }, 300)
  }

  if (!showBanner) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 z-[999] ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => {
          setIsVisible(false)
          setTimeout(() => setShowBanner(false), 300)
        }}
      />

      {/* Banner */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-[500px] bg-white rounded-2xl shadow-2xl p-6 z-[1000] transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        {/* Cookie Icon */}
        <div className="mb-4 flex justify-center">
          <div className="w-12 h-12 bg-trc-blue-50 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-trc-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="7.5" cy="8.5" r="1.5" fill="currentColor"/>
              <circle cx="16.5" cy="8.5" r="1.5" fill="currentColor"/>
              <circle cx="7.5" cy="15.5" r="1.5" fill="currentColor"/>
              <circle cx="16.5" cy="15.5" r="1.5" fill="currentColor"/>
              <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
          We Value Your Privacy
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4 text-center">
          We use cookies to enhance your browsing experience, provide personalized content, and analyze our traffic.
          By clicking "Accept All", you consent to our use of cookies.{' '}
          <Link href="/cookie-policy" className="text-trc-blue-600 hover:text-trc-blue-700 underline font-medium">
            Learn more
          </Link>
        </p>

        {/* Settings Section (Optional) */}
        {showSettings && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg space-y-3">
            <label className="flex items-center justify-center gap-3 cursor-pointer">
              <span className="text-sm font-medium text-gray-700">Essential Cookies</span>
              <input type="checkbox" checked disabled className="w-4 h-4 text-trc-blue-600 rounded" />
            </label>
            <label className="flex items-center justify-center gap-3 cursor-pointer">
              <span className="text-sm font-medium text-gray-700">Analytics Cookies</span>
              <input type="checkbox" className="w-4 h-4 text-trc-blue-600 rounded" />
            </label>
            <label className="flex items-center justify-center gap-3 cursor-pointer">
              <span className="text-sm font-medium text-gray-700">Marketing Cookies</span>
              <input type="checkbox" className="w-4 h-4 text-trc-blue-600 rounded" />
            </label>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
          >
            {showSettings ? 'Hide Settings' : 'Customize'}
          </button>
          <button
            onClick={handleRejectAll}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
          >
            Reject All
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-5 py-2.5 text-sm font-medium text-white bg-trc-blue-600 rounded-lg hover:bg-trc-blue-700 shadow-lg shadow-trc-blue-600/30 hover:shadow-trc-blue-600/40 transition-all duration-200"
          >
            Accept All
          </button>
        </div>

        {/* Privacy Links */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-4 text-xs text-gray-500">
          <Link href="/privacy-policy" className="hover:text-trc-blue-600 transition-colors">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link href="/cookie-policy" className="hover:text-trc-blue-600 transition-colors">
            Cookie Policy
          </Link>
          <span>•</span>
          <Link href="/impressum" className="hover:text-trc-blue-600 transition-colors">
            Legal Notice
          </Link>
        </div>
      </div>
    </>
  )
}