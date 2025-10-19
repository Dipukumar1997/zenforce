import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Productivity', 'Technology', 'Development', 'Tutorials', 'News', 'Tips'];

  // Fetch blogs from backend
  useEffect(() => {
    fetchBlogs();
  }, [currentPage, selectedCategory]);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let url = `${API_URL}/api/blogs?page=${currentPage}&limit=9`;
      
      if (selectedCategory && selectedCategory !== 'All') {
        url += `&category=${selectedCategory}`;
      }
      
      if (searchQuery) {
        url += `&search=${searchQuery}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setBlogs(data.data);
        setTotalPages(data.totalPages);
      } else {
        setError('Failed to fetch blogs');
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to load blogs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBlogs();
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Inline Styles
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      paddingBottom: '3rem',
    },
    header: {
      backgroundColor: '#1e40af',
      padding: '3rem 0',
      textAlign: 'center',
      color: 'white',
    },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    subtitle: {
      fontSize: '1.25rem',
      opacity: 0.9,
    },
    searchSection: {
      maxWidth: '1200px',
      margin: '2rem auto',
      padding: '0 20px',
    },
    searchForm: {
      display: 'flex',
      gap: '12px',
      marginBottom: '1.5rem',
    },
    searchInput: {
      flex: 1,
      padding: '12px 20px',
      borderRadius: '8px',
      border: '2px solid #e5e7eb',
      fontSize: '16px',
      outline: 'none',
    },
    searchButton: {
      padding: '12px 30px',
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s',
    },
    categoryFilter: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
    },
    categoryButton: (active) => ({
      padding: '8px 20px',
      borderRadius: '20px',
      border: active ? 'none' : '2px solid #e5e7eb',
      backgroundColor: active ? '#2563eb' : 'white',
      color: active ? 'white' : '#6b7280',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s',
    }),
    blogsGrid: {
      maxWidth: '1200px',
      margin: '2rem auto',
      padding: '0 20px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '24px',
    },
    blogCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s',
      cursor: 'pointer',
    },
    blogImage: {
      width: '100%',
      height: '220px',
      objectFit: 'cover',
    },
    blogContent: {
      padding: '1.5rem',
    },
    blogCategory: {
      display: 'inline-block',
      padding: '4px 12px',
      backgroundColor: '#dbeafe',
      color: '#2563eb',
      fontSize: '12px',
      fontWeight: '600',
      borderRadius: '12px',
      marginBottom: '12px',
    },
    blogTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '12px',
      lineHeight: '1.4',
    },
    blogExcerpt: {
      fontSize: '0.95rem',
      color: '#6b7280',
      lineHeight: '1.6',
      marginBottom: '16px',
    },
    blogMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '12px',
      borderTop: '1px solid #e5e7eb',
      fontSize: '0.875rem',
      color: '#9ca3af',
    },
    readMore: {
      color: '#2563eb',
      fontWeight: '600',
      textDecoration: 'none',
    },
    loading: {
      textAlign: 'center',
      padding: '4rem',
      fontSize: '1.5rem',
      color: '#2563eb',
    },
    error: {
      textAlign: 'center',
      padding: '4rem',
      fontSize: '1.25rem',
      color: '#dc2626',
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '12px',
      marginTop: '3rem',
    },
    pageButton: (disabled) => ({
      padding: '10px 20px',
      backgroundColor: disabled ? '#e5e7eb' : '#2563eb',
      color: disabled ? '#9ca3af' : 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s',
    }),
    pageInfo: {
      fontSize: '14px',
      color: '#6b7280',
      fontWeight: '500',
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>ZenForce Blog</h1>
        <p style={styles.subtitle}>
          Expert guides, tutorials, and insights on productivity and technology
        </p>
      </header>

      {/* Search and Filter Section */}
      <div style={styles.searchSection}>
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchButton}>
            Search
          </button>
        </form>

        <div style={styles.categoryFilter}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category === 'All' ? '' : category)}
              style={styles.categoryButton(
                (category === 'All' && !selectedCategory) || 
                category === selectedCategory
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blogs Grid */}
      <div style={styles.blogsGrid}>
        {loading ? (
          <div style={styles.loading}>Loading blogs...</div>
        ) : error ? (
          <div style={styles.error}>{error}</div>
        ) : blogs.length === 0 ? (
          <div style={styles.error}>No blogs found</div>
        ) : (
          blogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/blog/${blog.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={styles.blogCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }}
              >
                {/* <img
                  src={blog.coverImage}
                  alt={blog.title}
                  style={styles.blogImage}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x250?text=Blog+Post';
                  }}
                /> */}
                {/* // In your Blog.js, update the image source: */}
                  <img 
                    src={`${API_URL}${blog.image}`}  // Add API_URL before image path
                    alt={blog.title}
                    style={styles.blogImage}
                  />

                <div style={styles.blogContent}>
                  <span style={styles.blogCategory}>{blog.category}</span>
                  <h2 style={styles.blogTitle}>{blog.title}</h2>
                  <p style={styles.blogExcerpt}>{blog.excerpt}</p>
                  <div style={styles.blogMeta}>
                    <span>
                      {formatDate(blog.createdAt)} • {blog.readTime} min read
                    </span>
                    <span style={styles.readMore}>Read more →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Pagination */}
      {!loading && !error && blogs.length > 0 && (
        <div style={styles.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={styles.pageButton(currentPage === 1)}
          >
            ← Previous
          </button>
          <span style={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={styles.pageButton(currentPage === totalPages)}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
