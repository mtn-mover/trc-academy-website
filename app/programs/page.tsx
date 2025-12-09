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
      day: 'numeric',
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
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Programs</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Discover our professional coaching certification programs designed for mature professionals seeking meaningful second careers.
            </p>
          </div>
        </section>

        {/* Programs List */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              </div>
            ) : programs.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  No programs currently available
                </h2>
                <p className="text-gray-600">
                  Please check back soon for upcoming programs, or{' '}
                  <Link href="/contact" className="text-purple-600 hover:underline">
                    contact us
                  </Link>{' '}
                  to learn about future offerings.
                </p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {programs.map((program) => (
                  <div
                    key={program.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Program Status Badge */}
                    <div className="bg-purple-600 text-white px-4 py-2 text-sm font-medium">
                      {isProgramUpcoming(program.startDate) ? (
                        <span>Upcoming Program</span>
                      ) : isProgramActive(program.startDate, program.endDate) ? (
                        <span>In Progress</span>
                      ) : (
                        <span>Program</span>
                      )}
                    </div>

                    <div className="p-6">
                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {program.title}
                      </h3>

                      {/* Teacher */}
                      <div className="flex items-center text-gray-600 mb-4">
                        <svg
                          className="w-5 h-5 mr-2 text-purple-500"
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
                        <span className="font-medium">{program.teacherName}</span>
                      </div>

                      {/* Description */}
                      {program.description && (
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {program.description}
                        </p>
                      )}

                      {/* Dates */}
                      <div className="flex items-center text-gray-600 mb-2">
                        <svg
                          className="w-5 h-5 mr-2 text-purple-500"
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
                        <span className="text-sm">
                          {formatDate(program.startDate)} - {formatDate(program.endDate)}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center text-gray-600 mb-4">
                        <svg
                          className="w-5 h-5 mr-2 text-purple-500"
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
                        <span className="text-lg font-semibold text-purple-600">
                          {formatPrice(program.price)}
                        </span>
                      </div>

                      {/* Payment Conditions */}
                      {program.paymentConditions && (
                        <p className="text-sm text-gray-500 mb-4 italic">
                          {program.paymentConditions}
                        </p>
                      )}

                      {/* Apply Button */}
                      <Link
                        href="/contact"
                        className="block w-full text-center bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors"
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
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Your Coaching Journey?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Contact us to learn more about our programs and find the right fit for your career goals.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-purple-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
