'use client';

import { useState } from 'react';
import Script from 'next/script';
import { executeRecaptcha } from '@/src/lib/recaptcha';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  // Get reCAPTCHA site key
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Get reCAPTCHA token
      let recaptchaToken = null;
      if (recaptchaLoaded && siteKey && siteKey !== 'your-site-key-here') {
        recaptchaToken = await executeRecaptcha('submit_contact_form');
        if (!recaptchaToken) {
          setSubmitStatus('error');
          setSubmitMessage('Security verification failed. Please try again.');
          setIsSubmitting(false);
          return;
        }
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(data.message || 'Thank you for your interest! We\'ll be in touch within 24 hours.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          interest: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Unable to send your message. Please contact us directly via email or phone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Obfuscate email to prevent spam crawlers
  const emailParts = ['karen', 'tabularasacoaching', 'com'];
  const email = `${emailParts[0]}@${emailParts[1]}.${emailParts[2]}`;

  return (
    <>
      {/* Load reCAPTCHA v3 Script */}
      {siteKey && siteKey !== 'your-site-key-here' && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
          onLoad={() => setRecaptchaLoaded(true)}
          strategy="lazyOnload"
        />
      )}

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-trc-warm-50 to-white py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl lg:text-5xl font-bold text-trc-gray-900 mb-6">
                Begin Your Journey
              </h1>
              <p className="text-lg lg:text-xl text-trc-gray-700 leading-relaxed">
                Take the first step toward discovering your soul&apos;s work.
                We&apos;re here to guide you on your transformation path.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-12 lg:py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Form */}
                <div>
                  <h2 className="text-4xl font-bold text-trc-gray-900 mb-6">
                    Schedule Your Consultation
                  </h2>
                  <p className="text-lg text-trc-gray-700 mb-8">
                    Complete the form below and we&apos;ll connect with you within 24 hours
                    to discuss your coaching journey.
                  </p>


                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 font-medium">
                        {submitMessage}
                      </p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 font-medium">
                        {submitMessage}
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-lg font-medium text-trc-gray-900 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        disabled={isSubmitting}
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trc-blue-500 focus:border-transparent text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-lg font-medium text-trc-gray-900 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        disabled={isSubmitting}
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trc-blue-500 focus:border-transparent text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-lg font-medium text-trc-gray-900 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        disabled={isSubmitting}
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trc-blue-500 focus:border-transparent text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label htmlFor="interest" className="block text-lg font-medium text-trc-gray-900 mb-2">
                        I&apos;m Interested In *
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        required
                        disabled={isSubmitting}
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trc-blue-500 focus:border-transparent text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">Select an option</option>
                        <option value="certification">Professional Coach Certification</option>
                        <option value="consultation">General Consultation</option>
                        <option value="info">More Information</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-lg font-medium text-trc-gray-900 mb-2">
                        Tell Us About Your Journey
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        disabled={isSubmitting}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trc-blue-500 focus:border-transparent text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Share what brings you to coaching and what you hope to achieve..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-trc-blue-600 text-white font-semibold rounded-lg hover:bg-trc-blue-700 hover:scale-105 transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>

                    {/* reCAPTCHA Badge Notice */}
                    {siteKey && siteKey !== 'your-site-key-here' && (
                      <p className="text-xs text-gray-500 mt-4 text-center">
                        This site is protected by reCAPTCHA and the Google{' '}
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">
                          Privacy Policy
                        </a>{' '}
                        and{' '}
                        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline">
                          Terms of Service
                        </a>{' '}
                        apply.
                      </p>
                    )}
                  </form>
                </div>

                {/* Contact Information */}
                <div className="lg:pl-8">
                  <h2 className="text-4xl font-bold text-trc-gray-900 mb-6">
                    Connect With Us
                  </h2>

                  <div className="space-y-6 mb-8">
                    <div className="flex items-start bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                      <svg className="w-6 h-6 text-trc-blue-600 mt-1 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <h3 className="text-2xl font-semibold text-trc-gray-900 mb-1">Email</h3>
                        <a
                          href={`mailto:${email}`}
                          className="text-lg text-trc-blue-600 hover:underline"
                          onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `mailto:${email}`;
                          }}
                        >
                          <span>{emailParts[0]}</span>
                          <span>@</span>
                          <span>{emailParts[1]}</span>
                          <span>.</span>
                          <span>{emailParts[2]}</span>
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                      <svg className="w-6 h-6 text-trc-blue-600 mt-1 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <h3 className="text-2xl font-semibold text-trc-gray-900 mb-1">Phone</h3>
                        <p className="text-lg text-trc-gray-700">+1 610 228 4145</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-trc-blue-50 border-l-4 border-trc-blue-600 p-6 rounded-r-lg">
                    <h3 className="text-xl font-semibold text-trc-gray-900 mb-2">
                      Ready to Begin Your Transformation?
                    </h3>
                    <p className="text-lg text-trc-gray-700">
                      Contact us directly via email or phone to schedule your consultation
                      and take the first step toward discovering your soul&apos;s work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
