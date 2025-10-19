// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';

// export default function BlogPost() {
//   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
//   const { slug } = useParams();
  
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [likes, setLikes] = useState(0);
//   const [hasLiked, setHasLiked] = useState(false);

//   useEffect(() => {
//     fetchBlog();
//   }, [slug]);

//   const fetchBlog = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch(`${API_URL}/api/blogs/${slug}`);
//       const data = await response.json();

//       if (data.success) {
//         setBlog(data.data);
//         setLikes(data.data.likes);
//       } else {
//         setError('Blog not found');
//       }
//     } catch (err) {
//       console.error('Error fetching blog:', err);
//       setError('Failed to load blog. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLike = async () => {
//     if (hasLiked) return;
    
//     try {
//       const response = await fetch(`${API_URL}/api/blogs/${blog._id}/like`, {
//         method: 'PUT',
//       });
//       const data = await response.json();

//       if (data.success) {
//         setLikes(data.likes);
//         setHasLiked(true);
//       }
//     } catch (err) {
//       console.error('Error liking blog:', err);
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   // Inline Styles
//   const styles = {
//     container: {
//       minHeight: '100vh',
//       backgroundColor: '#f9fafb',
//       paddingBottom: '3rem',
//     },
//     backLink: {
//       maxWidth: '800px',
//       margin: '2rem auto',
//       padding: '0 20px',
//     },
//     backButton: {
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: '8px',
//       color: '#2563eb',
//       fontSize: '14px',
//       fontWeight: '600',
//       textDecoration: 'none',
//       transition: 'all 0.3s',
//     },
//     article: {
//       maxWidth: '800px',
//       margin: '0 auto',
//       padding: '0 20px',
//     },
//     coverImage: {
//       width: '100%',
//       height: '400px',
//       objectFit: 'cover',
//       borderRadius: '12px',
//       marginBottom: '2rem',
//     },
//     category: {
//       display: 'inline-block',
//       padding: '6px 16px',
//       backgroundColor: '#dbeafe',
//       color: '#2563eb',
//       fontSize: '14px',
//       fontWeight: '600',
//       borderRadius: '16px',
//       marginBottom: '1rem',
//     },
//     title: {
//       fontSize: '2.5rem',
//       fontWeight: '800',
//       color: '#1f2937',
//       lineHeight: '1.2',
//       marginBottom: '1.5rem',
//     },
//     meta: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '16px',
//       fontSize: '14px',
//       color: '#6b7280',
//       marginBottom: '2rem',
//       paddingBottom: '2rem',
//       borderBottom: '1px solid #e5e7eb',
//     },
//     metaItem: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '6px',
//     },
//     content: {
//       fontSize: '1.125rem',
//       lineHeight: '1.8',
//       color: '#374151',
//       marginBottom: '3rem',
//     },
//     contentParagraph: {
//       marginBottom: '1.5rem',
//     },
//     likeSection: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '12px',
//       paddingTop: '2rem',
//       borderTop: '1px solid #e5e7eb',
//     },
//     likeButton: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       padding: '10px 20px',
//       backgroundColor: hasLiked ? '#dbeafe' : '#2563eb',
//       color: hasLiked ? '#2563eb' : 'white',
//       border: 'none',
//       borderRadius: '24px',
//       fontSize: '16px',
//       fontWeight: '600',
//       cursor: hasLiked ? 'not-allowed' : 'pointer',
//       transition: 'all 0.3s',
//     },
//     loading: {
//       textAlign: 'center',
//       padding: '4rem',
//       fontSize: '1.5rem',
//       color: '#2563eb',
//     },
//     error: {
//       textAlign: 'center',
//       padding: '4rem',
//       fontSize: '1.25rem',
//       color: '#dc2626',
//     },
//   };

//   if (loading) {
//     return (
//       <div style={styles.container}>
//         <div style={styles.loading}>Loading blog post...</div>
//       </div>
//     );
//   }

//   if (error || !blog) {
//     return (
//       <div style={styles.container}>
//         <div style={styles.error}>{error || 'Blog not found'}</div>
//         <div style={{ textAlign: 'center' }}>
//           <Link to="/blog" style={styles.backButton}>
//             ← Back to Blog
//           </Link>
//         </div>
//       </div>
//     );
//   }
// return (
//   <div style={styles.container}>
//     <div style={styles.backLink}>
//       <Link to="/blog" style={styles.backButton}>
//         ← Back to Blog
//       </Link>
//     </div>

//     <article style={styles.article}>
//       {/* Display Image - Use blog.image (from cloud URL) */}
//       {blog.image && (
//         <img
//           src={blog.image}
//           alt={blog.title}
//           style={styles.coverImage}
//           onError={(e) => {
//             e.target.src = 'https://via.placeholder.com/800x400?text=Blog+Post';
//           }}
//         />
//       )}

//       {/* Category */}
//       {blog.category && (
//         <span style={styles.category}>{blog.category}</span>
//       )}
      
//       {/* Title */}
//       <h1 style={styles.title}>{blog.title}</h1>

//       {/* Meta Information */}
//       <div style={styles.meta}>
//         <span style={styles.metaItem}>
//           📅 {formatDate(blog.createdAt)}
//         </span>
//         <span style={styles.metaItem}>
//           👤 {blog.author || 'Admin'}
//         </span>
//         <span style={styles.metaItem}>
//           ⏱️ {calculateReadTime(blog.content)} min read
//         </span>
//         <span style={styles.metaItem}>
//           👁️ {blog.views || 0} views
//         </span>
//       </div>

