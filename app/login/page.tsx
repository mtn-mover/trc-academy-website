'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  const handleStudentLogin = () => {
    // In a real app, this would handle authentication
    router.push('/student/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-trc-blue-50 via-white to-trc-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full" style={{maxWidth: '480px'}}>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-trc-gray-900 mb-4">
            Welcome Back
          </h1>
          <p className="text-xl text-trc-gray-700">
            Access your student portal
          </p>
        </div>

        {/* Student Portal Login */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-trc-blue-600 p-6">
            <div className="flex items-center justify-center">
              <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white text-center mt-4">
              Student Portal
            </h2>
          </div>
          
          <div className="p-8">
            <p className="text-lg text-trc-gray-700 mb-6 text-center">
              Access your courses, resources, and connect with your coaching community.
            </p>
            
            <form onSubmit={(e) => { e.preventDefault(); handleStudentLogin(); }} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-base font-medium text-trc-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trc-blue-500 focus:border-transparent text-lg"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-base font-medium text-trc-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trc-blue-500 focus:border-transparent text-lg"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-trc-blue-600 focus:ring-trc-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-trc-gray-700">
                    Remember me
                  </label>
                </div>

                <Link href="#" className="text-sm text-trc-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-3 bg-trc-blue-600 text-white font-semibold rounded-lg hover:bg-trc-blue-700 transition-colors duration-200 text-lg"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-trc-gray-600 text-lg">
            Not enrolled yet?{' '}
            <Link href="/contact" className="text-trc-blue-600 hover:underline font-medium">
              Contact us to begin your journey
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}