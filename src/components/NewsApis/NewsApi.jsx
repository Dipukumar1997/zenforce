import React, { useState, useEffect } from 'react';

export default function NewsApi() {
  // GNews API Key - Get from https://gnews.io/
  const API_KEY = process.env.REACT_APP_GNEWS_API_KEY;
  
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show a message if API key is missing
    if (!API_KEY) {
      console.error('GNews API key is missing! Add REACT_APP_GNEWS_API_KEY to your .env file');
      return;
    }
    fetchRandomNews();
  }, []);

  // Fetch default/trending news
  const fetchRandomNews = async () => {
    setLoading(true);
    try {
      // GNews API endpoint - NO CORS ISSUES
      const apiUrl = `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=${API_KEY}`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      console.log('GNews Response:', data); // Debug
      
      if (data.articles) {
        setArticles(data.articles);
      } else if (data.errors) {
        console.error('GNews API Error:', data.errors);
        alert('Error: ' + data.errors[0]);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      alert('Failed to fetch news. Check console for details.');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch news based on search query
  const fetchNewsByQuery = async (query) => {
    setLoading(true);
    try {
      // GNews search endpoint
      const apiUrl = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=10&apikey=${API_KEY}`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      console.log('GNews Search Response:', data); // Debug
      
      if (data.articles) {
        setArticles(data.articles);
      } else if (data.errors) {
        console.error('GNews API Error:', data.errors);
        alert('Error: ' + data.errors[0]);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      alert('Failed to fetch news. Check console for details.');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchNewsByQuery(searchQuery);
    } else {
      fetchRandomNews();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text) return 'No description available';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  const handleCardClick = (url) => {
    window.open(url, '_blank');
  };

  // Inline Styles
  const styles = {
    newsContainer: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      paddingBottom: '2rem',
    },
    newsNav: {
      backgroundColor: '#2563eb',
      padding: '20px 0',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    navContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '20px',
    },
    newsLogo: {
      color: 'white',
      textDecoration: 'none',
      letterSpacing: '1px',
      fontSize: '2.5rem',
      fontWeight: 'bold',
    },
    searchContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flexWrap: 'wrap',
    },
    searchInput: {
      minWidth: '300px',
      padding: '12px 20px',
      border: '2px solid transparent',
      borderRadius: '8px',
      fontSize: '16px',
      color: '#1f2937',
      outline: 'none',
      backgroundColor: 'white',
    },
    searchButton: {
      padding: '12px 30px',
      backgroundColor: '#10b981',
      color: 'white',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      borderRadius: '8px',
      fontWeight: '600',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    blogContainer: {
      maxWidth: '1200px',
      margin: '3rem auto',
      padding: '0 20px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '24px',
    },
    blogCard: {
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      overflow: 'hidden',
      cursor: 'pointer',
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
    },
    blogCardImage: {
      width: '100%',
      height: '220px',
      objectFit: 'cover',
    },
    blogCardContent: {
      padding: '1.25rem',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    blogCardTitle: {
      color: '#1f2937',
      fontSize: '1.25rem',
      fontWeight: '700',
      marginBottom: '0.75rem',
      lineHeight: '1.5',
    },
    blogCardDescription: {
      fontSize: '0.95rem',
      color: '#6b7280',
      lineHeight: '1.6',
      flex: 1,
    },
    blogCardFooter: {
      paddingTop: '1rem',
      marginTop: 'auto',
      borderTop: '1px solid #e5e7eb',
    },
    sourceName: {
      fontSize: '0.85rem',
      color: '#2563eb',
      fontWeight: '600',
    },
    loading: {
      gridColumn: '1 / -1',
      textAlign: 'center',
      padding: '4rem',
      fontSize: '1.5rem',
      color: '#2563eb',
      fontWeight: '600',
    },
    noArticles: {
      gridColumn: '1 / -1',
      textAlign: 'center',
      padding: '4rem',
      fontSize: '1.2rem',
      color: '#6b7280',
    },
    apiKeyWarning: {
      gridColumn: '1 / -1',
      textAlign: 'center',
      padding: '4rem',
      fontSize: '1.2rem',
      color: '#dc2626',
      backgroundColor: '#fee2e2',
      borderRadius: '8px',
      margin: '20px',
    },
  };

  // Show warning if API key is missing
  if (!API_KEY) {
    return (
      <div style={styles.newsContainer}>
        <nav style={styles.newsNav}>
          <div style={styles.navContent}>
            <div style={styles.newsLogo}>News.</div>
          </div>
        </nav>
        <main style={styles.blogContainer}>
          <div style={styles.apiKeyWarning}>
            <h2>⚠️ API Key Missing!</h2>
            <p>Please add your GNews API key to the .env file:</p>
            <code>REACT_APP_GNEWS_API_KEY=your_key_here</code>
            <p style={{ marginTop: '20px' }}>
              Get your free key at: <a href="https://gnews.io" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb' }}>https://gnews.io</a>
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={styles.newsContainer}>
      <nav style={styles.newsNav}>
        <div style={styles.navContent}>
          <div style={styles.newsLogo}>News.</div>
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search news"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              style={styles.searchInput}
            />
            <button onClick={handleSearch} style={styles.searchButton}>
              Search
            </button>
          </div>
        </div>
      </nav>

      <main style={styles.blogContainer}>
        {loading ? (
          <div style={styles.loading}>Loading news...</div>
        ) : articles.length > 0 ? (
          articles.map((article, index) => (
            <div
              key={index}
              style={styles.blogCard}
              onClick={() => handleCardClick(article.url)}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.transform = 'translateY(-8px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <img
                src={article.image || 'https://via.placeholder.com/400x250?text=News'}
                alt={article.title}
                style={styles.blogCardImage}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x250?text=No+Image';
                }}
              />
              <div style={styles.blogCardContent}>
                <h2 style={styles.blogCardTitle}>
                  {truncateText(article.title, 80)}
                </h2>
                <p style={styles.blogCardDescription}>
                  {truncateText(article.description, 150)}
                </p>
                <div style={styles.blogCardFooter}>
                  <span style={styles.sourceName}>
                    {article.source?.name || 'Unknown Source'}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={styles.noArticles}>
            <p>No articles found. Try searching for something else!</p>
          </div>
        )}
      </main>
    </div>
  );
}
