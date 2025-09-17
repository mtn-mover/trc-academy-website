'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // For now, just show a success message
      // In production, this would send a password reset email
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-trc-blue-50 via-white to-trc-gray-50 flex items-center justify-center py-12 px-4">
        <div className="w-full" style={{ maxWidth: '384px' }}>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="mb-4">
              <svg className="mx-auto h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-trc-gray-900 mb-2">Check your email</h2>
            <p className="text-trc-gray-600 mb-6">
              If an account exists for {email}, we&apos;ve sent password reset instructions to that email address.
            </p>
            <Link
              href="/login"
              className="inline-block w-full py-2 px-4 bg-trc-blue-600 text-white text-sm font-medium rounded-md hover:bg-trc-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-trc-blue-500 transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-trc-blue-50 via-white to-trc-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full" style={{ maxWidth: '384px' }}>
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-trc-gray-900 mb-2">
            Forgot Password?
          </h1>
          <p className="text-trc-gray-600">Enter your email to reset your password</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-trc-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trc-blue-500 focus:border-trc-blue-500 placeholder:text-gray-400"
                placeholder="you@example.com"
                required
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-trc-blue-600 text-white text-sm font-medium rounded-md hover:bg-trc-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-trc-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Reset Instructions'
              )}
            </button>

            {/* Back to login */}
            <div className="text-center">
              <Link
                href="/login"
                className="text-sm text-trc-blue-600 hover:text-trc-blue-700"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>

        {/* Note */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-xs text-amber-800">
            <strong>Note:</strong> Password reset functionality is not yet implemented.
            Please contact your administrator to reset your password.
          </p>
        </div>
      </div>
    </div>
  );
}