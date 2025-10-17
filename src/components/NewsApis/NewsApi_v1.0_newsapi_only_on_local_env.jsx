// import React, { useState, useEffect } from 'react';

// export default function NewsApi() {
//   // Get API Key from environment variable
//   const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
  
//   const [articles, setArticles] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalResults, setTotalResults] = useState(0);
//   const pageSize = 10;

//   // Fetch news when component loads
//   useEffect(() => {
//     fetchRandomNews(1);
//   }, []);

//   // Function to fetch random/default news
//   const fetchRandomNews = async (page = 1) => {
//     setLoading(true);
//     try {
//       const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`;
//       const response = await fetch(apiUrl);
//       const data = await response.json();
      
//       if (data.articles) {
//         setArticles(data.articles);
//         setTotalResults(data.totalResults);
//         setCurrentPage(page);
//       }
//     } catch (error) {
//       console.error('Error fetching random news:', error);
//       setArticles([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to fetch news based on search query
//   const fetchNewsByQuery = async (query, page = 1) => {
//     setLoading(true);
//     try {
//       const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`;
//       const response = await fetch(apiUrl);
//       const data = await response.json();
      
//       if (data.articles) {
//         setArticles(data.articles);
//         setTotalResults(data.totalResults);
//         setCurrentPage(page);
//       }
//     } catch (error) {
//       console.error('Error fetching news by query:', error);
//       setArticles([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle search button click
//   const handleSearch = () => {
//     if (searchQuery.trim()) {
//       fetchNewsByQuery(searchQuery, 1);
//     } else {
//       fetchRandomNews(1);
//     }
//   };

