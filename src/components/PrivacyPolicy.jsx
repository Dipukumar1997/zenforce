export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Introduction</h2>
              <p>
                Welcome to ZenForce. We respect your privacy and are committed to protecting your 
                personal data. This privacy policy explains how we collect, use, and safeguard your 
                information when you visit our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, and contact details when you register or contact us</li>
                <li><strong>Usage Data:</strong> Information about how you use our website, including pages visited and time spent</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, and cookies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
              <p>We use the collected information for:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Providing and maintaining our services</li>
                <li>Improving user experience and website functionality</li>
                <li>Responding to your inquiries and support requests</li>
                <li>Sending updates and promotional materials (with your consent)</li>
                <li>Analyzing usage patterns to enhance our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your browsing experience. 
                Cookies help us understand how you interact with our site and allow us to provide 
                personalized content. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information from 
                unauthorized access, alteration, disclosure, or destruction. However, no method of 
                transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Third-Party Services</h2>
              <p>
                Our website may contain links to third-party services or display third-party content, 
                including advertisements through Google AdSense. These third parties have their own 
                privacy policies, and we are not responsible for their practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. Any changes will be posted on 
                this page with an updated revision date. We encourage you to review this policy 
                periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">9. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy, please contact us through our{" "}
                <a href="/contact" className="text-blue-600 hover:underline">contact page</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
