// // // backend/models/Blog.js
// // import mongoose from 'mongoose';

// // const blogSchema = new mongoose.Schema({
// //   title: {
// //     type: String,
// //     required: [true, 'Title is required'],
// //     trim: true,
// //     maxlength: [200, 'Title cannot be more than 200 characters']
// //   },
// //   slug: {
// //     type: String,
// //     required: true,
// //     unique: true,
// //     lowercase: true
// //   },
// //   excerpt: {
// //     type: String,
// //     required: [true, 'Excerpt is required'],
// //     maxlength: [300, 'Excerpt cannot be more than 300 characters']
// //   },
// //   content: {
// //     type: String,
// //     required: [true, 'Content is required'],
// //     minlength: [1000, 'Content must be at least 1000 characters']
// //   },
// //   author: {
// //     type: String,
// //     required: true,
// //     default: 'ZenForce Team'
// //   },
// //   category: {
// //     type: String,
// //     required: true,
// //     enum: ['Productivity', 'Technology', 'Development', 'Tutorials', 'News', 'Tips']
// //   },
// //   tags: [{
// //     type: String,
// //     trim: true
// //   }],
// //   coverImage: {
// //     type: String,
// //     default: 'https://via.placeholder.com/800x400?text=Blog+Post'
// //   },
// //   readTime: {
// //     type: Number, // in minutes
// //     default: 5
// //   },
// //   published: {
// //     type: Boolean,
// //     default: true
// //   },
// //   views: {
// //     type: Number,
// //     default: 0
// //   },
// //   likes: {
// //     type: Number,
// //     default: 0
// //   }
// // }, {
// //   timestamps: true
// // });

// // // Create slug from title before saving
// // blogSchema.pre('save', function(next) {
// //   if (this.isModified('title')) {
// //     this.slug = this.title
// //       .toLowerCase()
// //       .replace(/[^\w ]+/g, '')
// //       .replace(/ +/g, '-');
// //   }
// //   next();
// // });

// // export default mongoose.model('Blog', blogSchema);




// // backend/models/Blog.js
// import mongoose from 'mongoose';

// const blogSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: [true, 'Title is required'],
//     trim: true,
//     maxlength: [200, 'Title cannot be more than 200 characters']
//   },
//   slug: {
//     type: String,
//     unique: true,
//     lowercase: true
//     // ❌ REMOVED required: true - slug is auto-generated
//   },
//   excerpt: {
//     type: String,
//     maxlength: [300, 'Excerpt cannot be more than 300 characters']
//   },
//   content: {
//     type: String,
//     required: [true, 'Content is required']
//   },
//   author: {
//     type: String,
//     default: 'Admin'
//   },
//   category: {
//     type: String,
//     enum: ['General', 'Productivity', 'Technology', 'Development', 'Tutorials', 'News', 'Tips'],
//     default: 'General'
//   },
//   tags: [{
//     type: String,
//     trim: true
//   }],
//   image: {
//     type: String,  // This will store the cloud image URL
//     default: null
//   },
//   readTime: {
//     type: Number,
//     default: 5
//   },
//   published: {
//     type: Boolean,
//     default: true
//   },
//   views: {
//     type: Number,
//     default: 0
//   },
//   likes: {
//     type: Number,
//     default: 0
//   }
// }, {
//   timestamps: true
// });

// // ✅ FIXED: Use pre('validate') instead of pre('save')
// // This runs BEFORE validation, so slug exists when validation happens
// blogSchema.pre('validate', function(next) {
//   if (this.title && (!this.slug || this.isModified('title'))) {
//     this.slug = this.title
//       .toLowerCase()
//       .replace(/[^\w ]+/g, '')
//       .replace(/ +/g, '-');
//   }
  
//   // Auto-generate excerpt from content if not provided
//   if (this.content && !this.excerpt) {
//     this.excerpt = this.content.substring(0, 150) + '...';
//   }
  
//   next();
// });

// export default mongoose.model('Blog', blogSchema);





