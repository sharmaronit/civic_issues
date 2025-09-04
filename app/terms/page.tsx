export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-gray max-w-none space-y-6">
            
            {/* Platform Disclaimer */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">🚨 Important Legal Disclaimer</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="font-medium text-gray-900">
                  This is a simple spare time project designed to help report civic infrastructure issues such as potholes, 
                  garbage collection problems, broken streetlights, and similar public facility concerns.
                </p>
              </div>
              <p className="text-gray-700">
                <strong>Legal Note:</strong> We are an intermediary platform under Section 79 of the Information Technology Act, 2000. 
                All content is user-generated. We do not create, verify, endorse, or take responsibility for any user-submitted reports or claims.
              </p>
            </section>

            {/* User Responsibilities */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">📋 User Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Factual Reporting Only:</strong> Report only verifiable civic infrastructure issues</li>
                <li><strong>Photo Evidence Required:</strong> Include photographic evidence of the reported issue</li>
                <li><strong>No Personal Attacks:</strong> Do not make accusations against specific individuals or officials</li>
                <li><strong>Infrastructure Focus:</strong> Limit reports to physical infrastructure problems, not policy complaints</li>
                <li><strong>Truthful Information:</strong> Ensure all information provided is accurate to the best of your knowledge</li>
                <li><strong>Legal Compliance:</strong> You are solely responsible for ensuring your reports comply with applicable laws</li>
              </ul>
            </section>

            {/* Prohibited Content */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">❌ Prohibited Content</h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="font-medium text-red-900 mb-2">The following types of content are strictly prohibited:</p>
                <ul className="list-disc pl-6 space-y-1 text-red-800">
                  <li>Defamatory statements about individuals or organizations</li>
                  <li>Unsubstantiated corruption allegations</li>
                  <li>Personal attacks on government officials or employees</li>
                  <li>False or misleading information</li>
                  <li>Content that violates any applicable laws</li>
                  <li>Political campaigning or partisan content</li>
                </ul>
              </div>
            </section>

            {/* Content Moderation */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">🛡️ Content Moderation</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to review, moderate, and remove any content that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Violates these terms of service</li>
                <li>Is reported as inappropriate by users or authorities</li>
                <li>Poses legal risks to the platform or users</li>
                <li>Falls outside the scope of civic infrastructure reporting</li>
              </ul>
              <p className="text-gray-700 mt-4">
                <strong>Quick Response:</strong> We commit to responding to legitimate removal requests within 24-48 hours.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">⚖️ Limitation of Liability</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <ul className="space-y-2 text-gray-700">
                  <li>• We do not verify the accuracy of user-submitted reports</li>
                  <li>• We are not responsible for the consequences of user-generated content</li>
                  <li>• Users are solely liable for their own reports and any resulting legal issues</li>
                  <li>• We provide the platform "as-is" without warranties of any kind</li>
                  <li>• Our liability is limited to the maximum extent permitted by law</li>
                </ul>
              </div>
            </section>

            {/* Indemnification */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">🔒 User Indemnification</h2>
              <p className="text-gray-700">
                By using this platform, you agree to indemnify and hold harmless the platform, its operators, 
                and associated parties from any claims, damages, or legal costs arising from your use of the service 
                or your submitted content.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">🏛️ Governing Law</h2>
              <p className="text-gray-700">
                These terms are governed by the laws of India. Any disputes will be subject to the jurisdiction 
                of courts in New Delhi, India.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">📞 Contact & Reporting</h2>
              <p className="text-gray-700 mb-4">
                For content removal requests, legal concerns, or platform issues, contact us:
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-900">
                  <strong>Email:</strong> legal@reportcard.fun<br/>
                  <strong>Response Time:</strong> 24-48 hours<br/>
                  <strong>GitHub Issues:</strong> <a href="https://github.com/ScienceArtist/reportcard.fun/issues" className="text-blue-600 hover:underline">Report Technical Issues</a>
                </p>
              </div>
            </section>

            {/* Last Updated */}
            <section className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-IN')}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                By using this platform, you acknowledge that you have read, understood, and agree to be bound by these terms.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}
