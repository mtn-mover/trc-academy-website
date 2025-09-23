'use client';

import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Obfuscate email to prevent spam crawlers
  const emailParts = ['karen', 'tabularasacoaching', 'com'];
  const email = `${emailParts[0]}@${emailParts[1]}.${emailParts[2]}`;

  return (
    <footer className="bg-orange-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-2 text-white">TRC Training Academy</h3>
            <p className="text-sm text-white mb-4">Tabula Rasa Coach Training</p>
            <p className="text-white mb-6 leading-relaxed">
              Empowering professionals to discover their soul&apos;s work through
              transformative coaching programs. Your wisdom, experience, and calling
              converge here.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white hover:text-white transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/coaching-training" className="text-white hover:text-white transition-colors duration-200">
                  Coach Training
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-white hover:text-white transition-colors duration-200">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-white">Get In Touch</h4>
            <ul className="space-y-3 text-white">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a
                  href={`mailto:${email}`}
                  className="hover:text-white transition-colors"
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
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+1 610 228 4145</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-orange-500">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white text-sm">
              © {currentYear} TRC Training Academy. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-white hover:text-white text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white hover:text-white text-sm transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;