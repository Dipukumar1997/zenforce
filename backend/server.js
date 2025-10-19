// import express from "express";
// import connectDB from "./config/mongodb.js";
// import dotenv from "dotenv";
// import cors from "cors";
// import authRouter from "./Routes/authroutes.js";
// import cookieParser from "cookie-parser";
// import userRouter from "./Routes/userRoutes.js";
// import noteRouter from "./Routes/noteRoutes.js";
// import multer from 'multer';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import fs from 'fs';
// import Blog from './models/Blog.js';  // Import Blog model

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = process.env.PORT || 5000;

// connectDB();

// // Create uploads directory
// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// // CORS Configuration
// const allowedOrigins = ["https://zenforce.vercel.app", "http://localhost:3000"];

// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     credentials: true,
//     origin: allowedOrigins,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"]
//   })
// );

// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin);
//   }
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   res.header("Access-Control-Allow-Credentials", "true");
  
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });

// // ✅ Multer Configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
//     cb(null, uniqueName);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type. Only images allowed.'), false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 },
//   fileFilter: fileFilter
// });

// // Serve uploaded images statically
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // ✅ UPLOAD BLOG POST (Admin Route)
// app.post('/api/admin/upload-blog', upload.single('image'), async (req, res) => {
//   try {
//     const { title, content, author, tags, category } = req.body;
    
//     if (!title || !content) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Title and content are required' 
//       });
//     }

//     // Get image URL - Store only the relative path
//     const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

//     // Create new blog post
//     const newBlog = new Blog({
//       title,
//       content,
//       author: author || 'Admin',
//       tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
//       category: category || 'General',
//       image: imageUrl
//     });

//     // Save to MongoDB
//     await newBlog.save();

//     res.status(201).json({
//       success: true,
//       message: 'Blog post created successfully',
//       data: newBlog
//     });

//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to upload blog post',
//       error: error.message
//     });
//   }
// });

// // ✅ GET ALL BLOGS (With pagination, search, filter)
// app.get('/api/blogs', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 9;
//     const skip = (page - 1) * limit;
//     const category = req.query.category;
//     const search = req.query.search;

//     // Build query
//     let query = {};
    
//     if (category && category !== 'All') {
//       query.category = category;
//     }
    
//     if (search) {
//       query.$or = [
//         { title: { $regex: search, $options: 'i' } },
//         { content: { $regex: search, $options: 'i' } },
//         { tags: { $in: [new RegExp(search, 'i')] } }
//       ];
//     }

//     // Get total count for pagination
//     const total = await Blog.countDocuments(query);
    
