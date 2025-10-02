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
      // Add padding to body to prevent overlap
      document.body.style.paddingBottom = '80px'
      setTimeout(() => setIsVisible(true), 50)
    }, 1000)

    // Cleanup on unmount
    return () => {
      document.body.style.paddingBottom = '0'
    }
  }, [])

  const handleAccept = () => {
    setIsVisible(false)
    setTimeout(() => {
      localStorage.setItem('cookieConsent', 'accepted')
      localStorage.setItem('cookieConsentDate', new Date().toISOString())
      document.body.style.paddingBottom = '0'
      setShowBanner(false)
    }, 300)
  }

  const handleReject = () => {
    setIsVisible(false)
    setTimeout(() => {
      localStorage.setItem('cookieConsent', 'rejected')
      localStorage.setItem('cookieConsentDate', new Date().toISOString())
      document.body.style.paddingBottom = '0'
      setShowBanner(false)
    }, 300)
  }

  if (!showBanner) return null

  return (
    <div className={`cookie-banner ${isVisible ? 'visible' : ''}`}>
      <div className="cookie-content">
        <div className="cookie-message">
          <svg className="cookie-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="7.5" cy="8.5" r="1.5" fill="currentColor"/>
            <circle cx="16.5" cy="8.5" r="1.5" fill="currentColor"/>
            <circle cx="7.5" cy="15.5" r="1.5" fill="currentColor"/>
            <circle cx="16.5" cy="15.5" r="1.5" fill="currentColor"/>
            <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
          </svg>
          <p>
            We use cookies to enhance your experience.
            <span className="policy-links">
              <a href="/cookie-policy">Cookie Policy</a>
              <span className="separator">|</span>
              <a href="/privacy-policy">Privacy Policy</a>
            </span>
          </p>
        </div>
      </div>
      <div className="cookie-buttons">
        <button className="reject" onClick={handleReject}>
          Reject
        </button>
        <button className="accept" onClick={handleAccept}>
          Accept All
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
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
          padding: 20px 40px;
          transform: translateY(100%);
          transition: transform 0.3s ease-out, opacity 0.3s ease-out;
          opacity: 0;
        }

        .cookie-banner.visible {
          transform: translateY(0);
          opacity: 1;
        }

        .cookie-content {
          flex: 1;
        }

        .cookie-message {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .cookie-icon {
          width: 24px;
          height: 24px;
          color: #5b4cdb;
          flex-shrink: 0;
        }

        .cookie-content p {
          margin: 0;
          font-size: 1rem;
          color: #4a5568;
          line-height: 1.5;
        }

        .policy-links {
          margin-left: 8px;
        }

        .cookie-content a {
          color: #5b4cdb;
          text-decoration: none;
          position: relative;
          transition: color 0.2s ease;
        }

        .cookie-content a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 1px;
          background: #5b4cdb;
          transform: scaleX(0);
          transition: transform 0.2s ease;
        }

        .cookie-content a:hover::after {
          transform: scaleX(1);
        }

        .cookie-content a:hover {
          color: #4c3db8;
        }

        .separator {
          color: #cbd5e0;
          margin: 0 8px;
        }

        .cookie-buttons {
          display: flex;
          gap: 12px;
        }

        .cookie-buttons button {
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
          border: none;
          outline: none;
          font-weight: 500;
        }

        .cookie-buttons button:focus-visible {
          outline: 2px solid #5b4cdb;
          outline-offset: 2px;
        }

        .cookie-buttons .reject {
          background: white;
          border: 2px solid #e2e8f0;
          color: #64748b;
          padding: 10px 24px;
          border-radius: 8px;
        }

        .cookie-buttons .reject:hover {
          background: #f8fafc;
          border-color: #cbd5e0;
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .cookie-buttons .accept {
          background: #5b4cdb;
          color: white;
          padding: 10px 28px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(91, 76, 219, 0.2);
        }

        .cookie-buttons .accept:hover {
          background: #4c3db8;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(91, 76, 219, 0.3);
        }

        @media (max-width: 768px) {
          .cookie-banner {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
            padding: 20px 20px;
          }

          .cookie-message {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .cookie-content p {
            font-size: 0.95rem;
          }

          .policy-links {
            display: block;
            margin-left: 0;
            margin-top: 4px;
          }

          .cookie-buttons {
            width: 100%;
            gap: 10px;
          }

          .cookie-buttons button {
            flex: 1;
            padding: 12px 20px;
          }
        }
      `}</style>
    </div>
  )
}