// backend/models/Blog.js
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    index: true  // For faster queries
  },
  excerpt: {
    type: String,
    trim: true,
    maxlength: [300, 'Excerpt cannot exceed 300 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [10, 'Content must be at least 10 characters']
  },
  author: {
    type: String,
    trim: true,
    default: 'Admin',
    maxlength: [100, 'Author name cannot exceed 100 characters']
  },
  category: {
    type: String,
    enum: {
      values: ['General', 'Productivity', 'Technology', 'Development', 'Tutorials', 'News', 'Tips'],
      message: '{VALUE} is not a valid category'
    },
    default: 'General'
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
    maxlength: [30, 'Tag cannot exceed 30 characters']
  }],
  image: {
    type: String,  // Cloud image URL (ImgBB, Cloudinary, etc.)
    trim: true,
    default: null,
    validate: {
      validator: function(v) {
        // Allow null or valid URL
        if (!v) return true;
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(v);
      },
      message: 'Please provide a valid image URL'
    }
  },
  readTime: {
    type: Number,
    min: [1, 'Read time must be at least 1 minute'],
    max: [120, 'Read time cannot exceed 120 minutes'],
    default: 5
  },
  published: {
    type: Boolean,
    default: true,
    index: true  // For querying published/unpublished posts
  },
  views: {
    type: Number,
    min: 0,
    default: 0
  },
  likes: {
    type: Number,
    min: 0,
    default: 0
  }
}, {
  timestamps: true,  // Adds createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ✅ INDEXES for better query performance
blogSchema.index({ slug: 1 });
blogSchema.index({ category: 1, published: 1 });
blogSchema.index({ createdAt: -1 });
blogSchema.index({ tags: 1 });

// ✅ PRE-VALIDATE MIDDLEWARE - Runs BEFORE validation
blogSchema.pre('validate', function(next) {
  // Generate slug from title if title exists
  if (this.title && (!this.slug || this.isModified('title'))) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')  // Remove special chars
      .replace(/\s+/g, '-')       // Replace spaces with hyphens
      .replace(/-+/g, '-')        // Replace multiple hyphens with single
      .substring(0, 100);         // Limit length
    
    // Add timestamp if slug already exists (for uniqueness)
    if (this.isNew) {
      this.slug = `${this.slug}-${Date.now()}`;
    }
  }
  
  // Auto-generate excerpt from content if not provided
  if (this.content && !this.excerpt) {
    // Remove HTML tags and get first 150 chars
    const cleanContent = this.content.replace(/<[^>]*>/g, '').trim();
    this.excerpt = cleanContent.substring(0, 150) + (cleanContent.length > 150 ? '...' : '');
  }
  
  // Calculate read time based on content length (average reading speed: 200 words/min)
  if (this.content && !this.isModified('readTime')) {
    const wordCount = this.content.trim().split(/\s+/).length;
    this.readTime = Math.max(1, Math.ceil(wordCount / 200));
  }
  
  // Limit tags to maximum 10
  if (this.tags && this.tags.length > 10) {
    this.tags = this.tags.slice(0, 10);
  }
  
  next();
});

// ✅ STATIC METHOD - Get published blogs only
blogSchema.statics.findPublished = function(filter = {}) {
  return this.find({ ...filter, published: true }).sort({ createdAt: -1 });
};

// ✅ INSTANCE METHOD - Increment views
blogSchema.methods.incrementViews = async function() {
  this.views += 1;
  return this.save({ validateBeforeSave: false });
};

// ✅ INSTANCE METHOD - Increment likes
blogSchema.methods.incrementLikes = async function() {
  this.likes += 1;
  return this.save({ validateBeforeSave: false });
};

// ✅ VIRTUAL - Get formatted date
blogSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// ✅ ERROR HANDLING - Handle duplicate slug error
blogSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    // Duplicate key error - most likely slug
    next(new Error('A blog with this title already exists. Please use a different title.'));
  } else {
    next(error);
  }
});

export default mongoose.model('Blog', blogSchema);