//     // Fetch blogs
//     const blogs = await Blog.find(query)
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     res.json({
//       success: true,
//       data: blogs,
//       currentPage: page,
//       totalPages: Math.ceil(total / limit),
//       totalBlogs: total
//     });

//   } catch (error) {
//     console.error('Fetch blogs error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch blogs',
//       error: error.message
//     });
//   }
// });

// // ✅ GET SINGLE BLOG BY ID
// app.get('/api/blogs/:id', async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
    
//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: 'Blog not found'
//       });
//     }

//     // Increment views
//     blog.views += 1;
//     await blog.save();

//     res.json({
//       success: true,
//       data: blog
//     });

//   } catch (error) {
//     console.error('Fetch blog error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch blog',
//       error: error.message
//     });
//   }
// });

// // ✅ DELETE BLOG (Admin Route)
// app.delete('/api/admin/blogs/:id', async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
    
//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: 'Blog not found'
//       });
//     }

//     // Delete image file if exists
//     if (blog.image) {
//       const imagePath = path.join(__dirname, blog.image);
//       if (fs.existsSync(imagePath)) {
//         fs.unlinkSync(imagePath);
//       }
//     }

//     await Blog.findByIdAndDelete(req.params.id);

//     res.json({
//       success: true,
//       message: 'Blog deleted successfully'
//     });

//   } catch (error) {
//     console.error('Delete blog error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete blog',
//       error: error.message
//     });
//   }
// });

// // ✅ ADMIN PANEL HTML
// app.get('/admin', (req, res) => {
//   res.send(`
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Blog Admin Panel</title>
//       <style>
//         * { margin: 0; padding: 0; box-sizing: border-box; }
//         body {
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           min-height: 100vh;
//           padding: 20px;
//         }
//         .container {
//           max-width: 900px;
//           margin: 0 auto;
//           background: white;
//           padding: 40px;
//           border-radius: 15px;
//           box-shadow: 0 10px 40px rgba(0,0,0,0.1);
//         }
//         h1 {
//           color: #333;
//           margin-bottom: 30px;
//           text-align: center;
//         }
//         .form-group {
//           margin-bottom: 20px;
//         }
//         label {
//           display: block;
//           margin-bottom: 8px;
//           color: #555;
//           font-weight: 600;
//         }
//         input[type="text"],
//         input[type="file"],
//         select,
//         textarea {
//           width: 100%;
//           padding: 12px;
//           border: 2px solid #e1e1e1;
//           border-radius: 8px;
//           font-size: 14px;
//           transition: border 0.3s;
//         }
//         input[type="text"]:focus,
//         select:focus,
//         textarea:focus {
//           outline: none;
//           border-color: #667eea;
//         }
//         textarea {
//           min-height: 250px;
//           resize: vertical;
//           font-family: inherit;
//         }
//         button {
//           width: 100%;
//           padding: 15px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           border: none;
//           border-radius: 8px;
//           font-size: 16px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: transform 0.2s;
//         }
//         button:hover {
//           transform: translateY(-2px);
//         }
//         .preview {
//           margin-top: 10px;
//           max-width: 400px;
//         }
//         .preview img {
//           width: 100%;
//           border-radius: 8px;
//           margin-top: 10px;
//         }
//         .message {
//           padding: 15px;
//           margin-bottom: 20px;
//           border-radius: 8px;
//           display: none;
//         }
//         .message.success {
//           background: #d4edda;
//           color: #155724;
//           border: 1px solid #c3e6cb;
//         }
//         .message.error {
//           background: #f8d7da;
//           color: #721c24;
//           border: 1px solid #f5c6cb;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <h1>📝 Upload Blog Post</h1>
//         <div id="message" class="message"></div>
//         <form id="blogForm" enctype="multipart/form-data">
//           <div class="form-group">
//             <label for="title">Title *</label>
//             <input type="text" id="title" name="title" required placeholder="Enter blog title">
//           </div>
          
//           <div class="form-group">
//             <label for="author">Author</label>
//             <input type="text" id="author" name="author" placeholder="Enter author name (default: Admin)">
//           </div>
          
//           <div class="form-group">
//             <label for="category">Category</label>
//             <select id="category" name="category">
//               <option value="General">General</option>
//               <option value="Productivity">Productivity</option>
//               <option value="Technology">Technology</option>
//               <option value="Development">Development</option>
//               <option value="Tutorials">Tutorials</option>
//               <option value="News">News</option>
//               <option value="Tips">Tips</option>
//             </select>
//           </div>
          
//           <div class="form-group">
//             <label for="tags">Tags (comma-separated)</label>
//             <input type="text" id="tags" name="tags" placeholder="e.g., nodejs, mongodb, tutorial">
//           </div>
          
//           <div class="form-group">
//             <label for="image">Featured Image</label>
//             <input type="file" id="image" name="image" accept="image/*" onchange="previewImage(event)">
//             <div id="preview" class="preview"></div>
//           </div>
          
//           <div class="form-group">
//             <label for="content">Content *</label>
//             <textarea id="content" name="content" required placeholder="Write your blog content here..."></textarea>
//           </div>
          
//           <button type="submit">Publish Blog Post</button>
//         </form>
//       </div>

//       <script>
//         function previewImage(event) {
//           const preview = document.getElementById('preview');
//           const file = event.target.files[0];
          
//           if (file) {
//             const reader = new FileReader();
//             reader.onload = function(e) {
//               preview.innerHTML = '<img src="' + e.target.result + '" alt="Preview">';
//             };
//             reader.readAsDataURL(file);
//           }
//         }

//         document.getElementById('blogForm').addEventListener('submit', async (e) => {
//           e.preventDefault();
          
//           const formData = new FormData();
//           formData.append('title', document.getElementById('title').value);
//           formData.append('author', document.getElementById('author').value);
//           formData.append('category', document.getElementById('category').value);
//           formData.append('tags', document.getElementById('tags').value);
//           formData.append('content', document.getElementById('content').value);
          
//           const imageFile = document.getElementById('image').files[0];
//           if (imageFile) {
//             formData.append('image', imageFile);
//           }
          
//           const messageDiv = document.getElementById('message');
          
//           try {
//             const response = await fetch('/api/admin/upload-blog', {
//               method: 'POST',
//               body: formData
//             });
            
//             const data = await response.json();
            
//             if (data.success) {
//               messageDiv.className = 'message success';
//               messageDiv.textContent = '✅ Blog post uploaded successfully!';
//               messageDiv.style.display = 'block';
//               document.getElementById('blogForm').reset();
//               document.getElementById('preview').innerHTML = '';
//             } else {
//               throw new Error(data.message);
//             }
//           } catch (error) {
//             messageDiv.className = 'message error';
//             messageDiv.textContent = '❌ Error: ' + error.message;
//             messageDiv.style.display = 'block';
//           }
          
//           setTimeout(() => {
//             messageDiv.style.display = 'none';
//           }, 5000);
//         });
//       </script>
//     </body>
//     </html>
//   `);
// });

// // Existing Routes
// app.get("/", (req, res) => {
//   res.send("API working");
// });
// app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);
// app.use("/api/developer", noteRouter);

// // Error Handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     message: 'Something went wrong!',
//     error: err.message
//   });
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

















// import express from "express";
// import connectDB from "./config/mongodb.js";
// import dotenv from "dotenv";
// import cors from "cors";
// import authRouter from "./Routes/authroutes.js";
// import cookieParser from "cookie-parser";
// import userRouter from "./Routes/userRoutes.js";
// import noteRouter from "./Routes/noteRoutes.js";
// import Blog from './models/Blog.js';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// connectDB();

// // CORS Configuration
// const allowedOrigins = ["https://zenforce.vercel.app", "http://localhost:3000"];

// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     credentials: true,
//     origin: allowedOrigins,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"]
//   })
// );

// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin);
//   }
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   res.header("Access-Control-Allow-Credentials", "true");
  
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });

// // ✅ UPLOAD BLOG POST (Admin Route) - With Image URL
// app.post('/api/admin/upload-blog', async (req, res) => {
//   try {
//     const { title, content, author, tags, category, imageUrl } = req.body;
    
