import Link from 'next/link'

export default function Impressum() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Impressum (Legal Notice)</h1>

          <div className="prose prose-lg max-w-none text-gray-700">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Company Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="font-bold text-xl mb-2">Tabula Rasa Coaching</p>
                <p>Karen Florence CPC, CPRWC</p>
                <p>967 Swedesford Rd</p>
                <p>Malvern, PA 19355</p>
                <p>United States</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-2">
                <p><strong>Phone:</strong> (610) 228-4145</p>
                <p><strong>Email:</strong> karen@tabularasacoaching.com</p>
                <p><strong>Website:</strong> www.tabularasacoaching.com</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Business Registration</h2>
              <div className="space-y-2">
                <p><strong>Business Registration Number:</strong> 123456789</p>
                <p><strong>VAT Identification Number:</strong> US123456789</p>
                <p><strong>Professional Certification:</strong> ICF Accredited Coach Training Program</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsible for Content</h2>
              <p className="mb-4">
                According to Section 5 TMG (German Telemedia Act) and applicable international laws:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">Karen Florence CPC, CPRWC</p>
                <p>Founder</p>
                <p>Tabula Rasa Coaching</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Liability Insurance</h2>
              <div className="space-y-2">
                <p><strong>Insurance Provider:</strong> Professional Coaches Insurance Co.</p>
                <p><strong>Coverage Area:</strong> United States and International</p>
                <p><strong>Policy Number:</strong> PC-2025-123456</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Dispute Resolution</h2>
              <p className="mb-4">
                The European Commission provides a platform for online dispute resolution (OS):
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-trc-blue-600 hover:text-trc-blue-700 underline ml-1">
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>
              <p>
                We are not obliged to participate in dispute resolution proceedings before a consumer
                arbitration board, but we are willing to do so.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Copyright Notice</h2>
              <p className="mb-4">
                All content on this website, including text, images, graphics, logos, and software,
                is the property of Tabula Rasa Coaching and is protected by international
                copyright laws.
              </p>
              <p>
                © 2025 Tabula Rasa Coaching. All rights reserved.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer</h2>
              <p className="mb-4">
                The information provided on this website is for general informational purposes only.
                While we strive to keep the information up to date and correct, we make no
                representations or warranties of any kind about the completeness, accuracy,
                reliability, suitability, or availability of the information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">External Links</h2>
              <p>
                This website may contain links to external websites that are not provided or
                maintained by us. We do not guarantee the accuracy, relevance, timeliness, or
                completeness of any information on these external websites.
              </p>
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