//   // Handle pagination
//   const handleNextPage = () => {
//     const nextPage = currentPage + 1;
//     if (searchQuery.trim()) {
//       fetchNewsByQuery(searchQuery, nextPage);
//     } else {
//       fetchRandomNews(nextPage);
//     }
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handlePrevPage = () => {
//     const prevPage = currentPage - 1;
//     if (prevPage < 1) return;
    
//     if (searchQuery.trim()) {
//       fetchNewsByQuery(searchQuery, prevPage);
//     } else {
//       fetchRandomNews(prevPage);
//     }
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Handle Enter key press
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   // Truncate text to specific length
//   const truncateText = (text, maxLength) => {
//     if (!text) return '';
//     return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
//   };

//   // Open article in new window
//   const handleCardClick = (url) => {
//     window.open(url, '_blank');
//   };

//   // Calculate total pages
//   const totalPages = Math.ceil(totalResults / pageSize);
//   const hasNextPage = currentPage < totalPages;
//   const hasPrevPage = currentPage > 1;

//   // Inline Styles
//   const styles = {
//     newsContainer: {
//       minHeight: '100vh',
//       backgroundColor: '#f8fafc',
//       paddingBottom: '2rem',
//     },
//     newsNav: {
//       backgroundColor: '#2563eb',
//       padding: '20px 0',
//       boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//     },
//     navContent: {
//       maxWidth: '1200px',
//       margin: '0 auto',
//       padding: '0 20px',
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       flexWrap: 'wrap',
//       gap: '20px',
//     },
//     newsLogo: {
//       color: 'white',
//       textDecoration: 'none',
//       letterSpacing: '1px',
//       fontSize: '2.5rem',
//       fontWeight: 'bold',
//       cursor: 'default',
//     },
//     searchContainer: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '12px',
//       flexWrap: 'wrap',
//     },
//     searchInput: {
//       minWidth: '300px',
//       padding: '12px 20px',
//       border: '2px solid transparent',
//       borderRadius: '8px',
//       fontSize: '16px',
//       color: '#1f2937',
//       outline: 'none',
//       transition: 'all 0.3s',
//       backgroundColor: 'white',
//     },
//     searchButton: {
//       padding: '12px 30px',
//       backgroundColor: '#10b981',
//       color: 'white',
//       border: 'none',
//       fontSize: '16px',
//       cursor: 'pointer',
//       borderRadius: '8px',
//       fontWeight: '600',
//       transition: 'all 0.3s',
//       boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//     },
//     blogContainer: {
//       maxWidth: '1200px',
//       margin: '3rem auto',
//       padding: '0 20px',
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
//       gap: '24px',
//     },
//     blogCard: {
//       border: '1px solid #e5e7eb',
//       borderRadius: '12px',
//       overflow: 'hidden',
//       cursor: 'pointer',
//       backgroundColor: 'white',
//       transition: 'all 0.3s ease',
//       boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
//       display: 'flex',
//       flexDirection: 'column',
//     },
//     blogCardImage: {
//       width: '100%',
//       height: '220px',
//       objectFit: 'cover',
//     },
//     blogCardContent: {
//       padding: '1.25rem',
//       flex: 1,
//       display: 'flex',
//       flexDirection: 'column',
//     },
//     blogCardTitle: {
//       color: '#1f2937',
//       fontSize: '1.25rem',
//       fontWeight: '700',
//       marginBottom: '0.75rem',
//       lineHeight: '1.5',
//       flex: 0,
//     },
//     blogCardDescription: {
//       fontSize: '0.95rem',
//       color: '#6b7280',
//       lineHeight: '1.6',
//       flex: 1,
//     },
//     blogCardFooter: {
//       paddingTop: '1rem',
//       marginTop: 'auto',
//       borderTop: '1px solid #e5e7eb',
//     },
//     sourceName: {
//       fontSize: '0.85rem',
//       color: '#2563eb',
//       fontWeight: '600',
//     },
//     loading: {
//       gridColumn: '1 / -1',
//       textAlign: 'center',
//       padding: '4rem',
//       fontSize: '1.5rem',
//       color: '#2563eb',
//       fontWeight: '600',
//     },
//     noArticles: {
//       gridColumn: '1 / -1',
//       textAlign: 'center',
//       padding: '4rem',
//       fontSize: '1.2rem',
//       color: '#6b7280',
//     },
//     paginationContainer: {
//       maxWidth: '1200px',
//       margin: '3rem auto 2rem',
//       padding: '0 20px',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       gap: '20px',
//       flexWrap: 'wrap',
//     },
//     paginationButton: {
//       padding: '12px 24px',
//       backgroundColor: '#2563eb',
//       color: 'white',
//       border: 'none',
//       fontSize: '16px',
//       cursor: 'pointer',
//       borderRadius: '8px',
//       fontWeight: '600',
//       transition: 'all 0.3s',
//       boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//     },
//     paginationButtonDisabled: {
//       padding: '12px 24px',
//       backgroundColor: '#d1d5db',
//       color: '#9ca3af',
//       border: 'none',
//       fontSize: '16px',
//       cursor: 'not-allowed',
//       borderRadius: '8px',
//       fontWeight: '600',
//     },
//     pageInfo: {
//       fontSize: '1rem',
//       color: '#4b5563',
//       fontWeight: '500',
//     },
//   };

//   return (
//     <div style={styles.newsContainer}>
//       {/* Navigation Bar */}
//       <nav style={styles.newsNav}>
//         <div style={styles.navContent}>
//           <div style={styles.newsLogo}>News.</div>
//           <div style={styles.searchContainer}>
//             <input
//               type="text"
//               placeholder="Search news"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyPress={handleKeyPress}
//               style={styles.searchInput}
//               onFocus={(e) => e.target.style.borderColor = '#10b981'}
//               onBlur={(e) => e.target.style.borderColor = 'transparent'}
//             />
//             <button
//               id="search-button"
//               onClick={handleSearch}
//               style={styles.searchButton}
//               onMouseEnter={(e) => {
//                 e.target.style.backgroundColor = '#059669';
//                 e.target.style.transform = 'translateY(-2px)';
//                 e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.backgroundColor = '#10b981';
//                 e.target.style.transform = 'translateY(0)';
//                 e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
//               }}
//             >
//               Search
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Blog Container */}
//       <main style={styles.blogContainer}>
//         {loading ? (
//           <div style={styles.loading}>
//             <div>Loading news...</div>
//           </div>
//         ) : articles.length > 0 ? (
//           articles.map((article, index) => (
//             <div
//               key={index}
//               style={styles.blogCard}
//               onClick={() => handleCardClick(article.url)}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
//                 e.currentTarget.style.transform = 'translateY(-8px)';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
//                 e.currentTarget.style.transform = 'translateY(0)';
//               }}
//             >
//               <img
//                 src={article.urlToImage || 'https://via.placeholder.com/400x250?text=News'}
//                 alt={article.title}
//                 style={styles.blogCardImage}
//                 onError={(e) => {
//                   e.target.src = 'https://via.placeholder.com/400x250?text=News';
//                 }}
//               />
//               <div style={styles.blogCardContent}>
//                 <h2 style={styles.blogCardTitle}>
//                   {truncateText(article.title, 80)}
//                 </h2>
//                 <p style={styles.blogCardDescription}>
//                   {truncateText(article.description, 150)}
//                 </p>
//                 <div style={styles.blogCardFooter}>
//                   <span style={styles.sourceName}>
//                     {article.source?.name || 'Unknown Source'}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div style={styles.noArticles}>
//             <p>No articles found. Try searching for something else!</p>
//           </div>
//         )}
//       </main>

//       {/* Pagination */}
//       {!loading && articles.length > 0 && (
//         <div style={styles.paginationContainer}>
//           <button
//             onClick={handlePrevPage}
//             disabled={!hasPrevPage}
//             style={hasPrevPage ? styles.paginationButton : styles.paginationButtonDisabled}
//             onMouseEnter={(e) => {
//               if (hasPrevPage) {
//                 e.target.style.backgroundColor = '#1d4ed8';
//                 e.target.style.transform = 'translateY(-2px)';
//               }
//             }}
//             onMouseLeave={(e) => {
//               if (hasPrevPage) {
//                 e.target.style.backgroundColor = '#2563eb';
//                 e.target.style.transform = 'translateY(0)';
//               }
//             }}
//           >
//             ← Previous
//           </button>

//           <div style={styles.pageInfo}>
//             Page {currentPage} of {totalPages > 0 ? totalPages : 1}
//           </div>

//           <button
//             onClick={handleNextPage}
//             disabled={!hasNextPage}
//             style={hasNextPage ? styles.paginationButton : styles.paginationButtonDisabled}
//             onMouseEnter={(e) => {
//               if (hasNextPage) {
//                 e.target.style.backgroundColor = '#1d4ed8';
//                 e.target.style.transform = 'translateY(-2px)';
//               }
//             }}
//             onMouseLeave={(e) => {
//               if (hasNextPage) {
//                 e.target.style.backgroundColor = '#2563eb';
//                 e.target.style.transform = 'translateY(0)';
//               }
//             }}
//           >
//             Next →
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