//     if (!title || !content) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Title and content are required' 
//       });
//     }

//     // Create new blog post with image URL
//     const newBlog = new Blog({
//       title,
//       content,
//       author: author || 'Admin',
//       tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
//       category: category || 'General',
//       image: imageUrl || null  // Store the image URL directly
//     });

//     await newBlog.save();

//     res.status(201).json({
//       success: true,
//       message: 'Blog post created successfully',
//       data: newBlog
//     });

//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to upload blog post',
//       error: error.message
//     });
//   }
// });

// // ✅ GET ALL BLOGS
// app.get('/api/blogs', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 9;
//     const skip = (page - 1) * limit;
//     const category = req.query.category;
//     const search = req.query.search;

//     let query = {};
    
//     if (category && category !== 'All') {
//       query.category = category;
//     }
    
//     if (search) {
//       query.$or = [
//         { title: { $regex: search, $options: 'i' } },
//         { content: { $regex: search, $options: 'i' } },
//         { tags: { $in: [new RegExp(search, 'i')] } }
//       ];
//     }

//     const total = await Blog.countDocuments(query);
//     const blogs = await Blog.find(query)
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     res.json({
//       success: true,
//       data: blogs,
//       currentPage: page,
//       totalPages: Math.ceil(total / limit),
//       totalBlogs: total
//     });

//   } catch (error) {
//     console.error('Fetch blogs error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch blogs',
//       error: error.message
//     });
//   }
// });

// // ✅ GET SINGLE BLOG BY ID
// app.get('/api/blogs/slug/:slug', async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
    
//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: 'Blog not found'
//       });
//     }

//     blog.views += 1;
//     await blog.save();

//     res.json({
//       success: true,
//       data: blog
//     });

//   } catch (error) {
//     console.error('Fetch blog error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch blog',
//       error: error.message
//     });
//   }
// });

// // ✅ DELETE BLOG
// app.delete('/api/admin/blogs/:id', async (req, res) => {
//   try {
//     const blog = await Blog.findByIdAndDelete(req.params.id);
    
//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: 'Blog not found'
//       });
//     }

//     res.json({
//       success: true,
//       message: 'Blog deleted successfully'
//     });

//   } catch (error) {
//     console.error('Delete blog error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete blog',
//       error: error.message
//     });
//   }
// });

// // ✅ ADMIN PANEL HTML - Paste Image URL
// app.get('/admin', (req, res) => {
//   res.send(`
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Blog Admin Panel</title>
//       <style>
//         * { margin: 0; padding: 0; box-sizing: border-box; }
//         body {
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           min-height: 100vh;
//           padding: 20px;
//         }
//         .container {
//           max-width: 900px;
//           margin: 0 auto;
//           background: white;
//           padding: 40px;
//           border-radius: 15px;
//           box-shadow: 0 10px 40px rgba(0,0,0,0.1);
//         }
//         h1 {
//           color: #333;
//           margin-bottom: 30px;
//           text-align: center;
//         }
//         .form-group {
//           margin-bottom: 20px;
//         }
//         label {
//           display: block;
//           margin-bottom: 8px;
//           color: #555;
//           font-weight: 600;
//         }
//         .hint {
//           font-size: 12px;
//           color: #6b7280;
//           margin-top: 4px;
//         }
//         .hint a {
//           color: #2563eb;
//           text-decoration: none;
//         }
//         input[type="text"],
//         input[type="url"],
//         select,
//         textarea {
//           width: 100%;
//           padding: 12px;
//           border: 2px solid #e1e1e1;
//           border-radius: 8px;
//           font-size: 14px;
//           transition: border 0.3s;
//         }
//         input[type="text"]:focus,
//         input[type="url"]:focus,
//         select:focus,
//         textarea:focus {
//           outline: none;
//           border-color: #667eea;
//         }
//         textarea {
//           min-height: 250px;
//           resize: vertical;
//           font-family: inherit;
//         }
//         button {
//           width: 100%;
//           padding: 15px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           border: none;
//           border-radius: 8px;
//           font-size: 16px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: transform 0.2s;
//         }
//         button:hover {
//           transform: translateY(-2px);
//         }
//         .preview {
//           margin-top: 10px;
//           max-width: 100%;
//         }
//         .preview img {
//           width: 100%;
//           max-width: 500px;
//           border-radius: 8px;
//           margin-top: 10px;
//         }
//         .message {
//           padding: 15px;
//           margin-bottom: 20px;
//           border-radius: 8px;
//           display: none;
//         }
//         .message.success {
//           background: #d4edda;
//           color: #155724;
//           border: 1px solid #c3e6cb;
//         }
//         .message.error {
//           background: #f8d7da;
//           color: #721c24;
//           border: 1px solid #f5c6cb;
//         }
//         .image-hosts {
//           background: #f0f9ff;
//           padding: 12px;
//           border-radius: 8px;
//           margin-bottom: 15px;
//         }
//         .image-hosts h3 {
//           font-size: 14px;
//           margin-bottom: 8px;
//           color: #1e40af;
//         }
//         .image-hosts a {
//           display: inline-block;
//           margin-right: 15px;
//           color: #2563eb;
//           text-decoration: none;
//           font-size: 13px;
//         }
//         .image-hosts a:hover {
//           text-decoration: underline;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <h1>📝 Upload Blog Post</h1>
//         <div id="message" class="message"></div>
        
//         <div class="image-hosts">
//           <h3>📤 Upload your image first (opens in new tab):</h3>
//           <a href="https://imgbb.com" target="_blank">ImgBB (Free, No signup)</a>
//           <a href="https://cloudinary.com/users/register_free" target="_blank">Cloudinary (Best quality)</a>
//           <a href="https://imgur.com/upload" target="_blank">Imgur</a>
//         </div>
        
//         <form id="blogForm">
//           <div class="form-group">
//             <label for="title">Title *</label>
//             <input type="text" id="title" name="title" required placeholder="Enter blog title">
//           </div>
          
//           <div class="form-group">
//             <label for="author">Author</label>
//             <input type="text" id="author" name="author" placeholder="Enter author name (default: Admin)">
//           </div>
          
//           <div class="form-group">
//             <label for="category">Category</label>
//             <select id="category" name="category">
//               <option value="General">General</option>
//               <option value="Productivity">Productivity</option>
//               <option value="Technology">Technology</option>
//               <option value="Development">Development</option>
//               <option value="Tutorials">Tutorials</option>
//               <option value="News">News</option>
//               <option value="Tips">Tips</option>
//             </select>
//           </div>
          
//           <div class="form-group">
//             <label for="tags">Tags (comma-separated)</label>
//             <input type="text" id="tags" name="tags" placeholder="e.g., nodejs, mongodb, tutorial">
//           </div>
          
//           <div class="form-group">
//             <label for="imageUrl">Image URL *</label>
//             <input type="url" id="imageUrl" name="imageUrl" placeholder="Paste image URL here" onchange="previewImage()">
//             <div class="hint">Upload your image to ImgBB/Cloudinary above, then paste the direct link here</div>
//             <div id="preview" class="preview"></div>
//           </div>
          
//           <div class="form-group">
//             <label for="content">Content *</label>
//             <textarea id="content" name="content" required placeholder="Write your blog content here..."></textarea>
//           </div>
          
//           <button type="submit">Publish Blog Post</button>
//         </form>
//       </div>

//       <script>
//         function previewImage() {
//           const preview = document.getElementById('preview');
//           const imageUrl = document.getElementById('imageUrl').value;
          
//           if (imageUrl) {
//             preview.innerHTML = '<img src="' + imageUrl + '" alt="Preview" onerror="this.style.display=\\'none\\'">';
//           } else {
//             preview.innerHTML = '';
//           }
//         }

//         document.getElementById('blogForm').addEventListener('submit', async (e) => {
//           e.preventDefault();
          
//           const blogData = {
//             title: document.getElementById('title').value,
//             author: document.getElementById('author').value,
//             category: document.getElementById('category').value,
//             tags: document.getElementById('tags').value,
//             content: document.getElementById('content').value,
//             imageUrl: document.getElementById('imageUrl').value
//           };
          
//           const messageDiv = document.getElementById('message');
          
//           try {
//             const response = await fetch('/api/admin/upload-blog', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json'
//               },
//               body: JSON.stringify(blogData)
//             });
            
//             const data = await response.json();
            
//             if (data.success) {
//               messageDiv.className = 'message success';
//               messageDiv.textContent = '✅ Blog post uploaded successfully!';
//               messageDiv.style.display = 'block';
//               document.getElementById('blogForm').reset();
//               document.getElementById('preview').innerHTML = '';
//             } else {
//               throw new Error(data.message);
//             }
//           } catch (error) {
//             messageDiv.className = 'message error';
//             messageDiv.textContent = '❌ Error: ' + error.message;
//             messageDiv.style.display = 'block';
//           }
          
//           setTimeout(() => {
//             messageDiv.style.display = 'none';
//           }, 5000);
//         });
//       </script>
//     </body>
//     </html>
//   `);
// });

// // Existing Routes
// app.get("/", (req, res) => {
//   res.send("API working");
// });
// app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);
// app.use("/api/developer", noteRouter);

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
















// import express from "express";
// import connectDB from "./config/mongodb.js";
// import dotenv from "dotenv";
// import cors from "cors";
// import authRouter from "./Routes/authroutes.js";
// import cookieParser from "cookie-parser";
// import userRouter from "./Routes/userRoutes.js";
// import noteRouter from "./Routes/noteRoutes.js";
// import Blog from './models/Blog.js';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// connectDB();

// // CORS Configuration
// const allowedOrigins = ["https://zenforce.vercel.app", "http://localhost:3000"];

// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     credentials: true,
//     origin: allowedOrigins,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"]
//   })
// );

// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin);
//   }
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   res.header("Access-Control-Allow-Credentials", "true");
  
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });

