import Link from 'next/link'

export default function Impressum() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Legal Notice</h1>

          <div className="prose prose-lg max-w-none text-gray-700">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Business Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="font-bold text-xl mb-2">Tabula Rasa Coaching</p>
                <p>Karen Florence, CPC, CPRWC</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Certifications</h2>
              <div className="space-y-2">
                <p><strong>Certified Professional Coach (CPC)</strong></p>
                <p><strong>Certified Professional Resume Writer & Coach (CPRWC)</strong></p>
                <p><strong>ICF Accredited Coach Training Program</strong></p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsible for Content</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">Karen Florence, CPC, CPRWC</p>
                <p>Owner & Founder</p>
                <p>Tabula Rasa Coaching</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Copyright Notice</h2>
              <p className="mb-4">
                All content on this website, including text, images, graphics, logos, and software,
                is the property of Tabula Rasa Coaching and is protected by United States
                copyright laws and international treaties.
              </p>
              <p>
                © 2025 Tabula Rasa Coaching. All rights reserved.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Terms of Use</h2>
              <p className="mb-4">
                By accessing this website, you agree to be bound by these terms of use and all
                applicable laws and regulations. If you do not agree with any of these terms,
                you are prohibited from using or accessing this site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer</h2>
              <p className="mb-4">
                The information provided on this website is for general informational and educational
                purposes only. It is not intended as professional coaching advice for any specific
                individual or situation. Always seek the guidance of qualified professionals for
                your specific needs.
              </p>
              <p className="mb-4">
                While we strive to keep the information accurate and up-to-date, we make no
                representations or warranties of any kind, express or implied, about the completeness,
                accuracy, reliability, suitability, or availability of the information, products,
                services, or related graphics contained on this website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="mb-4">
                In no event will Tabula Rasa Coaching, its owners, employees, or affiliates be liable
                for any loss or damage including without limitation, indirect or consequential loss
                or damage, or any loss or damage whatsoever arising from loss of data or profits
                arising out of, or in connection with, the use of this website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">External Links</h2>
              <p>
                This website may contain links to external websites that are not provided or
                maintained by us. We do not guarantee the accuracy, relevance, timeliness, or
                completeness of any information on these external websites. The inclusion of any
                links does not necessarily imply a recommendation or endorsement of the views
                expressed within them.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy</h2>
              <p>
                Your use of our website is also governed by our Privacy Policy. Please review our
                <Link href="/privacy-policy" className="text-trc-blue-600 hover:text-trc-blue-700 underline ml-1">
                  Privacy Policy
                </Link>
                , which also governs the site and informs users of our data collection practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws
                of the Commonwealth of Pennsylvania and the United States of America. You irrevocably
                submit to the exclusive jurisdiction of the courts in that State or location.
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