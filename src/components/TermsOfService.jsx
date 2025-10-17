export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using ZenForce, you accept and agree to be bound by the terms and 
                provisions of this agreement. If you do not agree to these terms, please do not use 
                our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Use of Services</h2>
              <p>You agree to use our services only for lawful purposes. You must not:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Use the website in any way that violates applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to our systems or networks</li>
                <li>Interfere with or disrupt the integrity or performance of our services</li>
                <li>Transmit any harmful code, viruses, or malicious software</li>
                <li>Collect or harvest personal information from other users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">3. User Accounts</h2>
              <p>
                When you create an account with us, you are responsible for maintaining the security 
                of your account and password. You agree to accept responsibility for all activities 
                that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Intellectual Property</h2>
              <p>
                All content on ZenForce, including text, graphics, logos, and software, is the 
                property of ZenForce or its content suppliers and is protected by copyright and 
                other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Disclaimer of Warranties</h2>
              <p>
                Our services are provided "as is" without any warranties, express or implied. We do 
                not guarantee that our services will be uninterrupted, secure, or error-free. Use of 
                our calculator and tools is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Limitation of Liability</h2>
              <p>
                ZenForce shall not be liable for any indirect, incidental, special, consequential, or 
                punitive damages resulting from your use or inability to use our services. This 
                includes but is not limited to loss of data, revenue, or profits.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites or services. We are not 
                responsible for the content, privacy policies, or practices of any third-party sites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting. Your continued use of the services after changes are posted 
                constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">9. Termination</h2>
              <p>
                We may terminate or suspend your account and access to our services immediately, 
                without prior notice, for any reason, including breach of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">10. Contact Information</h2>
              <p>
                For questions about these Terms of Service, please contact us through our{" "}
                <a href="/contact" className="text-blue-600 hover:underline">contact page</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