// // ✅ UPLOAD BLOG POST (Admin Route)
// app.post('/api/admin/upload-blog', async (req, res) => {
//   try {
//     const { title, content, author, tags, category, imageUrl } = req.body;
    
//     if (!title || !content) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Title and content are required' 
//       });
//     }

//     // Create new blog post
//     const newBlog = new Blog({
//       title,
//       content,
//       author: author || 'Admin',
//       tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
//       category: category || 'General',
//       image: imageUrl || null
//     });

//     await newBlog.save();

//     res.status(201).json({
//       success: true,
//       message: 'Blog post created successfully',
//       data: newBlog
//     });

//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to upload blog post',
//       error: error.message
//     });
//   }
// });

// // ✅ GET ALL BLOGS (With pagination, search, filter)
// app.get('/api/blogs', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 9;
//     const skip = (page - 1) * limit;
//     const category = req.query.category;
//     const search = req.query.search;

//     let query = { published: true }; // Only show published blogs
    
//     if (category && category !== 'All') {
//       query.category = category;
//     }
    
//     if (search) {
//       query.$or = [
//         { title: { $regex: search, $options: 'i' } },
//         { content: { $regex: search, $options: 'i' } },
//         { tags: { $in: [new RegExp(search, 'i')] } }
//       ];
//     }

