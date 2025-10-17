export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About ZenForce</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-4">
              Welcome to ZenForce, your comprehensive digital platform designed to enhance productivity 
              and keep you informed. Founded with the vision of creating a unified space for essential 
              tools and information, we strive to make your online experience seamless and efficient.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              Our mission is to provide users with high-quality, reliable tools and resources that 
              simplify daily tasks. Whether you're looking for calculation tools, staying updated with 
              the latest news, or accessing developer resources, ZenForce is your go-to platform.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What We Offer</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>Advanced Calculator:</strong> Perform complex mathematical operations with ease</li>
              <li><strong>News Aggregation:</strong> Stay informed with curated news from reliable sources</li>
              <li><strong>Developer Tools:</strong> Access coding resources, snippets, and notes</li>
              <li><strong>User-Friendly Interface:</strong> Clean, responsive design for all devices</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Values</h2>
            <p className="text-gray-700 mb-4">
              We believe in transparency, quality, and user satisfaction. Every feature we develop 
              is created with the user in mind, ensuring that our platform remains accessible, 
              reliable, and valuable to everyone who visits.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-700">
              Have questions or feedback? We'd love to hear from you. Visit our{" "}
              <a href="/contact" className="text-blue-600 hover:underline">contact page</a> to get in touch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
