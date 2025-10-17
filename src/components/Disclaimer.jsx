export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Disclaimer</h1>
          <p className="text-gray-600 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">General Information</h2>
              <p>
                The information provided by ZenForce is for general informational purposes only. 
                All information on the site is provided in good faith, however we make no 
                representation or warranty of any kind, express or implied, regarding the accuracy, 
                adequacy, validity, reliability, availability, or completeness of any information on 
                the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Calculator Tool Disclaimer</h2>
              <p>
                While we strive to ensure the accuracy of our calculator tool, we cannot guarantee 
                that all calculations will be error-free or suitable for your specific purposes. 
                Users should verify all calculations independently before relying on them for 
                important decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">News Content Disclaimer</h2>
              <p>
                News articles and content displayed on ZenForce are aggregated from various sources. 
                We do not create or endorse the content and are not responsible for the accuracy, 
                opinions, or views expressed in third-party content. Always verify information from 
                original sources.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">External Links Disclaimer</h2>
              <p>
                Our website may contain links to external websites that are not provided or maintained 
                by us. We do not guarantee the accuracy, relevance, or completeness of any information 
                on these external websites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Professional Advice Disclaimer</h2>
              <p>
                The information on ZenForce is not intended to be a substitute for professional advice. 
                Never disregard professional advice or delay seeking it because of something you have 
                read on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Limitation of Liability</h2>
              <p>
                Under no circumstance shall we have any liability to you for any loss or damage of 
                any kind incurred as a result of the use of the site or reliance on any information 
                provided on the site. Your use of the site and reliance on any information is solely 
                at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Errors and Omissions</h2>
              <p>
                While we make every effort to keep the information up to date and correct, we make 
                no representations or warranties about the completeness, accuracy, reliability, or 
                availability of the website or the information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Contact Us</h2>
              <p>
                If you have any questions about this disclaimer, please contact us through our{" "}
                <a href="/contact" className="text-blue-600 hover:underline">contact page</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
