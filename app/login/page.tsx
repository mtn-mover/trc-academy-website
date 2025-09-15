'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check for error messages in URL params
  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      switch (errorParam) {
        case 'no-permissions':
          setError('Access denied - no permissions assigned. Contact administrator.');
          break;
        case 'access-expired':
          setError('Your access has expired. Please contact administrator to renew.');
          break;
        default:
          setError('Authentication error. Please try again.');
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        // Parse specific error messages from the auth system
        if (result.error.includes('inactive')) {
          setError('Account is inactive. Please contact administrator.');
        } else if (result.error.includes('no permissions')) {
          setError('Access denied - no permissions assigned.');
        } else if (result.error.includes('expired')) {
          setError('Access expired. Please contact administrator to renew.');
        } else {
          setError(result.error);
        }
      } else {
        // Get the actual user roles from session and redirect accordingly
        const response = await fetch('/api/auth/session');
        const session = await response.json();

        if (session?.user) {
          const user = session.user;

          // Redirect to appropriate dashboard based on highest priority role
          // Priority: Admin > Teacher > Student
          if (user.isAdmin) {
            router.push('/admin/dashboard');
          } else if (user.isTeacher) {
            router.push('/teacher/dashboard');
          } else if (user.isStudent) {
            router.push('/student/dashboard');
          } else {
            setError('No valid role assigned. Contact administrator.');
          }
          router.refresh();
        }
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-trc-blue-50 via-white to-trc-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full" style={{ maxWidth: '384px' }}>
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-trc-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-trc-gray-600">
            Sign in to your TRC Academy account
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-trc-blue-500 focus:border-transparent transition-colors text-base"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-trc-blue-500 focus:border-transparent transition-colors text-base"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-3.5 w-3.5 text-trc-blue-600 focus:ring-trc-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-trc-blue-600 hover:text-trc-blue-500">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-md text-white text-base font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-trc-blue-600 hover:bg-trc-blue-700 focus:ring-2 focus:ring-offset-1 focus:ring-trc-blue-500"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2.5 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          {/* Back to Homepage */}
          <div className="mt-5 text-center">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-800">
              Back to Homepage
            </Link>
          </div>
        </div>

        {/* Test Accounts Info */}
        <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
          <p className="text-sm font-semibold text-blue-800 mb-1.5">Test Accounts:</p>
          <div className="text-xs text-blue-700 space-y-1">
            <p><strong className="text-blue-900">Admin:</strong> admin@trc.com / admin123</p>
            <p><strong className="text-blue-900">Teacher:</strong> teacher@trc.com / teacher123</p>
            <p><strong className="text-blue-900">Student:</strong> student@trc.com / student123</p>
            <p><strong className="text-blue-900">Multi-role (Admin + Teacher):</strong> multi@trc.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}