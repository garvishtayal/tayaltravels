const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  metaTags: {
    // Add meta tags object
    keywords: {
      type: [String],
    },
    // Add other meta tag fields as needed
  },
  category: {
    type: String,
//    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  headInfo: {
    // Add head information object
    headName: {
      type: String,
    },
    headDescription: {
      type: String,
    },
    // Add other head information fields as needed
  },
  content: {
    type: String,
    required: true,
  },
  imageUrls: {
    type: [String], // Assuming an array of image URLs
    required: true,
  },
  createdAt: {
    type: String,
    default: () => new Date().toISOString().split('T')[0], // YYYY-MM-DD format
  },
});

// Create a Mongoose model using the schema
const Blog = mongoose.model('Blog', blogSchema);

// Export the model for use in other files
module.exports = Blog;