//     const total = await Blog.countDocuments(query);
//     const blogs = await Blog.find(query)
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     res.json({
//       success: true,
//       data: blogs,
//       currentPage: page,
//       totalPages: Math.ceil(total / limit),
//       totalBlogs: total
//     });

//   } catch (error) {
//     console.error('Fetch blogs error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch blogs',
//       error: error.message
//     });
//   }
// });

// // ✅ GET BLOG BY SLUG (Add this BEFORE /:id route)
// app.get('/api/blogs/slug/:slug', async (req, res) => {
//   try {
//     const blog = await Blog.findOne({ slug: req.params.slug, published: true });
    
//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: 'Blog not found'
//       });
//     }

//     // Increment views
//     blog.views += 1;
//     await blog.save({ validateBeforeSave: false });

//     res.json({
//       success: true,
//       data: blog
//     });

//   } catch (error) {
//     console.error('Fetch blog by slug error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch blog',
//       error: error.message
//     });
//   }
// });

// // ✅ GET BLOG BY ID
// app.get('/api/blogs/:id', async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
    
//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: 'Blog not found'
//       });
//     }

//     // Increment views
//     blog.views += 1;
//     await blog.save({ validateBeforeSave: false });

//     res.json({
//       success: true,
//       data: blog
//     });

//   } catch (error) {
//     console.error('Fetch blog by ID error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch blog',
//       error: error.message
//     });
//   }
// });

// // ✅ LIKE A BLOG POST
// app.put('/api/blogs/:id/like', async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
    
//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: 'Blog not found'
//       });
//     }

//     blog.likes += 1;
//     await blog.save({ validateBeforeSave: false });

//     res.json({
//       success: true,
//       likes: blog.likes
//     });

//   } catch (error) {
//     console.error('Like blog error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to like blog',
//       error: error.message
//     });
//   }
// });

// // ✅ DELETE BLOG (Admin Route)
// app.delete('/api/admin/blogs/:id', async (req, res) => {
//   try {
//     const blog = await Blog.findByIdAndDelete(req.params.id);
    
//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: 'Blog not found'
//       });
//     }

//     res.json({
//       success: true,
//       message: 'Blog deleted successfully'
//     });

//   } catch (error) {
//     console.error('Delete blog error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete blog',
//       error: error.message
//     });
//   }
// });

// // ✅ ADMIN PANEL HTML
// app.get('/admin', (req, res) => {
//   res.send(`
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Blog Admin Panel</title>
//       <style>
//         * { margin: 0; padding: 0; box-sizing: border-box; }
//         body {
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           min-height: 100vh;
//           padding: 20px;
//         }
//         .container {
//           max-width: 900px;
//           margin: 0 auto;
//           background: white;
//           padding: 40px;
//           border-radius: 15px;
//           box-shadow: 0 10px 40px rgba(0,0,0,0.1);
//         }
//         h1 {
//           color: #333;
//           margin-bottom: 30px;
//           text-align: center;
//         }
//         .form-group {
//           margin-bottom: 20px;
//         }
//         label {
//           display: block;
//           margin-bottom: 8px;
//           color: #555;
//           font-weight: 600;
//         }
//         .hint {
//           font-size: 12px;
//           color: #6b7280;
//           margin-top: 4px;
//         }
//         .hint a {
//           color: #2563eb;
//           text-decoration: none;
//         }
//         input[type="text"],
//         input[type="url"],
//         select,
//         textarea {
//           width: 100%;
//           padding: 12px;
//           border: 2px solid #e1e1e1;
//           border-radius: 8px;
//           font-size: 14px;
//           transition: border 0.3s;
//         }
//         input[type="text"]:focus,
//         input[type="url"]:focus,
//         select:focus,
//         textarea:focus {
//           outline: none;
//           border-color: #667eea;
//         }
//         textarea {
//           min-height: 250px;
//           resize: vertical;
//           font-family: inherit;
//         }
//         button {
//           width: 100%;
//           padding: 15px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           border: none;
//           border-radius: 8px;
//           font-size: 16px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: transform 0.2s;
//         }
//         button:hover {
//           transform: translateY(-2px);
//         }
//         .preview {
//           margin-top: 10px;
//           max-width: 100%;
//         }
//         .preview img {
//           width: 100%;
//           max-width: 500px;
//           border-radius: 8px;
//           margin-top: 10px;
//         }
//         .message {
//           padding: 15px;
//           margin-bottom: 20px;
//           border-radius: 8px;
//           display: none;
//         }
//         .message.success {
//           background: #d4edda;
//           color: #155724;
//           border: 1px solid #c3e6cb;
//         }
//         .message.error {
//           background: #f8d7da;
//           color: #721c24;
//           border: 1px solid #f5c6cb;
//         }
//         .image-hosts {
//           background: #f0f9ff;
//           padding: 12px;
//           border-radius: 8px;
//           margin-bottom: 15px;
//         }
//         .image-hosts h3 {
//           font-size: 14px;
//           margin-bottom: 8px;
//           color: #1e40af;
//         }
//         .image-hosts a {
//           display: inline-block;
//           margin-right: 15px;
//           color: #2563eb;
//           text-decoration: none;
//           font-size: 13px;
//         }
//         .image-hosts a:hover {
//           text-decoration: underline;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <h1>📝 Upload Blog Post</h1>
//         <div id="message" class="message"></div>
        
//         <div class="image-hosts">
//           <h3>📤 Upload your image first (opens in new tab):</h3>
//           <a href="https://imgbb.com" target="_blank">ImgBB (Free, No signup)</a>
//           <a href="https://cloudinary.com/users/register_free" target="_blank">Cloudinary (Best quality)</a>
//           <a href="https://imgur.com/upload" target="_blank">Imgur</a>
//         </div>
        
//         <form id="blogForm">
//           <div class="form-group">
//             <label for="title">Title *</label>
//             <input type="text" id="title" name="title" required placeholder="Enter blog title">
//           </div>
          
//           <div class="form-group">
//             <label for="author">Author</label>
//             <input type="text" id="author" name="author" placeholder="Enter author name (default: Admin)">
//           </div>
          
//           <div class="form-group">
//             <label for="category">Category</label>
//             <select id="category" name="category">
//               <option value="General">General</option>
//               <option value="Productivity">Productivity</option>
//               <option value="Technology">Technology</option>
//               <option value="Development">Development</option>
//               <option value="Tutorials">Tutorials</option>
//               <option value="News">News</option>
//               <option value="Tips">Tips</option>
//             </select>
//           </div>
          
//           <div class="form-group">
//             <label for="tags">Tags (comma-separated)</label>
//             <input type="text" id="tags" name="tags" placeholder="e.g., nodejs, mongodb, tutorial">
//           </div>
          
//           <div class="form-group">
//             <label for="imageUrl">Image URL *</label>
//             <input type="url" id="imageUrl" name="imageUrl" placeholder="Paste image URL here" onchange="previewImage()">
//             <div class="hint">Upload your image to ImgBB/Cloudinary above, then paste the direct link here</div>
//             <div id="preview" class="preview"></div>
//           </div>
          
//           <div class="form-group">
//             <label for="content">Content *</label>
//             <textarea id="content" name="content" required placeholder="Write your blog content here..."></textarea>
//           </div>
          
//           <button type="submit">Publish Blog Post</button>
//         </form>
//       </div>

//       <script>
//         function previewImage() {
//           const preview = document.getElementById('preview');
//           const imageUrl = document.getElementById('imageUrl').value;
          
//           if (imageUrl) {
//             preview.innerHTML = '<img src="' + imageUrl + '" alt="Preview" onerror="this.style.display=\\'none\\'">';
//           } else {
//             preview.innerHTML = '';
//           }
//         }

//         document.getElementById('blogForm').addEventListener('submit', async (e) => {
//           e.preventDefault();
          
//           const blogData = {
//             title: document.getElementById('title').value,
//             author: document.getElementById('author').value,
//             category: document.getElementById('category').value,
//             tags: document.getElementById('tags').value,
//             content: document.getElementById('content').value,
//             imageUrl: document.getElementById('imageUrl').value
//           };
          
//           const messageDiv = document.getElementById('message');
          
//           try {
//             const response = await fetch('/api/admin/upload-blog', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json'
//               },
//               body: JSON.stringify(blogData)
//             });
            
//             const data = await response.json();
            
//             if (data.success) {
//               messageDiv.className = 'message success';
//               messageDiv.textContent = '✅ Blog post uploaded successfully!';
//               messageDiv.style.display = 'block';
//               document.getElementById('blogForm').reset();
//               document.getElementById('preview').innerHTML = '';
//             } else {
//               throw new Error(data.message);
//             }
//           } catch (error) {
//             messageDiv.className = 'message error';
//             messageDiv.textContent = '❌ Error: ' + error.message;
//             messageDiv.style.display = 'block';
//           }
          
//           setTimeout(() => {
//             messageDiv.style.display = 'none';
//           }, 5000);
//         });
//       </script>
//     </body>
//     </html>
//   `);
// });

// // Existing Routes
// app.get("/", (req, res) => {
//   res.send("API working");
// });
// app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);
// app.use("/api/developer", noteRouter);

// // Error Handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     message: 'Something went wrong!',
//     error: err.message
//   });
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




import express from "express";
import connectDB from "./config/mongodb.js";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./Routes/authroutes.js";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/userRoutes.js";
import noteRouter from "./Routes/noteRoutes.js";
import Blog from './models/Blog.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// ============================================
// IP WHITELIST SCHEMA AND MODEL
// ============================================
const whitelistSchema = new mongoose.Schema({
  ip: { type: String, required: true, unique: true },
  description: { type: String, default: 'Admin IP' },
  addedAt: { type: Date, default: Date.now }
});

const WhitelistIP = mongoose.model('WhitelistIP', whitelistSchema);

// ============================================
// IP WHITELIST MIDDLEWARE
// ============================================
const checkIPWhitelist = async (req, res, next) => {
  try {
    // Get client IP from various headers (works on Vercel and local)
    const clientIP = (req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
                     req.headers['x-real-ip'] || 
                     req.connection?.remoteAddress || 
                     req.socket?.remoteAddress ||
                     'Unknown').replace('::ffff:', '');

    console.log('🔍 Checking IP:', clientIP);

    // Check if IP exists in MongoDB whitelist
    const isWhitelisted = await WhitelistIP.findOne({ ip: clientIP });

    if (!isWhitelisted) {
      console.log('❌ Access denied for IP:', clientIP);
      return res.status(403).json({ 
        success: false,
        error: 'Forbidden - Your IP is not authorized to access this resource',
        yourIP: clientIP,
        message: 'Contact administrator to whitelist your IP'
      });
    }

    console.log('✅ Access granted for IP:', clientIP);
    next();
  } catch (error) {
    console.error('IP check error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error during IP validation' 
    });
  }
};

// CORS Configuration
const allowedOrigins = ["https://zenforce.vercel.app", "http://localhost:3000"];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ============================================
// ADMIN ROUTES WITH IP PROTECTION
// ============================================

// ✅ UPLOAD BLOG POST (Admin Route - IP Protected)
app.post('/api/admin/upload-blog', checkIPWhitelist, async (req, res) => {
  try {
    const { title, content, author, tags, category, imageUrl } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title and content are required' 
      });
    }

    // Create new blog post
    const newBlog = new Blog({
      title,
      content,
      author: author || 'Admin',
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      category: category || 'General',
      image: imageUrl || null
    });

    await newBlog.save();

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: newBlog
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload blog post',
      error: error.message
    });
  }
});

