'use client'

import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already made a cookie choice
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShowBanner(false)
  }

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: 'white',
        borderTop: '1px solid #e5e7eb',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#374151' }}>
          We use cookies to enhance your experience.{' '}
          <a href="/cookie-policy" style={{ color: '#5b4cdb', textDecoration: 'underline' }}>
            Cookie Policy
          </a>{' '}
          |{' '}
          <a href="/privacy-policy" style={{ color: '#5b4cdb', textDecoration: 'underline' }}>
            Privacy Policy
          </a>
        </p>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={handleReject}
          style={{
            padding: '8px 16px',
            backgroundColor: 'white',
            border: '1px solid #d1d5db',
            color: '#6b7280',
            borderRadius: '4px',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          Reject
        </button>
        <button
          onClick={handleAccept}
          style={{
            padding: '8px 16px',
            backgroundColor: '#5b4cdb',
            border: 'none',
            color: 'white',
            borderRadius: '4px',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          Accept
        </button>
      </div>
    </div>
  )
}