'use client'

import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
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
    <div className="cookie-banner">
      <div className="cookie-content">
        <p>
          We use cookies to enhance your experience.{' '}
          <a href="/cookie-policy">Cookie Policy</a> |{' '}
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
          border-top: 1px solid #e5e7eb;
          padding: 16px 24px;
        }

        .cookie-content p {
          margin: 0;
          font-size: 14px;
          color: #374151;
        }

        .cookie-content a {
          color: #5b4cdb;
          text-decoration: underline;
        }

        .cookie-content a:hover {
          text-decoration: none;
        }

        .cookie-buttons {
          display: flex;
          gap: 8px;
        }

        .cookie-buttons button {
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .cookie-buttons button:hover {
          opacity: 0.9;
        }

        .cookie-buttons .reject {
          background: white;
          border: 1px solid #d1d5db;
          color: #6b7280;
        }

        .cookie-buttons .accept {
          background: #5b4cdb;
          border: none;
          color: white;
        }

        @media (max-width: 640px) {
          .cookie-banner {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            padding: 12px 16px;
          }

          .cookie-buttons {
            width: 100%;
          }

          .cookie-buttons button {
            flex: 1;
          }
        }
      `}</style>
    </div>
  )
}