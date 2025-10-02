import Link from 'next/link'

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Cookie Policy</h1>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-sm text-gray-600 mb-6">Last updated: November 2025</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies</h2>
              <p className="mb-4">
                Cookies are small text files that are placed on your device when you visit our website.
                They help us provide you with a better experience by remembering your preferences and
                understanding how you use our site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Types of Cookies We Use</h2>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Essential Cookies</h3>
                <p className="mb-2">
                  These cookies are necessary for the website to function properly and cannot be
                  switched off in our systems.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Authentication and login cookies</li>
                  <li>Session management cookies</li>
                  <li>Security cookies</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Functional Cookies</h3>
                <p className="mb-2">
                  These cookies enable enhanced functionality and personalization.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Language preferences</li>
                  <li>User interface customization</li>
                  <li>Remembering user choices</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics Cookies</h3>
                <p className="mb-2">
                  These cookies help us understand how visitors interact with our website.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Google Analytics (anonymous usage data)</li>
                  <li>Page view tracking</li>
                  <li>User journey analysis</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Marketing Cookies</h3>
                <p className="mb-2">
                  These cookies may be set through our site by our advertising partners.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Social media integration</li>
                  <li>Targeted advertising</li>
                  <li>Campaign effectiveness measurement</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cookie Duration</h2>
              <p className="mb-4">Cookies can be either:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Session Cookies:</strong> These are temporary cookies that expire when you
                  close your browser
                </li>
                <li>
                  <strong>Persistent Cookies:</strong> These remain on your device for a set period
                  or until you delete them
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Managing Cookies</h2>
              <p className="mb-4">
                You have several options for managing cookies:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Browser Settings:</strong> Most browsers allow you to refuse cookies or
                  delete cookies already stored on your device
                </li>
                <li>
                  <strong>Cookie Banner:</strong> Use our cookie consent banner to manage your
                  preferences
                </li>
                <li>
                  <strong>Opt-out Tools:</strong> Use industry opt-out tools for analytics and
                  advertising cookies
                </li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                Note: Disabling certain cookies may impact the functionality of our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Third-Party Cookies</h2>
              <p className="mb-4">
                Some cookies are placed by third-party services that appear on our pages:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Google Analytics for website analytics</li>
                <li>YouTube for embedded videos</li>
                <li>Social media platforms for sharing features</li>
                <li>Payment processors for secure transactions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Updates to This Policy</h2>
              <p>
                We may update this cookie policy from time to time to reflect changes in our practices
                or for other operational, legal, or regulatory reasons. Please revisit this page
                regularly to stay informed about our use of cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">Tabula Rasa Coaching</p>
                <p>Email: karen@tabularasacoaching.com</p>
                <p>Phone: (610) 228-4145</p>
                <p>967 Swedesford Rd, Malvern, PA 19355</p>
              </div>
            </section>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link
              href="/"
              className="text-trc-blue-600 hover:text-trc-blue-700 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}