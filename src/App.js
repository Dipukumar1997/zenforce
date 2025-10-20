import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Calculator from "./components/Calculaotor/Calculator.js";
import { assets } from "./assests/assets.js";
import "./index.css";
import { Home } from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import ResetPassword from "./components/Login/ResetPassword.jsx";
import Developer from "./components/Developer/Developer.jsx";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import EmailVerify from "./components/Login/EmailVerify.jsx";
import NewsApi from "./components/NewsApis/NewsApi.jsx";
import Notes from "./components/Notes/Notes.jsx";

// Essential Pages
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";
import TermsOfService from "./components/TermsOfService.jsx";
import Disclaimer from "./components/Disclaimer.jsx";

// NEW: Blog Pages
import Blog from "./components/Blog/Blog.js";
import BlogPost from "./components/Blog/BlogPost.js";

// Navigation Component
function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const hideNavPaths = ['/login', '/reset-password', '/email-verify', '/developer', '/developer/notes', '/news'];
  if (hideNavPaths.includes(location.pathname)) return null;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
              ZenForce
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Home
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Blog
            </Link>
            <Link to="/cal" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Calculator
            </Link>
            <Link to="/news" className="text-gray-700 hover:text-blue-600 font-medium transition">
              News
            </Link>
            <Link to="/developer" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Developer
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Contact
            </Link>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              Login
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block text-gray-700 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded transition">
              Home
            </Link>
            <Link to="/blog" className="block text-gray-700 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded transition">
              Blog
            </Link>
            <Link to="/cal" className="block text-gray-700 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded transition">
              Calculator
            </Link>
            <Link to="/news" className="block text-gray-700 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded transition">
              News
            </Link>
            <Link to="/developer" className="block text-gray-700 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded transition">
              Developer
            </Link>
            <Link to="/about" className="block text-gray-700 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded transition">
              About
            </Link>
            <Link to="/contact" className="block text-gray-700 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded transition">
              Contact
            </Link>
            <button
              onClick={() => navigate("/login")}
              className="w-full text-left bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

// Footer Component (same as before, add Blog link)
function Footer() {
  const location = useLocation();
  const hideFooterPaths = ['/login', '/reset-password', '/email-verify', '/developer', '/developer/notes', '/news'];
  if (hideFooterPaths.includes(location.pathname)) return null;

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ZenForce</h3>
            <p className="text-gray-400">
              Your comprehensive platform for productivity tools, latest news updates, and developer resources.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition">Blog</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</Link></li>
              <li><Link to="/disclaimer" className="text-gray-400 hover:text-white transition">Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Our Tools</h3>
            <ul className="space-y-2">
              <li><Link to="/cal" className="text-gray-400 hover:text-white transition">Calculator</Link></li>
              <li><Link to="/news" className="text-gray-400 hover:text-white transition">News Feed</Link></li>
              <li><Link to="/developer/notes" className="text-gray-400 hover:text-white transition">Notes</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ZenForce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// Enhanced Home Component
function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-blue-600">ZenForce</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your all-in-one platform for productivity tools, expert guides, latest news updates, 
            and developer resources. Streamline your workflow and learn with our comprehensive articles and powerful features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
          {/* Blog Card - NEW */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="text-indigo-600 text-5xl mb-4">📝</div>
            <h3 className="text-2xl font-bold mb-3">Expert Blog</h3>
            <p className="text-gray-600 mb-4">
              Read in-depth articles, tutorials, and guides on productivity, development, and technology.
            </p>
            <button
              onClick={() => navigate("/blog")}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Read Articles
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="text-blue-600 text-5xl mb-4">🧮</div>
            <h3 className="text-2xl font-bold mb-3">Calculator</h3>
            <p className="text-gray-600 mb-4">
              Perform complex calculations with our advanced calculator tool.
            </p>
            <button
              onClick={() => navigate("/cal")}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Try Calculator
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="text-green-600 text-5xl mb-4">📰</div>
            <h3 className="text-2xl font-bold mb-3">Latest News</h3>
            <p className="text-gray-600 mb-4">
              Stay updated with the latest news from around the world.
            </p>
            <button
              onClick={() => navigate("/news")}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Read News
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="text-purple-600 text-5xl mb-4">💻</div>
            <h3 className="text-2xl font-bold mb-3">Developer Tools</h3>
            <p className="text-gray-600 mb-4">
              Access powerful developer resources and code snippets.
            </p>
            <button
              onClick={() => navigate("/developer")}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Explore Tools
            </button>
          </div>
        </div>

        <div className="mt-16">
          <Home />
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <ToastContainer position="top-right" autoClose={3000} />
        <Navigation />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* NEW: Blog Routes */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} /> 
            
            <Route path="/cal" element={<Calculator />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/developer" element={<Developer />} />
            <Route path="/email-verify" element={<EmailVerify />} />
            <Route path="/news" element={<Blog />} />
            <Route path="/developer/notes" element={<Notes />} />
            
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
