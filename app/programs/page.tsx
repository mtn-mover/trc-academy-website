'use client';

import { useEffect, useState } from 'react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import Link from 'next/link';

interface Program {
  id: string;
  title: string;
  teacherName: string;
  description: string | null;
  startDate: string;
  endDate: string;
  price: string | null;
  paymentConditions: string | null;
}

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch('/api/programs');
      if (response.ok) {
        const data = await response.json();
        setPrograms(data);
      }
    } catch (error) {
      console.error('Failed to fetch programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  const formatPrice = (price: string | null) => {
    if (!price) return 'Contact for pricing';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const isProgramUpcoming = (startDate: string) => {
    return new Date(startDate) > new Date();
  };

  const isProgramActive = (startDate: string, endDate: string) => {
    const now = new Date();
    return new Date(startDate) <= now && new Date(endDate) >= now;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-trc-blue-600 to-trc-blue-800 text-white py-20 lg:py-28">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our Programs
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover our professional coaching certification programs designed for mature professionals seeking meaningful second careers.
            </p>
          </div>
        </section>

        {/* Programs List */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-trc-gold-600"></div>
              </div>
            ) : programs.length === 0 ? (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <svg
                    className="w-16 h-16 text-trc-gray-400 mx-auto mb-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <h2 className="text-2xl font-bold text-trc-gray-900 mb-4">
                    New Programs Coming Soon
                  </h2>
                  <p className="text-lg text-trc-gray-600 mb-8">
                    We&apos;re preparing exciting new coaching certification programs. Contact us to be the first to know when enrollment opens.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-block px-8 py-4 bg-gradient-to-r from-trc-gold-600 to-trc-gold-700 text-white font-bold rounded-lg hover:from-trc-gold-700 hover:to-trc-gold-800 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {programs.map((program) => (
                  <div
                    key={program.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
                  >
                    {/* Program Status Badge */}
                    <div className="bg-gradient-to-r from-trc-gold-600 to-trc-gold-700 text-white px-6 py-3 text-sm font-semibold">
                      {isProgramUpcoming(program.startDate) ? (
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Enrollment Open
                        </span>
                      ) : isProgramActive(program.startDate, program.endDate) ? (
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          In Progress
                        </span>
                      ) : (
                        <span>Program</span>
                      )}
                    </div>

                    <div className="p-6 lg:p-8">
                      {/* Title */}
                      <h3 className="text-2xl font-bold text-trc-gray-900 mb-3">
                        {program.title}
                      </h3>

                      {/* Teacher */}
                      <div className="flex items-center text-trc-gray-600 mb-4">
                        <svg
                          className="w-5 h-5 mr-2 text-trc-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span className="font-medium">Instructor: {program.teacherName}</span>
                      </div>

                      {/* Description */}
                      {program.description && (
                        <p className="text-trc-gray-600 mb-6 line-clamp-3 leading-relaxed">
                          {program.description}
                        </p>
                      )}

                      {/* Dates */}
                      <div className="flex items-center text-trc-gray-600 mb-3">
                        <svg
                          className="w-5 h-5 mr-2 text-trc-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>
                          {formatDate(program.startDate)} – {formatDate(program.endDate)}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center mb-4">
                        <svg
                          className="w-5 h-5 mr-2 text-trc-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-xl font-bold text-trc-gold-600">
                          {formatPrice(program.price)}
                        </span>
                      </div>

                      {/* Payment Conditions */}
                      {program.paymentConditions && (
                        <p className="text-sm text-trc-gray-500 mb-6 bg-gray-50 p-3 rounded-lg">
                          {program.paymentConditions}
                        </p>
                      )}

                      {/* Apply Button */}
                      <Link
                        href="/contact"
                        className="block w-full text-center bg-gradient-to-r from-trc-blue-600 to-trc-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-trc-blue-700 hover:to-trc-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-white to-trc-gold-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-trc-gray-900 mb-6">
              Questions About Our Programs?
            </h2>
            <p className="text-xl text-trc-gray-600 mb-8 max-w-2xl mx-auto">
              Schedule a free consultation to learn more about our programs and find the right fit for your career goals.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-trc-gold-600 to-trc-gold-700 text-white font-bold rounded-lg hover:from-trc-gold-700 hover:to-trc-gold-800 hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl text-lg"
            >
              Schedule a Free Consultation
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