//       {/* Blog Content */}
//       <div style={styles.content}>
//         {blog.content.split('\n\n').map((paragraph, index) => (
//           <p key={index} style={styles.contentParagraph}>
//             {paragraph}
//           </p>
//         ))}
//       </div>

//       {/* Like Section */}
//       <div style={styles.likeSection}>
//         <button
//           onClick={handleLike}
//           disabled={hasLiked}
//           style={styles.likeButton}
//         >
//           {hasLiked ? '❤️ Liked' : '🤍 Like'} ({likes})
//         </button>
//       </div>

//       {/* Tags */}
//       {blog.tags && blog.tags.length > 0 && (
//         <div style={styles.tagsSection}>
//           <strong style={{ color: '#374151', marginBottom: '10px', display: 'block' }}>
//             Tags:
//           </strong>
//           <div>
//             {blog.tags.map((tag, index) => (
//               <span key={index} style={styles.tag}>
//                 #{tag}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}
//     </article>
//   </div>
// );

// }









import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function BlogPost() {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const { slug } = useParams();
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    setLoading(true);
    setError(null);
    
    try {
      ///api/blogs/slug/:slug
      const response = await fetch(`${API_URL}/api/blogs/slug/${slug}`);
      const data = await response.json();

      if (data.success) {
        setBlog(data.data);
        setLikes(data.data.likes || 0);
      } else {
        setError('Blog not found');
      }
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError('Failed to load blog. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (hasLiked) return;
    
    try {
      const response = await fetch(`${API_URL}/api/blogs/${blog._id}/like`, {
        method: 'PUT',
      });
      const data = await response.json();

      if (data.success) {
        setLikes(data.likes);
        setHasLiked(true);
      }
    } catch (err) {
      console.error('Error liking blog:', err);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateReadTime = (content) => {
    if (!content) return 5;
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  // Inline Styles
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      paddingBottom: '3rem',
    },
    backLink: {
      maxWidth: '800px',
      margin: '2rem auto',
      padding: '0 20px',
    },
    backButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      color: '#2563eb',
      fontSize: '14px',
      fontWeight: '600',
      textDecoration: 'none',
      transition: 'all 0.3s',
    },
    article: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '0 20px',
    },
    coverImage: {
      width: '100%',
      height: '400px',
      objectFit: 'cover',
      borderRadius: '12px',
      marginBottom: '2rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
    category: {
      display: 'inline-block',
      padding: '6px 16px',
      backgroundColor: '#dbeafe',
      color: '#2563eb',
      fontSize: '14px',
      fontWeight: '600',
      borderRadius: '16px',
      marginBottom: '1rem',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '800',
      color: '#1f2937',
      lineHeight: '1.2',
      marginBottom: '1.5rem',
    },
    meta: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      fontSize: '14px',
      color: '#6b7280',
      marginBottom: '2rem',
      paddingBottom: '2rem',
      borderBottom: '1px solid #e5e7eb',
      flexWrap: 'wrap',
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    },
    content: {
      fontSize: '1.125rem',
      lineHeight: '1.8',
      color: '#374151',
      marginBottom: '3rem',
    },
    contentParagraph: {
      marginBottom: '1.5rem',
    },
    likeSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      paddingTop: '2rem',
      borderTop: '1px solid #e5e7eb',
    },
    likeButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 20px',
      backgroundColor: hasLiked ? '#dbeafe' : '#2563eb',
      color: hasLiked ? '#2563eb' : 'white',
      border: 'none',
      borderRadius: '24px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: hasLiked ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s',
    },
    tagsSection: {
      marginTop: '2rem',
      paddingTop: '2rem',
      borderTop: '1px solid #e5e7eb',
    },
    tag: {
      display: 'inline-block',
      padding: '6px 12px',
      backgroundColor: '#f3f4f6',
      color: '#6b7280',
      fontSize: '14px',
      borderRadius: '12px',
      marginRight: '8px',
      marginBottom: '8px',
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
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading blog post...</div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>{error || 'Blog not found'}</div>
        <div style={{ textAlign: 'center' }}>
          <Link to="/blog" style={styles.backButton}>
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.backLink}>
        <Link to="/blog" style={styles.backButton}>
          ← Back to Blog
        </Link>
      </div>

      <article style={styles.article}>
        {/* Display Image from Cloud URL */}
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            style={styles.coverImage}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x400?text=Blog+Post';
            }}
          />
        )}

        {/* Category */}
        {blog.category && (
          <span style={styles.category}>{blog.category}</span>
        )}
        
        {/* Title */}
        <h1 style={styles.title}>{blog.title}</h1>

        {/* Meta Information */}
        <div style={styles.meta}>
          <span style={styles.metaItem}>
            📅 {formatDate(blog.createdAt)}
          </span>
          <span style={styles.metaItem}>
            👤 {blog.author || 'Admin'}
          </span>
          <span style={styles.metaItem}>
            ⏱️ {blog.readTime || calculateReadTime(blog.content)} min read
          </span>
          <span style={styles.metaItem}>
            👁️ {blog.views || 0} views
          </span>
        </div>

        {/* Blog Content */}
        <div style={styles.content}>
          {blog.content.split('\n\n').map((paragraph, index) => (
            <p key={index} style={styles.contentParagraph}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Like Section */}
        <div style={styles.likeSection}>
          <button
            onClick={handleLike}
            disabled={hasLiked}
            style={styles.likeButton}
          >
            {hasLiked ? '❤️ Liked' : '🤍 Like'} ({likes})
          </button>
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div style={styles.tagsSection}>
            <strong style={{ color: '#374151', marginBottom: '10px', display: 'block' }}>
              Tags:
            </strong>
            <div>
              {blog.tags.map((tag, index) => (
                <span key={index} style={styles.tag}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