// ✅ DELETE BLOG (Admin Route - IP Protected)
app.delete('/api/admin/blogs/:id', checkIPWhitelist, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });

  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete blog',
      error: error.message
    });
  }
});

// ✅ ADMIN PANEL HTML (IP Protected)
app.get('/admin', checkIPWhitelist, (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Blog Admin Panel</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          padding: 20px;
        }
        .container {
          max-width: 900px;
          margin: 0 auto;
          background: white;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }
        h1 {
          color: #333;
          margin-bottom: 30px;
          text-align: center;
        }
        .form-group {
          margin-bottom: 20px;
        }
        label {
          display: block;
          margin-bottom: 8px;
          color: #555;
          font-weight: 600;
        }
        .hint {
          font-size: 12px;
          color: #6b7280;
          margin-top: 4px;
        }
        .hint a {
          color: #2563eb;
          text-decoration: none;
        }
        input[type="text"],
        input[type="url"],
        select,
        textarea {
          width: 100%;
          padding: 12px;
          border: 2px solid #e1e1e1;
          border-radius: 8px;
          font-size: 14px;
          transition: border 0.3s;
        }
        input[type="text"]:focus,
        input[type="url"]:focus,
        select:focus,
        textarea:focus {
          outline: none;
          border-color: #667eea;
        }
        textarea {
          min-height: 250px;
          resize: vertical;
          font-family: inherit;
        }
        button {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }
        button:hover {
          transform: translateY(-2px);
        }
        .preview {
          margin-top: 10px;
          max-width: 100%;
        }
        .preview img {
          width: 100%;
          max-width: 500px;
          border-radius: 8px;
          margin-top: 10px;
        }
        .message {
          padding: 15px;
          margin-bottom: 20px;
          border-radius: 8px;
          display: none;
        }
        .message.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        .message.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
        .image-hosts {
          background: #f0f9ff;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 15px;
        }
        .image-hosts h3 {
          font-size: 14px;
          margin-bottom: 8px;
          color: #1e40af;
        }
        .image-hosts a {
          display: inline-block;
          margin-right: 15px;
          color: #2563eb;
          text-decoration: none;
          font-size: 13px;
        }
        .image-hosts a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>📝 Upload Blog Post</h1>
        <div id="message" class="message"></div>
        
        <div class="image-hosts">
          <h3>📤 Upload your image first (opens in new tab):</h3>
          <a href="https://imgbb.com" target="_blank">ImgBB (Free, No signup)</a>
          <a href="https://cloudinary.com/users/register_free" target="_blank">Cloudinary (Best quality)</a>
          <a href="https://imgur.com/upload" target="_blank">Imgur</a>
        </div>
        
        <form id="blogForm">
          <div class="form-group">
            <label for="title">Title *</label>
            <input type="text" id="title" name="title" required placeholder="Enter blog title">
          </div>
          
          <div class="form-group">
            <label for="author">Author</label>
            <input type="text" id="author" name="author" placeholder="Enter author name (default: Admin)">
          </div>
          
          <div class="form-group">
            <label for="category">Category</label>
            <select id="category" name="category">
              <option value="General">General</option>
              <option value="Productivity">Productivity</option>
              <option value="Technology">Technology</option>
              <option value="Development">Development</option>
              <option value="Tutorials">Tutorials</option>
              <option value="News">News</option>
              <option value="Tips">Tips</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="tags">Tags (comma-separated)</label>
            <input type="text" id="tags" name="tags" placeholder="e.g., nodejs, mongodb, tutorial">
          </div>
          
          <div class="form-group">
            <label for="imageUrl">Image URL *</label>
            <input type="url" id="imageUrl" name="imageUrl" placeholder="Paste image URL here" onchange="previewImage()">
            <div class="hint">Upload your image to ImgBB/Cloudinary above, then paste the direct link here</div>
            <div id="preview" class="preview"></div>
          </div>
          
          <div class="form-group">
            <label for="content">Content *</label>
            <textarea id="content" name="content" required placeholder="Write your blog content here..."></textarea>
          </div>
          
          <button type="submit">Publish Blog Post</button>
        </form>
      </div>

      <script>
        function previewImage() {
          const preview = document.getElementById('preview');
          const imageUrl = document.getElementById('imageUrl').value;
          
          if (imageUrl) {
            preview.innerHTML = '<img src="' + imageUrl + '" alt="Preview" onerror="this.style.display=\\'none\\'">';
          } else {
            preview.innerHTML = '';
          }
        }

        document.getElementById('blogForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const blogData = {
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            category: document.getElementById('category').value,
            tags: document.getElementById('tags').value,
            content: document.getElementById('content').value,
            imageUrl: document.getElementById('imageUrl').value
          };
          
          const messageDiv = document.getElementById('message');
          
          try {
            const response = await fetch('/api/admin/upload-blog', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(blogData)
            });
            
            const data = await response.json();
            
            if (data.success) {
              messageDiv.className = 'message success';
              messageDiv.textContent = '✅ Blog post uploaded successfully!';
              messageDiv.style.display = 'block';
              document.getElementById('blogForm').reset();
              document.getElementById('preview').innerHTML = '';
            } else {
              throw new Error(data.message);
            }
          } catch (error) {
            messageDiv.className = 'message error';
            messageDiv.textContent = '❌ Error: ' + error.message;
            messageDiv.style.display = 'block';
          }
          
          setTimeout(() => {
            messageDiv.style.display = 'none';
          }, 5000);
        });
      </script>
    </body>
    </html>
  `);
});

// ============================================
// HELPER ROUTE TO MANAGE IP WHITELIST
// ============================================

// Get your current IP (unprotected - to help you get started)
app.get('/api/my-ip', (req, res) => {
  const clientIP = (req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
                   req.headers['x-real-ip'] || 
                   req.connection?.remoteAddress ||
                   'Unknown').replace('::ffff:', '');
  
  res.json({ 
    success: true,
    yourIP: clientIP,
    message: 'Use this IP to add to whitelist'
  });
});

// Add IP to whitelist (protect this later with a secret!)
app.post('/api/admin/whitelist/add', async (req, res) => {
  try {
    const { ip, description, secret } = req.body;
    
    // Simple secret protection - change this to something strong!
    const ADMIN_SECRET = process.env.ADMIN_SECRET || 'change-this-secret-key';
    
    if (secret !== ADMIN_SECRET) {
      return res.status(403).json({ 
        success: false,
        error: 'Invalid admin secret' 
      });
    }
    
    if (!ip) {
      return res.status(400).json({ 
        success: false,
        error: 'IP address is required' 
      });
    }

    // Check if IP already exists
    const existing = await WhitelistIP.findOne({ ip });
    if (existing) {
      return res.json({ 
        success: true,
        message: 'IP already whitelisted',
        ip 
      });
    }

    const newIP = new WhitelistIP({ 
      ip, 
      description: description || 'Admin IP' 
    });
    await newIP.save();
    
    res.json({ 
      success: true,
      message: 'IP added to whitelist successfully',
      ip 
    });
  } catch (error) {
    console.error('Whitelist add error:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Remove IP from whitelist
app.delete('/api/admin/whitelist/remove', async (req, res) => {
  try {
    const { ip, secret } = req.body;
    
    const ADMIN_SECRET = process.env.ADMIN_SECRET || 'change-this-secret-key';
    
    if (secret !== ADMIN_SECRET) {
      return res.status(403).json({ 
        success: false,
        error: 'Invalid admin secret' 
      });
    }

    await WhitelistIP.deleteOne({ ip });
    
    res.json({ 
      success: true,
      message: 'IP removed from whitelist',
      ip 
    });
  } catch (error) {
    console.error('Whitelist remove error:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// ============================================
// PUBLIC BLOG ROUTES (NO IP CHECK)
// ============================================

// ✅ GET ALL BLOGS (Public - No IP check)
app.get('/api/blogs', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;
    const category = req.query.category;
    const search = req.query.search;

    let query = { published: true };
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      data: blogs,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalBlogs: total
    });

  } catch (error) {
    console.error('Fetch blogs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blogs',
      error: error.message
    });
  }
});

// ✅ GET BLOG BY SLUG (Public - No IP check)
app.get('/api/blogs/slug/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true });
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    blog.views += 1;
    await blog.save({ validateBeforeSave: false });

    res.json({
      success: true,
      data: blog
    });

  } catch (error) {
    console.error('Fetch blog by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog',
      error: error.message
    });
  }
});

// ✅ GET BLOG BY ID (Public - No IP check)
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    blog.views += 1;
    await blog.save({ validateBeforeSave: false });

    res.json({
      success: true,
      data: blog
    });

  } catch (error) {
    console.error('Fetch blog by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog',
      error: error.message
    });
  }
});

// ✅ LIKE A BLOG POST (Public - No IP check)
app.put('/api/blogs/:id/like', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    blog.likes += 1;
    await blog.save({ validateBeforeSave: false });

    res.json({
      success: true,
      likes: blog.likes
    });

  } catch (error) {
    console.error('Like blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to like blog',
      error: error.message
    });
  }
});

// Existing Routes
app.get("/", (req, res) => {
  res.send("API working");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/developer", noteRouter);

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: err.message
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
