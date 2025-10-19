// backend/models/Blog.js
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    maxlength: [300, 'Excerpt cannot be more than 300 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [1000, 'Content must be at least 1000 characters']
  },
  author: {
    type: String,
    required: true,
    default: 'ZenForce Team'
  },
  category: {
    type: String,
    required: true,
    enum: ['Productivity', 'Technology', 'Development', 'Tutorials', 'News', 'Tips']
  },
  tags: [{
    type: String,
    trim: true
  }],
  coverImage: {
    type: String,
    default: 'https://via.placeholder.com/800x400?text=Blog+Post'
  },
  readTime: {
    type: Number, // in minutes
    default: 5
  },
  published: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Create slug from title before saving
blogSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
  next();
});

export default mongoose.model('Blog', blogSchema);
