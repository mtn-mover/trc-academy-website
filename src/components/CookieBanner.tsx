'use client'

import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

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

  const handleAccept = () => {
    setIsVisible(false)
    setTimeout(() => {
      localStorage.setItem('cookieConsent', 'accepted')
      localStorage.setItem('cookieConsentDate', new Date().toISOString())
      setShowBanner(false)
    }, 300)
  }

  const handleReject = () => {
    setIsVisible(false)
    setTimeout(() => {
      localStorage.setItem('cookieConsent', 'rejected')
      localStorage.setItem('cookieConsentDate', new Date().toISOString())
      setShowBanner(false)
    }, 300)
  }

  if (!showBanner) return null

  return (
    <div className={`cookie-banner ${isVisible ? 'visible' : ''}`}>
      <div className="cookie-content">
        <p>
          We use cookies to enhance your experience.{' '}
          <a href="/cookie-policy">Cookie Policy</a>
          <span className="separator"> | </span>
          <a href="/privacy-policy">Privacy Policy</a>
        </p>
      </div>
      <div className="cookie-buttons">
        <button className="reject" onClick={handleReject}>
          Reject
        </button>
        <button className="accept" onClick={handleAccept}>
          Accept
        </button>
      </div>

      <style jsx>{`
        .cookie-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 1000;
          background: white;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
          padding: 16px 32px;
          transform: translateY(100%);
          transition: transform 0.3s ease-out;
        }

        .cookie-banner.visible {
          transform: translateY(0);
        }

        .cookie-content p {
          margin: 0;
          font-size: 0.95rem;
          color: #4a5568;
          line-height: 1.5;
        }

        .cookie-content a {
          color: #5b4cdb;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .cookie-content a:hover {
          text-decoration: underline;
        }

        .cookie-content .separator {
          color: #cbd5e0;
          margin: 0 2px;
        }

        .cookie-buttons {
          display: flex;
          gap: 12px;
        }

        .cookie-buttons button {
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
          border: none;
          outline: none;
        }

        .cookie-buttons button:focus-visible {
          outline: 2px solid #5b4cdb;
          outline-offset: 2px;
        }

        .cookie-buttons .reject {
          background: transparent;
          border: 1px solid #d1d5db;
          color: #6b7280;
          padding: 8px 20px;
          border-radius: 6px;
        }

        .cookie-buttons .reject:hover {
          background: #f3f4f6;
        }

        .cookie-buttons .accept {
          background: #5b4cdb;
          color: white;
          padding: 8px 24px;
          border-radius: 6px;
          font-weight: 500;
        }

        .cookie-buttons .accept:hover {
          background: #4c3db8;
        }

        @media (max-width: 640px) {
          .cookie-banner {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            padding: 16px 20px;
          }

          .cookie-content p {
            font-size: 0.875rem;
          }

          .cookie-buttons {
            width: 100%;
            gap: 8px;
          }

          .cookie-buttons button {
            flex: 1;
            padding: 10px 16px;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  )
}